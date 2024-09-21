/**
 * This is prefix for authentication routes
 * Routes with this prefix are not available for logged in users
 */
export const authRoutesPrefix = '/auth';

/**
 * These routes are used for authentication
 * @type string[]
 */
export const authRoutes = {
    SIGN_IN: `${authRoutesPrefix}/signin`,
    SIGN_UP: `${authRoutesPrefix}/signup`,
    ERROR: `${authRoutesPrefix}/error`,
};

export const DEFAULT_LOG_IN_REDIRECT = '/';
