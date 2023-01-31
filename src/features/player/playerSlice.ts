import { createSlice } from '@reduxjs/toolkit'
// import { RootState } from '../../store'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface PlayerState {
  experience: number
  level: number
  player_name: string
  max_health_points: number
  health_points: number
  mana_points: number
  energy: number
  criticalChance: number
  race: string
  power: number
  avatar: string
  money: number
  // equipment: {
  //   helmet?: string
  //   armor?: string
  //   weapon?: string
  //   shield?: string
  //   legs?: string
  //   shoes?: string
  //   ring?: string
  // }
  // items: []
}

const enum Equipment {
  HELMET = 'helmet',
  ARMOR = 'armor',
  WEAPON = 'weapon',
  SHIELD = 'shield',
  LEGS = 'legs',
  SHOES = 'shoes',
  RING = 'ring',
}

const initialState: PlayerState = {
  experience: 0,
  level: 1,
  player_name: 'Vinyljam',
  health_points: 100,
  max_health_points: 150,
  mana_points: 100,
  energy: 100,
  criticalChance: 50,
  race: 'mage',
  power: 10,
  avatar: '/avatars/variant-01.png',
  money: 0,
  // equipment: {},
  // items: [],
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayerStats(state: any, action) {
      // console.log('action', action)
      Object.keys(action.payload).map((a) => {
        // console.log(a)
        // console.log(action.payload[a])

        state[a] = action.payload[a]
      })

      if (state.experience >= state.level * 100) {
        state.level = state.level + 1
      }
    },
  },
})

// Action creators are generated for each case reducer function
export const { setPlayerStats } = playerSlice.actions

export default playerSlice.reducer
