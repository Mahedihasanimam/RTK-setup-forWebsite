import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define API
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.80.13:8050/api/",
    prepareHeaders: (headers: Headers) => { // ✅ Explicit type
      const token = Cookies.get("token");
      console.log("tokenFromBaseApi", token);

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("Accept", "*/*");
        headers.set("Access-Control-Allow-Origin", "*");
      }

      return headers;
    },
  }),
  tagTypes: ["user", "blog", "faq", "about", "notification"] as const,
  endpoints: (builder) => ({}), // builder type inferred by TS
});

// Base image URL
export const imageUrl = "http://10.0.80.13:8050/";
