import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Image,
  Text,
  Flex,
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'
import {
  useFinishJobMutation,
  useGetCurrentPlayerQuery,
  useStartJobMutation,
  useCloseJobMutation,
} from '../../features/player/playerApiSlice'
import { useCountdown } from '../../hooks/useCountdown'
import treasureAnimation from './treasure-animation.json'

const SearchTreasures = () => {
  const [startJob, { data: dataStartJob }] = useStartJobMutation()
  const [finishJob, { data: dataFinishJob }] = useFinishJobMutation()
  const [closeJob] = useCloseJobMutation()

  const { data: player } = useGetCurrentPlayerQuery()
  const [days, hours, minutes, seconds] = useCountdown(
    new Date(player.data?.activeJob?.timeEnd)
  )

  const [isJobDone, setIsJobDone] = useState(null)

  let intt

  // useEffect(() => {
  //   if (player.data?.activeJob && dateNow !== 0) {
  //     intt = setInterval(() => {
  //       setDateNow(new Date(new Date().toUTCString()).getTime())
  //     }, 2000)

  //     console.log('dateNow', dateNow)
  //     console.log(
  //       'new Date(player.data?.activeJob?.timeEnd).getTime()',
  //       new Date(player.data?.activeJob?.timeEnd).getTime()
  //     )

  //     if (dateNow > new Date(player.data?.activeJob?.timeEnd).getTime()) {
  // console.log('SEND REQ')
  // finishJob('forgotten-forest')
  //       setDateNow(0)
  //       clearInterval(intt)
  //     }

  //     console.log(
  //       'hours',
  //       new Date(player.data?.activeJob?.timeEnd).toUTCString()
  //     )
  //   }
  // }, [player.data, dateNow])

  const getFinishJob = async () => {
    if (!isJobDone && !!player.data.activeJob) {
      const data = await finishJob('forgotten-forest').unwrap()
      setIsJobDone(data.item)
    }
  }

  const closeJobHandler = async () => {
    closeJob()
  }

  console.log('PLAYER.DATA.ACTIVEJOB', player.data.activeJob)

  useEffect(() => {
    console.log('MINUTES', minutes)
    console.log('SECONDS', seconds)
    console.log('HOURS', hours)

    if (!!player.data.activeJob && days + hours + minutes + seconds <= 0) {
      console.log('SEND REQ')
      getFinishJob()
    }
  }, [hours, minutes, seconds])

  useEffect(() => {
    console.log('DATAFINISHJOB', dataFinishJob)
  }, [dataFinishJob])

  console.log('isJOB', isJobDone)

  const onClickHandle = (name) => {
    startJob(name)
  }
  return (
    <Box>
      {/* <Button onClick={() => finishJob('forgotten-forest')}>finish</Button> */}
      {!isJobDone ? (
        <Box>
          {!!player.data.activeJob ? (
            <Box>
              <Alert
                display='flex'
                flexDirection='column'
                variant='subtle'
                status='info'
              >
                <Heading paddingTop={10} textAlign={'center'}>
                  Poszukiwania skarbów w trakcie...
                </Heading>
                {/* <Text>Datwnow: {dateNow}</Text>
            <Text>
              Pozostało: {new Date(player.data?.activeJob?.timeEnd).getTime()}
            </Text>
            <Text>
              Datwnow:{' '}
              {new Date(player.data?.activeJob?.timeEnd).getTime() - dateNow}
            </Text> */}
                {!isNaN(hours || minutes || seconds) && (
                  <Heading color='teal.100' marginTop={4} fontSize='2xl'>
                    Pozostały czas: {hours}h {minutes}m {seconds}s
                  </Heading>
                )}

                {/* <AlertIcon /> */}
                <Lottie
                  animationData={treasureAnimation}
                  style={{ width: '300px' }}
                />
                <Button
                  variant='outline'
                  position='absolute'
                  bottom={5}
                  right={5}
                  onClick={closeJobHandler}
                >
                  Przerwij poszukiwania
                </Button>
              </Alert>
              {/* <Flex flexDirection={'column'}>
            <Text>
              Start: {new Date(player.data.activeJob.timeStart).getTime()}
            </Text>
            <Text>
              End: {new Date(player.data.activeJob.timeEnd).getTime()}
            </Text>
            <Text>NOW: {dateNow}</Text>
            <Text>
              ==:{' '}
              {dateNow > new Date(player.data.activeJob.timeEnd).getTime()
                ? 'data now wieksza'
                : 'data now mniejsza'}
            </Text>
            <Button onClick={() => finishJob('forgotten-forest')}>
              finish
            </Button>
          </Flex> */}
            </Box>
          ) : (
            <AnimatePresence>
              <Card
                as={motion.div}
                initial={{
                  opacity: 0,
                  y: 50,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                direction={{ base: 'column', sm: 'row' }}
                overflow='hidden'
                variant='outline'
                bgImage={'/images/dark-forest.png'}
                bgPos={'center'}
                // bgSize={'cover'}
                marginBottom={10}
              >
                <Stack width='full' bgColor='rgba(0,0,0, 0.75)'>
                  <CardBody>
                    <Heading color='gray.100' textAlign={'left'} size='md'>
                      Przeszukuj teren:{' '}
                      <span style={{ fontWeight: 'bold' }}>Zapomniany las</span>
                    </Heading>

                    <Text
                      color='gray.300'
                      textAlign={'left'}
                      fontSize='lg'
                      py='2'
                    >
                      Możliwość zdobycia ekwipunku, ksiąg z czarami, mikstur i
                      pożywienia. Poszukiwania regenerują także zdrowie, manę i
                      energię.
                    </Text>
                    <Text
                      fontFamily='heading'
                      textAlign={'left'}
                      fontSize='zl'
                      py='2'
                      fontWeight={'bold'}
                    >
                      Czas trwania: 4 godz
                    </Text>
                  </CardBody>

                  <CardFooter>
                    <Button
                      onClick={() => onClickHandle('forgotten-forest')}
                      variant='outline'
                      colorScheme='teal'
                    >
                      Rozpocznij poszukiwania
                    </Button>
                  </CardFooter>
                </Stack>
              </Card>
            </AnimatePresence>
          )}
        </Box>
      ) : (
        <Box>
          <Heading>
            <Alert status='success'>
              <AlertIcon /> Zakończono poszukiwania
            </Alert>
          </Heading>
          <Flex flexDirection={'column'} alignItems={'center'}>
            <Heading marginTop={8}>Zdobyto:</Heading>
            {isJobDone.name}
            <Image marginTop={2} src={isJobDone.image} width='100px' />
            <Button
              marginTop={10}
              size='lg'
              onClick={() => setIsJobDone(false)}
            >
              WRÓĆ
            </Button>
          </Flex>
        </Box>
      )}
    </Box>
  )
}

export default SearchTreasures

// const Locations = () => {
//   const router = useRouter()
//   const { data, isLoading } = useGetCurrentPlayerQuery()
//   return (
//     <Box
//       // backgroundImage={'/images/inventory-bg2.png'}
//       backgroundSize='100%'
//       backgroundRepeat={'no-repeat'}
//       backgroundPosition={'center'}
//       textAlign='center'
//       fontSize='xl'
//       height='100vh'
//     >
//       <SimpleGrid
//         maxW='full'
//         backgroundColor={'rgba(12,12,12, 0.85)'}
//         margin='0 auto'
//         p={12}
//         minH='100vh'
//         position={'relative'}
//       >
//         <PlayerBadge />

//         <AnimatePresence>
//           <Card
//             as={motion.div}
//             initial={{
//               opacity: 0,
//               y: 50,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             direction={{ base: 'column', sm: 'row' }}
//             overflow='hidden'
//             variant='outline'
//             bgImage={'/images/dark-forest.png'}
//             bgPos={'center'}
//             bgSize={'cover'}
//             marginBottom={10}
//           >
//             <Stack>
//               <CardBody>
//                 <Heading textAlign={'left'} size='md'>
//                   Zapomniany las
//                 </Heading>

//                 <Text fontSize='lg' py='2'>
//                   Zalecany poziom: 1-15
//                 </Text>
//               </CardBody>

//               <CardFooter>
//                 <Button variant='solid' colorScheme='blue' padding={0}>
//                   <Link
//                     style={{
//                       height: '40px',
//                       padding: '0 16px',
//                       display: 'flex',
//                       alignItems: 'center',
//                     }}
//                     href='/game/explore/forgotten-forest'
//                   >
//                     Przejdź do lokacji
//                   </Link>
//                 </Button>
//               </CardFooter>
//             </Stack>
//           </Card>
//         </AnimatePresence>
//         <AnimatePresence>
//           <Card
//             as={motion.div}
//             initial={{
//               opacity: 0,
//               y: 50,
//             }}
//             animate={{
//               opacity: 1,
//               y: 0,
//             }}
//             direction={{ base: 'column', sm: 'row' }}
//             overflow='hidden'
//             variant='outline'
//             bgImage={'/images/royal-ruins.png'}
//             bgPos={'bottom'}
//             bgSize={'cover'}
//             bgRepeat='no-repeat'
//             marginBottom={10}
//           >
//             <Stack>
//               <CardBody>
//                 <Flex alignItems={'center'}>
//                   <Heading marginRight={2} textAlign={'left'} size='md'>
//                     Królewskie ruiny
//                   </Heading>
//                   <GiPadlock />
//                 </Flex>
//                 <Text fontSize='lg' py='2'>
//                   Zalecany poziom: 15-30
//                 </Text>
//               </CardBody>

//               <CardFooter>
//                 <Button
//                   isDisabled
//                   variant='solid'
//                   colorScheme='blue'
//                   padding={0}
//                 >
//                   <Link
//                     style={{
//                       height: '40px',
//                       padding: '0 16px',
//                       display: 'flex',
//                       alignItems: 'center',
//                     }}
//                     href='/game/explore'
//                   >
//                     Przejdź do lokacji
//                   </Link>
//                 </Button>
//               </CardFooter>
//             </Stack>
//           </Card>
//         </AnimatePresence>
//       </SimpleGrid>
//       <IntroTutorial shouldBeVisible={data?.data?.tutorial === 2} />
//     </Box>
//   )
// }

// export default Locations
