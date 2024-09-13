"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PageLoader from "../Pageloader";

//auth props
// type WithAuthProps = {
//   [key: string]: any;
// };
const withAuth = (WrappedComponent: any, allowedRoles: string[]) => {
  const userSession: any = localStorage.getItem("userSession");
  const sessionData = JSON.parse(userSession);

  // This function will be part of the component's return, ensuring it only runs client-side.
  const verifyToken = () => {
    const UserData = useSelector((state: any) => state.root.signIn.loginData);
    const token = typeof window !== "undefined" ? UserData?.token : null;

    console.log(sessionData, userSession, "sessionData");

    // Implement your token verification logic here
    return !!token || !!sessionData;
  };
  // Role verification function
  const verifyRole = () => {
    //get data if user login with social accounts
    const SocialUserData = useSelector(
      (state: any) => state.root.signIn.socialLoginUserData
    );
    //get user data
    const UserData = useSelector((state: any) => state.root.signIn.loginData);
    const role =
      UserData?.user?.role ||
      SocialUserData?.user?.role ||
      sessionData?.user?.role;
    // Assuming the role is stored either in Redux UserData or sessionData
    const userRole = role || sessionData?.role;

    // Check if the user's role is allowed to access this component
    return allowedRoles.includes(userRole);
  };

  return (props: any) => {
    const router = useRouter();
    const isAuthenticated = verifyToken();
    const hasAccess = verifyRole();

    useEffect(() => {
      // Since verifyToken checks the window object, it's safe to call here; it won't run server-side.
      if (!isAuthenticated) {
        router.replace("/auth/loginPage");
      }
      if (isAuthenticated && !hasAccess) {
        router.replace("/unauthorized"); // Adjust the route as per your app
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated || !hasAccess) {
      // Display a loader or any placeholder while the redirection is in progress
      return (
        <p>
          <PageLoader />
        </p>
      );
    }

    // Only mount the wrapped component if authenticated
    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
