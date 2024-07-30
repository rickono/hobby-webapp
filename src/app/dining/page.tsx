import { SimpleLayout } from '@/components/SimpleLayout'
import Table, { TableCol } from '@/components/Table'
import {
  getRestaurants,
  Restaurant,
  getChildField,
  Award,
  Cuisine,
} from '@/lib/queries'
import { LaListeAward, LaListeBadge } from './components/LaListe'
import Image from 'next/image'
import laListeLogo from '@/images/logos/lalisteicon.svg'
import { classNames } from '@/lib/util'
import {
  MichelinAward,
  MichelinDistinction,
  MichelinStars,
} from './components/Michelin'
import { FiftyBestAward, FiftyBestLogo } from './components/FiftyBest'

function renderName(name: string): React.ReactNode {
  return (
    <div className="flex items-center gap-2 font-semibold text-black">
      <span>{name}</span>
    </div>
  )
}

const LaListeLogo = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={10}
    viewBox="0 0 720 720"
    {...props}
  >
    <g strokeWidth={200}>
      <path
        strokeWidth={20}
        d="M236.1 135.9c-1.2.8-1.5 29.7-1.8 192.5-.4 149.6-.2 192 .7 193.1 1.1 1.3 17.8 1.5 127.1 1.5H488l-.2-193.8-.3-193.7-8.4.2c-4.6.2-8.9.7-9.6 1.3-.7.5-3.2 1.4-5.6 1.9-6.7 1.5-13.2 3.3-14.9 4.1-.9.4-3.1 1.1-5 1.5-1.9.3-6 1.3-9 2.2-3 .8-8 2.2-11 3-3 .8-7.7 2.2-10.4 3.1-6.7 2.1-14.8 2-22.6-.2-3.6-1-9-2.5-12-3.3-3-.8-8.3-2.3-11.7-3.3-6.1-1.9-6.4-1.9-12.5-.1-3.5 1-9.2 2.7-12.8 3.6-3.6 1-8.7 2.4-11.5 3.3-6.6 2-14.7 2-21.5 0-11.3-3.4-24.6-7-28.8-7.9-2.3-.5-5-1.3-6-1.8-.9-.5-3.6-1.2-5.9-1.6-2.4-.4-4.5-1.1-4.9-1.6-.3-.5-1.9-.9-3.5-.9-1.7 0-4.2-.6-5.7-1.4-3.5-1.8-16.2-3-18.1-1.7zm22.4 14.2c.5.5 2 .9 3.5.9 1.4 0 3.8.7 5.4 1.5 1.5.8 3.8 1.5 5 1.5 1.9 0 6.7 1.3 15.1 4.2 1.7.6 4.8 1.3 7 1.7 2.2.4 4.9 1.2 6 1.8 1.1.6 3.7 1.3 5.9 1.6 2.1.3 4.9 1.3 6.2 2.2l2.4 1.5v170.8c0 131.5-.3 171.1-1.2 172-1.4 1.4-64.4 1.7-66.5.4-1-.6-1.3-38.4-1.3-181.1 0-99.1.2-180.6.5-181 .6-1 10.6.7 12 2zm217.3 179.5-.3 180.9-31.5.3c-17.3.1-32.5 0-33.7-.3l-2.3-.5V166.2l4-1.6c2.2-.9 4.8-1.6 5.6-1.6.9 0 3.9-.7 6.8-1.6 2.8-.9 7.1-2.2 9.6-3 2.5-.8 5.5-1.4 6.7-1.4 1.2 0 2.4-.4 2.7-.9.4-.5 2.5-1.2 4.9-1.6 2.3-.4 5-1.1 5.9-1.6 1-.5 3.7-1.4 6-1.9 2.4-.5 6.6-1.5 9.3-2.3 2.8-.8 5.3-1.1 5.8-.8.4.4.6 82.1.5 181.7zM368.7 158.5c1.9.8 4.6 1.5 6 1.5 1.3 0 3.6.6 5.1 1.4 1.5.7 4.6 1.6 7 1.9 2.3.3 5.4 1.2 6.7 2.1l2.5 1.6v171.4c0 155.4-.1 171.4-1.6 172-2 .8-63.8.8-65.8 0-1.5-.6-1.6-16.7-1.6-172.4V166.2l3.4-1.6c1.9-.9 4.8-1.6 6.4-1.6 1.7 0 3.3-.4 3.7-.9.3-.6 2.7-1.3 5.3-1.7 2.6-.4 6-1.3 7.7-2 4-1.8 10.8-1.7 15.2.1zM234.7 574.7c-.2.5-.3 3-.3 5.8l.1 5 126.8.3 126.7.2v-12H361.6c-69.6 0-126.7.3-126.9.7z"
      />
    </g>
  </svg>
)

function renderFiftyBest(award: FiftyBestAward) {
  return <FiftyBestLogo className="h-6 w-6 fill-gray-700" />
}

function renderMichelin(award: MichelinAward) {
  return (
    <MichelinDistinction
      distinction={award.distinction}
      greenStar={award.greenStar}
    />
  )
}

function renderAward(award: Award) {
  if (award.award_type === 1) {
    return renderMichelin(award.award as MichelinAward)
  }
  if (award.award_type === 2) {
    return renderFiftyBest(award.award as FiftyBestAward)
  }
  if (award.award_type === 3) {
    return renderLaListe(award.award as LaListeAward)
  }
}

function renderAwards(awards: Array<Award>) {
  const getAwardType = (award: Award) => {
    if (typeof award.award_type === 'number') return award.award_type

    return award.award_type.id
  }
  return (
    <div className="flex items-center gap-2">
      {awards
        .sort((a, b) => getAwardType(a) - getAwardType(b))
        .map((award) => renderAward(award))}
    </div>
  )
}

function renderLaListe({ year, distinction }: LaListeAward): React.ReactNode {
  let badgeClassName = classNames(
    'rounded-full w-fit',
    distinction === 'food_gem' && 'bg-red-500',
    distinction === 'outstanding' && 'bg-slate-400',
    typeof distinction === 'number' && 'bg-yellow-500',
  )
  const badge = (
    <div className={badgeClassName}>
      <LaListeLogo className="h-6 w-6 stroke-slate-50" />
    </div>
  )
  if (typeof distinction === 'number') {
    return (
      <div className="flex w-fit gap-1 rounded-full bg-gray-200 pr-2">
        {badge}
        <span>{distinction}</span>
      </div>
    )
  }
  return badge
}

function renderCuisine(cuisines: Cuisine[]) {
  const cuisineNames = cuisines.map((cuisine) => cuisine.name)
  return <div>{cuisineNames.join(', ')}</div>
}

const columns: TableCol<Restaurant>[] = [
  {
    field: 'name',
    headerName: 'Name',
    renderCell: (row) => renderName(row.name),
  },
  {
    field: 'location',
    headerName: 'Location',
    renderCell: (row) => (
      <p className="font-semibold text-black">
        {getChildField<string>(row.city, 'name') ?? ''}
        <span className="font-normal text-gray-500">
          {' '}
          {getChildField<string>(row.neighborhood, 'name')}
        </span>
      </p>
    ),
  },
  {
    field: 'cuisine',
    headerName: 'Cuisine',
    renderCell: (row) => renderCuisine(row.dining_cuisine ?? []),
  },
  {
    field: 'awards',
    headerName: 'Awards',
    renderCell: (row) => renderAwards(row.dining_award ?? []),
  },
]

export default async function Page() {
  const restaurants = await getRestaurants({ fields: ['cuisine', 'award'] })

  console.log(restaurants[0].dining_cuisine)
  return (
    <SimpleLayout title="Dining" intro="Find your next dining destination.">
      <Table title="Restaurants" rows={restaurants} columns={columns} />
    </SimpleLayout>
  )
}
