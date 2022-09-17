export default function formatMoney(money, locales= 'en-IN', options = {
  style: 'currency',
  currency: 'EGP',
  maximumSignificantDigits: 5,
  minimumSignificantDigits: 3
}) {
  return new Intl.NumberFormat('en-IN', options).format(money)
}
