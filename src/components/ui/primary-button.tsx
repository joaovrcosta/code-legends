import { cn } from "@/lib/utils";
import { Button } from "./button";

export function PrimaryButton({
  children,
  variant = "primary",
  className,
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <Button
      className={cn(
        "px-6 h-[44px] w-full rounded-full border border-[#25252A] text-sm flex items-center justify-center text-white ease-linear duration-150",
        variant === "primary" && "bg-blue-gradient-first",
        variant === "secondary" &&
          "bg-gray-gradient-first hover:bg-gray-gradient-second",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
