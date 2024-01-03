import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { type Transaccion } from '../../../models/Transaccion.model'
import Grafic2Change from './Grafic2Change.component'
import { useSearchParams } from 'react-router-dom'
import { sumaCantidad } from '../../../utilities/filters.utilities'
import { type LimiteGastos } from '../../../models/LimiteGastos.model'
import { useAuth } from '../../../hooks/Auth.hook'
import FilterTransacctions from '../../../components/Transactions/FilterTransacctions.component'
import CardTransaction from '../../../components/Transactions/CardTransaction.component'
import ListCardTransactionsEmpty from '../../../components/Squeletons/ListCardTransactionsEmpty.component'
import CardTransactionsSqueleton from '../../../components/Squeletons/CardTransactionSqueleton.component'
import { generateArray } from '../../../utilities/array.utilites'
import { Button } from '@mui/material'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'
import SearchTransactions from '../../../components/Transactions/SearchTransactions.component'

interface PropsHisroyUI {
  transactions?: Transaccion[]
  goNext: () => void
  goPrev: () => void
  isNext: boolean
}

const getSumaLimiteGasto = (transactions?: Transaccion[]): LimiteGastos => {
  const suma = sumaCantidad(transactions)
  return {
    id: '123456',
    moneda: 'PEN',
    cantidad: suma,
    fecha: new Date(),
    categoria: 'general'
  }
}

const HistorialUI: React.FC<PropsHisroyUI> = ({ transactions, goNext, goPrev, isNext }) => {
  const { user } = useAuth()
  const [currentTransactions, setCurrentTransaction] = useState<Transaccion[] | undefined>(transactions)
  const [searchParams] = useSearchParams()
  const getPage = () => {
    const page = searchParams.get('page')
    if (page === null) {
      return 1
    } else {
      return +page
    }
  }
  const { t } = useTranslation()
  useEffect(() => {
    setCurrentTransaction(transactions)
  }, [transactions])
  return (
    <div className='mx-5' >
      <div className='mb-10 max-w-5xl mx-auto' >
        <Grafic2Change
          transactions={currentTransactions}
          limiteGasto={getSumaLimiteGasto(currentTransactions)}
          category={user?.categoria}
        />
      </div>
      <div className="text-center mb-7" >
        <Button
        disabled={getPage() === 1}
        startIcon={<MdNavigateBefore/>}
        className='!bg-main-yellow !text-main-brown !mr-2 !font-bold disabled:opacity-30'
        onClick={goPrev} >
          {t('tab-3.button-pre')}
        </Button>
        <Button
        disabled={!isNext}
        endIcon={<MdNavigateNext/>}
        className='!bg-main-yellow !text-main-brown !ml-2 !font-bold disabled:opacity-30'
        onClick={goNext} >
          {t('tab-3.button-next')}
        </Button>
      </div>
      <div className="pb-5 max-w-5xl mx-auto" >
        <div className='max-w-[38rem] mx-auto mb-5' >
          <SearchTransactions setTransactions={setCurrentTransaction} transactions={transactions} />
        </div>
        <div className='max-w-[38rem] mx-auto' >
          <FilterTransacctions setTransactions={setCurrentTransaction} transactions={transactions} />
        </div>
        <div className="mt-5" >
            { (currentTransactions !== undefined)
              ? currentTransactions.length !== 0
                ? currentTransactions.map((item) => (
                    <CardTransaction key={item.id} transaction={item}/>
                ))
                : <ListCardTransactionsEmpty/>
              : generateArray(10).map((item) => (
                <CardTransactionsSqueleton key={item} />
              ))}
        </div>
      </div>
    </div>
  )
}

export default HistorialUI
