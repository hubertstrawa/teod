import { apiSlice } from '../api/apiSlice'

export const enemyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnemies: builder.query<any, string>({
      query: (location) => `/enemy/getEnemies?location=${location}`,
      providesTags: ['Enemy'],
    }),
  }),
})

export const { useGetEnemiesQuery } = enemyApiSlice
