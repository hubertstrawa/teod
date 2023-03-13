import { useState, useRef } from 'react'
import Battle from './Battle/Battle'
import wolfSrc from 'images/wolf.png'
import dragonSrc from 'images/dragon.png'
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Flex,
  Avatar,
  Button,
  Badge,
  Grid,
  IconButton,
  CircularProgress,
  CircularProgressLabel,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '../features/player/playerApiSlice'
import IntroTutorial from './Tutorial/IntroTutorial'
import PlayerBadge from './PlayerBadge'

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: player } = useGetCurrentPlayerQuery()

  return (
    <Box
      backgroundImage='/images/dark-forest.png'
      backgroundSize='auto'
      backgroundPosition={'top'}
      textAlign='center'
      fontSize='xl'
    >
      <Box
        maxW='full'
        backgroundColor={'rgba(12,12,12, 0.8)'}
        margin='0 auto'
        p={12}
        minH='100vh'
        position={'relative'}
      >
        <PlayerBadge />
        <Flex mt={10} gap={10}>
          <CircularProgress value={40} color='green.400' size={200}>
            <CircularProgressLabel>{player?.data.level}</CircularProgressLabel>
          </CircularProgress>
          <Stat>
            <StatLabel>Siła </StatLabel>
            <StatNumber>£0.00</StatNumber>
            <StatHelpText>
              {' '}
              <IconButton
                variant='outline'
                colorScheme='teal'
                aria-label='Send email'
                icon={<FiPlus />}
              />
            </StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Inteligencja</StatLabel>
            <StatNumber>£0.00</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Witalność</StatLabel>
            <StatNumber>£0.00</StatNumber>
            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
          </Stat>
        </Flex>
        <IntroTutorial shouldBeVisible={player?.data?.tutorial === 1} />
      </Box>
    </Box>
  )
}

export default Home
