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
    addAttribute: builder.mutation<any, any>({
      query: (attributeName) => ({
        url: `/player/addAttribute`,
        method: 'POST',
        body: { attributeName },
      }),
      invalidatesTags: ['Player'],
    }),
    startJob: builder.mutation<any, any>({
      query: (locationName) => ({
        url: `/player/startJob`,
        method: 'POST',
        body: { locationName },
      }),
      invalidatesTags: ['Player'],
    }),
    finishJob: builder.mutation<any, any>({
      query: (locationName) => ({
        url: `/player/finishJob`,
        method: 'POST',
        body: { locationName },
      }),
      invalidatesTags: ['Player', 'Inventory'],
    }),
    closeJob: builder.mutation<any, void>({
      query: () => ({
        url: `/player/closeJob`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Player'],
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
  useAddAttributeMutation,
  useStartJobMutation,
  useFinishJobMutation,
  useCloseJobMutation,
} = playerApiSlice
