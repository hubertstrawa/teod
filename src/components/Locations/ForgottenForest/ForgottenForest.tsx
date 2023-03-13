import { useState, useRef } from 'react'
import Battle from '../../Battle/Battle'
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
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import { RootState } from '../../../store'
import { useSelector, useDispatch } from 'react-redux'
import {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '../../../features/player/playerApiSlice'
import woodenBg from 'images/woodenbg.png'
import Enemy from '../../Enemy'
import PlayerBadge from '../../PlayerBadge'
import Quest01 from './Quest-01'
import { useGetQuestlogQuery } from '../../../features/questlog/questlogApiSlice'
import { Quest } from '../../../features/questlog/Quest'
import { motion } from 'framer-motion'
// const isActiveQuest = (questlog) => {

// }

const ForgottenForest = () => {
  const [enemy, setEnemy] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenDialogue,
    onOpen: onOpenDialogue,
    onClose: onCloseDialogue,
  } = useDisclosure()

  const { data: player, isLoading } = useGetCurrentPlayerQuery()
  const { data: questlog } = useGetQuestlogQuery()

  const hasQuest = (questId) => {
    return (
      questlog?.data?.activeQuests?.findIndex((el) => el._id === questId) !== -1
    )
  }

  console.log('DATA QUEST', hasQuest(Quest.NA_POCZATKU_BYLO_DRZEWO))

  const handleFight = (enemy: any) => {
    setEnemy(enemy)
    onOpen()
  }

  const handleTalk = (npc: any) => {
    onOpenDialogue()
  }

  if (isLoading) return <h1>LOADING</h1>

  const enemyData = [
    {
      experience: 40,
      maxMoney: 12,
      loot: [
        { id: 0, chance: 30 },
        { id: '63e96737ecbb4c981ca98882', chance: 70 },
      ],
      name: 'Dzika Świnia',
      health_points: 20,
      max_health_points: 20,
      level: 1,
      power: 10,
      image: '/monsters/cursed-pig-transparent.png',
      type: 'normal',
      damage: 33,
      isDisabled: player.data.healthPoints === 0,
    },
    {
      experience: 50,
      maxMoney: 20,
      loot: [
        { id: 0, chance: 30 },
        { id: '63e96737ecbb4c981ca98882', chance: 70 },
      ],
      name: 'Wiewiór',
      health_points: 30,
      max_health_points: 30,
      level: 2,
      power: 15,
      image: '/monsters/squirrel-transparent.png',
      type: 'normal',
      damage: 33,
      isDisabled: player.data.healthPoints === 0,
    },
    {
      experience: 40,
      maxMoney: 12,
      loot: [
        { id: 0, chance: 30 },
        { id: '63e96737ecbb4c981ca98882', chance: 70 },
      ],
      name: 'Dzika2',
      health_points: 20,
      max_health_points: 20,
      level: 1,
      power: 10,
      image: '/monsters/cursed-pig-transparent.png',
      type: 'fire',
      damage: 33,
      isDisabled: player.data.healthPoints === 0,
    },
    {
      experience: 40,
      maxMoney: 12,
      loot: [
        { id: 0, chance: 30 },
        { id: '63e96737ecbb4c981ca98882', chance: 70 },
      ],
      name: 'Dzika Świnia3',
      health_points: 20,
      max_health_points: 20,
      level: 1,
      power: 10,
      image: '/monsters/cursed-pig-transparent.png',
      type: 'normal',
      damage: 33,
      isDisabled: player.data.healthPoints === 0,
    },
  ]

  let content
  switch (true) {
    case !hasQuest(Quest.NA_POCZATKU_BYLO_DRZEWO):
      content = <Quest01 />
      break
    default:
      content = (
        <>
          {enemyData.map((enemy, i) => {
            return (
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
                <Enemy fight={handleFight} {...enemy} />
              </motion.div>
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
      <Grid
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
        <Flex mt={'auto'} gap={10}>
          {content}
        </Flex>
      </Grid>
      {isOpen && enemy && (
        <Battle
          isBattleOpen={isOpen}
          playerData={player?.data}
          enemyData={enemy}
          onClose={onClose}
        />
      )}

      {/* <Modal
  size={'xl'}
  onClose={onClose}
  isOpen={isOpen}
  scrollBehavior='inside'
>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>FIGHT!</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <div>
        {battleLogs.map((log, i) => {
          // <Text fontSize='sm' pb={2}>
          // setTimeout(() => {}, 0)
          console.log('battleLogs', battleLogs)
          console.log('i', i)
          return i === battleLogs.length - 1 ? (
            <Heading mt={5}>{log}</Heading>
          ) : (
            <Text fontSize={'sm'} color={i % 2 === 0 ? 'green' : 'red'}>
              {log}
            </Text>
          )
        })}
      </div>
    </ModalBody>
    <ModalFooter>
      <Button onClick={onClose}>Close</Button>
    </ModalFooter>
  </ModalContent>
</Modal> */}
    </Box>
  ) : null
}

export default ForgottenForest
