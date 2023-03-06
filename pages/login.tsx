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
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { setCredentials } from '../src/features/auth/authSlice'
import { useLoginMutation } from '../src/features/auth/authApiSlice'

const Login = () => {
  const dispatch = useDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, { isLoading, error }] = useLoginMutation()
  console.log('ERROR', error)

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!password || !email) return null
    try {
      const { accessToken } = await login({
        email,
        password,
      }).unwrap()
      if (accessToken) dispatch(setCredentials({ accessToken }))
      console.log(email, password)
    } catch (err) {
      console.log('err', err)
    }
  }

  return (
    <Box
      bgImage={'/images/inventory-bg2.png'}
      bgRepeat='no-repeat'
      bgSize={'cover'}
    >
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bgColor='rgba(0,0,0,0.8)'
      >
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={['2xl', '4xl']}>Zaloguj się</Heading>
            <Text fontSize={'lg'} color={'gray.600'}></Text>
          </Stack>
          <Box
            rounded={'lg'}
            // bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
            // width={['auto', 'md']}
          >
            <Stack spacing={4}>
              <FormControl id='email' isRequired>
                <FormLabel>Adres email</FormLabel>
                <Input type='email' />
              </FormControl>

              <FormControl id='password' isRequired>
                <FormLabel>Hasło</FormLabel>
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
                  _hover={{
                    bg: 'teal.500',
                  }}
                >
                  Zaloguj się
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  )
}

export default Login
