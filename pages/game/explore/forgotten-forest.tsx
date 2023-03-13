import Home from '../../../src/components/Home'
import Sidebar from '../../../src/components/Sidebar'
import Authorized from '../../../src/components/Authorized'
import Locations from '../../../src/components/Locations'
import ForgottenForest from '../../../src/components/Locations/ForgottenForest/ForgottenForest'

const ExplorePage = () => {
  return (
    <Authorized>
      <Sidebar>
        <ForgottenForest />
      </Sidebar>
    </Authorized>
  )
}

export default ExplorePage
