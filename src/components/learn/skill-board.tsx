import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";

const skills = [
  { name: "HTML & CSS", value: 47, color: "bg-orange-500" },
  { name: "Styled Components", value: 72, color: "bg-purple-500" },
  { name: "ReactJS", value: 38, color: "bg-cyan-500" },
  { name: "Web Designer", value: 84, color: "bg-yellow-500" },
  { name: "Patterns", value: 0, color: "bg-green-500" },
  { name: "Performance", value: 0, color: "bg-red-500" },
];

export function SkillBoard() {
  return (
    <div className="border border-[#25252A] rounded-2xl p-4 bg-transparent text-white">
      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>JV</AvatarFallback>
        </Avatar>
        <p className="text-lg font-semibold">João Victor</p>
      </div>
      <div className="mt-6 space-y-4">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center justify-between ">
            <span className="text-sm" style={{ color: skill.color }}>
              {skill.name}
            </span>
            <div className="flex items-center space-x-2">
              <Progress value={skill.value} className={skill.color} />
              <span className="text-xs">{skill.value}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-gray-400 cursor-pointer hover:text-white">
        Mostrar mais &gt;
      </div>
    </div>
  );
}
