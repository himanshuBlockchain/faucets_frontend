import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../env";
import { getLocalStorage } from "../utils/localStorage";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("token"));
      return headers;
    },
  }),
  tagTypes: ["Team"], // automatic-data fetching
  endpoints: (builder) => ({
    getMyRef: builder.query({
      query: () => "/secure/api/v1/fetch_referral",
      providesTags: ["Team"], // automatic-data fetching
    }),
    getAllMember: builder.query({
      query: () => "/secure/api/v1/fetch_all_member",
      providesTags: ["Team"], // automatic-data fetching
    }),
    editMember: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/edit_member",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Team"], // automatic-data fetching
    }),
    deleteMember: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/delete_member",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Team"], // automatic-data fetching
    }),
  }),
});

export const {
  useGetMyRefQuery,
  useGetAllMemberQuery,
  useDeleteMemberMutation,
  useEditMemberMutation,
} = teamApi;
