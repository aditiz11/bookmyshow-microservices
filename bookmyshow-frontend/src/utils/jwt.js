import { jwtDecode } from "jwt-decode";

export const decodeToken = (token) => {
    try {
        return jwtDecode(token);
    } catch {
        return null;
    }
};

export const getEmail = (token) =>
    decodeToken(token)?.sub ?? null;

export const getRole = (token) =>
    decodeToken(token)?.role ?? null;

export const getUserIdFromToken = () => {
    // Temporary until JWT contains userId
    return 1;
};

export const isExpired = (token) => {
    const decoded = decodeToken(token);

    if (!decoded?.exp) return true;

    return decoded.exp * 1000 < Date.now();
};