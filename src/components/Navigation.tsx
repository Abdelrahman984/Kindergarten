import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  // Mobile sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // استخدم حقل route لفصل الـ id عن المسار الحقيقي
  const adminMenuItems = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: LayoutDashboard,
      route: "/",
    },
    { id: "students", label: "إدارة الطلاب", icon: Users, route: "/students" },
    {
      id: "teachers",
      label: "إدارة المعلمين",
      icon: GraduationCap,
      route: "/teachers",
    },
    {
      id: "attendance",
      label: "الحضور والغياب",
      icon: Calendar,
      route: "/attendance",
    },
    { id: "fees", label: "إدارة الرسوم", icon: DollarSign, route: "/fees" },
    {
      id: "announcements",
      label: "الإعلانات",
      icon: MessageSquare,
      route: "/announcements",
    },
  ];

  // (لو عندك صفحات حقيقية/مختلفة لteacher/parent ضيف نفس حقل route)
  const teacherMenuItems = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: LayoutDashboard,
      route: "/",
    },
    { id: "my-class", label: "صفي", icon: Users, route: "/my-class" }, // تأكد إن عندك route فعلي
    { id: "attendance", label: "الحضور", icon: Calendar, route: "/attendance" },
    {
      id: "reports",
      label: "التقارير",
      icon: MessageSquare,
      route: "/reports",
    },
  ];

  const parentMenuItems = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: LayoutDashboard,
      route: "/",
    },
    { id: "my-children", label: "أطفالي", icon: Users, route: "/my-children" }, // تأكد إن عندك route فعلي
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

  // استخرج الـ activeId من المسار الحالي (أخذ أول سِجِّل إذا في subpath)
  const getActiveFromPath = (pathname: string) => {
    const cleaned = pathname.replace(/^\/+|\/+$/g, ""); // يخلّص من الـ slashes في البداية والنهاية
    if (!cleaned) return "dashboard"; // root => dashboard
    const firstSegment = cleaned.split("/")[0];
    // جيب العنصر اللي route بتاعه يبدأ بنفس الـ segment
    const matched = menuItems.find((m) => {
      const routeClean = m.route.replace(/^\/+|\/+$/g, "");
      return routeClean === firstSegment;
    });
    return matched ? matched.id : firstSegment;
  };

  const currentActive = getActiveFromPath(location.pathname);

  // مزامنة الـ state الخارجي لو انت محتاجه
  useEffect(() => {
    if (setActiveSection && currentActive !== activeSection) {
      setActiveSection(currentActive);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentActive, setActiveSection]); // لاحظ: تجاهلنا activeSection لتجنب loop غير مرغوب إذا أردت

  return (
    <>
      {/* Hamburger for mobile */}
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

      {/* Sidebar & overlay only rendered if open on mobile, always on desktop */}
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/30 z-30 transition-opacity duration-300 opacity-100"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {(sidebarOpen || window.innerWidth >= 768) && (
        <div
          className={`fixed inset-0 z-40 md:sticky md:top-0 md:z-auto md:w-80 h-full transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } bg-card/50 backdrop-blur-sm border-r border-border/50`}
          style={{ maxWidth: "20rem" }}
        >
          <div className="p-6 relative z-40 h-full flex flex-col">
            {/* Close button for mobile */}
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
              <Badge variant="secondary" className="font-arabic">
                {
                  {
                    admin: "مدير",
                    teacher: "معلم",
                    parent: "ولي أمر",
                  }[userRole]
                }
              </Badge>

              <Select
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
              </Select>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
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
                      setSidebarOpen(false); // close sidebar on mobile after navigation
                    }}
                  >
                    <Icon className="w-4 h-4 ml-3" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-border/50 space-y-2">
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
              >
                <LogOut className="w-4 h-4 ml-3" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
