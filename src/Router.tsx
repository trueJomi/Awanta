import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import Auth from './pages/Auth'
import { type LayoutNav } from './models/utils/Layout.model'
import CredentialsPage from './pages/Credentials'
import Layout from './components/Layout.component'
import { useTranslation } from 'react-i18next'
import PrivateRoute from './hooks/PrivateRoute.hook'
import OnlyPublicRoute from './hooks/OnlyPublicRoute.hook'
import UserPage from './pages/User'
import CreateTransactionPage from './pages/CreateTransaction'
import AsesoratePage from './pages/Asesorate'
import ComunityPage from './pages/Comunity'
import EditTransaccionPage from './pages/EditTransaccion'
import SubscribePage from './pages/Susbscribe'
import NotFoundPage from './pages/NotFound'
import PoliticsAndConditionsPage from './pages/PoliticsAndConditions'
import PoliticasHomePage from './pages/PoliticasHome'
import HomePage from './pages/Home'
import HistorialPage from './pages/Historial'
import SettingsPage from './pages/Settings'
import OrganizarGastosPage from './pages/OrgnaizarGastos'

const Routers: React.FC = () => {
  const { t } = useTranslation()

  const viewLayout: LayoutNav[] = [
    {
      path: '/',
      name: t('layout.tab-1')
    },
    {
      path: '/organizar',
      name: t('layout.tab-2')
    },
    {
      path: '/history',
      name: t('layout.tab-3')
    },
    {
      path: '/asesorate',
      name: t('layout.tab-4')
    },
    {
      path: '/comunity',
      name: t('layout.tab-5')
    }
  ]

  return (
        <Routes>
            <Route path="" element={
              <PrivateRoute>
                <Layout navLinks={viewLayout}/>
              </PrivateRoute>}
            >
                <Route path="" element={<HomePage/>} />
                <Route path='history' element={<HistorialPage/>} />
                <Route path="organizar" element={<OrganizarGastosPage/>} />
                <Route path="asesorate" element={<AsesoratePage/>} />
                <Route path="comunity" element={<ComunityPage/>}/>
            </Route>
            <Route path='' element={<PrivateRoute>
              <Outlet/>
            </PrivateRoute>} >
              <Route path="user" element={<UserPage/>} />
              <Route path="/transaction" element={<CreateTransactionPage/>} />
              <Route path="/transaction/:id" element={<EditTransaccionPage/>} />
              <Route path='settings' element={<SettingsPage/> } />
            </Route>
            <Route path="auth" element={<OnlyPublicRoute><Auth/></OnlyPublicRoute>}/>

            <Route path='/credentials' element={<CredentialsPage/>} />
            <Route path="/user/politics" element={
              <PrivateRoute>
                <PoliticsAndConditionsPage/>
                </PrivateRoute>
              }/>
            <Route path='/home' element={<Navigate to="/" />} />
            <Route path='/conditions' element={<PoliticasHomePage/>} />
            <Route path='/subscribe' element={<SubscribePage/>} />
            <Route path="*" element={<NotFoundPage/>} />
        </Routes>
  )
}

export default Routers
