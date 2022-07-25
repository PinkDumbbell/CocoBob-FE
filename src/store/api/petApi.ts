import { apiSlice } from '../slices/apiSlice';
import { RegisterInfoForm } from '../slices/registerPetSlice';
import { IGenericResponse } from './types';

export const petApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollmentData: builder.query<any, void>({
      query: () => '/pets/enrollment',
    }),
    saveEnrollmentData: builder.mutation<IGenericResponse, RegisterInfoForm>({
      query: (formData) => ({
        url: '/pets',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
});

export const { useGetEnrollmentDataQuery, useSaveEnrollmentDataMutation } = petApiSlice;

export const selectUserResult = petApiSlice.endpoints.getEnrollmentData.select();
