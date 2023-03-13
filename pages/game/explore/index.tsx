import Home from '../../../src/components/Home'
import Sidebar from '../../../src/components/Sidebar'
import Authorized from '../../../src/components/Authorized'
import Locations from '../../../src/components/Locations'
import IntroTutorial from '../../../src/components/Tutorial/IntroTutorial'

const ExplorePage = () => {
  return (
    <Authorized>
      <Sidebar>
        <Locations />
        {/* <IntroTutorial /> */}
      </Sidebar>
    </Authorized>
  )
}

export default ExplorePage
