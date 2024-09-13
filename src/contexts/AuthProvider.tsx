import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { login as apiLogin, removeToken } from "@/services/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface AuthContextType {
  isAdmin: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const { mutate: mutateLogin, isPending: isLoggingIn } = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => apiLogin({ username, password }),
    onSuccess: () => {
      setIsAdmin(true);
      navigate("/secret-passage-to-admin-dashboard/menu");
      toast.success("Login successful!");
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error("Login failed. Please try again.");
      setIsAdmin(false);
    },
  });

  const login = (username: string, password: string) => {
    mutateLogin({ username, password });
  };

  const logout = () => {
    setIsAdmin(false);
    removeToken();
    navigate("/secret-passage-to-admin-dashboard");
  };

  const isLoading = isLoggingIn;

  return (
    <AuthContext.Provider value={{ isAdmin, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
