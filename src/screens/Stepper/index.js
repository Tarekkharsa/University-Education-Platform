import * as React from 'react'
import PropTypes from 'prop-types'
import {styled} from '@mui/material/styles'
import Stack from '@mui/material/Stack'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Check from '@mui/icons-material/Check'
import SettingsIcon from '@mui/icons-material/Settings'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import VideoLabelIcon from '@mui/icons-material/VideoLabel'
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector'
import Iconify from 'components/Iconify'
import ProfileForm from './Partials/ProfileForm'
import ShowProfile from './Partials/ShowProfile'
import {Typography} from '@mui/material'
import {FormattedMessage} from 'react-intl'

const ColorlibConnector = styled(StepConnector)(({theme}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}))

const ColorlibStepIconRoot = styled('div')(({theme, ownerState}) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}))

function ColorlibStepIcon(props) {
  const {active, completed, className} = props

  const icons = {
    1: <Iconify icon="carbon:user-profile" />,
    2: <Iconify icon="material-symbols:pending-actions" />,
    3: <Iconify icon="carbon:task-approved" />,
  }

  return (
    <ColorlibStepIconRoot
      ownerState={{completed, active}}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  )
}

const steps = ['complete_profile', 'wait_for_approval', 'approved']

export default function CustomizedSteppers() {
  const [activeStep, setActiveStep] = React.useState(1)
  return (
    <Stack sx={{width: '100%'}} spacing={4}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
      >
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <Typography variant="subtitle2" sx={{color: 'text.primary'}}>
                <FormattedMessage id={label} />
              </Typography>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && <ProfileForm />}
        {activeStep === 1 && <ShowProfile />}
        {activeStep === 2 && <>Welcome ....</>}
      </div>
    </Stack>
  )
}
