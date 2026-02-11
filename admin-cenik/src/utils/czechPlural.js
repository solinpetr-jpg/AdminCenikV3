/**
 * Skloňování „položka“ podle počtu (1 položka, 2–4 položky, 0/5+ položek).
 * @param {number} n - počet
 * @returns {'položka'|'položky'|'položek'}
 */
export function pluralPoložka(n) {
  const num = Math.abs(Number(n))
  if (num === 1) return 'položka'
  if (num >= 2 && num <= 4) return 'položky'
  return 'položek'
}
