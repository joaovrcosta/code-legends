"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { X, Copy, Download } from "lucide-react";
import { getCurrentUser } from "@/actions/user/get-current-user";
import type { User } from "@/types/user";
import type { CompletedCourse } from "@/types/user-course.ts";
import jsPDF from "jspdf";

interface CertificateModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: CompletedCourse;
}

export function CertificateModal({
  open,
  onOpenChange,
  course,
}: CertificateModalProps) {
  const [language, setLanguage] = useState<"pt" | "en">("pt");
  const [shareLink, setShareLink] = useState<string>("");
  const [isDownloading, setIsDownloading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (open) {
      getCurrentUser().then(setUser);
      // Gera o link de compartilhamento
      const link = `${window.location.origin}/certificates/${course.id}`;
      setShareLink(link);
    }
  }, [open, course.id]);

  // const handleGenerateCertificate = async () => {
  //   if (isGenerating) return;

  //   try {
  //     setIsGenerating(true);
  //     await generateCertificate(course.id);
  //     // Após gerar, atualiza o link se necessário
  //   } catch (error) {
  //     console.error("Erro ao gerar certificado:", error);
  //     alert(
  //       error instanceof Error ? error.message : "Erro ao gerar certificado"
  //     );
  //   } finally {
  //     setIsGenerating(false);
  //   }
  // };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Link copiado para a área de transferência!");
  };

  const handleDownloadCertificate = () => {
    if (isDownloading || !user) return;

    setIsDownloading(true);

    try {
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();

      // Background gradient effect
      doc.setFillColor(250, 250, 250);
      doc.rect(0, 0, width, height, "F");

      // Title
      doc.setFontSize(32);
      doc.setTextColor(34, 197, 94); // Verde
      doc.setFont("helvetica", "bold");
      doc.text("CERTIFICADO DE CONCLUSÃO", width / 2, 50, {
        align: "center",
      });

      // Subtitle
      doc.setFontSize(18);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      doc.text(
        language === "pt" ? "Certificamos que" : "This certifies that",
        width / 2,
        70,
        { align: "center" }
      );

      // Student name
      doc.setFontSize(24);
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(user.name || "Estudante", width / 2, 90, {
        align: "center",
        maxWidth: width - 40,
      });

      // Course completion text
      doc.setFontSize(16);
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      const completionText =
        language === "pt"
          ? `concluiu com sucesso o curso de ${course.title}`
          : `has successfully completed the course ${course.title}`;
      doc.text(completionText, width / 2, 110, {
        align: "center",
        maxWidth: width - 40,
      });

      // Date
      const completionDate = new Date(course.completedAt);
      const dateText =
        language === "pt"
          ? `Concluído em ${completionDate.toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}`
          : `Completed on ${completionDate.toLocaleDateString("en-US", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}`;

      doc.setFontSize(14);
      doc.text(dateText, width / 2, 130, { align: "center" });

      // Certificate ID
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.text(`ID: ${course.id}`, width / 2, height - 30, {
        align: "center",
      });

      // Download
      doc.save(`certificado-${course.title}-${user.name}.pdf`);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Erro ao gerar o certificado em PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  // const handleShare = (platform: string) => {
  //   const text =
  //     language === "pt"
  //       ? `Acabei de concluir o curso ${course.title}!`
  //       : `I just completed the course ${course.title}!`;
  //   const url = encodeURIComponent(shareLink);

  //   const shareUrls: Record<string, string> = {
  //     whatsapp: `https://wa.me/?text=${encodeURIComponent(
  //       text + " " + shareLink
  //     )}`,
  //     linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  //     twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
  //       text
  //     )}&url=${url}`,
  //     facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  //   };

  //   if (shareUrls[platform]) {
  //     window.open(shareUrls[platform], "_blank");
  //   }
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-[#121214] border-[#25252a]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-xl">
              Ver Certificado
            </DialogTitle>
            <DialogClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          {/* Preview do Certificado */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-center space-y-4">
              <div className="text-2xl font-bold text-green-600">
                CERTIFICADO DE CONCLUSÃO
              </div>
              <div className="text-gray-600">
                {language === "pt" ? "Certificamos que" : "This certifies that"}
              </div>
              <div className="text-xl font-bold text-black">
                {user?.name || "Estudante"}
              </div>
              <div className="text-gray-600">
                {language === "pt"
                  ? `concluiu com sucesso o curso de ${course.title}`
                  : `has successfully completed the course ${course.title}`}
              </div>
              <div className="text-sm text-gray-500 mt-4">
                {new Date(course.completedAt).toLocaleDateString(
                  language === "pt" ? "pt-BR" : "en-US",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </div>
              <div className="text-xs text-gray-400 mt-4">ID: {course.id}</div>
            </div>
          </div>

          {/* Opções */}
          <div className="space-y-6">
            {/* Idioma */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Idioma
              </label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    value="pt"
                    checked={language === "pt"}
                    onChange={(e) => setLanguage(e.target.value as "pt" | "en")}
                    className="w-4 h-4 text-[#00c8ff]"
                  />
                  <span className="text-muted-foreground">Português</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    value="en"
                    checked={language === "en"}
                    onChange={(e) => setLanguage(e.target.value as "pt" | "en")}
                    className="w-4 h-4 text-[#00c8ff]"
                  />
                  <span className="text-muted-foreground">Inglês</span>
                </label>
              </div>
            </div>

            {/* Link para compartilhamento */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Link para compartilhamento
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareLink}
                  readOnly
                  className="flex-1 bg-[#1a1a1a] border border-[#333333] rounded px-3 py-2 text-sm text-white"
                />
                <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  size="icon"
                  className="border-[#333333]"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Botão de Download */}
            <Button
              onClick={handleDownloadCertificate}
              disabled={isDownloading || !user}
              className="w-full bg-[#00c8ff] hover:bg-[#00b8e6] text-white"
              size="lg"
            >
              <Download className="h-5 w-5 mr-2" />
              {isDownloading ? "Gerando PDF..." : "Baixar Certificado"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
