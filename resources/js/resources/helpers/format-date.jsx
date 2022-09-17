export default function formatDate(date, format = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  minute: 'numeric',
  hour: 'numeric',
}) {
  return new Date(date).toLocaleDateString("en-US", format)
}
