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

type Props = {
    name: string
    title: string
    description: string
    options: Array<{ id: string, option: string }>
    checked: string
    setChecked: (newChecked: string) => void
}

export default function Radio({ name, options, title, description, checked, setChecked }: Props) {
    return (
        <div>
            <label className="text-base font-semibold text-gray-900">{title}</label>
            <p className="text-sm text-gray-500">{description}</p>
            <fieldset className="mt-4">
                <legend className="sr-only">{name}</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                    {options.map((option) => (
                        <div key={option.id} className="flex items-center">
                            <input
                                id={option.id}
                                name={name}
                                type="radio"
                                checked={option.id === checked}
                                onChange={e => setChecked(e.target.value)}
                                value={option.id}
                                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label htmlFor={option.id} className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                                {option.option}
                            </label>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    )
}
