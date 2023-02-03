import {
  Box,
  Image,
  Grid,
  GridItem,
  Text,
  Modal,
  Avatar,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Progress,
  ModalContent,
  Heading,
  ModalFooter,
  Button,
  keyframes,
  Container,
} from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

import HeartIcon from '../icons/HeartIcon'
import Weapon from '../icons/Weapon'
import {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '../features/player/playerApiSlice'

import { useEffect, useState } from 'react'
import AttackNormal from '../icons/AttackNormal'
import AttackFire from '../icons/AttackFire'
import background from '../assets/background22.png'
// import wolfTexture from '../assets/wolf-no-bg.png'

import playerTexture from '../assets/warrior-no-bg.png'
// import { setPlayer } from '../features/player/playerSlice'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'

function randomIntFromInterval(min: number, max: number) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const BattleEnemy = ({
  healthPoints,
  maxHealthPoints,
  playerAttackValue,
  playerAttack,
}: any) => {
  console.log('healthPoints', healthPoints)
  console.log('maxHealthPoints', maxHealthPoints)

  const healthPercent = (100 * healthPoints) / maxHealthPoints
  console.log('healthPercent', healthPercent)

  // console.log('health%%', healthPercent)
  // console.log('healthPoints', healthPoints)
  // console.log('maxHealthPoints', maxHealthPoints)

  // let icon
  // console.log('platttack', playerAttack)
  // switch (playerAttack) {
  //   case playerAttack === AttackType.NORMAL:
  //     icon = <AttackNormal />
  //     break
  //   case playerAttack === AttackType.FIRE:
  //     icon = <AttackFire />
  //     break
  //   default:
  //     icon = 'HP'
  // }

  return (
    <Box position={'relative'}>
      <AnimatePresence>
        {playerAttackValue !== 0 && (
          <Text
            as={motion.p}
            margin={'auto'}
            textAlign={'center'}
            top={-8}
            initial={{ left: 0 }}
            animate={{ left: 25, scale: 1.3, opacity: 1 }}
            exit={{ left: 0, scale: 0, opacity: 0 }}
            position={'absolute'}
            color={'red'}
            display={'flex'}
          >
            - {playerAttackValue}
            {playerAttack === AttackType.NORMAL && <AttackNormal />}
            {playerAttack === AttackType.FIRE && <AttackFire />}
          </Text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {healthPoints > 0 && (
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Progress colorScheme='green' size={'sm'} value={healthPercent} />
            <Image width='100px' height='100px' src={'images/wolf-no-bg.png'} />
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

const Player = ({ healthPoints, maxHealthPoints, enemyAttackValue }: any) => {
  const healthPercent = (100 * healthPoints) / maxHealthPoints
  return (
    <Box position={'relative'}>
      <AnimatePresence>
        {enemyAttackValue !== 0 && (
          <Text
            as={motion.p}
            margin={'auto'}
            textAlign={'center'}
            top={-8}
            initial={{ left: 0 }}
            animate={{ left: 25, scale: 1.3, opacity: 1 }}
            exit={{ left: 0, scale: 0, opacity: 0 }}
            position={'absolute'}
            color={'red'}
          >
            - {enemyAttackValue} HP
          </Text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {healthPoints > 0 && (
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Progress colorScheme='green' size={'sm'} value={healthPercent} />
            <Image
              width='100px'
              height='100px'
              src={'images/warrior-no-bg.png'}
            />
          </Box>
        )}
      </AnimatePresence>
      {/* <Progress colorScheme='green' size={'sm'} value={healthPercent} />

      <Image width='100px' height='100px' src={playerTexture} /> */}
    </Box>
  )
}

interface BattleProps {
  isBattleOpen: boolean
  onClose: () => void
  enemyData: any
  playerData: any
}

const enum AttackType {
  NORMAL = 'normal',
  FIRE = 'fire',
  ICE = 'ice',
  ELECTRIC = 'electric',
  WATER = 'water',
}

const Battle = ({
  isBattleOpen,
  playerData,
  onClose,
  enemyData,
}: BattleProps) => {
  // const { onOpen, onClose } = useDisclosure()

  // let {
  //   healthPoints: enemyHp,
  //   power: enemyPower,
  //   name: enemyName,
  //   level: enemyLevel,
  // } = enemyData
  // const { data, isLoading } = useGetCurrentPlayerQuery()
  // console.log('daata', data)
  const dispatch = useDispatch()
  const [currentEnemy, setCurrentEnemy] = useState(enemyData)
  const [player, setPlayer] = useState(playerData)
  const [updatePlayer, { isLoading: isLoad, error }] =
    useUpdateCurrentPlayerMutation()
  console.log('PLAYERRRR', player)
  const {
    player_name,
    health_points,
    mana_points,
    power,
    experience,
    avatar,
    race,
    energy,
    level,
    money,
    max_health_points,
  } = player

  const [turn, setTurn] = useState(1)
  const isPlayerTurn = turn % 2 === 1
  // const [isBattleOver, setIsBattleOver] = useState(false)
  const [battleStatus, setBattleStatus] = useState({
    playerAttack: '',
    playerAttackValue: 0,
    enemyAttack: '',
    enemyAttackValue: 0,
    isBattleOver: false,
    didPlayerWin: false,
  })
  console.log('CURRENT ENEMY', currentEnemy)

  useEffect(() => {
    // console.log('isPlayerTurn', isPlayerTurn)

    // console.log('isBattleOver', isBattleOver)
    if (currentEnemy.health_points === 0) {
      // setIsBattleOver(true)
      setBattleStatus({
        ...battleStatus,
        playerAttack: '',
        playerAttackValue: 0,
        enemyAttackValue: 0,
        isBattleOver: true,
        didPlayerWin: true,
      })
      return
    }

    if (isPlayerTurn) {
      setTimeout(() => {
        setBattleStatus({
          ...battleStatus,
          enemyAttackValue: 0,
        })
      }, 600)
      return
    }

    if (!isPlayerTurn) {
      // console.log('currentENEM', currentEnemy)

      setTimeout(() => {
        const enemyHitValue = randomIntFromInterval(
          currentEnemy.power - 3,
          currentEnemy.power + 3
        )

        const lastHit = enemyHitValue > health_points
        if (lastHit) {
          setBattleStatus({
            ...battleStatus,
            isBattleOver: true,
            didPlayerWin: false,
          })
        } else {
          setBattleStatus({
            ...battleStatus,
            playerAttack: '',
            playerAttackValue: 0,
            enemyAttackValue: enemyHitValue,
          })
        }
        setPlayer({
          ...player,
          health_points: lastHit ? 0 : health_points - enemyHitValue,
        })
        setTurn(turn + 1)
      }, 1200)
    }
  }, [turn])

  useEffect(() => {
    if (battleStatus.isBattleOver) {
      // const newExp = 10;
      // console.log(level * 100)
      const expNeededForLevel = level * (level + 1) * 100
      console.log('expNeededForLevel', expNeededForLevel)
      updatePlayer({
        health_points,
        mana_points,
        energy: energy - 5,
        experience: experience + 10,
        money: money + 10,
      })
    }
  }, [battleStatus.isBattleOver])

  const animationKeyframes = keyframes`
  0% { transform: scale(0.1) rotate(0); border-radius: 20%; }
  25% { transform: scale(1.5) rotate(0); border-radius: 20%; }
  50% { transform: scale(1.5) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  95% { transform: scale(1) rotate(0); border-radius: 20%; }
  100% { transform: scale(0.1) rotate(0); border-radius: 20%; }

`

  const animation = `${animationKeyframes} 2s ease-in-out`

  const playerAttack = (attackType: string) => {
    if (attackType === AttackType.NORMAL) {
      const playerHitValue = randomIntFromInterval(power - 3, power + 3)
      // console.log('PLAYER HIT VALUE', playerHitValue)
      setBattleStatus({
        ...battleStatus,
        playerAttack: AttackType.NORMAL,
        playerAttackValue: playerHitValue,
      })
      const lastHit = playerHitValue > currentEnemy.health_points
      if (lastHit || currentEnemy.health_points === 0) {
        setBattleStatus({
          ...battleStatus,
          isBattleOver: true,
          didPlayerWin: true,
        })
      }

      setCurrentEnemy((prev: any) => {
        return {
          ...prev,
          health_points: lastHit
            ? 0
            : currentEnemy.health_points - playerHitValue,
        }
      })
    }
    if (attackType === AttackType.FIRE) {
      const isEffective = currentEnemy.type?.includes(AttackType.ICE)
      const isResistant = currentEnemy.type?.includes(AttackType.WATER)
      // console.log('isEffective', isEffective)
      // console.log('isResistant', isResistant)

      let [min, max] = [power - 3, power + 3]
      if (isResistant) {
        min = min / 2
        max = max / 2
      }
      if (isEffective && !isResistant) {
        min = min * 2
        max = max * 2
      }
      const playerHitValue = randomIntFromInterval(min, max)
      setBattleStatus({
        ...battleStatus,
        playerAttack: AttackType.FIRE,
        playerAttackValue: playerHitValue,
      })
      const lastHit = playerHitValue > currentEnemy.health_points
      if (lastHit || currentEnemy.health_points === 0) {
        setBattleStatus({
          ...battleStatus,
          isBattleOver: true,
          didPlayerWin: true,
        })
      }
      setPlayer({
        ...player,
        mana_points: mana_points - 5,
      })
      setCurrentEnemy((prev: any) => {
        return {
          ...prev,
          health_points: lastHit
            ? 0
            : currentEnemy.health_points - playerHitValue,
        }
      })
    }
    setTurn(turn + 1)
  }

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  }

  console.log('CURRENT ENEMY', currentEnemy)

  return (
    <Modal
      size={'xl'}
      onClose={battleStatus.isBattleOver ? onClose : () => {}}
      isOpen={isBattleOpen}
      scrollBehavior='inside'
    >
      <ModalOverlay background={'rgba(0,0,0, 0.8)'} />
      <ModalContent>
        <ModalHeader padding={3} display={'flex'}>
          <Avatar
            size={'md'}
            src={currentEnemy.image}
            border={'2px solid #fff'}
          />
          <Box ml='3' display={'flex'}>
            <Text fontWeight='bold'>
              {currentEnemy.name}
              {/* <Badge ml='1' colorScheme='green'>
                {level} LEVEL ({race}) / {experience} EXP
              </Badge> */}

              <Text
                display={'flex'}
                alignItems={'center'}
                fontSize='sm'
                textAlign='left'
              >
                {currentEnemy.health_points}{' '}
                <HeartIcon style={{ marginLeft: '5px' }} />
                {/* <span style={{ margin: '0 5px' }}>|</span>
                {mana_points} <ManaIcon style={{ marginLeft: '5px' }} /> */}
              </Text>
            </Text>
          </Box>
          {/* Walka z <strong>Wilk</strong> */}
          {/* {isBattleOver && 'YOU WON!'}
            {isPlayerTurn &&
              !isBattleOver &&
              `Your turn ---- (ENEMY HP: ${currentEnemy.health_points})`}
            {!isPlayerTurn &&
              !isBattleOver &&
              `ENEMY TURN (ENEMY HP: ${currentEnemy.health_points})`} */}
        </ModalHeader>
        <ModalCloseButton disabled={!battleStatus.isBattleOver} />
        <ModalBody
          backgroundImage={'images/background22.png'}
          backgroundSize='100%'
          padding={0}
          height='100%'
          minH={'lg'}
          overflow='hidden'
        >
          <Box backgroundColor={'rgba(34,34,34, 0.45)'}>
            {/* {battleStatus?.playerAttack === AttackType.NORMAL && (
              <Image
                as={motion.img}
                transform={'scale(0.1)'}
                animation={animation}
                position={'absolute'}
                src={weaponTexture}
              />
            )} */}
            {/* {battleStatus?.playerAttack === AttackType.FIRE && ( */}
            {/* <Heading>- {battleStatus.playerAttackValue} HP</Heading> */}

            {battleStatus.isBattleOver && (
              <Container
                minH={200}
                // top='20%'
                // left='20%'
                background='rgba(0,10,0, 0.8)'
                // borderRadius={50}
                width='100%'
                height='calc(100% - 62px)'
                padding={30}
                position={'absolute'}
                as={motion.div}
                variants={container}
                initial='hidden'
                textAlign={'center'}
                animate='visible'
              >
                <Heading>
                  {battleStatus.didPlayerWin ? 'WYGRANA' : 'PRZEGRANA'}
                </Heading>
                <Text as={motion.p} variants={item}>
                  Zdobyto:
                </Text>
                <Text as={motion.p} variants={item}>
                  X XP 🎮
                </Text>
                <Text as={motion.p} variants={item}>
                  10 $ 💰
                </Text>
              </Container>
            )}

            <Grid
              templateAreas={`"a-1 a-2 a-3 a-4 a-5"
                  "b-1 b-2 b-3 b-4 b-5"
                  "c-1 c-2 c-3 c-4 c-5"
                  "d-1 d-2 d-3 d-4 d-5"
                  "e-1 e-2 e-3 e-4 e-5"`}
              gridTemplateRows={'repeat(5, 1fr)'}
              gridTemplateColumns={'repeat(5, 1fr)'}
              gap='1'
              padding={4}
              // minH={'lg'}
              color='blackAlpha.700'
              fontWeight='bold'
            >
              <GridItem area={'c-1'}>
                <BattleEnemy
                  healthPoints={currentEnemy.health_points}
                  maxHealthPoints={currentEnemy.max_health_points}
                  playerAttack={battleStatus.playerAttack}
                  playerAttackValue={battleStatus.playerAttackValue}
                />
              </GridItem>
              <GridItem area={'d-3'}>
                <Player
                  healthPoints={health_points}
                  maxHealthPoints={max_health_points}
                  enemyAttackValue={battleStatus.enemyAttackValue}
                />
              </GridItem>
            </Grid>
          </Box>
          {/* <BattleEnemy /> */}
          <Box bottom={5} left={5} position='absolute'>
            <Button
              isDisabled={battleStatus.isBattleOver || !isPlayerTurn}
              mr={2}
              onClick={() => playerAttack(AttackType.NORMAL)}
            >
              Atak zwykły
            </Button>
            <Button
              isDisabled={battleStatus.isBattleOver || !isPlayerTurn}
              onClick={() => playerAttack(AttackType.FIRE)}
            >
              Ratata 🔥
            </Button>
          </Box>
        </ModalBody>
        {/* <ModalFooter>
          <Text opacity={0.5} mr={5}>
            Umiejętności:
          </Text>
          <Box mr={'auto'}>
            <Button
              disabled={isBattleOver || !isPlayerTurn}
              mr={2}
              onClick={() => playerAttack(AttackType.NORMAL)}
            >
              Atak zwykły
            </Button>
            <Button
              disabled={isBattleOver || !isPlayerTurn}
              onClick={() => playerAttack(AttackType.FIRE)}
            >
              Ratata 🔥
            </Button>
          </Box>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}

export default Battle
