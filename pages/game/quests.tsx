import Quests from '../../src/components/Quests/Quests'
import Sidebar from '../../src/components/Sidebar'
import Authorized from '../../src/components/Authorized'

const QuestsPage = () => {
  return (
    <Authorized>
      <Sidebar>
        <Quests />
      </Sidebar>
    </Authorized>
  )
}

export default QuestsPage
