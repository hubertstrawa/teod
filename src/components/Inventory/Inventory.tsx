// @ts-nocheck
import { Flex } from '@chakra-ui/react'
import {
  useGetInventoryQuery,
  useUpdateInventoryMutation,
  useEatItemInventoryMutation,
} from '../../features/inventory/inventoryApiSlice'
import { useEffect, useState } from 'react'
import Statistics from '../Statistics'
import InventoryItems from './InventoryItems'
import InventoryEq from './InventoryEq'
import { AnimatePresence, motion } from 'framer-motion'

const getInitialInventoryState = () => {
  return {
    all: Array.from({ length: 36 }, (_, i) => {
      return {
        position: i + 1,
        item: {},
      }
    }),
    eq: {
      amulet: null,
      helmet: null,
      bag: null,
      weapon: null,
      armor: null,
      shield: null,
      belt: null,
      boots: null,
      ring: null,
    },
  }
}

const Inventory = ({ data }: any) => {
  const { data: inventoryDB } = useGetInventoryQuery()
  const [updateInventoryDB] = useUpdateInventoryMutation()

  const [eatInventoryDB] = useEatItemInventoryMutation()

  const [inventory, setInventory] = useState(getInitialInventoryState)
  const itemsCountInventory = inventory.all.reduce((acc, curr) => {
    return Object.keys(curr?.item).length > 0 ? acc + 1 : acc
  }, 0)

  useEffect(() => {
    if (inventoryDB) {
      const allItems = inventory.all.map((el, i) => {
        return {
          position: el.position,
          item: inventoryDB.all[i] ?? {},
        }
      })

      setInventory({
        all: allItems,
        eq: inventoryDB.eq,
      })
    }
  }, [inventoryDB])

  const unEquip = (itemToUnequip: any) => {
    const emptyItemInInventory = inventory.all.find(
      (i) => Object.keys(i.item).length === 0
    )

    if (!!emptyItemInInventory) {
      const indexToUpdate = inventory.all.indexOf(emptyItemInInventory)
      const updatedInventory = inventory.all.map((item, i) => {
        return i !== indexToUpdate
          ? item
          : {
              position: item.position,
              item: itemToUnequip,
            }
      })

      const inventoryIds = updatedInventory.reduce((acc, current) => {
        if (current.item._id) {
          return [...acc, current.item._id]
        }
        return acc
      }, [])

      updateInventoryDB({
        itemToRemove: itemToUnequip,
        allInventoryIds: inventoryIds,
      })

      setInventory({
        eq: {
          ...inventory.eq,
          [itemToUnequip.type]: null,
        },
        all: updatedInventory,
      })
    }
  }

  const equip = (item: any) => {
    const itemFromArgument = inventory.all.find(
      (i) => i.position === item.position
    )

    const inventoryAll = inventory.all.map((e, i) => {
      return i === inventory.all.indexOf(itemFromArgument)
        ? {
            position: itemFromArgument.position,
            item: inventory.eq[item.item.type] ?? {},
          }
        : e
    })

    const inventoryIds = inventoryAll.reduce((acc, current) => {
      if (current.item._id) {
        return [...acc, current.item._id]
      }
      return acc
    }, [])

    setInventory({
      all: inventoryAll,
      eq: {
        ...inventory.eq,
        [item.item.type]: item.item,
      },
    })

    updateInventoryDB({
      item: itemFromArgument.item,
      allInventoryIds: inventoryIds,
    })
  }

  const eat = (item: any) => {
    const indexItemToRemoveFromInv = inventory.all.find(
      (e) => e.position === item.position
    )

    const inventoryAll = inventory.all.map((e, i) => {
      return i === inventory.all.indexOf(indexItemToRemoveFromInv)
        ? { position: indexItemToRemoveFromInv.position, item: {} }
        : e
    })

    const inventoryIds = inventoryAll.reduce((acc, current) => {
      if (current.item._id) {
        return [...acc, current.item._id]
      }
      return acc
    }, [])

    setInventory({
      ...inventory,
      all: inventoryAll,
    })

    eatInventoryDB({
      itemToConsume: item.item,
      allInventoryIds: inventoryIds,
    })
  }

  return (
    <>
      <Flex padding={16} justifyContent={'space-between'}>
        <Flex
          as={motion.div}
          transition={{
            type: 'spring',
            damping: 10,
            mass: 0.75,
            stiffness: 100,
          }}
          initial={{
            opacity: 0,
            // y: 50,
          }}
          animate={{
            opacity: 1,
            // y: 0,
          }}
          flexDir={'column'}
        >
          <InventoryEq inventory={inventory} unEquip={unEquip} />
          <Statistics eq={inventoryDB?.eq} />
          {/* <Box textAlign={'left'} mt={'auto'}>
            <Text>Statystyki</Text>
            <Box>Siła: 1</Box>
            <Box>Inteligencja: 1</Box>
            <Box>Witalność: 1</Box>
            <Box>Skupienie: 1</Box>
          </Box> */}
        </Flex>
        <InventoryItems
          inventory={inventory}
          itemsCountInventory={itemsCountInventory}
          eat={eat}
          equip={equip}
        />
      </Flex>
    </>
  )
}

export default Inventory
