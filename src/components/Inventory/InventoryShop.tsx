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
  Avatar,
  useDisclosure,
  Box,
  Heading,
  PopoverFooter,
  Image,
  useOutsideClick,
} from '@chakra-ui/react'
import styles from './Inventory.module.css'
import InventoryItem from './InventoryItem'
import Cash from '../../icons/Cash'
import InventoryItems from './InventoryItems'
import { useRef } from 'react'
import {
  GiBorderedShield,
  GiBattleAxe,
  GiLightBackpack,
  GiBackpack,
} from 'react-icons/gi'
import {
  useGetInventoryQuery,
  useBuyItemTraderMutation,
  useSellItemTraderMutation,
  useGetItemsSellQuery,
} from '../../features/inventory/inventoryApiSlice'
import formatNumber from '../../utils/formatNumber'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'

const getInitialInventoryState = () => {
  // const inventoryEmpty = Array.from({ length: 36 }, (_, i) => {
  //   return {
  //     position: i + 1,
  //     item: {},
  //   }
  // })

  return {
    all: Array.from({ length: 35 }, (_, i) => {
      return {
        position: i + 1,
        item: {},
      }
    }),
  }
}

// const itemsToSell = [
//   {
//     _id: '63e57825740c52afc3339dbf',
//     name: 'Mała mikstura zdrowia',
//     description: 'Dodaje 50HP',
//     image: '/items/POTIONS/POTION 1.png',
//     state: 'common',
//     type: 'eat',
//     value: 100,
//   },
// ]

const InventoryShop = () => {
  const [inventory, setInventory] = useState(getInitialInventoryState) as any
  const [playerInventory, setPlayerInventory] = useState(
    getInitialInventoryState
  ) as any
  const [buyItemMutation] = useBuyItemTraderMutation()
  const [sellItemMutation] = useSellItemTraderMutation()
  const { data: playerData } = useGetCurrentPlayerQuery()
  const { data: itemsToSell } = useGetItemsSellQuery()
  console.log('itemstosell', itemsToSell)
  const ref = useRef()
  console.log('playerdata', playerData)

  const { data: playerInventoryDB, isLoading } = useGetInventoryQuery()
  useEffect(() => {
    if (itemsToSell) {
      const allItems = inventory.all.map((el, i) => {
        return {
          position: el.position,
          item: itemsToSell?.data[i] ?? {},
        }
      })

      setInventory({
        all: allItems,
      })
    }
  }, [itemsToSell])
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

  const sellItem = (item) => {
    console.log('sellitem')
    sellItemMutation(item.item._id)
  }

  console.log('PLAYERINVENTORy', playerInventory)
  console.log('PLAYERINV type', typeof playerInventory)

  console.log('playerInventory', playerInventory)
  return (
    <Flex marginTop={'auto'} flexDirection='column'>
      {/* <Text>Handlarz</Text> */}

      <Flex
        justifyContent={'space-between'}
        flexDirection={{ base: 'column', xl: 'row' }}
        gap={14}
      >
        <Flex flex={1} flexDirection={'column'}>
          <Flex marginBottom={5}>
            <Avatar
              size={'xl'}
              bgColor={'gray.900'}
              src={'/characters/trader.png'}
              border={'2px solid #fff'}
            />
            <Box alignSelf='flex-end' textAlign={'left'} paddingLeft={5}>
              <Heading>Ernesto:</Heading>
              <Text fontSize='sm' width={9 / 10}>
                Wsród moich towarów znajdziesz najbardziej wykwintne buteleczki
                w całym Moonlit. Wszystko jest na sprzedaż.
              </Text>
            </Box>
          </Flex>
          <Grid
            gridTemplateColumns={'repeat(auto-fill, minmax(72px, 1fr))'}
            // gridTemplateColumns={'repeat(7, 60px)'}
            // gridTemplateRows={'repeat(5, 60px)'}
            // boxShadow={'inset 0 0 10px #000'}
            gridGap={2}
            flex={1}
            borderRadius={10}
            padding={8}
            bgColor={'rgba(52,34,17, 0.8)'}
          >
            {inventory.all.map((invItem) => {
              return <InventoryItem invItem={invItem} buyItem={buyItem} />
            })}
          </Grid>
        </Flex>
        {/* INVENTORY PLAYER */}
        <Flex flex={1} flexDirection='column'>
          <Flex marginBottom={5} justifyContent={'space-between'}>
            <Box textAlign={'left'} alignSelf='flex-end'>
              <Heading
                bgGradient='linear(to-r, gray.100, gray.300)'
                bgClip='text'
              >
                Sprzedaj
              </Heading>
              <Text alignSelf='flex-end' fontFamily='heading' fontSize={'md'}>
                Wartość u handlarza: <strong>70%</strong>
              </Text>
            </Box>
            <Flex alignItems={'center'}>
              <GiLightBackpack
                style={{
                  display: 'block',
                  fontSize: '60px',
                  marginRight: '10px',
                }}
              />

              <Avatar
                size={'xl'}
                bgColor={'gray.900'}
                src={playerData?.data?.avatar}
                border={'2px solid #fff'}
              />
            </Flex>
          </Flex>
          <Grid
            flex={1}
            gridTemplateColumns={'repeat(auto-fill, minmax(72px, 1fr))'}
            borderRadius={10}
            gridGap={2}
            bgGradient='linear(to-l, gray.700, gray.800)'
            padding={8}
          >
            {playerInventory.all.map((invItem) => {
              return <InventoryItem invItem={invItem} sellItem={sellItem} />
            })}
          </Grid>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default InventoryShop
