/* eslint-disable @typescript-eslint/ban-types */
// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Extends the built-in session.user object from NextAuth.js
   */
  interface User {
    id?: string;
    auth_token?: string;
    iAuthenticated: boolean;
  }

  /**
   * Extends the session object from NextAuth.js
   */
  interface Session {
    user: User;
    // eslint-disable-next-line @typescript-eslint/ban-types
    auth_token?: string | {};
    isAuthenticated: boolean;
  }
}
