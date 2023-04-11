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
  Image,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StackDivider,
  StatGroup,
  Card,
  CardBody,
  Stack,
  Spinner,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import formatNumber from '../utils/formatNumber'
import Statistics from './Statistics'
import SpellBox from './SpellBox'
import {
  GiFairyWand,
  GiCometSpark,
  GiCrossedAxes,
  GiUpgrade,
  GiBoneGnawer,
  GiChewedSkull,
  GiGuards,
  GiRun,
} from 'react-icons/gi'
import {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '../features/player/playerApiSlice'
import { useGetInventoryQuery } from '../features/inventory/inventoryApiSlice'
import getRandomIntMinMax from '../utils/getRandomIntMinMax'
import IntroTutorial from './Tutorial/IntroTutorial'
import PlayerBadge from './PlayerBadge'

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { data: player, isLoading } = useGetCurrentPlayerQuery()
  const { data: inventoryDB } = useGetInventoryQuery()

  if (isLoading) return <Spinner size='xl' />
  const { level, experience } = player?.data

  const expNeededForLevel = level * (level + 1) * 100 // 2000
  const expNeededPreviousLevel = level * (level - 1) * 100 // 1200

  const substractedExp = expNeededForLevel - expNeededPreviousLevel // 800
  const test = ((experience - expNeededPreviousLevel) * 100) / substractedExp

  const percentage = Math.round(
    ((expNeededForLevel - experience) * 100) / expNeededForLevel
  )

  const eqPlayerAttack = !!inventoryDB?.eq
    ? Object.keys(inventoryDB.eq).reduce((acc, curr) => {
        return inventoryDB.eq[curr]?.attack
          ? acc + inventoryDB.eq[curr].attack
          : acc
      }, 5)
    : 0

  // const eqPlayerAttack = Object.keys(inventory.eq).reduce((acc, curr) => {
  //   return inventory.eq[curr]?.attack ? acc + inventory.eq[curr].attack : acc
  // }, 5)

  // const eqPlayerDefense = Object.keys(inventory.eq).reduce((acc, curr) => {
  //   return inventory.eq[curr]?.defense ? acc + inventory.eq[curr].defense : acc
  // }, 0)

  console.log('player?.data?.inventory?.eq', player?.data?.inventory?.eq)
  console.log(
    'qPlayerAttac22k',
    eqPlayerAttack +
      player?.data?.level +
      player?.data?.attributes?.strength -
      3
  )

  const eqPlayerDefense = !!inventoryDB?.eq
    ? Object.keys(inventoryDB.eq).reduce((acc, curr) => {
        return inventoryDB.eq[curr]?.defense
          ? acc + inventoryDB.eq[curr].defense
          : acc
      }, 0)
    : 0

  const attackValue = getRandomIntMinMax(
    eqPlayerAttack +
      player?.data?.level +
      player?.data?.attributes?.strength -
      3,
    eqPlayerAttack +
      player?.data?.level +
      player?.data?.attributes?.strength +
      3
  )

  return (
    <Box
      backgroundImage='/images/background.png'
      backgroundSize='cover'
      backgroundPosition={'center'}
      textAlign='center'
      fontSize='xl'
    >
      <Flex
        maxW='full'
        backgroundColor={'rgba(12,12,12, 0.92)'}
        margin='0 auto'
        p={12}
        // gap={10}
        minH='100vh'
        flexDirection={'column'}
        position={'relative'}
      >
        <PlayerBadge />
        <Flex
          mt={10}
          gap={10}
          as={motion.div}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Box
            flex='1'
            display='flex'
            alignItems={'center'}
            justifyContent={'center'}
            borderRadius={20}
            // bgGradient='linear(to-r, rgba(10,0,0, 0.3), rgba(15,0,0, 0.5))'
            // bgColor='rgba(0,0,0, 0.3)'
            padding={6}
            // boxShadow={'rgba(0, 0, 0, 0.8) 0px 5px 15px'}
          >
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
                size={'xs'}
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
            {/* <Flex alignItems={'flex-start'} direction={'column'}>
              <Text>
                Punkty doświadczenia: {experience} / {expNeededForLevel}
              </Text>
            </Flex> */}
          </Box>
          {/* <Text>Do następnego poziomu: {expNeededForLevel - experience}</Text> */}

          <Statistics
            playerLevel={player?.data?.level}
            attributes={player?.data?.attributes}
            playerGold={player?.data?.money}
          />
        </Flex>
        <Flex
          as={motion.div}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          marginTop={6}
          flexDirection={'row'}
          flex={1}
          height='100%'
          gap={10}
        >
          <Box
            borderRadius={20}
            flex={1}
            padding={6}
            // bgColor='gray.900'
            // boxShadow={'inset rgba(0, 0, 0, 0.8) 0px 5px 15px'}
          >
            <Heading
              display='flex'
              alignItems={'center'}
              justifyContent={'center'}
              // textAlign={'center'}
              marginBottom={6}
            >
              <GiFairyWand style={{ marginRight: '10px' }} />
              Księga Czarów
            </Heading>
            <Flex>
              <Card bgColor='rgba(0,0,0, 0.4)' height='100%' flex='1'>
                {/* <CardHeader>
        <Heading size='md'>Client Report</Heading>
      </CardHeader> */}

                <CardBody borderRadius={20}>
                  <Stack divider={<StackDivider />} spacing='4'>
                    {player?.data?.spells?.map((spell) => {
                      return (
                        <Flex justifyContent={'space-between'}>
                          <Box height={'100%'} display='flex'>
                            <Image
                              marginRight={4}
                              height={'30px'}
                              src={
                                spell.spellType === 'fire'
                                  ? '/spells/ogniste-uderzenie.png'
                                  : '/spells/blyskawica-bad.png'
                              }
                            />
                            <Text color='gray.200' fontFamily={'heading'}>
                              {spell.name}
                            </Text>
                          </Box>
                          <Box display='flex'>
                            {spell.name === 'Ogniste uderzenie' && (
                              <Text
                                display='flex'
                                alignItems='center'
                                fontSize='md'
                              >
                                <GiCometSpark
                                  style={{ marginRight: '0.5rem' }}
                                />{' '}
                                {spell.power +
                                  player.data.attributes.eqIntelligence +
                                  player.data.attributes.intelligence -
                                  2}
                                {' - '}
                                {spell.power +
                                  player.data.attributes.eqIntelligence +
                                  player.data.attributes.intelligence +
                                  5}
                              </Text>
                            )}
                            {spell.name === 'Błyskawica' && (
                              <Text
                                display='flex'
                                alignItems='center'
                                fontSize='md'
                              >
                                <GiCometSpark
                                  style={{ marginRight: '0.5rem' }}
                                />{' '}
                                {spell.spellLevel +
                                  (player.data.attributes.eqIntelligence +
                                    player.data.attributes.intelligence / 2)}
                                {' - '}
                                {spell.spellLevel +
                                  spell.power +
                                  player.data.attributes.eqIntelligence +
                                  player.data.attributes.intelligence +
                                  10}
                              </Text>
                            )}
                            <CircularProgress
                              size='2rem'
                              marginLeft='15px'
                              value={spell.spellLevel}
                              trackColor='gray.500'
                              color='orange'
                            >
                              <CircularProgressLabel fontSize='md'>
                                {spell.spellLevel}
                              </CircularProgressLabel>
                            </CircularProgress>
                          </Box>
                        </Flex>
                      )
                    })}
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Box>
          <Flex flex={1} padding={6}>
            <Box paddingX={5} display='flex' flexDirection='column'>
              <Stack spacing={5} color='gray.200'>
                <Heading size='md' display='flex'>
                  <GiCrossedAxes style={{ marginRight: '10px' }} />
                  Atak:{' '}
                  {eqPlayerAttack +
                    player?.data?.attributes?.eqStrength +
                    player?.data?.attributes?.strength -
                    3}{' '}
                  -{' '}
                  {eqPlayerAttack +
                    player?.data?.attributes?.eqStrength +
                    player?.data?.attributes?.strength +
                    3}
                </Heading>
                <Heading size='md' display='flex'>
                  <GiUpgrade style={{ marginRight: '10px' }} />
                  Punkty doświadczenia: {formatNumber(experience)} /{' '}
                  {formatNumber(expNeededForLevel)}
                </Heading>

                <Heading size='md' display='flex'>
                  <GiBoneGnawer style={{ marginRight: '10px' }} />
                  Szansa na cios krytyczny:{' '}
                  {(
                    ((player?.data?.attributes?.accuracy +
                      player?.data?.attributes?.eqAccuracy) /
                      1000) *
                    100
                  ).toFixed(1)}{' '}
                  %
                </Heading>
                <Heading size='md' display='flex'>
                  <GiRun style={{ marginRight: '10px' }} />
                  Szansa na wykonanie uniku:{' '}
                  {(
                    ((player?.data?.attributes?.agility +
                      player?.data?.attributes?.eqAgility) /
                      1000) *
                    100
                  ).toFixed(1)}{' '}
                  %
                </Heading>
                <Heading size='md' display='flex'>
                  <GiGuards style={{ marginRight: '10px' }} />
                  Gildia: brak
                </Heading>
              </Stack>
            </Box>
          </Flex>
        </Flex>
        <IntroTutorial shouldBeVisible={player?.data?.tutorial === 1} />
      </Flex>
    </Box>
  )
}

export default Home
