import { apiSlice } from "./apiSlice";

export const kitchenApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getActiveKitchenOrders: builder.query<any, void>({
      query: () => "/Kitchen/orders",
      providesTags: ["Orders"],
    }),

    updateKitchenOrderStatus: builder.mutation<any, { orderId: string; newStatus: string }>({
      query: ({ orderId, newStatus }) => ({
        url: `/Kitchen/orders/${orderId}/status`,
        method: "POST",
        params: { newStatus }, 
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const { useGetActiveKitchenOrdersQuery, useUpdateKitchenOrderStatusMutation } = kitchenApi;