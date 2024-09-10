import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useAuth } from "@/contexts/AuthProvider";

export default function AppLayout() {
  const { isAdmin } = useAuth();

  return (
    <>
      <div className={`w-screen ${isAdmin && "grid grid-cols-[0.18fr_1fr]"}`}>
        {/* Render Sidebar for admin users, otherwise render Header */}
        {isAdmin ? <Sidebar /> : <Navbar />}
        <main className={`${isAdmin && "bg-gray-200 px-8 py-6"}`}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
