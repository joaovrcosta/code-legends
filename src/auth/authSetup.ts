import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3333";

async function refreshAccessToken(token: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/token/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: token.refreshToken,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("❌ Erro da API:", errorData);
      throw new Error(`Refresh token inválido: ${response.status}`);
    }

    const refreshedTokens = await response.json();

    return {
      ...token,
      accessToken: refreshedTokens.token,
      accessTokenExpires: Date.now() + 10 * 60 * 1000, // 10 minutos
      error: undefined,
    };
  } catch (error: any) {
    console.error("❌ Erro ao renovar token:", error.message);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

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
            credentials: "include",
          });

          if (!response.ok) {
            return null;
          }

          const data = await response.json();
          const token = data.token;

          // Extrair refreshToken do cookie da resposta
          const cookies = response.headers.get("set-cookie");
          let refreshToken = null;
          if (cookies) {
            const match = cookies.match(/refreshToken=([^;]+)/);
            if (match) {
              refreshToken = match[1];
            }
          }

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

          // Retornar usuário com tokens e tempo de expiração
          return {
            id: userData.user.id,
            name: userData.user.name,
            email: userData.user.email,
            image: userData.user.avatar,
            accessToken: token,
            refreshToken: refreshToken,
            accessTokenExpires: Date.now() + 10 * 60 * 1000, // 10 minutos
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
    async jwt({ token, user }: any) {
      // Login inicial - armazenar todos os dados
      if (user) {
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          picture: user.image,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      // Token ainda válido - retornar sem alterações
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Token expirado - tentar renovar
      console.log("⏰ Access token expirado, tentando renovar...");
      const refreshedToken = await refreshAccessToken(token);

      if (refreshedToken.error) {
        console.error("💥 Falha ao renovar token - usuário será deslogado");
      }

      return refreshedToken;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        (session as any).accessToken = token.accessToken;
        (session as any).error = token.error;
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
