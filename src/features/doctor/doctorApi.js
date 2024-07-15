import { apiSlice } from '../api/apiSlice';

const doctorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllDoctorDepartment: builder.query({
      query: () => `/doctor-department/get-all-department`,
      transformResponse: (response, meta, arg) => response.data,
    }),
    getAllDoctors: builder.mutation({
      query: (data) => ({
        url: `/doctor/get-all-doctors`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reportSetting', 'ad_report_data'],
      transformResponse: (response, meta, arg) => response.data,
    }),
  }),
});

export const { useGetAllDoctorDepartmentQuery, useGetAllDoctorsMutation } =
  doctorApi;
