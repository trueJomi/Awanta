import React from 'react'
import { type Transaccion } from '../../../models/Transaccion.model'
import { type Categoria } from '../../../models/Categoria.model'
import { adaptativeColorText } from '../../../utilities/color.utilities'
import { sumaCantidad } from '../../../utilities/filters.utilities'
import DragbleTransaction from './DragbleTranactions.component'
import { IconButton, Tooltip } from '@mui/material'
import { MdDelete } from 'react-icons/md'
import EmptyCategory from './EmptyCategory.component'
import { adapterNumberString } from '../../../adapters/Numbers.adapter'
import { StrictModeDroppable } from './StrickModeDroppable'
import { useModalDeleteCategoriaStore } from '../../../store/modal.store'

interface PropsColum {
  transactions: Transaccion[]
  categoria: Categoria
}

const CatergoryColum: React.FC<PropsColum> = ({ transactions, categoria }) => {
  const { setModal, setCategoria } = useModalDeleteCategoriaStore((state) => state)

  return (
    <div className='w-full sm:w-72'>
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
                        setCategoria(categoria)
                        setModal(true)
                      }} >
                        <MdDelete/>
                      </IconButton>
                    </Tooltip>
                  </div>}
            </div>
            <StrictModeDroppable droppableId={categoria.nombre}>
                {(dropableProvider) => (
                  <div
                    className='mt-2 py-2 space-y-2'
                    {...dropableProvider.droppableProps}
                    ref={dropableProvider.innerRef}
                  >
                    {transactions.length !== 0
                      ? transactions.map((transaction, idx) => (
                        <DragbleTransaction
                          index={idx}
                          key={transaction.id}
                          transaction={transaction}
                          color={categoria.color}
                        />
                      ))
                      : <EmptyCategory color={categoria.color} />}
                    {dropableProvider.placeholder}
                  </div>
                )}
            </StrictModeDroppable>
        </div>
    </div>
  )
}

export default CatergoryColum
