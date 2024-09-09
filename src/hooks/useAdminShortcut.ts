import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAdminShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Check for Ctrl + Shift + A
      if (event.ctrlKey && event.shiftKey && event.key === "A") {
        event.preventDefault();
        navigate("/secret-passage-to-admin-dashboard");
      }
    };

    // Add event listener for keydown
    window.addEventListener("keydown", handleKeyPress);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [navigate]);
}
