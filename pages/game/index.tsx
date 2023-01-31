// @ts-nocheck
import Home from '../../src/components/Home'
import Sidebar from '../../src/components/Sidebar'
import { selectCurrentToken } from '../../src/features/auth/authSlice'
import { useSelector } from 'react-redux'
import { useRefreshMutation } from '../../src/features/auth/authApiSlice'
import PersistLogin from '../../src/components/PersistLogin'
import { useEffect } from 'react'

const Game = () => {
  return (
    // <PersistLogin>
    <Sidebar>
      <Home />
    </Sidebar>
    // </PersistLogin>
  )
}

export default Game
