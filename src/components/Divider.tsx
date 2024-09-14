import { PlusIcon } from '@heroicons/react/20/solid'
import { ButtonHTMLAttributes, FC } from 'react'

interface Props {
  button?: {
    text: string
    icon: React.ReactNode
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type']
  }
}

export const Divider: FC<Props> = ({ button }: Props) => {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300" />
      </div>
      {button && (
        <div className="relative flex justify-center">
          <button
            type={button.type ?? 'button'}
            className="inline-flex items-center gap-x-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            {button.icon}
            {button.text}
          </button>
        </div>
      )}
    </div>
  )
}
