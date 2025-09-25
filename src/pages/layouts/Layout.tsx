import { useState } from "react";
import Navigation from "@/components/shared/Navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<"admin" | "teacher" | "parent">(
    "admin"
  );
  const [activeSection, setActiveSection] = useState<string>("");

  return (
    <div className="min-h-screen bg-background pattern-islamic flex">
      {/* Navigation Sidebar */}
      <div className="sticky top-0 h-screen">
        <Navigation
          userRole={userRole}
          setUserRole={setUserRole}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default Layout;
