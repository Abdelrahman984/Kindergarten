// src/pages/layouts/Layout.tsx
import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<"admin" | "teacher" | "parent">(
    "admin"
  );

  return (
    <div className="min-h-screen bg-background pattern-islamic flex flex-col">
      {/* Top Navigation Bar */}
      <NavigationBar userRole={userRole} setUserRole={setUserRole} />

      {/* Main Content */}
      <main className="flex-1 p-6 mt-3">{children}</main>
    </div>
  );
};

export default Layout;
