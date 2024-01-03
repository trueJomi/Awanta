import React from 'react'
import { type Transaccion } from '../../models/Transaccion.model'
import { type LimiteGastos } from '../../models/LimiteGastos.model'
import MixerGrafics from '../MixerGrafic.component'
import { type Categoria } from '../../models/Categoria.model'
import MixerGraficSquare from '../MixerGraficSquare.component'

const MixerGraficUnitari: React.FC<{ transactions?: Transaccion[], limiteGasto?: LimiteGastos, categorias?: Categoria[], height: number | string }> = ({ transactions, limiteGasto, categorias, height }) => {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-8' >
        <div className={`h-${height} col-span-1 lg:col-span-3`} >
          <MixerGrafics
              transactions={transactions}
              limiteGastos={limiteGasto}
              categorys={categorias}
          />
        </div>
        <div className='col-span-1 lg:col-span-5' >
          <MixerGraficSquare
          transactions={transactions}
          limiteGastos={limiteGasto}
          categorys={categorias}
          />
        </div>
    </div>
  )
}

export default MixerGraficUnitari
