import { api } from "../../baseApi";

// Blog item type
export interface BlogItem {
  id: string;
  title: string;
  content: string;
  author?: string;
  createdAt?: string;
}

// Type for Create Blog request
export interface CreateBlogRequest {
  title: string;
  content: string;
  author?: string;
}

// Type for Update Blog request
export interface UpdateBlogRequest {
  id: string;
  body: Partial<CreateBlogRequest>;
}

export const blogApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // GET all blogs
    getallBlogs: builder.query<BlogItem[], void>({
      query: () => `blog-list`,
    }),

    // CREATE blog
    createBlog: builder.mutation<BlogItem, CreateBlogRequest>({
      query: (body) => ({
        url: `blog-add`,
        method: "POST",
        body,
      }),
    }),

    // UPDATE blog
    updateBlog: builder.mutation<BlogItem, UpdateBlogRequest>({
      query: ({ id, body }) => ({
        url: `blog-update/${id}`,
        method: "POST",
        body,
      }),
    }),

    // DELETE blog
    deleteBlog: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `blog-delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
  overrideExisting: false,
});

// Export hooks
export const {
  useGetallBlogsQuery,
  useLazyGetallBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
