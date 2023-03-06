import Equippment from '../../src/components/Equippment'
import Sidebar from '../../src/components/Sidebar'
import Authorized from '../../src/components/Authorized'

const Equipment = () => {
  return (
    <Authorized>
      <Sidebar>
        <Equippment />
      </Sidebar>
    </Authorized>
  )
}

export default Equipment
