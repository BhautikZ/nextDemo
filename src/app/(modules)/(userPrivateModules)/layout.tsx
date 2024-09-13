"use client";
import withAuth from "@/components/AuthGuard/Authwrapper";
import UserFooter from "@/components/UserFooter";
import UserHeader from "@/components/UserHeader";
import React from "react";

function DefaultUserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-full overflow-auto">
      <UserHeader />
      {children}
      <UserFooter />
    </div>
  );
}
export default withAuth(DefaultUserLayout, ["user"]);
