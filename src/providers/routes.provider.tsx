import { DashboardLayout } from "@/components/layouts/dashboard";
import { HomePage } from "@/pages/dashboard/homepage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
