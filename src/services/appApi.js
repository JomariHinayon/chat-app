import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// define a server user a base URL

const appApi = createApi({
  reducerPath: "appApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5001",
  }),

  endpoints: (builder) => ({
    // creating the user
    singupUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),

    // login the user
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),

    // logout the user
    logoutUser: builder.mutation({
      query: (user) => ({
        url: "/logout",
        method: "DELETE",
        body: payload,
      }),
    }),
  }),
});

export const { useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation } = appApi;
export default appApi;
