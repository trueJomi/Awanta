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
import { type Transaccion } from '../../models/Transaccion.model'
import CustomButtonLoading from '../Custom/CustomButtonLoading.component'

const FormTransaction: React.FC<{ transaction?: Transaccion, fun: (transacction: Transaccion) => Promise<void> }> = ({ transaction, fun }) => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [loading, setLoading] = React.useState<boolean>(false)
  const [amount, setAmount] = React.useState<number | undefined>(undefined)
  const [description, setDescription] = React.useState<string | undefined>(undefined)
  const [money, setMoney] = React.useState<string>('PEN')
  const [origin, setOrigin] = React.useState<string>('EFECTIVO')
  const [disable, setDisable] = React.useState<boolean>(true)
  const [date, setDate] = React.useState<Date>(new Date())
  const [categoria, setCategoria] = React.useState<string>(cartegorysDefault[0].nombre)
  const [email, setEmail] = React.useState<boolean>(false)

  const guardarTransaction = (event: React.MouseEvent<HTMLFormElement>) => {
    setLoading(true)
    event.preventDefault()
    if (amount !== undefined && user !== undefined) {
      const descriptionPast = description !== undefined ? description.trim() : 'desconocido'
      const originPast = origin.trim() === '' ? 'EFECTIVO' : origin.trim().toUpperCase()
      const moneyPast = money ?? 'PEN'
      const data: Transaccion = transaction !== undefined
        ? {
            ...transaction,
            cantidad: amount,
            fecha: date,
            descripcion: descriptionPast,
            moneda: moneyPast,
            categoria
          }
        : {
            id: '00000000000',
            cantidad: amount,
            fecha: date,
            descripcion: descriptionPast,
            idTransaccion: v4(),
            moneda: moneyPast,
            origen: originPast,
            tipo: 'consumo',
            usuario: user.idUser,
            categoria,
            visibilidad: true,
            correo: false
          }
      void fun(data).then(() => {
        setLoading(false)
        navigate(-1)
      })
    }
  }

  const switchDisable = () => {
    setOrigin('EFECTIVO')
    setDisable(!disable)
  }

  const saveOrigin = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrigin(input.target.value)
  }

  const saveAmount = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAmount(+input.target.value)
  }

  const saveDescripcion = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setDescription(input.target.value)
  }

  const saveDate = (input: dayjs.Dayjs | null) => {
    if (input === null) return
    const dateNew = input?.toDate()
    setDate(dateNew)
  }

  const saveCategoria = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCategoria(input.target.value)
  }

  React.useEffect(() => {
    if (transaction !== undefined) {
      setAmount(transaction.cantidad)
      setDescription(transaction.descripcion)
      setDate(transaction.fecha)
      setCategoria(transaction.categoria)
      setOrigin(transaction.origen)
      setMoney(transaction.moneda)
      setEmail(transaction.correo)
    }
  }, [transaction])

  return (
        <>
        <form onSubmit={guardarTransaction}>
            <div className="col-span-1 mt-5" >
                <CustomInput
                    name="amount"
                    required={true}
                    value={amount}
                    disabled={email}
                    inputProps={{
                      placeholder: '0.00',
                      startAdornment: <span className="mr-3" >S/</span>
                    }}
                    type="number"
                    change={saveAmount}
                    label={t('comon.transaction.input-amount')}
                    />
            </div>
            <div className="col-span-1 mt-5" >
                <DatePicker
                    name='date'
                    disabled ={email}
                    className="w-full"
                    label={t('comon.transaction.input-date')}
                    value={dayjs(date)}
                    onChange={saveDate}
                    />
            </div>

            <div className="col-span-1 mt-5">
                <CustomInput
                    value={description}
                    name="description"
                    change={saveDescripcion}
                    type="text"
                    inputProps={{
                      placeholder: 'desconocido'
                    }}
                    label={t('comon.transaction.input-description')}
                    />
            </div>
            <div className="col-span-1 mt-5 items-center flex justify-stretch " >
                { !email &&
                  <div className=' col-span-1 ' >
                    <Checkbox
                      checked={disable}
                      onChange={switchDisable}
                    />
                  </div>}
                <div className='w-full' >
                  <CustomInput
                      name="origin"
                      type="text"
                      className=''
                      value={origin}
                      disabled={disable || email}
                      change={saveOrigin}
                      label={t('comon.transaction.input-origin')}
                      inputProps={{
                        placeholder: 'EFECTIVO'
                      }}
                      />
                </div>
            </div>
            <div className="col-span-1 mt-5" >
                <CustomInput
                    select
                    name="category"
                    type="text"
                    value={categoria}
                    change={saveCategoria}
                    label={t('comon.transaction.input-category')}
                    >
                    {user?.categoria.map((category, idx) => (
                      <MenuItem
                        key={idx}
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
