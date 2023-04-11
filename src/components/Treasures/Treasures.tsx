import Inventory from '../Inventory/Inventory'
import { RootState } from '../../store'
import { useSelector, useDispatch } from 'react-redux'
import woodenBg from '../assets/woodenbg.png'
import PlayerBadge from '../PlayerBadge'
import Cash from '../../icons/Cash'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import {
  Accordion,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Stack,
  Flex,
  Heading,
  Box,
  Grid,
} from '@chakra-ui/react'

import SpellBox from '../SpellBox'
import { GiTreasureMap, GiFairyWand } from 'react-icons/gi'
import { useGetQuestlogQuery } from '../../features/questlog/questlogApiSlice'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'
import IntroTutorial from '../Tutorial/IntroTutorial'
import SearchTreasures from './SearchTreasures'
const Treasures = () => {
  const { data: questlog, isLoading } = useGetQuestlogQuery()
  const { data: player } = useGetCurrentPlayerQuery()

  console.log(' QUESTLOG QUEST', questlog)

  return !!questlog && !!player ? (
    <Box
      backgroundImage={'/images/inventory-bg2.png'}
      backgroundSize='100%'
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'center'}
      textAlign='center'
      fontSize='xl'
      maxHeight={'100vh'}
    >
      <Box
        maxW='full'
        backgroundColor={'rgba(12,12,12, 0.85)'}
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
          <GiTreasureMap style={{ marginRight: '10px' }} />
          Poszukiwania skarbów
        </Heading>
        <Tabs marginTop={4} colorScheme={'teal'} variant='line'>
          <TabList marginBottom={4}>
            <Tab paddingY={3}>
              <Heading fontSize='xl'>Przeszukuj teren</Heading>
            </Tab>
            <Tab isDisabled paddingY={3}>
              <Heading fontSize='xl'>Łup do zdobycia</Heading>
            </Tab>
            {/* <Tab paddingY={3}>
              <Heading fontSize='xl'>Odpoczynek</Heading>
            </Tab> */}
          </TabList>
          <TabPanels>
            <TabPanel>
              <SearchTreasures />
            </TabPanel>
            <TabPanel>2</TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <IntroTutorial shouldBeVisible={player?.data?.tutorial === 3} />
    </Box>
  ) : null
}

export default Treasures
