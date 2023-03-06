import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
const Authorized = ({ children }) => {
  const token = useSelector(selectCurrentToken)
  const router = useRouter()

  useEffect(() => {
    if (!token) router.push('/')
  }, [token])

  return token ? children : null
}

export default Authorized
