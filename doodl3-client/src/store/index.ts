import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ipfsApi from "./ipfsApi";

const store = configureStore({
  reducer: { [ipfsApi.reducerPath]: ipfsApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ipfsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
