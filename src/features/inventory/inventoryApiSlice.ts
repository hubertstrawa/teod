import { apiSlice } from '../api/apiSlice'
import { IItem } from '../../types/inventory'

export const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query<any, void>({
      query: () => `/inventory/mine`,
      providesTags: ['Inventory'],
    }),
    addToInventory: builder.mutation<{ data: IItem }, number>({
      query: (data) => ({
        url: `/inventory/addInventory`,
        method: 'POST',
        body: { lootedItemId: data },
      }),
      invalidatesTags: ['Inventory'],
    }),
    updateInventory: builder.mutation<any, any>({
      query: (data) => ({
        url: `/inventory/updateInventory`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: ['Inventory'],
    }),
    eatItemInventory: builder.mutation<any, any>({
      query: (data) => ({
        url: `/inventory/updateInventory`,
        method: 'PATCH',
        body: { ...data },
      }),
      invalidatesTags: ['Inventory', 'Player'],
    }),
    buyItemTrader: builder.mutation<any, any>({
      query: (itemId) => ({
        url: `/inventory/buyItem`,
        method: 'POST',
        body: { itemId },
      }),
      invalidatesTags: ['Inventory', 'Player'],
    }),
  }),
})

export const {
  useGetInventoryQuery,
  useAddToInventoryMutation,
  useUpdateInventoryMutation,
  useEatItemInventoryMutation,
  useBuyItemTraderMutation,
} = inventoryApiSlice
