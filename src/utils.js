export const isAuthorized = () => {
  const expiration = sessionStorage.getItem("expiresAt");
  if (expiration) {
    const expiresIn = new Date(JSON.parse(expiration)).getTime() - Date.now();
    if (expiresIn > 0) {
      return true;
    } else {
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("expiresAt");
    }
  }
  return false;
};
