import Quests from '../../src/components/Quests/Quests'
import Sidebar from '../../src/components/Sidebar'
import Authorized from '../../src/components/Authorized'
import Highscores from '../../src/components/Highscores'

const HighscoresPage = () => {
  return (
    <Authorized>
      <Sidebar>
        <Highscores />
      </Sidebar>
    </Authorized>
  )
}

export default HighscoresPage
