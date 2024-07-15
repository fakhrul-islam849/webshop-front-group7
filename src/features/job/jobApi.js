import { apiSlice } from '../api/apiSlice';

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: ({ page, search_key }) =>
        `/job/get-jobs?page=${page}&search_key=${search_key}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getJobDetailsById: builder.query({
      query: (jobId) => `/job/details/${jobId}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const { useGetAllJobsQuery, useGetJobDetailsByIdQuery } = jobApi;
