import React from 'react'

const IconSqueleton: React.FC = () => {
  return (
    <div className='border-2 border-main-blue rounded-full h-16 w-16'>
      <div className='w-full h-full animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full' />
    </div>
  )
}

export default IconSqueleton
