import { Heading, Text, Stack, Button, CardSurface } from '../../index'
import './DocPage.css'

export default function ButtonDoc() {
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Button</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Primární, sekundární a terciární CTA. Použití: Přidat do košíku, Uložit variantu, Zavřít v modalech.
        </Text>
      </div>

      <section>
        <Heading level={2}>Behavior</Heading>
        <p>Hover: zesílení / ring. Focus: focus-visible ring. Disabled: žádná interakce.</p>
      </section>

      <section>
        <Heading level={2}>Varianty</Heading>
        <Stack direction="horizontal" gap={3} wrap style={{ marginTop: 16 }}>
          <Button variant="primary">Primární CTA</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary">Sekundární</Button>
          <Button variant="tertiary">Terciární</Button>
          <Button variant="ghost-danger">Ghost danger</Button>
        </Stack>
      </section>

      <section>
        <Heading level={2}>State gallery</Heading>
        <p style={{ marginBottom: 8 }}>default | hover | active | focus | disabled</p>
        <Stack direction="horizontal" gap={3} wrap style={{ marginTop: 8 }}>
          <Button variant="primary">Default</Button>
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </Stack>
      </section>

      <section>
        <Heading level={2}>Props</Heading>
        <CardSurface className="ds-doc-props" style={{ marginTop: 16 }}>
          <table>
            <thead>
              <tr>
                <th>Prop</th>
                <th>Typ</th>
                <th>Výchozí</th>
                <th>Popis</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>variant</td><td>'primary' | 'secondary' | 'tertiary' | 'ghost-danger'</td><td>'primary'</td><td>Vzhled tlačítka</td></tr>
              <tr><td>size</td><td>'md' | 'sm'</td><td>'md'</td><td>Výška a padding</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>Vypnuté tlačítko</td></tr>
              <tr><td>fullWidth</td><td>boolean</td><td>false</td><td>Plná šířka</td></tr>
            </tbody>
          </table>
        </CardSurface>
      </section>

      <section>
        <Heading level={2}>Snippet</Heading>
        <pre className="ds-doc-code">{`<Button variant="primary" onClick={handleAdd}>
  Přidat
</Button>
<Button variant="secondary">Zrušit</Button>`}</pre>
      </section>
    </Stack>
  )
}
