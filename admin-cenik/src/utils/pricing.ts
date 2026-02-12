export function formatPriceCZK(value: number, fractionDigits = 0): string {
  return (
    new Intl.NumberFormat('cs-CZ', {
      style: 'decimal',
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(value) + ' Kč'
  )
}

export function quantityFromLabel(label: string | number): number {
  const parsed = parseInt(String(label).replace(/\D/g, ''), 10)
  return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed
}

export function getDiscountForQuantity(quantity: number): { percent: number; label: string } | null {
  if (quantity < 3) return null
  if (quantity <= 4) return { percent: -10, label: '3-4 ks' }
  if (quantity <= 9) return { percent: -15, label: '5-9 ks' }
  return { percent: -20, label: '10+ ks' }
}

export function getDiscountPercentForQuantity(quantity: number): number {
  if (quantity < 3) return 0
  if (quantity <= 4) return 10
  if (quantity <= 9) return 15
  return 20
}
