"use client";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import PageLoader from "../Pageloader";

//auth props
// type WithAuthProps = {
//   [key: string]: any;
// };
const withAuth = (WrappedComponent: any) => {
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

  return (props: any) => {
    const router = useRouter();
    const isAuthenticated = verifyToken();

    console.log(isAuthenticated, "isAuthenticated");
    useEffect(() => {
      // Since verifyToken checks the window object, it's safe to call here; it won't run server-side.
      if (!isAuthenticated) {
        router.replace("/auth/loginPage");
      }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
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
