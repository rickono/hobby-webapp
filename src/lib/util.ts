import { ReadonlyURLSearchParams } from 'next/navigation'

export function classNames(...classes: Array<string | boolean | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  parameters: [string, string][],
  remove?: string[],
) => {
  const params = new URLSearchParams(searchParams.toString())
  for (const [name, value] of parameters) {
    params.set(name, value)
  }
  if (remove) {
    for (const name of remove) {
      params.delete(name)
    }
  }

  return params.toString()
}
