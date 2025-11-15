import { getActiveCourse, listModulesProgress } from "@/actions";
import { ModulesListWrapper } from "@/components/learn/modules-list-wrapper";

export default async function SectionsPage() {
  const activeCourse = await getActiveCourse();

  console.log(activeCourse?.slug);

  if (!activeCourse) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Nenhum curso ativo encontrado.
          </p>
        </div>
      </div>
    );
  }

  const modulesData = await listModulesProgress(activeCourse?.slug);

  console.log(modulesData);

  if (!modulesData?.modules) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Nenhum módulo encontrado para este curso.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ModulesListWrapper
        modules={modulesData.modules}
        courseId={activeCourse.id}
      />
    </div>
  );
}
