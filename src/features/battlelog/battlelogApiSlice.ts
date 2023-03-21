import { apiSlice } from '../api/apiSlice'

export const battlelogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getbattle: builder.query<any, void>({
    //   query: () => `/battle/startBattle`,
    //   providesTags: ['Battlelog'],
    // }),
    startBattle: builder.mutation<any, any>({
      query: (enemyId) => ({
        url: `/battlelog/startBattle`,
        method: 'POST',
        body: { enemyId },
      }),
      invalidatesTags: ['Battlelog'],
    }),
    attackEnemy: builder.mutation<any, any>({
      query: (attackType) => ({
        url: `/battlelog/attackEnemy`,
        method: 'POST',
        body: { attackType },
      }),
      invalidatesTags: ['Battlelog'],
    }),
  }),
})

export const { useStartBattleMutation, useAttackEnemyMutation } =
  battlelogApiSlice
