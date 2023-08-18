// export const getFormattedDate = (timestamp: string): string => {
//   const dateTime = new Date(timestamp)

//   // Create an array of month names
//   const monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
//   ]

//   // Extract the date components
//   const year = dateTime.getUTCFullYear()
//   const monthIndex = dateTime.getUTCMonth()
//   const day = dateTime.getUTCDate()

//   // Get the month name from the array
//   const monthName = monthNames[monthIndex]

//   // Return the formatted date string in the format "June 1, 2023"
//   return `${monthName} ${day}, ${year}`
// }

// export const getFormattedTime = (timestamp: string): string => {
//   const dateTime = new Date(timestamp)

//   // Adjust hours for EST (Eastern Standard Time)
//   const estOffset = -5 // EST is UTC-5
//   const estHours = (dateTime.getUTCHours() + estOffset + 24) % 12 || 12

//   // Extract the minutes component
//   const minutes = dateTime.getUTCMinutes()

//   // Determine AM or PM
//   const ampm = dateTime.getUTCHours() >= 12 ? 'PM' : 'AM'

//   // Return the formatted time string in the format "4:10 PM"
//   return `${estHours}:${String(minutes).padStart(2, '0')} ${ampm}`
// }

interface ExtractedDateTime {
  date?: string
  time?: string
}

// export const extractDateTime = (input: string, extract: 'date' | 'time'): ExtractedDateTime | null => {
//   const parts = input.split(' at ')

//   if (parts.length !== 2) {
//     return null // Invalid input format
//   }

//   const datePart = parts[0]
//   const timePart = parts[1].split(' GMT')[0]

//   const formattedDate = new Date(datePart)
//   const formattedTime = new Date(`1970-01-01T${timePart}`)

//   if (extract === 'date') {
//     return {
//       date: formattedDate,
//       time: formattedTime
//     }
//   } else if (extract === 'time') {
//     return {
//       date: formattedTime,
//       time: formattedTime
//     }
//   } else {
//     return null // Invalid extract parameter
//   }
// }

export const extractDateTime = (
  input: string,
  extract: 'date' | 'time',
  timeZone: string
): ExtractedDateTime | null => {
  const parts = input.split(' at ')

  if (parts.length !== 2) {
    return null // Invalid input format
  }

  const datePart = parts[0]
  const timePart = parts[1].split(' ' + timeZone)[0] // Extract time part before time zone

  const formattedDate = new Date(datePart)
  const formattedTime = new Date(`1970-01-01T${timePart} ${timeZone}`)

  if (extract === 'date') {
    return {
      date: formattedDate.toLocaleDateString(undefined, { timeZone })
    }
  } else if (extract === 'time') {
    return {
      time: formattedTime.toLocaleTimeString(undefined, { timeZone })
    }
  } else {
    return {
      date: formattedDate.toLocaleDateString(undefined, { timeZone }),
      time: formattedTime.toLocaleTimeString(undefined, { timeZone })
    }
  }
}

export const convertToLocal = (utcTimestamp: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  }

  const localDate = new Date(utcTimestamp)
  return localDate.toLocaleString(undefined, options)
}

// export const convertToSpecificLocalDateTime = (utcTimeString: string, extract: 'date' | 'time'): string => {
//   const utcDate = new Date(utcTimeString)
//   const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000)

//   if (extract === 'date') {
//     return localDate.toLocaleDateString()
//   } else if (extract === 'time') {
//     return localDate.toLocaleTimeString()
//   } else {
//     throw new Error("Invalid 'extract' parameter. Use 'date' or 'time'.")
//   }
// }

export const convertToFormattedLocalDateTime = (utcTimeString: string, extract: 'date' | 'time'): string => {
  const utcDate = new Date(utcTimeString)
  const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000)

  if (extract === 'date') {
    const options = { day: 'numeric', month: 'long', year: 'numeric' }
    return localDate.toLocaleDateString(undefined, options)
  } else if (extract === 'time') {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true }
    return localDate.toLocaleTimeString(undefined, options)
  } else {
    throw new Error("Invalid 'extract' parameter. Use 'date' or 'time'.")
  }
}
