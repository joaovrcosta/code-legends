"use client";

import CreateCourseForm from "@/components/admin/create-course-form";
import CreateModuleForm from "@/components/admin/create-module";
import CreateSubmoduleForm from "@/components/admin/create-submodule";
import CreateTaskForm from "@/components/admin/create-task-form";

export default function AdminPage() {
  return (
    <div className="p-4 space-y-4">
      <CreateCourseForm />
      <CreateModuleForm />
      <CreateSubmoduleForm />
      <CreateTaskForm />
    </div>
  );
}
