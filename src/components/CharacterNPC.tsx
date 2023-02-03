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

const CharacterNPC = ({
  fight,
  name,
  health_points,
  max_health_points,
  level,
  power,
  image,
  type,
}: any) => {
  const playerHealth = useSelector(
    (state: RootState) => state.player.health_points
  )
  const handleClick = () => {
    fight({ name, health_points, max_health_points, level, power, image, type })
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
      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button
            disabled={playerHealth <= 0}
            variant='solid'
            colorScheme='blue'
            onClick={handleClick}
          >
            Fight
          </Button>
          {/* <Button variant='ghost' colorScheme='blue'>
            Add to cart
          </Button> */}
        </ButtonGroup>
      </CardFooter>
    </Card>
  )
}

export default CharacterNPC
