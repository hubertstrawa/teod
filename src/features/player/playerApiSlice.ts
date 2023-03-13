import { apiSlice } from '../api/apiSlice'

export const playerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCurrentPlayer: builder.query<any, void>({
      query: () => `/player/me`,
      providesTags: ['Player'],
    }),
    getPlayersHighscores: builder.query<any, void>({
      query: () => `/player/highscores`,
    }),
    updateCurrentPlayer: builder.mutation<any, any>({
      query: (data) => ({
        url: `/player/updateMe`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: ['Player'],
    }),
  }),
})

export const {
  useGetCurrentPlayerQuery,
  useGetPlayersHighscoresQuery,
  useUpdateCurrentPlayerMutation,
} = playerApiSlice
