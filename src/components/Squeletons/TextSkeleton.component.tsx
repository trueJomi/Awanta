import React from 'react'

const TextSkeleton: React.FC<{ size?: number }> = ({ size }) => {
  return (
    <div style={{ height: `${size ?? 1.5}rem` }} className='w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800' ></div>
  )
}

export default TextSkeleton
