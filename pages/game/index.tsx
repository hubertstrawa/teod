import Home from '../../src/components/Home'
import Sidebar from '../../src/components/Sidebar'
import Authorized from '../../src/components/Authorized'

const Game = () => {
  return (
    <Authorized>
      <Sidebar>
        <Home />
      </Sidebar>
    </Authorized>
  )
}

export default Game
