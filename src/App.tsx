import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import { CartProvider } from "./contexts/CartProvider";

import ProtectedRoute from "./components/protected-route";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Menu from "./pages/Menu";
import OrderItem from "./pages/OrderItem";
import Cart from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import AdminMenu from "./pages/AdminMenu";
import { AuthProvider } from "./contexts/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
      // refetchOnWindowFocus: false,
    },
  },
});

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route index element={<Navigate replace to="home" />} />
        <Route element={<AppLayout />}>
          <Route path="home" element={<LandingPage />} />
          <Route path="menu" element={<Menu />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order/:orderId" element={<OrderItem />} />
        </Route>
        {/* admin side */}
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="secret-passage-to-admin-dashboard/menu"
            element={<AdminMenu />}
          />
        </Route>

        <Route
          path="secret-passage-to-admin-dashboard"
          element={<AdminLogin />}
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AnimatedRoutes />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "12px",
            maxWidth: "500px",
            padding: "8px 16px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
