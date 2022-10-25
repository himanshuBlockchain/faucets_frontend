import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { envConfig } from "../env";
import { getLocalStorage } from "../utils/localStorage";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({
    baseUrl: envConfig.BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", getLocalStorage("token"));
      return headers;
    },
  }),
  tagTypes: ["Wallet"], // automatic-data fetching
  endpoints: (builder) => ({
    addWallet: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/add_wallet",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Wallet"], // automatic-data fetching
    }),
    getWalletByUser: builder.query({
      query: () => "/secure/api/v1/my_wallet",
      providesTags: ["Wallet"], // automatic-data fetching
    }),
    getWalletList: builder.query({
      query: () => "/secure/api/v1/get_wallet_list",
      providesTags: ["Wallet"], // automatic-data fetching
    }),
    getAllWallet: builder.query({
      query: () => "/secure/api/v1/all_wallet",
      providesTags: ["Wallet"], // automatic-data fetching
    }),
    editWallet: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/edit_wallet",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Wallet"], // automatic-data fetching
    }),
    deleteWallet: builder.mutation({
      query: (body) => ({
        url: "/secure/api/v1/delete_wallet",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Wallet"], // automatic-data fetching
    }),
  }),
});

export const {
  useAddWalletMutation,
  useGetWalletByUserQuery,
  useGetAllWalletQuery,
  useEditWalletMutation,
  useDeleteWalletMutation,
  useGetWalletListQuery
} = walletApi;
