import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../env";
import { getLocalStorage } from "../utils/localStorage";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.BASE_URL,
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("token"))
      return headers;
    },
  }),
  tagTypes: ["User"], // automatic-data fetching
  endpoints: (builder) => ({
    getLoginUser: builder.query({
      query: () => "/secure/api/v1/fetch_user",
      providesTags: ["User"], // automatic-data fetching
    }),
    // for auth user
    addUser: builder.mutation({
      query: (body) => ({
        url: "/public/api/v1/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    addGoogleAuth: builder.mutation({
      query: (body) => ({
        url: "/public/api/v1/auth/google_auth",
        method: "POST",
        body:{
          tokenId: body
        },
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    addLogin: builder.mutation({
      query: (body) => ({
        url: "/public/api/v1/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    addForgotPass: builder.mutation({
      query: (body) => ({
        url: "/public/api/v1/auth/forgot_password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    addResetPass: builder.mutation({
      query: (body) => ({
        url: "/public/api/v1/auth/reset_password",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"], // automatic-data fetching
    }),
    // for crud
    editUser: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/edit_user",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editImage: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/update_profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editPassword: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/edit_password",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    editEmail: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/edit_email",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetLoginUserQuery,
  useAddUserMutation,
  useAddLoginMutation,
  useAddForgotPassMutation,
  useEditImageMutation,
  useAddResetPassMutation,
  useEditUserMutation,
  useEditPasswordMutation,
  useEditEmailMutation,
  useAddGoogleAuthMutation
} = userApi;
