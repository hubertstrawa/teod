import Equippment from '../../src/components/Equippment'
import Sidebar from '../../src/components/Sidebar'
import { selectCurrentToken } from '../../src/features/auth/authSlice'
import { useSelector } from 'react-redux'

const Equipment = () => {
  const token = useSelector(selectCurrentToken)
  if (!token) return <h1>NOT LOGGED IN</h1>

  return (
    <Sidebar>
      <Equippment />
    </Sidebar>
  )
}

export default Equipment
