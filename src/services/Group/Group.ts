import { AdminApiService } from "../service";

const groups = AdminApiService.enhanceEndpoints({}).injectEndpoints({
  endpoints: (build) => ({
    getGroups: build.query({
      query: () => ({
        url: `/groups/${import.meta.env.VITE_AIRLINE_CODE}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyGetGroupsQuery } = groups;
