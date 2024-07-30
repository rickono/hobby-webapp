/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const images = [
    {
        title: "Tetsu Katsuya's 4:6 Recipe",
        subtitle: 'Hario V60',
        source:
            'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    },
    // More images...
]

type Props = {
    images: Array<{
        title: string
        subtitle: string
        source: string
    }>
}

export default function ImageGrid({ images }: Props) {
    return (
        <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {images.map((image) => (
                <li key={image.source} className="relative">
                    <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src={image.source} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                        <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {image.title}</span>
                        </button>
                    </div>
                    <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{image.title}</p>
                    <p className="pointer-events-none block text-sm font-medium text-gray-500">{image.subtitle}</p>
                </li>
            ))}
        </ul>
    )
}

