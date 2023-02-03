// @ts-nocheck
import Head from 'next/head'
import { useState } from 'react'
import Link from 'next/link'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
} from '@chakra-ui/react'
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
    <div className={styles.container}>
      <Head>
        <title>The End Of Days</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        {token && (
          <Button>
            <Link style={{ border: '1px solid red' }} href={'/game'}>
              PRZEJDZ DO GRY
            </Link>
          </Button>
        )}
        <form onSubmit={submitHandler}>
          <FormControl>
            <FormLabel>Login</FormLabel>
            <Input type='text' onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
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
            Submit
          </Button>
        </form>
      </main>

      <footer>
        <a
          href='#'
          // target='_blank'
          rel='noopener noreferrer'
        >
          <img
            src='/images/logo-color.svg'
            alt='Hubert Strawa'
            className={styles.logo}
          />
        </a>
      </footer>

      <style jsx>{`
        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        footer img {
          margin-left: 0.5rem;
        }
        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          color: inherit;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
