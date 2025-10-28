"use client";

import { BookBookmarkIcon } from "@phosphor-icons/react/dist/ssr";
import { Tabs } from "@/components/ui/tabs";

export default function MyLearningPage() {
  const myLearningTabs = [
    {
      id: "in-progress",
      label: "Em andamento",
      content: (
        <div>
          <p className="text-white">Cursos em andamento...</p>
        </div>
      ),
    },
    {
      id: "completed",
      label: "Completos",
      content: (
        <div>
          <p className="text-white">Cursos completos...</p>
        </div>
      ),
    },
  ];

  return (
    <div className="py-4 lg:px-12 px-4">
      <div className="flex items-center justify-start space-x-2 py-6">
        <BookBookmarkIcon className="text-[#00C8FF]" size={28} weight="fill" />
        <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-lg">
          Meu Aprendizado
        </span>
      </div>

      {/* Tabs Section */}
      <div className="mt-4">
        <Tabs
          tabs={myLearningTabs}
          defaultTab="in-progress"
          onChange={(tabId) => console.log("Tab changed:", tabId)}
        />
      </div>
    </div>
  );
}
