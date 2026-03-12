import { apiSlice } from "./apiSlice";

export const tableApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query<any, void>({
      query: () => "/Table",
      providesTags: ["Tables"],
    }),
    getReservations: builder.query<{ data: any[] }, void>({
      query: () => "/Reservation", // Backend endpointinə uyğun dəyiş
      providesTags: ["Reservation"],
    }),
    addTable: builder.mutation<any, any>({
      query: (body) => ({
        url: "/Table",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tables"],
    }),
    updateTable: builder.mutation<any, { id: string; body: any }>({
      query: ({ id, body }) => ({
        url: `/Table/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Tables"],
    }),
    deleteTable: builder.mutation<any, string>({
      query: (id) => ({
        url: `/Table/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tables"],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useAddTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
  useGetReservationsQuery,
} = tableApi;
