import React from 'react'
import HomeUI from './components/HomeUi'
import { type Transaccion } from '../../models/Transaccion.model'
import { type LimiteGastos } from '../../models/LimiteGastos.model'
import { cutArrayFirst, filtroVisivility } from '../../utilities/filters.utilities'
import { TransactionService } from '../../services/Transaction.service'
import { useAuth } from '../../hooks/Auth.hook'
import { LimiteGastoService } from '../../services/LimiteGastos.service'
import { getUserId } from '../../services/AuthFirebase.service'
import ChangeLimiteGastos from './components/ChangeLimiteGastos.component'
import { useModalEditLimiteGastosStore } from '../../store/modal.store'

const transactionService = new TransactionService()
const limiteGastoService = new LimiteGastoService()

const HomePage: React.FC = () => {
  const { user } = useAuth()
  const { setModal } = useModalEditLimiteGastosStore((state) => state)
  const [transactions, setTransactions] = React.useState<Transaccion[] | undefined>(undefined)
  const [currentTransactions, setCurrentTransactions] = React.useState<Transaccion[] | undefined>(undefined)
  const [limiteGasto, setLimiteGasto] = React.useState<LimiteGastos | undefined>(undefined)

  const getMeta = () => {
    limiteGastoService.getMetaActualListener(getUserId(), (data) => {
      if (data === undefined) {
        setModal(true)
      }
      setLimiteGasto(data)
    })
  }

  const getTransactions = (initDay: number) => {
    return transactionService.getIntervalTransactionListener(getUserId(), initDay, 'desc', (data) => {
      const dataFiltredVisivility = data.filter(filtroVisivility)
      setTransactions(dataFiltredVisivility)
    })
  }

  React.useEffect(() => {
    if (user !== undefined) {
      getTransactions(user.diaInicial)
    }
  }, [user])
  React.useEffect(getMeta, [transactions])

  return (
        <>
          <div className='mx-5'>
            <HomeUI
                transactions5={cutArrayFirst(currentTransactions, 5)}
                setTransations={setCurrentTransactions}
                transactions = {transactions}
                limiteGastos={limiteGasto}
                currentTransactions={currentTransactions}
            />
          </div>
            <ChangeLimiteGastos/>
        </>
  )
}

export default HomePage
