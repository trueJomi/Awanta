import React from 'react'
import TextSkeleton from './TextSkeleton.component'

const MixerGraficSquareSqueleton: React.FC = () => {
  return (
          <div className=' bg-gray-100 dark:bg-gray-900 mt-5 px-4 rounded-2xl border-gray-200 border-2 max-w-[38rem] mx-auto'>
            <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 mb-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className='mt-5 ' >
                  <div className=' inline-block w-9 mr-3' >
                    <TextSkeleton size={1.25} />
                  </div>
                  <div className='inline-block w-[calc(100%-5rem)]' >
                    <TextSkeleton size={1.4} />
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}

export default MixerGraficSquareSqueleton
