import { FormSection } from '@/components/FormLayout'
import Input from '@/components/Input'
import Select, { MultiSelect, SelectOption } from '@/components/Select'
import { useState, useEffect, useCallback } from 'react'
import { Cuisine, City, Neighborhood } from '@/lib/queries'
import { getDataClient } from '@/lib/clientQueries'
import {
  Control,
  FieldErrors,
  UseFormRegister,
  Controller,
  UseFormWatch,
} from 'react-hook-form'
import { NewRestaurantFormInfo } from './AddRestaurantForm'

type Props = {
  control: Control<NewRestaurantFormInfo, any>
  errors: FieldErrors<NewRestaurantFormInfo>
  register: UseFormRegister<NewRestaurantFormInfo>
  watch: UseFormWatch<NewRestaurantFormInfo>
}

export default function AddRestaurantBasicSection({
  control,
  errors,
  register,
  watch,
}: Props) {
  const [cuisines, setCuisines] = useState<Cuisine[]>([])
  useEffect(() => {
    const fetchCuisines = async () => {
      const cuisines = await getDataClient<Cuisine[]>('dining_cuisine', '*')
      setCuisines(cuisines.sort((a, b) => a.name.localeCompare(b.name)))
    }
    fetchCuisines()
  }, [])
  const selectedCuisines = watch('cuisine') ?? []

  return (
    <FormSection
      title="Restaurant details"
      subtitle="Basic information about the restaurant."
    >
      <div className="col-span-4 flex flex-col gap-6">
        <Input
          type="text"
          name="name"
          label="Name"
          register={register}
          registerOptions={{ required: true }}
          error={errors.name && "Please provide the restaurant's name"}
        />
        <SelectCity control={control} errors={errors} watch={watch} />
        <Controller
          name="cuisine"
          control={control}
          render={({ field }) => (
            <MultiSelect
              label="Cuisine"
              options={cuisines.map((cuisine) => ({
                label: cuisine.name,
                value: cuisine.id,
              }))}
              onChange={(e) => {
                field.onChange([...e.values()].map((x) => x.value))
              }}
              value={cuisines
                .filter((cuisine) => selectedCuisines.includes(cuisine.id))
                .map((cuisine) => ({ label: cuisine.name, value: cuisine.id }))}
            />
          )}
        />
        <Input type="text" name="website" label="Website" register={register} />
        <Input
          type="text"
          name="maps"
          label="Google Maps Link"
          register={register}
        />
      </div>
    </FormSection>
  )
}

type SelectCityProps = {
  control: Control<NewRestaurantFormInfo, any>
  errors: FieldErrors<NewRestaurantFormInfo>
  watch: UseFormWatch<NewRestaurantFormInfo>
}

function SelectCity({ control, errors, watch }: SelectCityProps) {
  const [cities, setCities] = useState<City[]>([])
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([])

  const city = watch('city')
  useEffect(() => {
    const fetchData = async () => {
      const cities = await getDataClient<City[]>('dining_city', '*')
      setCities(cities)
    }
    fetchData()
  }, [city])

  const neighborhood = watch('neighborhood')

  const updateNeighborhoods = useCallback(async (city: string) => {
    const neighborhoods = await getDataClient<Neighborhood[]>(
      'dining_neighborhood',
      '*',
      ['city', city],
    )
    setNeighborhoods(neighborhoods)
  }, [])

  useEffect(() => {
    updateNeighborhoods(city)
  }, [city, neighborhood, updateNeighborhoods])

  return (
    <>
      <Controller
        name="city"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <Select
            onChange={(e) => {
              field.onChange(e.value)
            }}
            label="City"
            options={cities.map((city) => ({
              label: city.name ?? '',
              value: city.id,
            }))}
            error={errors.city && "Please select the restaurant's city."}
            value={{
              value: watch('city'),
              label: cities.find((c) => c.id === watch('city'))?.name,
            }}
          />
        )}
      />
      <Controller
        name="neighborhood"
        control={control}
        render={({ field }) => (
          <Select
            onChange={(e) => {
              field.onChange(e.value)
            }}
            label="Neighborhood"
            options={neighborhoods.map((neighborhood) => ({
              label: neighborhood.name ?? '',
              value: neighborhood.id,
            }))}
            error={errors.neighborhood && ''}
            value={{
              value: watch('neighborhood'),
              label: neighborhoods.find((n) => n.id === watch('neighborhood'))
                ?.name,
            }}
          />
        )}
      />
    </>
  )
}
