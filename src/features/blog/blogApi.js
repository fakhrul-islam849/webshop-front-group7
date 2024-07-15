import { apiSlice } from '../api/apiSlice';

const blogApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllBlogCategory: builder.query({
      query: () => `/blog-category/get-all-category`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getAllBlogs: builder.mutation({
      query: (data) => ({
        url: `/blog/get-blogs`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reportSetting', 'ad_report_data'],
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBlogById: builder.query({
      query: (blogId) => `/blog/details/${blogId}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getRandomBlog: builder.query({
      query: () => `/blog/random-blog`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getRandomBlogCategory: builder.query({
      query: () => `/blog-category/get-random-category`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBlogsByCategoryId: builder.query({
      query: (blogCategoryId) => `/blog/list-category/${blogCategoryId}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const { useGetAllBlogCategoryQuery, useGetAllBlogsMutation, useGetBlogByIdQuery, useGetRandomBlogQuery, useGetRandomBlogCategoryQuery, useGetBlogsByCategoryIdQuery } = blogApi;
