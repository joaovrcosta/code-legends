"use server";

import { prisma } from "@/lib/prisma";

export async function getTaskBySlug(slug: string) {
  if (!slug) return null;

  return await prisma.task.findUnique({
    where: {
      slug: slug,
    },
  });
}
