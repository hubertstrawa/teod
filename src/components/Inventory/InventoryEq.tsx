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
  Spinner,
} from '@chakra-ui/react'
import Cash from '../../icons/Cash'
const InventoryEq = ({ inventory, unEquip }) => {
  return !!inventory ? (
    <Grid
      // padding={10}
      // backgroundImage={'/images/eq-background.png'}
      backgroundSize={'100%'}
      backgroundPosition={'center'}
      // padding={12}
      templateAreas={`"a-1 a-2 a-3"
            "b-1 b-2 b-3"
            "c-1 c-2 c-3"`}
      gridTemplateRows={'repeat(3, 120px)'}
      flex={1}
      gridTemplateColumns={'repeat(3, 120px)'}
      gap={8}
      // padding={4}
      // background='rgba(255,255,255,0.2)'
      // border='1px solid blue'
    >
      {Object.keys(inventory.eq).map((el) => {
        // console.log('INV EQ', inventory.eq)
        return inventory.eq[el] ? (
          <GridItem
            // area={'a-1'}
            border='2px solid gray'
            borderRadius={10}
            bgGradient='linear(to-b, rgba(0,0,0, 0.7), rgba(50,50,50, 0.7))'
            // bgGradient='linear(to-l, gray.700, gray.800)'
            // bgColor={'rgba(52,34,17, 0.5)'}
            cursor='pointer'
          >
            <Popover>
              <PopoverTrigger>
                <img
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '1rem',
                  }}
                  src={inventory.eq[el].image}
                  alt={inventory.eq[el].name}
                />
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
  ) : (
    <Spinner size='xl' />
  )
}

export default InventoryEq
