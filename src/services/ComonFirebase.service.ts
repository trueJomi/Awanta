import {
  type DocumentData,
  type OrderByDirection,
  type QuerySnapshot,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  type Query,
  startAfter,
  type DocumentSnapshot,
  getDoc
} from 'firebase/firestore'
import { app } from '../utilities/firebase-config.utilities'
const db = getFirestore(app)

// utilitie functions
const colletionPath = (path: string, idUser: string | undefined) => {
  if (idUser === undefined) {
    return collection(db, path)
  } else {
    return collection(db, `User/${idUser}/${path}`)
  }
}

// create functions
export const comonCreateData = async (data: any, path: string, id: string) => {
  const dataDoc = doc(db, path, id)
  await setDoc(dataDoc, data)
}

export const comonCreateDataWithId = async (data: any, path: string, idUser: string) => {
  const dataCol = collection(db, `User/${idUser}/${path}`)
  return await addDoc(dataCol, data)
}

// delete functions
export const comonDeleteData = async (path: string, id: string) => {
  const dataDoc = doc(db, path, id)
  await deleteDoc(dataDoc)
}

// update functions
export const comonUpdateData = async (data: any, path: string, id: string) => {
  const dataDoc = doc(db, path, id)
  await updateDoc(dataDoc, data)
}

// gets functions list
export const comonGetOrderByParam = async (path: string, idUser: string | undefined, param: string, limite: number = 1, order: OrderByDirection = 'desc') => {
  const dataCol = colletionPath(path, idUser)
  const qr = query(dataCol, orderBy(param, order), limit(limite))
  const result = await getDocs(qr)
  return result
}

export const comonGetOrderByParamListener = (path: string, idUser: string | undefined, param: string, limite: number = 1, order: OrderByDirection = 'desc', fun: (snapshot: QuerySnapshot<DocumentData>) => void) => {
  const dataCol = colletionPath(path, idUser)
  const qr = query(dataCol, orderBy(param, order), limit(limite))
  return onSnapshot(qr, fun, (err) => { console.log(err.message) })
}

export const comonGetIntervalDate = async (path: string, idUser: string | undefined, interval: Date[], order: OrderByDirection = 'desc') => {
  const dataCol = colletionPath(path, idUser)
  const qr = query(dataCol, orderBy('date', order), where('date', '>=', interval[0]), where('date', '<=', interval[1]))
  const result = await getDocs(qr)
  return result
}

export const comonGetIntervalDateListener = (path: string, idUser: string | undefined, interval: Date[], order: OrderByDirection = 'desc', fun: (snapshot: QuerySnapshot<DocumentData>) => void) => {
  const dataCol = colletionPath(path, idUser)
  const qr = query(dataCol, orderBy('date', order), where('date', '>=', interval[0]), where('date', '<=', interval[1]))
  return onSnapshot(qr, fun, (err) => { console.log(err.message) })
}

export const comonGetPaginated = async (path: string, idUser: string | undefined, limite: number = 15, page: number) => {
  const dataCol = colletionPath(path, idUser)
  const start = getPage(page, limite)
  let qrInit: Query<DocumentData>
  if (start === 1) {
    qrInit = query(dataCol, orderBy('date', 'desc'), limit(limite))
  } else {
    const tempDataLast = query(dataCol, orderBy('date', 'desc'), limit(start))
    const docRefereceLAst = await getDocs(tempDataLast)
    const startDoc = docRefereceLAst.docs[docRefereceLAst.docs.length - 1]
    qrInit = query(dataCol, orderBy('date', 'desc'), startAfter(startDoc), limit(limite))
  }
  const result = await getDocs(qrInit)
  return result
}

export const comonGetAllDataWhere = async (path: string, idUser?: string, param?: string, iqual?: string) => {
  const ref = colletionPath(path, idUser)
  if (param !== undefined && iqual !== undefined) {
    const qr = query(ref, where(param, '==', iqual))
    return await getDocs(qr)
  }
  return await getDocs(ref)
}

export const comonGetAllDataWhereListener = (path: string, fun: (snapshot: QuerySnapshot<DocumentData, DocumentData>) => void, idUser?: string, param?: string, iqual?: string) => {
  const ref = colletionPath(path, idUser)
  if (param !== undefined && iqual !== undefined) {
    const qr = query(ref, where(param, '==', iqual))
    return onSnapshot(qr, fun, (err) => { console.log(err.message) })
  }
}

// get cartacteristic functions

export const comonGetCantPages = async (path: string, idUser: string, cant: number = 15) => {
  const dataCol = colletionPath(path, idUser)
  const result = await getDocs(dataCol)
  const numPageRaw = result.size / cant
  let truncatePagData = Math.trunc(numPageRaw)
  if (numPageRaw > truncatePagData) {
    truncatePagData = truncatePagData + 1
  }
  const list: number[] = []
  for (let step = 1; step <= truncatePagData; step++) {
    list.push(step)
  }
  return list
}

const getPage = (page: number, comp: number) => {
  if (page === 1) {
    return 1
  } else {
    page = page - 1
  }
  return (page * comp)
}

// get data functions
export const comonGetData = async (path: string, id: string) => {
  const dataDoc = doc(db, path, id)
  return await getDoc(dataDoc)
}

export const comonGetDataListener = (path: string, id: string, fun: (data: DocumentSnapshot<DocumentData>) => void) => {
  const dataDoc = doc(db, path, id)
  return onSnapshot(dataDoc, fun, (err) => { console.log(err.message) })
}
