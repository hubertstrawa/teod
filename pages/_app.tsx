import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import theme from '../src/theme'
import { store } from '../src/store'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
