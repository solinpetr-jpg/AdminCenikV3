import { Heading, Text, Stack } from '../../index'
import './DocPage.css'

export default function HeadingDoc() {
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Heading</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Nadpisy H1–H4. Open Sans, 600. Použití: stránka, sekce, karta, akordeon.
        </Text>
      </div>
      <section>
        <Heading level={2}>Varianty</Heading>
        <Stack gap={2} style={{ marginTop: 16 }}>
          <Heading level={1}>H1 – Nadpis stránky (36px)</Heading>
          <Heading level={2}>H2 – Nadpis sekce (28px)</Heading>
          <Heading level={3}>H3 – Nadpis bloku (20px)</Heading>
          <Heading level={4}>H4 – Nadpis karty (18px)</Heading>
        </Stack>
      </section>
    </Stack>
  )
}
