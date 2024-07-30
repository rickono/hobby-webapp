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
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

type FormSectionProps = {
  title: string
  subtitle: string
  children: React.ReactNode
}

export function FormSection({ title, subtitle, children }: FormSectionProps) {
  return (
    <div className="@container">
      <div className="@xl:grid-cols-3 grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {title}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">{subtitle}</p>
        </div>

        <div className="@md:col-span-2 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          {children}
        </div>
      </div>
    </div>
  )
}

type Props = {
  children: React.ReactNode
  onSubmit: React.FormEventHandler
}

export default function FormLayout({ children, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit}>
      <div className="space-y-12">{children}</div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  )
}
