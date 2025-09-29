import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { getUser } from "./app/firebase/fbmethod";

type UserProps = {
  center: string
  uid?: string;
  userID?: string;
  userName?: string | null;
  usuario?: string | null;
  userPassword?: string | null | number;
  userPermission?: string | null;
  userRegistrationDate?: string | null | number;
  image?: string | null;
  email?: string | null;
};

async function getUsers(usuario: string): Promise<UserProps | undefined> {
  try {
    return await getUser(usuario);
  } catch (error) {
    throw new Error("Failed to fetch user.");
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        user: { label: "Usuario", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ usuario: z.string(), senha: z.string().min(3) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { usuario, senha } = parsedCredentials.data;
        const user = await getUsers(usuario);


        if (!user || !user.email) return null;

        const passwordsMatch = String(senha) === String(user.userPassword);
        if (!passwordsMatch) return null;

        return {
          id: user.userID,
          name: JSON.stringify({ first: user.userName, permission: user.userPermission, center: user.center }),
          email: user.email,
          role: user.userPermission,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 600, 
    updateAge: 60, 
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        (session.user as any).role = token.role;
      }
      return session;
    },
  }
});



























// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import Credentials from "next-auth/providers/credentials";

// import { z } from "zod";
// import { getUser } from "@/app/firebase/fbmethod";

// type UserProps = {
//   uid?: string;
//   userID?: string;
//   userName?: string | null;
//   usuario?: string | null;
//   userPassword?: string | null | number;
//   userPermission?: string | null;
//   userRegistrationDate?: string | null | number;
//   image?: string | null;
//   email?: string | null;
// };

// async function getUsers(usuario: string): Promise<UserProps | undefined> {
//   try {
//     return await getUser(usuario);
//   } catch (error) {
//     throw new Error("Failed to fetch user.");
//   }
// }

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   secret: process.env.AUTH_SECRET,
//   ...authConfig,
//   providers: [
//     Credentials({
//       name: "Credenciais",
//       credentials: {
//         usuario: { label: "Usuário", type: "text" },
//         senha: { label: "Senha", type: "password" },
//       },

//       async authorize(credentials) {
//         const parsedCredentials = z
//           .object({ usuario: z.string(), senha: z.string().min(3) })
//           .safeParse(credentials);

//         if (!parsedCredentials.success) return null;

//         const { usuario, senha } = parsedCredentials.data;
//         const user = await getUsers(usuario);


//         if (!user || !user.email) return null;

//         const passwordsMatch = String(senha) === String(user.userPassword);
//         if (!passwordsMatch) return null;

//         return {
//           id: user.userID,
//           name: user.userName,
//           email: user.email,
//           role: user.userPermission,
//         };
//       },
//     }),
//   ],

//   session: { strategy: "jwt" },

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//         token.email = user.email;
//         token.role = (user as any).role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         session.user.name = token.name as string;
//         session.user.email = token.email as string;
//         (session.user as any).role = token.role;
//       }
//       return session;
//     },
//   },
// });
