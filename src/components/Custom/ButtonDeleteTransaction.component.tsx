import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { type Transaccion } from '../../models/Transaccion.model'
import { useTranslation } from 'react-i18next'
import { useModalTransactionsDeleteStore } from '../../store/modal.store'

const ButtonDeleteTransaction: React.FC<{ transaction: Transaccion }> = ({ transaction }) => {
  const { setTransaction, setModal } = useModalTransactionsDeleteStore((state) => state)
  const { t } = useTranslation()

  return (
    <Tooltip title={t('comon.transaction.button-delete')} >
      <IconButton onClick={() => {
        setTransaction(transaction)
        setModal(true)
      }} className=' hover:text-red-500 duration-200' >
          <MdDelete/>
      </IconButton>
    </Tooltip>
  )
}

export default ButtonDeleteTransaction
