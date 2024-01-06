import React from 'react'
import HistorialUI from './components/HistorialUI'
import { useSearchParams } from 'react-router-dom'
import { type Transaccion } from '../../models/Transaccion.model'
import { TransactionService } from '../../services/Transaction.service'

import { useAuth } from '../../hooks/Auth.hook'
import { getUserId } from '../../services/AuthFirebase.service'
import { type Usuario } from '../../models/Usuario.model'

const transactionService = new TransactionService()

const getMonth = (page: number) => {
  const date = new Date()
  const correntMonth = date.getMonth() - (page - 1)
  return correntMonth
}

const getTransactions = (mas: number, currentMonth: number, user: Usuario, fun: (data: Transaccion[]) => void) => {
  const tranformMont = currentMonth - mas
  return transactionService.getWithMonthIntervalListener(getUserId(), user.diaInicial, tranformMont, 'desc', fun)
}
const HistorialPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { user } = useAuth()
  const [prev, setPrev] = React.useState<Transaccion[] | undefined >(undefined)
  const [current, setCurrent] = React.useState<Transaccion[] | undefined>(undefined)
  const [next, setNext] = React.useState<Transaccion[] | undefined>(undefined)

  const getPage = () => {
    const page = searchParams.get('page')
    if (page === null) {
      return 1
    } else {
      return +page
    }
  }

  const move = (move: number) => {
    const page = getPage()
    setSearchParams((prev) => {
      prev.set('page', (page + move).toString())
      return prev
    })
  }

  const goNext = () => {
    move(1)
    setPrev(current)
    setCurrent(next)
    setNext(undefined)
  }

  const goPrev = () => {
    move(-1)
    setCurrent(prev)
    setNext(current)
    setPrev(undefined)
  }
  React.useEffect(() => {
    if (next === undefined && user !== undefined) {
      return getTransactions(1, getMonth(getPage()), user, setNext)
    }
  }, [next, user])
  React.useEffect(() => {
    if (prev === undefined && user !== undefined) {
      return getTransactions(-1, getMonth(getPage()), user, setPrev)
    }
  }, [prev, user])
  React.useEffect(() => {
    if (user !== undefined) {
      return getTransactions(0, getMonth(getPage()), user, setCurrent)
    }
  }, [user])

  return (
      <HistorialUI
        transactions={current}
        isNext={(next !== undefined && next.length !== 0)}
        goNext={goNext}
        goPrev={goPrev}
      />
  )
}

export default HistorialPage
