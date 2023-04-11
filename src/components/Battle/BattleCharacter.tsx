import { Box, Image, Text, Progress } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import AttackNormal from '../../icons/AttackNormal'
import AttackFire from '../../icons/AttackFire'
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import HeartIcon from '../../icons/HeartIcon'
import fireAnimation from './fire-animation.json'
import swordAnimation from './sword-hit.json'
import lightningAnimation from './lightning-animation.json'
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
            // initial={{ left: 0, scale: 0 }}
            // animate={{ left: 25, scale: 1.3, opacity: 1 }}
            // exit={{ left: 75, scale: 0, opacity: 0 }}
            initial={{
              left: 0,
            }}
            animate={{
              left: 30,
              scale: 1.3,
              opacity: 1,
            }}
            exit={{ left: 75, scale: 0, opacity: 0 }}

            // display='flex'
            // flexDirection={'column'}
          >
            <Text
              as={motion.p}
              margin={'auto'}
              textAlign={'center'}
              color={'red'}
              fontSize='2xl'
              fontFamily={'heading'}
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
                position={'absolute'}
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
                  style={{ position: 'absolute', width: '100%' }}
                  animationData={criticalAnimation}
                />
                Cios krytyczny
              </Text>
            )}
            {playerAttack === AttackType.FIRE && (
              <Lottie
                style={{ position: 'absolute', width: '120%' }}
                animationData={fireAnimation}
              />
            )}
            {playerAttack === AttackType.ELECTRIC && (
              <Lottie animationData={lightningAnimation} />
            )}
          </Box>
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {/* {healthPoints > 0 && ( */}
        <Box
          as={motion.div}
          padding={4}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          visibility={healthPoints <= 0 ? 'hidden' : 'visible'}
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
              // width='100px'
              // height='100px'
              src={enemyImage}
              // '/monsters/cursed-pig-transparent.png'
            />
          </motion.div>
        </Box>
        {/* )} */}
      </AnimatePresence>
    </Box>
  )
}

export default BattleCharacter
