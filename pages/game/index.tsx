import Home from '../../src/components/Home'
import Sidebar from '../../src/components/Sidebar'
import Authorized from '../../src/components/Authorized'
import { useGetCurrentPlayerQuery } from '../../src/features/player/playerApiSlice'

const Game = () => {
  // const { data } = useGetCurrentPlayerQuery()
  // console.log('data', data)
  return (
    <Authorized>
      <Sidebar>
        <Home />
      </Sidebar>
    </Authorized>
  )
}

export default Game
