import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://servora.api.nantech.az/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Category', 'Ingredient', 'Menu', 'Table', 'Order', 'Reservation'],
  endpoints: () => ({}), // Endpoint-ləri ayrı-ayrı fayllarda "inject" edəcəyik
});

