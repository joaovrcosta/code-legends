import { Button } from "./button";

interface PrimaryButtonProps {
  children: React.ReactNode;
}

export function PrimaryButton({ children }: PrimaryButtonProps) {
  return (
    <Button className="bg-blue-gradient h-[52px] rounded-full border border-[#25252A] text-sm flex items-center justify-center px-6">
      {children}
    </Button>
  );
}
