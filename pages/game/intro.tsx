const IntroPage = () => {
  return null
}

export default IntroPage
// import Authorized from '../../src/components/Authorized'
// import Lottie from 'lottie-react'
// import merchantNpc from './merchant-npc.json'
// import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import {
//   useGetCurrentPlayerQuery,
//   useUpdateCurrentPlayerMutation,
// } from '../../src/features/player/playerApiSlice'
// import { Box, Grid, useToast, Button, Flex, Text } from '@chakra-ui/react'

// const IntroPage = () => {
//   const [step, setStep] = useState(1)
//   const router = useRouter()
//   const toast = useToast()
//   const [updatePlayer] = useUpdateCurrentPlayerMutation()
//   useEffect(() => {
//     if (step === 2) {
//       toast({
//         title: 'Zdobyto ',
//         description: '1x Szmaciana kurtka',
//         status: 'info',
//         position: 'top-right',
//       })
//     }
//   }, [step])
//   const submitIntro = () => {
//     // updatePlayer({ tutorial: 1 })
//     router.push('/game')
//   }
//   return (
//     // <Authorized>'/images/inventory-bg2.png'
//     <Box
//       backgroundImage={'/images/dark-forest.png'}
//       backgroundSize='100%'
//       backgroundRepeat={'no-repeat'}
//       backgroundPosition={'bottom'}
//       textAlign='center'
//       fontSize='xl'
//     >
//       <Flex
//         // maxW='full'
//         backgroundColor={'rgba(12,12,12, 0.85)'}
//         // margin='0 auto'
//         // backgroundSize={'100%'}
//         // backgroundPosition={'bottom'}
//         backgroundAttachment={'fixed'}
//         p={12}
//         minH='100vh'
//         // position={'relative'}
//       >
//         <Box flex={1}>
//           <Lottie
//             // style={{ width: '50%' }}
//             animationData={merchantNpc}
//             loop={true}
//           />
//         </Box>
//         <Flex flex={1} paddingLeft={14} alignItems={'center'} dir={'column'}>
//           <MotionConfig
//             transition={
//               {
//                 // x: { type: 'spring', stiffness: 100 },
//                 // duration: 0.3,
//               }
//             }
//           >
//             {step === 1 && (
//               <AnimatePresence>
//                 <Box
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0 }}
//                   as={motion.div}
//                   bgColor='rgba(45,55,72, 0.5)'
//                   padding={10}
//                   position='relative'
//                   borderRadius={20}
//                   border={'5px solid #f7f7f7'}
//                 >
//                   <Text marginBottom={2} color={'gray.400'} align={'left'}>
//                     Albert:
//                   </Text>
//                   <Text
//                     marginBottom={10}
//                     align={'justify'}
//                     lineHeight={1.6}
//                     fontSize={'2xl'}
//                   >
//                     O, bastard jednak ??yje, obudzi??e?? si??.. *drapie si?? po
//                     czole* - szkoda. Z drugiej strony -{' '}
//                     <span style={{ color: 'gray' }}>
//                       *przygl??da si?? z irytacj??*{' '}
//                     </span>
//                     - wygl??dasz jak wyschni??ta jaszczurka, podziomek pewnie by
//                     Ci?? nie tkn????. W?????? te szmaty, nie mog?? na Ciebie patrze??.
//                   </Text>
//                   <Button onClick={() => setStep(step + 1)} width={'100%'}>
//                     Gdzie jestem?
//                   </Button>
//                 </Box>
//               </AnimatePresence>
//             )}
//             {step === 2 && (
//               <AnimatePresence>
//                 <Box
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0 }}
//                   as={motion.div}
//                   bgColor='rgba(45,55,72, 0.5)'
//                   padding={10}
//                   position='relative'
//                   borderRadius={20}
//                   border={'5px solid #f7f7f7'}
//                 >
//                   <Text marginBottom={2} color={'gray.400'} align={'left'}>
//                     Albert:
//                   </Text>
//                   <Text
//                     marginBottom={10}
//                     align={'justify'}
//                     lineHeight={1.6}
//                     fontSize={'2xl'}
//                   >
//                     Rozejrzyj si??, tu niczego nie ma. *spogl??da na boki z
//                     u??miechni??t?? min??* - Zgrywam si?? tylko. Na pocz??tku by??o
//                     drzewo.
//                   </Text>
//                   <Button onClick={() => setStep(step + 1)} width={'100%'}>
//                     A co jest teraz?
//                   </Button>
//                 </Box>
//               </AnimatePresence>
//             )}
//             {step === 3 && (
//               <AnimatePresence>
//                 <Box
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0 }}
//                   as={motion.div}
//                   bgColor='rgba(45,55,72, 0.5)'
//                   padding={10}
//                   position='relative'
//                   borderRadius={20}
//                   border={'5px solid #f7f7f7'}
//                 >
//                   <Text marginBottom={2} color={'gray.400'} align={'left'}>
//                     Albert:
//                   </Text>
//                   <Text
//                     marginBottom={10}
//                     align={'justify'}
//                     lineHeight={1.6}
//                     fontSize={'2xl'}
//                   >
//                     Wi??cej drzew. A co ma by??? G??wno jest. Moonlit pogr????ony w
//                     p??aczu, kr??lestwo zaj??te, mamy tylko miecze, zio??a i wino.
//                     Sk??d si?? wzi????e???
//                   </Text>
//                   <Button onClick={() => setStep(step + 1)} width={'100%'}>
//                     Nie pami??tam
//                   </Button>
//                 </Box>
//               </AnimatePresence>
//             )}
//             {step === 4 && (
//               <AnimatePresence>
//                 <Box
//                   initial={{ scale: 0 }}
//                   animate={{ scale: 1 }}
//                   exit={{ scale: 0 }}
//                   as={motion.div}
//                   bgColor='rgba(45,55,72, 0.5)'
//                   padding={10}
//                   position='relative'
//                   borderRadius={20}
//                   border={'5px solid #f7f7f7'}
//                 >
//                   <Text marginBottom={2} color={'gray.400'} align={'left'}>
//                     Albert:
//                   </Text>
//                   <Text
//                     marginBottom={10}
//                     align={'justify'}
//                     lineHeight={1.6}
//                     fontSize={'2xl'}
//                   >
//                     {/* Kamienie z nowej ery mog??yby za??ata??, ale - *zbli??a si????do
//                     Ciebie delikatnie obw??chuj??c* - groszem nie ??mierdzisz.  */}
//                     Co mam z Tob?? zrobi??, bastardzie? Umiesz upolowa?? wilczura?
//                     Jam ob??o??ony s??abo??ci??, a m??j podziomek g??odny.. *kr??ci
//                     g??ow??* - sukinsyn zjad?? kolejne dziecko z namiotu. Kilka
//                     kawa??k??w mi??sa powinno mu wystarczy??, na dzisiaj. Id?? ju?? i
//                     przynie?? mi 5 kawa??k??w surowego mi??sa.
//                   </Text>
//                   <Button onClick={submitIntro} width={'100%'}>
//                     Dalej
//                   </Button>
//                 </Box>
//               </AnimatePresence>
//             )}
//           </MotionConfig>
//         </Flex>
//       </Flex>
//     </Box>
//     // </Authorized>
//   )
// }

// export default IntroPage
