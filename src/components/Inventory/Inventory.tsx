// @ts-nocheck
import { Flex, Heading, useBreakpointValue } from '@chakra-ui/react'
import {
  useGetInventoryQuery,
  useEatFoodMutation,
  useEquipItemMutation,
  useUnequipItemMutation,
} from '../../features/inventory/inventoryApiSlice'

import { useEffect, useState } from 'react'
import Statistics from '../Statistics'
import InventoryItems from './InventoryItems'
import InventoryEq from './InventoryEq'
import { AnimatePresence, motion } from 'framer-motion'

const getInitialInventoryState = () => {
  return {
    all: Array.from({ length: 35 }, (_, i) => {
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
  const [eatFood] = useEatFoodMutation()
  const [equipItem] = useEquipItemMutation()
  const [unequipItem] = useUnequipItemMutation()

  const [inventory, setInventory] = useState(getInitialInventoryState)
  const itemsCountInventory = inventory.all.reduce((acc, curr) => {
    return Object.keys(curr?.item).length > 0 ? acc + 1 : acc
  }, 0)

  console.log('invenDB', inventoryDB)

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
    unequipItem({
      itemToUnequip: itemToUnequip,
    })
  }

  const equip = (item: any) => {
    const itemFromArgument = inventory.all.find(
      (i) => i.position === item.position
    )

    equipItem({
      itemToEquip: itemFromArgument.item,
      index: inventory.all.indexOf(itemFromArgument),
    })
  }

  const eat = (item: any) => {
    const indexItemToRemoveFromInv = inventory.all.find(
      (e) => e.position === item.position
    )

    eatFood({
      itemToConsume: item.item,
      index: inventory.all.indexOf(indexItemToRemoveFromInv),
    })
  }

  return (
    <>
      <Flex
        padding={useBreakpointValue({ base: 0, md: 10 })}
        flexDirection={{ base: 'column', lg: 'row' }}
        justifyContent={'space-between'}
      >
        <Flex
          marginTop={10}
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
          <Heading
            position={'relative'}
            _after={{
              content: "''",
              width: 'full',
              height: useBreakpointValue({ base: '20%', md: '50%' }),
              position: 'absolute',
              bottom: 1,
              left: 0,
              bgGradient: 'linear(to-t, gray.700, gray.900)',
              // bg: 'gray.700',
              zIndex: -1,
            }}
            marginBottom={14}
            alignSelf={'flex-start'}
            letterSpacing='2px'
          >
            Ekwipunek
          </Heading>
          <InventoryEq inventory={inventory} unEquip={unEquip} />
          {/* <Statistics eq={inventoryDB?.eq} /> */}
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
