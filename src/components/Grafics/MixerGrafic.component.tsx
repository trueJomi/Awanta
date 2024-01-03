import React from 'react'
import {
  Chart,
  ArcElement,
  Tooltip,
  type ChartData
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { type LimiteGastos } from '../../models/LimiteGastos.model'
import { type Transaccion } from '../../models/Transaccion.model'
import { type Categoria } from '../../models/Categoria.model'
import { toLabelsGrafic } from '../../adapters/MainGrafic.adapter'
import { adapterNumberString } from '../../adapters/Numbers.adapter'
import { sumaCantidad } from '../../utilities/filters.utilities'
Chart.register(
  Tooltip,
  ArcElement)

interface PropsGrafic {
  limiteGastos?: LimiteGastos
  transactions?: Transaccion[]
  categorys?: Categoria[]
  aditionals?: boolean
}

interface UtilData {
  label: string[]
  data: number[]
  bgc: string[]
}

const validateNegative = (limite: number, sumaTotal: number) => {
  const value = limite - sumaTotal
  if (value < 0) {
    return true
  } else {
    return false
  }
}

const MixerGrafics: React.FC<PropsGrafic> = ({ limiteGastos, transactions, categorys, aditionals = false }) => {
  const [data, setData] = React.useState<UtilData>({
    label: [],
    data: [],
    bgc: []
  })
  const [negative, setNegative] = React.useState<boolean>(false)

  const config: ChartData<'doughnut', number[], unknown> = {
    labels: data.label,
    datasets: [{
      data: data.data,
      backgroundColor: data.bgc,
      hoverOffset: 5
    }]

  }

  React.useEffect(() => {
    if (limiteGastos !== undefined && transactions !== undefined) {
      setNegative(validateNegative(limiteGastos.cantidad, sumaCantidad(transactions)))
    }
  }, [limiteGastos, transactions])

  React.useEffect(() => {
    if (transactions !== undefined && limiteGastos !== undefined && categorys !== undefined) {
      setData(toLabelsGrafic(limiteGastos, transactions, categorys, aditionals))
    }
  }, [transactions, limiteGastos, categorys])

  return (
    <>
      <Doughnut
        data={config}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            }
          }
        }}
      />
      <span
      className="relative -z-10 flex -top-1/2 -translate-y-8 font-extrabold text-xl"
      >
        <div className={`text-center w-full ${negative ? 'text-red-500' : ''}`}>
          <div className="uppercase" >total</div>

          {transactions !== undefined
            ? <><span>S/</span><span>{adapterNumberString(sumaCantidad(transactions))}</span></>
            : <div className="animate-pulse h-6 w-30"/>}
        </div>
      </span>
    </>
  )
}

export default MixerGrafics
