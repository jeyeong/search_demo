export function capitalizeWords(str) {
  if (!str) return str
  return str
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}
