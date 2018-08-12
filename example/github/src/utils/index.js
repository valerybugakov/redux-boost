export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export const pad = s => (s < 10 ? `0${s}` : s)

export const formatDate = dateString => {
  const date = new Date(dateString)

  return `${pad(date.getDate())} ${
    MONTHS[date.getMonth()]
  } ${date.getFullYear()}`
}
