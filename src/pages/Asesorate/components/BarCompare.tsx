import React from 'react'
import {
  Chart,
  Tooltip,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
  type Point,
  type ChartData,
  Legend,
  Title
} from 'chart.js'
import { type Tasa } from '../../../models/Tasa.model'
import { Line } from 'react-chartjs-2'
import { getMonthStringCurrentIncrement } from '../../../utilities/month.utilities'
import { useTranslation } from 'react-i18next'
import { type GraficBarModel } from '../../../models/utils/BarGrafic.model'
import { interesCompuestoBase } from '../../../utilities/calculates'
import { adapterNumberRound2 } from '../../../adapters/Numbers.adapter'
Chart.register(
  Title,
  Legend,
  PointElement,
  Tooltip,
  LineElement,
  CategoryScale,
  LinearScale
)

interface PropsBarComp {
  tasas: Tasa[]
  inicial: number
  entry: number
  time: 'inicio' | 'fin'
  frecuency: 'mensual' | 'anual'
  cant: number
}

const createData = (tasas: Tasa[], cant: number, frecuency: 'mensual' | 'anual', time: 'inicio' | 'fin', entry: number, inicial: number, lang: string) => {
  const dataTotal: GraficBarModel[] = tasas.map((taza) => {
    const dataTemp: GraficBarModel = {
      labels: [],
      data: []
    }
    let price: number = inicial
    if (frecuency === 'anual') {
      for (let plazo = 0; plazo <= cant; plazo++) {
        const mes = getMonthStringCurrentIncrement(plazo * 12, lang)
        const finalV = adapterNumberRound2(price)
        dataTemp.data.push(finalV)
        dataTemp.labels.push(mes.year.toString())
        if (time === 'inicio') {
          price += entry
        }
        price = interesCompuestoBase(taza.tasa, 1, price)
        if (time === 'fin') {
          price += entry
        }
      }
      return dataTemp
    } else {
      for (let plazo = 0; plazo <= 12 * cant; plazo++) {
        const finalV = adapterNumberRound2(price)
        const mes = getMonthStringCurrentIncrement(plazo + 1, lang)
        dataTemp.data.push(finalV)
        dataTemp.labels.push(`${mes.month}-${mes.year}`)
        if (time === 'inicio') {
          price += entry
        }
        const tazaMesual = taza.tasa / 12
        price = interesCompuestoBase(tazaMesual, 1, price)
        if (time === 'fin') {
          price += entry
        }
      }
      return dataTemp
    }
  })
  return dataTotal
}

const BarCompare: React.FC<PropsBarComp> = ({ tasas, inicial, entry, time, frecuency, cant }) => {
  const { i18n } = useTranslation()
  const [data, setData] = React.useState<GraficBarModel[]>([
    {
      labels: [],
      data: []
    },
    {
      labels: [],
      data: []
    },
    {
      labels: [],
      data: []
    }
  ])

  const [sizeWindow, setSizeWindow] = React.useState<number>(window.innerWidth)

  const [config, setConfig] = React.useState<ChartData<'line', Array<number | Point>, unknown>>(
    {
      labels: data[0].labels,
      datasets: [{
        label: tasas[0].nombre,
        data: data[0].data,
        backgroundColor: '#ffc34d',
        borderColor: '#ffc34d',
        pointBorderColor: '#3a5c92'
      },
      {
        label: tasas[1].nombre,
        data: data[1].data,
        backgroundColor: '#f77c00',
        borderColor: '#f77c00',
        pointBorderColor: '#3a5c92'
      },
      {
        label: tasas[2].nombre,
        data: data[2].data,
        backgroundColor: '#fff3e3',
        borderColor: '#3a5c92',
        pointBorderColor: '#3a5c92'
      }
      ]
    }
  )

  React.useEffect(() => {
    function handleResize () {
      setSizeWindow(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  })

  React.useEffect(() => {
    if (sizeWindow > 1280) {
      setConfig({
        labels: data[0].labels,
        datasets: [{
          label: tasas[0].nombre,
          data: data[0].data,
          backgroundColor: '#ffc34d',
          borderColor: '#ffc34d',
          pointBorderColor: '#3a5c92'
        },
        {
          label: tasas[1].nombre,
          data: data[1].data,
          backgroundColor: '#f77c00',
          borderColor: '#f77c00',
          pointBorderColor: '#3a5c92'
        },
        {
          label: tasas[2].nombre,
          data: data[2].data,
          backgroundColor: '#fff3e3',
          borderColor: '#3a5c92',
          pointBorderColor: '#3a5c92'
        }
        ]
      })
    } else {
      setConfig({
        labels: data[0].labels,
        datasets: [{
          label: tasas[0].nombre,
          data: data[0].data,
          backgroundColor: '#ffc34d',
          borderColor: '#ffc34d',
          pointBorderColor: '#3a5c92'
        },
        {
          label: tasas[1].nombre,
          data: data[1].data,
          backgroundColor: '#f77c00',
          borderColor: '#f77c00',
          pointBorderColor: '#3a5c92'
        }
        ]
      })
    }
  }, [data])
  React.useEffect(() => {
    const data = createData(tasas, cant, frecuency, time, entry, inicial, i18n.language)
    setData(data)
  }, [inicial, tasas, sizeWindow, entry, time, frecuency, cant, i18n.language])

  return (
        <>
          <Line
            data={config}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'chartArea'
                },
                title: {
                  display: true,
                  text: ''
                }
              }
            }}
          />
          <div className=' text-center text-4xl font-bold' >
            {/* {adapterNumberString(data[0].data[data[0].data.length - 1])} */}
          </div>
        </>
  )
}

export default BarCompare
