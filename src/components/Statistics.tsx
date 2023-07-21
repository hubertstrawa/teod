// @ts-nocheck
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Stack,
  Box,
  StackDivider,
  Tooltip,
  Text,
  Flex,
  Button,
} from '@chakra-ui/react'
import { FiPlus } from 'react-icons/fi'
import Cash from '../icons/Cash'
import { GiSwitchWeapon } from 'react-icons/gi'
import formatNumber from '../utils/formatNumber'
import { useAddAttributeMutation } from '../features/player/playerApiSlice'

const Statistics = ({ attributes, playerGold, playerLevel }: any) => {
  // const sumAttack = eq
  //   ? Object.keys(eq).reduce((acc, curr) => {
  //       return eq[curr]?.attack ? acc + eq[curr].attack : acc
  //     }, 0)
  //   : 0
  // const sumDefense = eq
  //   ? Object.keys(eq).reduce((acc, curr) => {
  //       return eq[curr]?.defense ? acc + eq[curr].defense : acc
  //     }, 0)
  //   : 0
  const [addAttribute, { error, isLoading, data }] = useAddAttributeMutation()
  const content = !!attributes
    ? Object.keys(attributes).map((attr) => {
        const price = Math.pow(attributes[attr], 2) + playerLevel * 100
        return attr !== 'manaVitality' && !attr.includes('eq') ? (
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Box display={'flex'} alignItems={'center'}>
              <Flex>
                <GiSwitchWeapon />

                <Heading
                  marginLeft={3}
                  textAlign={'left'}
                  size='sm'
                  textTransform='uppercase'
                >
                  {attr === 'strength' && 'Siła'}
                  {attr === 'intelligence' && 'Inteligencja'}
                  {attr === 'vitality' && 'Witalność'}
                  {attr === 'accuracy' && 'Celność'}
                  {attr === 'agility' && 'Zwinność'}
                </Heading>
              </Flex>
              <Text
                display='none'
                marginTop={2}
                color='gray.200'
                fontSize='xs'
                textTransform={'none'}
                textAlign={'left'}
              >
                Zwiększa obrazenia od ataków fizycznych
              </Text>
            </Box>
            <Flex alignItems={'center'}>
              <Text fontWeight={'bold'} fontSize='2xl'>
                {attributes[attr]}
                {attributes[
                  `eq${attr.charAt(0).toUpperCase() + attr.slice(1)}`
                ] > 0 && (
                  <span style={{ color: 'teal', fontSize: '1.4rem' }}>
                    {' '}
                    +{' '}
                    {
                      attributes[
                        `eq${attr.charAt(0).toUpperCase() + attr.slice(1)}`
                      ]
                    }
                  </span>
                )}
              </Text>
              <Tooltip
                // display={price > playerGold ? 'block' : 'none'}
                placement={'top-end'}
                hasArrow
                fontSize='sm'
                padding={4}
                borderRadius={20}
                label={`Złoto: ${formatNumber(price)}`}
                // fontFamily='heading'
                boxShadow={'#241b11 2px 20px 50px'}
                bgColor='gray.700'
                fontSize='lg'
                color='gray.100'
                textAlign='center'
                aria-label='A tooltip'
              >
                <Button
                  marginLeft={4}
                  leftIcon={<FiPlus />}
                  colorScheme='teal'
                  variant='outline'
                  isDisabled={price > playerGold}
                  title='Koszt'
                  size='sm'
                  isLoading={isLoading}
                  onClick={() => addAttribute(attr)}
                >
                  1
                </Button>
              </Tooltip>
            </Flex>
          </Box>
        ) : null
      })
    : null
  return (
    <Card height='100%' flex='1' bgColor='rgba(0,0,0, 0.2)'>
      {/* <CardHeader>
        <Heading size='md'>Client Report</Heading>
      </CardHeader> */}

      <CardBody>
        <Stack divider={<StackDivider />} spacing='4'>
          {content}
        </Stack>
      </CardBody>
    </Card>
  )
}

export default Statistics
