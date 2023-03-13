import { GiCampfire, GiElectric, GiWoodAxe } from 'react-icons/gi'

const IconsElements = ({ variant }) => {
  if (!variant) return null
  const size = 30
  let icon
  // console.log('variananja', variant)
  switch (true) {
    case variant === 'fire':
      icon = <GiCampfire size={size} />
      break
    case variant === 'electric':
      icon = <GiElectric size={size} />
      break
    case variant === 'normal':
      icon = <GiWoodAxe size={size} />
      break
    default:
      return null
  }

  // console.log('klkj', icon)

  return icon
}

export default IconsElements
