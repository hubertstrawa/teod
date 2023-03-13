import Lottie from 'lottie-react'
import loadingAnimation from './loading-animation.json'
import { Spinner, Box } from '@chakra-ui/react'

const Loader = ({ children, isLoading }) => {
  return isLoading ? (
    <Box position={'relative'} opacity={0.5}>
      <Spinner top={'50%'} position={'absolute'} />
      {children}
    </Box>
  ) : (
    <div>{children}</div>
  )
}

export default Loader
