import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Flex,
  CircularProgress,
  CircularProgressLabel,
  Image,
} from '@chakra-ui/react'
import { GiCometSpark } from 'react-icons/gi'

const IMAGE =
  'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80'

const bgImage = (type) => {
  if (type === 'electric') {
    return '/spells/blyskawica-bad.png'
  }
  if (type === 'fire') {
    return '/spells/ogniste-uderzenie.png'
  }

  return null
}

const SpellBox = ({ player }) => {
  const spells = player?.data?.spells

  return !!spells.length ? (
    <Flex py={12} gap={10} justifyContent={'center'}>
      {spells.map((spell) => (
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'xl'}
          pos={'relative'}
          zIndex={1}
        >
          <Box
            rounded={'lg'}
            mt={-10}
            pos={'relative'}
            _after={{
              transition: 'all .3s ease',
              content: '""',
              w: 'full',
              h: 'full',
              pos: 'absolute',
              top: -5,
              left: 0,
              // backgroundImage: `url(${IMAGE})`,
              backgroundColor:
                (spell.spellType === 'fire' && '#e25822') ||
                (spell.spellType === 'electric' && 'purple'),
              backgroundPosition: 'center',
              filter: 'blur(50px)',
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: 'blur(100px)',
              },
            }}
          >
            <Image
              rounded={'lg'}
              height={'100%'}
              width={'200px'}
              margin='0 auto'
              objectFit={'cover'}
              src={bgImage(spell.spellType)}
            />
          </Box>
          <Stack pt={10} align={'center'}>
            <Text
              color={'gray.500'}
              fontSize={'sm'}
              textTransform={'uppercase'}
            >
              Czar ofensywny
            </Text>
            <Heading paddingBottom={4} fontSize={'3xl'} fontWeight={500}>
              {spell.name}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Heading
                paddingRight={1}
                color={'gray.300'}
                fontWeight={800}
                fontSize={'xl'}
              >
                Moc: {spell.power}
              </Heading>

              <CircularProgress
                size='2rem'
                value={spell.spellLevel}
                trackColor='gray.500'
                color='orange'
              >
                <CircularProgressLabel fontSize='md'>
                  {spell.spellLevel}
                </CircularProgressLabel>
              </CircularProgress>
            </Stack>
            <Stack>
              {spell.name === 'Ogniste uderzenie' && (
                <Text display='flex' alignItems='center' fontSize='md'>
                  <GiCometSpark style={{ marginRight: '0.5rem' }} />{' '}
                  {spell.power +
                    player.data.attributes.eqIntelligence +
                    player.data.attributes.intelligence -
                    2}
                  {' - '}
                  {spell.power +
                    player.data.attributes.eqIntelligence +
                    player.data.attributes.intelligence +
                    5}
                  {/* 
                  {spell.power +
                    // player.data.level +
                    player.data.attributes.intelligence -
                    2}
                  {' - '}
                  {spell.power +
                    // player.data.level +
                    player.data.attributes.intelligence +
                    5} */}
                </Text>
              )}
              {spell.name === 'Błyskawica' && (
                <Text display='flex' alignItems='center' fontSize='md'>
                  <GiCometSpark style={{ marginRight: '0.5rem' }} />{' '}
                  {spell.spellLevel +
                    (player.data.attributes.intelligence +
                      player.data.attributes.eqIntelligence / 2)}
                  {' - '}
                  {spell.spellLevel +
                    spell.power +
                    player.data.attributes.eqIntelligence +
                    player.data.attributes.intelligence +
                    10}
                </Text>
              )}
            </Stack>
          </Stack>
        </Box>
      ))}
    </Flex>
  ) : (
    <Heading>Nie posiadasz zadnych czarów</Heading>
  )
}

export default SpellBox
