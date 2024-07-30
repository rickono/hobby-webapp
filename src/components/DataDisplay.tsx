import Image from 'next/image'
import Link from 'next/link'

type Props = {
  title: string
  stats: Array<{ name: string; stat: string }>
}

export default function DataDisplay({ title, stats }: Props) {
  return (
    <div>
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        {title}
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <dt className="truncate text-sm font-medium text-gray-500">
              {item.name}
            </dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

type StatType = 'text' | 'link' | 'phone'

type DescriptionListProps = {
  accentText: string
  title: string
  description: string
  stats: {
    label: string
    value: string
    type?: StatType
    render?: React.ReactNode
  }[]
  action?: {
    text: string
    onClick: () => void
  }
}

export function DescriptionList({
  accentText,
  title,
  description,
  stats,
  action,
}: DescriptionListProps) {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="text-base leading-7 text-gray-700 lg:max-w-lg">
        <p className="text-base font-semibold leading-7 text-indigo-600">
          {accentText}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          {title}
        </h1>
        <div className="max-w-xl">
          <p className="mt-6">{description}</p>
        </div>
      </div>
      <dl className="mt-8 divide-y divide-gray-100">
        {stats.map((stat) => (
          <div
            className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
            key={stat.label}
          >
            <dt className="text-sm font-medium leading-6 text-gray-900">
              {stat.label}
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {!stat.type && stat.value}
              {stat.type === 'link' && (
                <Link href={stat.value} className="underline" target="_blank">
                  {stat.value}
                </Link>
              )}
              {stat.type === 'phone' && (
                <a href={`tel:${stat.value}`} className="underline">
                  {stat.value}
                </a>
              )}
              {stat.render && stat.render}
            </dd>
          </div>
        ))}
      </dl>
      {action && (
        <div className="mt-10 flex">
          <p
            className="text-base pointer font-semibold leading-7 text-indigo-600"
            onClick={action.onClick}
          >
            {action.text}
          </p>
        </div>
      )}
    </div>
  )
}
