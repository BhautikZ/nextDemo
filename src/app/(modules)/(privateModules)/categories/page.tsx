"use client";
import React, { useEffect, useState } from "react";
import { FaTrash, FaEye, FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import useDebounce from "@/hooks/useDebounce";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import {
  deleteCategoryHandler,
  fetchCategories,
  getSingleCategory,
} from "@/services/categoryService";
import { setCurrentPage } from "@/redux/slice/categorySlice";
import Modal from "@/components/Modal";
import { CommonTable } from "@/components/CustomeTable";

const Categories = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [sortorder, setSortOrder] = useState("asc");
  const [sortcoloum, setsortColoum] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { singleCategory } = useSelector((state: any) => state.root.categories);

  const User = useSelector((state: any) => state.root.signIn);
  const SocialUserToken = User?.socialLoginUserData?.token;
  const UserToken = User?.loginData?.token;
  const Token = SocialUserToken || UserToken;

  console.log(singleCategory, "singleCategory");

  const dispatch: AppDispatch = useDispatch();

  const { categories, totalPages, loading } = useSelector(
    (state: any) => state.root.categories.allCategoriesData
  );

  const { currentPage } = useSelector((state: any) => state.root.categories);

  console.log(categories, totalPages, currentPage, loading, "categories");

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      dispatch(setCurrentPage(1));
    }
  }, [debouncedSearchQuery, dispatch, searchQuery]);

  useEffect(() => {
    if (Token) {
      dispatch(
        fetchCategories({
          page: currentPage,
          searchQuery: debouncedSearchQuery,
          token: Token,
          sortorder: sortorder,
          sortcoloum: sortcoloum,
        })
      );
    }
  }, [currentPage, debouncedSearchQuery, sortcoloum, sortorder, dispatch]);

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
          deleteCategoryHandler({ id, token: Token })
        );

        if (deleteResult.meta.requestStatus === "fulfilled") {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          dispatch(setCurrentPage(1));
          dispatch(
            fetchCategories({
              page: 1,
              searchQuery: debouncedSearchQuery,
              token: Token,
              sortorder: sortorder,
              sortcoloum: sortcoloum,
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
    let direction: "asc" | "desc" = "asc";
    if (sortcoloum && sortcoloum === columnKey && sortorder === "asc") {
      direction = "desc";
      setSortOrder("desc");
    } else {
      setSortOrder("asc");
    }
    setsortColoum(columnKey);
  };
  //coloum of table
  const columns = [
    { key: "name", label: "Name", type: "text" },
    { key: "description", label: "Description", type: "text" },
    { key: "isActive", label: "Status", type: "text" },
  ];

  const handleViewCategory = async (id: string) => {
    await dispatch(getSingleCategory({ id, token: Token }));

    setIsModalOpen(true);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={singleCategory}
      />

      <CommonTable
        columns={columns}
        tableData={categories}
        loading={loading}
        error={null}
        onDelete={deletePopUp}
        onSort={handleSort} // Pass the sorting handler
        sortcoloum={sortcoloum} // Pass the sorting config
        sortorder={sortorder}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setCurrentPage(page))}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onView={true}
        onEdit={true}
        viewHandler={handleViewCategory}
        label="All Categories"
        addButton="Add Category"
        addButtonRoute={() => router.push("/categories/addCategory")}
        editButtonRoute="/categories/editCategory"
      />
    </div>
  );
};

export default Categories;
