"use client";
import React, { useEffect, useState } from "react";
import defaultImage from "../../../../../public/assets/images.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteUserHandler, fetchUsers } from "@/services/authService";
import { setCurrentPage } from "@/redux/slice/userSlice";
import useDebounce from "@/hooks/useDebounce";
import Swal from "sweetalert2";
import { CommonTable } from "@/components/CustomeTable";

const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("name");
  const User = useSelector((state: any) => state.root.signIn);
  const SocialUserToken = User?.socialLoginUserData?.token;
  const UserToken = User?.loginData?.token;
  const Token = SocialUserToken || UserToken;
  const dispatch: AppDispatch = useDispatch();
  const { users, totalPages, currentPage, loading } = useSelector(
    (state: any) => state.root.users
  );

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      dispatch(setCurrentPage(1));
    }
  }, [debouncedSearchQuery, dispatch, searchQuery]);

  useEffect(() => {
    if (Token) {
      dispatch(
        fetchUsers({
          page: currentPage,
          searchQuery: debouncedSearchQuery,
          token: Token,
          sortorder: sortOrder,
          sortcoloum: sortColumn,
        })
      );
    }
  }, [
    currentPage,
    debouncedSearchQuery,
    dispatch,
    Token,
    sortColumn,
    sortOrder,
  ]);

  const deletePopUp = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const deleteResult = await dispatch(
          deleteUserHandler({
            id,
            token: Token,
          })
        );

        if (deleteResult.meta.requestStatus === "fulfilled") {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          dispatch(setCurrentPage(1));
          dispatch(
            fetchUsers({
              page: 1,
              searchQuery: debouncedSearchQuery,
              token: Token,
              sortorder: sortOrder,
              sortcoloum: sortColumn,
            })
          );
        } else {
          Swal.fire({
            title: "Error!",
            text: "Failed to delete the user.",
            icon: "error",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong while deleting the user.",
          icon: "error",
        });
      }
    }
  };
  //handel sort
  const handleSort = (columnKey: string) => {
    if (sortColumn && sortColumn === columnKey && sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
    setSortColumn(columnKey);
  };
  //coloum of table
  const columns = [
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "text" },
    { key: "profile_image", label: "Profile Image", type: "image" },
    { key: "provider", label: "Provider", type: "text" },
  ];

  return (
    <CommonTable
      columns={columns}
      tableData={users}
      loading={loading}
      error={null}
      onDelete={deletePopUp}
      onSort={handleSort}
      sortcoloum={sortColumn}
      sortorder={sortOrder}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={(page) => dispatch(setCurrentPage(page))}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      defaultImage={defaultImage}
      label="All Users"
    />
  );
};

export default Users;
