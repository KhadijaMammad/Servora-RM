import { apiSlice } from "./apiSlice";

export const reportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDailyReport: builder.query<any, void>({ query: () => "/Reports/daily" }),
    getMonthlyReport: builder.query<any, void>({ query: () => "/Reports/monthly" }),
    getRangeReport: builder.query<any, { start: string; end: string }>({
      query: ({ start, end }) => `/Reports/range?startDate=${start}&endDate=${end}`,
    }),
  }),
});

export const { useGetDailyReportQuery, useGetMonthlyReportQuery, useGetRangeReportQuery } = reportApi;