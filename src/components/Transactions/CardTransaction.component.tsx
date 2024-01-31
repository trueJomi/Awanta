import React from 'react'
import { type Transaccion } from '../../models/Transaccion.model'
import { Card, CardActions, CardContent, IconButton, Tooltip } from '@mui/material'
import { MdEdit, MdEmail } from 'react-icons/md'
import ButtonDeleteTransaction from '../Custom/ButtonDeleteTransaction.component'
import { useAuth } from '../../hooks/Auth.hook'
import { adaptativeColorText } from '../../utilities/color.utilities'
import { allOriginis, cartegorysDefault } from '../../contexts/transactions.context'
import { AllMoney } from '../../contexts/money.context'
import { useNavigate } from 'react-router-dom'
import ButtonOcultarTransaction from '../Custom/ButtonOcultarTransaction.component'
import { useTranslation } from 'react-i18next'
import { useCurrentTransactionStore } from '../../store/currentTransaction'
import { adapterNumberString } from '../../adapters/Numbers.adapter'

const CardTransaction: React.FC<{ transaction: Transaccion }> = ({ transaction }) => {
  const { user } = useAuth()
  const { setCurrentTransaction } = useCurrentTransactionStore((state) => state)
  const navigate = useNavigate()
  const { t } = useTranslation()
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }

  const categoriaInfo = user?.categoria.find((cat) => cat.nombre === transaction.categoria) ?? cartegorysDefault[0]
  const moneyInfo = AllMoney.find((money) => money.name === transaction.moneda) ?? AllMoney[0]
  const bankInfo = allOriginis.find((bank) => bank.name === transaction.origen) ?? allOriginis[0]

  return (
    <Card className='relative max-w-[38rem] mx-auto' >
      <CardContent className={` duration-200 ${transaction.visibilidad ? '' : 'opacity-30'}`} >
        <div className='text-[1.3rem] mb-3 flex items-center justify-start' >
          <span className='text-sm mr-3' >
              <div className='p-1 px-2 rounded-full font-black truncate max-w-24' style={{
                backgroundColor: categoriaInfo.color,
                color: adaptativeColorText(categoriaInfo.color)
              }} >
              { transaction.categoria }
              </div>
            </span>
            <span className='mr-3' >
              <img src={moneyInfo.url} className=' h-5 max-w-7' alt={`bandera ${moneyInfo.name}`} />
            </span>
            { bankInfo.logo !== undefined &&
            <span className='mr-3' >
              <div
              style={{ backgroundColor: bankInfo.color }}
              className='py-1 px-2 rounded-full'>
                  <img src={bankInfo.logo} className='max-h-8 max-w-10' alt={`logo ${bankInfo.name}`} />
              </div>
            </span>}
            { transaction.correo &&
            <span className='mr-3' >
              <MdEmail/>
            </span>}
        </div>
        <div>
          <h1 className=' text-2xl font-black' >
            {moneyInfo.simbol} {adapterNumberString(+transaction.cantidad)}
          </h1>
          <div className='flex items-center' >
            <h1 className='font-black ' >
              {transaction.descripcion}
            </h1>
          </div>
        </div>
      </CardContent>
      <CardActions >
        <div className=' justify-start flex' >
              <ButtonDeleteTransaction transaction={transaction} />
              <ButtonOcultarTransaction transaction={transaction} />
              { transaction.visibilidad &&
              <Tooltip title={t('comon.transaction.button-edit')} >
                  <IconButton onClick={() => {
                    setCurrentTransaction(transaction)
                    navigate(`/transaction/${transaction.id}`)
                  }}>
                    <MdEdit/>
                </IconButton>
              </Tooltip> }
        </div>
        <p className={`mt-2 text-sm text-gray-400 dark:text-gray-200 font-bold text-end w-full pr-3 duration-200 ${transaction.visibilidad ? '' : 'opacity-30'}`} >
              {transaction.fecha.toLocaleDateString('es-PE', options)}
        </p>
      </CardActions>
    </Card>
  )
}

export default CardTransaction
