import Logo from "@/components/common/logo";

export default function DashboardNavbar() {
  return (
    <nav className="top-0 z-50 w-full bg-background border-b border-gray-200 px-12 py-2 ">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <a href="/" className="flex ms-2 md:me-24">
              <Logo className="w-20 h-auto" />
            </a>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3 relative">
              <div
                className="absolute top-5 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow"
                id="dropdown-user"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
