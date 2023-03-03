import { Box, Image, Text, Progress } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

const PlayerCharacter = ({
  healthPoints,
  maxHealthPoints,
  enemyAttackValue,
}: any) => {
  const healthPercent = (100 * healthPoints) / maxHealthPoints
  return (
    <Box position={'relative'}>
      {healthPoints}
      <AnimatePresence>
        {enemyAttackValue > 0 ? (
          <Text
            as={motion.p}
            margin={'auto'}
            textAlign={'center'}
            top={-8}
            initial={{ left: 0 }}
            animate={{ left: 25, scale: 1.3, opacity: 1 }}
            exit={{ left: 0, scale: 0, opacity: 0 }}
            position={'absolute'}
            color={'red'}
          >
            - {enemyAttackValue} HP
          </Text>
        ) : (
          <Text
            as={motion.p}
            margin={'auto'}
            textAlign={'center'}
            top={-8}
            initial={{ left: 0 }}
            animate={{ left: 25, scale: 1.3, opacity: 1 }}
            exit={{ left: 0, scale: 0, opacity: 0 }}
            position={'absolute'}
            color={'red'}
          >
            - {enemyAttackValue} HP
          </Text>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {healthPoints > 0 && (
          <Box
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Progress colorScheme='green' size={'sm'} value={healthPercent} />
            <Image
              width='100px'
              height='100px'
              src={'images/warrior-no-bg.png'}
            />
          </Box>
        )}
      </AnimatePresence>
      {/* <Progress colorScheme='green' size={'sm'} value={healthPercent} />

      <Image width='100px' height='100px' src={playerTexture} /> */}
    </Box>
  )
}

export default PlayerCharacter
