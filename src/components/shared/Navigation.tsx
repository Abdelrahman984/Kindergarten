import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  userRole: "admin" | "teacher" | "parent";
  setUserRole: (role: "admin" | "teacher" | "parent") => void;
}

const Navigation = ({
  activeSection,
  setActiveSection,
  userRole,
  setUserRole,
}: NavigationProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // قوائم المينيو — اضفت Subjects / Schedule / Classroom
  const adminMenuItems = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: LayoutDashboard,
      route: "/",
    },
    { id: "students", label: "الطلاب", icon: Users, route: "/students" },
    {
      id: "teachers",
      label: "المعلمين",
      icon: GraduationCap,
      route: "/teachers",
    },
    {
      id: "attendance",
      label: "الحضور والغياب",
      icon: Calendar,
      route: "/attendance",
    },
    { id: "fees", label: "الرسوم", icon: DollarSign, route: "/fees" },
    // {
    //   id: "announcements",
    //   label: "الإعلانات",
    //   icon: MessageSquare,
    //   route: "/announcements",
    // },
    // {
    //   id: "reports",
    //   label: "التقارير",
    //   icon: AssessmentOutlined,
    //   route: "/reports",
    // },
    {
      id: "subjects",
      label: "المواد",
      icon: GraduationCap,
      route: "/Subjects",
    }, // لاحظ الـ casing مطابق لـ App
    { id: "schedule", label: "الجدول", icon: Calendar, route: "/Schedule" },
    { id: "classroom", label: "الفصول", icon: Users, route: "/Classroom" },
  ];

  const teacherMenuItems = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: LayoutDashboard,
      route: "/",
    },
    { id: "my-class", label: "صفي", icon: Users, route: "/my-class" },
    { id: "attendance", label: "الحضور", icon: Calendar, route: "/attendance" },
    {
      id: "reports",
      label: "التقارير",
      icon: MessageSquare,
      route: "/reports",
    },
    {
      id: "subjects",
      label: "المواد",
      icon: GraduationCap,
      route: "/Subjects",
    },
    { id: "schedule", label: "الجدول", icon: Calendar, route: "/Schedule" },
    { id: "classroom", label: "الفصول", icon: Users, route: "/Classroom" },
  ];

  const parentMenuItems = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: LayoutDashboard,
      route: "/",
    },
    { id: "my-children", label: "أطفالي", icon: Users, route: "/my-children" },
    { id: "attendance", label: "الحضور", icon: Calendar, route: "/attendance" },
    {
      id: "reports",
      label: "التقارير",
      icon: MessageSquare,
      route: "/reports",
    },
    { id: "fees", label: "الرسوم", icon: DollarSign, route: "/fees" },
  ];

  const getMenuItems = () => {
    switch (userRole) {
      case "admin":
        return adminMenuItems;
      case "teacher":
        return teacherMenuItems;
      case "parent":
      default:
        return parentMenuItems;
    }
  };

  const menuItems = getMenuItems();

  const getActiveFromPath = (pathname: string) => {
    const cleaned = pathname.replace(/^\/+|\/+$/g, "");
    if (!cleaned) return "dashboard";
    if (
      cleaned.startsWith("attendance") ||
      cleaned.startsWith("mark-attendance")
    ) {
      return "attendance";
    }
    const firstSegment = cleaned.split("/")[0];
    const matched = menuItems.find((m) => {
      const routeClean = m.route.replace(/^\/+|\/+$/g, "");
      return routeClean === firstSegment;
    });
    return matched ? matched.id : firstSegment;
  };

  const currentActive = getActiveFromPath(location.pathname);

  // مزامنة الـ state الخارجي
  useEffect(() => {
    if (setActiveSection && currentActive !== activeSection) {
      setActiveSection(currentActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentActive, setActiveSection]);

  return (
    <>
      {/* Hamburger (mobile) */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 bg-card p-2 rounded shadow-lg border border-border"
        aria-label="Open navigation"
        onClick={() => setSidebarOpen(true)}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Overlay for mobile only when open */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 opacity-100"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar: always present but slides in/out on mobile. */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 bg-card/50 backdrop-blur-sm border-r border-border/50
                    ${
                      sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0 md:static md:w-64 h-screen`}
      >
        {/* wrapper with internal scroll so sidebar stays exactly viewport height */}
        <div className="p-6 relative z-40 h-full flex flex-col overflow-y-auto">
          {/* Close button (mobile) */}
          {sidebarOpen && (
            <button
              className="md:hidden absolute top-4 left-4 text-2xl"
              aria-label="Close navigation"
              onClick={() => setSidebarOpen(false)}
            >
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M6 18L18 6"
                />
              </svg>
            </button>
          )}

          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-islamic rounded-full mx-auto mb-4 flex items-center justify-center shadow-islamic">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-bold text-xl text-foreground font-arabic">
              روضة الأنصار
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              نظام إدارة الروضة
            </p>
          </div>

          {/* User Role Badge + Role Switch */}
          <div className="mb-6 text-center space-y-3">
            <Badge
              variant="secondary"
              className="font-arabic w-full flex justify-center items-center"
            >
              {
                {
                  admin: "صفحة المدير",
                  teacher: "صفحة المعلم",
                  parent: "صفحة ولي الأمر",
                }[userRole]
              }
            </Badge>

            {/* <Select
              value={userRole}
              onValueChange={(value) =>
                setUserRole(value as "admin" | "teacher" | "parent")
              }
            >
              <SelectTrigger className="w-full font-arabic text-right">
                <SelectValue placeholder="اختر الدور" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">مدير</SelectItem>
                <SelectItem value="teacher">معلم</SelectItem>
                <SelectItem value="parent">ولي أمر</SelectItem>
              </SelectContent>
            </Select> */}
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon as React.ElementType;
              const isActive = currentActive === item.id;

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "islamic" : "ghost"}
                  className={`w-full justify-start font-arabic text-right hover:bg-primary/10 ${
                    isActive ? "shadow-soft" : ""
                  }`}
                  onClick={() => {
                    navigate(item.route);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="w-4 h-4 ml-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-border/50 space-y-2 mt-auto">
            <Button
              variant="ghost"
              className="w-full justify-start font-arabic hover:bg-primary/10 hover:text-primary"
              onClick={() => {
                navigate("/login");
                setSidebarOpen(false);
              }}
            >
              <LogIn className="w-4 h-4 ml-3" />
              تسجيل الدخول
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-arabic hover:bg-primary/10 hover:text-primary"
              onClick={() => {
                navigate("/register");
                setSidebarOpen(false);
              }}
            >
              <UserPlus className="w-4 h-4 ml-3" />
              إنشاء حساب
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-arabic hover:bg-primary/10 hover:text-primary"
              onClick={() => {
                navigate("/settings");
                setSidebarOpen(false);
              }}
            >
              <Settings className="w-4 h-4 ml-3" />
              الإعدادات
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start font-arabic hover:bg-red-500/10 hover:text-red-600"
              onClick={() => {
                // هنا ضعي لوجيك تسجيل الخروج الحقيقي عند الحاجة
              }}
            >
              <LogOut className="w-4 h-4 ml-3" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
