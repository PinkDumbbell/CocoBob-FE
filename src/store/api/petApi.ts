import { IBreeds, IPet, IPetInformation, PetInfoForm } from '@/@type/pet';
import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

type UpdatePetReqType = {
  formInput: PetInfoForm<File>;
  petId: number;
  isImageJustDeleted: boolean;
};

export const petApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrollmentData: builder.query<any, void>({
      query: () => '/pets/enrollment',
    }),
    getBreeds: builder.query<IBreeds[], void>({
      query: () => '/pets/breeds',
      transformResponse: (response: IGenericResponse<IBreeds[]>) => response.data,
      providesTags: (result) =>
        result
          ? [...result.map((value) => ({ type: 'Breed' as const, id: value.id }))]
          : [{ type: 'Breed' as const, id: 'LIST' }],
    }),
    saveEnrollmentData: builder.mutation<{ petId: number }, PetInfoForm<File>>({
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
      transformResponse: (response: IGenericResponse<{ petId: number }>) => response.data,
      invalidatesTags: ['User', { type: 'Pet' as const, id: 'LIST' }],
    }),
    getPets: builder.query<IPet[], void>({
      query: () => '/pets',
      transformResponse: (response: IGenericResponse<IPet[]>) => response.data,
      providesTags: (result) =>
        result
          ? [
              ...result.map((value) => ({ type: 'Pet' as const, id: value.id })),
              { type: 'Pet', id: 'LIST' },
            ]
          : [{ type: 'Pet' as const, id: 'LIST' }],
    }),
    getPetsDetail: builder.query<IPetInformation, number>({
      query: (id: number) => `/pets/${id}`,
      transformResponse: (response: IGenericResponse<IPetInformation>) => response.data,
      providesTags: (result) => [{ type: 'Pet' as const, id: result?.id }],
    }),
    updatePetData: builder.mutation<{ petId: number }, UpdatePetReqType>({
      query: ({ formInput, petId, isImageJustDeleted }) => {
        const formData = new FormData();
        formData.append('isImageJustDeleted', JSON.stringify(isImageJustDeleted));
        // eslint-disable-next-line no-restricted-syntax
        Object.entries(formInput).forEach(([key, value]) => {
          if (value !== undefined) {
            if (key === 'age' || key === 'birthday') {
              const newKey = key === 'age' ? 'months' : key;
              formData.append(`age.${newKey}`, value);
            } else {
              formData.append(key, value);
            }
          }
        });

        return {
          url: `/pets/${petId}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Pet' as const, id: arg.petId },
        { type: 'Pet' as const, id: 'LIST' },
      ],
    }),
    deletePet: builder.mutation<void, number>({
      query: (petId) => {
        console.log('petId', petId);
        return {
          url: `/pets/${petId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, error, petId) => [
        'User',
        { type: 'Pet' as const, id: 'LIST' },
        { type: 'Pet' as const, id: petId },
      ],
    }),
  }),
});

export const {
  useGetEnrollmentDataQuery,
  useSaveEnrollmentDataMutation,
  useGetBreedsQuery,
  useGetPetsQuery,
  useLazyGetPetsDetailQuery,
  useGetPetsDetailQuery,
  useUpdatePetDataMutation,
  useDeletePetMutation,
} = petApiSlice;

export const selectUserResult = petApiSlice.endpoints.getEnrollmentData.select();
