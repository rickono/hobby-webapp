'use client'
import FormLayout, { FormSection } from '@/components/FormLayout'
import Input from '@/components/Input'
import Select, { MultiSelect } from '@/components/Select'
import { db, getDataClient } from '@/lib/clientQueries'
import { Origin, Process, Roaster, Variety } from '@/lib/queries'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

type NewCoffeeInfo = {
  name: string
  farm_size: number
  elevation: number
  harvest_period: string
  producer: string
  farm_name: string
  region: string
  image_url: string
  description: string
  origin: number
  process: number
  roaster: number
  variety: number[]
}

export default function NewCoffeeForm() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<NewCoffeeInfo>()

  const [roasters, setRoasters] = useState<Roaster[]>([])
  const [origins, setOrigins] = useState<Origin[]>([])
  const [processes, setProcesses] = useState<Process[]>([])
  const [varieties, setVarieties] = useState<Process[]>([])

  useEffect(() => {
    const getData = async () => {
      const { data: roasters, error: rError } = await db.coffee.roaster
        .select('*')
        .returns<Roaster[]>()
      if (rError) {
        console.log(rError)
      }
      const { data: origins, error: oError } = await db.coffee.origin
        .select('*')
        .returns<Origin[]>()
      if (oError) {
        console.log(oError)
      }
      const { data: processes, error: pError } = await db.coffee.process
        .select('*')
        .returns<Process[]>()
      if (pError) {
        console.log(pError)
      }
      const { data: varieties, error: vError } = await db.coffee.variety
        .select('*')
        .returns<Variety[]>()
      if (vError) {
        console.log(pError)
      }
      console.log(origins, varieties)
      setRoasters(roasters ?? [])
      setOrigins(origins ?? [])
      setProcesses(processes ?? [])
      setVarieties(varieties ?? [])
    }
    getData()
  }, [])

  const onSubmit = async (coffee: NewCoffeeInfo) => {
    const {
      name,
      farm_size,
      elevation,
      producer,
      farm_name,
      region,
      description,
      process,
      origin,
      roaster,
    } = coffee
    const coffeeResponse = await db.coffee.coffee.insert({
      name,
      farm_size,
      elevation,
      producer,
      farm_name,
      region,
      description,
      process,
      origin,
      roaster,
    })
    // const coffee
    // await db.coffee.coffee_variety.insert({
    //   
    //     })

  }

  return (
    <FormLayout onSubmit={handleSubmit(onSubmit)}>
      <FormSection
        title="Coffee Info"
        subtitle="Basic information about the coffee"
      >
        <div className="col-span-4 flex flex-col gap-6">
          <Input type="text" name="name" label="Name" register={register} />
          <Controller
            name="roaster"
            control={control}
            render={({ field }) => (
              <Select
                label="Roaster"
                options={roasters.map((roaster) => ({
                  label: roaster.name,
                  value: roaster.id,
                }))}
                onChange={(e) => {
                  field.onChange(e.value)
                }}
              />
            )}
          />
          <Controller
            name="origin"
            control={control}
            render={({ field }) => (
              <Select
                label="Origin"
                options={origins.map((origin) => ({
                  label: origin.name,
                  value: origin.id,
                }))}
                onChange={(e) => {
                  field.onChange(e.value)
                }}
              />
            )}
          />
          <Controller
            name="roaster"
            control={control}
            render={({ field }) => (
              <Select
                label="Process"
                options={processes.map((process) => ({
                  label: process.name,
                  value: process.id,
                }))}
                onChange={(e) => {
                  field.onChange(e.value)
                }}
              />
            )}
          />
          <Controller
            name="variety"
            control={control}
            render={({ field }) => (
              <MultiSelect
                label="Variety"
                options={varieties.map((variety) => ({
                  label: variety.name,
                  value: variety.id,
                }))}
                onChange={(e) => {
                  field.onChange([...e.values()].map((x) => x.value))
                }}
                // value={cuisines
                //   .filter((cuisine) => selectedCuisines.includes(cuisine.id))
                //   .map((cuisine) => ({
                //     label: cuisine.name,
                //     value: cuisine.id,
                //   }))}
              />
            )}
          />
          <Input
            type="text"
            name="description"
            label="Description"
            register={register}
          />
        </div>
      </FormSection>
      <FormSection
        title="More details"
        subtitle="More detailed information about the coffee"
      >
        <div className="col-span-4 flex flex-col gap-6">
          <Input
            type="text"
            name="farm_name"
            label="Farm Name"
            register={register}
          />
          <Input type="text" name="region" label="Region" register={register} />
          <Input
            type="text"
            name="producer"
            label="Producer"
            register={register}
          />
          <Input
            type="number"
            name="farm_size"
            label="Farm Size"
            register={register}
          />
          <Input type="number" name="altitude" label="Altitude" />
        </div>
      </FormSection>
    </FormLayout>
  )
}
