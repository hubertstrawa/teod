import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  useRadioGroup,
  useRadio,
  HStack,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useSignUpMutation } from '../src/features/auth/authApiSlice'

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}

const Signup = () => {
  const [email, setEmail] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [password, setPassword] = useState('')
  const toast = useToast()
  const router = useRouter()

  const [signUpMutation] = useSignUpMutation()

  const submitHandler = async (e) => {
    e.preventDefault()

    console.log('JKJKJKJK')

    if (!password || !email || !playerName) {
      return toast({
        title: 'Podaj wszystkie dane',
        status: 'error',
        position: 'top-right',
        isClosable: true,
      })
    }
    try {
      const data = await signUpMutation({
        email,
        playerName,
        password,
      }).unwrap()
      toast({
        title: data.message,
        status: 'success',
        position: 'top-right',
        isClosable: true,
      })
      router.push('/')
    } catch (err) {
      console.log('err', err)
      toast({
        title: err.data.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      })
    }
  }

  const options = ['human', 'elf', 'orc']

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'race',
    defaultValue: 'human',
    onChange: console.log,
  })

  const group = getRootProps()

  return (
    <Box
      bgImage={'/images/background2.png'}
      bgPosition={'center'}
      bgRepeat='no-repeat'
      bgSize={'cover'}
    >
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bgColor='rgba(0,0,0,0.85)'
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={['2xl', '4xl']}>Załóż konto</Heading>
            <Text fontSize={'lg'} color={'gray.400'}>
              Dołącz do walki całkowicie za darmo
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            // width='md'
            width={['auto', 'md']}
          >
            <Stack spacing={4}>
              <form onSubmit={submitHandler}>
                <FormControl id='email' isRequired>
                  <FormLabel>Adres email</FormLabel>
                  <Input
                    type='email'
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id='playerName' isRequired>
                  <FormLabel>Nazwa gracza</FormLabel>
                  <Input
                    type='playerName'
                    onChange={(e) => setPlayerName(e.target.value)}
                  />
                </FormControl>
                <FormControl id='race'>
                  <FormLabel>Rasa</FormLabel>
                  <HStack {...group}>
                    {options.map((value) => {
                      const radio = getRadioProps({ value })
                      return (
                        <RadioCard key={value} {...radio}>
                          {value}
                        </RadioCard>
                      )
                    })}
                  </HStack>
                </FormControl>
                <FormControl id='password' isRequired>
                  <FormLabel>Hasło</FormLabel>
                  <Input
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl id='passwordConfirm' isRequired>
                  <FormLabel>Potwierdź hasło</FormLabel>
                  <Input type='password' />
                </FormControl>
                <Stack spacing={10}>
                  {/* <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack> */}
                  <Button
                    bg={'teal'}
                    color={'white'}
                    type='submit'
                    _hover={{
                      bg: 'teal.500',
                    }}
                  >
                    Załóż konto
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  )
}

export default Signup
