"use client";
import { capturePayment } from "@/services/authService";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

function ReturnUrl() {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const search = searchParams.get("token");

  useEffect(() => {
    dispatch(capturePayment(search));
  }, []);
  return <div></div>;
}

export default ReturnUrl;
