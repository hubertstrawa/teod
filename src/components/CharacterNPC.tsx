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

const CharacterNPC = ({ talk, name, image }: any) => {
  const onClickHandler = () => {
    talk({ name })
  }

  return (
    <Card maxW='sm'>
      <CardBody>
        <Image src={image} borderRadius='lg' />

        <Stack mt='6' spacing='3'>
          <Flex justifyContent='space-between' alignItems='center'>
            <Heading size='md'>{name}</Heading>
            {/* <Flex flexDir='column' textAlign='left'>
              <Text>Level: {level}</Text>
              <Text>Strength: {power}</Text>
            </Flex> */}
          </Flex>
        </Stack>
        <Text mt={10} fontSize={'sm'} align='left'>
          Tajemniczy szaman przemierzający lasy królestwa Moonlit.
        </Text>
      </CardBody>

      <Divider />
      <CardFooter>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue' onClick={onClickHandler}>
            Rozmawiaj
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
