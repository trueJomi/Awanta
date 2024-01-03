export const adapterNumberString = (numero: number) => {
  const rounded = adapterNumberRound2(numero)
  let numberStr = rounded.toString()
  const validate = numberStr.split('.')
  if (validate[1] !== undefined) {
    if (validate[1].length !== 2) {
      numberStr = numberStr + '0'
    }
    return numberStr
  } else {
    numberStr = numberStr + '.00'
    return numberStr
  }
}

export const adapterNumberRound2 = (numero: number) => {
  const rounded = Number(numero.toFixed(2))
  return rounded
}
