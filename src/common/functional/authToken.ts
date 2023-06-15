import { TokenCategory } from "../constants";

interface IAuthToken {
  accessToken: string;
  refreshToken: string;
}

export function saveAuthToken(token: IAuthToken): void {
  localStorage.setItem(TokenCategory.Access, token.accessToken);
  localStorage.setItem(TokenCategory.Refresh, token.refreshToken);
}

export function setNewAccessToken(token: IAuthToken["accessToken"]): void {
  localStorage.setItem(TokenCategory.Access, token);
}

export function retrieveAuthToken(category: TokenCategory): string | null {
  if (category === TokenCategory.Access) {
    return localStorage.getItem(TokenCategory.Access);
  } else {
    return localStorage.getItem(TokenCategory.Refresh);
  }
}

export function removeAuthToken(category: TokenCategory): void {
  if (category === TokenCategory.Access) {
    localStorage.removeItem(TokenCategory.Access);
  } else {
    localStorage.removeItem(TokenCategory.Refresh);
  }
}

export function getUserID(category = TokenCategory.Access): number | null {
  const token = retrieveAuthToken(category);
  if (!token) return null;

  return Number(JSON.parse(atob(token.split(".")[1])).sub);
}

export function isAuthTokenValid(offset = 0): boolean {
  const authToken = retrieveAuthToken(TokenCategory.Access);
  if (!authToken) return false;

  const expiry = JSON.parse(atob(authToken.split(".")[1])).exp * 1000;
  const expiryDate = new Date(expiry - offset);
  const now = new Date();

  return now < expiryDate;
}

export function isTokenForAdmin(): boolean {
  if (!isAuthTokenValid()) return false;

  const authToken = retrieveAuthToken(TokenCategory.Access)!;
  const isAdmin = JSON.parse(atob(authToken.split(".")[1])).role == "admin";
  return isAdmin;
}
