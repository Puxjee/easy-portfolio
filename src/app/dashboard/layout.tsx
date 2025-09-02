"use client";

import React from "react";
import { redirect } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { DashboardLayoutProps } from "@/types";

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!session) {
    redirect("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {children}
    </div>
  );
};

export default DashboardLayout;
