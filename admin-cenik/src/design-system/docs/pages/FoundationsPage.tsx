import { Heading, Text, Stack } from '../../index'
import { colors, spacing, radius, typography, zIndex } from '../../tokens'
import ColorSwatchCard from '../ColorSwatchCard'
import './DocPage.css'

export default function FoundationsPage() {
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Foundations</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Design tokeny extrahované z aktuálního projektu. Žádné nové hodnoty – pouze sjednocení a pojmenování.
        </Text>
      </div>

      <section>
        <Heading level={2}>Barvy</Heading>
        <div className="ds-doc-grid ds-doc-grid--cards" style={{ marginTop: 16 }}>
          {Object.entries(colors).map(([name, value]) => (
            <ColorSwatchCard key={name} name={name} value={value} />
          ))}
        </div>
      </section>

      <section>
        <Heading level={2}>Spacing (8px scale)</Heading>
        <pre className="ds-doc-code">{JSON.stringify(spacing, null, 2)}</pre>
      </section>

      <section>
        <Heading level={2}>Radius</Heading>
        <pre className="ds-doc-code">{JSON.stringify(radius, null, 2)}</pre>
      </section>

      <section>
        <Heading level={2}>Typography</Heading>
        <pre className="ds-doc-code">{JSON.stringify(typography, null, 2)}</pre>
      </section>

      <section>
        <Heading level={2}>Z-index</Heading>
        <pre className="ds-doc-code">{JSON.stringify(zIndex, null, 2)}</pre>
      </section>
    </Stack>
  )
}
