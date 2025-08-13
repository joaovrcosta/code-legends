import Image from "next/image";
import { Progress } from "../ui/progress";
import level1complete from "../../../public/level-1.png";
import level2incomplete from "../../../public/level-2-incomplete.png";

export function LevelProgressBar() {
  return (
    <div className="flex justify-between items-center w-full gap-3">
      <div className="flex items-center justify-center flex-col text-muted-foreground ">
        <Image src={level1complete} alt="level1" />
        <span className="text-xs text-nowrap">Level 1</span>
      </div>
      <Progress value={46} className="h-[8px]" />
      <div className="flex items-center justify-center flex-col text-muted-foreground">
        <Image src={level2incomplete} alt="level2" />
        <span className="text-xs text-nowrap">Level 2</span>
      </div>
    </div>
  );
}
