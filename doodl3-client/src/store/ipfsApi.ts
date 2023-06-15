import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ipfsApi = createApi({
  reducerPath: "ipfsApi",
  tagTypes: ["User"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://ipfs.io/ipfs/",
  }),
  endpoints: (builder) => ({
    getJSON: builder.query<
      { name: string; image: "string" },
      string | undefined
    >({
      query: (id = "") => id,
    }),
  }),
});

export default ipfsApi;
