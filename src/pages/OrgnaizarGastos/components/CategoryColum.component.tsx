import React, { useMemo } from 'react'
import { type Transaccion } from '../../../models/Transaccion.model'
import { type Categoria } from '../../../models/Categoria.model'
import { CSS } from '@dnd-kit/utilities'
import { SortableContext, useSortable } from '@dnd-kit/sortable'
import { adaptativeColorText } from '../../../utilities/color.utilities'
import { sumaCantidad } from '../../../utilities/filters.utilities'
import DragbleTransaction from './DragbleTranactions.component'
import { IconButton, Tooltip } from '@mui/material'
import { MdDelete } from 'react-icons/md'
import { useServiceModal } from '../../../hooks/Modal.hook'
import EmptyCategory from './EmptyCategory.component'
import { adapterNumberString } from '../../../adapters/Numbers.adapter'

interface PropsColum {
  transactions: Transaccion[]
  categoria: Categoria
  setCategoryDelete: React.Dispatch<React.SetStateAction<Categoria | undefined>>
}

const CatergoryColum: React.FC<PropsColum> = ({ transactions, categoria, setCategoryDelete }) => {
  const transactionsIds = useMemo(() => {
    return transactions.map((t) => t.id ?? '')
  }, [transactions])
  const { modalHistory } = useServiceModal()

  const { setNodeRef, transform, transition } = useSortable({
    id: categoria.nombre,
    data: {
      type: 'categoria',
      categoria
    }
  })

  const styleDnd = {
    transition,
    transform: CSS.Transform.toString(transform)
  }

  return (
    <div className='mr-5 w-full sm:w-72'>
        <h1 className=' uppercase font-bold h-10 mt-2 flex justify-center items-center' >
            {categoria.nombre}
        </h1>
        <div
          className='rounded-lg shadow-lg text-center'
          style={{
            backgroundColor: categoria.color
          }}
        >
            <div
            className='text-lg uppercase font-bold border-b-2 mb-2 mx-2 py-2 relative'
            style={{
              color: adaptativeColorText(categoria.color),
              borderColor: adaptativeColorText(categoria.color)
            }}
            >
                <div
                    className='text-lg font-black'
                    style={{ color: adaptativeColorText(categoria.color) }}
                >
                S/ {adapterNumberString(sumaCantidad(transactions))}
                </div>
                {categoria.nombre !== 'consumo' &&
                  <div className=' absolute top-1 right-1' >
                    <Tooltip title="eliminar" >
                      <IconButton
                      style={{ color: adaptativeColorText(categoria.color) }}
                      onClick={() => {
                        setCategoryDelete(categoria)
                        modalHistory.set(true)
                      }} >
                        <MdDelete/>
                      </IconButton>
                    </Tooltip>
                  </div>}
            </div>
            <div
              className='mt-2 py-2'
                ref={setNodeRef}
                style={styleDnd}
            >
              <SortableContext items={transactionsIds} >
                {transactions.length !== 0
                  ? transactions.map((transaction) => (
                    <DragbleTransaction
                      key={transaction.id}
                      transaction={transaction}
                      color={categoria.color}
                    />
                  ))
                  : <EmptyCategory color={categoria.color} />}
              </SortableContext>
            </div>
        </div>
    </div>
  )
}

export default CatergoryColum
