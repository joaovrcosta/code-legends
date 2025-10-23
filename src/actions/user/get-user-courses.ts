"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentSession } from "../auth/session";
import { getUserFromAPI } from "./get-user-from-api";

export async function getUserCourses() {
  const user = await getUserFromAPI();

  if (!user?.id) {
    return [];
  }
}
