import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
 baseQuery: fetchBaseQuery({
    baseUrl: "https://servora.api.nantech.az/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        console.log("Token əlavə edildi:", token); // Debug üçün tokeni konsola yazdırırıq
      }
      return headers;
    },
  }),
  tagTypes: ['Categories', 'Users', 'Ingredients', 'Menu', 'Tables', 'Orders', 'Reservation'],
  endpoints: () => ({}), 
});

