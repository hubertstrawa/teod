import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  Text,
  Image,
  Flex,
} from '@chakra-ui/react'
import {
  useUpdateCurrentPlayerMutation,
  useGetCurrentPlayerQuery,
} from '../../features/player/playerApiSlice'

import { useRef } from 'react'
import { useRouter } from 'next/router'

const IntroTutorial = ({ shouldBeVisible }) => {
  const [updatePlayer] = useUpdateCurrentPlayerMutation()
  const { data: player, isLoading } = useGetCurrentPlayerQuery()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()
  const router = useRouter()

  const next = () => {
    updatePlayer({
      tutorial: player?.data?.tutorial !== 4 ? player?.data?.tutorial + 1 : 0,
    })
    if (player.data.tutorial === 1) {
      router.push('/game/explore')
    }
    if (player.data.tutorial === 2) {
      router.push('/game/explore/forgotten-forest')
    }
    if (player.data.tutorial === 3) {
      router.push('/game/equipment')
    }
  }

  return !isLoading && !!player.data.tutorial ? (
    <>
      <Drawer
        isOpen={shouldBeVisible}
        // size='sm'
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        closeOnOverlayClick={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          <DrawerHeader
            display='flex'
            justifyContent={'space-between'}
            alignItems='center'
          >
            <Text>Początki bywają trudne</Text>
            <Text fontSize={'sm'}>{player?.data?.tutorial}/4</Text>
          </DrawerHeader>

          {player?.data?.tutorial === 1 && (
            <DrawerBody>
              <Flex height={'100%'} direction={'column'}>
                <Text marginBottom={2}>
                  Witaj, {player?.data?.playerName}. Nazywam się Helperra i dam
                  Ci kilka wskazówek na początek przygody z TEOD.{' '}
                </Text>
                <Text>
                  Aby zacząć przejdź do zakładki{' '}
                  <span style={{ fontWeight: 'bold' }}>Eksploracja</span>.
                  Znajdziesz tam lokacje, które mozesz odwiedzić. Niektóre z
                  nich odblokują się automatycznie po osiągnięciu konkretnego
                  poziomu, niektóre odblokujesz po zakończeniu konkretnego
                  zadania lub po opłaceniu przepustki.
                </Text>
                <Button onClick={next} marginTop='auto' colorScheme='blue'>
                  Dalej
                </Button>
              </Flex>
            </DrawerBody>
          )}

          {player?.data?.tutorial === 2 && (
            <DrawerBody>
              <Flex height={'100%'} direction={'column'}>
                <Text marginBottom={2}>
                  W kazdej lokacji znajdziesz potwory, które posiadają moc
                  zywiołów takie jak{' '}
                  <span style={{ fontWeight: 'bold' }}>
                    ataki fizyczne, elektryczne, ogniste i wodne
                  </span>
                  . Przed walką wybieraj ekwipunek lub czary z danego zywiolu,
                  aby zadawać jak największe obrazenia przeciwnikowi.
                </Text>
                <Text>
                  Aby rozpocząć pierwszą misję przejdź do lokacji{' '}
                  <span style={{ fontWeight: 'bold' }}>Zapomniany las</span> i
                  porozmawiaj z Albertem.
                </Text>
                <Button onClick={next} marginTop='auto' colorScheme='blue'>
                  Dalej
                </Button>
              </Flex>
            </DrawerBody>
          )}

          {player?.data?.tutorial === 3 && (
            <DrawerBody>
              <Flex height={'100%'} direction={'column'}>
                <Text marginBottom={2}>
                  W zakładce <span style={{ fontWeight: 'bold' }}>Zadania</span>{' '}
                  znajdziesz aktywne oraz zakończone zadania.
                </Text>
                <Text>
                  Czas upolować kilka świń, aby podziomek Alberta nie zjadł
                  kolejnego dziecka, ale najpierw przejdź do zakładki{' '}
                  <span style={{ fontWeight: 'bold' }}>Ekwipunek</span> i załóz
                  kurtkę. Aby załozyć przedmiot kliknij na niego i wybierz opcję
                  załóz.
                </Text>
                <Button onClick={next} marginTop='auto' colorScheme='blue'>
                  Dalej
                </Button>
              </Flex>
            </DrawerBody>
          )}

          {player?.data?.tutorial === 4 && (
            <DrawerBody>
              <Flex height={'100%'} direction={'column'}>
                <Text marginBottom={2}>
                  No i pięknie. Teraz musisz radzić sobie sam. Przejdź do
                  zakładki{' '}
                  <span style={{ fontWeight: 'bold' }}>Eksploracja</span> i
                  wybierz{' '}
                  <span style={{ fontWeight: 'bold' }}>Zapomniany las</span>.
                </Text>
                <Text marginBottom={2}>
                  Znajdziesz tam świnie, z których zdobędziesz mięso dla
                  Alberta.
                </Text>
                <Text fontWeight={'bold'}>
                  Udanej przygody, {player?.data?.playerName}!
                </Text>
                <Button onClick={next} marginTop='auto' colorScheme='blue'>
                  Zakończ tutorial
                </Button>
              </Flex>
            </DrawerBody>
          )}
          <DrawerFooter>
            <Image src={'/characters/helpero.png'} />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  ) : null
}

export default IntroTutorial
