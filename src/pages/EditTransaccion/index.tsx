import React from 'react'
import { useParams } from 'react-router-dom'
import { type Transaccion } from '../../models/Transaccion.model'
import { getUserId } from '../../services/AuthFirebase.service'
import { TransactionService } from '../../services/Transaction.service'
import FormTransaction from '../../components/Transactions/FormTransacction.component'
import LayoutReturn from '../../components/LayoutReturn.component'

const transactionService = new TransactionService()
const EditTransaccionPage: React.FC = () => {
  const [transaccion, setTransaccion] = React.useState<Transaccion | undefined>(undefined)
  const { id } = useParams()

  React.useEffect(() => {
    const getTransaction = async (ids: string) => {
      const data = await transactionService.get(getUserId(), ids)
      setTransaccion(data)
    }
    if (id !== undefined) {
      void getTransaction(id)
    }
  }, [id])

  return (
    <LayoutReturn name="editar gasto">
        <div className="max-w-lg mx-auto" >
            <FormTransaction transaction={transaccion} fun={ async (data) => {
              if (id !== undefined) {
                void transactionService.update(data, getUserId(), id)
              }
            }} />
        </div>
    </LayoutReturn>
  )
}

export default EditTransaccionPage
