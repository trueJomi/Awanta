import React from 'react'

const DroplableSkeleton: React.FC = () => {
  return (
    <div className='h-[calc(100vh-14rem)] rounded-2xl w-[calc(100vw-2.3rem)] bg-slate-600 animate-pulse' />
  )
}

export default DroplableSkeleton
