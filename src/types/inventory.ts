export interface IItem {
  name: string
  description: string
  image: string
  state: 'common' | 'rare' | 'heroic' | 'epic'
  attack?: number
  defense?: number
  type: string
}
