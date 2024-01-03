import { IconButton } from '@mui/material'
import React from 'react'
import { MdArrowBackIosNew } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

const LayoutReturn: React.FC<{ children: any, name: string }> = ({ children, name }) => {
  const navigate = useNavigate()

  return (
        <>
            <aside className="py-6 px-5 relative flex justify-center" >
                <IconButton className="!text-main-brown dark:!text-main-white !absolute left-5" onClick={() => {
                  navigate(-1)
                }} >
                    <MdArrowBackIosNew />
                </IconButton>
                <span className="text-2xl font-black text-BrownMain  dark:text-whiteBase uppercase col-start-2 col-span-5 text-center" >
                    {name}
                </span>
            </aside>
            <main className='px-5' >
                {children}
            </main>
        </>
  )
}

export default LayoutReturn
