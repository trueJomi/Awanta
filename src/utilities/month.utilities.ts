import { meses, months } from '../contexts/times.context'

export const getMonthString = (intMonth: number = 0, lang: string) => {
  const currentDate = new Date()
  currentDate.setMonth(currentDate.getMonth() + intMonth)
  if (lang === 'en') {
    return {
      month: months[currentDate.getMonth()],
      year: currentDate.getFullYear()
    }
  } if (lang === 'es') {
    return {
      month: meses[currentDate.getMonth()],
      year: currentDate.getFullYear()
    }
  } else {
    throw new Error('Language not supported')
  }
}

export const getMonthStringCurrent = (intMonth: number = 0, lang: string) => {
  const currentMonth = (intMonth - 1) * -1
  return getMonthString(currentMonth, lang)
}
