import { apiSlice } from './apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: '/Auth/Register',
        method: 'POST',
        body: formData,
      }),
    }),
    login: builder.mutation<any, any>({
      query: (credentials) => ({
        url: '/Auth/Login',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;