import { createSlice } from '@reduxjs/toolkit'
// import { RootState } from '../../store'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface BattleState {
  // experience: number
  // level: number
  // name: string
  // healthPoints: number
  // manaPoints: number
  // mantleCondition: number
  // race: string
  // power: number
  // avatar: string
  // money: number
}

const initialState: BattleState = {}

export const battleSlice = createSlice({
  name: 'battle',
  initialState,
  reducers: {},
})

export default battleSlice.reducer
