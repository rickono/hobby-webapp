export const getSpan = (span?: number): string => {
  switch (span) {
    case 1:
      return 'col-span-1'
    case 2:
      return 'col-span-2'
    case 3:
      return 'col-span-3'
    case 4:
      return 'col-span-4'
    case 5:
      return 'col-span-5'
    case 6:
      return 'col-span-6'
  }
  return 'col-span-2'
}
