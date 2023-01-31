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
  //   setPlayerStats(state: any, action) {
  //     // console.log('action', action)
  //     Object.keys(action.payload).map((a) => {
  //       // console.log(a)
  //       // console.log(action.payload[a])

  //       state[a] = action.payload[a]
  //     })

  //     if (state.experience > state.level * 100) {
  //       state.level = state.level + 1
  //     }
  //   },
  // },
})

// Action creators are generated for each case reducer function
// export const { setPlayerStats } = playerSlice.actions

export default battleSlice.reducer
