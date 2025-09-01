import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/pages/login',
  },
   callbacks: {
    authorized({ auth, request: { nextUrl }}) {
      const isLoggedIn = !!auth?.user;

      const isOnDashboard = nextUrl.pathname.startsWith('/pages/home');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/pages/home', nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
