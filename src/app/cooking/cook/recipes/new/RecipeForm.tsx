'use client'

import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RecipeDetails } from './RecipeDetails'
import FormLayout from '@/components/FormLayout'
import { RecipeIngredients } from './RecipeIngredients'
import { Tables } from '@/types/supabase'
import React from 'react'
import {
  getStepStatus,
  ProgressBullets,
  Step,
} from '@/components/ProgressBullets'
import { useSearchParams } from 'next/navigation'
import { RecipeSubrecipe } from './RecipeSubrecipe'
import { RecipeSubrecipeIngredients } from './RecipeSubrecipeIngredients'
import { RecipeReview } from './RecipeReview'

interface Props {}

export const RecipeForm: FC<Props> = ({}: Props) => {
  const searchParams = useSearchParams()
  const currentStep = searchParams.get('step') ?? 'details'

  const [steps, setSteps] = useState<Step[]>([
    { name: 'Recipe details', href: '', status: 'current', id: 'details' },
    { name: 'Subrecipes', href: '', status: 'upcoming', id: 'subrecipe' },
    {
      name: 'Subrecipe ingredients',
      href: '',
      status: 'upcoming',
      id: 'subrecipe-ingredients',
    },
    { name: 'Ingredients', href: '', status: 'upcoming', id: 'ingredients' },
    { name: 'Review', href: '', status: 'upcoming', id: 'review' },
  ])

  useEffect(() => {
    const updatedSteps = []
    for (const step of steps) {
      updatedSteps.push({
        ...step,
        status: getStepStatus(step.id, steps, currentStep),
      })
    }
    setSteps(updatedSteps)
  }, [currentStep])

  let CurrentStep: FC
  switch (currentStep) {
    case 'details':
      CurrentStep = RecipeDetails
      break
    case 'subrecipe':
      CurrentStep = RecipeSubrecipe
      break
    case 'subrecipe-ingredients':
      CurrentStep = RecipeSubrecipeIngredients
      break
    case 'ingredients':
      CurrentStep = RecipeIngredients
      break
    case 'review':
      CurrentStep = RecipeReview
      break
    default:
      CurrentStep = React.Fragment
      break
  }

  return (
    <React.Fragment>
      <div className="mb-8">
        <ProgressBullets steps={steps} />
      </div>
      <CurrentStep />
    </React.Fragment>
  )
}
