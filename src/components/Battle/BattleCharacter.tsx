import { Box, Image, Text, Progress } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import AttackNormal from '../../icons/AttackNormal'
import AttackFire from '../../icons/AttackFire'
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import HeartIcon from '../../icons/HeartIcon'
import fireAnimation from './fire-animation.json'
import swordAnimation from './sword-hit.json'
import lightningAnimation from './red-lightning-animation.json'
import criticalAnimation from './critical-animation.json'

import { AttackType } from './Battle'
const BattleCharacter = ({
  healthPoints,
  isLoading,
  enemyImage,
  maxHealthPoints,
  playerAttackValue,
  playerAttack,
  playerCritical,
}: any) => {
  const healthPercent = (100 * healthPoints) / maxHealthPoints
  const [playerHit, setPlayerHit] = useState(0)
  console.log('PLAYER CRIT', playerCritical)

  console.log('ISLOADINGINGING', isLoading)

  useEffect(() => {
    setPlayerHit(playerAttackValue)
    const timer = setTimeout(() => {
      setPlayerHit(0)
    }, 900)

    return () => clearTimeout(timer)
  }, [playerAttackValue])
  return (
    <Box position={'relative'}>
      <AnimatePresence>
        {playerHit > 0 ? (
          <Box
            as={motion.div}
            position={'absolute'}
            top={-12}
            left={4}
            // display='flex'
            // flexDirection={'column'}
          >
            <Text
              as={motion.p}
              initial={{ left: 0 }}
              animate={{ left: 25, scale: 1.3, opacity: 1 }}
              exit={{ left: 75, scale: 0, opacity: 0 }}
              margin={'auto'}
              textAlign={'center'}
              color={'red'}
              display={'flex'}
            >
              - {playerAttackValue} HP
              {/* {playerAttack === AttackType.NORMAL && <AttackNormal />} */}
            </Text>
            {playerCritical && (
              <Text
                as={motion.p}
                initial={{ left: 0 }}
                animate={{ left: 25, scale: 1.3, opacity: 1 }}
                exit={{ left: 75, scale: 0, opacity: 0 }}
                marginTop={'130px'}
                position={'relative'}
                color='orange'
                fontSize={'md'}
                textTransform={'uppercase'}
                width='150px'
                display='flex'
                justifyContent={'center'}
                alignItems={'center'}
                top={-10}
              >
                <Lottie
                  style={{ position: 'absolute' }}
                  animationData={criticalAnimation}
                />
                Cios krytyczny
              </Text>
            )}
            {playerAttack === AttackType.FIRE && (
              <Lottie animationData={fireAnimation} />
            )}
          </Box>
        ) : null}
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
              colorScheme='green'
              size={'sm'}
              isIndeterminate={isLoading}
              value={healthPercent}
              isAnimated
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.4 }}
            >
              <Image
                width='100px'
                height='100px'
                src={enemyImage}
                // '/monsters/cursed-pig-transparent.png'
              />
            </motion.div>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default BattleCharacter
