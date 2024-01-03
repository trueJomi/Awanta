import React from 'react'
import { useNavigate } from 'react-router-dom'
import { pngTitulo } from '../../contexts/images.context'

const SubscribePage: React.FC = () => {
  const navigate = useNavigate()

  return (
        <div className="fixed flex bg-main-blue bottom-0 justify-center left-0 items-center z-20 h-full w-full content-center" >
            <div className="text-xl text-main-white" >
                Suscribete a <img className='h-20' src={pngTitulo} />
                <div className="text-end" >y gestiona tus finazas</div>
                <div className="text-center mt-10" >
                    <button
                    onClick={() => {
                      navigate('/auth')
                    }}
                    className=" bg-main-yellow text-main-brown font-extrabold p-3 rounded-full" >
                        Inicia sesión Aqui
                    </button>
                </div>
            </div>
        </div>
  )
}

export default SubscribePage
