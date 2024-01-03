import React from 'react'
import { LoadingButton } from '@mui/lab'
import { CircularProgress } from '@mui/material'

const CustomButtonLoading: React.FC<{ loading: boolean, text: string, color?: 'yellow' | 'blue' }> = ({ loading, text, color = 'yellow' }) => {
  return (
    <LoadingButton
      fullWidth
      loading={ loading }
      type='submit'
      size='large'
      color='inherit'
      sx={{
        color: color === 'yellow' ? '#3f2c25' : '#fff3e3',
        backgroundColor: color === 'yellow' ? '#ffc34d' : '#3a5c92',
        borderRadius: '10px',
        fontWeight: 'bold',
        ':hover': { backgroundColor: color === 'yellow' ? '#ffc34d' : '#3a5c92' }
      }}
      loadingIndicator = {<CircularProgress color='inherit' sx={{
        color: '#3f2c25'
      }}
      size={20}
      />}
    >
      { text }
    </LoadingButton>
  )
}

export default CustomButtonLoading
