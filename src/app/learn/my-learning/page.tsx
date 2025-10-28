"use client";

import { BookBookmarkIcon } from "@phosphor-icons/react/dist/ssr";
import { Tabs } from "@/components/ui/tabs";
import { LearningCard } from "@/components/learn/learning-card";
import { useState } from "react";

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState("in-progress");

  // Cursos em andamento
  const inProgressCourses = [
    {
      title: "Learn Advanced React",
      type: "course" as const,
      progress: 0,
      description: "Welcome to Learn Advanced React",
      icon: "/react-icon.svg",
      isPinned: true,
      lessons: [
        {
          id: "1",
          title: "Welcome to Learn Advanced React!",
          type: "informational" as const,
          locked: false,
        },
        {
          id: "2",
          title: "Understanding React Hooks",
          type: "video" as const,
          duration: "15 min",
          locked: true,
        },
      ],
    },
  ];

  // Cursos completos (exemplo)
  const completedCourses = [
    {
      title: "Introduction to JavaScript",
      type: "course" as const,
      progress: 100,
      icon: "/javascript-icon.png",
    },
  ];

  // Skill paths
  const skillPaths = [
    {
      title: "Build Web Apps with ASP.NET",
      type: "skill-path" as const,
      progress: 17,
      icon: "/aspnet-icon.png",
    },
  ];

  const myLearningTabs = [
    {
      id: "in-progress",
      label: "Em andamento",
      content: (
        <div className="space-y-4 mt-6">
          {inProgressCourses.map((course, index) => (
            <LearningCard key={index} {...course} />
          ))}
        </div>
      ),
    },
    {
      id: "completed",
      label: "Completos",
      content: (
        <div className="space-y-4 mt-6">
          {completedCourses.map((course, index) => (
            <LearningCard key={index} {...course} />
          ))}
        </div>
      ),
    },
    {
      id: "skill-paths",
      label: "Skill Paths",
      content: (
        <div className="space-y-4 mt-6">
          {skillPaths.map((path, index) => (
            <LearningCard key={index} {...path} />
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="py-4 lg:px-12 px-4 w-full">
      <div className="flex items-center justify-start space-x-2 py-6">
        <BookBookmarkIcon className="text-[#00C8FF]" size={28} weight="fill" />
        <span className="font-bold bg-blue-gradient-500 bg-clip-text text-transparent text-lg">
          Meu Aprendizado
        </span>
      </div>

      {/* Tabs Section */}
      <div>
        <Tabs tabs={myLearningTabs} defaultTab="in-progress" />
      </div>
    </div>
  );
}
