import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { useEffect } from 'react'

import theme from '../src/theme'
import { store } from '../src/store'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const loader = document.getElementById('globalLoader')
      if (loader) loader.remove()
    }
  }, [])
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {/* <Head>
          <title>The End Of Days</title>
        </Head> */}
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
