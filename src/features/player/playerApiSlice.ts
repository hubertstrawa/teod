// @ts-nocheck
import { apiSlice } from '../api/apiSlice'

export const playerApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Player'],
  endpoints: (builder) => ({
    getCurrentPlayer: builder.query<any, void>({
      query: () => `/auth/me`,
      providesTags: ['Player'],
    }),
    updateCurrentPlayer: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/updateMe`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: ['Player'],
    }),
  }),
})

export const { useGetCurrentPlayerQuery, useUpdateCurrentPlayerMutation } =
  playerApiSlice
