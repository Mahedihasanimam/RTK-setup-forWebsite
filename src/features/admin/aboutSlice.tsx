import { api } from "../../baseApi";

// Type for About item
export interface AboutItem {
  id: string;
  title: string;
  description: string;
}

// Type for Create About request body
export interface CreateAboutRequest {
  title: string;
  description: string;
}

export const aboutApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAbout: builder.query<AboutItem[], void>({
      query: () => `aboutList`,
    }),
    createAbout: builder.mutation<AboutItem, CreateAboutRequest>({
      query: (body) => ({
        url: `about-add`,
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false, // optional
});

// Export hooks for usage in components
export const { useGetAboutQuery, useCreateAboutMutation } = aboutApi;
