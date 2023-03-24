import { createSlice } from '@reduxjs/toolkit'
// import { RootState } from '../../store'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatSlice {
  messages: any
}

const initialState: ChatSlice = {
  messages: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const data = action.payload

      state.messages = [...state.messages, data]
    },
  },
})

export const { addMessage } = chatSlice.actions
export default chatSlice.reducer
