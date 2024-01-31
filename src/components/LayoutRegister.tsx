import React from 'react'
import { Outlet } from 'react-router-dom'

const LayoutRegister: React.FC = () => {
  return (
    <div>
      <h1>LayoutRegister</h1>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default LayoutRegister
