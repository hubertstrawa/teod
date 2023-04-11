import Sidebar from '../../src/components/Sidebar'
import Treasures from '../../src/components/Treasures/Treasures'
import Authorized from '../../src/components/Authorized'

const MagicBookPage = () => {
  return (
    <Authorized>
      <Sidebar>
        <Treasures />
      </Sidebar>
    </Authorized>
  )
}

export default MagicBookPage
