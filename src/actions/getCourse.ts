"use server";

import { prisma } from "@/lib/prisma";

export async function getCourse(slug: string) {
  if (!slug) return null;

  return await prisma.course.findUnique({
    where: { slug },
    include: {
      modules: {
        include: {
          submodules: {
            include: {
              tasks: {
                orderBy: {
                  order: "asc",
                },
              },
            },
          },
        },
      },
    },
  });
}
