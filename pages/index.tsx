// @ts-nocheck
import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Stack,
  Flex,
  Badge,
  Heading,
  Text,
  useBreakpointValue,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Image,
  useToast,
  Button,
  Input,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import styles from '../styles/Home.module.css'
import { setCredentials } from '../src/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentToken } from '../src/features/auth/authSlice'
import { useLoginMutation } from '../src/features/auth/authApiSlice'

export default function Home() {
  const dispatch = useDispatch()
  const token = useSelector(selectCurrentToken)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const toast = useToast()

  const [login, { isLoading, error }] = useLoginMutation()
  console.log('ERROR', error)

  const submitHandler = async (e) => {
    e.preventDefault()

    if (!password || !email) return null
    try {
      const { accessToken, isNewPlayer } = await login({
        email,
        password,
      }).unwrap()
      if (accessToken) {
        dispatch(setCredentials({ accessToken }))
        console.log(email, password)
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

  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              fontFamily={'MedievalSharp, cursive'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'teal',
                zIndex: -1,
              }}
            >
              The End Of Days
            </Text>
            <Badge padding={'2'} m={3} variant='outline' colorScheme='green'>
              beta
            </Badge>
            <br />{' '}
            <Text color={'teal.300'} as={'span'}>
              online browser RPG
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Dołącz do walki o przetrwanie w brutalnym świecie, który zmierza ku
            końcowi.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'teal'}
              color={'white'}
              _hover={{
                bg: 'teal.500',
              }}
            >
              <Link href='/signup'>Załóz konto</Link>
            </Button>
            <Button rounded={'full'} onClick={onOpen}>
              Zaloguj się
            </Button>

            <Modal size={'xs'} isCentered isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Zaloguj się</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={submitHandler}>
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
                        colorScheme='teal'
                        isLoading={isLoading}
                        type='submit'
                      >
                        Wejdź do gry
                      </Button>
                    </Stack>
                  </form>
                </ModalBody>
              </ModalContent>
            </Modal>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={'/images/inventory-bg2.png'}
        />
      </Flex>
    </Stack>
  )

  // return (
  //   <div className={styles.container}>
  //     <Head>
  //       <title>The End Of Days</title>
  //       <link rel='icon' href='/favicon.ico' />
  //     </Head>

  //     <main>
  //       {token && (
  //         <Button padding={0}>
  //           <Link style={{ padding: 6, height: '100%' }} href={'/game'}>
  //             PRZEJDZ DO GRY
  //           </Link>
  //         </Button>
  //       )}
  // <form onSubmit={submitHandler}>
  //   <FormControl>
  //     <FormLabel>Login</FormLabel>
  //     <Input type='text' onChange={(e) => setEmail(e.target.value)} />
  //   </FormControl>
  //   <FormControl>
  //     <FormLabel>Password</FormLabel>
  //     <Input
  //       type='password'
  //       onChange={(e) => setPassword(e.target.value)}
  //     />
  //     {/* <FormHelperText>We'll never share your email.</FormHelperText> */}
  //   </FormControl>
  //   <Button
  //     w='100%'
  //     mt={4}
  //     colorScheme='teal'
  //     isLoading={isLoading}
  //     type='submit'
  //   >
  //     Submit
  //   </Button>
  // </form>
  //     </main>

  //     <footer>
  //       <a
  //         href='#'
  //         // target='_blank'
  //         rel='noopener noreferrer'
  //       >
  //         <img
  //           src='/images/logo-color.svg'
  //           alt='Hubert Strawa'
  //           className={styles.logo}
  //         />
  //       </a>
  //     </footer>

  //     <style jsx>{`
  //       main {
  //         padding: 5rem 0;
  //         flex: 1;
  //         display: flex;
  //         flex-direction: column;
  //         justify-content: center;
  //         align-items: center;
  //       }
  //       footer {
  //         width: 100%;
  //         height: 100px;
  //         border-top: 1px solid #eaeaea;
  //         display: flex;
  //         justify-content: center;
  //         align-items: center;
  //       }
  //       footer img {
  //         margin-left: 0.5rem;
  //       }
  //       footer a {
  //         display: flex;
  //         justify-content: center;
  //         align-items: center;
  //         text-decoration: none;
  //         color: inherit;
  //       }
  //       code {
  //         background: #fafafa;
  //         border-radius: 5px;
  //         padding: 0.75rem;
  //         font-size: 1.1rem;
  //         font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
  //           DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
  //       }
  //     `}</style>

  //     <style jsx global>{`
  //       html,
  //       body {
  //         padding: 0;
  //         margin: 0;
  //         font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
  //           Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
  //           sans-serif;
  //       }
  //       * {
  //         box-sizing: border-box;
  //       }
  //     `}</style>
  //   </div>
  // )
}
