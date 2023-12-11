import { apiSlice } from "./apiSlice";

export const appApiEndpoints = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
 
    saveStudent: builder.mutation({
      query: (credentials) => ({
        url: "/sendresult",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useSaveStudentMutation } = appApiEndpoints;