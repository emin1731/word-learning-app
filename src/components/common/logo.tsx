import LogoSvg from "@/assets/logo.svg";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <img src={LogoSvg} alt="OpenConnect" className={cn("w-72", className)} />
  );
}
