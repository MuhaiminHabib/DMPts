import { DateTime } from 'luxon'

export const convertToFormattedLocalDateTime = (utcTimeString: string, extract: 'date' | 'time'): string => {
  const localDateTime = DateTime.fromISO(utcTimeString, { zone: 'utc' }).toLocal()

  if (extract === 'date') {
    return localDateTime.toFormat('d MMMM yyyy')
  } else if (extract === 'time') {
    return localDateTime.toFormat('h:mm a')
  } else {
    throw new Error("Invalid 'extract' parameter. Use 'date' or 'time'.")
  }
}
