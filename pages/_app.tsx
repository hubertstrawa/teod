import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { addMessage } from '../src/features/chat/chatSlice'
import { useEffect } from 'react'
import SocketInit from '../src/components/SocketInit'
import theme from '../src/theme'
import { store } from '../src/store'
// import { io } from 'socket.io-client'

// export let socket
// export const socketInitializer = async () => {
//   socket = io('http://localhost:3003')

//   socket.on('response', (data) => {
//     let messages: any = sessionStorage.getItem('messages')

//     if (!messages) {
//       messages = []
//     } else {
//       messages = JSON.parse(messages)
//     }

//     const newMessage = data
//     messages.push(newMessage)

//     const messagesString = JSON.stringify(messages)
//     sessionStorage.setItem('messages', messagesString)
//   })
// }

// export const sendMessage = async (data) => {
//   if (!!socket) await socket.emit('message', data)
// }

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader')
      if (loader) loader.remove()
    }
  }, [])

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <SocketInit>
          {/* <Head>
          <title>The End Of Days</title>
        </Head> */}
          <Component {...pageProps} />
        </SocketInit>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
