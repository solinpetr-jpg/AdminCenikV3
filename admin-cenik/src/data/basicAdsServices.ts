import type { BasicAdService } from '../types'

export const basicAdsServices: BasicAdService[] = [
  {
    id: 1,
    title: 'Inzerát práce 30',
    subtitle: '30denní zobrazení',
    priceCZK: 3990,
    vatNote: 'bez DPH',
    quantityOptions: [
      { label: '3x', discount: '-10%' },
      { label: '5x', discount: '-15%' },
      { label: '10x', discount: '-20%' },
    ],
  },
  {
    id: 2,
    title: 'AI Videoinzerát PRO',
    priceCZK: 9990,
    vatNote: 'bez DPH',
    quantityOptions: [
      { label: '3x', discount: '-10%' },
      { label: '5x', discount: '-15%' },
      { label: '10x', discount: '-20%' },
    ],
  },
  {
    id: 3,
    title: 'Instagram Promo Inzerát',
    priceCZK: 7990,
    vatNote: 'bez DPH',
    quantityOptions: [
      { label: '3x', discount: '-10%' },
      { label: '5x', discount: '-15%' },
      { label: '10x', discount: '-20%' },
    ],
  },
  {
    id: 4,
    title: 'Inzerce práce na JenFirmy.cz',
    priceCZK: 399,
    vatNote: 'bez DPH',
  },
  {
    id: 5,
    title: 'Inzerát práce 7',
    subtitle: '7denní zobrazení inzerátu',
    priceCZK: 1990,
    vatNote: 'bez DPH',
  },
]
