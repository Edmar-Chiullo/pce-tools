'use server';

import { signOut } from "@/auth";

export async function logoutUser() {
  try {
    await signOut({ redirectTo: '/' });
    return 'logout successful';
  } catch (error) {

    return 'Error logging out:';
  }
}