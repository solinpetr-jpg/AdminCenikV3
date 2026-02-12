import type { TopPackage } from '../types'

export const topPackages: TopPackage[] = [
  {
    id: 1,
    title: 'Inzerát PromoMax PPC',
    subtitle: 'Maximální dosah s PPC kampaní',
    priceCZK: 10990,
    vatNote: 'bez DPH',
    isFavorite: false,
    quantityOptions: [
      { label: '3x', discount: '-10%' },
      { label: '5x', discount: '-15%' },
      { label: '10x', discount: '-20%' },
    ],
  },
  {
    id: 2,
    title: 'Inzerát práce 30 + SuperBoost',
    subtitle: 'Klasický inzerát s širším dosahem',
    priceCZK: 5990,
    vatNote: 'bez DPH',
    isFavorite: true,
    quantityOptions: [
      { label: '3x', discount: '-10%' },
      { label: '5x', discount: '-15%' },
      { label: '10x', discount: '-20%' },
    ],
  },
  {
    id: 3,
    title: 'Inzerát práce 30 + Facebook',
    subtitle: 'Prioritní zobrazení a zvýraznění',
    priceCZK: 14990,
    vatNote: 'bez DPH',
    isFavorite: false,
    quantityOptions: [
      { label: '3x', discount: '-10%' },
      { label: '5x', discount: '-15%' },
      { label: '10x', discount: '-20%' },
    ],
  },
  {
    id: 4,
    title: 'Inzerát práce 30 + FIXACE 7 Plus',
    subtitle: 'Pro firemní a hromadné nábory',
    priceCZK: 24990,
    vatNote: 'bez DPH',
    isFavorite: false,
    quantityOptions: [
      { label: '3x', discount: '-10%' },
      { label: '5x', discount: '-15%' },
      { label: '10x', discount: '-20%' },
    ],
  },
  {
    id: 5,
    title: 'Inzerát práce 30 + Banner do kraje',
    subtitle: 'Neomezené inzeráty a podpora',
    priceCZK: 39990,
    vatNote: 'bez DPH',
    isFavorite: false,
    quantityOptions: [
      { label: '3x', discount: '-10%' },
      { label: '5x', discount: '-15%' },
      { label: '10x', discount: '-20%' },
    ],
  },
]
