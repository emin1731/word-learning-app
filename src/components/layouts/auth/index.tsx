import Cookies from "js-cookie";
import { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export function AuthOnlyLayout() {
  const navigate = useNavigate();
  const isLoggedIn = Cookies.get("isLoggedIn") === "true";

  // Navigate to login if user is not logged in or profile fetch fails
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth/login");
    }
  }, [isLoggedIn, navigate]);

  // Only render Outlet if user is logged in and profile data is valid
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
}
