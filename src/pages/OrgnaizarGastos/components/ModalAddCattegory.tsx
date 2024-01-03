import React from 'react'
import { useServiceModal } from '../../../hooks/Modal.hook'
import { Transition, Dialog } from '@headlessui/react'
import { HexColorPicker } from 'react-colorful'
import { adaptativeColorText } from '../../../utilities/color.utilities'
import { type Categoria } from '../../../models/Categoria.model'
import { useAuth } from '../../../hooks/Auth.hook'
import { MdAddBox } from 'react-icons/md'
import CustomInput from '../../../components/Custom/CustomInput.component'
import { useTranslation } from 'react-i18next'
import { UserService } from '../../../services/User.service'
import { validateCategory } from '../../../utilities/validates.utilities'
import { Button } from '@mui/material'

const userService = new UserService()

const ModalAddCattegory: React.FC = () => {
  const { user } = useAuth()
  const { modalLimiteCompra } = useServiceModal()
  const [nameCategory, setNameCategory] = React.useState<string>('')
  const [equalCategory, setEqualCategory] = React.useState<boolean>(true)
  const [color, setColor] = React.useState<string>('#aabbcc')
  const { t } = useTranslation()

  const saveName = (input: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (user !== undefined) {
      const valid = validateCategory(input.target.value, user.categoria)
      if (!valid) {
        setEqualCategory(true)
      } else {
        setEqualCategory(false)
      }
    }
    setNameCategory(input.target.value)
  }

  const saveColor = (hex: string) => {
    setColor(hex)
  }

  const cancelButtonRef = React.useRef(null)

  const guardarCategory = () => {
    if (user !== undefined && nameCategory !== '') {
      const categoria: Categoria = {
        nombre: nameCategory,
        color
      }
      void userService.updateCategorias(user, categoria)
    }
  }

  return (
      <>
        <Transition.Root show={modalLimiteCompra.get} as={React.Fragment}>
          <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={modalLimiteCompra.set}>
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
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-main-blue/20 dark:bg-main-white/20 sm:mx-0 sm:h-10 sm:w-10">
                          <MdAddBox className="h-6 w-6 text-main-blue dark:text-main-white " aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                          <Dialog.Title as="h3" className="capitalize text-base font-semibold leading-6 text-gray-900 dark:text-main-white">
                            {t('tab-2.modal.title-modal')}
                          </Dialog.Title>
                          <div className="mt-2">
                            <CustomInput
                              name='category'
                              label={t('tab-2.modal.input-category')}
                              type="text"
                              change={saveName}
                            />
                          </div>
                          <div className="mt-2 mx-auto">
                            <div className="capitalize font-bold inline-block" >{t('tab-2.modal.input-color')}</div>
                            <div className=' mt-2' >
                              <HexColorPicker style={{ width: '100%' }} color={color} onChange={saveColor} />
                            </div>
                          </div>
                          <div className="mt-4 mx-auto" >
                            <div className=' rounded-2xl py-2 uppercase font-black text-center' style={{ backgroundColor: color, color: adaptativeColorText(color) }}> {nameCategory} </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <Button
                        type="button"
                        disabled={equalCategory}
                        className="inline-flex w-full !justify-center !rounded-xl !bg-main-yellow disabled:!bg-gray-300 disabled:opacity-50 px-3 py-2 !text-sm !font-semibold !text-main-brown shadow-sm sm:!ml-3 sm:!w-auto"
                        onClick={() => {
                          guardarCategory()
                          modalLimiteCompra.set(false)
                        }}
                      >
                        {t('tab-2.modal.button-acept')}
                      </Button>
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full uppercase justify-center rounded-xl bg-white dark:bg-slate-600 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-slate-500 sm:mt-0 sm:w-auto"
                        onClick={() => {
                          modalLimiteCompra.set(false)
                        }}
                        ref={cancelButtonRef}
                      >
                        {t('tab-2.modal.button-cancel')}
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
  )
}

export default ModalAddCattegory
