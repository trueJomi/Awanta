import React from 'react'

const DraggableSkeleton: React.FC<{ reference: (node: HTMLElement | null) => void, style: any }> = ({ reference, style }) => {
  return (
    <div ref={reference} style={style}
      className='h-20 mx-4 p-3 mb-2 rounded-md bg-gray-400 opacity-60'
    />
  )
}

export default DraggableSkeleton
