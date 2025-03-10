import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSubmodule } from "@/actions/actions"; // Importa a ação de criar submódulo
import { Card } from "../ui/card";

export default function CreateSubmoduleForm() {
  const [moduleId, setModuleId] = useState<string>(""); // Altere para string vazia
  const [submoduleName, setSubmoduleName] = useState(""); // Para o nome do submódulo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Chama a função createSubmodule passando os parâmetros
      await createSubmodule(Number(moduleId), submoduleName); // Converte para número no momento do envio
      // Limpa os campos após o sucesso
      setModuleId(""); // Limpa o campo de ID
      setSubmoduleName(""); // Limpa o campo de nome do submódulo
    } catch (error) {
      console.error("Erro ao criar o submódulo:", error);
    }
  };

  return (
    <Card className="p-4">
      <h3>Criar submódulo</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          placeholder="ID do módulo"
          name="moduleId"
          value={moduleId}
          onChange={(e) => setModuleId(e.target.value)} // Não mais converte diretamente para número aqui
        />
        <Input
          placeholder="Nome do submódulo"
          name="submoduleName"
          value={submoduleName}
          onChange={(e) => setSubmoduleName(e.target.value)}
        />
        <Button type="submit">Create Submodule</Button>
      </form>
    </Card>
  );
}
