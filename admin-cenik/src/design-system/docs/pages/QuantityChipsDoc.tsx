import { useState } from 'react'
import { Heading, Text, Stack, QuantityChips, Text as DSText } from '../../index'
import './DocPage.css'

const OPTIONS = [
  { label: '1×' },
  { label: '3×', discount: '-10%' },
  { label: '5×', discount: '-15%' },
  { label: '10×', discount: '-20%' },
]

export default function QuantityChipsDoc() {
  const [selected, setSelected] = useState<number | null>(null)

  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>QuantityChips</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Výběr množství v TOP balíčcích a v řádcích prémiových služeb. Slevové badge nad vybraným kusem.
        </Text>
      </div>

      <section>
        <Heading level={2}>S popiskem MNOŽSTVÍ</Heading>
        <DSText variant="label" as="div" style={{ marginBottom: 8 }}>MNOŽSTVÍ</DSText>
        <QuantityChips
          options={OPTIONS}
          selectedIndex={selected}
          onSelect={setSelected}
        />
      </section>

      <section>
        <Heading level={2}>Kompaktní (bez paddingu)</Heading>
        <QuantityChips
          options={OPTIONS}
          selectedIndex={selected}
          onSelect={setSelected}
          compact
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
              <tr><td>options</td><td>{'{ label, discount? }[]'}</td><td>Položky (1×, 3×, …)</td></tr>
              <tr><td>selectedIndex</td><td>number | null</td><td>Index vybrané</td></tr>
              <tr><td>onSelect</td><td>(index: number) =&gt; void</td><td>Callback výběru</td></tr>
              <tr><td>compact</td><td>boolean</td><td>Bez padding-top (řádek tabulky)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </Stack>
  )
}
