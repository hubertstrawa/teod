import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Flex,
  Text,
  Divider,
  ButtonGroup,
  Button,
  CardFooter,
} from '@chakra-ui/react'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import { useGetCurrentPlayerQuery } from '../features/player/playerApiSlice'

const Enemy = ({
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
}: any) => {
  const { data: player } = useGetCurrentPlayerQuery()

  const handleClick = () => {
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

  return (
    <Card maxW='sm'>
      <CardBody>
        <Image src={image} borderRadius='lg' />

        <Stack mt='6' spacing='3'>
          <Flex justifyContent='space-between' alignItems='center'>
            <Heading size='md'>{name}</Heading>
            <Flex flexDir='column' textAlign='left'>
              <Text>Level: {level}</Text>
              <Text>Strength: {power}</Text>
            </Flex>
          </Flex>
        </Stack>
      </CardBody>
      <Divider mt={'auto'} />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button
            disabled={player.healthPoints <= 0}
            variant='solid'
            colorScheme='blue'
            onClick={handleClick}
          >
            Walcz
          </Button>
          {/* <Button variant='ghost' colorScheme='blue'>
            Add to cart
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default Enemy
