import { FC } from 'react'

export interface Step {
  name: string
  href: string
  status: 'complete' | 'current' | 'upcoming'
  id: string
}

interface Props {
  steps: Step[]
}

export const getStepStatus = (
  stepId: string,
  steps: Step[],
  currentStepId: string,
): 'complete' | 'current' | 'upcoming' => {
  if (stepId === currentStepId) {
    return 'current'
  }
  const currentStepIndex = steps.findIndex((step) => step.id === currentStepId)
  const stepIndex = steps.findIndex((step) => step.id === stepId)

  if (stepIndex === -1 || currentStepIndex === -1) {
    return 'upcoming'
  }

  return stepIndex > currentStepIndex ? 'upcoming' : 'complete'
}

export const ProgressBullets: FC<Props> = ({ steps }) => {
  return (
    <nav aria-label="Progress" className="flex items-center justify-center">
      <p className="text-sm font-medium">
        {steps.find((step) => step.status === 'current')?.name}
      </p>
      <ol role="list" className="ml-8 flex items-center space-x-5">
        {steps.map((step) => (
          <li key={step.name}>
            {step.status === 'complete' ? (
              <a
                href={step.href}
                className="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900"
              >
                <span className="sr-only">{step.name}</span>
              </a>
            ) : step.status === 'current' ? (
              <a
                href={step.href}
                aria-current="step"
                className="relative flex items-center justify-center"
              >
                <span aria-hidden="true" className="absolute flex h-5 w-5 p-px">
                  <span className="h-full w-full rounded-full bg-indigo-200" />
                </span>
                <span
                  aria-hidden="true"
                  className="relative block h-2.5 w-2.5 rounded-full bg-indigo-600"
                />
                <span className="sr-only">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400"
              >
                <span className="sr-only">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
