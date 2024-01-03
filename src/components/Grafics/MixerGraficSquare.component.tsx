import React from 'react'
import { tranformDataMixerGrafic } from '../../adapters/MainGrafic.adapter'
import { type LimiteGastos } from '../../models/LimiteGastos.model'
import { type Categoria } from '../../models/Categoria.model'
import { type Transaccion } from '../../models/Transaccion.model'
import MixerGraficSquareSqueleton from './../Squeletons/MixerGraficSquere.component'

interface PropsGrafic {
  limiteGastos?: LimiteGastos
  transactions?: Transaccion[]
  categorys?: Categoria[]
  aditionals?: boolean
}

const MixerGraficSquare: React.FC<PropsGrafic> = ({ transactions, limiteGastos, categorys, aditionals }) => {
  if ((transactions === undefined || limiteGastos === undefined || categorys === undefined)) return (<MixerGraficSquareSqueleton/>)
  const data = tranformDataMixerGrafic(limiteGastos, transactions, categorys, aditionals)
  return (
        <div className="border-2 max-w-[38rem] mx-auto border-gray-800 dark:border-gray-200 mt-5 px-4 bg-gray-100 dark:bg-gray-900 rounded-2xl pb-3" >
            <div className="grid grid-flow-row-dense grid-cols-1 sm:grid-cols-2 mb-3">
                { data.map((item, idx) => (
                    <div key={idx} className="font-extrabold mt-5 text-sm" >
                        <div className=" inline-flex translate-y-1 h-5 w-7 rounded-full" style={{ backgroundColor: item.color }}/>
                        <div className="inline-block capitalize ml-2">
                            {item.type} <span><span>S/</span> {item.cant}</span> <span>( {item.porcent}% )</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default MixerGraficSquare
