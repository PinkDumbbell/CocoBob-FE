import { IBreeds, IPet, IPetInformation } from '@/@type/pet';
import { apiSlice } from '../slices/apiSlice';
import { RegisterInfoForm } from '../slices/registerPetSlice';
import { IGenericResponse } from './types';

export const petApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollmentData: builder.query<any, void>({
      query: () => '/pets/enrollment',
    }),
    getBreeds: builder.query<IBreeds[], void>({
      query: () => '/pets/breeds',
      transformResponse: (response: IGenericResponse) => response.data as IBreeds[],
    }),
    saveEnrollmentData: builder.mutation<{ petId: number }, RegisterInfoForm<File>>({
      query: (data) => {
        const formData = new FormData();
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(data)) {
          if (value !== undefined) {
            if (key === 'age' || key === 'birthday') {
              const newKey = key === 'age' ? 'months' : key;
              formData.append(`age.${newKey}`, value);
            } else {
              formData.append(key, value);
            }
          }
        }

        return {
          url: '/pets',
          method: 'POST',
          body: formData,
        };
      },
      transformResponse: (response: IGenericResponse) => response.data as { petId: number },
    }),
    getPets: builder.query<IPet[], void>({
      query: () => '/pets',
      transformResponse: (response: IGenericResponse) => response.data as IPet[],
    }),
    getPetsDetail: builder.query<IPetInformation, number>({
      query: (id: number) => `/pets/${id}`,
      transformResponse: (response: IGenericResponse) => response.data as IPetInformation,
    }),
    updatePetData: builder.mutation<
      { petId: number },
      { formInput: RegisterInfoForm<File>; petId: number; isImageJustDeleted: boolean }
    >({
      query: ({ formInput, petId, isImageJustDeleted }) => {
        const formData = new FormData();
        formData.append('isImageJustDeleted', isImageJustDeleted);
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, value] of Object.entries(formInput)) {
          if (value !== undefined) {
            if (key === 'age' || key === 'birthday') {
              const newKey = key === 'age' ? 'months' : key;
              formData.append(`age.${newKey}`, value);
            } else {
              formData.append(key, value);
            }
          }
        }

        return {
          url: `/pets/${petId}`,
          method: 'PUT',
          body: formData,
        };
      },
    }),
  }),
});

export const {
  useGetEnrollmentDataQuery,
  useSaveEnrollmentDataMutation,
  useGetBreedsQuery,
  useGetPetsQuery,
  useGetPetsDetailQuery,
  useUpdatePetDataMutation,
} = petApiSlice;

export const selectUserResult = petApiSlice.endpoints.getEnrollmentData.select();
