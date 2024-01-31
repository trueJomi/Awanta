import { Button, Step, StepLabel, Stepper } from '@mui/material'
import React from 'react'
import { useUserProgressiveStore } from '../../../store/userProgresive.store'

interface StepsCreateUser {
  name: string
  step: React.ReactNode
}

const SteperPc: React.FC<{ steps: StepsCreateUser[] }> = ({ steps }) => {
  const { currentUser } = useUserProgressiveStore()
  const [activeStep, setActiveStep] = React.useState(0)

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }
  const handleFinish = () => {
    console.log(currentUser)
    setActiveStep(0)
  }

  return (
    <div>
        <Stepper activeStep={activeStep}>
          {steps.map((step) => {
            const stepProps: { completed?: boolean } = {}
            const labelProps: {
              optional?: React.ReactNode
            } = {}
            return (
              <Step key={step.name} {...stepProps}>
                <StepLabel {...labelProps}>{step.name}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        <div>
          <div className=' space-y-8 max-w-lg px-3 mx-auto text-center mt-10' >
            {steps[activeStep].step}
          </div>
          <div className='flex flex-row pt-1 justify-end gap-2 mt-5' >
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            {activeStep !== steps.length - 1
              ? <Button
                  color="inherit"
                  variant='contained'
                  className='!bg-main-blue !text-main-white'
                  onClick={handleNext}>
                    Next
                </Button>
              : <Button
                  color="inherit"
                  variant='contained'
                  className='!bg-main-yellow !text-main-brown'
                  onClick={handleFinish}>
                  Finish
                </Button>}

          </div>
        </div>
      </div>
  )
}

export default SteperPc
