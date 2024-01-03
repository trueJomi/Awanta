import React from 'react'
import { type LayoutNav } from '../models/utils/Layout.model'
import { useTranslation } from 'react-i18next'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/Auth.hook'
import { Button, Popover } from '@mui/material'
import { MdPerson, MdSettings, MdLogout } from 'react-icons/md'
import { getUserId, logOut } from '../services/AuthFirebase.service'
import ModalAlertSegure from './Custom/ModalAlertSegure.component'
import { TransactionService } from '../services/Transaction.service'
import { useServiceModal } from '../hooks/Modal.hook'
import IconSqueleton from './Squeletons/IconSqueleton.component'

const solutions = [
  { name: 'Usuario', icon: MdPerson, path: '/user' },
  { name: 'Opciones', icon: MdSettings, path: '/settings' }
]
const transactionService = new TransactionService()

const Layout: React.FC<{ navLinks: LayoutNav[] }> = ({ navLinks }) => {
  const currentRoute = navLinks.findIndex((element) => {
    return element.path === window.location.pathname
  })

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | undefined>(undefined)
  const [active, setActive] = React.useState<number>(currentRoute)

  const { alertDelete } = useServiceModal()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
   <>
      <header className="relative mt-5 mx-5 grid grid-cols-12">
          <div className='flex items-center justify-between col-span-12' >
            { user !== undefined
              ? <Button
                    variant='outlined'
                    color='inherit'
                    aria-describedby={id} className="!border-2 !p-0 !rounded-full !border-main-blue outline-none !w-16 !h-16" onClick={(event) => {
                      setAnchorEl(event.currentTarget)
                    }}>
                      <img
                          className="rounded-full w-full h-full"
                          src={user?.img}
                      />
                </Button>
              : <IconSqueleton/>}
            <Button
            onClick={() => {
              navigate('/transaction')
            }}
            color='inherit'
            className="!py-3 !px-4 !capitalize !font-bold !bg-main-blue !text-main-white  mt-2 !rounded-full" >
                {t('layout.button-add')}
            </Button>
          </div>
          <div className=" py-2 col-span-12 w-full my-1 overflow-hidden overflow-x-auto" >
              <nav className="inline-flex w-full" >
                  {navLinks.map((item, indx) => (
                      <a
                      key={indx}
                      onClick={() => {
                        setActive(indx)
                        navigate(item.path)
                      }}
                      className={`group px-3 font-bold ${active === indx ? ' text-main-blue dark:text-main-yellow' : 'text-gray-400'} uppercase hover:text-main-blue dark:hover:text-main-yellow py-4`}>
                          {item.name}
                          <div className={`h-1 -mt-3 bg-main-blue dark:bg-main-yellow rounded-t-xl  ${active === indx ? ' translate-y-3 duration-500 opacity-100' : ' opacity-0 translate-y-5 duration-300 group-hover:translate-y-3 group-hover:opacity-100 '}`} ></div>
                      </a>
                  ))}
              </nav>
          </div>
      </header>
      <main className="pt-4 h-full" >
          <Outlet/>
      </main>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={() => { setAnchorEl(undefined) }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}>
          <div className="max-w-md flex-auto overflow-hidden rounded-sm bg-white dark:bg-slate-800 text-sm leading-6 shadow-lg ring-1 ring-main-blue/50">
              <div className="">
              {solutions.map((item, index) => (
                  <a
                      key={index}
                      onClick={() => {
                        navigate(item.path)
                      }}
                      className="py-4 px-5 mr-0 group relative filter flex gap-x-6 hover:bg-main-blue/80 dark:hover:bg-main-blue/30 duration-300 cursor-pointer">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-500 group-hover:bg-white  dark:group-hover:bg-gray-500">
                          <item.icon className="h-6 w-6 text-gray-400 group-hover:text-main-blue dark:group-hover:text-gray-50 " aria-hidden="true" />
                      </div>
                      <div className="justify-center items-center flex" >
                          <span className="font-semibold text-gray-900 dark:text-gray-400 group-hover:text-gray-50">
                              {item.name}
                          </span>
                      </div>
                  </a>
              ))}
              </div>
              <div className="grid divide-x divide-gray-900/5 bg-gray-100 dark:bg-gray-800">
                <button
                onClick={() => {
                  void logOut()
                }}
                className="group flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-white filter-none duration-300"
                >
                    <div className="h-5 w-5 flex-none text-gray-400 group-hover:text-red-600 duration-300 text-xl pr-7" aria-hidden="true" >
                      <MdLogout/>
                    </div>
                    <span className="group-hover:text-red-600 duration-300 text-gray-400">
                      Log Out
                    </span>
                </button>
              </div>
          </div>
      </Popover>
      <ModalAlertSegure funtion={() => {
        void transactionService.delete(getUserId(), alertDelete.constents as string)
      }} text={'Esta seguro de eliminar la siguiente transaccion?'} />
   </>
  )
}

export default Layout
