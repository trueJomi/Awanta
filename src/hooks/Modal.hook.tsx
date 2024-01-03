import React from 'react'

interface ModalsService {
  modalLimiteCompra: {
    get: boolean
    set: React.Dispatch<React.SetStateAction<boolean>>
  }
  modalHistory: {
    get: boolean
    set: React.Dispatch<React.SetStateAction<boolean>>
  }
  alertDelete: {
    get: boolean
    constents: any
    setContent: React.Dispatch<any>
    set: React.Dispatch<React.SetStateAction<boolean>>
  }
}

const ModalContext = React.createContext<ModalsService>({
  modalLimiteCompra: {
    get: false,
    set: function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.')
    }
  },
  modalHistory: {
    get: false,
    set: function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.')
    }
  },
  alertDelete: {
    get: false,
    constents: undefined,
    setContent: function (value: any): void {
      throw new Error('Function not implemented.')
    },
    set: function (value: React.SetStateAction<boolean>): void {
      throw new Error('Function not implemented.')
    }
  }
})

function ModalServiceProvider ({ children }: { children: any }) {
  const [limeteCompra, setLimeteCompra] = React.useState<boolean>(false)
  const [rHistory, setHistory] = React.useState<boolean>(false)
  const [alert, setAlert] = React.useState<boolean>(false)
  const [contentAlert, setContentAlert] = React.useState<any | undefined >(undefined)

  const modals: ModalsService = {
    modalLimiteCompra: {
      get: limeteCompra,
      set: setLimeteCompra
    },
    modalHistory: {
      get: rHistory,
      set: setHistory
    },
    alertDelete: {
      get: alert,
      constents: contentAlert,
      setContent: setContentAlert,
      set: setAlert
    }
  }

  return (
        <ModalContext.Provider value={modals} >
            {children}
        </ModalContext.Provider>
  )
}

function useServiceModal () {
  const modals = React.useContext(ModalContext)
  return modals
}

export {
  ModalServiceProvider,
  useServiceModal
}
