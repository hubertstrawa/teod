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
    addToInventory: builder.mutation<number, any>({
      query: (data) => ({
        url: `/auth/add-to-inventory`,
        method: 'POST',
        body: { lootedItemId: data },
      }),
      invalidatesTags: ['Inventory'],
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
  useAddToInventoryMutation,
  useGetInventoryQuery,
  useUpdateInventoryMutation,
} = playerApiSlice
