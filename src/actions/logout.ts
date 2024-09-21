'use server';

import { signOut } from '@/auth';
import { authRoutes } from '@/routes';

export async function logout() {
    await signOut({
        redirectTo: authRoutes.SIGN_IN,
    });
}
