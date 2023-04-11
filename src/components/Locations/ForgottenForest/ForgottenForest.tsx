import { useState, useEffect, useRef } from 'react'
import Battle from '../../Battle/Battle'
import wolfSrc from 'images/wolf.png'
import dragonSrc from 'images/dragon.png'
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Avatar,
  Button,
  Badge,
  useToast,
  Grid,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import { GiPirateFlag } from 'react-icons/gi'
import { RootState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '../../../features/player/playerApiSlice'
import woodenBg from 'images/woodenbg.png'
import Enemy from '../../Enemy'
import PlayerBadge from '../../PlayerBadge'
import Tasks from '../../Tasks'
import Quest01 from './Quest-01'
import Quest02 from './Quest-02'
import { useGetQuestlogQuery } from '../../../features/questlog/questlogApiSlice'
import { useStartBattleMutation } from '../../../features/battlelog/battlelogApiSlice'
import { Quest } from '../../../features/questlog/Quest'
import { motion } from 'framer-motion'
import { useGetEnemiesQuery } from '../../../features/enemy/enemyApiSlice'
// const isActiveQuest = (questlog) => {

// }

const ForgottenForest = () => {
  // const [enemy, setEnemy] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenTasks,
    onOpen: onOpenTasks,
    onClose: onCloseTasks,
  } = useDisclosure()
  const toast = useToast()

  const { data: player, refetch, isLoading } = useGetCurrentPlayerQuery()
  const { data: questlog, isLoading: isQuestlogLoading } = useGetQuestlogQuery()
  const [startBattle, { isLoading: isBattleLoading, error, data: enemy }] =
    useStartBattleMutation() as any
  const { data: enemyData, isLoading: isEnemiesLoading } =
    useGetEnemiesQuery('forgotten-forest')

  console.log('enemyData', enemyData)

  const hasQuest = (questId) => {
    return (
      questlog?.data?.activeQuests?.findIndex((el) => el._id === questId) !== -1
    )
  }

  const hasQuestCompleted = (questId) => {
    return (
      questlog?.data?.completedQuests?.findIndex((el) => el._id === questId) !==
      -1
    )
  }

  console.log('enemy', enemy)

  const handleFight = (enemyId: number) => {
    startBattle(enemyId)
    // const enemyFindToREMOVE = enemyData.find((el) => el._id === enemyId)
    // setEnemy(data?.data?.enemy)
    onOpen()
  }

  const handleClose = () => {
    refetch()
    onClose()
  }

  if (isLoading || isEnemiesLoading) return <h1>LOADING</h1>

  console.log('ENEMYDAT', enemyData)

  let content
  let quest

  switch (true) {
    case !hasQuest(Quest.NA_POCZATKU_BYLO_DRZEWO) &&
      !hasQuestCompleted(Quest.NA_POCZATKU_BYLO_DRZEWO):
      quest = <Quest01 />
      break
    case !hasQuest(Quest.PRZEKLĘTE_WIEWIÓRKI) &&
      hasQuestCompleted(Quest.NA_POCZATKU_BYLO_DRZEWO) &&
      !hasQuestCompleted(Quest.PRZEKLĘTE_WIEWIÓRKI):
      quest = <Quest02 />
      break
    default:
      content = (
        <>
          {enemyData?.data?.map((el, i) => {
            return (
              el.monsterType !== 'boss' && (
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                  }}
                  transition={{ delay: i / 10 }}
                >
                  <Enemy
                    isBattleLoading={isBattleLoading}
                    fight={() => handleFight(el._id)}
                    isDisabled={
                      player.data.healthPoints === 0 ||
                      !!player.data.activeJob ||
                      player.energy < 5
                    }
                    {...el}
                  />
                </motion.div>
              )
            )
          })}
        </>
      )
  }

  return !!player?.data ? (
    <Box
      backgroundImage='/images/dark-forest.png'
      backgroundSize='auto'
      backgroundPosition={'top'}
      // padding={100}
      textAlign='center'
      fontSize='xl'
    >
      {quest ? (
        quest
      ) : (
        <SimpleGrid
          maxW='full'
          backgroundColor={'rgba(12,12,12, 0.8)'}
          margin='0 auto'
          p={12}
          minH='100vh'
          position={'relative'}
          // background={'white'}
          // _after={{
          //   content: "''",
          //   height: '20px',
          //   width: '100%',
          //   position: 'absolute',
          //   top: '-20px',
          //   transform: 'rotate(180deg)',
          //   left: '0',
          //   background:
          //     'url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/rip.svg) bottom',
          //   backgroundSsize: '150%',

          //MOONLIT KINGDOM
          // }}
        >
          <PlayerBadge />
          <Flex>
            <Heading fontSize={'5xl'}>Zapomniany las </Heading>
            <Button
              variant='outline'
              colorScheme={'teal'}
              marginLeft='auto'
              size='lg'
              display='flex'
              onClick={onOpenTasks}
            >
              <Heading marginRight={2} size='md'>
                Zlecenia
              </Heading>{' '}
              <GiPirateFlag />
            </Button>
          </Flex>

          <SimpleGrid gap={10} columns={{ base: 1, md: 2, lg: 4 }}>
            {/* <Flex flexWrap={'wrap'} mt={'auto'} gap={10}> */}
            {content}
          </SimpleGrid>
          {/* </Flex> */}
        </SimpleGrid>
      )}
      {isOpen && enemy?.data?.enemy && (
        <Battle
          enemyId={enemy?.data?.enemy._id}
          isBattleOpen={isOpen}
          playerData={player?.data}
          enemyData={enemy?.data?.enemy}
          onClose={handleClose}
        />
      )}
      {isOpenTasks ? (
        <Tasks
          isOpen={isOpenTasks}
          onClose={onCloseTasks}
          handleFight={handleFight}
        />
      ) : null}
    </Box>
  ) : null
}

export default ForgottenForest
