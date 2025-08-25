import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from "bcryptjs";

type UserProps = {
  id?: string
  name?: string | null
  email?: string | null
  password?: string | null
  image?: string | null
}

const users = [
    { id: '1', email: 'user1@example.com', password: 'password1', image: 'https://i.pravatar.cc/150?img=1' },
    { id: '2', email: 'user2@example.com', password: 'password2', image: 'https://i.pravatar.cc/150?img=2' },
    { id: '3', email: 'user3@example.com', password: 'password3', image: 'https://i.pravatar.cc/150?img=3' },
    { id: '4', email: 'ecschiullo@gmail.com', password: '123456', image: 'https://i.pravatar.cc/150?img=4' },
];

async function getUser(email: string): Promise<UserProps | undefined> {
  try {
    const user = users.find(user => user.email === email);
    if (!user) return undefined;

    return user;
  } catch (error) {
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUser(email);
                    if (!user) return null;
                    const passwordsMatch = password === user.password ? true : false;
                    ///const passwordsMatch = await bcrypt.compare(password, user.password || '');

                    if (passwordsMatch) return user;
                }

                return null;  
            }
        })
    ],
});