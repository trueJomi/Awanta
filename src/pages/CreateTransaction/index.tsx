import React from 'react'
import { TransactionService } from '../../services/Transaction.service'
import FormTrnsacction from '../../components/Transactions/FormTransacction.component'
import { getUserId } from '../../services/AuthFirebase.service'
import LayoutReturn from '../../components/LayoutReturn.component'

const transactionService = new TransactionService()

const CreateTransactionPage: React.FC = () => {
  return (
    <LayoutReturn name="añadir gasto">
      <div className="max-w-lg mx-auto">
          <FormTrnsacction fun={ async (transaccion) => {
            await transactionService.save(transaccion, getUserId())
          }} />
      </div>
    </LayoutReturn>
  )
}

export default CreateTransactionPage
