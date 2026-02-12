import { Link } from 'react-router-dom'
import { Heading, Text, Stack } from '../../index'

export default function DocHome() {
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Design systém – Admin ceník</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Interní UI knihovna vygenerovaná z reálných komponent projektu. Atomic Design: Foundations → Atoms → Molecules → Organisms → Templates.
        </Text>
      </div>
      <section>
        <Heading level={2}>Kategorie</Heading>
        <ul style={{ marginTop: 16, paddingLeft: 24 }}>
          <li><Link to="/design-system/foundations">Foundations</Link> – tokeny (barvy, typo, spacing, radius, shadow)</li>
          <li><Link to="/design-system/atoms/button">Atoms</Link> – Button, Heading, Text, Badge, Chip, Stepper, Tooltip…</li>
          <li><Link to="/design-system/molecules/quantity-chips">Molecules</Link> – QuantityChips, Price, FormField</li>
          <li><Link to="/design-system/organisms/accordion">Organisms</Link> – Accordion, Modal, SectionCard</li>
        </ul>
      </section>
    </Stack>
  )
}
