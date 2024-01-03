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
import { getMonthStringCurrent } from '../../../utilities/month.utilities'
import { useTranslation } from 'react-i18next'
import { type GraficBarModel } from '../../../models/utils/BarGrafic.model'
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
}

const BarCompare: React.FC<PropsBarComp> = ({ tasas, inicial }) => {
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

  const interesCompuesto = (interes: number, plazos: number) => {
    const final = inicial * Math.pow((1 + (interes / 100)), plazos)
    return final
  }

  const fixed = (numero: number) => {
    return Number(numero.toFixed(2))
  }

  const createData = () => {
    const dataTotal: GraficBarModel[] = tasas.map((taza) => {
      const dataTemp: GraficBarModel = {
        labels: [],
        data: []
      }
      for (let plazo = 0; plazo < 13; plazo++) {
        const tazaMesual = taza.tasa / 12
        const finalV = fixed(interesCompuesto(tazaMesual, plazo))
        const mes = getMonthStringCurrent(plazo, i18n.language)
        dataTemp.data.push(finalV)
        dataTemp.labels.push(mes.month)
      }
      return dataTemp
    })

    setData(dataTotal)
  }

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
  React.useEffect(createData, [inicial, tasas, sizeWindow])

  return (
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
  )
}

export default BarCompare
