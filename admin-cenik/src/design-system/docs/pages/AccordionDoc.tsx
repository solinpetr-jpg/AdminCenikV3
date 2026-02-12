import { Star } from 'lucide-react'
import { Heading, Text, Stack, Accordion } from '../../index'
import './DocPage.css'

export default function AccordionDoc() {
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Accordion</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Sekce s rozbalovacím obsahem. Použití: Prémiové služby, Základní inzerce, Položky objednávky, Fakturační údaje.
        </Text>
      </div>

      <section>
        <Heading level={2}>Ukázka</Heading>
        <div style={{ marginTop: 16 }}>
          <Accordion
            id="doc-accordion"
            title="Prémiové služby pro Práci"
            summary="3 položky • 1 vybráno"
            icon={<Star size={20} color="var(--ds-accent)" />}
            defaultExpanded
          >
            <div style={{ padding: 24, background: 'var(--ds-bg-surface-hover)' }}>
              Obsah sekce – řádky služeb, množství, ceny.
            </div>
          </Accordion>
        </div>
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
              <tr><td>summary</td><td>ReactNode</td><td>Vedle nadpisu (např. „3 položky“)</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>Ikona v záhlaví (40×40)</td></tr>
              <tr><td>expanded / defaultExpanded</td><td>boolean</td><td>Řízený / neřízený stav</td></tr>
              <tr><td>staticHeader</td><td>boolean</td><td>Hlavička neklikatelná (vždy otevřeno)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </Stack>
  )
}
