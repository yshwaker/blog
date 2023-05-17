import { useEffect, useState } from 'react'

export const VisuallyHidden = ({ children, ...delegated }) => {
  const [show, setShow] = useState<boolean>(false)

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Alt') {
          setShow(true)
        }
      }

      const handleKeyUp = (event: KeyboardEvent) => {
        if (event.key === 'Alt') {
          setShow(false)
        }
      }

      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)

      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keydown', handleKeyUp)
      }
    }
  }, [])

  if (show) {
    return children
  }

  return (
    <span
      className="inline-block absolute overflow-hidden h-[1px] w-[1px] m-[-1px] p-0 border-0 clip-hidden"
      {...delegated}
    >
      {children}
    </span>
  )
}
