import { useState } from 'react'
import { Heading, Text, Stack, Chip } from '../../index'
import './DocPage.css'

export default function ChipDoc() {
  const [sel, setSel] = useState<number | null>(0)
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Chip (Quantity option)</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Jedna množstevní volba (1×, 3×, 5×). Volitelný badge se slevou. Použití uvnitř QuantityChips.
        </Text>
      </div>
      <section>
        <Heading level={2}>Ukázka</Heading>
        <Stack direction="horizontal" gap={2} style={{ marginTop: 16 }}>
          <Chip selected={sel === 0} onClick={() => setSel(0)}>1×</Chip>
          <Chip selected={sel === 1} badge="-10%" onClick={() => setSel(1)}>3×</Chip>
          <Chip selected={sel === 2} badge="-15%" onClick={() => setSel(2)}>5×</Chip>
        </Stack>
      </section>

      <section>
        <Heading level={2}>State gallery</Heading>
        <div className="ds-doc-grid" style={{ marginTop: 16, maxWidth: 640 }}>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>Default</Text>
            <Chip>3×</Chip>
          </div>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>Hover</Text>
            <Chip>3×</Chip>
          </div>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>Selected</Text>
            <Chip selected>3×</Chip>
          </div>
          <div>
            <Text variant="bodySm" muted as="div" style={{ marginBottom: 8 }}>Selected + hover</Text>
            <Chip selected>3×</Chip>
          </div>
        </div>
      </section>
    </Stack>
  )
}
