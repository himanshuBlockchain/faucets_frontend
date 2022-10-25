import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { chainApi } from "../service/chainApi";
import { faucetApi } from "../service/faucetApi";
import { leadApi } from "../service/leadApi";
import { teamApi } from "../service/teamApi";
import { userApi } from "../service/userApi";
import { walletApi } from "../service/walletApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [teamApi.reducerPath]: teamApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
    [faucetApi.reducerPath]: faucetApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
    [chainApi.reducerPath]: chainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      userApi.middleware,
      teamApi.middleware,
      leadApi.middleware,
      faucetApi.middleware,
      chainApi.middleware,
    ]),
});

setupListeners(store.dispatch);
