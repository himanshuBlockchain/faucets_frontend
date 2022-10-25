import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../env";
import { getLocalStorage } from "../utils/localStorage";

export const chainApi = createApi({
  reducerPath: "chainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("token"));
      return headers;
    },
  }),
  tagTypes: ["Chain"], // automatic-data fetching
  endpoints: (builder) => ({
    addChain: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/create_chain",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chain"], // automatic-data fetching
    }),
    getChain: builder.query({
      query: () => "/secure/api/v1/get_chain",
      providesTags: ["Chain"], // automatic-data fetching
    }),
    editChain: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/update_chain",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Chain"], // automatic-data fetching
    }),
    deleteChain: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/delete_chain",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Chain"], // automatic-data fetching
    }),
  }),
});

export const {
  useAddChainMutation,
  useGetChainQuery,
  useEditChainMutation,
  useDeleteChainMutation,
} = chainApi;
