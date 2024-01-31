import React from 'react'
import dayjs from 'dayjs'
import { v4 } from 'uuid'
import { useNavigate } from 'react-router-dom'
import { DatePicker } from '@mui/x-date-pickers'
import { Checkbox, MenuItem } from '@mui/material'
import { cartegorysDefault } from '../../contexts/transactions.context'
import { useTranslation } from 'react-i18next'
import CustomInput from '../Custom/CustomInput.component'
import { useAuth } from '../../hooks/Auth.hook'
import { type TransaccionBase, type Transaccion } from '../../models/Transaccion.model'
import CustomButtonLoading from '../Custom/CustomButtonLoading.component'
import MoneyInput from '../Custom/MoneyInput.componet'
import { AllMoney } from '../../contexts/money.context'

const FormTransaction: React.FC<{ transaction?: Transaccion, fun: (transacction: TransaccionBase) => Promise<void> }> = ({ transaction, fun }) => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [currentTransaction, setCurrentTransaction] = React.useState<TransaccionBase>(transaction ??
    {
      cantidad: '',
      fecha: new Date(),
      descripcion: '',
      idTransaccion: v4(),
      moneda: 'PEN',
      origen: 'EFECTIVO',
      tipo: 'consumo',
      usuario: user?.idUser ?? '',
      categoria: cartegorysDefault[0].nombre,
      visibilidad: true,
      correo: false
    })
  const [loading, setLoading] = React.useState<boolean>(false)
  const [disable, setDisable] = React.useState<boolean>(true)

  const guardarTransaction = (event: React.MouseEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault()
    if (currentTransaction.cantidad !== '') {
      const descriptionPast = currentTransaction.descripcion.trim() !== '' ? currentTransaction.descripcion.trim() : 'desconocido'
      setCurrentTransaction({ ...currentTransaction, descripcion: descriptionPast })
      const originPast = currentTransaction.origen.trim() === '' ? 'EFECTIVO' : currentTransaction.origen.trim().toUpperCase()
      setCurrentTransaction({ ...currentTransaction, origen: originPast })
      void fun(currentTransaction).then(() => {
        setLoading(false)
        navigate(-1)
      })
    }
  }

  const switchDisable = () => {
    setCurrentTransaction({ ...currentTransaction, origen: 'EFECTIVO' })
    setDisable(!disable)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentTransaction({
      ...currentTransaction,
      [event.target.name]: event.target.value
    })
  }

  const saveDate = (input: dayjs.Dayjs | null) => {
    if (input === null) return
    const dateNew = input?.toDate()
    setCurrentTransaction({ ...currentTransaction, fecha: dateNew })
  }

  return (
        <>
        <form onSubmit={guardarTransaction}>
            <div className="col-span-1 mt-5 flex gap-2" >
                <CustomInput
                  type='text'
                  name='moneda'
                  select
                  onChange={handleChange}
                  value={currentTransaction.moneda}
                >
                  <MenuItem
                    value={AllMoney[0].name}
                  >
                    {AllMoney[0].name}
                  </MenuItem>
                  <MenuItem
                    value={AllMoney[1].name}
                  >
                    {AllMoney[1].name}
                  </MenuItem>
                </CustomInput>
                <div className=' w-full' >
                  <MoneyInput
                      name="cantidad"
                      required={true}
                      value={currentTransaction.cantidad}
                      disabled={currentTransaction.correo}
                      onChange={handleChange}
                      label={t('comon.transaction.input-amount')}
                      prefix='S/ '
                      />
                </div>
            </div>
            <div className="col-span-1 mt-5" >
                <DatePicker
                    name='fecha'
                    disabled ={currentTransaction.correo}
                    className="w-full"
                    label={t('comon.transaction.input-date')}
                    value={dayjs(currentTransaction.fecha)}
                    onChange={saveDate}
                    />
            </div>

            <div className="col-span-1 mt-5">
                <CustomInput
                    value={currentTransaction.descripcion}
                    name="descripcion"
                    onChange={handleChange}
                    type="text"
                    InputProps={{
                      placeholder: 'desconocido'
                    }}
                    label={t('comon.transaction.input-description')}
                    />
            </div>
            <div className="col-span-1 mt-5 items-center flex justify-stretch " >
                { !currentTransaction.correo &&
                  <div className=' col-span-1 ' >
                    <Checkbox
                      checked={disable}
                      onChange={switchDisable}
                    />
                  </div>}
                <div className='w-full' >
                  <CustomInput
                      name="origen"
                      type="text"
                      value={currentTransaction.origen}
                      disabled={disable || currentTransaction.correo}
                      onChange={handleChange}
                      label={t('comon.transaction.input-origin')}
                      InputProps={{
                        placeholder: 'EFECTIVO'
                      }}
                      />
                </div>
            </div>
            <div className="col-span-1 mt-5" >
                <CustomInput
                    select
                    name="categoria"
                    type="text"
                    value={currentTransaction.categoria}
                    onChange={handleChange}
                    label={t('comon.transaction.input-category')}
                    >
                    {user?.categoria.map((category) => (
                      <MenuItem
                        key={category.nombre}
                        value={category.nombre}
                        className="capitalize" >
                            {category.nombre}
                          </MenuItem>
                    ))}
                </CustomInput>
            </div>
            <div className="text-center mt-10" >
                <CustomButtonLoading text={t('comon.transaction.button-save')} loading={loading} />
            </div>
        </form>
    </>
  )
}

export default FormTransaction
