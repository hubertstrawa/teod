import Inventory from './Inventory/Inventory'
import { Box, Grid, Spinner, Heading } from '@chakra-ui/react'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import woodenBg from '../assets/woodenbg.png'
import PlayerBadge from './PlayerBadge'
import { useGetCurrentPlayerQuery } from '../features/player/playerApiSlice'
import { GiShop } from 'react-icons/gi'
import InventoryShop from './Inventory/InventoryShop'

const Shop = () => {
  const { data, isLoading } = useGetCurrentPlayerQuery()

  return !!data ? (
    <Box
      backgroundImage={'/images/woodenbg.png'}
      backgroundSize='100%'
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'top'}
      textAlign='center'
      fontSize='xl'
    >
      <Grid
        maxW='full'
        backgroundColor={'rgba(12,12,12, 0.85)'}
        margin='0 auto'
        p={12}
        minH='100vh'
        position={'relative'}
      >
        <PlayerBadge />
        <Heading
          display='flex'
          justifyContent={'center'}
          // alignItems='center'
          // marginTop={2}
        >
          <GiShop style={{ marginRight: '10px' }} />
          Sklep wielobranżowy
        </Heading>
        <InventoryShop />
      </Grid>
    </Box>
  ) : (
    <Spinner size='xl' />
  )
}

export default Shop
