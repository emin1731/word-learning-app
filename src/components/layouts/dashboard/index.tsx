import { DashboardFooter } from "./footer";
import DashboardNavbar from "./navbar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />
      <main className="flex-1 px-40 mt-10 bg-background">
        <Outlet />
      </main>
      <DashboardFooter />
    </div>
  );
};
