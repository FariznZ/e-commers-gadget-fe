export function formatIDR(value?: number | null): string {
  if (value === undefined || value === null || isNaN(value)) {
    return 'Rp0'
  }
  return 'Rp' + Math.abs(value).toLocaleString('id-ID')
}

export function signedIDR(value?: number | null): string {
  if (value === undefined || value === null || isNaN(value)) {
    return 'Rp0'
  }
  return (value < 0 ? '-' : '') + formatIDR(value)
}
