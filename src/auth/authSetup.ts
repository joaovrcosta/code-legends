import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

// @ts-ignore - NextAuth v5 beta tem incompatibilidades de tipos
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Autenticar na API externa
          const response = await fetch(`${API_BASE_URL}/users/auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();
          const token = data.token;

          if (!token) {
            return null;
          }

          // Buscar dados do usuário usando o token
          const userResponse = await fetch(`${API_BASE_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!userResponse.ok) {
            return null;
          }

          const userData = await userResponse.json();

          // Retornar usuário com token
          return {
            id: userData.user.id,
            name: userData.user.name,
            email: userData.user.email,
            image: userData.user.avatar,
            accessToken: token,
          };
        } catch (error) {
          console.error("Erro ao autenticar:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger }: any) {
      // Na primeira vez (login), adicionar dados do usuário ao token
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).accessToken;
      }

      // Validar token com a API em cada requisição (exceto no signIn)
      if (token.accessToken && trigger !== "signIn") {
        try {
          const response = await fetch(`${API_BASE_URL}/me`, {
            headers: {
              Authorization: `Bearer ${token.accessToken}`,
            },
            cache: "no-store",
          });

          if (!response.ok) {
            // Token inválido, forçar logout
            return null;
          }

          const data = await response.json();

          // Atualizar dados do usuário
          token.id = data.user.id;
          token.name = data.user.name;
          token.email = data.user.email;
          token.picture = data.user.avatar;
        } catch (error) {
          console.error("Erro ao validar token:", error);
          return null;
        }
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 dias
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
});
