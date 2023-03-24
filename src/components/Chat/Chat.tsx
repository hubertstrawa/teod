import { Box, Button, Text, Input, Flex } from '@chakra-ui/react'
import io from 'socket.io-client'
// import { sendMessage } from '../../../pages/_app'
import { sendMessage } from '../SocketInit'
import { useEffect, useState, memo, useCallback } from 'react'
import { addMessage } from '../../features/chat/chatSlice'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'
import { useRef } from 'react'
import { useRouter } from 'next/router'

// socket.on('message', (data) => {
//   console.log('Received message:', data)
// })

const Chat = () => {
  const { data: player } = useGetCurrentPlayerQuery()
  const [msg, setMsg] = useState()
  const router = useRouter()
  const inputRef = useRef() as any
  const chatboxRef = useRef() as any

  const [messages, setMessages] = useState([])
  const dispatch = useDispatch()

  const data = useSelector((state: RootState) => state.chat.messages)
  console.log('DATA', data)

  const addNewMessage = () => {
    // dispatch(addMessage({ auth: 'ja', text: msg }))
    if (!!inputRef.current.value) {
      sendMessage({
        author: `${player.data.playerName} [Lvl ${player.data.level}]`,
        text: inputRef.current.value,
      })
    }
  }

  // const dataChat =
  //   typeof sessionStorage !== 'undefined'
  //     ? JSON.parse(sessionStorage.getItem('messages'))
  //     : []

  // useEffect(() => {
  //   setMessages(JSON.parse(sessionStorage.getItem('messages')))
  // }, [])

  // useEffect(() => {
  // setMessages(dataChat)
  // }, [dataChat])

  // console.log('DATA', JSON.parse(sessionStorage.getItem('messages')))

  return (
    <Box padding={4} marginTop={'auto'}>
      <Box marginBottom={2} height={200} overflowY={'scroll'}>
        {data?.length &&
          data.map((el) => {
            return (
              <Text wordBreak='break-all' color='yellow' fontSize='sm'>
                <span style={{ fontSize: '11px', color: '#8B8000' }}>
                  {el.author}:{' '}
                </span>
                <span>{el.text}</span>
              </Text>
            )
          })}
      </Box>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addNewMessage()
          inputRef.current.value = ''
        }}
      >
        <Input ref={inputRef} placeholder='Treść wiadomości..' />
        <Button marginTop={3} width='full' onClick={addNewMessage}>
          Napisz
        </Button>
      </form>
    </Box>
  )
}

export default Chat
