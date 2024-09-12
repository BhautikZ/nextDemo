"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PageLoader from "../Pageloader";

const withAuthPublic = (WrappedComponent: any) => {
  const verifyToken = () => {
    const UserData = useSelector((state: any) => state.root.signIn.loginData);
    const SocialUserData = useSelector(
      (state: any) => state.root.signIn.socialLoginUserData
    );
    const userSession: any = localStorage.getItem("userSession");
    const sessionData = JSON.parse(userSession);

    const token =
      typeof window !== "undefined"
        ? UserData?.token || SocialUserData?.token
        : null;

    // Retrieve role from session or Redux
    const role =
      UserData?.user?.role ||
      SocialUserData?.user?.role ||
      sessionData?.user?.role;

    return { isAuthenticated: !!token || !!sessionData, role };
  };

  return (props: any) => {
    const router = useRouter();
    const { isAuthenticated, role } = verifyToken();

    useEffect(() => {
      if (isAuthenticated) {
        // Redirect based on the user's role
        if (role === "admin") {
          router.replace("/users"); // Redirect admins to /users
        } else {
          router.replace("/userDashboard"); // Redirect other users to /dashboard
        }
      }
    }, [isAuthenticated, role, router]);

    if (isAuthenticated) {
      return (
        <p>
          <PageLoader />
        </p>
      );
    }

    // Only mount the wrapped component if not authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuthPublic;
