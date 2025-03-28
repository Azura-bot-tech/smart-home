import type { NextAuthConfig, User as NextAuthUser } from 'next-auth';
import type { AdapterUser } from 'next-auth/adapters';

interface User extends NextAuthUser {
  emailVerified?: Date | null;
}
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Redirect users to the dashboard if logged in, otherwise to the login page
      if (url.startsWith(baseUrl)) return url;
      return baseUrl;
    },
    async session({ session, token }) {
      // Attach user information to the session
      session.user = token.user as AdapterUser & User;
      return session;
    },
    async jwt({ token, user }) {
      // Persist user information in the token
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  providers: [], // Add a provider here
} satisfies NextAuthConfig;