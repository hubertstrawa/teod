import { Box, Image, Text, Progress } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PlayerCharacter = ({
  healthPoints,
  maxHealthPoints,
  enemyAttackValue,
  isLoading,
  playerDodge,
}: any) => {
  const healthPercent = (100 * healthPoints) / maxHealthPoints
  const [enemyHit, setEnemyHit] = useState(0)
  const [dodge, setDodge] = useState(null)

  console.log('ISLOADINGINGING', isLoading)

  useEffect(() => {
    setEnemyHit(enemyAttackValue)
    setDodge(playerDodge)

    const timer = setTimeout(() => {
      setEnemyHit(0)
      setDodge(0)
    }, 700)

    return () => clearTimeout(timer)
  }, [enemyAttackValue])

  // console.log('enemyHIT', enemyHit)

  return (
    <Box position={'relative'}>
      <AnimatePresence>
        {enemyHit > 0 ? (
          <Text
            as={motion.p}
            position={'absolute'}
            top={-8}
            initial={{
              left: 0,
            }}
            animate={{
              left: 25,
              scale: 1.3,
              opacity: 1,
              // transition: {
              //   type: 'spring',
              //   stiffness: 150,
              //   delay: 3,
              //   duration: 2,
              // },
            }}
            exit={{ left: 75, scale: 0, opacity: 0 }}
            margin={'auto'}
            textAlign={'center'}
            color={'red'}
            display={'flex'}
          >
            - {enemyHit} HP
          </Text>
        ) : null}
      </AnimatePresence>
      {/* <AnimatePresence>
        {enemyHit > 0 ? (
          <motion.div
            initial={{ left: -100 }}
            // transition={{ delay: -1 }}
            animate={{ left: 25, scale: 1.3, opacity: 1 }}
            exit={{ left: 75, scale: 0, opacity: 0 }}
          >
            <Text
              margin={'auto'}
              textAlign={'center'}
              top={-8}
              position={'absolute'}
              color={'red'}
            >
              - {enemyHit} HPp
            </Text>
          </motion.div>
        ) : null}
      </AnimatePresence> */}
      <AnimatePresence>
        {!!dodge && (
          <Text
            as={motion.p}
            top={-12}
            initial={{ left: 0 }}
            animate={{ left: 25, scale: 1.3, opacity: 1 }}
            exit={{ left: 75, scale: 0, opacity: 0 }}
            textShadow={'4px 3px 0px #fff, 9px 8px 0px rgba(0,0,0,0.15)'}
            bgGradient='linear(to-l, gray.100, gray.500)'
            // boxShadow={'2xl'}
            letterSpacing={2}
            // textShadow={'2px 2px #ff0000'}
            bgClip='text'
            fontSize={'2xl'}
            fontWeight={'extrabold'}
            position='absolute'
          >
            UNIK!
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
            <Progress
              isIndeterminate={isLoading}
              colorScheme='green'
              size={'sm'}
              value={healthPercent}
            />
            <Image
              width='100px'
              height='100px'
              src={'/images/warrior-no-bg.png'}
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
