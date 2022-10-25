import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../env";
import { getLocalStorage } from "../utils/localStorage";

export const leadApi = createApi({
  reducerPath: "leadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("token"));
      return headers;
    },
  }),
  tagTypes: ["Lead"], // automatic-data fetching
  endpoints: (builder) => ({
    addLead: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/add_lead",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Lead"], // automatic-data fetching
    }),
    getLead: builder.query({
      query: () => "/secure/api/v1/fetch_lead",
      providesTags: ["Lead"], // automatic-data fetching
    }),
    getAllLead: builder.query({
      query: () => "/secure/api/v1/fetch_all_lead",
      providesTags: ["Lead"], // automatic-data fetching
    }),
    editLead: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/edit_lead",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Lead"], // automatic-data fetching
    }),
    deleteLead: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/delete_lead",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Lead"], // automatic-data fetching
    }),
  }),
});

export const {
  useAddLeadMutation,
  useGetLeadQuery,
  useGetAllLeadQuery,
  useEditLeadMutation,
  useDeleteLeadMutation,
} = leadApi;
