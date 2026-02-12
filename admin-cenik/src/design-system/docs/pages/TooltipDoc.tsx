import { Info } from 'lucide-react'
import { Heading, Text, Stack, Tooltip } from '../../index'
import './DocPage.css'

export default function TooltipDoc() {
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Tooltip</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          První klik otevře, druhý klik nebo klik mimo zavře. Přístupné z klávesnice (Enter/Space). Nepřesouvá layout.
        </Text>
      </div>

      <section>
        <Heading level={2}>Ukázka</Heading>
        <div style={{ marginTop: 16 }}>
          <Tooltip
            trigger={<Info size={16} strokeWidth={2} />}
            title="Informace o ceně"
          >
            <div>
              <strong>Název produktu</strong>
              <p style={{ margin: '8px 0 0' }}>Tabulka cen podle množství a slev.</p>
            </div>
          </Tooltip>
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
              <tr><td>trigger</td><td>ReactNode</td><td>Prvek, na který se klikne</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>Obsah panelu</td></tr>
              <tr><td>title</td><td>string</td><td>HTML title (nápověda)</td></tr>
              <tr><td>position</td><td>'top'|'bottom'|'left'|'right'</td><td>Pozice panelu</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </Stack>
  )
}
