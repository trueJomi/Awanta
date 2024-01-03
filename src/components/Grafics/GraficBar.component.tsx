import React from 'react'
import { type Transaccion } from '../../models/Transaccion.model'
import { Line } from 'react-chartjs-2'
import {
  Chart,
  Tooltip,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  type Point,
  type ChartData
} from 'chart.js'
import { type GraficBarModel } from '../../models/utils/BarGrafic.model'
import { toGraficBarModel } from '../../adapters/GraficBar.adapter'
import { orderByDate, sumaCantidad } from '../../utilities/filters.utilities'
import { adapterNumberString } from '../../adapters/Numbers.adapter'
import TextSkeleton from '../Squeletons/TextSkeleton.component'
Chart.register(
  PointElement,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale
)

const GraficBar: React.FC<{ transactions?: Transaccion[], height: string | number }> = ({ transactions, height }) => {
  const [labelData, setLabelData] = React.useState<GraficBarModel>({
    labels: [],
    data: []
  })

  const config: ChartData<'line', Array<number | Point>, unknown> = {
    labels: labelData.labels,
    datasets: [{
      data: labelData.data,
      backgroundColor: '#ffc34d',
      borderColor: '#ffc34d',
      pointBorderColor: '#3a5c92'
    }]
  }

  React.useEffect(() => {
    if (transactions !== undefined) {
      const transactionsTotal = orderByDate(transactions)
      transactionsTotal.reverse()
      setLabelData(toGraficBarModel(transactionsTotal))
    }
  }, [transactions])
  return (
    <>
      <div className='my-1 uppercase font-black text-center text-2xl' >
        { transactions !== undefined
          ? <><span>S/</span> { adapterNumberString(sumaCantidad(transactions)) } </>
          : <div className='w-28 mx-auto' ><TextSkeleton size={2}/></div> }
      </div>
      <div className={`h-${height}`} >
        <Line
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
      </div>
    </>
  )
}

export default GraficBar
