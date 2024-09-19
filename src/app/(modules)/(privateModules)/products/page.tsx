"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import useDebounce from "@/hooks/useDebounce";
import Swal from "sweetalert2";
import {
  deleteProductHandler,
  fetchProducts,
  getSingleProduct,
} from "@/services/productService";
import { setCurrentPage } from "@/redux/slice/productSlice";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import { CommonTable } from "@/components/CustomeTable";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("name");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { singleProduct } = useSelector((state: any) => state.root.products);
  const User = useSelector((state: any) => state.root.signIn);
  const SocialUserToken = User?.socialLoginUserData?.token;
  const UserToken = User?.loginData?.token;
  const Token = SocialUserToken || UserToken;

  const dispatch: AppDispatch = useDispatch();

  const { products, totalPages, loading } = useSelector(
    (state: any) => state.root.products.products
  );
  const { currentPage } = useSelector((state: any) => state.root.products);

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      dispatch(setCurrentPage(1));
    }
  }, [debouncedSearchQuery, dispatch, searchQuery]);

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        searchQuery: debouncedSearchQuery,
        token: Token,
        sortorder: sortOrder,
        sortcoloum: sortColumn,
      })
    );
  }, [currentPage, debouncedSearchQuery, sortColumn, sortOrder, dispatch]);

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
          deleteProductHandler({ id, token: Token })
        );

        if (deleteResult.meta.requestStatus === "fulfilled") {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });

          dispatch(setCurrentPage(1));
          dispatch(
            fetchProducts({
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
    { key: "name", label: "Product Name", type: "text" },
    {
      key: "category",
      label: "Category",
      type: "text",
      render: (row: any) => row?.category?.name || "N/A",
    },
    { key: "image", label: "Image", type: "image" },
    { key: "price", label: "Price", type: "text" },
    { key: "stock", label: "Stock", type: "text" },
  ];

  const handleViewProduct = async (id: string) => {
    await dispatch(getSingleProduct({ id, token: Token }));

    setIsModalOpen(true);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={singleProduct}
        isProduct={true}
      />

      <CommonTable
        columns={columns}
        tableData={products}
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
        onView={true}
        onEdit={true}
        viewHandler={handleViewProduct}
        label="All Products"
        addButton="Add Product"
        addButtonRoute={() => router.push("/products/addProducts")}
        editButtonRoute="/products/editProducts"
      />
    </div>
  );
};

export default Products;
