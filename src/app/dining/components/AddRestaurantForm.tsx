'use client'

import FormLayout, { FormSection } from '@/components/FormLayout'
import Input from '@/components/Input'
import Select, { MultiSelect, SelectOption } from '@/components/Select'
import {
  Control,
  Controller,
  FieldErrors,
  UseFormSetValue,
  UseFormGetValues,
  useForm,
} from 'react-hook-form'
import { Enums } from '@/types/enums'
import { AwardType, City, Cuisine, Neighborhood } from '@/lib/queries'
import {
  getDataClient,
  insertAward,
  insertRestaurant,
  insertRestaurantCuisine,
} from '@/lib/clientQueries'
import { useCallback, useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import {
  BibGourmand,
  GreenStar,
  MichelinAward,
  MichelinDistinction,
  MichelinStars,
} from './Michelin'
import {
  FiftyBestAward,
  FiftyBestList,
  displayFiftyBestListName,
  fiftyBestLists,
} from './FiftyBest'
import { Button } from '@/components/Button'
import AddRestaurantBasicSection from './AddRestaurantBasicSection'
import { LaListeAward, displayLaListeAward } from './LaListe'
import GoogleMap from './GoogleMap'
import { classNames } from '@/lib/util'

export type AwardInfo =
  | {
      award_type: 1
      award: MichelinAward
    }
  | {
      award_type: 2
      award: FiftyBestAward
    }
  | { award_type: 3; award: LaListeAward }

export type NewRestaurantFormInfo = {
  name: string
  city: string
  neighborhood: string
  website: string
  maps: string
  price_point: Enums['dining_price']
  menus: Array<Enums['dining_menus']>
  notes: string
  awards: AwardInfo[]
  cuisine: number[]
}

export default function AddRestaurantForm() {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<NewRestaurantFormInfo>()

  const onSubmit = async ({
    name,
    city,
    neighborhood,
    website,
    maps,
    price_point,
    menus,
    notes,
    awards,
    cuisine,
  }: NewRestaurantFormInfo) => {
    const restaurantResponse = await insertRestaurant({
      name,
      city,
      neighborhood,
      website,
      maps,
      price_point,
      menus,
      notes,
    })
    const restaurant = restaurantResponse.data?.[0]
    if (!restaurant) {
      return
    }
    awards?.forEach((award) => {
      insertAward({
        award: award.award,
        award_type: award.award_type,
        restaurant: restaurant.id,
      })
    })
    cuisine?.forEach((c) => {
      insertRestaurantCuisine(c, restaurant.id)
    })
    reset()
  }
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <FormLayout onSubmit={handleSubmit(onSubmit)}>
        <AddRestaurantBasicSection
          watch={watch}
          control={control}
          errors={errors}
          register={register}
        />
        <FormSection
          title="Awards"
          subtitle="Any accolades the restaurant has acquired"
        >
          <DisplayAwards awards={watch('awards') ?? []} />
          <AddAwards
            control={control}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
          />
        </FormSection>
      </FormLayout>
      <GoogleMap setValue={setValue} />
    </div>
  )
}

function DisplayAward({ award }: { award: AwardInfo }) {
  if (award.award_type === 1) {
    return (
      <div className="flex gap-2">
        <MichelinDistinction
          distinction={award.award.distinction}
          greenStar={award.award.greenStar}
        />
        <span>Michelin Guide {award.award.year}</span>
      </div>
    )
  } else if (award.award_type === 2) {
    return (
      <div className="flex gap-2">
        <span>
          {award.award.rank && '#'}
          {award.award.rank} {displayFiftyBestListName(award.award.list)}{' '}
          {award.award.year}
        </span>
      </div>
    )
  } else if (award.award_type === 3) {
    return (
      <div className="flex gap-2">
        <span>La Liste {displayLaListeAward(award.award)}</span>
      </div>
    )
  }
  return null
}

function DisplayAwards({ awards }: { awards: AwardInfo[] }) {
  if (!awards.length) return null

  return (
    <div className="col-span-4">
      {awards.map((award, i) => (
        <DisplayAward award={award} key={`${award.award_type}_${i}`} />
      ))}
    </div>
  )
}

type AddAwardsProps = {
  control: Control<NewRestaurantFormInfo, any>
  errors: FieldErrors<NewRestaurantFormInfo>
  setValue: UseFormSetValue<NewRestaurantFormInfo>
  getValues: UseFormGetValues<NewRestaurantFormInfo>
}

// Supabase ids of supported award types
const SUPPORTED_AWARD_TYPES = [1, 2, 3]

function AddAwards({ control, errors, setValue, getValues }: AddAwardsProps) {
  const [awardTypes, setAwardTypes] = useState<AwardType[]>([])
  const [selectedType, setSelectedType] = useState<SelectOption<number>>({
    label: '',
    value: 0,
  })

  useEffect(() => {
    const fetchData = async () => {
      const awardTypes = await getDataClient<AwardType[]>(
        'dining_award_type',
        '*',
      )
      setAwardTypes(
        awardTypes.filter((awardType) =>
          SUPPORTED_AWARD_TYPES.includes(awardType.id),
        ),
      )
    }
    fetchData()
  }, [])

  return (
    <div className="col-span-4 flex flex-col gap-6">
      <Select
        onChange={(selected) => {
          setSelectedType(selected)
        }}
        label="Award earned"
        options={awardTypes.map((awardType) => ({
          label: awardType.name ?? '',
          value: awardType.id,
        }))}
        value={selectedType}
      />
      {selectedType && (
        <AddAward
          awardId={selectedType.value}
          addAward={(award: AwardInfo) =>
            setValue('awards', [...(getValues('awards') || []), award])
          }
          onAddAward={() => setSelectedType({ label: '', value: 0 })}
        />
      )}
    </div>
  )
}

type AddAwardProps = {
  awardId: number
  addAward: (award: AwardInfo) => void
  onAddAward: () => void
}

function AddAward({ awardId, addAward, onAddAward }: AddAwardProps) {
  if (awardId === 1) {
    return (
      <AddMichelin
        onSave={(michelinAward: MichelinAward) => {
          addAward({ award_type: 1, award: michelinAward })
          onAddAward()
        }}
      />
    )
  } else if (awardId === 2) {
    return (
      <AddFiftyBest
        onSave={(award) => {
          addAward({ award_type: 2, award })
          onAddAward()
        }}
      />
    )
  } else if (awardId === 3) {
    return (
      <AddLaListe
        onSave={(award) => {
          addAward({ award_type: 3, award })
          onAddAward()
        }}
      />
    )
  }
  return null
}

type AddLaListeProps = {
  onSave: (award: LaListeAward) => void
}
function AddLaListe({ onSave }: AddLaListeProps) {
  const [distinction, setDistinction] = useState<
    SelectOption<'food_gem' | 'outstanding' | 'top_1000'>
  >({
    value: 'top_1000',
    label: 'Top 1000',
  })
  const [laListeInfo, setLaListeInfo] = useState<LaListeAward>({
    year: 2023,
    distinction: 0,
  })
  return (
    <>
      <Input
        type="number"
        label="Year"
        name="year"
        onChange={(e) =>
          setLaListeInfo({ ...laListeInfo, year: +e.target.value })
        }
      />
      <Select
        label="Distinction"
        options={
          [
            { label: 'Food Gem', value: 'food_gem' },
            { label: 'Outstanding', value: 'outstanding' },
            { label: 'Top 1000', value: 'top_1000' },
          ] as SelectOption<'food_gem' | 'outstanding' | 'top_1000'>[]
        }
        onChange={(value) => {
          setDistinction(value)
          if (value.value !== 'top_1000') {
            setLaListeInfo({ ...laListeInfo, distinction: value.value })
          }
        }}
      />
      {distinction.value === 'top_1000' && (
        <Input
          type="number"
          label="Score"
          name="score"
          onChange={(e) =>
            setLaListeInfo({ ...laListeInfo, distinction: +e.target.value })
          }
        />
      )}
      <div className="mt-6 flex justify-end">
        <Button onClick={() => onSave(laListeInfo)}>Save</Button>
      </div>
    </>
  )
}

type AddFiftyBestProps = {
  onSave: (award: FiftyBestAward) => void
}
function AddFiftyBest({ onSave }: AddFiftyBestProps) {
  const [list, setList] = useState<SelectOption<FiftyBestList>>({
    value: 'world',
    label: displayFiftyBestListName('world'),
  })
  const [fiftyBestInfo, setFiftyBestInfo] = useState<FiftyBestAward>({
    year: 2023,
    list: 'world',
  })
  return (
    <>
      <Input
        type="number"
        label="Year"
        name="year"
        onChange={(e) =>
          setFiftyBestInfo({ ...fiftyBestInfo, year: +e.target.value })
        }
      />
      <Select
        label="List"
        options={fiftyBestLists.map((list) => ({
          value: list,
          label: displayFiftyBestListName(list),
        }))}
        onChange={(value) => {
          setList(value)
          setFiftyBestInfo({ ...fiftyBestInfo, list: value.value })
        }}
      />
      {list.value !== 'discovery' && (
        <Input
          type="number"
          label="Ranking"
          name="rank"
          onChange={(e) =>
            setFiftyBestInfo({ ...fiftyBestInfo, rank: +e.target.value })
          }
        />
      )}
      <div className="mt-6 flex justify-end">
        <Button onClick={() => onSave(fiftyBestInfo)}>Save</Button>
      </div>
    </>
  )
}


function michelinRadioClassName({
  active,
  checked,
}: {
  active: boolean
  checked: boolean
}) {
  return classNames(
    active ? 'ring-2 ring-red-600 ring-offset-2' : '',
    checked
      ? 'bg-red-600 text-white hover:bg-red-500'
      : 'ring-1 ring-inset ring-red-300 bg-red-50 text-red-700 hover:bg-red-100',
    'flex items-center cursor-pointer focus:outline-none justify-center rounded-md px-3 py-2 text-lg font-semibold uppercase sm:flex-1',
  )
}

export function SelectDistinction({
  selected,
  setSelected,
}: {
  selected: string
  setSelected: (distinction: MichelinAward['distinction']) => void
}) {
  return (
    <div>
      <h2 className="text-sm font-medium leading-6 text-gray-900">
        Distinction
      </h2>

      <RadioGroup value={selected} onChange={setSelected} className="mt-2">
        <RadioGroup.Label className="sr-only">
          Choose a memory option
        </RadioGroup.Label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <RadioGroup.Option
            value={'bib_gourmand'}
            className={michelinRadioClassName}
          >
            <RadioGroup.Label as="span">
              <BibGourmand />
            </RadioGroup.Label>
          </RadioGroup.Option>
          <RadioGroup.Option
            value={'one_star'}
            className={michelinRadioClassName}
          >
            <RadioGroup.Label as="span">
              <MichelinStars amount={1} />
            </RadioGroup.Label>
          </RadioGroup.Option>
          <RadioGroup.Option
            value={'two_star'}
            className={michelinRadioClassName}
          >
            <RadioGroup.Label as="span">
              <MichelinStars amount={2} />
            </RadioGroup.Label>
          </RadioGroup.Option>
          <RadioGroup.Option
            value={'three_star'}
            className={michelinRadioClassName}
          >
            <RadioGroup.Label as="span">
              <MichelinStars amount={3} />
            </RadioGroup.Label>
          </RadioGroup.Option>
        </div>
      </RadioGroup>
    </div>
  )
}

function greenCheckClassName(checked: boolean) {
  return classNames(
    checked
      ? 'bg-green-500 text-white hover:bg-green-400'
      : 'ring-1 ring-inset ring-green-300 bg-green-100 text-green-700 hover:bg-green-200',
    'flex items-center cursor-pointer focus:outline-none justify-center rounded-md px-8 py-2 text-lg font-semibold sm:flex-1',
  )
}

function GreenStarCheck({
  checked,
  setChecked,
}: {
  checked: boolean
  setChecked: (x: boolean) => void
}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={greenCheckClassName(checked)}
        onClick={() => setChecked(!checked)}
      >
        <GreenStar />
      </div>
    </div>
  )
}

type AddMichelinProps = {
  onSave: (award: MichelinAward) => void
}

function AddMichelin({ onSave }: AddMichelinProps) {
  const [michelinInfo, setMichelinInfo] = useState<MichelinAward>({
    year: 2023,
    distinction: 'guide',
    greenStar: false,
  })
  return (
    <div className="">
      <Input
        label="Year"
        type="number"
        name="michelin-year"
        value={michelinInfo.year}
        onChange={(e) => {
          setMichelinInfo({ ...michelinInfo, year: +e.target.value })
        }}
      />
      <div className="mt-6 flex flex-col gap-4">
        <SelectDistinction
          selected={michelinInfo.distinction}
          setSelected={(distinction: MichelinAward['distinction']) =>
            setMichelinInfo({ ...michelinInfo, distinction })
          }
        />
        <GreenStarCheck
          checked={michelinInfo.greenStar}
          setChecked={(greenStar: boolean) =>
            setMichelinInfo({ ...michelinInfo, greenStar })
          }
        />
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={() => onSave(michelinInfo)}>Save</Button>
      </div>
    </div>
  )
}
