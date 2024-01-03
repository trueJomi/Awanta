import { Card } from '@mui/material'
import React from 'react'

const CardTransactionsSqueleton: React.FC = () => {
  return (
    <Card className='h-[9.5rem] max-w-[38rem] mx-auto mb-5 animate-pulse !bg-gray-200 dark:!bg-gray-700' />
  )
}

export default CardTransactionsSqueleton
