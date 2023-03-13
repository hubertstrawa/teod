import {
  Box,
  Grid,
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
  CardFooter,
  Button,
} from '@chakra-ui/react'
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
    >
      <Grid
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
            bgPosition='center'
            bgPos={'bottom'}
            marginBottom={10}
          >
            <Stack>
              <CardBody>
                <Heading textAlign={'left'} size='md'>
                  Zapomniany las
                </Heading>

                <Text py='2'>Zalecany poziom: 1-10</Text>
              </CardBody>

              <CardFooter>
                <Button variant='solid' colorScheme='blue' padding={0}>
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
        {/* </Link> */}
        {/* <Card
          direction={{ base: 'column', sm: 'row' }}
          overflow='hidden'
          variant='outline'
          bgImage={'/images/dark-forest.png'}
          bgPosition='center'
          bgPos={'bottom'}
          marginBottom={10}
        >
          <Stack>
            <CardBody>
              <Heading textAlign={'left'} size='md'>
                Zapomniany las
              </Heading>

              <Text py='2'>Zalecany poziom: 1-10</Text>
            </CardBody>

            <CardFooter>
              <Button variant='solid' colorScheme='blue'>
                Przejdź do lokacji
              </Button>
            </CardFooter>
          </Stack>
        </Card> */}
      </Grid>
      <IntroTutorial shouldBeVisible={data?.data?.tutorial === 2} />
    </Box>
  )
}

export default Locations
