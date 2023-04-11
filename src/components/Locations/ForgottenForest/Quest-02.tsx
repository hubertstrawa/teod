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

const Quest02 = () => {
  const [step, setStep] = useState(1)
  const router = useRouter()
  const toast = useToast()
  const [updatePlayer] = useUpdateCurrentPlayerMutation()
  const [startQuest] = useStartQuestMutation()

  const submitIntro = async () => {
    await startQuest(Quest.PRZEKLĘTE_WIEWIÓRKI)
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
                  Prawdę mówiąc myślałem, że polegniesz w boju i podziomek
                  będzie miał prawdziwą ucztę. Skoro jednak Ci się udało..
                  Szykuję boski napar, ale wataha cholernych wiewiórek skradła
                  jeden pojemnik z Yajé. Dasz rade go odzyskać?
                </Text>
                <Button onClick={submitIntro} width={'100%'}>
                  Sprobuję
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
                  Rozejrzyj się, tu niczego nie ma. *spogląda na boki z
                  uśmiechniętą miną* - Zgrywam się tylko. Na początku było
                  drzewo.
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
                  Więcej drzew. A co ma być? Gówno jest. Moonlit pogrążony w
                  płaczu, królestwo zajęte, mamy tylko miecze, zioła i wino.
                  Skąd się wziąłeś?
                </Text>
                <Button onClick={() => setStep(step + 1)} width={'100%'}>
                  Nie pamiętam
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
                <Text marginBottom={2} color={'gray.400'} align={'left'}>
                  Albert:
                </Text>
                <Text
                  marginBottom={10}
                  align={'justify'}
                  lineHeight={1.6}
                  fontSize={{ base: 'xl', lg: '2xl' }}
                >
                  {/* Kamienie z nowej ery mogłyby załatać, ale - *zbliża się do
                    Ciebie delikatnie obwąchując* - groszem nie śmierdzisz.  */}
                  Co mam z Tobą zrobić, bastardzie? Umiesz upolować wilczura?
                  Jam obłożony słabością, a mój podziomek głodny.. *kręci głową*
                  - sukinsyn zjadł kolejne dziecko z namiotu. Kilka kawałków
                  mięsa powinno mu wystarczyć, na dzisiaj. Idź już i przynieś mi
                  5 kawałków surowego mięsa.
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

export default Quest02
