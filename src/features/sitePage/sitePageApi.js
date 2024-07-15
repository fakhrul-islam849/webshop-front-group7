import { apiSlice } from '../api/apiSlice';

const sitePageApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAboutUs: builder.query({
            query: () => `/site-page/public/about-us`,
            transformResponse: (response, meta, arg) => response.data,
        }),
        getSitePage: builder.query({
            query: (pageType) => `/site-page/public/page/${pageType}`,
            transformResponse: (response, meta, arg) => response.data,
        }),
    }),
});

export const { useGetAboutUsQuery, useGetSitePageQuery } = sitePageApi;