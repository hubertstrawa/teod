import Sidebar from '../../src/components/Sidebar'
import Spells from '../../src/components/Spells/Spells'
import Authorized from '../../src/components/Authorized'

const MagicBookPage = () => {
  return (
    <Authorized>
      <Sidebar>
        <Spells />
      </Sidebar>
    </Authorized>
  )
}

export default MagicBookPage
