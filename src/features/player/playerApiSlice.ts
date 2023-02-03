// @ts-nocheck
import { apiSlice } from '../api/apiSlice'

export const playerApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Player', 'Inventory'],
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
    getInventory: builder.query<any, void>({
      query: () => `/auth/me-inventory`,
      providesTags: ['Inventory'],
    }),
    updateInventory: builder.mutation<any, any>({
      query: (data) => ({
        url: `/auth/updateMe-inventory`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: ['Inventory'],
    }),
  }),
})

export const {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
  useGetInventoryQuery,
  useUpdateInventoryMutation,
} = playerApiSlice
