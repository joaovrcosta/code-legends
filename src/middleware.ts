import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas públicas que não precisam de autenticação
  const publicRoutes = ["/login", "/signup", "/logout"];

  // Verificar se a rota atual é pública
  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Verificar se existe o cookie de sessão
  const sessionToken = request.cookies.get("session_token");

  // Se for uma rota pública e o usuário estiver logado, redirecionar para /learn
  if (isPublicRoute && sessionToken) {
    return NextResponse.redirect(new URL("/learn", request.url));
  }

  // Se não for uma rota pública, verificar autenticação
  if (!isPublicRoute) {
    if (!sessionToken) {
      // Redirecionar para login se não estiver autenticado
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
