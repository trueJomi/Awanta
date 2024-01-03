import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { MdDelete } from 'react-icons/md'
import { useServiceModal } from '../../hooks/Modal.hook'
import { type Transaccion } from '../../models/Transaccion.model'
import { useTranslation } from 'react-i18next'

const ButtonDeleteTransaction: React.FC<{ transaction: Transaccion }> = ({ transaction }) => {
  const { alertDelete } = useServiceModal()
  const { t } = useTranslation()

  return (
    <Tooltip title={t('comon.transaction.button-delete')} >
      <IconButton onClick={() => {
        alertDelete.setContent(transaction.id)
        alertDelete.set(true)
      }} className=' hover:text-red-500 duration-200' >
          <MdDelete/>
      </IconButton>
    </Tooltip>
  )
}

export default ButtonDeleteTransaction
