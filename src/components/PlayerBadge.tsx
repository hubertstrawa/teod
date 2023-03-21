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
import { useSelector } from 'react-redux'
import Avatar01 from 'avatars/variant-01.png'
import Coins from '../icons/Coins'
import Cash from '../icons/Cash'
import HeartIcon from '../icons/HeartIcon'
import ManaIcon from '../icons/ManaIcon'
import { useGetCurrentPlayerQuery } from '../features/player/playerApiSlice'
import { motion } from 'framer-motion'

const PlayerBadge = () => {
  const { data: player, isLoading } = useGetCurrentPlayerQuery()

  console.log('data', player)

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
  console.log('expneeded', expNeededForLevel)
  console.log('experience', experience)
  console.log('need ', expNeededForLevel - experience)
  console.log(
    'test ',
    Math.round(((expNeededForLevel - experience) * 100) / expNeededForLevel)
  )

  console.log('player', player)

  return (
    <Flex height='min-content' style={{ cursor: 'pointer' }}>
      <Avatar
        size={'lg'}
        bgColor={'gray.900'}
        src={avatar ?? '/avatars/orc-m.png'}
        border={'2px solid #fff'}
      />
      <Box ml='3' display={'flex'}>
        <Box fontWeight='bold'>
          {playerName}
          <Badge ml='1' colorScheme='green'>
            {/* ({race ?? 'mage'})  */}
            Poziom {level} / {experience} EXP
          </Badge>
          <Text
            display={'flex'}
            alignItems={'center'}
            fontSize='sm'
            textAlign='left'
          >
            {healthPoints} / {maxHealthPoints}{' '}
            <HeartIcon style={{ marginLeft: '5px' }} />
            <span style={{ margin: '0 7px' }}></span>
            {manaPoints} / {maxManaPoints}
            <ManaIcon style={{ marginLeft: '5px' }} />
          </Text>
          <Text fontSize='sm' textAlign='left'>
            Energia: {energy}
          </Text>
        </Box>
      </Box>
      <Flex ml='auto'>
        <Text display={'flex'}>
          {money} <Cash style={{ marginLeft: '3px' }} />
        </Text>
        {/* <ColorModeSwitcher justifySelf='flex-end' /> */}
      </Flex>
    </Flex>
  )
}

export default PlayerBadge
