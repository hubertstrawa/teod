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
import arrowAnimation from './arrow-animation.json'
import Lottie from 'lottie-react'
import { useRef } from 'react'
import styles from './Inventory.module.css'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'
import { GiBattleAxe, GiBorderedShield, GiClick } from 'react-icons/gi'
import Cash from '../../icons/Cash'
const InventoryItem = ({ invItem, sellItem, buyItem, eat, equip, eq }: any) => {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const popoverRef = useRef()
  useOutsideClick({
    ref: popoverRef,
    handler: () => onClose(),
  })
  const { data: player } = useGetCurrentPlayerQuery()
  const onClickHandler = (item) => {
    console.log('eat, equip, eq', eat, equip, eq)

    if (!!sellItem) {
      return sellItem(item)
    }
    // EQUIP MUST BE BEFORE EAT - TODO CHECK WHY LOL
    if (!!equip && item.item.type !== 'eat' && item.item.type !== 'quest') {
      return equip(item)
    }
    if (!!eat && item.item.type === 'eat' && item.item.type !== 'quest') {
      return eat(item)
    }
    if (!!buyItem) {
      return buyItem(item)
    }

    return null
  }
  return Object.keys(invItem.item).length > 0 ? (
    <GridItem
      // background='rgba(0,0,0, 0.3)'
      // border='2px solid #654321'
      width='80px'
      height='80px'
    >
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
      <Popover arrowSize={10} isOpen={isOpen} onOpen={onOpen}>
        <PopoverTrigger>
          <Box
            className={styles.box}
            padding={3}
            // bgColor='#2b3345'
            // bgGradient='linear(to-b, #2e2019, rgba(0,0,0, 0.5))'
            bgGradient={`${
              (invItem.item.state === 'rare' &&
                'linear(to-b, teal.900, gray.800)') ||
              'none'
            }`}
            onMouseEnter={() => onOpen()}
            onClick={() => onClickHandler(invItem)}
            onMouseLeave={() => onClose()}
            cursor={'pointer'}
            style={{
              width: '100%',
              height: '100%',
              margin: '0',
              borderRadius: '8px',
              // border: '2px solid rgba(0,0,0, 0.9)',
              boxShadow: 'inset rgba(0, 0, 0, 0.5) 0px 5px 15px',
            }}
          >
            <img
              style={{ width: '100%', height: '100%' }}
              src={invItem.item.image}
              alt={invItem.item.name}
            />
          </Box>
        </PopoverTrigger>
        <PopoverContent
          bgColor='#2e2019'
          bgGradient='linear(to-b, #2e2019, rgba(0,0,0, 0.5))'
          maxWidth='250px'
          boxShadow={'rgba(0, 0, 0, 0.7) 0px 5px 15px'}
        >
          <PopoverArrow bgColor='#2e2019' />
          <PopoverCloseButton onClick={onClose} />
          <PopoverHeader
            fontFamily='heading'
            marginBottom={2}
            fontSize='medium'
          >
            {invItem.item.name}
            {invItem.item.state === 'rare' && (
              <Text color='teal.300' fontWeight='bold' fontSize='sm'>
                * rzadki *
              </Text>
            )}
            {invItem.item.type !== 'eat' && invItem.item.type !== 'quest' && (
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
                  {invItem.item.attack}
                </Text>
                <GiBorderedShield style={{ marginRight: '4px' }} />
                <Text fontSize='md' fontWeight='bold'>
                  {invItem.item.defense}
                </Text>
              </Box>
            )}
            {!!invItem.item.attributes
              ? Object.keys(invItem.item.attributes).map((attr) => {
                  return invItem.item.attributes[attr] !== 0 ? (
                    <Heading marginTop={2} color='teal.100' fontSize='md'>
                      + {invItem.item.attributes[attr]}{' '}
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
            {invItem.item.minLevel ? (
              <Text
                fontSize='sm'
                marginTop={2}
                color={
                  invItem.item.minLevel <= player?.data?.level
                    ? 'unset'
                    : '#EE4B2B'
                }
              >
                Wymagany poziom: {invItem.item.minLevel}
              </Text>
            ) : null}
          </PopoverHeader>
          <PopoverBody>
            <Text mb={1} fontSize='small'>
              {invItem.item.description}
            </Text>
          </PopoverBody>

          <PopoverFooter marginTop={4}>
            {!!sellItem ? (
              <Flex justifyContent={'space-between'}>
                <Button
                  variant='link'
                  onClick={() => {
                    sellItem(invItem)
                  }}
                >
                  Sprzedaj <GiClick style={{ marginLeft: '5px' }} />
                </Button>
                <Flex alignItems={'center'}>
                  <Text>{Math.round(invItem.item.value * 0.7)}</Text>
                  <Cash style={{ marginLeft: '3px' }} />
                </Flex>
              </Flex>
            ) : null}
            {!!buyItem ? (
              <Flex justifyContent={'space-between'}>
                <Button
                  variant='link'
                  onClick={() => {
                    buyItem(invItem)
                  }}
                >
                  Kup <GiClick style={{ marginLeft: '5px' }} />
                </Button>
                <Flex alignItems={'center'}>
                  <Text>{Math.round(invItem.item.value)}</Text>
                  <Cash style={{ marginLeft: '3px' }} />
                </Flex>
              </Flex>
            ) : null}
            {!!eq
              ? Object.keys(eq).includes(invItem.item.type) &&
                equip && (
                  <Flex justifyContent={'space-between'}>
                    <Button
                      variant='link'
                      onClick={() => {
                        equip(invItem)
                      }}
                    >
                      Załóż <GiClick style={{ marginLeft: '5px' }} />
                    </Button>
                    <Flex alignItems={'center'}>
                      <Text>100</Text>
                      <Cash style={{ marginLeft: '3px' }} />
                    </Flex>
                  </Flex>
                )
              : null}
            {invItem.item.type === 'eat' && eat ? (
              <Flex justifyContent={'space-between'}>
                <Button
                  variant='link'
                  onClick={() => {
                    eat(invItem)
                  }}
                >
                  Użyj <GiClick style={{ marginLeft: '5px' }} />
                </Button>
                <Flex alignItems={'center'}>
                  <Text>{invItem.item.value}</Text>
                  <Cash style={{ marginLeft: '3px' }} />
                </Flex>
              </Flex>
            ) : null}
            {invItem.item.type === 'quest' && eat ? (
              <Flex justifyContent={'flex-end'} alignItems={'center'}>
                <Text>{invItem.item.value}</Text>
                <Cash style={{ marginLeft: '3px' }} />
              </Flex>
            ) : null}
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </GridItem>
  ) : (
    <GridItem
      boxShadow={'inset rgba(0, 0, 0, 0.5) 0px 5px 15px'}
      borderRadius={'8px'}
      width='80px'
      height='80px'
    ></GridItem>
  )
}

export default InventoryItem
