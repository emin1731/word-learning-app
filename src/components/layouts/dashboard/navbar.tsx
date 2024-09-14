import { useGetProfile } from "@/api/queries/user.queries";
import Logo from "@/components/common/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DashboardNavbar() {
  const { data } = useGetProfile();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="top-0 z-50 w-full bg-background border-b border-border px-12">
      <div className="flex items-center justify-between px-3 py-6 md:py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-start rtl:justify-end">
          <a href="/dashboard" className="flex ms-2 md:me-24">
            <Logo className="w-40 md:w-20 h-auto" />
          </a>
        </div>
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="size-10 rounded-full bg-muted"></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
              <DropdownMenuLabel>
                <div className="h-full flex items-center gap-x-4">
                  <div className="size-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="text-base font-semibold">
                      {data?.data.res.username}
                    </p>
                    <p className="text-xs text-gray-500">
                      {data?.data.res.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                Dark mode
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
