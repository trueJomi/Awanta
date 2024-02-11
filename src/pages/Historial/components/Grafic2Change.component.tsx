import React, { useMemo } from 'react'
import MixerGraficUnitari from '../../../components/Grafics/MixerGraficUnitari.component'
import { useTranslation } from 'react-i18next'
import { type Transaccion } from '../../../models/Transaccion.model'
import { type LimiteGastos } from '../../../models/LimiteGastos.model'
import { type Categoria } from '../../../models/Categoria.model'
import GraficBar from '../../../components/Grafics/GraficBar.component'
import { Button } from '@mui/material'
import { filtroVisivility } from '../../../utilities/filters.utilities'
import { getMonthStringCurrent } from '../../../utilities/month.utilities'
import { useSearchParams } from 'react-router-dom'

const grafics = [
  {
    name: 'pie GRafic',
    button: 'button-category'
  },
  {
    name: 'bar grafic',
    button: 'button-time'
  }
]

const Grafic2Change: React.FC<{ transactions?: Transaccion[], limiteGasto?: LimiteGastos, category?: Categoria[] }> = ({ transactions, limiteGasto, category }) => {
  const [searchParams] = useSearchParams()
  const { t, i18n } = useTranslation()
  const transactionsTotal = transactions?.filter(filtroVisivility)
  const [grafic, setGrafic] = React.useState<number>(0)

  const monthInfo = useMemo(() => {
    const page = searchParams.get('page')
    if (page === null) {
      return getMonthStringCurrent(1, i18n.language)
    } else {
      return getMonthStringCurrent(+page, i18n.language)
    }
  }, [searchParams])

  const changeGrafic = () => {
    if (grafic === grafics.length - 1) {
      setGrafic(0)
    } else {
      setGrafic(grafic + 1)
    }
  }

  return (
    <div className='relative' >
      <div className='absolute top-0' >
        <Button
        color='inherit'
        className=' !text-main-white !bg-main-blue !font-semibold !rounded-xl !lowercase'
        onClick={changeGrafic} >
          {t(`tab-3.${grafics[grafic].button}`)}
        </Button>
      </div>
      <div className='text-center text-xl uppercase underline font-black mb-5' >
        {monthInfo.month} {monthInfo.year}
      </div>
      <div>
        { grafic === 0 &&
        <GraficBar
          transactions={transactionsTotal}
          height={80}
        />}
        {grafic === 1 &&
        <MixerGraficUnitari
          transactions={transactionsTotal}
          limiteGasto={limiteGasto}
          categorias={category}
          height={80}
        />}
      </div>
    </div>
  )
}

export default Grafic2Change
