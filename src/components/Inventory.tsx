// @ts-nocheck
import {
  Image,
  Text,
  Tooltip,
  Popover,
  Button,
  PopoverTrigger,
  Flex,
  Divider,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Container,
  Box,
  Grid,
  GridItem,
  useDisclosure,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react'
import styles from './Inventory.module.css'
import Cash from '../icons/Cash'
import {
  useGetInventoryQuery,
  useUpdateInventoryMutation,
  useUpdateCurrentPlayerMutation,
} from '../features/player/playerApiSlice'
import { useEffect, useState } from 'react'
import Statistics from './Statistics'

const handleConsumeFood = (item: any, updatePlayerFn: () => void) => {
  if (item.item_id === 3) {
    updatePlayerFn({ health_points: 100 })
  }
}

const Inventory = ({ data }: any) => {
  const { refetch, isLoading, data: inventoryDB } = useGetInventoryQuery()
  const [
    updateInventoryDB,
    { isLoading: isLoadingInventory, error: isErrorInventory },
  ] = useUpdateInventoryMutation()
  const [updatePlayerDB, { isLoading: isLoadingPlayer, error: isErrorPlayer }] =
    useUpdateCurrentPlayerMutation()

  const backpack = {
    name: 'Zwykły plecak',
    type: 'bag',
    image: '/items/BAGS/BAG 1.png',
    stats: null,
  }
  const sword1 = {
    name: 'Sword zwykły',
    type: 'weapon',
    image: '/items/SWORDS/SWORD 1.png',
    stats: {
      damage: 10,
    },
  }
  const sword2 = {
    name: 'Sword Lepszy',
    type: 'weapon',
    image: '/items/SWORDS/SWORD 2.png',
    stats: {
      damage: 20,
    },
  }
  const armor1 = {
    name: 'Armor 1',
    type: 'armor',
    image: '/items/ARMORS/ARMOR 1.png',
    stats: {
      def: 10,
    },
  }

  const armor2 = {
    name: 'Armor 2',
    type: 'armor',
    image: '/items/ARMORS/ARMOR 2.png',
    stats: {
      def: 20,
    },
  }

  const [inventory, setInventory] = useState({
    all: Array.from({ length: 36 }, (_, i) => {
      return {
        position: i + 1,
        item: {},
      }
    }),
    eq: {
      amulet: null,
      helmet: null,
      bag: backpack,
      weapon: null,
      armor: null,
      shield: null,
      belt: null,
      boots: null,
      ring: null,
    },
  })
  const itemsCountInventory = inventory.all.reduce((acc, curr) => {
    return Object.keys(curr?.item).length > 0 ? acc + 1 : acc
  }, 0)

  useEffect(() => {
    if (inventoryDB) {
      const allItems = inventory.all.map((el, i) => {
        // console.log('el', el, i)
        return {
          position: el.position,
          item: inventoryDB.all[i] ?? {},
        }
      })
      console.log('allItems', allItems)

      setInventory({
        all: allItems,
        eq: inventoryDB.eq,
      })
    }
  }, [inventoryDB])

  const { onOpen, onClose, isOpen } = useDisclosure()

  const addItemToInventory = (itemToAdd, unEquip = false) => {
    const emptyItemInInventory = inventory.all.find(
      (i) => Object.keys(i.item).length === 0
    )

    if (!!emptyItemInInventory) {
      const indexToUpdate = inventory.all.indexOf(emptyItemInInventory)
      // console.log('INDEXTOUPDATE', indexToUpdate)
      const updatedInventory = inventory.all.map((item, i) => {
        return i !== indexToUpdate
          ? item
          : {
              position: item.position,
              item: itemToAdd,
            }
      })
      const inventoryIds = updatedInventory
        .map((el) => el.item.item_id)
        .filter(Boolean)

      updateInventoryDB({
        itemToRemove: unEquip ? itemToAdd : null,
        allInventoryIds: inventoryIds,
      })

      setInventory({
        eq: {
          ...inventory.eq,
          [itemToAdd.type]: null,
        },
        all: updatedInventory,
      })
    }
  }

  // console.log('inventory', inventory.all.length)

  const unEquip = (item: any) => {
    console.log('ITEMMM', item)
    addItemToInventory(item, true)
  }

  const equip = (item: any) => {
    if (inventory.eq[item.item.type]) {
      console.log('item in eq', inventory.eq[item.item.type])
      const itemFromArgument = inventory.all.find(
        (i) => i.position === item.position
      )
      console.log(
        'ALL MAP',
        inventory.all.map((el) => el.item.item_id).filter(Boolean)
      )

      const newItemIdsInventory = inventory.all.indexOf(
        (el) => el.item_id === itemFromArgument.item_id
      )

      // .map((el) => el.item.item_id)
      // .filter(Boolean)

      // updateInventoryDB({
      //   item: itemFromArgument.item,
      //   currentItem: inventory.eq[item.item.type],
      //   allInventoryIds: newItemIdsInventory,
      // })
      console.log('inventory.eq', newItemIdsInventory)

      const inventoryAll = inventory.all.map((e, i) => {
        return i === inventory.all.indexOf(itemFromArgument)
          ? {
              position: itemFromArgument.position,
              item: inventory.eq[item.item.type],
            }
          : e
      })

      const inventoryIds = inventoryAll
        .map((el) => el.item.item_id)
        .filter(Boolean)

      setInventory({
        all: inventoryAll,
        eq: {
          ...inventory.eq,
          [item.item.type]: item.item,
        },
      })

      updateInventoryDB({
        item: itemFromArgument.item,
        currentItem: inventory.eq[item.item.type],
        allInventoryIds: inventoryIds,
      })
    } else if (item.item.type === 'eat') {
      // handleConsumeFood(item.item, updatePlayerDB)
      if (item.item.item_id === 3) {
        updatePlayerDB({ health_points: 100, mana_points: 100, energy: 100 })
      }
      // console.log('ITEM ITEM ITEM', item.item)
      const indexItemToRemoveFromInv = inventory.all.find(
        (e) => e.position === item.position
      )
      console.log('indexItemToRemoveFromInv', indexItemToRemoveFromInv)

      const inventoryAll = inventory.all.map((e, i) => {
        return i === inventory.all.indexOf(indexItemToRemoveFromInv)
          ? { position: indexItemToRemoveFromInv.position, item: {} }
          : e
      })

      const inventoryIds = inventoryAll
        .map((el) => el.item.item_id)
        .filter(Boolean)

      console.log('OOOOOOOOO inventoryIds OOOOOOO', inventoryIds)

      console.log('OOOOOOOOO item.item OOOOOOO', item.item)
      setInventory({
        ...inventory,
        all: inventoryAll,
      })

      updateInventoryDB({
        allInventoryIds: inventoryIds,
      })
    } else {
      const indexItemToRemoveFromInv = inventory.all.find(
        (e) => e.position === item.position
      )
      console.log('indexItemToRemoveFromInv', indexItemToRemoveFromInv)

      const inventoryAll = inventory.all.map((e, i) => {
        return i === inventory.all.indexOf(indexItemToRemoveFromInv)
          ? { position: indexItemToRemoveFromInv.position, item: {} }
          : e
      })

      const inventoryIds = inventoryAll
        .map((el) => el.item.item_id)
        .filter(Boolean)

      console.log('OOOOOOOOO item.item OOOOOOO', item.item)
      setInventory({
        all: inventoryAll,
        eq: {
          ...inventory.eq,
          [item.item.type]: item.item,
        },
      })

      updateInventoryDB({
        item: item.item,
        allInventoryIds: inventoryIds,
      })
    }
    // console.log('equip item', item)
  }

  const handleEquipClick = (el) => {
    equip(el)
    onClose()
  }

  return (
    <>
      {/* <Flex>
        <button onClick={() => refetch()}>REFETCH==</button>
        <button onClick={() => addItemToInventory(sword1)}>Add sw1</button>
        <button onClick={() => addItemToInventory(sword2)}>Add sw2</button>
        <button onClick={() => addItemToInventory(armor1)}>Add arm1</button>
        <button onClick={() => addItemToInventory(armor2)}>Add arm2</button>
      </Flex> */}

      {/* <p>Items: 1 /{inventory.all.length}</p> */}

      <Flex padding={16} justifyContent={'space-between'}>
        <Flex flexDir={'column'}>
          <Grid
            // padding={10}
            // backgroundImage={'/images/eq-background.png'}
            backgroundSize={'100%'}
            backgroundPosition={'center'}
            templateAreas={`"a-1 a-2 a-3"
                        "b-1 b-2 b-3"
                        "c-1 c-2 c-3"`}
            gridTemplateRows={'repeat(3, 1fr)'}
            gridTemplateColumns={'repeat(3, 1fr)'}
            gap={8}
            // padding={4}
            // background='rgba(255,255,255,0.2)'
            // border='1px solid blue'
          >
            {Object.keys(inventory.eq).map((el) => {
              return inventory.eq[el] ? (
                <GridItem
                  // area={'a-1'}
                  border='2px solid #654321'
                  bgColor={'rgba(52,34,17, 0.5)'}
                  cursor='pointer'
                >
                  <Popover>
                    <PopoverTrigger height='100%' width='100%' margin='0'>
                      <img
                        style={{
                          width: '100%',
                          height: '100%',
                          padding: '1rem',
                        }}
                        src={inventory.eq[el].image}
                        alt={inventory.eq[el].name}
                      />
                      {/* <div
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
                          src={inv.item.image}
                          alt={inv.item.name}
                        />
                      </div> */}
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader fontSize='medium'>
                        {inventory.eq[el].name}
                        {inventory.eq[el].type !== 'eat' &&
                          inventory.eq[el].type !== 'bag' && (
                            <Text fontSize='small' fontWeight='bold'>
                              (atk: {inventory.eq[el].attack} {','} def:{' '}
                              {inventory.eq[el].defense} )
                            </Text>
                          )}
                      </PopoverHeader>
                      <PopoverBody>
                        <Text mb={2} fontSize='small'>
                          {inventory.eq[el].description}
                        </Text>

                        {/* <Button onClick={() => unEquip(inventory.eq[el])}>
                          Zdejmij
                        </Button> */}

                        <Flex justifyContent={'space-between'}>
                          <Button
                            isDisabled={inventory.eq[el].type === 'bag'}
                            onClick={() => unEquip(inventory.eq[el])}
                          >
                            Zdejmij
                          </Button>
                          <Flex alignItems={'center'}>
                            <Text>100</Text>
                            <Cash style={{ marginLeft: '3px' }} />
                          </Flex>
                        </Flex>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </GridItem>
              ) : (
                <GridItem
                  // area={'a-1'}
                  bgColor={'rgba(52,34,17, 0.8)'}
                  border='3px solid #654321'
                >
                  <img
                    src={`/items/armor-bg.png`}
                    style={{
                      opacity: '0.5',
                      padding: '1rem',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </GridItem>
              )
            })}
          </Grid>
          <Statistics eq={inventoryDB?.eq} />
          {/* <Box textAlign={'left'} mt={'auto'}>
            <Text>Statystyki</Text>
            <Box>Siła: 1</Box>
            <Box>Inteligencja: 1</Box>
            <Box>Witalność: 1</Box>
            <Box>Skupienie: 1</Box>
          </Box> */}
        </Flex>
        <Grid
          gridTemplateColumns={'repeat(6, 60px)'}
          gridTemplateRows={'repeat(6, 60px)'}
          boxShadow={'inset 0 0 10px #000'}
          // boxShadow={'inset 0 0 10px #000'}
          gridGap={2}
          padding={10}
          bgColor={'rgba(52,34,17, 0.8)'}
        >
          {/* <div className="item">
          <span style={{position: 'absolute'}}>{axe.name}</span>
          <img style={{ width: "100%", height: "100%" }} src={axe.image} />
        </div> */}
          <GridItem gridColumn={'1/-1'}>
            <Text align={'right'} fontSize={14}>
              Pojemność:{' '}
              <strong>
                {itemsCountInventory}/{inventory.all.length}
              </strong>
            </Text>
          </GridItem>
          {inventory.all.map((inv) => {
            return Object.keys(inv.item).length > 0 ? (
              <GridItem border='2px solid #654321' width='60px' height='60px'>
                <Popover>
                  <PopoverTrigger height='100%' width='100%' margin='0'>
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
                        src={inv.item.image}
                        alt={inv.item.name}
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontSize='medium'>
                      {inv.item.name}
                      {inv.item.type !== 'eat' && (
                        <Text fontSize='small' fontWeight='bold'>
                          (atk: {inv.item.attack} {','} def: {inv.item.defense}{' '}
                          )
                        </Text>
                      )}
                    </PopoverHeader>
                    <PopoverBody>
                      <Text mb={2} fontSize='small'>
                        {inv.item.description}
                      </Text>
                      {/* check if item can be equipped */}
                      {Object.keys(inventory.eq).includes(inv.item.type) && (
                        <Flex justifyContent={'space-between'}>
                          <Button onClick={() => handleEquipClick(inv)}>
                            Zaloz
                          </Button>
                          <Flex alignItems={'center'}>
                            <Text>100</Text>
                            <Cash style={{ marginLeft: '3px' }} />
                          </Flex>
                        </Flex>
                      )}
                      {inv.item.type === 'eat' && (
                        <Flex justifyContent={'space-between'}>
                          <Button onClick={() => handleEquipClick(inv)}>
                            Uzyj
                          </Button>
                          <Flex alignItems={'center'}>
                            <Text>100</Text>
                            <Cash style={{ marginLeft: '3px' }} />
                          </Flex>
                        </Flex>
                      )}
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
                {/* <span style={{ position: "absolute", fontSize: "0.8rem" }}>
                {item.item.name}
              </span> */}
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
    </>
  )
}

export default Inventory

// const inventory = [
//   {
//     itemId: 9,
//     name: 'Health Potion',
//     quantity: 1,
//     changes: { healthPoints: 20 },
//     image:
//       'https://images.squarespace-cdn.com/content/v1/61ec4f09f147fa223a75f88a/1654621526808-XKHD2WBU4OFLWQRNJNBH/Potion+small.png?format=1500w',
//   },
// ]

// const equipment = [
//   ...inventory,
//   ...Array(20 - inventory.length).fill({ image: '', quantity: null }),
// ]

// console.log('equpiment', equipment)

// return (
//   <div>
//     {/* {grid.map((i) => (
//       <div style={itemStyles}></div>
//     ))} */}
//     {equipment.map(({ image, name, quantity }) => (
// <Popover>
//   <PopoverTrigger>
//     <div className={styles.box}>
//       <span className={styles.quantity}>
//         {quantity && `x ${quantity}`}
//       </span>
//       <Image src={image} />
//     </div>
//   </PopoverTrigger>
//   <PopoverContent>
//     <PopoverArrow />
//     <PopoverCloseButton />
//     <PopoverHeader fontSize='medium'>{name}</PopoverHeader>
//     <PopoverBody>
//       <Button>Uzyj</Button>
//     </PopoverBody>
//   </PopoverContent>
// </Popover>
//     ))}
//   </div>
// )
