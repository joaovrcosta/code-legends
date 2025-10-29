import { ReactJSCourseBanner } from "@/components/course/courses/react-js/banner";
import { CourseContent } from "@/components/course/courses/react-js/content";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import {
  PlayIcon,
  PlusIcon,
  ThumbsUpIcon,
} from "@phosphor-icons/react/dist/ssr";

export const dynamic = "force-dynamic";

const myLearningTabs = [
  {
    id: "in-progress",
    label: "Conteúdo",
    content: (
      <div>
        <CourseContent />
      </div>
    ),
  },
  { id: "completed", label: "Sobre", content: <div>Completos</div> },
];

export default function ReactJsPage() {
  return (
    <div>
      <ReactJSCourseBanner />
      <section className="flex items-center justify-between mt-4 mb-4 lg:px-12 px-4">
        <Tabs tabs={myLearningTabs} defaultTab="in-progress" />
      </section>
    </div>
  );
}
