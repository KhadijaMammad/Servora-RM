import type { AuthResponse,  User } from "../types/auth";
import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, FormData>({
      query: (formData) => ({
        url: "/Auth/Login",
        method: "POST",
        body: formData,
        headers: {}, 
      }),
    }),
    register: builder.mutation<any, FormData>({
      query: (formData) => ({
        url: "/Auth/Register",
        method: "POST",
        body: formData,
        headers: {},
      }),
    }),

    getAllUsers: builder.query<{ data: User[] }, void>({
      query: () => "/Auth/GetAll",
      providesTags: ["Users"],
    }),
    assignRole: builder.mutation<any, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/Auth/AssignRole/${id}?role=${role}`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useAssignRoleMutation,
} = authApi;
