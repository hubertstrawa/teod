import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Button,
  Avatar,
  Td,
  TableCaption,
  Flex,
  Heading,
  Box,
  TableContainer,
} from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import woodenBg from '../assets/woodenbg.png'
import PlayerBadge from './PlayerBadge'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { GiTrophyCup } from 'react-icons/gi'
import { useGetPlayersHighscoresQuery } from '../features/player/playerApiSlice'
const Highscores = () => {
  const { data: players } = useGetPlayersHighscoresQuery()
  return !!players ? (
    <Box
      backgroundImage={'/images/background.png'}
      backgroundSize='100%'
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'center'}
      textAlign='center'
      fontSize='xl'
      maxHeight={'100vh'}
    >
      <Box
        maxW='full'
        backgroundColor={'rgba(12,12,12, 0.92)'}
        margin='0 auto'
        p={12}
        minH='100vh'
        position={'relative'}
      >
        <PlayerBadge />
        <Heading
          display='flex'
          justifyContent={'center'}
          alignItems='center'
          marginTop={10}
        >
          <GiTrophyCup style={{ marginRight: '10px' }} />
          Ranking
        </Heading>
        <TableContainer padding={4} marginTop={8}>
          <Table size='sm' variant='simple'>
            {/* <TableCaption>TEOD 2023</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Nazwa gracza</Th>
                <Th>Poziom</Th>
                <Th>Gildia</Th>
                <Th>Siła</Th>
                <Th>Inteligencja</Th>
                <Th>Poziom czarów</Th>
                <Th>Szczegóły</Th>
              </Tr>
            </Thead>
            <Tbody>
              {players?.data?.map((player) => {
                console.log('player', player)
                const spellsLevel = player.spells.reduce((acc, curr) => {
                  return acc + curr.spellLevel
                }, 0)
                return (
                  <Tr>
                    <Td>
                      <Flex alignItems={'center'}>
                        <Avatar
                          size={'sm'}
                          bgColor={'gray.900'}
                          src={player.avatar}
                          marginRight={4}
                        />
                        {player.playerName}
                      </Flex>
                    </Td>
                    <Td>{player.level}</Td>
                    <Td>-</Td>
                    <Td>{player.attributes.strength}</Td>
                    <Td paddingLeft={12}>{player.attributes.intelligence}</Td>
                    <Td paddingLeft={14}>{spellsLevel}</Td>
                    {/* <Td>{player.createdAt.slice(0, 10)}</Td> */}
                    <Td>
                      <Button width='full' variant='outline' isDisabled>
                        Zobacz profil
                      </Button>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  ) : null
}

export default Highscores

// import Inventory from '../Inventory/Inventory'
// import { RootState } from '../../store'
// import { useSelector, useDispatch } from 'react-redux'
// import woodenBg from '../assets/woodenbg.png'
// import PlayerBadge from '../PlayerBadge'
// import Cash from '../../icons/Cash'
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

// import {
//   Accordion,
//   Text,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Stack,
//   Flex,
//   Heading,
//   Box,
//   Grid,
// } from '@chakra-ui/react'

// import SpellBox from '../SpellBox'
// import { GiMagickTrick, GiFairyWand } from 'react-icons/gi'
// import { useGetQuestlogQuery } from '../../features/questlog/questlogApiSlice'
// import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'
// import IntroTutorial from '../Tutorial/IntroTutorial'

// const Spells = () => {
//   const { data: questlog, isLoading } = useGetQuestlogQuery()
//   const { data: player } = useGetCurrentPlayerQuery()

//   console.log(' QUESTLOG QUEST', questlog)

//   return !!questlog && !!player ? (

//   ) : null
// }

// export default Spells
