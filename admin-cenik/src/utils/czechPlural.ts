export type PluralPoložkaResult = 'položka' | 'položky' | 'položek'

export function pluralPoložka(n: number): PluralPoložkaResult {
  const num = Math.abs(Number(n))
  if (num === 1) return 'položka'
  if (num >= 2 && num <= 4) return 'položky'
  return 'položek'
}
