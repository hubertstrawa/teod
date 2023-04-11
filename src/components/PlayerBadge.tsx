// interface IPlayerBadge {
//   avatar: string
//   name: string
//   race: string
//   name: string
//   power: number
//   avatar: string
//   money: number
// }
import { Text, Flex, Avatar, Box, Badge } from '@chakra-ui/react'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import Avatar01 from 'avatars/variant-01.png'
import Coins from '../icons/Coins'
import Cash from '../icons/Cash'
import HeartIcon from '../icons/HeartIcon'
import ManaIcon from '../icons/ManaIcon'
import formatNumber from '../utils/formatNumber'
import { useToast } from '@chakra-ui/react'
import { GiBoltSpellCast, GiHealthPotion, GiCash } from 'react-icons/gi'
import { useGetCurrentPlayerQuery } from '../features/player/playerApiSlice'
import { motion } from 'framer-motion'
import { clearNotification } from '../features/notification/notificationSlice'
import { useEffect } from 'react'

const PlayerBadge = () => {
  const { data: player, isLoading } = useGetCurrentPlayerQuery()
  const notification = useSelector(
    (state: RootState) => state.notification.message
  )
  const toast = useToast()
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification) {
      toast({
        title: notification,
        status: 'error',
        position: 'top-right',
        isClosable: true,
        duration: 2000,
        onCloseComplete: () => {
          dispatch(clearNotification())
        },
      })
    }
  }, [notification])

  const {
    playerName,
    healthPoints,
    maxHealthPoints,
    manaPoints,
    maxManaPoints,
    power,
    energy,
    experience,
    avatar,
    race,
    level,
    money,
  } = player?.data ?? {}

  const expNeededForLevel = level * (level + 1) * 100

  return (
    <Flex height='min-content' style={{ cursor: 'pointer' }}>
      <Avatar
        size={'lg'}
        bgColor={'gray.900'}
        src={avatar ?? '/avatars/orc-m.png'}
        border={'2px solid #fff'}
      />
      <Box ml='3' display={'flex'}>
        <Box fontWeight='bold' textAlign={'left'}>
          {playerName}
          <Badge ml='1' colorScheme='green'>
            {/* ({race ?? 'mage'})  */}
            Poziom {level} / {formatNumber(experience)} EXP
          </Badge>
          <Text
            display={'flex'}
            alignItems={'center'}
            fontSize='md'
            textAlign='left'
          >
            {healthPoints} / {maxHealthPoints}{' '}
            <GiHealthPotion style={{ marginLeft: '5px' }} />
            {/* <HeartIcon style={{ marginLeft: '5px' }} /> */}
            <span style={{ margin: '0 7px' }}></span>
            {manaPoints} / {maxManaPoints}
            <GiBoltSpellCast style={{ marginLeft: '5px' }} />
          </Text>
          <Text fontSize='sm' textAlign='left'>
            Energia: {energy}
          </Text>
        </Box>
      </Box>
      <Flex ml='auto'>
        <Text display={'flex'}>
          {formatNumber(money)} <GiCash style={{ marginLeft: '3px' }} />
        </Text>
        {/* <ColorModeSwitcher justifySelf='flex-end' /> */}
      </Flex>
    </Flex>
  )
}

export default PlayerBadge
