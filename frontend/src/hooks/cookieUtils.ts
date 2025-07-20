import Cookies from 'js-cookie';

// Set a cookie
export const setCookie = (
  key: string,
  value: string,
  options?: Cookies.CookieAttributes
): void => {
  Cookies.set(key, value, options);
};

// Get a cookie
export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

// Remove a cookie
export const removeCookie = (
  key: string,
  options?: Cookies.CookieAttributes
): void => {
  Cookies.remove(key, options);
};

// Check if a cookie exists
export const hasCookie = (key: string): boolean => {
  return Cookies.get(key) !== undefined;
};

// Get all cookies
export const getAllCookies = (): Record<string, string> => {
  return Cookies.get();
};