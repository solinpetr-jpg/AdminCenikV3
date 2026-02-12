import { useState } from 'react'
import { Heading, Text, Stack, Button, PricingHintTable } from '../../index'
import './DocPage.css'

export default function PricingHintTableDoc() {
  const [open, setOpen] = useState(false)

  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Hint Pricing Table</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Modal s tabulkou: Počet, Cena před slevou, Sleva, Cena po slevě. Dynamické badge -10 %, -15 %, -20 %. Klik mimo nebo ESC zavře. Focus trap uvnitř modalu.
        </Text>
      </div>

      <section>
        <Heading level={2}>Behavior</Heading>
        <ul style={{ marginTop: 8, paddingLeft: 24 }}>
          <li>Otevření: typicky z info ikony u ceny na Pricing Card.</li>
          <li>Zavření: klik na backdrop, ESC, tlačítko Zavřít.</li>
          <li>Focus zůstane v modalu (Tab prochází pouze prvky uvnitř).</li>
        </ul>
      </section>

      <section>
        <Heading level={2}>Ukázka samostatně</Heading>
        <Button variant="primary" onClick={() => setOpen(true)} style={{ marginTop: 16 }}>
          Otevřít tabulku slev
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
