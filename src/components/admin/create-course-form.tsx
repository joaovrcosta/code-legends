import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCourse } from "@/actions/actions"; // Importa a ação de criar curso
import { Card } from "../ui/card";

export default function CreateCourseForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createCourse(title, description, slug);
  };

  return (
    <Card className="p-4 bg-[#1A1A1E]">
      <h3 className="text-white mb-3">Criar curso</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          placeholder="Slug"
          name="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <Button type="submit">Create Course</Button>
      </form>
    </Card>
  );
}
