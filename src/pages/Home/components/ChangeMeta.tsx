import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MdCheckCircleOutline } from 'react-icons/md'
import CustomInput from '../../../components/Custom/CustomInput.component'
import { LimiteGastoService } from '../../../services/LimiteGastos.service'
import { useAuth } from '../../../hooks/Auth.hook'
import { useServiceModal } from '../../../hooks/Modal.hook'
import { useTranslation } from 'react-i18next'
import { type LimiteGastos } from '../../../models/LimiteGastos.model'

const limiteGastoService = new LimiteGastoService()

const ChangeMeta: React.FC = () => {
  const { user } = useAuth()
  const { modalLimiteCompra } = useServiceModal()
  const [currentMeta, setCurrentMeta] = React.useState<number>(0)
  const { t } = useTranslation()

  const detectMeta = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCurrentMeta(+input.target.value)
  }

  const close = () => {
    modalLimiteCompra.set(false)
  }

  const cancelButtonRef = React.useRef(null)

  const saveLimiteGasto = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentMeta !== undefined && user !== undefined) {
      const limiteGasto: LimiteGastos = {
        cantidad: currentMeta,
        moneda: 'PEN',
        fecha: new Date(),
        categoria: 'general'
      }
      void limiteGastoService.save(limiteGasto, user.idUser)
      close()
    }
  }

  return (
        <>
          <Transition.Root show={modalLimiteCompra.get} as={React.Fragment} >
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={modalLimiteCompra.set}>
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
              <div className="fixed inset-0 dark:bg-gray-800 dark:opacity-75  bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <form onSubmit={saveLimiteGasto}>
                        <div className="bg-white dark:bg-gray-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                          <div className="sm:flex sm:items-start">
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-main-blue/20 dark:bg-main-white/20 sm:mx-0 sm:h-10 sm:w-10">
                              <MdCheckCircleOutline className="h-6 w-6 text-main-blue dark:text-main-white " aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                              <Dialog.Title as="h3" className="capitalize text-base font-semibold leading-6 text-gray-900 dark:text-main-white">
                              {t('tab-1.modal.title')}
                              </Dialog.Title>
                              <div className="mt-2">
                                <CustomInput
                                  name='meta'
                                  label={t('tab-1.modal.input-meta')}
                                  type="number"
                                  change={detectMeta}
                                  inputProps={{
                                    placeholder: '0.00',
                                    startAdornment: <span className="mr-3" >S/</span>
                                  }}
                                  />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type='submit'
                            className="inline-flex w-full uppercase justify-center rounded-xl bg-main-yellow px-3 py-2 text-sm font-semibold text-main-brown shadow-sm sm:ml-3 sm:w-auto"
                            >
                            {t('tab-1.modal.button-acept')}
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full uppercase justify-center rounded-xl bg-white dark:bg-slate-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-500 sm:mt-0 sm:w-auto"
                            onClick={close}
                            ref={cancelButtonRef}
                            >
                            {t('tab-1.modal.button-cancel')}
                          </button>
                        </div>
                      </form>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>
        </>
  )
}

export default ChangeMeta
