/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
  '/',
  '/help-center',
  '/about-us',
  '/contact-us',
  '/grievance-officer',
  '/help-center',
  '/privacy-policy',
  '/account',
  '/faqs',
  '/account/register',
];

export const authRoutes = ['/account', '/account/register'];
export const authorizedRoutes = '/dashboard';

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';
