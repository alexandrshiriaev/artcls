'use server';

import { signOut } from '@/auth';
import { authRoutes } from '@/routes';

export async function logout(redirectTo?: string) {
    await signOut({
        redirectTo: redirectTo || authRoutes.SIGN_IN,
    });
}
