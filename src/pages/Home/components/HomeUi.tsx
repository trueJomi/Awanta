import React from 'react'
import { MdCached, MdEdit } from 'react-icons/md'
import MixerGrafics from '../../../components/Grafics/MixerGrafic.component'
import { type Transaccion } from '../../../models/Transaccion.model'
import { type LimiteGastos } from '../../../models/LimiteGastos.model'
import MixerGraficSquare from '../../../components/Grafics/MixerGraficSquare.component'
import { adapterNumberString } from '../../../adapters/Numbers.adapter'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../hooks/Auth.hook'
import { IconButton, Tooltip } from '@mui/material'
import CardTransactionsSqueleton from '../../../components/Squeletons/CardTransactionSqueleton.component'
import CardTransaction from '../../../components/Transactions/CardTransaction.component'
import FilterTransacctions from '../../../components/Transactions/FilterTransacctions.component'
import ListCardTransactionsEmpty from '../../../components/Squeletons/ListCardTransactionsEmpty.component'
import { generateArray } from '../../../utilities/array.utilites'
import { useGmailStore } from '../../../store/gmail.store'
import { useModalEditLimiteGastosStore } from '../../../store/modal.store'

interface PropsHomeUI {
  transactions5?: Transaccion[]
  setTransations: React.Dispatch<React.SetStateAction<Transaccion[] | undefined>>
  currentTransactions?: Transaccion[]
  limiteGastos?: LimiteGastos
  transactions?: Transaccion[]
}

const HomeUI: React.FC<PropsHomeUI> = ({ transactions5, setTransations, limiteGastos, transactions, currentTransactions }) => {
  const { setModal } = useModalEditLimiteGastosStore((state) => state)
  const { setLoadingMessages, loadingMessages } = useGmailStore((state) => state)
  const { user } = useAuth()
  const { t } = useTranslation()
  return (
    <div className= "text-BrownMain dark:text-whiteBase font-Noto">
        <div className="pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-8 ">
                <div className="col-span-1 lg:col-span-3  ">
                    <div className="flex justify-center mt">
                        <div className="w-full h-80">
                        <MixerGrafics
                            limiteGastos={limiteGastos}
                            transactions={currentTransactions}
                            categorys={user?.categoria}
                            aditionals={true}
                        />
                        </div>
                    </div>
                    <div className="text-center mt-5 font-extrabold text-xl capitalize" >
                        <div className='flex justify-center' >
                          <h1>{t('tab-1.gasto')}</h1>
                        </div>
                        <div className=' flex justify-center items-center relative' >
                        {limiteGastos !== undefined
                          ? <><span className="mr-2" >S/</span>{adapterNumberString(limiteGastos?.cantidad)}</>
                          : <div className="h-6 my-2 animate-pulse bg-gray-300 backdrop-blur-md opacity-40 rounded-full w-24 inline-block"/>}
                          <IconButton
                            onClick={() => { setModal(true) }}
                            className=' !bg-main-blue !ml-3 !text-main-white '
                            >
                                <MdEdit/>
                          </IconButton>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 md:ml-5 lg:col-span-5 lg:ml-10 xl:col-span-4">
                    <MixerGraficSquare
                        limiteGastos={limiteGastos}
                        transactions={currentTransactions}
                        categorys={user?.categoria}
                        aditionals={true}
                    />
                    <div className=' text-center mb-5 mt-8' >
                      <h1 className=' text-2xl font-bold uppercase' >{t('tab-1.last-transactions')}</h1>
                    </div>
                    <div className='max-w-[38rem] mx-auto' >
                      <div className='flex w-full' >
                        <FilterTransacctions setTransactions={setTransations} transactions={transactions} />
                        <div className='pt-1' >
                          <Tooltip title={t('tab-1.reaload')}>
                            <IconButton
                              onClick={() => {
                                setLoadingMessages(true)
                              }} >
                              <MdCached className={`${loadingMessages ? 'animate-spin' : ''}`}/>
                            </IconButton>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 space-y-4" >
                        { (transactions5 !== undefined)
                          ? transactions5.length !== 0
                            ? transactions5.map((item) => (
                                <CardTransaction key={item.id} transaction={item}/>
                            ))
                            : <ListCardTransactionsEmpty/>
                          : generateArray(5).map((item) => (
                            <CardTransactionsSqueleton key={item} />
                          ))}
                    </div>
            </div>
        </div>
    </div>
</div>
  )
}
export default HomeUI
