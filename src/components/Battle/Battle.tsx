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
  useToast,
  Progress,
  ModalContent,
  Heading,
  ModalFooter,
  Button,
  keyframes,
  Container,
} from '@chakra-ui/react'
import getLootFromEnemy from '../../utils/getLootFromEnemy'
import { motion, AnimatePresence } from 'framer-motion'

import HeartIcon from '../../icons/HeartIcon'

import {
  useGetCurrentPlayerQuery,
  useGetInventoryQuery,
  useUpdateCurrentPlayerMutation,
  useAddToInventoryMutation,
} from '../../features/player/playerApiSlice'

import { useEffect, useState } from 'react'

import PlayerCharacter from './PlayerCharacter'
import BattleCharacter from './BattleCharacter'
import getRandomIntMinMax from '../../utils/getRandomIntMinMax'
import { useSelector, useDispatch } from 'react-redux'

interface BattleProps {
  isBattleOpen: boolean
  onClose: () => void
  enemyData: any
  playerData: any
}

export const enum AttackType {
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
  const dispatch = useDispatch()
  const [currentEnemy, setCurrentEnemy] = useState(enemyData)
  const [player, setPlayer] = useState(playerData)
  const [updatePlayer, { isLoading: isLoad, error }] =
    useUpdateCurrentPlayerMutation()
  const [addToInventory, { data: itemLootedData }] = useAddToInventoryMutation()
  const { data: inventoryData } = useGetInventoryQuery()
  const eqPlayerAttack = inventoryData
    ? Object.keys(inventoryData.eq).reduce((acc, curr) => {
        return inventoryData.eq[curr]?.attack
          ? acc + inventoryData.eq[curr].attack
          : acc
      }, 0)
    : 0
  // const eqPlayerAttack = 10
  const eqPlayerDefense = inventoryData
    ? Object.keys(inventoryData.eq).reduce((acc, curr) => {
        return inventoryData.eq[curr]?.defense
          ? acc + inventoryData.eq[curr].defense
          : acc
      }, 0)
    : 0
  console.log('INVENTORYYYY', eqPlayerAttack)
  console.log('INVENTORYYYY', eqPlayerDefense)

  console.log('PLAYERRRR', player)
  const {
    healthPoints,
    manaPoints,
    power,
    experience,
    avatar,
    race,
    energy,
    level,
    money,
    maxHealthPoints,
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
  const [playerProgress, setPlayerProgress] = useState({
    expEarned: 0,
    goldEarned: 0,
    itemLooted: null,
  })
  console.log('CURRENT ENEMY', currentEnemy)
  const toast = useToast()

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

    // if (isPlayerTurn) {
    //   setTimeout(() => {
    //     setBattleStatus({
    //       ...battleStatus,
    //       enemyAttackValue: 0,
    //     })
    //   }, 600)
    //   return
    // }

    if (!isPlayerTurn) {
      // console.log('currentENEM', currentEnemy)

      setTimeout(() => {
        let enemyHitValue = getRandomIntMinMax(
          currentEnemy.power - eqPlayerDefense - 3,
          currentEnemy.power - eqPlayerDefense + 3
        )

        if (enemyHitValue < 0) enemyHitValue = 0

        const lastHit = enemyHitValue > healthPoints
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
          healthPoints: lastHit ? 0 : healthPoints - enemyHitValue,
        })
        setTurn(turn + 1)
      }, 1200)
    }
  }, [turn])

  useEffect(() => {
    if (battleStatus.isBattleOver && battleStatus.didPlayerWin) {
      // const newExp = 10;
      // console.log(level * 100)
      const expNeededForLevel = level * (level + 1) * 100
      // console.log('expNeededForLevel', expNeededForLevel)
      const goldEarned = getRandomIntMinMax(2, currentEnemy.maxMoney)
      const expEarned = currentEnemy.experience
      setPlayerProgress({ ...playerProgress, expEarned, goldEarned })
      console.log('LOOT', currentEnemy.loot)
      const itemLooted = getLootFromEnemy(currentEnemy.loot)
      console.log('LOOTED', itemLooted)
      if (itemLooted.id !== 0) {
        addToInventory(itemLooted.id)
      }

      // console.log('=======  ITEM LOOTED DATA =========', itemLootedData)

      if (expNeededForLevel <= experience + currentEnemy.experience) {
        toast({
          title: `Gratulacje! Osiągnięto level ${level + 1}`,
          position: 'top',
          variant: 'top-accent',
          isClosable: true,
        })
        updatePlayer({
          level: level + 1,
          healthPoints,
          manaPoints,
          energy: energy - 5,
          experience: experience + currentEnemy.experience,
          money: money + goldEarned,
        })
      } else {
        updatePlayer({
          healthPoints,
          manaPoints,
          energy: energy - 5,
          experience: experience + currentEnemy.experience,
          money: money + goldEarned,
        })
      }
    }
  }, [battleStatus.isBattleOver])

  const playerAttack = (attackType: string) => {
    if (attackType === AttackType.NORMAL) {
      const playerHitValue = getRandomIntMinMax(
        eqPlayerAttack + level - 3,
        eqPlayerAttack + level + 3
      )
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

      let [min, max] = [eqPlayerAttack + level - 3, eqPlayerAttack + level + 3]
      if (isResistant) {
        min = min / 2
        max = max / 2
      }
      if (isEffective && !isResistant) {
        min = min * 2
        max = max * 2
      }
      const playerHitValue = getRandomIntMinMax(min, max)
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
        manaPoints: manaPoints - 5,
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

  // console.log('CURRENT ENEMY', currentEnemy)

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
                {manaPoints} <ManaIcon style={{ marginLeft: '5px' }} /> */}
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
                paddingTop={5}
                // display='flex'
                // justifyContent={'center'}
                // alignItems='center'
                flexDir='column'
                textAlign={'center'}
                animate='visible'
              >
                <Box
                  bgImage={'/images/scroll-bg.svg'}
                  bgSize={'contain'}
                  bgPos={'center'}
                  bgRepeat='no-repeat'
                  minHeight={250}
                  display='flex'
                  flexDir={'column'}
                  justifyContent='center'
                  alignItems='center'
                  color='gray.800'
                >
                  <Heading color='green'>
                    {battleStatus.didPlayerWin ? 'WYGRANA' : 'PRZEGRANA'}
                  </Heading>
                  <Box
                    display={'flex'}
                    width='150px'
                    justifyContent={'space-between'}
                  >
                    <Text as={motion.p} variants={item}>
                      +{playerProgress.expEarned} EXP
                    </Text>
                    <Text as={motion.p} variants={item}>
                      +{playerProgress.goldEarned} $ 💰
                    </Text>
                  </Box>
                  {/* <Text as={motion.p} variants={item}>
                    Zdobyto:
                  </Text> */}

                  {!!itemLootedData?.data && (
                    <Box
                      as={motion.div}
                      mt={5}
                      display={'flex'}
                      alignItems={'center'}
                      variants={item}
                    >
                      <Text>
                        Zdobyto <strong>{itemLootedData.data.name} </strong>
                      </Text>
                      <img
                        style={{
                          marginLeft: '5px',
                          width: '20px',
                          height: '20px',
                        }}
                        src={itemLootedData.data.image}
                      />
                    </Box>
                  )}
                </Box>
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
                <BattleCharacter
                  healthPoints={currentEnemy.health_points}
                  maxHealthPoints={currentEnemy.max_health_points}
                  playerAttack={battleStatus.playerAttack}
                  playerAttackValue={battleStatus.playerAttackValue}
                />
              </GridItem>
              <GridItem area={'d-3'}>
                <PlayerCharacter
                  healthPoints={healthPoints}
                  maxHealthPoints={maxHealthPoints}
                  enemyAttackValue={battleStatus.enemyAttackValue}
                />
              </GridItem>
            </Grid>
          </Box>
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
