import React, { useMemo, useState } from 'react'
import { type Transaccion } from '../../models/Transaccion.model'
import ModalAddCattegory from './components/ModalAddCattegory.component'
import { filtroVisivility } from '../../utilities/filters.utilities'

import './organizate.css'
import { useAuth } from '../../hooks/Auth.hook'
import { TransactionService } from '../../services/Transaction.service'
import { useTranslation } from 'react-i18next'
import { getUserId } from '../../services/AuthFirebase.service'
import ModalDeleteCategory from './components/ModalDeleteCategory.component'
import { obtainAllByCategory } from '../../adapters/Transaccion.adapter'
import { Fab, IconButton, Tooltip } from '@mui/material'
import { MdAdd, MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import CatergoryColum from './components/CategoryColum.component'
import { type Usuario } from '../../models/Usuario.model'
import { useSearchParams } from 'react-router-dom'
import { getMonthStringCurrent } from '../../utilities/month.utilities'
import DroplableSkeleton from './components/DroplableSkeleton.component'
import { DragDropContext, type DropResult } from 'react-beautiful-dnd'
import CatergoryColumMovil from './components/CategoryColumMovil.component'
import { useModalAddCategoriaStore } from '../../store/modal.store'

const transactionService = new TransactionService()

const getMonth = (page: number) => {
  const date = new Date()
  const correntMonth = date.getMonth() - (page - 1)
  return correntMonth
}

const getTransactions = (mas: number, currentMonth: number, user: Usuario, fun: (data: Transaccion[]) => void) => {
  const tranformMont = currentMonth - mas
  return transactionService.getWithMonthIntervalListener(getUserId(), user.diaInicial, tranformMont, 'desc', (t) => {
    const dataFiltred = t.filter(filtroVisivility)
    fun(dataFiltred)
  })
}

const OrganizarGastosPage: React.FC = () => {
  const { user } = useAuth()
  const { t, i18n } = useTranslation()
  const { setModal } = useModalAddCategoriaStore((state) => state)
  const [searchParams, setSearchParams] = useSearchParams()
  const [prevTransactions, setPrevTransactions] = React.useState<Transaccion[] | undefined >(undefined)
  const [nextTransactions, setNextTransactions] = React.useState<Transaccion[] | undefined>(undefined)
  const [currentTransactions, setCurrentTransactions] = useState<Transaccion[] | undefined>(undefined)
  const currentData = useMemo(() => {
    if (currentTransactions !== undefined && user !== undefined) {
      return obtainAllByCategory(currentTransactions, user.categoria)
    } else {
      return undefined
    }
  }, [user, currentTransactions])
  const [width, setWidth] = useState(window.innerWidth)

  const page = useMemo(() => {
    const page = searchParams.get('page')
    if (page === null) {
      return 1
    } else {
      return +page
    }
  }, [searchParams])

  const move = (move: number) => {
    setSearchParams((prev) => {
      prev.set('page', (page + move).toString())
      return prev
    })
  }

  const goNext = () => {
    move(1)
    setPrevTransactions(currentTransactions)
    setCurrentTransactions(nextTransactions)
    setNextTransactions(undefined)
  }

  const goPrev = () => {
    move(-1)
    setCurrentTransactions(prevTransactions)
    setNextTransactions(currentTransactions)
    setPrevTransactions(undefined)
  }

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result
    if (destination === undefined || destination === null) {
      return
    } else if (source.index === destination.index &&
      source.droppableId === destination.droppableId) {
      return
    }
    if (source.droppableId !== destination.droppableId) {
      if (currentData !== undefined) {
        for (const cat of currentData) {
          if (cat.category.nombre === source.droppableId) {
            const transac = cat.data[source.index]
            void transactionService.changeCategorias(destination.droppableId, getUserId(), transac.id)
          }
        }
      }
    }
  }
  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  React.useEffect(() => {
    if (nextTransactions === undefined && user !== undefined) {
      return getTransactions(1, getMonth(page), user, setNextTransactions)
    }
  }, [user, page])
  React.useEffect(() => {
    if (user !== undefined) {
      return getTransactions(0, getMonth(page), user, setCurrentTransactions)
    }
  }, [user, page])
  React.useEffect(() => {
    if (prevTransactions === undefined && user !== undefined) {
      return getTransactions(-1, getMonth(page), user, setPrevTransactions)
    }
  }, [user, page])
  // console.log(activeTransaction)
  return (
    <>
      <div className='relative overflow-auto h-[calc(100vh-10.8rem)] px-5' >
          <div className=' flex items-center justify-center font-bold' >
            <Tooltip title={t('tab-3.button-pre')} >
              <span>
                <IconButton
                disabled={page === 1}
                onClick={goPrev}>
                  <MdNavigateBefore/>
                </IconButton>
              </span>
            </Tooltip>
            <h1 className=' mx-2 text-xl' >{getMonthStringCurrent(page, i18n.language).month} {getMonthStringCurrent(page, i18n.language).year}</h1>
            <Tooltip title={t('tab-3.button-next')}>
              <span>
                <IconButton
                disabled={!(nextTransactions !== undefined && nextTransactions.length !== 0)}
                onClick={goNext} >
                  <MdNavigateNext/>
                </IconButton>
              </span>
            </Tooltip>
          </div>
          <div className='sm:inline-flex gap-4' >
              <DragDropContext
                onDragEnd={handleDragEnd}
                >
                    {(currentData !== undefined)
                      ? currentData.map((columData) => (
                        width > 640
                          ? <CatergoryColum
                              key ={columData.category.nombre}
                              categoria={columData.category}
                              transactions={columData.data}
                            />
                          : <CatergoryColumMovil
                            key ={columData.category.nombre}
                            categoria={columData.category}
                            transactions={columData.data}
                          />
                      ))
                      : <DroplableSkeleton/>}
              </DragDropContext>
          </div>
          {width > 640
            ? <Fab
                  className='!bg-main-blue !text-main-white !z-30 !fixed bottom-7 right-7 !flex'
                  size='large'
                  variant='extended'
                  onClick={() => { setModal(true) }} color='inherit' aria-label="add">
                  {t('tab-2.add')} <MdAdd className='text-2xl ml-2' />
              </Fab>
            : <Tooltip title={t('tab-2.add')} >
                  <Fab
                      className='!bg-main-blue !text-main-white !z-30 !fixed bottom-7 right-7'
                      size='large'
                      variant='circular'
                      onClick={() => { setModal(true) }} color='inherit' aria-label="add">
                      <MdAdd className='text-2xl' />
                  </Fab>
              </Tooltip>}

      </div>
      <ModalDeleteCategory/>
      <ModalAddCattegory />
    </>
  )
}

export default OrganizarGastosPage
