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
  useDisclosure,
} from '@chakra-ui/react'
import Dialogue from './Dialogue'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '../features/player/playerApiSlice'
import woodenBg from 'images/woodenbg.png'
import Enemy from './Enemy'
import PlayerBadge from './PlayerBadge'
import CharacterNPC from './CharacterNPC'

const Home = () => {
  const [enemy, setEnemy] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isOpenDialogue,
    onOpen: onOpenDialogue,
    onClose: onCloseDialogue,
  } = useDisclosure()

  const { data, isLoading } = useGetCurrentPlayerQuery()

  console.log('DATA', data)

  const handleFight = (enemy: any) => {
    setEnemy(enemy)
    onOpen()
  }

  const handleTalk = (npc: any) => {
    onOpenDialogue()
  }

  if (isLoading) return <h1>LOADING</h1>

  return (
    <Box
      backgroundImage='images/woodenbg.png'
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
        <PlayerBadge player={data} />
        <Flex mt={'auto'} gap={10}>
          <CharacterNPC
            talk={handleTalk}
            name='Wildheart'
            level={10}
            image={'/images/shaman.png'}
          />
          <Enemy
            fight={handleFight}
            experience={40}
            maxMoney={12}
            loot={[
              { id: 0, chance: 30 },
              { id: '63e96737ecbb4c981ca98882', chance: 70 },
            ]}
            name='Ice Wolf'
            health_points={50}
            max_health_points={50}
            level={2}
            power={10}
            image={'images/wolf.png'}
            type='normal'
            damage={33}
          />
          <Enemy
            fight={handleFight}
            name='Super Wolf'
            health_points={80}
            max_health_points={80}
            level={3}
            power={10}
            image={'images/wolf.png'}
            type='normal'
          />
          <Enemy
            fight={handleFight}
            name='Weirdo'
            health_points={100}
            max_health_points={100}
            level={3}
            power={10}
            image={'images/dragon.png'}
            type='fire'
          />
          {/* <Enemy
            fight={handleFight}
            name='Little Demon'
            health_points={200}
            max_health_points={200}
            level={5}
            power={50}
            image={'images/dragon.png'}
            type='fire'
          /> */}
        </Flex>
      </Grid>
      {isOpen && enemy && (
        <Battle
          isBattleOpen={isOpen}
          playerData={data?.data}
          enemyData={enemy}
          onClose={onClose}
        />
      )}
      {true && (
        <Dialogue
          isDialogueOpen={isOpenDialogue}
          onDialogueClose={onCloseDialogue}
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
  )
}

export default Home
