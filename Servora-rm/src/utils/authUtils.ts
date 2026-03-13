// src/utils/authUtils.ts

export const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const decoded = JSON.parse(jsonPayload);
    
  
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || decoded.role;
  } catch (error) {
    console.error("Tokeni oxumaq mümkün olmadı:", error);
    return null;
  }
};