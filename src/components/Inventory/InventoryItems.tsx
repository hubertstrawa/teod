import {
  Text,
  Popover,
  Button,
  PopoverTrigger,
  Box,
  Flex,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Spinner,
  Grid,
  Heading,
  GridItem,
  Skeleton,
  PopoverCloseButton,
  useDisclosure,
  PopoverFooter,
} from '@chakra-ui/react'
import { useOutsideClick } from '@chakra-ui/react'
import { useRef } from 'react'
import { GiLightBackpack } from 'react-icons/gi'
import { useGetInventoryQuery } from '../../features/inventory/inventoryApiSlice'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'
import arrowAnimation from './arrow-animation.json'
import Lottie from 'lottie-react'
import Cash from '../../icons/Cash'
import InventoryItem from './InventoryItem'
import styles from './Inventory.module.css'
import IntroTutorial from '../Tutorial/IntroTutorial'
import { AnimatePresence, motion } from 'framer-motion'
import { GiBattleAxe, GiBorderedShield } from 'react-icons/gi'

import Loader from '../Loader'

const InventoryItems = ({ inventory, itemsCountInventory, eat, equip }) => {
  console.log('inventory', inventory)
  const { data: player, isLoading } = useGetCurrentPlayerQuery()

  return isLoading ? (
    <Spinner size='xl' />
  ) : (
    <motion.div
      style={{ flex: 1, maxWidth: '700px' }}
      transition={{
        type: 'spring',
        damping: 10,
        mass: 0.75,
        stiffness: 100,
      }}
      initial={{
        opacity: 0,
        y: 50,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
    >
      <Grid
        // as={motion.div}
        // gridTemplateColumns={'repeat(7, 70px)'}
        gridTemplateColumns={'repeat(auto-fill, minmax(72px, 1fr))'}
        // gridTemplateRows={'repeat(5, 70px)'}
        // boxShadow={'inset 0 0 10px #000'}
        // maxWidth={'650px'}
        // width='100%'
        // width='100%'
        // boxShadow={'inset 0 0 10px #000'}
        borderRadius={10}
        gridGap={2}
        bgGradient='linear(to-l, gray.700, gray.800)'
        // bgGradient='linear(to-b, rgba(0,0,0, 0.7), rgba(50,50,50, 0.7))'
        padding={8}
        // bgColor={'gray.800'}
      >
        {/* {!!itemsCountInventory && ( */}
        <GridItem
          gridColumn={'1/-1'}
          display='flex'
          justifyContent={'space-between'}
          alignItems='center'
          marginBottom={6}
        >
          <Heading
            display='flex'
            letterSpacing={'1px'}
            alignItems='center'
            fontSize={'2xl'}
          >
            Twój plecak
          </Heading>

          <Text align={'right'} fontSize={14}>
            Pojemność:{' '}
            <strong>
              {itemsCountInventory}/{inventory.all.length}
            </strong>
          </Text>
        </GridItem>
        {/* )} */}
        {inventory.all.map((invItem) => {
          return (
            <InventoryItem
              invItem={invItem}
              equip={equip}
              eat={eat}
              eq={inventory.eq}
            />
          )
          // const { onOpen, onClose, isOpen } = useDisclosure()
          // const popoverRef = useRef()
          // useOutsideClick({
          //   ref: popoverRef,
          //   handler: () => onClose(),
          // })

          // return Object.keys(invItem.item).length > 0 ? (
          //   <GridItem
          //     // background='rgba(0,0,0, 0.3)'
          //     // border='2px solid #654321'
          //     width='80px'
          //     height='80px'
          //   >
          //     {/* FOR TUTORIAL ONLY */}
          //     {player?.data?.tutorial === 4 &&
          //       invItem.item._id === '640e04be6a185fc05a969e2a' && (
          //         <div style={{ position: 'relative' }}>
          //           <Lottie
          //             style={{
          //               position: 'absolute',
          //               top: '-100px',
          //               left: '-25px',
          //               transform: 'rotate(-5deg)',
          //               width: 100,
          //             }}
          //             animationData={arrowAnimation}
          //           />
          //         </div>
          //       )}
          //     <Popover isOpen={isOpen} onOpen={onOpen}>
          //       <PopoverTrigger>
          //         <Box
          //           className={styles.box}
          //           padding={3}
          //           // bgColor='#2b3345'
          //           // bgGradient='linear(to-b, #2e2019, rgba(0,0,0, 0.5))'
          //           bgGradient={`${
          //             (invItem.item.state === 'rare' &&
          //               'linear(to-b, teal.900, gray.800)') ||
          //             'none'
          //           }`}
          //           style={{
          //             width: '100%',
          //             height: '100%',
          //             margin: '0',
          //             borderRadius: '8px',
          //             // border: '2px solid rgba(0,0,0, 0.9)',
          //             boxShadow: 'inset rgba(0, 0, 0, 0.5) 0px 5px 15px',
          //           }}
          //         >
          //           <img
          //             style={{ width: '100%', height: '100%' }}
          //             src={invItem.item.image}
          //             alt={invItem.item.name}
          //           />
          //         </Box>
          //       </PopoverTrigger>
          //       <PopoverContent
          //         bgColor='#2e2019'
          //         bgGradient='linear(to-b, #2e2019, rgba(0,0,0, 0.5))'
          //         maxWidth='250px'
          //         // border='none'
          //         boxShadow={'rgba(0, 0, 0, 0.7) 0px 5px 15px'}
          //       >
          //         <PopoverArrow />
          //         <PopoverCloseButton onClick={onClose} />
          //         <PopoverHeader
          //           fontFamily='heading'
          //           marginBottom={2}
          //           fontSize='medium'
          //         >
          //           {invItem.item.name}
          //           {invItem.item.state === 'rare' && (
          //             <Text color='teal.300' fontWeight='bold' fontSize='sm'>
          //               * rzadki *
          //             </Text>
          //           )}
          //           {invItem.item.type !== 'eat' &&
          //             invItem.item.type !== 'quest' && (
          //               <Box
          //                 marginTop={1}
          //                 marginBottom={2}
          //                 display='flex'
          //                 justifyContent={'center'}
          //                 alignItems={'center'}
          //                 fontSize='md'
          //               >
          //                 <GiBattleAxe style={{ marginRight: '4px' }} />
          //                 <Text marginRight={3} fontSize='md' fontWeight='bold'>
          //                   {invItem.item.attack}
          //                 </Text>
          //                 <GiBorderedShield style={{ marginRight: '4px' }} />
          //                 <Text fontSize='md' fontWeight='bold'>
          //                   {invItem.item.defense}
          //                 </Text>
          //               </Box>
          //             )}
          //           {Object.keys(invItem.item.attributes).map((attr) => {
          //             return invItem.item.attributes[attr] !== 0 ? (
          //               <Heading marginTop={2} color='teal.100' fontSize='md'>
          //                 + {invItem.item.attributes[attr]}{' '}
          //                 {attr === 'vitality' && 'Witalność'}
          //               </Heading>
          //             ) : null
          //           })}
          //         </PopoverHeader>
          //         <PopoverBody>
          //           <Text mb={1} fontSize='small'>
          //             {invItem.item.description}
          //           </Text>

          //           {/* check if item can be equipped */}
          //         </PopoverBody>

          //         <PopoverFooter marginTop={4}>
          //           {Object.keys(inventory.eq).includes(invItem.item.type) &&
          //             equip && (
          //               <Flex justifyContent={'space-between'}>
          //                 <Button
          //                   onClick={() => {
          //                     equip(invItem)
          //                     onClose()
          //                   }}
          //                 >
          //                   Załóż
          //                 </Button>
          //                 <Flex alignItems={'center'}>
          //                   <Text>100</Text>
          //                   <Cash style={{ marginLeft: '3px' }} />
          //                 </Flex>
          //               </Flex>
          //             )}
          //           {invItem.item.type === 'eat' && eat && (
          //             <Flex justifyContent={'space-between'}>
          //               <Button
          //                 onClick={() => {
          //                   eat(invItem)
          //                   onClose()
          //                 }}
          //               >
          //                 Użyj
          //               </Button>
          //               <Flex alignItems={'center'}>
          //                 <Text>{invItem.item.value}</Text>
          //                 <Cash style={{ marginLeft: '3px' }} />
          //               </Flex>
          //             </Flex>
          //           )}
          //           {invItem.item.type === 'quest' && eat && (
          //             <Flex justifyContent={'flex-end'} alignItems={'center'}>
          //               <Text>{invItem.item.value}</Text>
          //               <Cash style={{ marginLeft: '3px' }} />
          //             </Flex>
          //           )}
          //         </PopoverFooter>
          //       </PopoverContent>
          //     </Popover>
          //   </GridItem>
          // ) : (
          //   <GridItem
          //     boxShadow={'inset rgba(0, 0, 0, 0.5) 0px 5px 15px'}
          //     // width='100%'
          //     // height='100%'
          //     borderRadius={'8px'}
          //     width='80px'
          //     height='80px'
          //   ></GridItem>
          // )
        })}
        <IntroTutorial
          shouldBeVisible={
            player?.data?.tutorial === 4 &&
            inventory?.eq?.armor?._id === '640e04be6a185fc05a969e2a'
          }
        />
      </Grid>
    </motion.div>
  )
}

export default InventoryItems
