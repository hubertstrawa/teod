import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Button,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
import { useGetPlayersHighscoresQuery } from '../features/player/playerApiSlice'
const Highscores = () => {
  const { data: players } = useGetPlayersHighscoresQuery()
  return !!players ? (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>TEOD 2023</TableCaption>
        <Thead>
          <Tr>
            <Th>Nazwa gracza</Th>
            <Th>Level</Th>
            <Th>Gildia</Th>
            <Th>Dołączył/a</Th>
            <Th>Szczegóły</Th>
          </Tr>
        </Thead>
        <Tbody>
          {players?.data?.map((player) => {
            return (
              <Tr>
                <Td>{player.playerName}</Td>
                <Td>{player.level}</Td>
                <Td>-</Td>
                <Td>{player.createdAt.slice(0, 10)}</Td>
                <Td>
                  <Button isDisabled>Zobacz profil</Button>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  ) : null
}

export default Highscores
