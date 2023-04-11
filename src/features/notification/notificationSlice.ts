import { createSlice } from '@reduxjs/toolkit'
// import { RootState } from '../../store'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface NotificationSlice {
  message: string
}

const initialState: NotificationSlice = {
  message: '',
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // addMessage: (state, action) => {
    //   const data = action.payload

    //   state.messages = [...state.messages, data]
    // },
    setNotification: (state, action) => {
      state.message = action.payload
    },
    clearNotification: (state) => {
      state.message = ''
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
