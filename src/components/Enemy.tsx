import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Tooltip,
  Flex,
  Text,
  Box,
  Divider,
  ButtonGroup,
  Button,
  CardFooter,
} from '@chakra-ui/react'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { useGetCurrentPlayerQuery } from '../features/player/playerApiSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { GiCrossedAxes } from 'react-icons/gi'
import IconsElements from './IconsElements'

const Enemy = ({
  isBattleLoading,
  fight,
  name,
  health_points,
  maxMoney,
  max_health_points,
  experience,
  level,
  power,
  image,
  loot,
  type,
  isDisabled,
}: any) => {
  const handleClick = () => {
    console.log('name', name)
    console.log('image', image)

    fight({
      name,
      experience,
      health_points,
      max_health_points,
      level,
      loot,
      power,
      image,
      type,
      maxMoney,
    })
  }

  console.log('type', type)

  return (
    <Card
      border={'4px solid'}
      borderColor={'gray.600'}
      background={'rgba(0,0,0,0.65)'}
      maxW='sm'
    >
      <CardBody>
        <motion.div
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', bounce: 0.4 }}
        >
          <Image
            // bgGradient='linear(gray.800 0%, gray.700 25%, gray.500 50%)'
            src={image}
            borderRadius='lg'
          />
        </motion.div>

        <Stack mt='6' spacing='3'>
          <Flex
            direction={'column'}
            justifyContent='space-between'
            // alignItems='center'
          >
            <Heading size='md'>{name}</Heading>
            <Flex flexDir='column' textAlign='left'>
              <Text marginRight={2}>
                Level: <strong>{level}</strong>
              </Text>
              <Flex alignItems={'center'}>
                <Text>Rodzaj:</Text>
                <IconsElements variant={type} />
              </Flex>
            </Flex>
          </Flex>
        </Stack>
      </CardBody>
      <Divider mt={'auto'} />
      <CardFooter>
        <ButtonGroup width={'100%'} spacing='2'>
          <Tooltip
            placement='top-start'
            label={isDisabled ? 'Nie masz HP. Ulecz się aby móc walczyć' : null}
            aria-label='A tooltip'
          >
            <Button
              isDisabled={isDisabled}
              variant='solid'
              // colorScheme='teal'
              bgColor={'gray.800'}
              width='100%'
              onClick={handleClick}
              isLoading={isBattleLoading}
              // display='flex'
              // justifyContent={'space-between'}
            >
              <Text fontSize={'lg'} marginRight={2}>
                Walcz
              </Text>
              <GiCrossedAxes size={20} />
            </Button>
          </Tooltip>
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default Enemy
