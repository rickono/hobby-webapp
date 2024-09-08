import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { FC } from 'react'

interface Props {
  items: {
    title: string
    href: string
    key?: string
  }[]
  emptyText?: string
}

export const StackedList: FC<Props> = ({ items, emptyText = 'No items.' }) => {
  return (
    <ul
      role="list"
      className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
    >
      {items.length !== 0 ? (
        items.map(({ title, href, key }) => (
          <li
            key={key ?? title}
            className="relative flex justify-between gap-x-6 px-4 py-3 hover:bg-gray-50 sm:px-6"
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a href={href}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {title}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </div>
          </li>
        ))
      ) : (
        <li className="relative flex justify-between gap-x-6 px-4 py-5 text-sm text-gray-500 sm:px-6">
          {emptyText}
        </li>
      )}
    </ul>
  )
}
