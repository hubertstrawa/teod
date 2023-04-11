//@ts-nocheck

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Flex,
  FormControl,
  FormLabel,
  Checkbox,
  Link,
  Radio,
  RadioGroup,
  useColorModeValue,
  useToast,
  useRadioGroup,
  useRadio,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Image,
} from '@chakra-ui/react'
import { setCredentials } from '../src/features/auth/authSlice'
import {
  useSignUpMutation,
  useLoginMutation,
} from '../src/features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import useSound from 'use-sound'

import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box fontSize='lg' flex={1} as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'gray.900',
          color: 'white',
          borderColor: 'teal.800',
          borderWidth: '2px',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
        display='flex'
        flexDirection='column'
        alignItems='center'
      >
        {props.children}
      </Box>
    </Box>
  )
}

const avatars = [
  {
    name: 'Ryan Florence',
    url: '/characters/wizard-bg.png',
  },
  {
    name: 'Segun Adebayo',
    url: '/characters/20.png',
  },
  {
    name: 'Kent Dodds',
    url: '/characters/50.png',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: '/characters/21.png',
  },
  {
    name: 'Christian Nwamba',
    url: '/characters/7.png',
  },
]

export default function JoinOurTeam() {
  const [email, setEmail] = useState('')
  const [playerName, setPlayerName] = useState('')
  const [password, setPassword] = useState('')
  const [sex, setSex] = useState('male')
  const [race, setRace] = useState('human')
  const [signupStep, setSignupStep] = useState(1)
  const [playerNameInvalid, setPlayerNameInvalid] = useState(false)

  const toast = useToast()
  const router = useRouter()
  const dispatch = useDispatch()

  const [login, { isLoading, error }] = useLoginMutation()
  const [signUpMutation] = useSignUpMutation()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [play, { stop }] = useSound('/sounds/elven-forest-shorter.mp3')

  const onOpenLoginHandler = () => {
    onOpen()
  }
  const loginHandler = async (e) => {
    e.preventDefault()

    if (!password || !email) return null
    try {
      const { accessToken, isNewPlayer } = await login({
        email,
        password,
      }).unwrap()
      if (accessToken) {
        dispatch(setCredentials({ accessToken }))
        // await socketInitializer()
        console.log(email, password)
        // play()
        router.push('/game')
      }
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

  const submitHandler = async (e) => {
    e.preventDefault()

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
        race: race,
        avatar: `/avatars/${race}-${sex === 'male' ? 'm' : 'f'}.png`,
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
    onChange: (val) => setRace(val),
  })

  const signupHandle = () => {
    if (signupStep === 1 && !playerName) {
      setPlayerNameInvalid(true)
    }
    if (signupStep === 1 && !!playerName) {
      setSignupStep(2)
    }
  }

  const group = getRootProps()
  return (
    <Box
      bgImage={'/images/dark-forest.png'}
      bgPosition='bottom'
      bgSize='cover'
      minHeight='100vh'
      height='100%'
      position={'relative'}
    >
      <Box bgColor='rgba(0,0,0, 0.7)' minHeight='100vh'>
        <Container
          as={SimpleGrid}
          //
          maxW={'7xl'}
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
        >
          <Stack spacing={{ base: 4, md: 5 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '7xl' }}
            >
              The End Of Days
              {/* <Text
              as={'span'}
              bgGradient='linear(to-r, red.400,pink.400)'
              bgClip='text'
            >
              &
            </Text>{' '} */}
              {/* Full-Stack Developers */}
            </Heading>
            <Heading fontSize={{ base: 'xl', lg: '3xl' }} color='teal.100'>
              Zagraj za darmo w przeglądarce
            </Heading>
            <Stack direction={'row'} spacing={4} align={'center'}>
              <AvatarGroup>
                {avatars.map((avatar) => (
                  <Avatar
                    key={avatar.name}
                    name={avatar.name}
                    src={avatar.url}
                    size={useBreakpointValue({ base: 'md', md: 'lg' })}
                    position={'relative'}
                    zIndex={2}
                    _before={{
                      content: '""',
                      width: 'full',
                      height: 'full',
                      rounded: 'full',
                      transform: 'scale(1.125)',
                      bgGradient: 'linear(to-bl, teal.400,teal.700)',
                      position: 'absolute',
                      zIndex: -1,
                      top: 0,
                      left: 0,
                    }}
                  />
                ))}
              </AvatarGroup>
              <Text
                // fontFamily={'heading'}
                fontSize={{ base: '4xl', md: '6xl' }}
              >
                +
              </Text>
              <Flex
                align={'center'}
                justify={'center'}
                fontFamily={'heading'}
                fontSize={{ base: 'sm', md: 'lg' }}
                bg={'gray.800'}
                color={'white'}
                border='3px solid white'
                rounded={'full'}
                minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
                minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
                position={'relative'}
                _before={{
                  content: '""',
                  width: 'full',
                  height: 'full',
                  rounded: 'full',
                  transform: 'scale(1.125)',
                  bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                  position: 'absolute',
                  zIndex: -1,
                  top: 0,
                  left: 0,
                }}
              >
                TY
              </Flex>
            </Stack>
            <Button
              width='180px'
              size='lg'
              borderRadius={'full'}
              fontFamily='heading'
              variant='solid'
              variant='outline'
              // bg='teal.900'
              onClick={onOpenLoginHandler}
              colorScheme={'white'}
              _hover={{
                // bg: 'cyan.400',
                bg: 'gray.800',
                color: 'white',
              }}
            >
              Zaloguj się
            </Button>
            <Modal size={'xs'} isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent bgColor='gray.700'>
                <ModalHeader fontFamily='heading'>Zaloguj się</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={loginHandler}>
                    <Stack spacing={5} mb={4}>
                      <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input
                          type='text'
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Hasło</FormLabel>
                        <Input
                          type='password'
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
                      </FormControl>
                      <Button
                        w='100%'
                        mt={4}
                        // variant='outline'
                        colorScheme='gray'
                        isLoading={isLoading}
                        type='submit'
                        fontFamily='heading'
                      >
                        WEJDŹ DO GRY
                      </Button>
                    </Stack>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>

            {/* <Button alignSelf='flex-start' justifySelf={'flex-start'}>
              Logowanie
            </Button> */}
          </Stack>
          <Stack
            // bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
            bgColor='gray.800'
          >
            <Stack spacing={4}>
              <Heading
                color={'gray.100'}
                lineHeight={1.1}
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
              >
                Stwórz swojego bohatera
              </Heading>
              {signupStep === 1 && (
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                  Dołącz do walki o lepsze jutro i buduj swoją postać w
                  brutalnym królestwie Moonlit.
                </Text>
              )}
              {signupStep === 2 && (
                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                  Jeszcze tylko chwila. Podaj dane do logowania i wejdź do gry.
                </Text>
              )}
            </Stack>
            <form onSubmit={submitHandler}>
              {signupStep === 1 && (
                <Stack spacing={8}>
                  <FormControl
                    isInvalid={playerNameInvalid}
                    id='playerName'
                    isRequired
                    onChange={() => setPlayerNameInvalid(false)}
                  >
                    <FormLabel fontFamily={'heading'} color='gray.300'>
                      Nazwa gracza
                    </FormLabel>
                    <Input
                      placeholder='Twój nick'
                      type='playerName'
                      onChange={(e) => setPlayerName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id='sex'>
                    <FormLabel fontFamily={'heading'} color='gray.300'>
                      Płeć
                    </FormLabel>
                    <RadioGroup onChange={setSex} value={sex}>
                      <Stack fontFamily={'heading'} direction='row'>
                        <Radio colorScheme={'teal'} value='male'>
                          Mężczyzna
                        </Radio>
                        <Radio colorScheme={'teal'} value='female'>
                          Kobieta
                        </Radio>
                      </Stack>
                    </RadioGroup>
                  </FormControl>
                  <FormControl marginBottom={4} id='race'>
                    <FormLabel fontFamily={'heading'}>Rasa</FormLabel>
                    <HStack fontFamily={'heading'} {...group}>
                      {options.map((value) => {
                        const radio = getRadioProps({ value })
                        return (
                          <RadioCard key={value} {...radio}>
                            {value === 'human' && 'Człowiek'}
                            {value === 'elf' && 'Elf'}
                            {value === 'orc' && 'Ork'}
                            <Avatar
                              marginTop={2}
                              size={'lg'}
                              bgColor={'gray.900'}
                              src={`/avatars/${value}-${
                                sex === 'male' ? 'm' : 'f'
                              }.png`}
                              border={'2px solid #fff'}
                            />
                          </RadioCard>
                        )
                      })}
                    </HStack>
                  </FormControl>
                </Stack>
              )}
              {signupStep === 2 && (
                <Stack spacing={6}>
                  <FormControl id='email' isRequired>
                    <FormLabel>Adres email</FormLabel>
                    <Input
                      type='email'
                      placeholder='Twój adres e-mail'
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id='password' isRequired>
                    <FormLabel>Hasło</FormLabel>
                    <Input
                      type='password'
                      placeholder='Twoje hasło'
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormControl>
                  <FormControl id='passwordConfirm' isRequired>
                    <FormLabel>Potwierdź hasło</FormLabel>
                    <Input
                      placeholder='Potwierdź swoje hasło'
                      type='password'
                    />
                  </FormControl>
                </Stack>
              )}
              <Button
                bg={'teal.700'}
                color={'white'}
                type='submit'
                fontFamily='heading'
                fontSize='lg'
                variant='outline'
                width='full'
                _hover={{
                  bg: 'teal.500',
                }}
                marginTop={10}
                borderRadius='10px'
                onClick={signupHandle}
              >
                {signupStep === 1 ? 'KONTYNUUJ' : 'ZAREJESTRUJ SIĘ'}
              </Button>
            </form>
            {/* <Box as={'form'} mt={10}>
              <Stack spacing={4}>
                <Input
                  placeholder='Firstname'
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Input
                  placeholder='firstname@lastname.io'
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Input
                  placeholder='+1 (___) __-___-___'
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                />
                <Button
                  fontFamily={'heading'}
                  bg={'gray.200'}
                  color={'gray.800'}
                >
                  Upload CV
                </Button>
              </Stack>
              <Button
                fontFamily={'heading'}
                mt={8}
                w={'full'}
                bgGradient='linear(to-r, red.400,pink.400)'
                color={'white'}
                _hover={{
                  bgGradient: 'linear(to-r, red.400,pink.400)',
                  boxShadow: 'xl',
                }}
              >
                Submit
              </Button>
            </Box> */}
            form
          </Stack>
        </Container>
      </Box>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  )
}

export const Blur = (props: IconProps) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '20vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height='250px'
      translateX={100}
      viewBox='0 0 528 560'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <circle cx='71' cy='61' r='111' fill='#F56565' />
      <circle cx='244' cy='106' r='139' fill='#ED64A6' />
      <circle cy='291' r='139' fill='#ED64A6' />
      <circle cx='80.5' cy='189.5' r='101.5' fill='#ED8936' />
      <circle cx='196.5' cy='317.5' r='101.5' fill='#ECC94B' />
      <circle cx='70.5' cy='458.5' r='101.5' fill='#48BB78' />
      <circle cx='426.5' cy='-0.5' r='101.5' fill='#4299E1' />
    </Icon>
  )
}

// import Head from 'next/head'
// import { useState } from 'react'
// import { socketInitializer } from './_app'
// import Link from 'next/link'
// import {
//   FormControl,
//   FormLabel,
//   FormErrorMessage,
//   FormHelperText,
//   Stack,
//   Flex,
//   Badge,
//   Heading,
//   Text,
//   useBreakpointValue,
// Modal,
// ModalContent,
// ModalOverlay,
// ModalFooter,
// ModalHeader,
// ModalCloseButton,
// ModalBody,
// useDisclosure,
// Image,
// useToast,
//   Button,
//   Input,
// } from '@chakra-ui/react'
// import { useRouter } from 'next/router'
// import styles from '../styles/Home.module.css'
// import { setCredentials } from '../src/features/auth/authSlice'
// import { useDispatch, useSelector } from 'react-redux'
// import { selectCurrentToken } from '../src/features/auth/authSlice'
// import { useLoginMutation } from '../src/features/auth/authApiSlice'

// export default function Home() {
//   const dispatch = useDispatch()
//   const token = useSelector(selectCurrentToken)
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const { isOpen, onOpen, onClose } = useDisclosure()
//   const router = useRouter()
//   const toast = useToast()

//   const [login, { isLoading, error }] = useLoginMutation()
//   console.log('ERROR', error)

// const submitHandler = async (e) => {
//   e.preventDefault()

//   if (!password || !email) return null
//   try {
//     const { accessToken, isNewPlayer } = await login({
//       email,
//       password,
//     }).unwrap()
//     if (accessToken) {
//       dispatch(setCredentials({ accessToken }))
//       // await socketInitializer()
//       console.log(email, password)
//       router.push('/game')
//     }
//   } catch (err) {
//     console.log('err', err)
//     toast({
//       title: err.data.message,
//       status: 'error',
//       position: 'top-right',
//       isClosable: true,
//     })
//   }
// }

//   return (
//     <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
//       <Flex p={8} flex={1} align={'center'} justify={'center'}>
//         <Stack spacing={6} w={'full'} maxW={'lg'}>
//           <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
//             <Text
//               as={'span'}
//               position={'relative'}
//               fontFamily={'MedievalSharp, cursive'}
//               _after={{
//                 content: "''",
//                 width: 'full',
//                 height: useBreakpointValue({ base: '20%', md: '30%' }),
//                 position: 'absolute',
//                 bottom: 1,
//                 left: 0,
//                 bg: 'teal',
//                 zIndex: -1,
//               }}
//             >
//               The End Of Days
//             </Text>
//             <Badge padding={'2'} m={3} variant='outline' colorScheme='green'>
//               beta
//             </Badge>
//             <br />{' '}
//             <Text color={'teal.300'} as={'span'}>
//               online browser RPG
//             </Text>{' '}
//           </Heading>
//           <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
//             Dołącz do walki o przetrwanie w brutalnym świecie, który zmierza ku
//             końcowi.
//           </Text>
//           <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
//             <Button
//               rounded={'full'}
//               bg={'teal'}
//               color={'white'}
//               _hover={{
//                 bg: 'teal.500',
//               }}
//             >
//               <Link href='/signup'>Załóz konto</Link>
//             </Button>
//             <Button rounded={'full'} onClick={onOpen}>
//               Zaloguj się
//             </Button>

// <Modal size={'xs'} isCentered isOpen={isOpen} onClose={onClose}>
//   <ModalOverlay />
//   <ModalContent>
//     <ModalHeader>Zaloguj się</ModalHeader>
//     <ModalCloseButton />
//     <ModalBody>
//       <form onSubmit={submitHandler}>
//         <Stack spacing={5} mb={4}>
//           <FormControl>
//             <FormLabel>Email</FormLabel>
//             <Input
//               type='text'
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </FormControl>
//           <FormControl>
//             <FormLabel>Hasło</FormLabel>
//             <Input
//               type='password'
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
//           </FormControl>
//           <Button
//             w='100%'
//             mt={4}
//             colorScheme='teal'
//             isLoading={isLoading}
//             type='submit'
//           >
//             Wejdź do gry
//           </Button>
//         </Stack>
//       </form>
//     </ModalBody>
//   </ModalContent>
// </Modal>
//           </Stack>
//         </Stack>
//       </Flex>
//       <Flex flex={1}>
//         <Image
//           alt={'Login Image'}
//           objectFit={'cover'}
//           src={'/images/inventory-bg2.png'}
//         />
//       </Flex>
//     </Stack>
//   )
// }
