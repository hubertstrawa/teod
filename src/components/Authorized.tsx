import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
const Authorized = ({ children }) => {
  const token = useSelector(selectCurrentToken)
  const router = useRouter()
  console.log('token ouside useeffect ', token)

  useEffect(() => {
    console.log('token', token)

    const timer = setTimeout(() => {
      if (!token) router.push('/')
    }, 500)

    return () => clearTimeout(timer)
  }, [token])

  return token ? children : <h1>NOT TOKEN </h1>
}

export default Authorized
