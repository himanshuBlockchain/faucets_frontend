import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../env";
import { getLocalStorage } from "../utils/localStorage";

export const faucetApi = createApi({
  reducerPath: "faucetApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("token"));
      return headers;
    },
  }),
  tagTypes: ["Faucet"], // automatic-data fetching
  endpoints: (builder) => ({
    addFaucet: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/add_faucet",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Faucet"], // automatic-data fetching
    }),
    getFaucet: builder.query({
      query: () => "/secure/api/v1/fetch_faucet",
      providesTags: ["Faucet"], // automatic-data fetching
    }),
    getAllFaucet: builder.query({
      query: () => "/secure/api/v1/fetch_faucet",
      providesTags: ["Faucet"], // automatic-data fetching
    }),
    editFaucet: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/edit_faucet",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Faucet"], // automatic-data fetching
    }),
    deleteFaucet: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/delete_faucet",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Faucet"], // automatic-data fetching
    }),
  }),
});

export const {
  useAddFaucetMutation,
  useGetFaucetQuery,
  useGetAllFaucetQuery,
  useEditFaucetMutation,
  useDeleteFaucetMutation,
} = faucetApi;
