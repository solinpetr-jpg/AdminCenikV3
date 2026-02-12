import { Heading, Text, Stack, Price } from '../../index'
import './DocPage.css'

export default function PriceDoc() {
  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Price</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Formátovaná cena (Open Sans, 600). Velikosti: lg (24px), md (18px), sm (14px). Suffix např. „bez DPH“.
        </Text>
      </div>
      <section>
        <Heading level={2}>Ukázka</Heading>
        <Stack gap={2} style={{ marginTop: 16 }}>
          <Price value="24 900 Kč" size="lg" suffix="bez DPH" />
          <Price value="12 450 Kč" size="md" suffix="/ 12 měsíců" />
          <Price value="1 037,50 Kč" size="sm" />
        </Stack>
      </section>
    </Stack>
  )
}
