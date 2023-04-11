import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage, setOnlineCount } from '../features/chat/chatSlice'
import { selectCurrentToken } from '../features/auth/authSlice'
import { useEffect } from 'react'

let socket

export const sendMessage = async (data) => {
  if (!!socket) await socket.emit('message', data)
}

const SocketInit = ({ children }: any) => {
  const token = useSelector(selectCurrentToken)
  const dispatch = useDispatch()
  console.log('token', token)

  const socketInitializer = async () => {
    console.log('NEXT_SOCKET_URL', process.env.NEXT_PUBLIC_SOCKET)
    const url = process.env.NEXT_PUBLIC_SOCKET
      ? `${process.env.NEXT_PUBLIC_SOCKET}`
      : `https://api.teod.pl`

    socket = io(url, {
      auth: {
        token,
      },
    })

    console.log('socket', socket)

    socket.on('joined_game', (dataStr) => {
      dispatch(addMessage(dataStr))
    })

    socket.on('response', (data) => {
      dispatch(addMessage(data))
    })

    socket.on('online_players', (data) => {
      dispatch(setOnlineCount(data))
    })
  }

  // socket.on('error', async (error) => {
  //   if(error === 'TOKEN_EXPIRED'){
  //     const newToken = token;
  //     socket.close();
  //     socketInitializer()
  //   }

  useEffect(() => {
    console.log('socket USEE', socket)
    console.log('token USEE', token)
    if (!!token) socketInitializer()
  }, [token])

  return children
}

export default SocketInit
