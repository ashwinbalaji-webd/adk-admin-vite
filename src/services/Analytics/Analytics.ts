import { AdminApiService } from "../service";

const analytics = AdminApiService.enhanceEndpoints({}).injectEndpoints({
  endpoints: (build) => ({
    getGroupWiseUsers: build.query({
      query: (params: { active?: string } | null = null) => ({
        url: `/analytics/${import.meta.env.VITE_AIRLINE_CODE}/total-users`,
        method: "GET",
        params: params?.active ? { active: params?.active } : null,
      }),
    }),
    getGroupWiseQueries: build.query({
      query: () => ({
        url: `/analytics/${import.meta.env.VITE_AIRLINE_CODE}/total-queries`,
        method: "GET",
      }),
    }),
    getGroupWiseIntentAnalytics: build.query({
      query: () => ({
        url: `/analytics/${import.meta.env.VITE_AIRLINE_CODE}/intent-analytics`,
        method: "GET",
      }),
    }),
    getGroupWiseUnresolvedQueries: build.query({
      query: () => ({
        url: `/analytics/${import.meta.env.VITE_AIRLINE_CODE}/query-analytics`,
        method: "GET",
      }),
    }),
    getUserQueryCountsByGroupId: build.query({
      query: (params: { groupId: number }) => ({
        url: `/analytics/${import.meta.env.VITE_AIRLINE_CODE}/group/${
          params.groupId
        }/user-query-counts`,
        method: "GET",
      }),
    }),
    getInvocations: build.query({
      query: (params: { userId: string; groupId: number }) => ({
        url: `/analytics/${
          import.meta.env.VITE_AIRLINE_CODE
        }/invocations?user_id=${params.userId}&group_id=${params.groupId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyGetGroupWiseUsersQuery,
  useLazyGetGroupWiseQueriesQuery,
  useLazyGetGroupWiseIntentAnalyticsQuery,
  useLazyGetGroupWiseUnresolvedQueriesQuery,
  useLazyGetInvocationsQuery,
  useLazyGetUserQueryCountsByGroupIdQuery,
} = analytics;
