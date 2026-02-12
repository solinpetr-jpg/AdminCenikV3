import { useState } from 'react'
import { Heading, Text, Stack, Stepper } from '../../index'
import './DocPage.css'

export default function StepperDoc() {
  const [value, setValue] = useState(2)
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Stepper</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          − / číslo / + pro změnu množství. Stejná výška jako CTA (48px). Použití: karta balíčku, řádek služby, košík.
        </Text>
      </div>
      <section>
        <Heading level={2}>Ukázka</Heading>
        <div style={{ marginTop: 16 }}>
          <Stepper value={value} onChange={setValue} aria-label="Počet kusů" />
        </div>
      </section>
    </Stack>
  )
}
