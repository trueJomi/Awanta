import React from 'react'
import { type Transaccion } from '../../../models/Transaccion.model'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { adaptativeColor, adaptativeColorText, invert } from '../../../utilities/color.utilities'
import { AllMoney } from '../../../contexts/money.context'
import { allOriginis } from '../../../contexts/transactions.context'
import { adapterNumberString } from '../../../adapters/Numbers.adapter'
import DraggableSkeleton from './DraggableSkeleton.component'

const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }

const DragbleTransaction: React.FC<{ transaction: Transaccion, color: string }> = ({ transaction, color }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: transaction.id ?? 'fsafasfsfs',
    data: {
      type: 'transaction',
      transaction
    }
  })

  const moneyInfo = AllMoney.find((money) => money.name === transaction.moneda) ?? AllMoney[0]
  const bankInfo = allOriginis.find((bank) => bank.name === transaction.origen) ?? allOriginis[0]

  if (isDragging) {
    return <DraggableSkeleton reference={setNodeRef} style={{
      transition,
      transform: CSS.Transform.toString(transform)
    }}/>
  }

  return (
    <div
      ref={setNodeRef}
      style={{
        backgroundColor: adaptativeColor(color),
        color: invert(adaptativeColorText(color)),
        transition,
        transform: CSS.Transform.toString(transform)
      }}
      {...attributes}
      {...listeners}
      className='mx-4 p-3 mb-2 rounded-md' >
      <h1 className='font-black flex justify-center items-center h-10 ' >
        {transaction.descripcion}
      </h1>
      <div className='flex justify-between font-bold' >
        <div>
            {moneyInfo.simbol} {adapterNumberString(transaction.cantidad)}
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
  )
}

export default DragbleTransaction
