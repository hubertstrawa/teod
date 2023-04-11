import Lottie from 'lottie-react'
import merchantNpc from './merchant-npc.json'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import {
//   useGetCurrentPlayerQuery,
//   useUpdateCurrentPlayerMutation,
// } from '../../src/features/player/playerApiSlice'
import {
  useGetCurrentPlayerQuery,
  useUpdateCurrentPlayerMutation,
} from '../../../features/player/playerApiSlice'
import { useStartQuestMutation } from '../../../features/questlog/questlogApiSlice'
import { Quest } from '../../../features/questlog/Quest'
import { Box, Grid, useToast, Button, Flex, Text } from '@chakra-ui/react'

const Quest01 = () => {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const toast = useToast()
  const { data: player } = useGetCurrentPlayerQuery()
  const [updatePlayer] = useUpdateCurrentPlayerMutation()
  const [updateQuestlog] = useStartQuestMutation()

  const isMale = (str) => {
    return str.split('-')[1].startsWith('m')
  }

  useEffect(() => {
    if (step === 2) {
      toast({
        title: 'Zdobyto ',
        description: '1x Skórzany pancerz',
        status: 'info',
        position: 'top-right',
      })
    }
  }, [step])
  const submitIntro = async () => {
    await updateQuestlog(Quest.NA_POCZATKU_BYLO_DRZEWO)
    router.push('/game/quests')
  }
  return (
    // <Authorized>'/images/inventory-bg2.png'

    <Flex flexDirection={{ base: 'column', lg: 'row' }} p={12} minH='100vh'>
      <Flex order={{ base: 1, lg: 0 }} flex={1}>
        <Lottie
          // style={{ width: '50%' }}
          animationData={merchantNpc}
          loop={true}
        />
      </Flex>
      <Flex
        flex={1}
        paddingLeft={{ base: '0', lg: 14 }}
        alignItems={'center'}
        dir={'column'}
      >
        <MotionConfig
          transition={
            {
              // x: { type: 'spring', stiffness: 100 },
              // duration: 0.3,
            }
          }
        >
          {step === 1 && (
            <AnimatePresence>
              <Box
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                as={motion.div}
                bgColor='rgba(45,55,72, 0.75)'
                padding={{ base: 6, lg: 10 }}
                position='relative'
                borderRadius={20}
                border={'5px solid #f7f7f7'}
              >
                <Text marginBottom={2} color={'gray.400'} align={'left'}>
                  Albert:
                </Text>
                <Text
                  marginBottom={10}
                  align={'justify'}
                  lineHeight={1.6}
                  fontSize={{ base: 'xl', lg: '2xl' }}
                >
                  O, jednak się{' '}
                  {isMale(player?.data?.avatar) ? 'obudziłeś' : 'obudziłaś'}
                  .. Szkoda. Z drugiej strony - wyglądasz jak wyschnięta
                  jaszczurka, podziomek pewnie by Cię nie tknął.
                </Text>
                <Button onClick={() => setStep(step + 1)} width={'100%'}>
                  Gdzie jestem?
                </Button>
              </Box>
            </AnimatePresence>
          )}
          {step === 2 && (
            <AnimatePresence>
              <Box
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                as={motion.div}
                width='full'
                bgColor='rgba(45,55,72, 0.75)'
                padding={{ base: 6, lg: 10 }}
                position='relative'
                borderRadius={20}
                border={'5px solid #f7f7f7'}
              >
                <Text
                  marginBottom={2}
                  color={'gray.400'}
                  align={'left'}
                  fontFamily='heading'
                >
                  Albert:
                </Text>
                <Text
                  marginBottom={10}
                  align={'justify'}
                  lineHeight={1.6}
                  fontSize={{ base: 'xl', lg: '2xl' }}
                >
                  Rozejrzyj się, na początku było drzewo.
                </Text>
                <Button onClick={() => setStep(step + 1)} width={'100%'}>
                  A co jest teraz?
                </Button>
              </Box>
            </AnimatePresence>
          )}
          {step === 3 && (
            <AnimatePresence>
              <Box
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                as={motion.div}
                bgColor='rgba(45,55,72, 0.75)'
                width='full'
                padding={{ base: 6, lg: 10 }}
                position='relative'
                borderRadius={20}
                border={'5px solid #f7f7f7'}
              >
                <Text
                  fontFamily='heading'
                  marginBottom={2}
                  color={'gray.400'}
                  align={'left'}
                >
                  Albert:
                </Text>
                <Text
                  marginBottom={10}
                  align={'justify'}
                  lineHeight={1.6}
                  fontSize={{ base: 'xl', lg: '2xl' }}
                >
                  Więcej drzew. A co ma być? Gówno jest. Straciliśmy wszystko.
                </Text>
                <Button onClick={() => setStep(step + 1)} width={'100%'}>
                  Kim jesteś.. co ja tu robię?
                </Button>
              </Box>
            </AnimatePresence>
          )}
          {step === 4 && (
            <AnimatePresence>
              <Box
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                as={motion.div}
                bgColor='rgba(45,55,72, 0.75)'
                padding={{ base: 6, lg: 10 }}
                position='relative'
                borderRadius={20}
                border={'5px solid #f7f7f7'}
              >
                <Text
                  marginBottom={2}
                  color={'gray.400'}
                  align={'left'}
                  fontFamily='heading'
                >
                  Albert:
                </Text>
                <Text
                  marginBottom={10}
                  align={'justify'}
                  lineHeight={1.6}
                  fontSize={{ base: 'xl', lg: '2xl' }}
                >
                  Nie czas na to. Jam schorowany a podziomek głodny.. Sukinsyn
                  zjadł kolejne dziecko z namiotu. Kilka kawałków mięsa powinno
                  mu wystarczyć. Idź już i przynieś mi 3 kawałki surowego mięsa.
                </Text>
                <Button onClick={submitIntro} width={'100%'}>
                  Dalej
                </Button>
              </Box>
            </AnimatePresence>
          )}
        </MotionConfig>
      </Flex>
    </Flex>
    // </Authorized>
  )
}

export default Quest01
