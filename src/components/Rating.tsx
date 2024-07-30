import { StarIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

type Props = {
    stars: number
    label: string
    onChange: (rating: number) => void
}

export default function Rating({ stars, label, onChange }: Props) {
    const [rating, setRating] = useState(0)
    return (
        <div className="">
            <label className="block text-sm font-medium leading-6 text-gray-900">
                {label}
            </label>
            <div className="flex">
                {Array.from({ length: stars }, (_, idx) => {
                    const color = rating > idx ? 'text-yellow-400' : 'text-gray-400'
                    return (
                        <StarIcon
                            className={`pointer h-5 w-5 ${color}`}
                            key={idx}
                            onClick={() => {
                                setRating(idx + 1)
                                onChange(idx + 1)
                            }}
                        />
                    )
                })}
            </div>
        </div>
    )
}
