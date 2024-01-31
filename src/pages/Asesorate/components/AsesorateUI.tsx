import { MenuItem, Zoom } from '@mui/material'
import React from 'react'
import { type Tasa } from '../../../models/Tasa.model'
import Comparar from './Comparar'
import BarCompare from './BarCompare'
import { useTranslation } from 'react-i18next'
import { interesCompuesto } from '../../../utilities/calculates'
import CustomInput from '../../../components/Custom/CustomInput.component'
import MoneyInput from '../../../components/Custom/MoneyInput.componet'

interface PredictData {
  amount: string
  ingreso: string
  lugarIngreso: 'inicio' | 'fin'
  frecuenciaIngreso: 'mensual' | 'anual'
  cant: number
  tasa1: number
  tasa2: number
  tasa3: number
}

interface PropsAsesorateUI {
  tasas?: Tasa[]
}

const AsesorateUI: React.FC<PropsAsesorateUI> = ({ tasas }) => {
  const [dataPredict, setDataPredict] = React.useState<PredictData>({
    amount: '',
    ingreso: '',
    lugarIngreso: 'inicio',
    frecuenciaIngreso: 'mensual',
    cant: 1,
    tasa1: 0,
    tasa2: 1,
    tasa3: 2
  })

  const existData = (tasas !== undefined)
  const valdiate = (
    dataPredict.amount !== '' &&
    +dataPredict.amount >= 0 &&
    dataPredict.cant !== undefined &&
    +dataPredict.cant >= 1 &&
    existData
  )

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDataPredict({
      ...dataPredict,
      [event.target.name]: event.target.value
    })
  }

  const [sizeWindow, setSizeWindow] = React.useState<number>(window.innerWidth)
  const { t } = useTranslation()

  React.useEffect(() => {
    function handleResize () {
      setSizeWindow(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
  })
  return (
        <div className='mx-5 space-y-7' >
          <div className="max-w-5xl text-xl capitalize font-bold mx-auto" >
              {t('tab-4.title')}
          </div>
          <div className='max-w-5xl mx-auto space-y-4' >
            <div className=" mx-auto" >
              <MoneyInput
                  required
                  defaultValue={0}
                  value={dataPredict.amount}
                  name="amount"
                  label={t('tab-4.input-money')}
                  onChange={handleChange}
                  InputProps={{
                    placeholder: '0.00'
                  }}
                  prefix ='S/ '
                />
            </div>
            <div className='items-center sm:flex sm:justify-stretch gap-2 leading-6 w-full space-y-5 sm:space-y-0' >
              <div>
                <MoneyInput
                  value={dataPredict.ingreso}
                  name="ingreso"
                  label={t('tab-4.input-entry')}
                  onChange={handleChange}
                  InputProps={{
                    placeholder: '0.00'
                  }}
                  prefix ='S/ '
                />
              </div>
              <div className='leading-6 flex justify-stretch gap-2 w-full' >
                <div>
                  <CustomInput
                    select
                    value={dataPredict.lugarIngreso}
                    name="lugarIngreso"
                    label={t('tab-4.input-time.title')}
                    onChange={handleChange}
                    type='text'
                  >
                    <MenuItem
                      value='inicio'
                    >
                      {t(`tab-4.input-time.items.${0}`)}
                    </MenuItem>
                    <MenuItem
                      value='fin'
                    >
                      {t(`tab-4.input-time.items.${1}`)}
                    </MenuItem>
                  </CustomInput>
                </div>
                <div>
                  <CustomInput
                    select
                    value={dataPredict.frecuenciaIngreso}
                    name="frecuenciaIngreso"
                    label={t('tab-4.input-frecuency.title')}
                    onChange={handleChange}
                    type='text'
                  >
                    <MenuItem
                      value='mensual'
                    >
                      {t(`tab-4.input-frecuency.items.${0}`)}
                    </MenuItem>
                    <MenuItem
                      value='anual'
                    >
                      {t(`tab-4.input-frecuency.items.${1}`)}
                    </MenuItem>
                  </CustomInput>
                </div>
                <div>
                  <CustomInput
                    value={dataPredict.cant}
                    name="cant"
                    label={t('tab-4.input-cant')}
                    onChange={(event) => {
                      if (+event.target.value >= 1) {
                        setDataPredict({
                          ...dataPredict,
                          cant: +event.target.value
                        })
                      }
                    }}
                    type="number"
                  />
                </div>
              </div>
            </div>
          </div>
            <div className=" grid grid-cols-2 space-y-5  xl:grid-cols-3" >
                <div className="col-span-1 px-3 py-5 border-r-2" >
                <CustomInput
                    select
                    type="number"
                    name="tasa1"
                    value={dataPredict.tasa1}
                    onChange={handleChange}
                >
                    { tasas !== undefined
                      ? tasas.map((item, indx) => (
                          <MenuItem
                          key={item.id}
                          value={indx}
                          >{item.nombre}</MenuItem>
                      ))
                      : <MenuItem
                        value={0} >
                        {t('tab-4.bank')}
                        </MenuItem>
                    }
                </CustomInput>
                    {(existData)
                      ? <Comparar tasa={tasas[dataPredict.tasa1]} ganancia={interesCompuesto(tasas[dataPredict.tasa1].tasa, +dataPredict.amount, +dataPredict.ingreso, dataPredict.cant, dataPredict.frecuenciaIngreso, dataPredict.lugarIngreso)} />
                      : <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 mt-3 rounded-3xl animate-pulse" ></div>}
                </div>
                <div className="col-span-1 px-3 xl:border-r-2" >
                    <CustomInput
                          select
                          type="number"
                          name="tasa2"
                          value={dataPredict.tasa2}
                          onChange={handleChange}
                      >
                        { tasas !== undefined
                          ? tasas.map((item, indx) => (
                                <MenuItem
                                key={item.id}
                                value={indx}
                                >{item.nombre}</MenuItem>
                          ))
                          : <MenuItem
                              value={0} >
                              {t('tab-4.bank')}
                              </MenuItem>
                          }
                    </CustomInput>
                    { existData
                      ? <Comparar tasa={tasas[dataPredict.tasa2]} ganancia={interesCompuesto(tasas[dataPredict.tasa2].tasa, +dataPredict.amount, +dataPredict.ingreso, dataPredict.cant, dataPredict.frecuenciaIngreso, dataPredict.lugarIngreso)} />
                      : <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 mt-3 rounded-3xl animate-pulse" ></div>}
                </div>
                { (sizeWindow > 1280) && <div className="col-span-1 px-3" >
                <CustomInput
                      select
                      type="number"
                      name="tasa3"
                      value={dataPredict.tasa3}
                      onChange={handleChange}
                  >
                    { tasas !== undefined
                      ? tasas.map((item, indx) => (
                            <MenuItem
                            key={item.id}
                            value={indx}
                            >{item.nombre}</MenuItem>
                      ))
                      : <MenuItem
                          value={0} >
                          {t('tab-4.bank')}
                          </MenuItem>
                      }
                </CustomInput>
                    { existData
                      ? <Comparar tasa={tasas[dataPredict.tasa3]} ganancia={interesCompuesto(tasas[dataPredict.tasa3].tasa, +dataPredict.amount, +dataPredict.ingreso, dataPredict.cant, dataPredict.frecuenciaIngreso, dataPredict.lugarIngreso)}/>
                      : <div className="w-full h-80 bg-gray-100 dark:bg-gray-800 mt-3 rounded-3xl animate-pulse" ></div>}
                </div>}
            </div>
            <Zoom in={valdiate} className={`col-span-2 mt-5 max-w-5xl xl:col-span-3 ${(valdiate) ? 'h-96' : 'h-0'} mx-auto`}
            style={{ transitionDelay: '400ms' }}
            >
            <div>
                  { (valdiate) &&
                  <BarCompare tasas={[tasas[dataPredict.tasa1], tasas[dataPredict.tasa2], tasas[dataPredict.tasa3]]} inicial={+dataPredict.amount} entry={+dataPredict.ingreso} time={dataPredict.lugarIngreso} frecuency={dataPredict.frecuenciaIngreso} cant={+dataPredict.cant} />}
            </div>
            </Zoom>
        </div>
  )
}

export default AsesorateUI
