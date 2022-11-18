import { RecordOverviewType, WalkHistoryItemType } from '@/@type/walk';
import { apiSlice } from '../slices/apiSlice';
import { IGenericResponse } from './types';

type ImageType = {
  imageId: number;
  path: string;
};
export type MealRequestType = {
  amount: number;
  kcal?: number;
  productId?: number; // id가 있다면 id만 보냄
  productName?: string; // 직접 입력한 상품이면 id를 안보냄
};
export type MealType = {
  amount: number;
  kcal: number;
  mealId: number;
  productInfo: {
    productId: number;
    productName: string;
  };
};

export type HealthRecordRequestType = {
  abnormalIds?: number[];
  bodyWeight?: number;
  date: string;
  images?: File[];
  note?: string;
  petId: number;
};

export type BodyWeightHistoryType = {
  date: string;
  bodyWeight: number;
};
export type RecentBodyWeightType = {
  [key: string]: number;
};
export type HealthRecordType = {
  abnormals: any[];
  bodyWeight: number;
  bodyWeights: BodyWeightHistoryType[];
  date: string;
  healthRecordId: number;
  images: ImageType[];
  meals: MealType[];
  note: string | null;
};
type HealthRecordUpdateType = {
  date: string;
  abnormalIds: number[] | null;
  bodyWeight?: number;
  healthRecordId: number;
  imagesIdToDelete?: number[];
  newImages?: File[];
  note: string | null;
};

export type RecordIdType = {
  dailyId: number;
  healthRecordId: number;
  walkIds: number[];
};
export type RecordIdOfDateType = {
  [key: string]: RecordIdType;
};

export type BasicRecordRequestType = {
  petId: number;
  date: string;
};
export type RecordRequestType = BasicRecordRequestType & {
  sessionId: number; // for disable cache behavior of RTK Query
};

type WalkRecordSaveParamsType = BasicRecordRequestType & {
  distance: number;
  totalTime: number;
  startedAt?: string;
  finishedAt?: string;
};
type NoteRequestType = RecordRequestType & {
  noteData: {
    images: File[];
    note: string;
    title: string;
  };
};

type NoteImageType = {
  imageId: number;
  path: string;
};
export type NoteType = {
  dailyId: number;
  date: string;
  images: NoteImageType[];
  note: string;
  title: string;
};
export type NoteEditType = {
  imageIdsToDelete: number[];
  newImages: File[];
  note: string;
  title: string;
  noteId: number;
};

export const dailyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDailyRecordIdListOfMonth: builder.query<RecordIdOfDateType, RecordRequestType>({
      // eslint-disable-next-line no-unused-vars
      query: ({ petId, date }) => `/v1/records/pet/${petId}/ids?year-month=${date}`,
      transformResponse: (response: IGenericResponse<RecordIdOfDateType>) => response.data,
      providesTags: (result, api, args) => ['Daily', { type: 'Daily', id: args.date }],
    }),
    getDailyRecordOverview: builder.query<RecordOverviewType, BasicRecordRequestType>({
      // eslint-disable-next-line no-unused-vars
      query: ({ petId, date }) => `v1/records/pet/${petId}?date=${date}`,
      transformResponse: (response: IGenericResponse<RecordOverviewType>) => response.data,
      providesTags: (result, api, args) => [{ type: 'Daily', id: args.date }],
    }),
    getHealthRecord: builder.query<HealthRecordType, number>({
      // eslint-disable-next-line no-unused-vars
      query: (healthRecordId) => {
        return `/v1/health-records/${healthRecordId}`;
      },
      transformResponse: (response: IGenericResponse<HealthRecordType>) => response.data,
      providesTags: (result, api, args) => ['DailyRecord', { type: 'DailyRecord', id: args }],
    }),
    getRecentBodyWeights: builder.query<RecentBodyWeightType, number>({
      query: (petId: number) => `/v1/health-records/pets/${petId}/recent-weights`,
      transformResponse: (response: IGenericResponse<{ weightPerDate: RecentBodyWeightType }>) =>
        response.data.weightPerDate,
      providesTags: () => [{ type: 'DailyRecord', id: 'recentBodyWeights' }],
    }),
    addMeal: builder.mutation<
      { healthRecordId: number },
      { date: string; petId: number; meal: MealRequestType }
    >({
      query: ({ date, petId, meal }) => {
        return {
          url: `/v1/health-records/pets/${petId}/dates/${date}/meal`,
          method: 'POST',
          body: meal,
        };
      },
      invalidatesTags: (result, api, args) =>
        result?.healthRecordId
          ? [
              'DailyRecord',
              { type: 'Daily', id: args.date },
              { type: 'DailyRecord', id: result.healthRecordId },
            ]
          : ['DailyRecord', { type: 'Daily', id: args.date }],
    }),
    createHealthRecord: builder.mutation<any, HealthRecordRequestType>({
      query: (data) => {
        const formData = new FormData();
        formData.set('date', data.date);
        formData.set('bodyWeight', String(data.bodyWeight));

        if (data.abnormalIds && data.abnormalIds.length > 0) {
          formData.set('abnormalIds', JSON.stringify(data.abnormalIds));
        }
        if (data.note) {
          formData.set('note', data.note);
        }

        return {
          url: `/v1/health-records/pets/${data.petId}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['DailyRecord', 'Daily', { type: 'DailyRecord', id: 'recentBodyWeights' }],
    }),
    updateHealthRecord: builder.mutation<any, HealthRecordUpdateType>({
      query: (params) => {
        const formData = new FormData();

        if (params?.bodyWeight) {
          formData.set('bodyWeight', `${params.bodyWeight}`);
        }

        formData.set('note', params.note ? params.note : '');

        if (!params.abnormalIds) {
          formData.set('abnormalIds', '');
        } else {
          params.abnormalIds.forEach((abnormalId) =>
            formData.append('abnormalIds', `${abnormalId}`),
          );
        }

        if (params?.imagesIdToDelete && params.imagesIdToDelete.length > 0) {
          params.imagesIdToDelete.forEach((imageId) =>
            formData.append('imagesIdToDelete', `${imageId}`),
          );
        }
        if (params?.newImages && params.newImages.length > 0) {
          params.newImages.forEach((newImage) => formData.append('newImages', newImage));
        }

        return {
          url: `/v1/health-records/${params.healthRecordId}`,
          body: formData,
          method: 'PUT',
        };
      },
      invalidatesTags: (result, api, args) => [
        { type: 'DailyRecord', id: args.healthRecordId },
        { type: 'Daily', id: args.date },
        { type: 'DailyRecord', id: 'recentBodyWeights' },
      ],
    }),
    createNoteRecord: builder.mutation<any, NoteRequestType>({
      query: ({ petId, date, noteData }) => {
        const formData = new FormData();
        formData.append('date', date);
        formData.append('title', noteData.title);
        formData.append('note', noteData.note);

        noteData.images.forEach((file) => {
          formData.append('images', file);
        });

        return {
          url: `/v1/dailys/pets/${petId}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, api, args) => [
        'DailyRecord',
        { type: 'Daily', id: args.date },
        { type: 'Daily', id: args.date.substring(0, 7) },
      ],
    }),
    getNote: builder.query<NoteType, { noteId: number }>({
      query: ({ noteId }) => `/v1/dailys/${noteId}`,
      transformResponse: (response: IGenericResponse<NoteType>) => response.data,
      providesTags: (result, api, args) => [{ type: 'DailyRecord', id: args.noteId }],
    }),
    deleteNote: builder.mutation<any, { noteId: number }>({
      query: ({ noteId }) => {
        return {
          url: `/v1/dailys/${noteId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['DailyRecord', 'Daily'],
    }),
    editNote: builder.mutation<any, NoteEditType>({
      query: ({ noteId, imageIdsToDelete, newImages, note, title }) => {
        const formData = new FormData();
        formData.set('title', title);
        formData.set('note', note);

        newImages.forEach((image) => {
          formData.append('newImages', image);
        });
        imageIdsToDelete.forEach((imageId) => formData.append('imageIdsToDelete', String(imageId)));

        return {
          url: `/v1/dailys/${noteId}`,
          method: 'PUT',
          body: formData,
        };
      },
      invalidatesTags: (result, api, args) => [{ type: 'DailyRecord', id: args.noteId }],
    }),
    getWalkList: builder.query<WalkHistoryItemType[], BasicRecordRequestType>({
      query: ({ date, petId }) => `/v1/walks/pets/${petId}?date=${date}`,
      transformResponse: (response: IGenericResponse<{ walks: WalkHistoryItemType[] }>) =>
        response.data.walks,
      providesTags: (result, api, args) => [{ type: 'DailyWalk', id: args.date }],
    }),
    getWalk: builder.query<WalkHistoryItemType, number>({
      query: (walkId: number) => `/v1/walks/${walkId}`,
      transformResponse: (response: IGenericResponse<WalkHistoryItemType>) => response.data,
      providesTags: (result, api, args) => [{ type: 'DailyWalk', id: args }],
    }),
    deleteWalk: builder.mutation<any, any>({
      query: (walkId: number) => {
        return {
          url: `/v1/walks/${walkId}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (result, api, args) => [
        'Daily',
        'DailyWalk',
        { type: 'DailyWalk', id: args },
      ],
    }),
    createWalk: builder.mutation<any, WalkRecordSaveParamsType>({
      query: ({ petId, date, distance, totalTime, startedAt, finishedAt }) => {
        // startedAt, finishedAt이 있으면 totalTime 무시. 자동 계산
        // startedAt, finishedAt이 없으면 totalTime 필요. 필수
        const formData = new FormData();
        if (startedAt) {
          formData.set('startedAt', startedAt); // hh:mm:ss
        }
        if (finishedAt) {
          formData.set('finishedAt', finishedAt); // hh:mm:ss
        }
        formData.set('date', date);
        formData.set('distance', String(distance));
        formData.set('totalTime', String(totalTime));

        return {
          url: `/v1/walks/pets/${petId}`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: (result, api, args) => [
        'Daily',
        'DailyRecord',
        { type: 'DailyWalk', id: args.date },
      ],
    }),
  }),
});

export const {
  useGetDailyRecordIdListOfMonthQuery,
  useGetDailyRecordOverviewQuery,
  useLazyGetDailyRecordIdListOfMonthQuery,
  useLazyGetDailyRecordOverviewQuery,
  useGetHealthRecordQuery,
  useGetRecentBodyWeightsQuery,
  useUpdateHealthRecordMutation,
  useLazyGetHealthRecordQuery,
  useCreateHealthRecordMutation,
  useCreateNoteRecordMutation,
  useGetNoteQuery,
  useDeleteNoteMutation,
  useEditNoteMutation,
  useCreateWalkMutation,
  useDeleteWalkMutation,
  useGetWalkQuery,
  useGetWalkListQuery,
  useAddMealMutation,
} = dailyApiSlice;
