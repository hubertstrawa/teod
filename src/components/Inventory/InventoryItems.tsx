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
  PopoverFooter,
} from '@chakra-ui/react'
import { GiLightBackpack } from 'react-icons/gi'
import { useGetInventoryQuery } from '../../features/inventory/inventoryApiSlice'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'
import arrowAnimation from './arrow-animation.json'
import Lottie from 'lottie-react'
import Cash from '../../icons/Cash'
import styles from './Inventory.module.css'
import IntroTutorial from '../Tutorial/IntroTutorial'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from '../Loader'

const InventoryItems = ({ inventory, itemsCountInventory, eat, equip }) => {
  console.log('inventory', inventory)
  const { data: player, isLoading } = useGetCurrentPlayerQuery()

  return isLoading ? (
    <Spinner size='xl' />
  ) : (
    <motion.div
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
        // flex={1}
        // as={motion.div}
        gridTemplateColumns={'repeat(7, 70px)'}
        gridTemplateRows={'repeat(5, 70px)'}
        // boxShadow={'inset 0 0 10px #000'}
        // boxShadow={'inset 0 0 10px #000'}
        borderRadius={10}
        gridGap={3}
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
        >
          <Heading
            display='flex'
            letterSpacing={'1px'}
            alignItems='center'
            fontSize={'2xl'}
          >
            Plecak
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
          return Object.keys(invItem.item).length > 0 ? (
            <GridItem
              background='rgba(0,0,0, 0.3)'
              // border='2px solid #654321'
              width='70px'
              height='70px'
            >
              {/* FOR TUTORIAL ONLY */}
              {player?.data?.tutorial === 4 &&
                invItem.item._id === '640e04be6a185fc05a969e2a' && (
                  <div style={{ position: 'relative' }}>
                    <Lottie
                      style={{
                        position: 'absolute',
                        top: '-100px',
                        left: '-25px',
                        transform: 'rotate(-5deg)',
                        width: 100,
                      }}
                      animationData={arrowAnimation}
                    />
                  </div>
                )}
              <Popover>
                <PopoverTrigger>
                  <Box
                    className={styles.box}
                    padding={2}
                    style={{
                      width: '100%',
                      height: '100%',
                      margin: '0',
                      border: '2px solid gray',
                    }}
                  >
                    <img
                      style={{ width: '100%', height: '100%' }}
                      src={invItem.item.image}
                      alt={invItem.item.name}
                    />
                  </Box>
                </PopoverTrigger>
                <PopoverContent maxWidth='250px' bgColor='rgba(0,0,0, 0.9)'>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader marginBottom={2} fontSize='medium'>
                    {invItem.item.name}
                    {invItem.item.type !== 'eat' && (
                      <Text fontSize='small' fontWeight='bold'>
                        (atk: {invItem.item.attack} {','} def:{' '}
                        {invItem.item.defense} )
                      </Text>
                    )}
                  </PopoverHeader>
                  <PopoverBody>
                    <Text mb={2} fontSize='small'>
                      {invItem.item.description}
                    </Text>
                    {/* check if item can be equipped */}
                  </PopoverBody>

                  <PopoverFooter marginTop={5}>
                    {Object.keys(inventory.eq).includes(invItem.item.type) &&
                      equip && (
                        <Flex justifyContent={'space-between'}>
                          <Button
                            variant='outline'
                            colorScheme={'teal'}
                            onClick={() => equip(invItem)}
                          >
                            Załóz
                          </Button>
                          <Flex alignItems={'center'}>
                            <Text>100</Text>
                            <Cash style={{ marginLeft: '3px' }} />
                          </Flex>
                        </Flex>
                      )}
                    {invItem.item.type === 'eat' && eat && (
                      <Flex justifyContent={'space-between'}>
                        <Button
                          colorScheme={'teal'}
                          variant={'outline'}
                          onClick={() => eat(invItem)}
                        >
                          Uzyj
                        </Button>
                        <Flex alignItems={'center'}>
                          <Text>{invItem.item.value}</Text>
                          <Cash style={{ marginLeft: '3px' }} />
                        </Flex>
                      </Flex>
                    )}
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            </GridItem>
          ) : (
            <GridItem
              border='2px solid gray'
              background='rgba(0,0,0, 0.3)'
              width='70px'
              height='70px'
            ></GridItem>
          )
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
