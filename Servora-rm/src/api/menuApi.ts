import type { Category, MenuItem } from "../types/menu";
import { apiSlice } from "./apiSlice";

export const menuApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Menu
    getMenuItems: builder.query<{ data: MenuItem[] }, void>({
      query: () => "/MenuItem",
      providesTags: ["Menu"],
    }),
    addMenuItem: builder.mutation<any, Omit<MenuItem, "id">>({
      query: (body) => ({ url: "/MenuItem", method: "POST", body }),
      invalidatesTags: ["Menu"],
    }),
    // Categories
    getCategories: builder.query<{ data: Category[] }, void>({
      query: () => "/Category",
      providesTags: ["Categories"],
    }),
    addCategory: builder.mutation<any, Partial<Category>>({
      query: (body) => ({ url: "/Category", method: "POST", body }),
      invalidatesTags: ["Categories"],
    }),
    toggleCategoryStatus: builder.mutation<
      any,
      { id: string; status: "activate" | "deactivate" }
    >({
      query: ({ id, status }) => ({
        url: `/Category/${id}/${status}`,
        method: "POST",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetMenuItemsQuery,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useToggleCategoryStatusMutation,
  useAddMenuItemMutation,
} = menuApi;
