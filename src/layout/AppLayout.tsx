import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "@/contexts/AuthProvider";

export default function AppLayout() {
  const { isAdmin } = useAuth();
  const isMenu = window.location.pathname === "/menu";

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div
        className={`grid ${isAdmin ? "grid-cols-[auto_1fr]" : "grid-cols-1"}`}
      >
        {/* Render Sidebar for admin users, otherwise render Header */}
        {isAdmin ? (
          <aside className="h-screen bg-gray-800">
            <Sidebar />
          </aside>
        ) : (
          <Navbar />
        )}

        {/* Main content area */}
        <main
          className={`overflow-auto ${isAdmin && "bg-gray-200 px-8"} py-6 ${isMenu ? "h-[calc(100vh-5rem)]" : "h-screen"}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
