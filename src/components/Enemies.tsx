import { Flex } from '@chakra-ui/react'
import { useSelector, useDispatch } from 'react-redux'
import { setPlayerStats } from '../features/player/playerSlice'
import { RootState } from '../store'
import Enemy from './Enemy'

const Enemies = () => {
  return null
  // const {
  //   name,
  //   healthPoints,
  //   manaPoints,
  //   power,
  //   mantleCondition,
  //   experience,
  //   avatar,
  //   race,
  //   level,
  //   money,
  // } = useSelector((state: RootState) => state.player)
  // const dispatch = useDispatch()

  // const handleFight = (enemy: any) => {
  //   console.log(`${name} WON!`)

  //   let playerHp = healthPoints
  //   let {
  //     healthPoints: enemyHp,
  //     power: enemyPower,
  //     name: enemyName,
  //     level: enemyLevel,
  //   } = enemy
  //   const logs = []
  //   while (enemyHp >= 0 || playerHp >= 0) {
  //     const hitPlayerEnemy = Math.random() * power
  //     enemyHp = enemyHp - hitPlayerEnemy
  //     logs.push(
  //       `${enemyName} traci ${hitPlayerEnemy.toFixed(
  //         2
  //       )} punktów zdrowia. Pozostało mu ${enemyHp.toFixed(2)} punktów zdrowia.`
  //     )

  //     if (enemyHp <= 0) {
  //       // Player won the fight
  //       const expGained = (enemyLevel + enemyPower * 2) / level

  //       dispatch(
  //         setPlayerStats({
  //           healthPoints: +playerHp.toFixed(2),
  //           mantleCondition,
  //           experience: experience + expGained,
  //           money: money + enemyPower / level,
  //         })
  //       )
  //       logs.push(`${name} WYGRYWA! Zdobyto ${expGained} exp`)
  //       break
  //     }
  //     const hitEnemyPlayer = Math.random() * enemyPower
  //     playerHp = playerHp - hitEnemyPlayer
  //     logs.push(
  //       `${name} traci ${hitEnemyPlayer.toFixed(
  //         2
  //       )} punktów zdrowia. Pozostało mu ${playerHp.toFixed(
  //         2
  //       )} punktów zdrowia.`
  //     )

  //     if (playerHp <= 0) {
  //       // Enemy won the fight
  //       dispatch(
  //         setPlayerStats({
  //           healthPoints: 0,
  //           mantleCondition: mantleCondition - 10,
  //         })
  //       )
  //       logs.push(`${enemyName} WYGRYWA!`)

  //       break
  //     }
  //   }
  //   // setBattleLogs(logs)

  //   // onOpen()
  // }

  // return (
  //   <Flex gap={10}>
  //     <Enemy
  //       fight={handleFight}
  //       name='Wolf'
  //       healthPoints={50}
  //       level={2}
  //       power={5}
  //       image='https://play-lh.googleusercontent.com/iGIMssQACw5vq2SkVq45rcKfmpZ7bldxXbboAmzmT0mnoAEmmIFWphJKS9arE8s_LU4'
  //     />
  //     <Enemy
  //       fight={handleFight}
  //       name='Super Wolf'
  //       healthPoints={80}
  //       level={3}
  //       power={10}
  //       image='https://play-lh.googleusercontent.com/iGIMssQACw5vq2SkVq45rcKfmpZ7bldxXbboAmzmT0mnoAEmmIFWphJKS9arE8s_LU4'
  //     />
  //     <Enemy
  //       fight={handleFight}
  //       name='Weirdo'
  //       healthPoints={100}
  //       level={3}
  //       power={10}
  //       image='https://cdn-icons-png.flaticon.com/512/663/663106.png'
  //     />
  //     <Enemy
  //       fight={handleFight}
  //       name='Little Demon'
  //       healthPoints={200}
  //       level={5}
  //       power={50}
  //       image='https://cdn-icons-png.flaticon.com/512/2689/2689629.png'
  //     />
  //   </Flex>
  // )
}

export default Enemies
