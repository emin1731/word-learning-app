import { useGetProfile } from "@/api/queries/user.queries";
import Logo from "@/components/common/logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Sun, User, LogOut } from "lucide-react";

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
              <div className="size-10 rounded-full bg-primary"></div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 p-2">
              <DropdownMenuLabel>
                <div className="h-full flex items-center gap-x-4">
                  <div className="size-10 rounded-full bg-muted"></div>
                  <div>
                    <p className="text-base font-semibold">
                      {data?.data.username}
                    </p>
                    <p className="text-xs text-gray-500">{data?.data.email}</p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex gap-x-1 items-center justify-start">
                  <User size={16} />
                  <Link to="/profile">Profile</Link>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={toggleTheme}>
                {theme === "light" ? (
                  <div className="flex gap-x-1 items-center justify-start">
                    <Moon size={16} />
                    <div className="m-0">Dark mode</div>
                  </div>
                ) : (
                  <div className="flex gap-x-1 items-center justify-start">
                    <Sun size={16} />
                    <div className="m-0">Light mode</div>
                  </div>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex gap-x-1 items-center justify-start">
                  <LogOut size={16} />
                  <div>Log out</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
