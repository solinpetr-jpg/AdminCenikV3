/** Položka v košíku */
export interface CartItem {
  serviceId: string
  name: string
  unitPriceWithoutVat: number
  quantity: number
  discountPercent?: number
  validityDays: string
}

/** Možnost množství (např. 3x, 5x) s volitelnou slevou */
export interface QuantityOption {
  label: string
  discount?: string
}

/** TOP balíček z data/topPackages */
export interface TopPackage {
  id: number
  title: string
  subtitle: string
  priceCZK: number
  vatNote: string
  isFavorite?: boolean
  quantityOptions: QuantityOption[]
}

/** Prémiová služba */
export interface PremiumService {
  id: number
  title: string
  priceCZK: number
  orderBadge: boolean
  quantityOptions?: QuantityOption[]
  vatNote?: string
}

/** Služba základní inzerce – quantityOptions a subtitle volitelné */
export interface BasicAdService {
  id: number
  title: string
  subtitle?: string
  priceCZK: number
  vatNote?: string
  quantityOptions?: QuantityOption[]
}

/** Uložená varianta nabídky */
export interface SavedVariantItem {
  serviceId: string
  name: string
  quantity: number
  discountPercent: number
  unitPriceWithoutVat: number
  validityDays: string
}

export interface SavedVariant {
  id: string
  name: string
  note: string
  items: SavedVariantItem[]
  sentToClient: boolean
  addedToOrder: boolean
}

export interface UiToast {
  id: string
  title: string
  message: string
}
