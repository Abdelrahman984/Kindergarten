import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layouts/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Announcements from "./pages/Announcements";
import Reports from "./pages/Reports";
import MyClass from "./pages/myClass";
import MyChildren from "./pages/myChildren";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Index />
              </Layout>
            }
          />
          <Route
            path="/students"
            element={
              <Layout>
                <Students />
              </Layout>
            }
          />
          <Route
            path="/teachers"
            element={
              <Layout>
                <Teachers />
              </Layout>
            }
          />
          <Route
            path="/attendance"
            element={
              <Layout>
                <Attendance />
              </Layout>
            }
          />
          <Route
            path="/fees"
            element={
              <Layout>
                <Fees />
              </Layout>
            }
          />
          <Route
            path="/announcements"
            element={
              <Layout>
                <Announcements />
              </Layout>
            }
          />
          <Route
            path="/reports"
            element={
              <Layout>
                <Reports />
              </Layout>
            }
          />
          <Route
            path="/my-class"
            element={
              <Layout>
                <MyClass />
              </Layout>
            }
          />
          <Route
            path="/my-children"
            element={
              <Layout>
                <MyChildren />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout>
                <Settings />
              </Layout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
