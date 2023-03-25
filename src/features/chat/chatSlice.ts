import { createSlice } from '@reduxjs/toolkit'
// import { RootState } from '../../store'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ChatSlice {
  messages: any
  onlineCount: number
}

const initialState: ChatSlice = {
  messages: [],
  onlineCount: 0,
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const data = action.payload

      state.messages = [...state.messages, data]
    },
    setOnlineCount: (state, action) => {
      state.onlineCount = action.payload
    },
  },
})

export const { addMessage, setOnlineCount } = chatSlice.actions
export default chatSlice.reducer
