import { Box, Image, Text, Progress } from '@chakra-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import AttackNormal from '../../icons/AttackNormal'
import AttackFire from '../../icons/AttackFire'
import Lottie from 'lottie-react'
import fireAnimation from './fire-animation.json'
import lightningAnimation from './red-lightning-animation.json'

import { AttackType } from './Battle'
const BattleCharacter = ({
  healthPoints,
  maxHealthPoints,
  playerAttackValue,
  playerAttack,
}: any) => {
  const healthPercent = (100 * healthPoints) / maxHealthPoints

  return (
    <Box position={'relative'}>
      <AnimatePresence>
        {playerAttackValue !== 0 && (
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
            display={'flex'}
          >
            - {playerAttackValue}
            {playerAttack === AttackType.NORMAL && <AttackNormal />}
            {/* {playerAttack === AttackType.NORMAL && (
              <Lottie animationData={lightningAnimation} />
            )} */}
            {playerAttack === AttackType.FIRE && (
              <Lottie animationData={fireAnimation} />
            )}
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
              src={'/monsters/cursed-pig-transparent.png'}
            />
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}

export default BattleCharacter
