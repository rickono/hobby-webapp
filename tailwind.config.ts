import typographyPlugin from '@tailwindcss/typography'
import { type Config } from 'tailwindcss'

import typographyStyles from './typography'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  plugins: [
    typographyPlugin,
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
  ],
  theme: {
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.5rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    typography: typographyStyles,
  },
  safelist: [
    'col-span-1',
    'col-span-2',
    'col-span-3',
    'col-span-4',
    'col-span-5',
    'col-span-6',
    'col-span-7',
    'col-span-8',
    'col-span-9',
    'col-span-10',
    'col-span-11',
    'col-span-12',
    'sm:col-span-1',
    'sm:col-span-2',
    'sm:col-span-3',
    'sm:col-span-4',
    'sm:col-span-5',
    'sm:col-span-6',
    'sm:col-span-7',
    'sm:col-span-8',
    'sm:col-span-9',
    'sm:col-span-10',
    'sm:col-span-11',
    'sm:col-span-12',
    'md:col-span-1',
    'md:col-span-2',
    'md:col-span-3',
    'md:col-span-4',
    'md:col-span-5',
    'md:col-span-6',
    'md:col-span-7',
    'md:col-span-8',
    'md:col-span-9',
    'md:col-span-10',
    'md:col-span-11',
    'md:col-span-12',
    'lg:col-span-1',
    'lg:col-span-2',
    'lg:col-span-3',
    'lg:col-span-4',
    'lg:col-span-5',
    'lg:col-span-6',
    'lg:col-span-7',
    'lg:col-span-8',
    'lg:col-span-9',
    'lg:col-span-10',
    'lg:col-span-11',
    'lg:col-span-12',
    'xl:col-span-1',
    'xl:col-span-2',
    'xl:col-span-3',
    'xl:col-span-4',
    'xl:col-span-5',
    'xl:col-span-6',
    'xl:col-span-7',
    'xl:col-span-8',
    'xl:col-span-9',
    'xl:col-span-10',
    'xl:col-span-11',
    'xl:col-span-12',
    '2xl:col-span-1',
    '2xl:col-span-2',
    '2xl:col-span-3',
    '2xl:col-span-4',
    '2xl:col-span-5',
    '2xl:col-span-6',
    '2xl:col-span-7',
    '2xl:col-span-8',
    '2xl:col-span-9',
    '2xl:col-span-10',
    '2xl:col-span-11',
    '2xl:col-span-12',
  ],
} satisfies Config
