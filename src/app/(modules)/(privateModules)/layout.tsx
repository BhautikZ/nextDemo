"use client";
import { useState } from "react";
import { useIsMounted } from "@/hooks/use-is-Mounted";
import withAuth from "@/components/AuthGuard/Authwrapper";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { AppDispatch } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/slice/authSlice";
import defaultImage from "../../../../public/assets/images.png";
import dashboardIcon from "../../../../public/assets/dashboardIcon.svg";
import { resetData } from "@/redux/slice/userSlice";
import { resetProductData } from "@/redux/slice/productSlice";
import { resetCategoryData } from "@/redux/slice/categorySlice";
interface DefaultLayoutProps {
  readonly children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const isMounted = useIsMounted();
  const { data: session } = useSession();
  const pathname = usePathname();
  const dispatch: AppDispatch = useDispatch();
  const UserData = useSelector((state: any) => state.root.signIn.loginData);
  const SocialUserData = useSelector(
    (state: any) => state.root.signIn.socialLoginUserData
  );

  const Role = UserData?.user?.role || SocialUserData?.user?.role;
  const router = useRouter();

  const handleSignOut = () => {
    if (session) {
      localStorage.removeItem("userSession");
      dispatch(resetData());
      dispatch(logout());
      dispatch(resetProductData());
      dispatch(resetCategoryData());
      signOut({ callbackUrl: "/auth/loginPage" });
    } else {
      Role === "admin"
        ? router.push("/auth/admin/loginPage")
        : router.push("/auth/loginPage");
      dispatch(logout());
      dispatch(resetData());
      dispatch(resetProductData());
      dispatch(resetCategoryData());
    }
  };

  if (!isMounted) {
    return null;
  }

  const getLinkClass = (path: string) => {
    const baseClass = "block py-2 px-4 rounded transition-all duration-300";
    const activeClass = "bg-gray-700 text-white";
    const inactiveClass = "hover:bg-gray-700 text-gray-300";
    return pathname === path
      ? `${baseClass} ${activeClass}`
      : `${baseClass} ${inactiveClass}`;
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside
        className={`transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-gradient-to-r from-gray-800 to-gray-600 text-white h-full overflow-y-auto`}
      >
        <div className="p-4 m-[25px]">
          <h1
            className={`text-xl font-bold transition-opacity duration-300 ${
              isSidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={dashboardIcon.src} alt="" />
          </h1>

          {Role === "admin" ? (
            <nav className="mt-6">
              <ul>
                <li>
                  <Link
                    href="/dashboard"
                    className={getLinkClass("/dashboard")}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/users" className={getLinkClass("/users")}>
                    Users
                  </Link>
                </li>
                <li>
                  <Link
                    href="/categories"
                    className={getLinkClass("/categories")}
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link href="/products" className={getLinkClass("/products")}>
                    Products
                  </Link>
                </li>
                {/* Add more sidebar links here */}
              </ul>
            </nav>
          ) : (
            <nav className="mt-6">
              <ul>
                <li>
                  <Link
                    href="/userDashboard"
                    className={getLinkClass("/userDashboard")}
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 h-full overflow-y-auto">
        <div className="flex justify-end items-center">
          <div className="relative">
            <button
              className="flex items-center cursor-pointer bg-transparent border-none p-0"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              aria-expanded={isDropdownOpen}
              aria-controls="dropdown-menu"
            >
              <img
                src={session?.user?.image ?? defaultImage.src}
                alt={
                  session?.user?.name
                    ? `${session.user.name}'s profile picture`
                    : "Default profile picture"
                }
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="flex flex-col text-gray-800">
                <span className="font-medium">
                  {session?.user?.name ?? UserData?.user?.name}
                </span>
                <span className="text-sm text-gray-500">
                  {Role
                    ? Role.charAt(0).toUpperCase() + Role.slice(1)
                    : "Guest"}
                </span>
              </div>
            </button>
            {isDropdownOpen && (
              <div
                id="dropdown-menu"
                className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2"
              >
                <button
                  onClick={() => {
                    router.push("/profile");
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}

export default withAuth(DefaultLayout, ["admin"]);
