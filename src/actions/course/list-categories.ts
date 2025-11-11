import { Category } from "@/types/categories";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

export async function listCategories(): Promise<Category[]> {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    next: { revalidate: 60 }, // opcional: cache de 1min
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar categorias");
  }

  const data = await response.json();
  return data.categories; // <- AQUI está o segredo
}
