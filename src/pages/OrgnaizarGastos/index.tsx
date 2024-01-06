import React, { useMemo, useState } from 'react'
import { type Transaccion } from '../../models/Transaccion.model'
import { type Categoria } from '../../models/Categoria.model'
import { useServiceModal } from '../../hooks/Modal.hook'
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
import { DndContext, DragOverlay, type DragOverEvent, useSensors, useSensor, MouseSensor, TouchSensor, type DragStartEvent, type DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { createPortal } from 'react-dom'
import CatergoryColum from './components/CategoryColum.component'
import DragbleTransaction from './components/DragbleTranactions.component'
import { type Usuario } from '../../models/Usuario.model'
import { useSearchParams } from 'react-router-dom'
import { getMonthStringCurrent } from '../../utilities/month.utilities'
import CatergoryColumMovil from './components/CategoryColumMovil.component'

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
  const { modalLimiteCompra } = useServiceModal()
  const [activeTransaction, setActiveTransaction] = useState<Transaccion | undefined>(undefined)
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [prevTransactions, setPrevTransactions] = React.useState<Transaccion[] | undefined >(undefined)
  const [nextTransactions, setNextTransactions] = React.useState<Transaccion[] | undefined>(undefined)
  const [currentTransactions, setCurrentTransactions] = useState<Transaccion[] | undefined>(undefined)
  const [categoryDelete, setCategoryDelete] = useState<Categoria | undefined>(undefined)
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

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 2,
        delay: 250
      }
    }),
    useSensor(TouchSensor)
  )

  function onDragStart (event: DragStartEvent) {
    if (event.active.data.current?.type === 'transaccion') {
      setActiveTransaction(event.active.data.current.transaction as Transaccion)
    }
  }

  function onDragEnd (_event: DragEndEvent) {
    setActiveTransaction(undefined)
  }

  function onDragOver (event: DragOverEvent) {
    const { active, over } = event
    if (over === null) return

    const activeId = active.id
    const overId = over.id

    if (activeId === overId) return

    const isActiveATask = active.data.current?.type === 'transaction'
    const isOverATask = over.data.current?.type === 'transaction'

    if (!isActiveATask) return

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setCurrentTransactions((transaccion) => {
        if (transaccion !== undefined) {
          const activeIndex = transaccion.findIndex((t) => t.id === activeId)
          const overIndex = transaccion.findIndex((t) => t.id === overId)
          if (transaccion[activeIndex].categoria !== transaccion[overIndex].categoria) {
            // Fix introduced after video recording
            transaccion[activeIndex].categoria = transaccion[overIndex].categoria
            return arrayMove(transaccion, activeIndex, overIndex - 1)
          }
          return arrayMove(transaccion, activeIndex, overIndex)
        }
      })
    }

    const isOverAColumn = over.data.current?.type === 'categoria'

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setCurrentTransactions((transaccion) => {
        if (transaccion !== undefined) {
          const activeIndex = transaccion.findIndex((t) => t.id === activeId)
          const currentID = transaccion[activeIndex].id
          if (currentID !== undefined) {
            void transactionService.changeCategorias(overId.toString(), getUserId(), currentID)
          }
          transaccion[activeIndex].categoria = overId.toString()
          return arrayMove(transaccion, activeIndex, activeIndex)
        }
      })
    }
  }

  const handleResize = () => {
    setWidth(window.innerWidth)
  }

  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
  }, [])

  React.useEffect(() => {
    if (user !== undefined) {
      return getTransactions(1, getMonth(page), user, setNextTransactions)
    }
  }, [user, nextTransactions])
  React.useEffect(() => {
    if (user !== undefined) {
      getTransactions(0, getMonth(page), user, setCurrentTransactions)
    }
  }, [user])
  React.useEffect(() => {
    if (user !== undefined) {
      return getTransactions(-1, getMonth(page), user, setPrevTransactions)
    }
  }, [user, prevTransactions])
  return (
    <>
      <div className='relative overflow-auto h-[calc(100vh-10.8rem)] px-5' >
          <div className=' flex items-center justify-center font-bold' >
            <Tooltip title={t('tab-3.button-pre')} >
              <IconButton
               disabled={page === 1}
               onClick={goPrev}>
                <MdNavigateBefore/>
              </IconButton>
            </Tooltip>
            <h1 className=' mx-2 text-xl' >{getMonthStringCurrent(page, i18n.language).month} {getMonthStringCurrent(page, i18n.language).year}</h1>
            <Tooltip title={t('tab-3.button-next')} >
              <IconButton
               disabled={!(nextTransactions !== undefined && nextTransactions.length !== 0)}
               onClick={goNext} >
                <MdNavigateNext/>
              </IconButton>
            </Tooltip>
          </div>
          <div className=' sm:inline-flex' >
              <DndContext
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                sensors={sensors}
                >
                    {(currentTransactions !== undefined && user !== undefined) &&
                    obtainAllByCategory(currentTransactions, user?.categoria).map((columData) => (
                      width > 640
                        ? <CatergoryColum
                            key ={columData.category.nombre}
                            categoria={columData.category}
                            transactions={columData.data}
                            setCategoryDelete={setCategoryDelete}
                        />
                        : <CatergoryColumMovil
                            key ={columData.category.nombre}
                            categoria={columData.category}
                            transactions={columData.data}
                            setCategoryDelete={setCategoryDelete}
                          />
                    ))}
                  { createPortal(
                      <DragOverlay>
                        {(activeTransaction !== undefined) &&
                          (<DragbleTransaction transaction={activeTransaction} color='#fffff' />)
                        }
                      </DragOverlay>
                      , document.body) }
              </DndContext>
          </div>
          <Tooltip title={t('tab-2.add')} >
              <Fab
                  className='!bg-main-blue !text-main-white !z-30 !fixed bottom-7 right-7 xl:!hidden'
                  size='large'
                  variant='circular'
                  onClick={() => { modalLimiteCompra.set(true) }} color='inherit' aria-label="add">
                  <MdAdd className='text-2xl' />
              </Fab>
          </Tooltip>
          <Fab
              className='!bg-main-blue !text-main-white !z-30 !fixed bottom-7 right-7 !hidden xl:!flex'
              size='large'
              variant='extended'
              onClick={() => { modalLimiteCompra.set(true) }} color='inherit' aria-label="add">
              {t('tab-2.add')} <MdAdd className='text-2xl ml-2' />
          </Fab>
      </div>
      <ModalDeleteCategory category={categoryDelete} />
      <ModalAddCattegory />
    </>
  )
}

export default OrganizarGastosPage
