import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const navItems = [
    { label: "Home", path: "#" },
    { label: "About Us", path: "#" },
    { label: "How it works", path: "#" },
  ];

  return (
    <nav className="container relative my-6 flex w-full items-center justify-between">
      {/* Burger Menu for mobile */}
      <div className="lg:hidden">
        <Button
          variant="outline"
          className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
        >
          <NavLink to="#">
            <Menu size={14} />
          </NavLink>
        </Button>
      </div>

      {/* Navigation links for larger screens */}
      <ul className="hidden lg:flex">
        {navItems.map((item) => (
          <li key={item.label}>
            <Button
              variant="outline"
              className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
            >
              <NavLink to={item.path}>{item.label}</NavLink>
            </Button>
          </li>
        ))}
      </ul>

      {/* Centered title */}
      <NavLink
        to="/home"
        className="font-sans2 absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold uppercase text-black"
      >
        COPY SHOP
      </NavLink>

      {/* Right-side buttons for larger screens */}
      <ul className="ml-auto hidden justify-end lg:flex">
        <li>
          <Button
            variant="outline"
            className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
          >
            <NavLink to="#">Shop Now</NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
          >
            <NavLink to="#">
              <ShoppingCart size={14} />
            </NavLink>
          </Button>
        </li>
      </ul>
    </nav>
  );
}
