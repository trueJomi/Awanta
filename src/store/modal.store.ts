import { type Categoria } from './../models/Categoria.model'
import { create } from 'zustand'
import { type ModalsProps } from '../models/utils/Modals.model'
import { type Transaccion } from '../models/Transaccion.model'

interface ModalTransactionsDeleteProps extends ModalsProps {
  transaction: Transaccion | undefined
  setTransaction: (value: Transaccion | undefined) => void
}

export const useModalTransactionsDeleteStore = create<ModalTransactionsDeleteProps>((set) => ({
  transaction: undefined,
  setTransaction: (value: Transaccion | undefined) => { set(() => ({ transaction: value })) },
  getModal: false,
  setModal: (value: boolean) => { set(() => ({ getModal: value })) }
}))

export const useModalAddCategoriaStore = create<ModalsProps>((set) => ({
  getModal: false,
  setModal: (value: boolean) => { set(() => ({ getModal: value })) }
}))

interface ModalModalDeleteCategoriaProps extends ModalsProps {
  categoria: Categoria | undefined
  setCategoria: (value: Categoria | undefined) => void
}

export const useModalDeleteCategoriaStore = create<ModalModalDeleteCategoriaProps>((set) => ({
  categoria: undefined,
  setCategoria: (value: Categoria | undefined) => { set(() => ({ categoria: value })) },
  getModal: false,
  setModal: (value: boolean) => { set(() => ({ getModal: value })) }
}))

export const useModalEditLimiteGastosStore = create<ModalsProps>((set) => ({
  getModal: false,
  setModal: (value: boolean) => { set(() => ({ getModal: value })) }
}))
