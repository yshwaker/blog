import * as React from 'react'

function Box({ char, className = '' }) {
  return (
    <div
      className={`-ml-0.5  w-9 h-9 text-sm md:text-base min-w-0 border-2 border-black flex justify-center gap items-center bg-gray-50 ${className}`}
    >
      {char}
    </div>
  )
}

export function KMPDemo1() {
  const [offset, setOffset] = React.useState(0)
  const T = 'abcabx?'
  const P = 'abcabd'
  return (
    <div className="border-2 border-dashed rounded-lg border-gray-400 p-4">
      <div className="flex flex-row">
        {Array.from(T).map((char, i) => (
          <Box key={i} char={char} />
        ))}
      </div>
      <div
        className={`inline-flex flex-row mt-2 relative`}
        style={{
          left: `${(offset * 8.5) / 4}rem`,
        }}
      >
        {Array.from(P).map((char, i) => {
          const color = T[i + offset] === P[i] ? 'bg-green-300' : 'bg-red-300'
          return <Box key={i} char={char} className={color} />
        })}
      </div>
      <div className="mt-2">
        <button
          type="button"
          className="btn-small"
          onClick={() => offset > 0 && setOffset(offset - 1)}
        >
          向左移动
        </button>
        <button
          type="button"
          className="btn-small ml-2"
          onClick={() => offset < 3 && setOffset(offset + 1)}
        >
          向右移动
        </button>
      </div>
    </div>
  )
}

export function KMPDemo2() {
  const T = 'abcabdddabcabc'
  const index: Array<Number | String> = Array.from(Array(14)).map(
    (_, i) => i + 1
  )
  index[5] = 'now'
  index[13] = 'x'
  const next = '0001200012345?'
  return (
    <div className="border-2 border-dashed rounded-lg border-gray-400 p-2 md:p-4">
      <div className="flex flex-row items-center">
        <label className="w-20 hidden md:block">主串 T：</label>
        <label className="w-4 text-sm md:hidden">T：</label>
        {Array.from(T).map((char, i) => {
          let color = ''
          if (i < 5 || (i >= 8 && i <= 12)) {
            color = 'bg-green-300'
          }
          if (i === 5 || i === 13) {
            color = 'bg-red-300'
          }
          return <Box key={i} char={char} className={color} />
        })}
      </div>
      <div className={`flex flex-row mt-2 items-center`}>
        <label className="w-20 hidden md:block">Index：</label>
        <label className="w-4 text-sm md:hidden">I：</label>
        {Array.from(index).map((char, i) => (
          <Box key={i} char={char} />
        ))}
      </div>
      <div className={`flex flex-row mt-2 items-center`}>
        <label className="w-20 hidden md:block">模式串 P：</label>
        <label className="w-4 text-sm md:hidden">P：</label>
        {Array.from(next).map((char, i) => (
          <Box key={i} char={char} />
        ))}
      </div>
    </div>
  )
}