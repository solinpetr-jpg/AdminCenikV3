import { Heading, Text, Stack, Badge } from '../../index'
import './DocPage.css'

export default function BadgeDoc() {
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Badge</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Success (Přidáno), Accent (NEJOBLÍBENĚJŠÍ), Placeholder pro rezervaci místa.
        </Text>
      </div>
      <section>
        <Heading level={2}>Varianty</Heading>
        <Stack direction="horizontal" gap={3} style={{ marginTop: 16 }}>
          <Badge variant="success">Přidáno</Badge>
          <Badge variant="accent">NEJOBLÍBENĚJŠÍ</Badge>
          <Badge variant="placeholder">Placeholder</Badge>
        </Stack>
      </section>
    </Stack>
  )
}
