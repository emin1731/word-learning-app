import { DashboardFooter } from "./footer";
import DashboardNavbar from "./navbar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />
      <div className="flex flex-1">
        {/* <Sidebar className="w-64" /> Sidebar width can be adjusted */}
        <main className="flex-1 px-20 py-5 bg-gray-100 bg-background">
          <Outlet />
        </main>
      </div>
      <DashboardFooter />
    </div>
  );
};
