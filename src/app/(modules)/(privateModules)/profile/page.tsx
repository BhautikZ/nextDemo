"use client";

import { logout } from "@/redux/slice/authSlice";
import { AppDispatch } from "@/redux/store";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import userimage from "../../../../../public/assets/images.png";
import { resetData } from "@/redux/slice/userSlice";
import { resetProductData } from "@/redux/slice/productSlice";
import { resetCategoryData } from "@/redux/slice/categorySlice";
import { GetProfile } from "@/services/authService";

function Profile() {
  const { data: session } = useSession();
  const dispatch: AppDispatch = useDispatch();
  const UserData = useSelector((state: any) => state.root.signIn.loginData);
  const SocialUserData = useSelector(
    (state: any) => state.root.signIn.socialLoginUserData
  );
  const ProfileData = useSelector(
    (state: any) => state.root.signIn.profileData
  );

  const userID = UserData?.user?._id || SocialUserData?.user?._id;
  const Token = UserData?.token || SocialUserData?.token;
  const Role = UserData?.user?.role || SocialUserData?.user?.role;

  const router = useRouter();

  useEffect(() => {
    dispatch(GetProfile({ id: userID, token: Token }));
  }, []);

  const handleSignOut = () => {
    if (session) {
      localStorage.removeItem("userSession");
      dispatch(resetData());
      dispatch(resetProductData());
      dispatch(resetCategoryData());
      dispatch(logout());
      signOut({ callbackUrl: "/auth/loginPage" });
    } else {
      dispatch(logout());
      dispatch(resetData());
      dispatch(resetProductData());
      dispatch(resetCategoryData());

      Role === "admin"
        ? router.push("/auth/admin/loginPage")
        : router.push("/auth/loginPage");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-32 h-32 mb-4 overflow-hidden rounded-full border-4 border-gray-200 bg-white shadow-md">
        <img
          src={
            ProfileData?.user?.provider &&
            ProfileData?.user?.profile_image?.length > 0
              ? (ProfileData?.user?.profile_image[0] as string)
              : userimage?.src
          }
          alt="Profile"
          className="object-cover w-full h-full"
        />
      </div>
      <p className="text-2xl font-semibold mb-2">
        Welcome <span className="font-bold">{ProfileData?.user?.name}</span>
      </p>
      <p className="text-lg font-medium mb-4">{ProfileData?.user?.email}</p>
      <button
        className="bg-red-600 text-white py-2 px-6 rounded-md shadow-lg hover:bg-red-700 transition duration-300"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
}

export default Profile;
