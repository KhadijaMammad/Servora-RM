// src/api/orderApi.ts
import { apiSlice } from "./apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // 1. Sifariş yaratmaq (Ofisiant üçün)
    createDineInOrder: builder.mutation<any, any>({
      query: (body) => ({
        url: "/Order/dine-in",
        method: "POST",
        body, // Bu, sənin göndərdiyin JSON strukturudur
      }),
      invalidatesTags: ["Orders"], // Sifariş yarandıqda mətbəx ekranını yenilə
    }),

    // 2. Aktiv sifarişləri çəkmək (Mətbəx üçün)
    getActiveOrders: builder.query<any, void>({
      query: () => "/Order/active",
      providesTags: ["Orders"],
    }),

    // 3. Statusu dəyişmək (Mətbəx üçün)
    updateOrderStatus: builder.mutation<any, { id: string; status: number }>({
      query: ({ id, status }) => ({
        url: `/Order/${id}/status`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: ["Orders"],
    }),
    getAllOrders: builder.query<any, void>({
      query: () => "/Order", 
      providesTags: ["Orders"],
    }),
  }),
});

export const { 
  useCreateDineInOrderMutation, 
  useGetActiveOrdersQuery, 
  useUpdateOrderStatusMutation,
  useGetAllOrdersQuery,
} = orderApi;