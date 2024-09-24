export const sortDates = (dates: Date[], order: 'asc' | 'desc' = 'asc') =>
  dates.sort((a, b) => {
    const aTime = a.getTime()
    const bTime = b.getTime()

    if (order === 'asc') return aTime - bTime
    return bTime - aTime
  })
