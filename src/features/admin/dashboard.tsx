import { api } from "../../baseApi";

// Define types for statistics API responses
export interface StatisticsData {
  totalUsers: number;
  totalSales: number;
  totalRevenue: number;
  [key: string]: any;
}

export interface AnalyticsData {
  pageViews: number;
  clicks: number;
  conversions: number;
  [key: string]: any;
}

export interface MostEarningData {
  productId: string;
  productName: string;
  earnings: number;
}

// Optional: Filter type for query params
export type PeriodFilter = "daily" | "weekly" | "monthly" | "yearly";
export type AnalyticsFilter = "traffic" | "sales" | "engagement";

export const statisticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get statistics with period filter
    getStatistics: builder.query<StatisticsData, PeriodFilter>({
      query: (filter) => ({
        url: `/statistics?period=${filter}`,
        method: "GET",
      }),
    }),

    // Get analytics with filter
    getAnalytics: builder.query<AnalyticsData, AnalyticsFilter>({
      query: (filter) => ({
        url: `/analytics?filter=${filter}`,
        method: "GET",
      }),
    }),

    // Get most earning data for a given year
    getMostEarning: builder.query<MostEarningData[], number>({
      query: (year) => ({
        url: `/most-earning?year=${year}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks for usage
export const {
  useGetStatisticsQuery,
  useGetAnalyticsQuery,
  useGetMostEarningQuery,
} = statisticsApi;
