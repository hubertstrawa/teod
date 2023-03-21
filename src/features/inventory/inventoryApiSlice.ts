import { apiSlice } from '../api/apiSlice'
import { IItem } from '../../types/inventory'

export const inventoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query<any, void>({
      query: () => `/inventory/mine`,
      providesTags: ['Inventory'],
    }),
    equipItem: builder.mutation<any, any>({
      query: ({ itemToEquip, index }) => ({
        url: `/inventory/equipItem`,
        method: 'POST',
        body: { itemToEquip, index },
      }),
      invalidatesTags: ['Inventory', 'Player'],
    }),
    unequipItem: builder.mutation<any, any>({
      query: ({ itemToUnequip, index }) => ({
        url: `/inventory/unequipItem`,
        method: 'POST',
        body: { itemToUnequip, index },
      }),
      invalidatesTags: ['Inventory', 'Player'],
    }),
    eatFood: builder.mutation<any, any>({
      query: ({ itemToConsume, index }) => ({
        url: `/inventory/eatFood`,
        method: 'POST',
        body: { itemToConsume, index },
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
    sellItemTrader: builder.mutation<any, any>({
      query: (itemId) => ({
        url: `/inventory/sellItem`,
        method: 'POST',
        body: { itemId },
      }),
      invalidatesTags: ['Inventory', 'Player'],
    }),
    getItemsSell: builder.query<any, void>({
      query: () => `/inventory/getItemsSell`,
      providesTags: ['Inventory'],
    }),
  }),
})

export const {
  useLazyGetInventoryQuery,
  useGetInventoryQuery,
  useBuyItemTraderMutation,
  useEatFoodMutation,
  useEquipItemMutation,
  useUnequipItemMutation,
  useGetItemsSellQuery,
  useSellItemTraderMutation,
} = inventoryApiSlice
