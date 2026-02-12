import { Star } from 'lucide-react'
import { Heading, Text, Stack, AccordionSection } from '../../index'
import './DocPage.css'

const SAMPLE_ROWS = [
  {
    title: 'Prémiová služba A',
    subtitle: 'Popis služby',
    unitPrice: 4990,
    vatNote: 'bez DPH',
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

export default function AccordionSectionDoc() {
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Accordion Section</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Plná sekce typu „Prémiové služby“: header s ikonou, počítadlo položek, expand/collapse, řádky s cenou a CTA.
        </Text>
      </div>

      <section>
        <Heading level={2}>Behavior</Heading>
        <ul style={{ marginTop: 8, paddingLeft: 24 }}>
          <li>Klik na header rozbalí/sbalí obsah.</li>
          <li>Summary zobrazuje počet položek a „X vybráno“.</li>
          <li>Řádky: výběr množství, stepper, cena, info ikona.</li>
        </ul>
      </section>

      <section>
        <Heading level={2}>Collapsed / Expanded</Heading>
        <div style={{ marginTop: 16 }}>
          <AccordionSection
            id="doc-accordion-section"
            title="Prémiové služby pro Práci"
            summary="2 položky • 0 vybráno"
            icon={<Star size={20} color="var(--ds-accent)" />}
            rows={SAMPLE_ROWS}
            defaultExpanded
          />
        </div>
      </section>

      <section>
        <Heading level={2}>Varianta: jednoduchý list (Další produkty)</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Na stránce objednávky se v sekci „Další produkty“ používá zjednodušený list: každý řádek má název vlevo, cenu + „bez DPH“ vpravo a modré tlačítko „+ Přidat“. Data jsou v <code>data/dalsiProduktyServices.ts</code>, komponenta <code>DalsiProduktySectionContent</code>. Rozložení 1:1 podle návrhu (dividers mezi řádky, rounded container).
        </Text>
      </section>

      <section>
        <Heading level={2}>Props</Heading>
        <div className="ds-doc-props">
          <table>
            <thead>
              <tr><th>Prop</th><th>Typ</th><th>Popis</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>Unikátní id (aria)</td></tr>
              <tr><td>title</td><td>string</td><td>Nadpis sekce</td></tr>
              <tr><td>summary</td><td>string</td><td>Např. „5 položek • 2 vybráno“</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>Ikona v headeru (40×40)</td></tr>
              <tr><td>rows</td><td>Array</td><td>Položky: title, subtitle?, unitPrice, quantityOptions</td></tr>
              <tr><td>quantities / onQuantityChange</td><td>—</td><td>Řízený stav množství</td></tr>
              <tr><td>defaultExpanded</td><td>boolean</td><td>Výchozí rozbalení</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </Stack>
  )
}
