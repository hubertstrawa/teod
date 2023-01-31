import { useState, useEffect } from 'react'

const usePersist = () => {
  if (typeof window !== undefined || typeof localStorage !== undefined) {
    const [persist, setPersist] = useState(
      JSON.parse(localStorage.getItem('persist')) || false
    )

    useEffect(() => {
      localStorage.setItem('persist', JSON.stringify(persist))
    })

    return [persist, setPersist]
  }
}

export default usePersist
