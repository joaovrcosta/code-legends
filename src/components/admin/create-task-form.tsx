import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask } from "@/actions/actions"; // Importa a ação de criar tarefa
import { Card } from "../ui/card";

export default function CreateTaskForm() {
  const [submoduleId, setSubmoduleId] = useState<string>(""); // Agora é uma string vazia
  const [taskTitle, setTaskTitle] = useState(""); // Título da tarefa
  const [taskDescription, setTaskDescription] = useState(""); // Descrição da tarefa
  const [taskType, setTaskType] = useState("video"); // Tipo da tarefa (video, article, quiz)
  const [videoUrl, setVideoUrl] = useState(""); // URL do vídeo

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Converte submoduleId para número apenas se não estiver vazio
      const id = submoduleId ? Number(submoduleId) : 0;
      await createTask(id, taskTitle, taskDescription, taskType, videoUrl);
      // Limpa os campos após o sucesso
      setSubmoduleId(""); // Limpa o campo do submódulo
      setTaskTitle("");
      setTaskDescription("");
      setTaskType("video");
      setVideoUrl("");
    } catch (error) {
      console.error("Erro ao criar a tarefa:", error);
    }
  };

  return (
    <Card className="p-4">
      <h3>Criar Tarefa</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="number"
          placeholder="ID do Submódulo"
          name="submoduleId"
          value={submoduleId}
          onChange={(e) => setSubmoduleId(e.target.value)} // Permite valor vazio
        />
        <Input
          placeholder="Título da Tarefa"
          name="taskTitle"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
        <Input
          placeholder="Descrição da Tarefa"
          name="taskDescription"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <Input
          placeholder="URL do Vídeo"
          name="videoUrl"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <select
          value={taskType}
          onChange={(e) => setTaskType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="video">Vídeo</option>
          <option value="article">Artigo</option>
          <option value="quiz">Quiz</option>
        </select>
        <Button type="submit">Create Task</Button>
      </form>
    </Card>
  );
}
