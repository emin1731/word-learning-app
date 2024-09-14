import { AuthOnlyLayout } from "@/components/layouts/auth";
import { DashboardLayout } from "@/components/layouts/dashboard";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import { CardsPage } from "@/pages/dashboard/cards";
import { HomePage } from "@/pages/dashboard/homepage";
import { LearningPage } from "@/pages/dashboard/learning";
import { ModulePage } from "@/pages/dashboard/module";
import NotFoundPage from "@/pages/not-found";
import { ProfilePage } from "@/pages/profile";

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthOnlyLayout />}>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route index element={<HomePage />} />
            <Route path={":moduleId"} element={<ModulePage />} />
            <Route path={":moduleId/cards"} element={<CardsPage />} />
            <Route path={":moduleId/learning"} element={<LearningPage />} />
          </Route>
        </Route>
        <Route path="auth">
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
