import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../features/chat/chatSlice'
import { selectCurrentToken } from '../features/auth/authSlice'
import { useEffect } from 'react'

let socket

export const sendMessage = async (data) => {
  if (!!socket) await socket.emit('message', data)
}

const SocketInit = ({ children }: any) => {
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()

  const socketInitializer = async () => {
    socket = io('https://api.teod.pl')

    socket.on('response', (data) => {
      dispatch(addMessage(data))
      // let messages: any = sessionStorage.getItem('messages')

      // if (!messages) {
      //   messages = []
      // } else {
      //   messages = JSON.parse(messages)
      // }

      // const newMessage = data
      // messages.push(newMessage)

      // const messagesString = JSON.stringify(messages)
      // sessionStorage.setItem('messages', messagesString)
    })
  }

  useEffect(() => {
    if (!!token && !socket) socketInitializer()
  }, [token])

  return children
}

export default SocketInit
