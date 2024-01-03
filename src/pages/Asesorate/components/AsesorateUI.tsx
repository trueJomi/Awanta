import { Zoom } from '@mui/material'
import React from 'react'
import { type Tasa } from '../../../models/Tasa.model'
import Comparar from './Comparar'
import BarCompare from './BarCompare'
import { useTranslation } from 'react-i18next'

interface PropsAsesorateUI {
  tasas?: Tasa[]
  inputAmount: JSX.Element
  inputTasa1: JSX.Element
  inputTasa2: JSX.Element
  inputTasa3: JSX.Element
  amount: number
  tasa1: number
  tasa2: number
  tasa3: number
}

const AsesorateUI: React.FC<PropsAsesorateUI> = ({ tasas, inputAmount, inputTasa1, inputTasa2, inputTasa3, tasa1, tasa2, tasa3, amount }) => {
  const [sizeWindow, setSizeWindow] = React.useState<number>(window.innerWidth)
  const { t } = useTranslation()

  const interesCompuesto = (interes: number, total: number) => {
    const partInteres = interes / 12
    const final = total * Math.pow((1 + (partInteres / 100)), 12)
    const ganancia = final - total
    return ganancia
  }

  const existData = (tasas !== undefined && amount >= 0)

  React.useEffect(() => {
    function handleResize () {
      setSizeWindow(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  })
  return (
        <div className='mx-5' >
            <div className=" text-xl capitalize font-bold" >
                {t('tab-4.title')}
            </div>

            <div className="max-w-5xl my-5 mx-auto" >
                {inputAmount}
            </div>

            <div className=" grid grid-cols-2  xl:grid-cols-3" >
                <div className="col-span-1 px-3 py-5 border-r-2" >
                    {inputTasa1}
                    {(existData)
                      ? <Comparar tasa={tasas[tasa1]} ganancia={interesCompuesto(tasas[tasa1].tasa, amount)} />
                      : <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 mt-3 rounded-3xl animate-pulse" ></div>}
                </div>
                <div className="col-span-1 px-3 py-5 xl:border-r-2" >
                    {inputTasa2}
                    { existData
                      ? <Comparar tasa={tasas[tasa2]} ganancia={interesCompuesto(tasas[tasa2].tasa, amount)} />
                      : <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 mt-3 rounded-3xl animate-pulse" ></div>}
                </div>
                { (sizeWindow > 1280) && <div className="col-span-1 px-3 py-5" >
                    {inputTasa3}
                    { existData
                      ? <Comparar tasa={tasas[tasa3]} ganancia={interesCompuesto(tasas[tasa3].tasa, amount)}/>
                      : <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 mt-3 rounded-3xl animate-pulse" ></div>}
                </div>}
            </div>
            <Zoom in={(tasas !== undefined && amount > 0)} className={`col-span-2 mt-5 max-w-5xl xl:col-span-3 ${(tasas !== undefined && amount > 0) ? 'h-72' : 'h-0'} mx-auto`}
            style={{ transitionDelay: '400ms' }}
            >
            <div>
                  { (tasas !== undefined && amount > 0) && <BarCompare tasas={[tasas[tasa1], tasas[tasa2], tasas[tasa3]]} inicial={amount} />}
            </div>
            </Zoom>
        </div>
  )
}

export default AsesorateUI
