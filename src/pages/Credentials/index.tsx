import React from 'react'
import { useNavigate } from 'react-router-dom'
import { handleTokenFromQueryParams } from '../../utilities/token.utilities'
import { loginWithCredentials } from '../../services/AuthFirebase.service'
import Loading from '../../components/Loading.component'

const CredentialsPage: React.FC = () => {
  const navigate = useNavigate()

  const loginQuery = async () => {
    const code = handleTokenFromQueryParams()
    const valid = await loginWithCredentials(code.accessToken, code.idToken)
    if (valid) {
      navigate('/')
    } else {
      navigate('/create/politics')
    }
  }

  React.useEffect(() => {
    void loginQuery().catch(() => {
      navigate('/subscribe')
    })
  }, [])
  return (
    <Loading/>
  )
}

export default CredentialsPage
