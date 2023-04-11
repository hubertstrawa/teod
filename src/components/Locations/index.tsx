import {
  Box,
  Grid,
  Card,
  Image,
  Stack,
  CardBody,
  Flex,
  Heading,
  Text,
  CardFooter,
  SimpleGrid,
  Button,
} from '@chakra-ui/react'
import { GiPadlock } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'
import PlayerBadge from '../PlayerBadge'
import Link from 'next/link'
import IntroTutorial from '../Tutorial/IntroTutorial'
import { useRouter } from 'next/router'
import { useGetCurrentPlayerQuery } from '../../features/player/playerApiSlice'

const Locations = () => {
  const router = useRouter()
  const { data, isLoading } = useGetCurrentPlayerQuery()
  return (
    <Box
      // backgroundImage={'/images/inventory-bg2.png'}
      backgroundSize='100%'
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'center'}
      textAlign='center'
      fontSize='xl'
      height='100vh'
    >
      <SimpleGrid
        maxW='full'
        backgroundColor={'rgba(12,12,12, 0.85)'}
        margin='0 auto'
        p={12}
        minH='100vh'
        position={'relative'}
      >
        <PlayerBadge />
        {/* <Link href='/game/explore/forgotten-forest'> */}
        {/* initial={{
      opacity: 0,
      y: 50
    }}
    animate={{
      opacity: 1,
      y: 0
      
    }} */}
        <AnimatePresence>
          <Card
            as={motion.div}
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            bgImage={'/images/dark-forest.png'}
            bgPos={'center'}
            bgSize={'cover'}
            marginBottom={10}
          >
            <Stack>
              <CardBody>
                <Heading textAlign={'left'} size='md'>
                  Zapomniany las
                </Heading>

                <Text fontSize='lg' py='2'>
                  Zalecany poziom: 1-15
                </Text>
              </CardBody>

              <CardFooter>
                <Button variant='solid' colorScheme='teal' padding={0}>
                  <Link
                    style={{
                      height: '40px',
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    href='/game/explore/forgotten-forest'
                  >
                    Przejdź do lokacji
                  </Link>
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </AnimatePresence>
        <AnimatePresence>
          <Card
            as={motion.div}
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            direction={{ base: 'column', sm: 'row' }}
            overflow='hidden'
            variant='outline'
            bgImage={'/images/royal-ruins.png'}
            bgPos={'bottom'}
            bgSize={'cover'}
            bgRepeat='no-repeat'
            marginBottom={10}
          >
            <Stack>
              <CardBody>
                <Flex alignItems={'center'}>
                  <Heading marginRight={2} textAlign={'left'} size='md'>
                    Królewskie ruiny
                  </Heading>
                  <GiPadlock />
                </Flex>
                <Text fontSize='lg' py='2'>
                  Zalecany poziom: 15-30
                </Text>
              </CardBody>

              <CardFooter>
                <Button
                  isDisabled
                  variant='solid'
                  padding={0}
                  colorScheme='teal'
                >
                  <Link
                    style={{
                      height: '40px',
                      padding: '0 16px',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    href='/game/explore'
                  >
                    Przejdź do lokacji
                  </Link>
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </AnimatePresence>
      </SimpleGrid>
      <IntroTutorial shouldBeVisible={data?.data?.tutorial === 2} />
    </Box>
  )
}

export default Locations
