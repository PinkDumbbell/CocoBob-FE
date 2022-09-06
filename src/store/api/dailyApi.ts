import dayjs from 'dayjs';
import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

type DailyItemResponseType = { dailyId: number; data: string; date: string };
export type DailyDataType = {
  bodyWeight?: number;
  walkTime?: number;
  walkDistance?: number;
  feed?: number;
  note?: string;
};
export type DailyItemType = {
  dailyId: number;
  data: DailyDataType;
  date: string;
};
export type DailyListItemType = {
  id: number;
  date: string;
};
export type DailyListResponseType = {
  idAndDates: DailyListItemType[];
};
export const dailyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDaily: builder.query<DailyItemType, number>({
      query: (dailyId) => `/v1/dailys/${dailyId}`,
      transformResponse: (response: IGenericResponse<DailyItemResponseType>) => ({
        dailyId: response.data.dailyId,
        data: JSON.parse(response.data.data),
        date: response.data.date,
      }),
      providesTags: (result) => [{ type: 'Daily', id: result?.dailyId }],
    }),
    getDailyList: builder.query<DailyListResponseType, { petId: number; date: string }>({
      query: ({ petId, date }: { petId: number; date: string }) =>
        `/v1/dailys/pets/${petId}?date=${date}`,
      transformResponse: (response: IGenericResponse<DailyListResponseType>) => response.data,
      providesTags: (result, error, args) => [{ type: 'Daily', id: args.date }],
    }),
    createDaily: builder.mutation<any, { petId: number; body: { data: string; date: string } }>({
      query: ({ petId, body }) => {
        return {
          method: 'POST',
          url: `/v1/dailys/pets/${petId}`,
          body,
        };
      },
      transformResponse: (response: IGenericResponse<any>) => response.data,
      invalidatesTags: (result, error, args) => [
        { type: 'Daily', id: dayjs(args.body.date).format('YYYY-MM') },
      ],
    }),
    updateDaily: builder.mutation<any, { dailyId: number; body: any }>({
      query: ({ dailyId, body }) => {
        return {
          method: 'PUT',
          url: `/v1/dailys/${dailyId}`,
          body,
        };
      },
      transformResponse: (response: IGenericResponse<any>) => response.data,
      invalidatesTags: (result, error, arg) => [{ type: 'Daily', id: arg.dailyId }],
    }),
  }),
});

export const {
  useGetDailyQuery,
  useGetDailyListQuery,
  useLazyGetDailyQuery,
  useLazyGetDailyListQuery,
  useCreateDailyMutation,
  useUpdateDailyMutation,
} = dailyApiSlice;
