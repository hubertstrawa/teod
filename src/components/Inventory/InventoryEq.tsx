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
  Image,
  Grid,
  GridItem,
  PopoverFooter,
  Box,
  Heading,
  PopoverCloseButton,
  useDisclosure,
  useOutsideClick,
  Spinner,
} from '@chakra-ui/react'
import { useRef } from 'react'
import { GiBattleAxe, GiBorderedShield, GiClick } from 'react-icons/gi'
import { AnimatePresence, motion } from 'framer-motion'

import Cash from '../../icons/Cash'
const InventoryEq = ({
  inventory,
  unEquip,
  eqPlayerAttack,
  eqPlayerDefense,
}) => {
  console.log('inventory', inventory)
  return !!inventory ? (
    <Box maxWidth='450px' marginRight={{ base: 0, xl: 20 }}>
      <Grid
        // padding={10}
        // border={'1px solid red'}
        // backgroundImage={'/images/eq-background.png'}
        backgroundSize={'100%'}
        backgroundPosition={'center'}
        // padding={12}
        templateAreas={`"a-1 a-2 a-3"
            "b-1 b-2 b-3"
            "c-1 c-2 c-3"`}
        // gridTemplateRows={'repeat(3, 120px)'}
        // gridTemplateColumns={'repeat(3, 120px)'}
        gap={8}
        // padding={4}
        // background='rgba(255,255,255,0.2)'
        // border='1px solid blue'
      >
        {Object.keys(inventory.eq).map((el) => {
          // console.log('INV EQ', inventory.eq)

          const { onOpen, onClose, isOpen } = useDisclosure()
          const popoverRef = useRef()
          useOutsideClick({
            ref: popoverRef,
            handler: () => onClose(),
          })
          return inventory.eq[el] ? (
            <GridItem
              // area={'a-1'}
              border='2px solid gray'
              borderRadius={10}
              // bgGradient='linear(to-b, rgba(0,0,0, 0.7), rgba(50,50,50, 0.7))'
              // bgGradient='linear(to-b, #323, gray.800)'
              bgColor='gray.900'
              boxShadow={'inset #241b11 2px 20px 50px'}
              // bgColor={'rgba(52,34,17, 0.5)'}
              cursor='pointer'
            >
              <Popover isOpen={isOpen} onOpen={onOpen}>
                <PopoverTrigger>
                  <Image
                    onMouseEnter={() => onOpen()}
                    onClick={() => unEquip(inventory.eq[el])}
                    onMouseLeave={() => onClose()}
                    cursor={'pointer'}
                    style={{
                      width: '100%',
                      height: '100%',
                      padding: '1rem',
                    }}
                    // boxShadow={'dark-lg'}
                    src={inventory.eq[el].image}
                    alt={inventory.eq[el].name}
                    borderRadius={10}
                    bgGradient={`${
                      (inventory.eq[el].state === 'rare' &&
                        'linear(to-b, teal.900, gray.800)') ||
                      'none'
                    }`}
                  />
                </PopoverTrigger>
                <PopoverContent
                  bgColor='#2e2019'
                  bgGradient='linear(to-b, #2e2019, rgba(0,0,0, 0.5))'
                  maxWidth='250px'
                  // border='none'
                  boxShadow={'rgba(0, 0, 0, 0.7) 0px 5px 15px'}
                >
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader
                    fontFamily='heading'
                    marginBottom={2}
                    fontSize='medium'
                  >
                    {inventory.eq[el].name}
                    {inventory.eq[el].state === 'rare' && (
                      <Text color='teal.300' fontWeight='bold' fontSize='sm'>
                        * rzadki *
                      </Text>
                    )}
                    {inventory.eq[el].type !== 'eat' &&
                      inventory.eq[el].type !== 'quest' &&
                      inventory.eq[el].type !== 'bag' && (
                        <Box
                          marginTop={1}
                          marginBottom={2}
                          display='flex'
                          justifyContent={'center'}
                          alignItems={'center'}
                          fontSize='md'
                        >
                          <GiBattleAxe style={{ marginRight: '4px' }} />
                          <Text marginRight={3} fontSize='md' fontWeight='bold'>
                            {inventory.eq[el].attack}
                          </Text>
                          <GiBorderedShield style={{ marginRight: '4px' }} />
                          <Text fontSize='md' fontWeight='bold'>
                            {inventory.eq[el].defense}
                          </Text>
                        </Box>
                      )}
                    {inventory?.eq[el]?.attributes
                      ? Object.keys(inventory.eq[el].attributes).map((attr) => {
                          return inventory.eq[el].attributes[attr] !== 0 ? (
                            <Heading
                              marginTop={2}
                              color='teal.100'
                              fontSize='md'
                            >
                              + {inventory.eq[el].attributes[attr]}{' '}
                              {attr === 'vitality' && 'Witalność'}
                              {attr === 'strength' && 'Siła'}
                              {attr === 'intelligence' && 'Inteligencja'}
                              {attr === 'manaVitality' && 'Magia'}
                              {attr === 'accuracy' && 'Celność'}
                              {attr === 'agility' && 'Zwinność'}
                            </Heading>
                          ) : null
                        })
                      : null}
                  </PopoverHeader>

                  <PopoverBody>
                    <Text mb={2} fontSize='small'>
                      {inventory.eq[el].description}
                    </Text>
                  </PopoverBody>

                  <PopoverFooter marginTop={4}>
                    {Object.keys(inventory.eq).includes(
                      inventory.eq[el].type
                    ) && (
                      <Flex justifyContent={'space-between'}>
                        <Button
                          variant='link'
                          onClick={() => unEquip(inventory.eq[el])}
                        >
                          Zdejmij <GiClick style={{ marginLeft: '5px' }} />
                        </Button>
                        <Flex alignItems={'center'}>
                          <Text>100</Text>
                          <Cash style={{ marginLeft: '3px' }} />
                        </Flex>
                      </Flex>
                    )}
                  </PopoverFooter>

                  {/* <Flex justifyContent={'space-between'}>
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
                  </Flex> */}
                </PopoverContent>
              </Popover>
            </GridItem>
          ) : (
            <GridItem
              // area={'a-1'}
              bgGradient='linear(to-l, gray.700, gray.900)'
              // bgColor={'rgba(52,34,17, 0.8)'}
              border='2px solid'
              borderColor={'gray'}
              borderRadius={10}
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
      <Flex
        marginTop={10}
        as={motion.div}
        initial={{
          opacity: 0,
          y: -150,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        opacity={0.8}
        justifyContent={'space-around'}
      >
        <Heading display='flex' fontSize='2xl'>
          <GiBattleAxe style={{ marginRight: '10px' }} /> Atak:{' '}
          {eqPlayerAttack - 5}
        </Heading>
        <Heading display='flex' fontSize='2xl'>
          <GiBorderedShield style={{ marginRight: '10px' }} />
          Obrona: {eqPlayerDefense}
        </Heading>
      </Flex>
    </Box>
  ) : (
    <Spinner size='xl' />
  )
}

export default InventoryEq
