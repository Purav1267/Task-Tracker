export const saveToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
};

export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const logout = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.location.href = "/";
  }
};
