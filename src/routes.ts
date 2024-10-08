/**
 * This is prefix for authentication routes
 * Routes with this prefix are not available for logged in users
 */
export const authRoutesPrefix = '/auth';

/**
 * These routes are used for authentication
 */
export const authRoutes = {
    SIGN_IN: `${authRoutesPrefix}/signin`,
    SIGN_UP: `${authRoutesPrefix}/signup`,
    ERROR: `${authRoutesPrefix}/error`,
};

/**
 These routes are not available for not logged in users
 */
export const privateRoutes = {
    HOME: '/',
    NEW_STORY: '/new-story',
};

/**
 These routes are available for not logged in users
 */
export const publicRoutes = {
    WELCOME: '/welcome',
    PROFILE: `/profile`,
};

export const DEFAULT_LOG_IN_REDIRECT = '/';
