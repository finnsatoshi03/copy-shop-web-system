import { useState } from "react";
import { Menu, ShoppingCart, ArrowLeft } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import { NotifBadge } from "@/components/ui/notif-badge";
import { useCart } from "@/contexts/CartProvider";
import { CartSheet } from "@/components/cart/cart-sheet";

export default function Header() {
  const { cartItems } = useCart();
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const location = useLocation();
  const [showCart, setShowCart] = useState(false);

  const handleCartClick = () => {
    if (isMobile) {
      navigate("/cart");
    } else {
      setShowCart((prev) => !prev);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "About Us", path: "#" },
    { label: "How it works", path: "#" },
  ];

  const isOrderPage = location.pathname.startsWith("/order/");
  const isCartPage = location.pathname.startsWith("/cart");

  return (
    <nav className="container relative my-6 flex w-full items-center justify-between">
      <div className="lg:hidden">
        {isOrderPage || isCartPage ? (
          <Button
            variant="outline"
            className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
            onClick={isOrderPage || isCartPage ? handleBackClick : undefined}
          >
            <ArrowLeft size={14} />
          </Button>
        ) : (
          <Button
            variant="outline"
            className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
          >
            <Menu size={14} />
          </Button>
        )}
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
        className="absolute left-1/2 -translate-x-1/2 transform font-sans2 text-2xl font-bold uppercase text-black"
      >
        COPY SHOP
      </NavLink>

      {/* Right-side buttons for larger screens */}
      <ul className="ml-auto justify-end lg:flex">
        <li className="hidden lg:block">
          <Button
            variant="outline"
            className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
          >
            <NavLink to="/menu">Shop Now</NavLink>
          </Button>
        </li>
        <li>
          <Button
            variant="outline"
            onClick={handleCartClick}
            className="relative rounded-full border border-gray-300 text-xs uppercase shadow-none"
          >
            <ShoppingCart size={14} />
            {cartItems.length > 0 && (
              <NotifBadge direction="top-right">{cartItems.length}</NotifBadge>
            )}
          </Button>
        </li>
      </ul>

      {!isMobile && (
        <CartSheet
          open={showCart}
          onOpenChange={(value: boolean) => setShowCart(value)}
        />
      )}
    </nav>
  );
}
