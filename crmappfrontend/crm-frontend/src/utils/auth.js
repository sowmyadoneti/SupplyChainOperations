import { jwtDecode } from 'jwt-decode';

export const getToken = () => localStorage.getItem('token');

export const getRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    console.log("📦 DECODED TOKEN PAYLOAD:", decoded); // optional debug

    const roles = decoded.roles;

    if (Array.isArray(roles) && roles.length > 0) {
      return roles[0]; // ✅ returns "STAFF"
    }

    return null;
  } catch (err) {
    console.error("❌ Failed to decode token:", err);
    return null;
  }
};

export const isLoggedIn = () => !!getToken();
