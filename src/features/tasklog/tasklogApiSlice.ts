import { apiSlice } from '../api/apiSlice'

export const tasklogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query<any, void>({
      query: () => `/tasklog/gettasks`,
      providesTags: ['Tasklog'],
    }),
    getTasklog: builder.query<any, void>({
      query: () => `/tasklog/getPlayerTasklog`,
      providesTags: ['Tasklog'],
    }),
    startTask: builder.mutation<any, any>({
      query: (taskId) => ({
        url: `/tasklog/startTask`,
        method: 'POST',
        body: { taskId },
      }),
      invalidatesTags: ['Tasklog'],
    }),
    finishTask: builder.mutation<any, any>({
      query: (taskId) => ({
        url: `/tasklog/finishTask`,
        method: 'POST',
        body: { taskId },
      }),
      invalidatesTags: ['Tasklog'],
    }),
    closeTask: builder.mutation<void, void>({
      query: () => ({
        url: `/tasklog/closeTask`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Tasklog'],
    }),
  }),
})

export const {
  useGetTasklogQuery,
  useGetTasksQuery,
  useStartTaskMutation,
  useFinishTaskMutation,
  useCloseTaskMutation,
} = tasklogApiSlice
