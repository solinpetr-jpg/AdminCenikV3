import { useState } from 'react'
import { Heading, Text, Stack, Button, Modal } from '../../index'
import './DocPage.css'

export default function ModalDoc() {
  const [open, setOpen] = useState(false)

  return (
    <Stack gap={6}>
      <div>
        <Heading level={1}>Modal</Heading>
        <Text as="p" variant="body" muted style={{ marginTop: 8 }}>
          Dialog s pozadím a zavřením přes Escape nebo klik na backdrop. Použití: Uložit variantu, Odeslat nabídku, Smazat variantu.
        </Text>
      </div>

      <section>
        <Heading level={2}>Ukázka</Heading>
        <Button variant="primary" onClick={() => setOpen(true)} style={{ marginTop: 16 }}>
          Otevřít modal
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Uložit variantu nabídky"
          subtitle="Variantu můžete později přidat do objednávky nebo odeslat klientovi."
          footer={
            <>
              <Button variant="secondary" onClick={() => setOpen(false)}>Zrušit</Button>
              <Button variant="primary" onClick={() => setOpen(false)}>Uložit</Button>
            </>
          }
        >
          <p>Obsah modalu – formulář jména a poznámky.</p>
        </Modal>
      </section>

      <section>
        <Heading level={2}>Props</Heading>
        <div className="ds-doc-props">
          <table>
            <thead>
              <tr><th>Prop</th><th>Typ</th><th>Popis</th></tr>
            </thead>
            <tbody>
              <tr><td>open</td><td>boolean</td><td>Viditelnost</td></tr>
              <tr><td>onClose</td><td>() =&gt; void</td><td>Zavření (Escape / backdrop)</td></tr>
              <tr><td>title</td><td>string</td><td>Nadpis</td></tr>
              <tr><td>subtitle</td><td>string</td><td>Podnadpis</td></tr>
              <tr><td>footer</td><td>ReactNode</td><td>Tlačítka v patičce</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </Stack>
  )
}
