import prisma from '@/lib/prisma';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { SignInSchema } from './zod';
import { compareSync } from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/signin',
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const parse = SignInSchema.safeParse(credentials);

        if (!parse.success) {
          return null;
        }

        const { email, password } = parse.data;

        const user = await prisma.user.findUnique({
          where: { email },
          include: { role: true },
        });

        if (!user || !user.password) {
          throw new Error('Email not found');
        }

        const passwordMatch = compareSync(password, user.password);

        if (!passwordMatch) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },

    session({ session, token }) {
      session.user.id = token.sub;
      session.user.role = token.role;
      return session;
    },
  },
});
