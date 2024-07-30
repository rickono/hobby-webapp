/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { classNames } from '@/lib/util'

type Props = {
    tabs: Array<string>
    selected: string
}

export default function PillTabs({ tabs, selected }: Props) {
    if (tabs.length === 0) return null

    return (
        <div>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                <select
                    id="tabs"
                    name="tabs"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue={selected}
                >
                    {tabs.map((tab) => (
                        <option key={tab}>{tab}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <nav className="flex space-x-4" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <a
                            key={tab}
                            href={tab}
                            className={classNames(
                                tab === selected ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:text-gray-700',
                                'rounded-md px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={tab ? 'page' : undefined}
                        >
                            {tab}
                        </a>
                    ))}
                </nav>
            </div>
        </div>
    )
}

