import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { Heading, Text, Stack, PricingCard, AccordionSection, BottomSummaryBar } from '../../index'
import { formatPriceCZK } from '../../utils/pricing'
import { Star } from 'lucide-react'
import './DocPage.css'

const CARDS = [
  {
    title: 'Inzerát práce 30 + SuperBoost',
    subtitle: 'Klasický inzerát s širším dosahem',
    unitPrice: 5990,
    favorite: true,
    options: [
      { label: '3×', discount: '-10%' },
      { label: '5×', discount: '-15%' },
      { label: '10×', discount: '-20%' },
    ],
  },
  {
    title: 'Inzerát práce 30 + Facebook',
    subtitle: 'Prioritní zobrazení a zvýraznění',
    unitPrice: 14990,
    favorite: false,
    options: [
      { label: '3×', discount: '-10%' },
      { label: '5×', discount: '-15%' },
      { label: '10×', discount: '-20%' },
    ],
  },
  {
    title: 'Inzerát PromoMax PPC',
    subtitle: 'Maximální dosah s PPC kampaní',
    unitPrice: 10990,
    favorite: false,
    options: [
      { label: '3×', discount: '-10%' },
      { label: '5×', discount: '-15%' },
      { label: '10×', discount: '-20%' },
    ],
  },
]

const ACCORDION_ROWS = [
  {
    title: 'Prémiová služba A',
    subtitle: 'Popis',
    unitPrice: 4990,
    quantityOptions: [
      { label: '3×', discount: '-10%' },
      { label: '5×', discount: '-15%' },
    ],
  },
  {
    title: 'Prémiová služba B',
    unitPrice: 2990,
    quantityOptions: [{ label: '1×' }],
  },
]

export default function PricingLayoutExample() {
  const [quantities, setQuantities] = useState(CARDS.map(() => 0))
  const total = quantities.reduce((sum, q, i) => sum + q * CARDS[i].unitPrice, 0)
  const count = quantities.reduce((a, b) => a + b, 0)
  const names = CARDS.filter((_, i) => quantities[i] > 0).map((c) => c.title)
  const subtitle = names.length === 0 ? 'Košík je prázdný' : names.slice(0, 2).join(', ') + (names.length > 2 ? '…' : '')

  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Composed: Pricing layout</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Více pricing karet vedle sebe, accordion sekce pod nimi, bottom summary bar. Jeden otevřený hint modal získáte klikem na info u libovolné ceny.
        </Text>
      </div>

      <section>
        <Heading level={2}>TOP balíčky</Heading>
        <div className="ds-doc-grid ds-doc-grid--cards" style={{ marginTop: 16 }}>
          {CARDS.map((card, i) => (
            <PricingCard
              key={i}
              title={card.title}
              subtitle={card.subtitle}
              unitPrice={card.unitPrice}
              favoriteBadge={card.favorite}
              quantityOptions={card.options}
              quantity={quantities[i]}
              onQuantityChange={(q) => {
                const next = [...quantities]
                next[i] = q
                setQuantities(next)
              }}
              onAdd={(q) => {
                const next = [...quantities]
                next[i] = q
                setQuantities(next)
              }}
              selected={quantities[i] > 0}
            />
          ))}
        </div>
      </section>

      <section>
        <Heading level={2}>Prémiové služby</Heading>
        <div style={{ marginTop: 16 }}>
          <AccordionSection
            id="example-accordion"
            title="Prémiové služby pro Práci"
            icon={<Star size={20} color="var(--ds-accent)" />}
            rows={ACCORDION_ROWS}
            defaultExpanded
          />
        </div>
      </section>

      {count > 0 && (
        <BottomSummaryBar
          title="Položky objednávky"
          subtitle={subtitle}
          priceValue={formatPriceCZK(total, 2)}
          priceLabel="bez DPH"
          actionLabel="Zobrazit detail"
          onAction={() => document.getElementById('example-accordion-heading')?.scrollIntoView({ behavior: 'smooth' })}
          icon={<ShoppingCart size={20} color="var(--ds-accent)" />}
          count={count}
        />
      )}

      <div style={{ height: 120 }} />
    </Stack>
  )
}
