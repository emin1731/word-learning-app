import { DashboardLayout } from "@/components/layouts/dashboard";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import { HomePage } from "@/pages/dashboard/homepage";
import { ProfilePage } from "@/pages/profile-set";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
