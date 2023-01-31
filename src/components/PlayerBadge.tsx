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
import { m } from 'framer-motion'

const PlayerBadge = ({ player }) => {
  if (!player?.data) return null
  const {
    player_name,
    health_points,
    mana_points,
    power,
    energy,
    experience,
    avatar,
    race,
    level,
    money,
  } = player.data

  console.log('player', player)

  return (
    <Flex style={{ cursor: 'pointer' }}>
      <Avatar
        src={avatar ?? '/avatars/variant-01.png'}
        border={'2px solid #fff'}
      />
      <Box ml='3' display={'flex'}>
        <Box fontWeight='bold'>
          {player_name}
          <Badge ml='1' colorScheme='green'>
            {level} LEVEL ({race ?? 'mage'}) / {experience} EXP
          </Badge>
          <Text fontSize='sm' textAlign='left'>
            Energy: {energy}
          </Text>
          <Text
            display={'flex'}
            alignItems={'center'}
            fontSize='sm'
            textAlign='left'
          >
            {health_points} <HeartIcon style={{ marginLeft: '5px' }} />
            <span style={{ margin: '0 5px' }}>|</span>
            {mana_points} <ManaIcon style={{ marginLeft: '5px' }} />
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
