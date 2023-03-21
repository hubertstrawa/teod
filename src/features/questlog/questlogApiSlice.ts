import { apiSlice } from '../api/apiSlice'

export const questlogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getQuestlog: builder.query<any, void>({
      query: () => `/questlog/getPlayerQuestlog`,
      providesTags: ['Questlog'],
    }),
    startQuest: builder.mutation<any, any>({
      query: (questId) => ({
        url: `/questlog/startQuest`,
        method: 'POST',
        body: { questId },
      }),
      invalidatesTags: ['Questlog'],
    }),
    finishQuest: builder.mutation<any, any>({
      query: (questId) => ({
        url: `/questlog/finishQuest`,
        method: 'POST',
        body: { questId },
      }),
      invalidatesTags: ['Questlog', 'Player', 'Inventory'],
    }),
  }),
})

export const {
  useGetQuestlogQuery,
  useStartQuestMutation,
  useFinishQuestMutation,
} = questlogApiSlice
