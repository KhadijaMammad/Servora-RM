import { apiSlice } from "./apiSlice";

export const tableApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTables: builder.query<any, void>({
      query: () => "/Table",
      providesTags: ["Tables"],
    }),
    getReservations: builder.query<{ data: any[] }, void>({
      query: () => "/Reservation",
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
    updateTableStatus: builder.mutation<any, { id: string; status: number }>({
      query: ({ id, status }) => ({
        url: `/Table/${id}/status`,
        method: "POST",
        params: { status }, // Body əvəzinə params istifadə edirik
      }),
      invalidatesTags: [{ type: "Tables" }],
    }),
  }),
});

export const {
  useGetTablesQuery,
  useAddTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
  useGetReservationsQuery,
  useUpdateTableStatusMutation,
} = tableApi;
