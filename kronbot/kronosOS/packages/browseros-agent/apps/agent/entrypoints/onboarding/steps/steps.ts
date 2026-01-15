import { StepOne } from './StepOne'
import { StepThree } from './StepThree'
import { StepTwo } from './StepTwo'
import { StepDesktop } from './StepDesktop'

export const steps = [
  {
    id: 1,
    name: 'Import Data',
    description: 'Seamless Migration',
    component: StepOne,
  },
  {
    id: 2,
    name: 'API Keys',
    description: 'Bring Your Own Keys',
    component: StepTwo,
  },
  {
    id: 3,
    name: 'Desktop',
    description: 'Kronos Desktop',
    component: StepDesktop,
  },
  {
    id: 4,
    name: 'Get Started',
    description: 'Experience the AI Agent',
    component: StepThree,
  },
]