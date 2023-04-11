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
  Stack,
  Container,
} from '@chakra-ui/react'
import { useMemo } from 'react'
import getLootFromEnemy from '../../utils/getLootFromEnemy'
import { motion, AnimatePresence } from 'framer-motion'

import HeartIcon from '../../icons/HeartIcon'
import { useLazyGetInventoryQuery } from '../../features/inventory/inventoryApiSlice'
import {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '../../features/player/playerApiSlice'
import { useAttackEnemyMutation } from '../../features/battlelog/battlelogApiSlice'

import { useEffect, useState } from 'react'

import PlayerCharacter from './PlayerCharacter'
import BattleCharacter from './BattleCharacter'
import getRandomIntMinMax from '../../utils/getRandomIntMinMax'
import { useSelector, useDispatch } from 'react-redux'

interface BattleProps {
  enemyId: number
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
  enemyId,
  isBattleOpen,
  playerData,
  onClose,
  enemyData,
}: BattleProps) => {
  const [attackEnemy, { isLoading: isLoadingAttack, data: dataAttack }] =
    useAttackEnemyMutation()
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const toast = useToast()

  console.log('playerDATA', playerData)

  console.log('enemyData', enemyData)
  const [trigger, result, lastPromiseInfo] = useLazyGetInventoryQuery()
  useEffect(() => {
    if (dataAttack?.data?.current?.lootedItem) {
      trigger()
    }

    if (dataAttack?.isNewLevel) {
      toast({
        title: `Gratulacje! Awansowano na kolejny poziom`,
        position: 'top-right',
        variant: 'top-accent',
        isClosable: true,
      })
    }
  }, [dataAttack])

  const { healthPoints, maxHealthPoints } = playerData

  const playerAttack = (spell: any) => {
    console.log('spell', spell)
    setButtonDisabled(true)
    if (spell === AttackType.NORMAL) {
      attackEnemy({ spellType: 'normal' })
    }
    if (spell.spellType === AttackType.FIRE) {
      attackEnemy(spell)
    }
    if (spell.spellType === AttackType.ELECTRIC) {
      attackEnemy(spell)
    }
    const mytimer = setTimeout(() => {
      setButtonDisabled(false)
    }, 2000)
    return () => clearInterval(mytimer)
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

  console.log(
    'dataAttack?.data?.current?.healthPoints',
    dataAttack?.data?.current?.healthPoints
  )

  return (
    <Modal
      size={'4xl'}
      onClose={dataAttack?.data?.current?.isOver ? onClose : () => {}}
      isOpen={isBattleOpen}
      scrollBehavior='inside'
    >
      <ModalOverlay background={'rgba(10,10,10, 0.95)'} />
      <ModalContent marginTop={10} height='100%'>
        <ModalHeader
          background={'rgba(0,0,0, 0.5)'}
          padding={3}
          display={'flex'}
        >
          <Avatar
            size={'md'}
            src={enemyData?.image}
            border={'2px solid #fff'}
          />
          <Box display='flex' flexDirection='column' ml='3'>
            <Text
              color={'gray.200'}
              fontFamily={'MedievalSharp, cursive'}
              fontWeight='bold'
            >
              {enemyData?.name}
            </Text>
            <Text
              display={'flex'}
              alignItems={'center'}
              fontSize='sm'
              textAlign='left'
            >
              {dataAttack?.data?.enemy?.health_points ??
                enemyData?.health_points}{' '}
              <HeartIcon style={{ marginLeft: '5px' }} />
              {/* <span style={{ margin: '0 5px' }}>|</span>
                {manaPoints} <ManaIcon style={{ marginLeft: '5px' }} /> */}
            </Text>
            <ModalCloseButton disabled={!dataAttack?.data?.current?.isOver} />
          </Box>
        </ModalHeader>
        <ModalBody
          backgroundImage={'/images/background22.png'}
          backgroundSize='100%'
          backgroundPosition={'90%'}
          padding={0}
          height='100%'
          minH={'lg'}
          overflow='hidden'
        >
          <Box height='100%' backgroundColor={'rgba(10,10,10, 0.6)'}>
            {dataAttack?.data?.current?.isOver && (
              <Container
                minH={200}
                // top='20%'
                // left='20%'
                background='rgba(0,10,0, 0.8)'
                // borderRadius={50}
                width='100%'
                maxWidth='100%'
                height='calc(100% - 62px)'
                padding={30}
                position={'absolute'}
                // variants={container}
                paddingTop={10}
                // display='flex'
                // justifyContent={'center'}
                // alignItems='center'
                flexDir='column'
                textAlign={'center'}
                // animate='visible'
              >
                <Box
                  bgImage={'/images/scroll-bg.svg'}
                  bgSize={'contain'}
                  bgPos={'center'}
                  bgRepeat='no-repeat'
                  minHeight={250}
                  display='flex'
                  flexDir={'column'}
                  width='100%'
                  justifyContent='center'
                  alignItems='center'
                  color='gray.800'
                  as={motion.div}
                  initial={{ y: -100, scale: 1.3, opacity: 0 }}
                  animate={{ y: 0, scale: 1, opacity: 1 }}
                >
                  <Heading
                    color={
                      dataAttack?.data?.current?.isOver &&
                      dataAttack?.data?.current.playerHealthPoints > 0
                        ? 'green'
                        : 'red'
                    }
                  >
                    {dataAttack?.data?.current?.isOver &&
                    dataAttack?.data?.current.playerHealthPoints > 0
                      ? 'WYGRANA'
                      : 'PRZEGRANA'}
                  </Heading>
                  {dataAttack?.data?.current?.isOver &&
                  dataAttack?.data?.current.playerHealthPoints > 0 ? (
                    <Box
                      display={'flex'}
                      width='150px'
                      justifyContent={'space-between'}
                    >
                      <Text as={motion.p} variants={item}>
                        +{dataAttack?.data?.current?.gainedExp} EXP
                      </Text>
                      <Text as={motion.p} variants={item}>
                        +{dataAttack?.data?.current?.gainedGold} $ 💰
                      </Text>
                    </Box>
                  ) : null}
                  {/* <Text as={motion.p} variants={item}>
                    Zdobyto:
                  </Text> */}

                  {dataAttack?.data?.current?.lootedItem && (
                    <Box
                      as={motion.div}
                      mt={5}
                      display={'flex'}
                      alignItems={'center'}
                      flexDirection={'column'}
                      variants={item}
                    >
                      <Box display='flex' alignItems={'center'}>
                        <Text>
                          Zdobyto{' '}
                          <strong>
                            {dataAttack?.data?.current?.lootedItem?.name}{' '}
                          </strong>
                        </Text>
                        <Image
                          style={{
                            marginLeft: '5px',
                            width: '20px',
                            height: '20px',
                          }}
                          src={dataAttack?.data?.current?.lootedItem?.image}
                        />
                      </Box>
                      {dataAttack?.data?.current?.lootedItem.state ===
                      'rare' ? (
                        <Text color='teal.900' fontWeight='bold' fontSize='sm'>
                          * rzadki *
                        </Text>
                      ) : null}
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
              padding={10}
              // minH={'lg'}
              height='100%'
              // maxH={'xl'}
              color='blackAlpha.700'
              fontWeight='bold'
            >
              <GridItem area={'c-1'}>
                <BattleCharacter
                  healthPoints={
                    dataAttack?.data?.enemy?.health_points ??
                    enemyData?.health_points
                  }
                  isLoading={isLoadingAttack}
                  maxHealthPoints={
                    dataAttack?.data?.enemy?.max_health_points ??
                    enemyData?.max_health_points
                  }
                  playerAttack={dataAttack?.data?.current?.playerAttackType}
                  playerAttackValue={
                    dataAttack?.data?.current?.playerAttackValue
                  }
                  playerCritical={dataAttack?.temp?.playerCritical}
                  enemyImage={enemyData.image}
                />
              </GridItem>
              <GridItem area={'d-3'}>
                <PlayerCharacter
                  healthPoints={
                    dataAttack?.data?.current?.playerHealthPoints ??
                    healthPoints
                  }
                  isLoading={isLoadingAttack}
                  maxHealthPoints={
                    dataAttack?.data?.current?.maxHealthPoints ??
                    maxHealthPoints
                  }
                  enemyAttackValue={dataAttack?.data?.current?.enemyAttack}
                  playerDodge={dataAttack?.temp?.playerDodge}
                />
              </GridItem>
            </Grid>
          </Box>
          <Box>
            <AnimatePresence>
              {!buttonDisabled && !dataAttack?.data?.current?.isOver ? (
                <Box
                  as={motion.div}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                  }}
                  bottom={5}
                  right={5}
                  padding={4}
                  position='absolute'
                  bgColor='rgba(0,0,0, 0.7)'
                  display='flex'
                  borderRadius={10}
                  flexDirection='column'
                >
                  <Text
                    marginBottom={4}
                    textAlign={'center'}
                    fontFamily='heading'
                    fontSize='lg'
                  >
                    Umiejętności
                  </Text>
                  <Stack spacing={3} fontFamily='heading' fontSize='md'>
                    <Button
                      isDisabled={
                        dataAttack?.data?.current?.isOver || buttonDisabled
                      }
                      mr={2}
                      variant='outline'
                      width='full'
                      onClick={() => playerAttack(AttackType.NORMAL)}
                    >
                      Atak zwykły
                    </Button>
                    {playerData.spells.map((spell) => {
                      return (
                        <Button
                          variant='outline'
                          width='full'
                          isDisabled={
                            dataAttack?.data?.current?.isOver ||
                            buttonDisabled ||
                            playerData.manaPoints < spell.manaCost
                          }
                          onClick={() => playerAttack(spell)}
                        >
                          {spell.name}
                        </Button>
                      )
                    })}
                  </Stack>
                </Box>
              ) : (
                <Heading>Tura przeciwnika</Heading>
              )}
            </AnimatePresence>
          </Box>
        </ModalBody>
        {/* <ModalFooter
          bgColor='rgba(0,0,0, 0.5)'
          display='flex'
          flexDirection={'column'}
        >
          <Heading opacity={0.5} mr={5}>
            Umiejętności:
          </Heading>
          <Box>
            <Button
              fontFamily='heading'
              isDisabled={dataAttack?.data?.current?.isOver}
              mr={2}
              onClick={() => playerAttack(AttackType.NORMAL)}
            >
              Atak zwykły
            </Button>
            {playerData.spells.map((spell) => {
              return (
                <Button
                  isDisabled={dataAttack?.data?.current?.isOver}
                  onClick={() => playerAttack(spell)}
                >
                  {spell.name} 🔥
                </Button>
              )
            })}
          </Box>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  )
}

export default Battle
