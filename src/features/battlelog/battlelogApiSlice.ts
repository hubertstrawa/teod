import { apiSlice } from '../api/apiSlice'

export const battlelogApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBattlelog: builder.query<any, void>({
      query: () => `/battlelog/getBattlelog`,
      providesTags: ['Battlelog'],
    }),
    startBattle: builder.mutation<any, any>({
      query: (enemyId) => ({
        url: `/battlelog/startBattle`,
        method: 'POST',
        body: { enemyId },
      }),
      invalidatesTags: ['Battlelog'],
    }),
    attackEnemy: builder.mutation<any, any>({
      query: (spell) => ({
        url: `/battlelog/attackEnemy`,
        method: 'POST',
        body: { spell },
      }),
      invalidatesTags: ['Battlelog'],
    }),
  }),
})

export const {
  useGetBattlelogQuery,
  useStartBattleMutation,
  useAttackEnemyMutation,
} = battlelogApiSlice
