import { auth } from '@/auth';
import {
    authRoutesPrefix,
    DEFAULT_LOG_IN_REDIRECT,
    privateRoutes,
    publicRoutes,
} from '@/routes';
import { NextResponse } from 'next/server';

export default auth(req => {
    const isLoggedIn = !!req.auth?.user;
    const nextUrl = req.nextUrl.pathname;

    if (nextUrl === privateRoutes.HOME && !isLoggedIn) {
        return NextResponse.redirect(new URL(publicRoutes.WELCOME, req.url));
    }

    if (nextUrl.startsWith(authRoutesPrefix) && isLoggedIn)
        return NextResponse.redirect(new URL(DEFAULT_LOG_IN_REDIRECT, req.url));
});

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};