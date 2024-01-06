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

export const getCurrentTheme = (): 'light' | 'dark' | null => {
  const theme = localStorage.getItem('theme') as 'light' | 'dark' | null
  return theme
}

export const setCurrentTheme = (theme: 'light' | 'dark') => {
  localStorage.setItem('theme', theme)
}
