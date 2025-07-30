import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// CommonService API slice for handling common API requests
const AdminApiService = createApi({
  reducerPath: "AdminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_ADMIN_API_URL,
    // credentials: "include",
    // prepareHeaders: prepareHeader
  }),
  endpoints: () => ({}),
});

export { AdminApiService };
