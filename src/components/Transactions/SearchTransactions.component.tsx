import React from 'react'
import CustomInput from '../Custom/CustomInput.component'
import { type Transaccion } from '../../models/Transaccion.model'

const SearchTransactions: React.FC <{ setTransactions: (data: Transaccion[]) => void, transactions: Transaccion[] | undefined }> = ({ setTransactions, transactions }) => {
  const [search, setSearch] = React.useState<string | undefined>(undefined)

  const handleSearch = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(input.target.value)
  }

  React.useEffect(() => {
    if (transactions !== undefined) {
      if (search !== undefined) {
        const dataFiltred = transactions.filter((transaction) => transaction.descripcion.toLowerCase().includes(search.toLowerCase()))
        setTransactions(dataFiltred)
      }
    }
  }, [search, transactions])
  return (
    <CustomInput
        name='seach'
        type='text'
        label='Buscar'
        value={search}
        onChange={handleSearch}
    />
  )
}

export default SearchTransactions
