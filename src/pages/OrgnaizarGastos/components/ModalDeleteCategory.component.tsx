import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { MdWarning } from 'react-icons/md'
import { useTranslation } from 'react-i18next'
import { UserService } from '../../../services/User.service'
import { useAuth } from '../../../hooks/Auth.hook'
import { useModalDeleteCategoriaStore } from '../../../store/modal.store'

const userService = new UserService()

const ModalDeleteCategory: React.FC = () => {
  const { getModal, setModal, categoria } = useModalDeleteCategoriaStore((state) => state)
  const { user } = useAuth()
  const { t } = useTranslation()
  const cancelButtonRef = React.useRef(null)
  const close = () => {
    setModal(false)
  }

  const deleteCategory = () => {
    if (user !== undefined && categoria !== undefined) {
      void userService.eliminarCategoria(user, categoria)
    }
  }

  return (
        <Transition.Root show={getModal} as={React.Fragment} >
                <Dialog as="div" className="relative z-10" __demoMode initialFocus={cancelButtonRef} onClose={setModal}>
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
                          <div className="bg-white dark:bg-gray-700 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                              <div className="text-[1.5rem] mx-auto flex h-12 w-12 text-red-500 flex-shrink-0 items-center justify-center rounded-full bg-blue-base/20 dark:bg-whiteBase/20 sm:mx-0 sm:h-10 sm:w-10">
                                <MdWarning aria-hidden="true" />
                              </div>
                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                                <Dialog.Title as="h3" className="capitalize text-lg font-semibold leading-6 text-red-500">
                                  {t('comon.modalSecure.title-alert')}
                                </Dialog.Title>
                                <div className="mt-2">
                                    {t('tab-2.alert-p1')} <span className="text-red-500 font-black uppercase" >{categoria?.nombre}</span> {t('tab-2.alert-p2')} <span className="font-black uppercase" >consumo</span> {t('tab-2.alert-p3')}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              className="inline-flex w-full uppercase justify-center rounded-xl bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                              onClick={() => {
                                deleteCategory()
                                close()
                              }}
                            >
                              {t('comon.modalSecure.button-delete')}
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-xl bg-white dark:bg-slate-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-400 uppercase shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-500 sm:mt-0 sm:w-auto"
                              onClick={close}
                              ref={cancelButtonRef}
                            >
                              {t('comon.modalSecure.button-cancel')}
                            </button>
                          </div>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition.Root>
  )
}

export default ModalDeleteCategory
