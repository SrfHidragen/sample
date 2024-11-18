/* eslint-disable no-self-assign */
import NextAuth, { User } from 'next-auth';
import { authConfig } from './auth.config';

interface ExtendedUser extends User {
  auth_token?: string;
}
//test46
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  trustHost: true,
  basePath: '/api/auth',
  pages: {
    signIn: '/account/login',
    signOut: '/',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ token, session }) {
      session.user = session.user;
      if (token.auth_token) {
        session.auth_token = token.auth_token;
        session.isAuthenticated = true;
      }
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      const extendedUser = user as ExtendedUser;
      if (trigger === 'update' && session.name) {
        token.name = session.name;
      }
      if (trigger === 'update' && session.image) {
        token.picture = session.image;
      }
      if (extendedUser?.auth_token) {
        token.auth_token = extendedUser.auth_token;
      }

      return token;
    },
  },

  ...authConfig,
});
