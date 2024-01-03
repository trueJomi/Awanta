import { IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { type Transaccion } from '../../models/Transaccion.model'
import { TransactionService } from '../../services/Transaction.service'
import { getUserId } from '../../services/AuthFirebase.service'
import { useTranslation } from 'react-i18next'

const transactionService = new TransactionService()

const ButtonOcultarTransaction: React.FC<{ transaction: Transaccion }> = ({ transaction }) => {
  const { t } = useTranslation()

  return (
    <Tooltip title={transaction.visibilidad ? t('comon.transaction.button-hide') : t('comon.transaction.button-show') } >
      <IconButton
          onClick={() => {
            if (transaction.id !== undefined) {
              void transactionService.changeVisivility(!transaction.visibilidad, getUserId(), transaction.id)
            }
          }}
      >
          { transaction.visibilidad ? <MdVisibilityOff/> : <MdVisibility/> }
      </IconButton>
    </Tooltip>
  )
}

export default ButtonOcultarTransaction
