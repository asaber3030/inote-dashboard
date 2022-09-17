export default function generateArray(length) {
  return Array.from({length: length}, (_, i) => i + 1);
}
