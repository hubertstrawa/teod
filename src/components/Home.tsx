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
  Tooltip,
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
  Spinner,
} from '@chakra-ui/react'
import Statistics from './Statistics'
import { FiPlus } from 'react-icons/fi'
import {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '../features/player/playerApiSlice'
import IntroTutorial from './Tutorial/IntroTutorial'
import PlayerBadge from './PlayerBadge'

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: player, isLoading } = useGetCurrentPlayerQuery()
  if (isLoading) return <Spinner size='xl' />
  const { level, experience } = player?.data

  const expNeededForLevel = level * (level + 1) * 100 // 2000
  const expNeededPreviousLevel = level * (level - 1) * 100 // 1200

  const substractedExp = expNeededForLevel - expNeededPreviousLevel // 800
  const test = ((experience - expNeededPreviousLevel) * 100) / substractedExp

  console.log('XXXXOXOXOXOXOXOXOOX', test)

  const percentage = Math.round(
    ((expNeededForLevel - experience) * 100) / expNeededForLevel
  )
  console.log('nananan', percentage)

  console.log('nananan', percentage)

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
        backgroundColor={'rgba(12,12,12, 0.75)'}
        margin='0 auto'
        p={12}
        minH='100vh'
        position={'relative'}
      >
        <PlayerBadge />
        <Flex mt={10} gap={10}>
          <Box flex='1'>
            <Tooltip
              placement={'top-end'}
              hasArrow
              fontSize='sm'
              label={`Do następnego poziomu brakuje Ci  ${
                expNeededForLevel - experience
              } EXP`}
              textAlign='center'
              aria-label='A tooltip'
            >
              <CircularProgress
                trackColor='gray.700'
                value={test}
                color='green.400'
                size={'sm'}
                fontFamily={'MedievalSharp, cursive'}
              >
                <CircularProgressLabel
                  bgGradient='linear(to-b, gray.200, teal)'
                  bgClip='text'
                  fontWeight='extrabold'
                  fontSize='8xl'
                >
                  <Heading marginTop={3} fontSize={'3xl'}>
                    Poziom
                  </Heading>{' '}
                  {player?.data.level}
                </CircularProgressLabel>
              </CircularProgress>
            </Tooltip>
            <Flex alignItems={'flex-start'} direction={'column'}>
              <Text>
                Punkty doświadczenia: {experience} / {expNeededForLevel}
              </Text>
              {/* <Text>Do następnego poziomu: {expNeededForLevel - experience}</Text> */}
            </Flex>
          </Box>
          <Statistics
            attributes={player?.data?.attributes}
            playerGold={player?.data?.money}
          />
        </Flex>
        <IntroTutorial shouldBeVisible={player?.data?.tutorial === 1} />
      </Box>
    </Box>
  )
}

export default Home
