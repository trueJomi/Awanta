import React from 'react'
import { getToken } from '../utilities/token.utilities'
import { useAuth } from './Auth.hook'
import { getMessagesGoogle } from '../services/FirebaseFuntions.service'
import { useGmailStore } from '../store/gmail.store'
import { TransactionService } from '../services/Transaction.service'
import { getUserId } from '../services/AuthFirebase.service'

const transactionsServices = new TransactionService()

const GmailProvider: React.FC<{ children: any }> = ({ children }) => {
  const { user } = useAuth()
  const { loadingMessages, setLoadingMessages } = useGmailStore((state) => state)

  const getGmailsMessages = async () => {
    const tokens = await getToken()
    return await getMessagesGoogle(tokens.accessToken)
  }

  React.useEffect(() => {
    if ((user !== undefined && loadingMessages)) {
      getGmailsMessages().then(async (data) => {
        if (data.length !== 0) {
          await transactionsServices.saveAll(data, getUserId())
        }
        setLoadingMessages(false)
      }).catch(() => {
        setLoadingMessages(false)
      })
    }
  }, [loadingMessages, user])

  return children
}

export {
  GmailProvider
}
