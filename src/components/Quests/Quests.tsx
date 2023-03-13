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
  Box,
  Grid,
} from '@chakra-ui/react'

import ActiveQuests from './ActiveQuests'
import { useGetQuestlogQuery } from '../../features/questlog/questlogApiSlice'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'
import IntroTutorial from '../Tutorial/IntroTutorial'

const Quests = () => {
  const { data: questlog, isLoading } = useGetQuestlogQuery()
  const { data: player } = useGetCurrentPlayerQuery()

  console.log(' QUESTLOG QUEST', questlog)

  return (
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
        <Tabs marginTop={16} size='md' variant='enclosed'>
          <TabList>
            <Tab>Aktywne questy</Tab>
            <Tab>Zakończone questy</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ActiveQuests questlog={questlog} />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <IntroTutorial shouldBeVisible={player?.data?.tutorial === 3} />
    </Box>
  )
}

export default Quests
