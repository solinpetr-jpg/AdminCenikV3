export interface DalsiProduktItem {
  id: number
  title: string
  /** Zobrazený text ceny (např. "9 990 Kč" nebo "Na dotaz Kč") */
  priceDisplay: string
  /** Cena pro košík (0 = na dotaz, zobrazí se priceDisplay) */
  priceCZK: number
}

export const dalsiProduktyServices: DalsiProduktItem[] = [
  { id: 1, title: 'Služba na objednávku', priceDisplay: 'Na dotaz Kč', priceCZK: 0 },
  { id: 2, title: 'Balíček kreditů na Kampaň na Facebooku a Instagramu', priceDisplay: '1 Kč', priceCZK: 1 },
  { id: 3, title: 'Firemní profil', priceDisplay: '9 990 Kč', priceCZK: 9990 },
  { id: 4, title: 'Profil firmy na JenFirmy.cz', priceDisplay: '9 990 Kč', priceCZK: 9990 },
  { id: 5, title: 'Individuální odpovědní formulář', priceDisplay: '9 990 Kč', priceCZK: 9990 },
  { id: 6, title: 'Logo firmy do oboru', priceDisplay: '9 980 Kč', priceCZK: 9980 },
  { id: 7, title: 'Logo firmy na hlavní stránce', priceDisplay: '99 990 Kč', priceCZK: 99990 },
]
