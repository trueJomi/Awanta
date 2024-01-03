import React from 'react'
import { getToken } from '../utilities/token.utilities'
import { useAuth } from './Auth.hook'
import { getMessagesGoogle } from '../services/FirebaseFuntions.service'
import { getUserId } from '../services/AuthFirebase.service'

interface GmailService {
  setLoadingMessages: React.Dispatch<React.SetStateAction<boolean>>
  loadingMessages: boolean
}

const GamilContext = React.createContext<GmailService>({
  loadingMessages: false,
  setLoadingMessages: function (value: React.SetStateAction<boolean>): void {
    throw new Error('Function not implemented.')
  }
})

const GmailProvider: React.FC<{ children: any }> = ({ children }) => {
  const { user } = useAuth()
  const [loadingMessages, setLoadingMessages] = React.useState<boolean>(true)

  const getGmailsMessages = async (id: string) => {
    const tokens = await getToken()
    return await getMessagesGoogle(id, tokens.accessToken)
  }

  const gmail = {
    setLoadingMessages,
    loadingMessages
  }

  React.useEffect(() => {
    if (user !== undefined) {
      getGmailsMessages(getUserId()).then(() => {
        setLoadingMessages(false)
      }).catch(() => {
        setLoadingMessages(false)
      })
    }
  }, [loadingMessages, user])

  return (
        <GamilContext.Provider value={gmail}>
            {children}
        </GamilContext.Provider>
  )
}

function useGmail () {
  const gmail = React.useContext(GamilContext)
  return gmail
}

export {
  GmailProvider,
  useGmail
}
