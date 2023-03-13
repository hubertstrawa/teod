import { useState, useEffect } from 'react'
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
  Grid,
  GridItem,
  PopoverCloseButton,
} from '@chakra-ui/react'
import styles from './Inventory.module.css'
import Cash from '../../icons/Cash'
import InventoryItems from './InventoryItems'
import {
  useGetInventoryQuery,
  useBuyItemTraderMutation,
} from '../../features/inventory/inventoryApiSlice'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'

const getInitialInventoryState = () => {
  // const inventoryEmpty = Array.from({ length: 36 }, (_, i) => {
  //   return {
  //     position: i + 1,
  //     item: {},
  //   }
  // })

  return {
    all: Array.from({ length: 36 }, (_, i) => {
      return {
        position: i + 1,
        item: {},
      }
    }),
  }
}

const itemsToSell = [
  {
    _id: '63e57825740c52afc3339dbf',
    name: 'Mała mikstura zdrowia',
    description: 'Dodaje 50HP',
    image: '/items/POTIONS/POTION 1.png',
    state: 'common',
    type: 'eat',
    value: 100,
  },
]

const InventoryShop = () => {
  const [inventory, setInventory] = useState(getInitialInventoryState) as any
  const [playerInventory, setPlayerInventory] = useState(
    getInitialInventoryState
  ) as any
  const [buyItemMutation] = useBuyItemTraderMutation()
  const { data: playerData } = useGetCurrentPlayerQuery()
  console.log('playerdata', playerData)

  const { data: playerInventoryDB, isLoading } = useGetInventoryQuery()
  useEffect(() => {
    if (true) {
      const allItems = inventory.all.map((el, i) => {
        return {
          position: el.position,
          item: itemsToSell[i] ?? {},
        }
      })

      setInventory({
        all: allItems,
      })
    }
  }, [])
  useEffect(() => {
    if (playerInventoryDB) {
      const allItems = inventory.all.map((el, i) => {
        return {
          position: el.position,
          item: playerInventoryDB.all[i] ?? {},
        }
      })

      setPlayerInventory({
        all: allItems,
      })
    }
  }, [playerInventoryDB])

  const buyItem = (item) => {
    buyItemMutation(item.item._id)
  }

  console.log('PLAYERINVENTORy', playerInventory)
  console.log('PLAYERINV type', typeof playerInventory)
  return (
    <Flex>
      <Grid
        gridTemplateColumns={'repeat(6, 60px)'}
        gridTemplateRows={'repeat(6, 60px)'}
        boxShadow={'inset 0 0 10px #000'}
        // boxShadow={'inset 0 0 10px #000'}
        gridGap={2}
        padding={10}
        bgColor={'rgba(52,34,17, 0.8)'}
      >
        <GridItem gridColumn={'1/-1'}>
          <Text align={'right'} fontSize={14}>
            Handlarz
          </Text>
        </GridItem>
        {inventory.all.map((invItem) => {
          return Object.keys(invItem.item).length > 0 ? (
            <GridItem border='2px solid #654321' width='60px' height='60px'>
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
                    <Flex justifyContent={'space-between'}>
                      <Button
                        isDisabled={playerData.data.money < invItem.item.value}
                        onClick={() => buyItem(invItem)}
                      >
                        Kup
                      </Button>
                      <Flex alignItems={'center'}>
                        <Text>100</Text>
                        <Cash style={{ marginLeft: '3px' }} />
                      </Flex>
                    </Flex>
                    {/* {invItem.item.type === 'eat' && (
                    <Flex justifyContent={'space-between'}>
                      <Button onClick={() => eat(invItem)}>Uzyj</Button>
                      <Flex alignItems={'center'}>
                        <Text>100</Text>
                        <Cash style={{ marginLeft: '3px' }} />
                      </Flex>
                    </Flex>
                  )} */}
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
      </Grid>
      {/* INVENTORY PLAYER */}
      <Grid
        gridTemplateColumns={'repeat(6, 60px)'}
        gridTemplateRows={'repeat(6, 60px)'}
        boxShadow={'inset 0 0 10px #000'}
        // boxShadow={'inset 0 0 10px #000'}
        gridGap={2}
        padding={10}
        bgColor={'rgba(52,34,17, 0.8)'}
      >
        {/* {itemsCountInventory && (
          <GridItem gridColumn={'1/-1'}>
            <Text align={'right'} fontSize={14}>
              Pojemność:{' '}
              <strong>
                {itemsCountInventory}/{inventory.all.length}
              </strong>
            </Text>
          </GridItem>
        )} */}
        {playerInventory.all.map((invItem) => {
          return Object.keys(invItem.item).length > 0 ? (
            <GridItem border='2px solid #654321' width='60px' height='60px'>
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
                    {/* {Object.keys(inventory.eq).includes(invItem.item.type) &&
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
                          <Text>100</Text>
                          <Cash style={{ marginLeft: '3px' }} />
                        </Flex>
                      </Flex>
                    )} */}
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
      </Grid>
    </Flex>
  )
}

export default InventoryShop
