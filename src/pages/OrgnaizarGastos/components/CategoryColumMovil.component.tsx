import React from 'react'
import { type Transaccion } from '../../../models/Transaccion.model'
import { type Categoria } from '../../../models/Categoria.model'
import { adaptativeColorText } from '../../../utilities/color.utilities'
import { sumaCantidad } from '../../../utilities/filters.utilities'
import DragbleTransaction from './DragbleTranactions.component'
import { Accordion, AccordionDetails, AccordionSummary, IconButton, Tooltip } from '@mui/material'
import { MdDelete, MdExpandMore } from 'react-icons/md'
import EmptyCategory from './EmptyCategory.component'
import { adapterNumberString } from '../../../adapters/Numbers.adapter'
import { StrictModeDroppable } from './StrickModeDroppable'
import { useModalDeleteCategoriaStore } from '../../../store/modal.store'

interface PropsColum {
  transactions: Transaccion[]
  categoria: Categoria
}

const CatergoryColumMovil: React.FC<PropsColum> = ({ transactions, categoria }) => {
  const [expanse, setExpanse] = React.useState(false)
  const { setModal, setCategoria } = useModalDeleteCategoriaStore((state) => state)

  return (
    <div className='mr-5 w-full sm:w-72'>
        <h1 className=' uppercase font-bold h-10 mt-2 flex justify-center items-center' >
            {categoria.nombre}
        </h1>
        <Accordion
          expanded={expanse}
          className='rounded-lg shadow-lg text-center'
          style={{
            backgroundColor: categoria.color
          }}
        >
            <AccordionSummary
              onClick={() => { setExpanse(!expanse) }}
              expandIcon={<MdExpandMore className='text-xl' style={{ color: adaptativeColorText(categoria.color) }} />}
              className='!text-lg uppercase font-bold mb-2 mx-2 py-2 relative'
              style={{
                color: adaptativeColorText(categoria.color),
                borderColor: adaptativeColorText(categoria.color)
              }}
            >
                <h1
                    className='text-lg font-black mx-auto'
                    style={{ color: adaptativeColorText(categoria.color) }}
                >
                    S/ {adapterNumberString(sumaCantidad(transactions))}
                </h1>
                {categoria.nombre !== 'consumo' &&
                  <div className=' absolute top-1 left-1' >
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
            </AccordionSummary>
            <AccordionDetails className='mt-2 py-2 ' >
              {expanse &&
                <StrictModeDroppable droppableId={categoria.nombre}>
                  {(dropableProvider) => (
                    <div
                      className='space-y-2'
                      ref={dropableProvider.innerRef}
                      {...dropableProvider.droppableProps}
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
              }
            </AccordionDetails>
        </Accordion>
    </div>
  )
}

export default CatergoryColumMovil
