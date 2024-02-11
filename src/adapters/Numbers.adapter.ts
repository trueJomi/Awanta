export const adapterNumberString = (numero: number) => {
  const rounded = adapterNumberRound2(numero)
  const numberStr = rounded.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  return numberStr
}

export const adapterNumberRound2 = (numero: number) => {
  const rounded = Number(numero.toFixed(2))
  return rounded
}

export const adapterStringtoNumber = (numero: string) => {
  const number = Number(numero.replace(',', ''))
  return number
}
