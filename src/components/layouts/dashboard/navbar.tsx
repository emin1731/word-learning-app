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
import { Link } from "react-router-dom";

export default function DashboardNavbar() {
  const { data } = useGetProfile();

  return (
    <nav className="top-0 z-50 w-full bg-secondary border-b border-gray-200 px-12">
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
              <DropdownMenuItem>Dark mode</DropdownMenuItem>
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
