import { useState } from 'react'
import { Heading, Text, Stack, Button, PricingHintTable, PricingHintTableContent, CardSurface } from '../../index'
import './DocPage.css'

export default function PricingHintTableDoc() {
  const [open, setOpen] = useState(false)

  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Pricing Hint Table</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Tabulka slev: Počet, Cena před slevou, Sleva, Cena po slevě. Badge -10 %, -15 %, -20 %. Používá se uvnitř Tooltipu (info ikona u ceny) nebo jako modal.
        </Text>
      </div>

      <section>
        <Heading level={2}>Obsah tabulky (bez modalu)</Heading>
        <Text as="p" variant="bodySm" muted style={{ marginTop: 8 }}>
          Stejný obsah jako v Tooltipu / modalu – komponenta PricingHintTableContent.
        </Text>
        <CardSurface style={{ marginTop: 16, maxWidth: 440, overflow: 'hidden' }}>
          <PricingHintTableContent
            title="Inzerát práce 30 + SuperBoost"
            unitPrice={5990}
            hasQuantityOptions
            maxQuantity={20}
          />
        </CardSurface>
      </section>

      <section>
        <Heading level={2}>Jako modal</Heading>
        <ul style={{ marginTop: 8, paddingLeft: 24 }}>
          <li>Zavření: klik na backdrop, ESC, tlačítko Zavřít.</li>
          <li>Focus trap uvnitř modalu.</li>
        </ul>
        <Button variant="primary" onClick={() => setOpen(true)} style={{ marginTop: 16 }}>
          Otevřít tabulku slev (modal)
        </Button>
        <PricingHintTable
          open={open}
          onClose={() => setOpen(false)}
          title="Inzerát práce 30 + SuperBoost"
          unitPrice={5990}
          hasQuantityOptions
          maxQuantity={20}
        />
      </section>

      <section>
        <Heading level={2}>Props</Heading>
        <div className="ds-doc-props">
          <table>
            <thead>
              <tr><th>Prop</th><th>Typ</th><th>Popis</th></tr>
            </thead>
            <tbody>
              <tr><td>open</td><td>boolean</td><td>Viditelnost modalu</td></tr>
              <tr><td>onClose</td><td>() =&gt; void</td><td>Zavření</td></tr>
              <tr><td>title</td><td>string</td><td>Název produktu v hlavičce</td></tr>
              <tr><td>unitPrice</td><td>number</td><td>Cena za 1 ks (Kč)</td></tr>
              <tr><td>hasQuantityOptions</td><td>boolean</td><td>Zobrazit slevy dle množství</td></tr>
              <tr><td>maxQuantity</td><td>number</td><td>Počet řádků (1..maxQuantity)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </Stack>
  )
}
