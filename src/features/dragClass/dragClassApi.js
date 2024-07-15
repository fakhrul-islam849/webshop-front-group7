import { apiSlice } from '../api/apiSlice';

const dragClassApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDrugClass: builder.query({
      query: () => `/drug-class/public/get-drug`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getDrugCategoryByDrugId: builder.query({
      query: (id) => `/drug-class-category/public/get-categories/${id}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getDrugSubCategoryByCategoryId: builder.query({
      query: (id) => `drug-class-subcategory/public/get-sub-categories/${id}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getGenericBySubCategoryId: builder.query({
      query: (id) => `drug-class-subcategory/public/subcategory-generic/${id}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getGenericByCategoryId: builder.query({
      query: (id) => `drug-class-category/public/category-generic/${id}`,
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const {
  useGetAllDrugClassQuery,
  useGetDrugCategoryByDrugIdQuery,
  useGetDrugSubCategoryByCategoryIdQuery,
  useGetGenericBySubCategoryIdQuery,
  useGetGenericByCategoryIdQuery,
} = dragClassApi;
