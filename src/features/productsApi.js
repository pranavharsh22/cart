import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const baseUrl="https://product-gxut.onrender.com"
const baseUrl="http://localhost:5000"
export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${baseUrl}` }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "products",
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
