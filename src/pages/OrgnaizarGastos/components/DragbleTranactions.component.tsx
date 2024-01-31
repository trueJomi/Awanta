import React from 'react'
import { type Transaccion } from '../../../models/Transaccion.model'
import { adaptativeColor, adaptativeColorText } from '../../../utilities/color.utilities'
import { AllMoney } from '../../../contexts/money.context'
import { allOriginis } from '../../../contexts/transactions.context'
import { adapterNumberString } from '../../../adapters/Numbers.adapter'
import { Draggable } from 'react-beautiful-dnd'

const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

const DragbleTransaction: React.FC<{ transaction: Transaccion, color: string, index: number }> = ({ transaction, color, index }) => {
  const moneyInfo = AllMoney.find((money) => money.name === transaction.moneda) ?? AllMoney[0]
  const bankInfo = allOriginis.find((bank) => bank.name === transaction.origen) ?? allOriginis[0]

  return (
    <Draggable draggableId={transaction.id} index={index} >
      { (draggableProvider, snapshot) => (
        <div
        className={`mx-4 p-3 rounded-md relative duration-200 sm:min-w-[16rem] ${adaptativeColor(color) !== '#FFFFFF' ? 'bg-black' : 'bg-white'} ${adaptativeColorText(color) !== '#fff3e3' ? 'text-main-white' : 'text-main-brown'} ${snapshot.isDragging ? 'opacity-70' : ''} `}
        {...draggableProvider.draggableProps}
        {...draggableProvider.dragHandleProps}
          ref={draggableProvider.innerRef}
          >
            <h1 className='font-black flex justify-center items-center h-10 ' >
              {transaction.descripcion}
            </h1>
            <div className='flex justify-between font-bold' >
              <div>
                  {moneyInfo.simbol} {adapterNumberString(+transaction.cantidad)}
              </div>
              {bankInfo.logo !== undefined &&
              <div
                style={{ backgroundColor: bankInfo.color }}
                className='py-1 px-2 rounded-full'>
                  <img src={bankInfo.logo} className='max-h-8 max-w-10' alt={`logo ${bankInfo.name}`} />
              </div>}
              <div>
                  {transaction.fecha.toLocaleDateString('es-PE', options)}
              </div>
            </div>
        </div>
      )}
    </Draggable>
  )
}

export default DragbleTransaction
