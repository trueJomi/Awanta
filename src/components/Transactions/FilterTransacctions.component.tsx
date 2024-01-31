import React from 'react'
import CustomInput from '../Custom/CustomInput.component'
import { allOriginis, filtersTransactions } from '../../contexts/transactions.context'
import { MenuItem, ToggleButton, Tooltip } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { type Transaccion } from '../../models/Transaccion.model'
import { filtredTransactionOrigin, invertArray } from '../../utilities/filters.utilities'
import { MdSort } from 'react-icons/md'

const FilterTransacctions: React.FC<{ setTransactions: (data: Transaccion[]) => void, transactions: Transaccion[] | undefined }> = ({ setTransactions, transactions }) => {
  const [type, setType] = React.useState<string>('all')
  const [invert, setInvert] = React.useState(false)
  const [orderBy, setOrderBy] = React.useState<string>(filtersTransactions[0].name)

  const { t } = useTranslation()

  const handleFilter = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setType(input.target.value)
  }

  const handleOrderBy = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrderBy(input.target.value)
  }

  React.useEffect(() => {
    if (transactions !== undefined) {
      let dataFiltred = filtredTransactionOrigin(transactions, type)
      const infoFilter = filtersTransactions.find((filter) => filter.name === orderBy)
      if (infoFilter !== undefined) {
        dataFiltred = infoFilter?.filter(dataFiltred)
      }
      if (invert) {
        dataFiltred = invertArray(dataFiltred)
      }
      setTransactions(dataFiltred)
    }
  }, [transactions, type, invert, orderBy])
  return (
    <div className='items-center flex justify-stretch gap-4 leading-6 w-full' >
      <div className='max-w-44 w-full' >
        <CustomInput
          type='text'
          select
          defaultValue='all'
          onChange={handleFilter}
          label={t('comon.transaction.filter-bank')}
          name='filter-bank'
        >
          <MenuItem
              value={'all'}>
              {t('comon.transaction.filter-all')}
          </MenuItem>
          {allOriginis.map((origin) => (
              <MenuItem
                  key={origin.name}
                  value={origin.name}
              >
                  {origin.name}
              </MenuItem>
          ))}
        </CustomInput>
      </div>
      <div className=' max-w-40 w-full' >
        <CustomInput
          type='text'
          select
          onChange={handleOrderBy}
          defaultValue={filtersTransactions[0].name}
          label={t('comon.transaction.order-by')}
          name='order-by'
        >
          {filtersTransactions.map((filter) => (
            <MenuItem
              key={filter.name}
              value={filter.name}
            >
              {t(`comon.transaction.filters.${filter.name}`)}
            </MenuItem>
          ))}
        </CustomInput>
      </div>
      <div className='' >
        <Tooltip
          title={invert ? t('comon.transaction.filters.invert.up') : t('comon.transaction.filters.invert.down')}
        >
          <ToggleButton
            value='invert'
            selected={invert}
            className= '!text-3xl'
            onChange={() => { setInvert(!invert) }}
          >
            <MdSort className={`duration-200 ${invert ? 'rotate-180' : ''}`} />
          </ToggleButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default FilterTransacctions
