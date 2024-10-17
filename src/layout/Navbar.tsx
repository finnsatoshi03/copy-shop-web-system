import { useState } from "react";
import { Menu, ShoppingCart, ArrowLeft } from "lucide-react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { Button } from "@/components/ui/button";
import { NotifBadge } from "@/components/ui/notif-badge";
import { useCart } from "@/contexts/CartProvider";
import { CartSheet } from "@/components/cart/cart-sheet";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
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
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
              >
                <Menu size={14} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" hideCloseButton className="space-y-4">
              <NavLink
                to="/home"
                className="font-sans2 text-2xl font-bold uppercase text-black"
              >
                Amiga Café
              </NavLink>
              <ul className="space-y-2">
                <li>
                  <NavLink to="/menu">
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-full border border-gray-300 text-xs uppercase shadow-none"
                    >
                      Shop Now
                    </Button>
                  </NavLink>
                </li>
                {navItems.map((item) => (
                  <li key={item.label}>
                    <NavLink to={item.path}>
                      <Button
                        variant="outline"
                        className="w-full justify-start rounded-full border border-gray-300 text-xs uppercase shadow-none"
                      >
                        {item.label}
                      </Button>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        )}
      </div>

      {/* Navigation links for larger screens */}
      <ul className="hidden lg:flex">
        {navItems.map((item) => (
          <li key={item.label}>
            <NavLink to={item.path}>
              <Button
                variant="outline"
                className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
              >
                {item.label}
              </Button>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Centered title */}
      <NavLink
        to="/home"
        className="font-aura absolute left-1/2 -translate-x-1/2 transform text-2xl font-bold text-black"
      >
        Amiga Café
      </NavLink>

      {/* Right-side buttons for larger screens */}
      <ul className="ml-auto justify-end lg:flex">
        <li className="hidden lg:block">
          <NavLink to="/menu">
            <Button
              variant="outline"
              className="rounded-full border border-gray-300 text-xs uppercase shadow-none"
            >
              Shop Now
            </Button>
          </NavLink>
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
