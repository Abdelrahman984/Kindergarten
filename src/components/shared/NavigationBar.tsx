// src/components/NavigationBar.tsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import MessageIcon from "@mui/icons-material/Message";
import SettingsIcon from "@mui/icons-material/Settings";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu, MenuItem as MuiMenuItem } from "@mui/material";

interface NavigationBarProps {
  userRole: "admin" | "teacher" | "parent";
  setUserRole: (role: "admin" | "teacher" | "parent") => void;
}

const NavigationBar: React.FC<NavigationBarProps> = ({
  userRole,
  setUserRole,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Main menu items by role (primary links only)
  const menuItems = [
    {
      id: "dashboard",
      label: "لوحة التحكم",
      icon: <DashboardIcon />,
      route: "/",
    },
    ...(userRole === "admin"
      ? [
          {
            id: "students",
            label: "إدارة الطلاب",
            icon: <PeopleIcon />,
            route: "/students",
          },
          {
            id: "teachers",
            label: "إدارة المعلمين",
            icon: <PeopleIcon />,
            route: "/teachers",
          },
        ]
      : userRole === "teacher"
      ? [
          {
            id: "my-class",
            label: "صفي",
            icon: <PeopleIcon />,
            route: "/my-class",
          },
        ]
      : [
          {
            id: "my-children",
            label: "أطفالي",
            icon: <PeopleIcon />,
            route: "/my-children",
          },
        ]),
  ];

  // All routes from App.tsx
  const allRoutes = [
    { id: "dashboard", label: "لوحة التحكم", route: "/" },
    { id: "students", label: "إدارة الطلاب", route: "/students" },
    { id: "teachers", label: "إدارة المعلمين", route: "/teachers" },
    { id: "attendance", label: "الحضور والغياب", route: "/attendance" },
    { id: "mark-attendance", label: "تسجيل الحضور", route: "/mark-attendance" },
    { id: "fees", label: "إدارة الرسوم", route: "/fees" },
    { id: "announcements", label: "الإعلانات", route: "/announcements" },
    { id: "reports", label: "التقارير", route: "/reports" },
    { id: "my-class", label: "صفي", route: "/my-class" },
    { id: "my-children", label: "أطفالي", route: "/my-children" },
    { id: "schedule", label: "الجدول", route: "/Schedule" },
    { id: "subjects", label: "المواد", route: "/Subjects" },
    {
      id: "classroom",
      label: "إدارة الفصول",
      route: "/Classroom",
    },
    { id: "settings", label: "الإعدادات", route: "/settings" },
  ];

  // Find routes not in menuItems (secondary links)
  const menuRoutes = menuItems.map((item) => item.route);
  const moreLinks = allRoutes.filter(
    (route) => !menuRoutes.includes(route.route)
  );

  // For More menu
  const [moreAnchorEl, setMoreAnchorEl] = useState<null | HTMLElement>(null);
  const openMore = Boolean(moreAnchorEl);
  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };
  const handleMoreClose = () => {
    setMoreAnchorEl(null);
  };

  const currentActive =
    menuItems.find((item) => item.route === location.pathname)?.id ||
    "dashboard";

  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setMobileOpen(false)}
    >
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.id}
            selected={currentActive === item.id}
            onClick={() => navigate(item.route)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
      <Box sx={{ m: 2 }}>
        <Select
          fullWidth
          value={userRole}
          onChange={(e) =>
            setUserRole(e.target.value as "admin" | "teacher" | "parent")
          }
        >
          <MenuItem value="admin">مدير</MenuItem>
          <MenuItem value="teacher">معلم</MenuItem>
          <MenuItem value="parent">ولي أمر</MenuItem>
        </Select>
      </Box>
    </Box>
  );

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#f8fafc", // Tailwind bg-card
          color: "#22223b", // Tailwind text-foreground
          borderBottom: "1px solid #e5e7eb", // Tailwind border-border
          boxShadow: "0 2px 8px 0 rgba(0,0,0,0.04)", // soft shadow
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: 3 }}>
          <Box
            display="flex"
            alignItems="center"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            <PeopleIcon sx={{ mr: 1, color: "#0e7490" }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: "bold",
                fontFamily: "inherit",
                color: "#22223b",
              }}
            >
              روضة الأنصار
            </Typography>
          </Box>
          {/* Desktop Menu */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => (
              <ListItemButton
                key={item.id}
                selected={currentActive === item.id}
                onClick={() => navigate(item.route)}
                sx={{
                  borderRadius: 2,
                  mx: 0.5,
                  color: currentActive === item.id ? "#0e7490" : "#22223b",
                  bgcolor:
                    currentActive === item.id ? "#e0f2fe" : "transparent",
                  boxShadow:
                    currentActive === item.id
                      ? "0 2px 8px 0 rgba(14,116,144,0.08)"
                      : "none",
                  fontWeight: currentActive === item.id ? "bold" : "normal",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "#f1f5f9",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: currentActive === item.id ? "#0e7490" : "#22223b",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            {/* More menu icon */}
            {moreLinks.length > 0 && (
              <>
                <IconButton
                  aria-label="more"
                  onClick={handleMoreClick}
                  sx={{ color: "#0e7490", ml: 1 }}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={moreAnchorEl}
                  open={openMore}
                  onClose={handleMoreClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {moreLinks.map((item) => (
                    <MuiMenuItem
                      key={item.id}
                      onClick={() => {
                        navigate(item.route);
                        handleMoreClose();
                      }}
                      selected={location.pathname === item.route}
                    >
                      {item.label}
                    </MuiMenuItem>
                  ))}
                </Menu>
              </>
            )}
            <Select
              value={userRole}
              onChange={(e) =>
                setUserRole(e.target.value as "admin" | "teacher" | "parent")
              }
              sx={{
                ml: 2,
                bgcolor: "#f1f5f9",
                borderRadius: 2,
                fontFamily: "inherit",
                color: "#22223b",
                minWidth: 100,
                "& .MuiSelect-icon": { color: "#0e7490" },
              }}
            >
              <MenuItem value="admin">مدير</MenuItem>
              <MenuItem value="teacher">معلم</MenuItem>
              <MenuItem value="parent">ولي أمر</MenuItem>
            </Select>
          </Box>

          {/* Mobile Hamburger */}
          <IconButton
            edge="end"
            sx={{ display: { md: "none" }, color: "#0e7490" }}
            onClick={() => setMobileOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        slotProps={{
          paper: {
            sx: {
              bgcolor: "#f8fafc",
              color: "#22223b",
              borderRadius: 3,
              boxShadow: "0 4px 16px 0 rgba(14,116,144,0.08)",
            },
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            height: "100%",
            p: 2,
          }}
        >
          <List sx={{ flexGrow: 1 }}>
            {menuItems.map((item) => (
              <ListItemButton
                key={item.id}
                selected={currentActive === item.id}
                onClick={() => {
                  navigate(item.route);
                  setMobileOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mx: 0.5,
                  color: currentActive === item.id ? "#0e7490" : "#22223b",
                  bgcolor:
                    currentActive === item.id ? "#e0f2fe" : "transparent",
                  boxShadow:
                    currentActive === item.id
                      ? "0 2px 8px 0 rgba(14,116,144,0.08)"
                      : "none",
                  fontWeight: currentActive === item.id ? "bold" : "normal",
                  transition: "all 0.2s",
                  "&:hover": {
                    bgcolor: "#f1f5f9",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: currentActive === item.id ? "#0e7490" : "#22223b",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            ))}
            {/* More menu for mobile */}
            {moreLinks.length > 0 && (
              <ListItemButton
                onClick={(e) => setMoreAnchorEl(e.currentTarget)}
                sx={{ borderRadius: 2, mx: 0.5 }}
              >
                <ListItemIcon>
                  <MoreVertIcon sx={{ color: "#0e7490" }} />
                </ListItemIcon>
                <ListItemText primary="المزيد" />
              </ListItemButton>
            )}
          </List>
          {/* More menu popover for mobile */}
          <Menu
            anchorEl={moreAnchorEl}
            open={openMore}
            onClose={handleMoreClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {moreLinks.map((item) => (
              <MuiMenuItem
                key={item.id}
                onClick={() => {
                  navigate(item.route);
                  handleMoreClose();
                  setMobileOpen(false);
                }}
                selected={location.pathname === item.route}
              >
                {item.label}
              </MuiMenuItem>
            ))}
          </Menu>

          <Box sx={{ mb: 2 }}>
            <Select
              fullWidth
              value={userRole}
              onChange={(e) =>
                setUserRole(e.target.value as "admin" | "teacher" | "parent")
              }
              sx={{
                bgcolor: "#f1f5f9",
                borderRadius: 2,
                fontFamily: "inherit",
                color: "#22223b",
                "& .MuiSelect-icon": { color: "#0e7490" },
              }}
            >
              <MenuItem value="admin">مدير</MenuItem>
              <MenuItem value="teacher">معلم</MenuItem>
              <MenuItem value="parent">ولي أمر</MenuItem>
            </Select>
          </Box>

          <Box>
            <ListItemButton
              sx={{ color: "#ef4444", borderRadius: 2, fontWeight: "bold" }}
              onClick={() => alert("Logout")}
            >
              <ListItemText primary="تسجيل الخروج" />
            </ListItemButton>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default NavigationBar;
