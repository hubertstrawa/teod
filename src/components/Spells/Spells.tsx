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
import { GiMagickTrick, GiFairyWand } from 'react-icons/gi'
import { useGetQuestlogQuery } from '../../features/questlog/questlogApiSlice'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'
import IntroTutorial from '../Tutorial/IntroTutorial'

const Spells = () => {
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
          <GiFairyWand style={{ marginRight: '10px' }} />
          Księga Czarów
        </Heading>
        <Tabs marginTop={4} colorScheme={'teal'} variant='line'>
          <TabList marginBottom={4}>
            <Tab paddingY={3}>
              <Heading fontSize='xl'>Nauczone zaklęcia</Heading>
            </Tab>
            <Tab isDisabled paddingY={3}>
              <Heading fontSize='xl'>Dostępne zaklęcia</Heading>
            </Tab>
            <Tab paddingY={3}>
              <Heading fontSize='xl'>Informacje</Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SpellBox player={player} />
            </TabPanel>
            <TabPanel>2</TabPanel>
            <TabPanel>
              <Flex flexDirection={'column'}>
                <Heading fontSize='3xl'>Nauka</Heading>
                <Text>
                  Aby nauczyć się nowego czaru musisz znaleźć księgę z danym
                  zaklęciem. Kazdy czar posiada poziom nauczenia, który wpływa
                  na zadawane obrażenia w przypadku czarów ofensywnych bądź siłę
                  uzdrowienia czy szansę na paraliż. Ponowne użycie księgi z
                  czarem zwiększy Twój poziom nauczenia o 1.
                </Text>
                <Text marginTop={10} color={'gray.600'}>
                  @TODO
                </Text>
              </Flex>
              {/* <Flex marginTop={10} flexDirection={'column'}>
                <Heading>Wrażliwość</Heading>
                <Text>Ogień - efektywny przeciwko wo</Text>
                <Text>Ogień - wrazliwy przeciwko woda</Text>
              </Flex> */}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <IntroTutorial shouldBeVisible={player?.data?.tutorial === 3} />
    </Box>
  ) : null
}

export default Spells
