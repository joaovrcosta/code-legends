import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTask } from "@/actions/admin";
import { Card } from "../ui/card";

export default function CreateTaskForm() {
  const [submoduleId, setSubmoduleId] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskType, setTaskType] = useState("video");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [order, setOrder] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const id = submoduleId ? Number(submoduleId) : 0;
      const orderNumber = order ? Number(order) : 0; // Converte order para número

      await createTask(
        id,
        taskTitle,
        taskDescription,
        taskType,
        videoUrl,
        videoDuration,
        orderNumber // Agora é um número
      );

      // Reseta os estados corretamente
      setSubmoduleId("");
      setOrder(""); // Reseta como string vazia
      setVideoDuration("");
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
        <Input
          placeholder="Duração do Vídeo"
          name="videoDuration"
          value={videoDuration}
          onChange={(e) => setVideoDuration(e.target.value)}
        />
        <Input
          placeholder="Ordem do conteúdo"
          name="order"
          value={order}
          type="number"
          onChange={(e) => setOrder(e.target.value)} // Permite string vazia
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
