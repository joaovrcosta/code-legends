"use client";

import { useState } from "react";
import { generateCertificate } from "@/actions/course/generate-certificate";
import { Button } from "../ui/button";
import { CertificateModal } from "./certificate-modal";
import type { CompletedCourse } from "@/types/user-course.ts";

interface GenerateCertificateButtonProps {
  courseId: string;
  course: CompletedCourse;
}

export function GenerateCertificateButton({
  courseId,
  course,
}: GenerateCertificateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleOpenModal = async () => {
    if (isGenerating) return;

    try {
      setIsGenerating(true);
      // Gera o certificado na API primeiro
      await generateCertificate(courseId);
      setIsOpen(true);
    } catch (error) {
      console.error("Erro ao gerar certificado:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao gerar certificado"
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleOpenModal}
        disabled={isGenerating}
        variant="outline"
        size="sm"
        className="text-[#00c8ff] border-[#00c8ff] hover:bg-[#00c8ff] hover:text-white"
      >
        {isGenerating ? "Gerando..." : "Gerar Certificado"}
      </Button>
      <CertificateModal
        open={isOpen}
        onOpenChange={setIsOpen}
        course={course}
      />
    </>
  );
}

