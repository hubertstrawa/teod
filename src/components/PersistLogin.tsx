// @ts-nocheck
import { useEffect, useRef, useState } from 'react'
// import { useRefreshMutation } from './authApiSlice'
import { useRefreshMutation } from '../features/auth/authApiSlice'
// import usePersist from '../../hooks/usePersist'
import usePersist from '../hooks/usePersist'
import { useSelector } from 'react-redux'
// import { selectCurrentToken } from './authSlice'
import { selectCurrentToken } from '../features/auth/authSlice'

const PersistLogin = ({ children }) => {
  // const [persist] = usePersist()
  const persist = true
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation()

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        console.log('verifying refresh token')
        try {
          //const response =
          await refresh()
          //const { accessToken } = response.data
          setTrueSuccess(true)
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => (effectRan.current = true)

    // eslint-disable-next-line
  }, [])

  console.log('persist', persist)
  console.log('isSucces', isSuccess)
  console.log('trueSUCC', trueSuccess)
  console.log('children', children)
  console.log('token', token)
  console.log('isUninitialized', isUninitialized)

  let content
  if (!persist) {
    // persist: no
    console.log('no persist')
    content = (
      <>
        <h2>{token}</h2>
        {children}
      </>
    )
  } else if (isLoading) {
    //persist: yes, token: no
    console.log('loading')
    content = <p>Loading...</p>
  } else if (isError) {
    //persist: yes, token: no
    console.log('error')
    content = (
      <p className='errmsg'>
        {error.data?.message}
        <a href='/login'>Please login again</a>.
      </p>
    )
  } else if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    console.log('success')
    content = (
      <>
        <h2>{token}</h2>
        {children}
      </>
    )
  } else if (token && isUninitialized) {
    //persist: yes, token: yes
    console.log('token and uninit')
    console.log(isUninitialized)
    content = (
      <>
        <h2>{token}</h2>
        {children}
      </>
    )
  }

  return content
}
export default PersistLogin
