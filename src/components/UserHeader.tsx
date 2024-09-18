import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import defaultImage from "../../public/assets/images.png";
import { useDispatch, useSelector } from "react-redux";
import { resetData } from "@/redux/slice/userSlice";
import { logout } from "@/redux/slice/authSlice";
import { resetProductData } from "@/redux/slice/productSlice";
import { resetCategoryData } from "@/redux/slice/categorySlice";
import { useRouter } from "next/navigation";
import { GetProfile } from "@/services/authService";

function UserHeader() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const UserData = useSelector((state: any) => state.root.signIn.loginData);
  const SocialUserData = useSelector(
    (state: any) => state.root.signIn.socialLoginUserData
  );
  const ProfileData = useSelector(
    (state: any) => state.root.signIn.profileData
  );

  const userID: string = UserData?.user?._id || SocialUserData?.user?._id;
  const Token: string = UserData?.token || SocialUserData?.token;

  useEffect(() => {
    dispatch(GetProfile({ id: userID, token: Token }));
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    if (session) {
      localStorage.removeItem("userSession");
      dispatch(resetData());
      dispatch(logout());
      dispatch(resetProductData());
      dispatch(resetCategoryData());
      signOut({ callbackUrl: "/auth/loginPage" });
    } else {
      router.push("/auth/loginPage");
      dispatch(logout());
      dispatch(resetData());
      dispatch(resetProductData());
      dispatch(resetCategoryData());
    }
  };

  console.log(ProfileData, "22222222222222222");

  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">
            <a href="/">YourStore</a>
          </div>

          <div className="flex-1 mx-6">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <nav className="hidden lg:flex space-x-6">
            <Link href="/home" className="text-gray-600 hover:text-indigo-500">
              Home
            </Link>
            <Link href="/shop" className="text-gray-600 hover:text-indigo-500">
              Shop
            </Link>
            <a href="#" className="text-gray-600 hover:text-indigo-500">
              Deals
            </a>
            <Link
              href="/contact-us"
              className="text-gray-600 hover:text-indigo-500"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4 relative">
            <a href="/cart" className="text-gray-600 hover:text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5H19l-2 8H7z"
                />
              </svg>
            </a>

            <div className="relative" ref={dropdownRef}>
              <button onClick={toggleDropdown}>
                <img
                  src={
                    ProfileData?.user?.provider
                      ? `${process.env.NEXT_PUBLIC_BASE_URL}${ProfileData?.user?.profile_image[0]}`
                      : defaultImage.src
                  }
                  alt={session ? `${session.user?.name}'s profile` : ""}
                  className="w-8 h-8 rounded-full mr-2 cursor-pointer"
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                  <div className="px-4 py-2 text-gray-700">
                    <p className="font-semibold">
                      {session ? session.user?.name : UserData?.user?.name}
                    </p>
                    {/* <p className="text-sm text-gray-500">{userRole}</p> */}
                  </div>
                  <hr />
                  <Link
                    href="/userProfile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default UserHeader;
