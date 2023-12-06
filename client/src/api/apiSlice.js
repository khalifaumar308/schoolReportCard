import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    saveStudent: builder.mutation({
      query: (credentials) => ({
        url: "/",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSaveStudentMutation } = appApi;