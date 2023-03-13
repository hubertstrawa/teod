import {
  Text,
  Popover,
  Button,
  PopoverTrigger,
  Flex,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Spinner,
  Grid,
  GridItem,
  Skeleton,
  PopoverCloseButton,
} from '@chakra-ui/react'
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
        x: 50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
    >
      <Grid
        // as={motion.div}
        gridTemplateColumns={'repeat(6, 60px)'}
        gridTemplateRows={'repeat(6, 60px)'}
        boxShadow={'inset 0 0 10px #000'}
        // boxShadow={'inset 0 0 10px #000'}
        gridGap={2}
        padding={10}
        bgColor={'rgba(52,34,17, 0.8)'}
      >
        {/* {!!itemsCountInventory && ( */}
        <GridItem gridColumn={'1/-1'}>
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
            <GridItem border='2px solid #654321' width='60px' height='60px'>
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
                  <div
                    className={styles.box}
                    style={{
                      width: '100%',
                      height: '100%',
                      margin: '0',
                      border: '2px solid #654321',
                    }}
                  >
                    <img
                      // style={{ width: '100%', height: '100%' }}
                      src={invItem.item.image}
                      alt={invItem.item.name}
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader fontSize='medium'>
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
                    {Object.keys(inventory.eq).includes(invItem.item.type) &&
                      equip && (
                        <Flex justifyContent={'space-between'}>
                          <Button onClick={() => equip(invItem)}>Zaloz</Button>
                          <Flex alignItems={'center'}>
                            <Text>100</Text>
                            <Cash style={{ marginLeft: '3px' }} />
                          </Flex>
                        </Flex>
                      )}
                    {invItem.item.type === 'eat' && eat && (
                      <Flex justifyContent={'space-between'}>
                        <Button onClick={() => eat(invItem)}>Uzyj</Button>
                        <Flex alignItems={'center'}>
                          <Text>{invItem.item.value}</Text>
                          <Cash style={{ marginLeft: '3px' }} />
                        </Flex>
                      </Flex>
                    )}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </GridItem>
          ) : (
            <GridItem
              border='2px solid #654321'
              background='rgba(81, 54, 26, 0.3)'
              width='60px'
              height='60px'
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
