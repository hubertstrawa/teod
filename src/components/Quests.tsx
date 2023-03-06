import Inventory from './Inventory'
import { Box, Grid } from '@chakra-ui/react'
import { RootState } from '../store'
import { useSelector, useDispatch } from 'react-redux'
import woodenBg from '../assets/woodenbg.png'
import PlayerBadge from './PlayerBadge'
import { useGetCurrentPlayerQuery } from '../features/player/playerApiSlice'

const Quests = () => {
  const { data, isLoading } = useGetCurrentPlayerQuery()

  return (
    <Box
      backgroundImage={'/images/inventory-bg2.png'}
      backgroundSize='100%'
      backgroundRepeat={'no-repeat'}
      backgroundPosition={'center'}
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
        @TODO
      </Grid>
    </Box>
  )
}

export default Quests
