import { auth } from '@/auth';
import { authRoutesPrefix, DEFAULT_LOG_IN_REDIRECT } from '@/routes';
import { NextResponse } from 'next/server';

export default auth(req => {
    const isLoggedIn = !!req.auth?.user;
    const nextUrl = req.nextUrl.pathname;
    if (nextUrl.startsWith(authRoutesPrefix) && isLoggedIn)
        return NextResponse.redirect(new URL(DEFAULT_LOG_IN_REDIRECT, req.url));
});

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
