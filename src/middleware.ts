import { auth } from "./auth/authSetup";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth(
  async (
    req: NextRequest & {
      auth: {
        user?: {
          id?: string;
        };
      } | null;
    }
  ) => {
    const { pathname } = req.nextUrl;
    const session = await auth();
    const isLoggedIn = !!session?.user;

    // Acessar dados de onboarding do token através da session
    const onboardingCompleted =
      (session as { onboardingCompleted?: boolean })?.onboardingCompleted ??
      false;

    // Rotas públicas
    const publicRoutes = ["/login", "/signup"];
    const isPublicRoute = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

    // Rotas de onboarding
    const onboardingRoutes = ["/learn/onboarding"];
    const isOnboardingRoute = onboardingRoutes.some((route) =>
      pathname.startsWith(route)
    );

    // Se estiver logado e tentar acessar login/signup
    if (isLoggedIn && (pathname === "/login" || pathname === "/signup")) {
      // Se não completou onboarding, redirecionar para onboarding
      if (!onboardingCompleted) {
        return NextResponse.redirect(
          new URL("/learn/onboarding/pick-a-goal", req.url)
        );
      }
      // Se completou, redirecionar para /learn
      return NextResponse.redirect(new URL("/learn", req.url));
    }

    // Se não estiver logado e não for rota pública, redirecionar para login
    if (!isLoggedIn && !isPublicRoute) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Se estiver logado, não completou onboarding e não está em rota de onboarding
    if (isLoggedIn && !onboardingCompleted && !isOnboardingRoute) {
      // Redirecionar para onboarding
      return NextResponse.redirect(
        new URL("/learn/onboarding/pick-a-goal", req.url)
      );
    }

    // Se completou onboarding e está tentando acessar rota de onboarding, redirecionar para /learn
    if (isLoggedIn && onboardingCompleted && isOnboardingRoute) {
      return NextResponse.redirect(new URL("/learn", req.url));
    }

    return NextResponse.next();
  }
);

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
