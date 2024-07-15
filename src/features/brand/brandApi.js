import { apiSlice } from '../api/apiSlice';

const brandApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrandList: builder.query({
      query: ({ page, search_key }) =>
        `/brand/public/get-list?page=${page}&search_key=${search_key}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBrandListHerbal: builder.query({
      query: ({ page, search_key }) =>
        `/brand/public/get-list?page=${page}&search_key=${search_key}&type=2`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBrandListDermatology: builder.query({
      query: ({ page, search_key }) =>
        `/brand/public/get-list?page=${page}&search_key=${search_key}&type=3`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBrandListFoodSupplyment: builder.query({
      query: ({ page, search_key }) =>
        `/brand/public/get-list?page=${page}&search_key=${search_key}&type=4`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBrandListVeterinary: builder.query({
      query: ({ page, search_key }) =>
          `/brand/public/get-list?page=${page}&search_key=${search_key}&type=4&mfor=2`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBrandsByGenericId: builder.query({
      query: (genericId) => `/brand/public/get-generic-brand/${genericId}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBrandsByDosageId: builder.query({
      query: (dosageId) => `/brand/public/get-dosage-brand/${dosageId}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBrandById: builder.query({
      query: (brandId) => `/brand/public/get-brand-details/${brandId}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getBrandListByCompanyId: builder.query({
      query: ({ page, search_key, pharmaceutical_id }) =>
        `/brand/public/get-list/by-pharma-id?page=${page}&search_key=${search_key}&pharmaceutical_id=${pharmaceutical_id}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getAllBrandList: builder.query({
      query: () =>
          `/brand/public/all-brands`,
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetBrandListQuery,
  useGetBrandListHerbalQuery,
  useGetBrandListDermatologyQuery,
  useGetBrandListFoodSupplymentQuery,
  useGetBrandListVeterinaryQuery,
  useGetBrandsByGenericIdQuery,
  useGetBrandsByDosageIdQuery,
  useGetBrandByIdQuery,
  useGetBrandListByCompanyIdQuery,
  useGetAllBrandListQuery,
} = brandApi;
