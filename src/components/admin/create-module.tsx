import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createModule } from "@/actions/actions";
import { Card } from "../ui/card";

export default function CreateModuleForm() {
  const [courseSlug, setCourseSlug] = useState(""); // Para o slug do curso
  const [moduleName, setModuleName] = useState(""); // Para o nome do módulo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createModule(courseSlug, moduleName);
      setCourseSlug("");
      setModuleName("");
    } catch (error) {
      console.error("Erro ao criar o módulo:", error);
    }
  };

  return (
    <Card className="p-4">
      <h3>Criar módulos</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Slug do curso"
          name="courseSlug"
          value={courseSlug}
          onChange={(e) => setCourseSlug(e.target.value)}
        />
        <Input
          placeholder="Nome do módulo"
          name="moduleName"
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
        />
        <Button type="submit">Create Module</Button>
      </form>
    </Card>
  );
}
