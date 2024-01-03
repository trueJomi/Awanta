export const getLocalStorageObject = () => {
  const storageRaw = localStorage.getItem('authGoogle')
  if (storageRaw === null) throw new Error('No token found')
  const { accessToken, refreshToken, idToken, expirationDate } = JSON.parse(storageRaw)
  return {
    accessToken: accessToken as string,
    refreshToken: refreshToken as string,
    idToken: idToken as string,
    expirationDate: new Date(expirationDate as string)
  }
}

export const clearLocalStorageObject = () => {
  localStorage.removeItem('authGoogle')
}

export const setLocalStorageObject = (accessToken: string, refreshToken: string, expirationDate: Date, idToken: string) => {
  localStorage.setItem('authGoogle', JSON.stringify({
    accessToken,
    refreshToken,
    idToken,
    expirationDate: expirationDate.toString()
  }))
}
