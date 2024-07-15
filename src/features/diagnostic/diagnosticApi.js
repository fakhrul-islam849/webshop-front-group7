import { apiSlice } from '../api/apiSlice';

const diagnosticApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllDiagnosticCompany: builder.query({
            query: () => `/diagnostic-company/get-list`,
            transformResponse: (response, meta, arg) => response.data,
        }),
        getAllDiagnosticGroup: builder.query({
            query: () => `/diagnostic-test-group/`,
            transformResponse: (response, meta, arg) => response.data,
        }),
        getTestByCompanyId: builder.query({
            query: (companyId) => `/diagnostic-test/get-by-company/${companyId}`,
            transformResponse: (response, meta, arg) => response.data,
        }),
        getTestByGroupId: builder.query({
            query: (groupId) => `/diagnostic-test/get-by-group/${groupId}`,
            transformResponse: (response, meta, arg) => response.data,
        }),
    }),
});
export const { useGetAllDiagnosticCompanyQuery, useGetAllDiagnosticGroupQuery, useGetTestByCompanyIdQuery, useGetTestByGroupIdQuery } = diagnosticApi;