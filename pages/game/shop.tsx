import Quests from '../../src/components/Quests/Quests'
import Sidebar from '../../src/components/Sidebar'
import Authorized from '../../src/components/Authorized'
import Shop from '../../src/components/Shop'

const ShopPage = () => {
  return (
    <Authorized>
      <Sidebar>
        <Shop />
      </Sidebar>
    </Authorized>
  )
}

export default ShopPage
