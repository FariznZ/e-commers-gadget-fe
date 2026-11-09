export function formatIDR(value: number): string {
  return 'Rp' + Math.abs(value).toLocaleString('id-ID')
}

export function signedIDR(value: number): string {
  return (value < 0 ? '-' : '') + formatIDR(value)
}
