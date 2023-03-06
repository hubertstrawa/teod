import Quests from '../../src/components/Quests'
import Sidebar from '../../src/components/Sidebar'
import Authorized from '../../src/components/Authorized'

const Equipment = () => {
  return (
    <Authorized>
      <Sidebar>
        <Quests />
      </Sidebar>
    </Authorized>
  )
}

export default Equipment
