import { getActiveCourse } from "@/actions";

export default async function SectionsPage() {
  const activeCourse = await getActiveCourse();
  //   const modules = await listModulesProgress(activeCourse?.id);

  console.log(activeCourse);

  return (
    <div>
      {/* <ModulesList
        modules={modules}
        courseId={activeCourse.id}
        onToggle={handleToggleModules}
        onModuleChange={fetchRoadmap}
      /> */}
    </div>
  );
}
