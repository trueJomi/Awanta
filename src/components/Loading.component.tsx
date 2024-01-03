import React from 'react'
import { pngTitulo } from '../contexts/images.context'

const Loading: React.FC<{ children?: any }> = ({ children }) => {
  return (
    <div className="fixed flex bg-main-blue bottom-0 justify-center left-0 items-center z-20 h-full w-full content-center" >
        <div >
          <img src={pngTitulo} className="max-h-36 px-5  mx-auto"/>
            {children !== undefined &&
                <div className=' text-center text-3xl text-whiteBase mt-2' >
                    cargando  {children}...
                </div>}
        </div>
    </div>
  )
}

export default Loading
