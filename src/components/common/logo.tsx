import LogoSvg from "@/assets/logo.svg";
import LogoSvgDark from "@/assets/logo-dark.svg";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <img
      src={localStorage.getItem("theme") === "dark" ? LogoSvgDark : LogoSvg}
      alt="logo"
      className={cn("w-72 fill-white", className)}
    />
  );
}
