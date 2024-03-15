import React from 'react'
import { useAuth } from '../../../hooks/Auth.hook'
import { useTranslation } from 'react-i18next'
import CustomInput from '../../../components/Custom/CustomInput.component'
import { MenuItem } from '@mui/material'
import { telefonos } from '../../../contexts/money.context'

const FormUser: React.FC = () => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [name, setName] = React.useState(user?.nombre)
  const [lastName, setLastName] = React.useState(user?.apellido)
  const [phone, setPhone] = React.useState(user?.telefono)
  const [number, setNumber] = React.useState(telefonos[0].number)

  const handleNameChange = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setName(input.target.value)
  }

  const handleLastNameChange = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setLastName(input.target.value)
  }

  const handlePhoneChange = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPhone(input.target.value)
  }

  const handleNumberChange = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNumber(input.target.value)
  }

  React.useEffect(() => {
    const currentData = {
      name,
      lastName,
      phone: number + phone
    }
    console.log(currentData)
  }, [name, lastName, phone, number])

  React.useEffect(() => {
    if (user !== undefined) {
      setName(user.nombre)
      setLastName(user.apellido)
      setPhone(user.telefono)
    }
  }, [user])

  return (
    <>
        <h1 className=' uppercase' >{t('create.title')}</h1>
        <div>
            <CustomInput
                type='text'
                onChange={handleNameChange}
                InputProps={{
                  placeholder: 'Jhon'
                }}
                label={t('create.input-name')}
                defaultValue={name}
                name="name"
            />
        </div>
        <div>
            <CustomInput
                type='text'
                InputProps={{
                  placeholder: 'Titor'
                }}
                onChange={handleLastNameChange}
                label={t('create.input-lastname')}
                defaultValue={lastName}
                name="lastName"
            />
        </div>
        <div className='flex justify-stretch gap-4 w-full' >
            <div className='w-full max-w-28' >
              <CustomInput
                  type='text'
                  label="number"
                  name="number"
                  value={number}
                  onChange={handleNumberChange}
                  select
              >
                  {telefonos.map((tel) => (
                      <MenuItem
                          key={tel.name}
                          value={tel.number}
                      >
                          {tel.name} +{tel.number}
                      </MenuItem>
                  ))}
              </CustomInput>
            </div>
            <div className='w-full' >
              <CustomInput
                  type='tel'
                  InputProps={{
                    placeholder: '999 999 999'
                  }}
                  onChange={handlePhoneChange}
                  label={t('create.input-phone')}
                  name="phone"
              />
            </div>
        </div>
    </>
  )
}

export default FormUser
