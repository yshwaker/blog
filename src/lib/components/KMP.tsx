import { useState, type ReactNode } from 'react'

type KMPProps = {
  demo?: 1 | 2
}

const cellClass =
  '-ml-0.5 w-9 h-9 text-sm md:text-base min-w-0 border-2 border-black flex justify-center items-center bg-gray-50'

export function KMP({ demo = 1 }: KMPProps) {
  const [offset, setOffset] = useState(0)

  if (demo === 2) {
    return <SecondDemo />
  }

  const text = 'abcabx?'
  const pattern = 'abcabd'

  return (
    <div className="border-2 border-dashed rounded-lg border-gray-400 p-4">
      <div className="flex flex-row">
        {Array.from(text).map((char, index) => (
          <Cell key={`${char}-${index}`}>{char}</Cell>
        ))}
      </div>
      <div
        className="inline-flex flex-row mt-2 relative"
        style={{ left: `${(offset * 8.5) / 4}rem` }}
      >
        {Array.from(pattern).map((char, index) => {
          const color = text[index + offset] === char ? 'bg-green-300' : 'bg-red-300'

          return (
            <Cell key={`${char}-${index}`} className={color}>
              {char}
            </Cell>
          )
        })}
      </div>
      <div className="mt-2">
        <button
          type="button"
          className="btn-small"
          onClick={() => setOffset((value) => Math.max(0, value - 1))}
        >
          向左移动
        </button>
        <button
          type="button"
          className="btn-small ml-2"
          onClick={() => setOffset((value) => Math.min(3, value + 1))}
        >
          向右移动
        </button>
      </div>
    </div>
  )
}

function SecondDemo() {
  const text = 'abcabdddabcabc'
  const next = '0001200012345?'
  const indexes = Array.from({ length: 14 }, (_, index) => index + 1)

  return (
    <div className="border-2 border-dashed rounded-lg border-gray-400 p-2 md:p-4">
      <div className="flex flex-row items-center">
        <label className="w-20 hidden md:block">主串 T：</label>
        <label className="w-4 text-sm md:hidden">T：</label>
        {Array.from(text).map((char, index) => {
          const color =
            index < 5 || (index >= 8 && index <= 12)
              ? 'bg-green-300'
              : index === 5 || index === 13
                ? 'bg-red-300'
                : ''

          return (
            <Cell key={`${char}-${index}`} className={color}>
              {char}
            </Cell>
          )
        })}
      </div>
      <div className="flex flex-row mt-2 items-center">
        <label className="w-20 hidden md:block">Index：</label>
        <label className="w-4 text-sm md:hidden">I：</label>
        {indexes.map((char, index) => {
          const displayChar = index === 5 ? 'now' : index === 13 ? 'x' : char

          return <Cell key={char}>{displayChar}</Cell>
        })}
      </div>
      <div className="flex flex-row mt-2 items-center">
        <label className="w-20 hidden md:block">模式串 P：</label>
        <label className="w-4 text-sm md:hidden">P：</label>
        {Array.from(next).map((char, index) => (
          <Cell key={`${char}-${index}`}>{char}</Cell>
        ))}
      </div>
    </div>
  )
}

function Cell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${cellClass} ${className}`}>{children}</div>
}
