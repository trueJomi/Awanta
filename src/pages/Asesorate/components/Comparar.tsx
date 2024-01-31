import React from 'react'
import { type Tasa } from '../../../models/Tasa.model'
import { adapterNumberString } from '../../../adapters/Numbers.adapter'
import { useTranslation } from 'react-i18next'

interface PropsComp {
  tasa: Tasa
  ganancia: number
}

const Comparar: React.FC<PropsComp> = ({ tasa, ganancia }) => {
  const { t } = useTranslation()

  return (
        <div className='mt-5 space-y-4' >
            <div className='space-y-3' >
                <div className=" font-bold text-center uppercase" >
                    {t('tab-4.comparar.title')}
                </div>
                <div className="text-center text-3xl font-black " >
                    {tasa !== undefined && adapterNumberString(tasa.tasa)}%
                </div>
                <div className="font-semibold uppercase text-center" >
                    {t('tab-4.comparar.target')}
                </div>
            </div>
            <div className="text-xl h-16 table w-full text-center" >
                <div className="table-cell align-middle " >
                    {tasa.tipo_cuenta }
                </div>
            </div>
            <div>
                <div className="font-semibold text-xs uppercase text-center mb-2" >
                    {t('tab-4.comparar.next')}
                </div>
                <div className="text-center text-lg font-medium" >
                    S/ {adapterNumberString(tasa.mantenimiento)}
                </div>
            </div>
            <div className="my-5 table h-16 w-full " >
                <div className="table-cell align-middle" >
                    <img className="mx-auto bg-slate-100 rounded-3xl " src={tasa.img_url}/>
                </div>
            </div>
            <div>
                <div className="font-semibold uppercase text-center" >
                    {t('tab-4.comparar.ganancia')}
                </div>
                <div className="text-center text-2xl md:text-4xl font-black mt-3 " >
                    S/ {adapterNumberString(ganancia)}
                </div>
            </div>
        </div>
  )
}

export default Comparar
