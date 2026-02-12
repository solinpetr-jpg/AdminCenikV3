import { useState } from 'react'
import { Heading, Text, Stack, PricingCard } from '../../index'
import './DocPage.css'

const SAMPLE_OPTIONS = [
  { label: '3×', discount: '-10%' },
  { label: '5×', discount: '-15%' },
  { label: '10×', discount: '-20%' },
]

const LONG_TITLE =
  'Inzerát práce 30 + SuperBoost a další rozšíření o mnoho slov pro edge case'

export default function PricingCardDoc() {
  const [qty1, setQty1] = useState(0)
  const [qty2, setQty2] = useState(2)

  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Pricing Card</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Kompletní karta produktu: badge, nadpis, množství, CTA/stepper, cena, info ikona. Složeno výhradně z atomů a molekul DS.
        </Text>
      </div>

      <section>
        <Heading level={2}>Behavior</Heading>
        <ul style={{ marginTop: 8, paddingLeft: 24 }}>
          <li>Klik na chip nastaví množství a přepne na stepper.</li>
          <li>Klik na „Přidat“ přidá 1 ks nebo vybrané množství z chipu.</li>
          <li>Info ikona otevře Hint Pricing Table (modal).</li>
          <li>Karta s quantity &gt; 0 má měkčí pozadí (selected).</li>
        </ul>
      </section>

      <section>
        <Heading level={2}>When to use</Heading>
        <p>Použij pro hlavní produktové nabídky (TOP balíčky). Nepoužívej pro jednoduché add-on služby bez variant množství.</p>
      </section>

      <section>
        <Heading level={2}>Do / Don&apos;t</Heading>
        <ul style={{ paddingLeft: 24 }}>
          <li>Do: Jedna hlavní CTA (Přidat). Badge jen u favorita.</li>
          <li>Don&apos;t: Nemíchej více primárních akcí v jedné kartě.</li>
        </ul>
      </section>

      <section>
        <Heading level={2}>State gallery</Heading>
        <div className="ds-doc-grid ds-doc-grid--cards" style={{ marginTop: 16 }}>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>Default</Text>
            <PricingCard
              title="Inzerát práce 30 + Facebook"
              subtitle="Prioritní zobrazení a zvýraznění"
              unitPrice={14990}
              quantityOptions={SAMPLE_OPTIONS}
              quantity={0}
            />
          </div>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>Selected (s množstvím)</Text>
            <PricingCard
              title="Inzerát práce 30 + SuperBoost"
              subtitle="Klasický inzerát s širším dosahem"
              unitPrice={5990}
              quantityOptions={SAMPLE_OPTIONS}
              quantity={qty2}
              onQuantityChange={setQty2}
              selected
            />
          </div>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>Disabled</Text>
            <PricingCard
              title="Balíček X"
              subtitle="Popis"
              unitPrice={9990}
              quantityOptions={SAMPLE_OPTIONS}
              quantity={0}
              disabled
            />
          </div>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>Loading</Text>
            <PricingCard
              title="Balíček Y"
              subtitle="Popis"
              unitPrice={7990}
              quantityOptions={SAMPLE_OPTIONS}
              quantity={0}
              loading
            />
          </div>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>S badge NEJOBLÍBENĚJŠÍ</Text>
            <PricingCard
              title="Inzerát práce 30 + SuperBoost"
              subtitle="Klasický inzerát"
              unitPrice={5990}
              favoriteBadge
              quantityOptions={SAMPLE_OPTIONS}
              quantity={0}
            />
          </div>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>Edge case: dlouhý název</Text>
            <PricingCard
              title={LONG_TITLE}
              subtitle="Prioritní zobrazení a zvýraznění"
              unitPrice={24990}
              quantityOptions={SAMPLE_OPTIONS}
              quantity={0}
            />
          </div>
        </div>
      </section>

      <section>
        <Heading level={2}>V kontextu s otevřeným hint modalem</Heading>
        <p style={{ marginBottom: 16 }}>Klikni na info ikonu u ceny – otevře se tabulka slev.</p>
        <PricingCard
          title="Inzerát práce 30 + Facebook"
          subtitle="Prioritní zobrazení a zvýraznění"
          unitPrice={14990}
          quantityOptions={SAMPLE_OPTIONS}
          quantity={qty1}
          onQuantityChange={setQty1}
          onAdd={setQty1}
        />
      </section>
    </Stack>
  )
}
