export const interesCompuesto = (interes: number, total: number, entry: number, cant: number, frecuency: 'mensual' | 'anual', time: 'inicio' | 'fin') => {
  let entradaTotal = 0
  let price = total
  if (frecuency === 'anual') {
    for (let plazo = 0; plazo <= cant - 1; plazo++) {
      if (time === 'inicio') {
        price += entry
        entradaTotal += entry
      }
      price = interesCompuestoBase(interes, 1, price)
      if (time === 'fin') {
        price += entry
        entradaTotal += entry
      }
    }
  } else {
    for (let plazo = 0; plazo <= (12 * cant) - 1; plazo++) {
      if (time === 'inicio') {
        price = price + entry
        entradaTotal = entradaTotal + entry
      }
      const partInteres = interes / 12
      price = interesCompuestoBase(partInteres, 1, price)
      if (time === 'fin') {
        price += entry
        entradaTotal += entry
      }
    }
  }
  const gananciaTotal = price - entradaTotal
  return gananciaTotal
}

export const interesCompuestoBase = (interes: number, plazos: number, base: number) => {
  const final = base * Math.pow((1 + (interes / 100)), plazos)
  return final
}
