import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthProvider";
import { Coffee, LogOutIcon, ReceiptText } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="flex h-full flex-col justify-between bg-white p-6">
      <div>
        <h1 className="mb-6 font-sans text-2xl font-bold">RKYVE</h1>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/secret-passage-to-admin-dashboard/menu"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {({ isActive }) => (
                <Button
                  className="w-full justify-start gap-2"
                  variant={!isActive ? "link" : undefined}
                >
                  <Coffee size={16} /> Menu
                </Button>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/secret-passage-to-admin-dashboard/orders"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              {({ isActive }) => (
                <Button
                  className="w-full justify-start gap-2"
                  variant={!isActive ? "link" : undefined}
                >
                  <ReceiptText size={16} /> Orders
                </Button>
              )}
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex items-center justify-between rounded-md bg-slate-300 bg-opacity-30 p-3 backdrop-blur-md">
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div className="font-label">
            <p className="text-sm font-semibold">Admin Account</p>
            <p className="text-xs leading-none opacity-60">admin</p>
          </div>
        </div>
        <LogOutIcon
          size={18}
          onClick={handleLogout}
          className="cursor-pointer"
        />
      </div>
    </nav>
  );
}
