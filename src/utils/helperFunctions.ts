export const getFormattedDate = (timestamp: string): string => {
  const dateTime = new Date(timestamp)

  // Create an array of month names
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  // Extract the date components
  const year = dateTime.getUTCFullYear()
  const monthIndex = dateTime.getUTCMonth()
  const day = dateTime.getUTCDate()

  // Get the month name from the array
  const monthName = monthNames[monthIndex]

  // Return the formatted date string in the format "June 1, 2023"
  return `${monthName} ${day}, ${year}`
}

export const getFormattedTime = (timestamp: string): string => {
  const dateTime = new Date(timestamp)

  // Adjust hours for EST (Eastern Standard Time)
  const estOffset = -5 // EST is UTC-5
  const estHours = (dateTime.getUTCHours() + estOffset + 24) % 12 || 12

  // Extract the minutes component
  const minutes = dateTime.getUTCMinutes()

  // Determine AM or PM
  const ampm = dateTime.getUTCHours() >= 12 ? 'PM' : 'AM'

  // Return the formatted time string in the format "4:10 PM"
  return `${estHours}:${String(minutes).padStart(2, '0')} ${ampm}`
}
