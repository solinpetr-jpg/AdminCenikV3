import { useState } from 'react'

const secondaryButtonJsx = `<button
  type="button"
  className="btn btn-outline-secondary order-action-btn-secondary d-flex align-items-center"
>
  Ulozit cenovou nabidku
</button>`

const secondaryButtonCss = `.order-actions-section .order-action-btn-secondary {
  display: inline-flex;
  height: 48px;
  min-height: 48px;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 32px;
  border: 1px solid #C91617;
  background-color: transparent;
  color: #C91617;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 130%;
}

.order-actions-section .order-action-btn-secondary:hover {
  background-color: rgba(201, 22, 23, 0.06);
}`

const primaryButtonJsx = `<button
  type="button"
  className="btn btn-primary order-action-btn-primary d-flex align-items-center"
>
  Vytvorit objednavku
</button>`

const primaryButtonCss = `.order-actions-section .order-action-btn-primary {
  display: inline-flex;
  height: 48px;
  min-height: 48px;
  padding: 8px 24px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 32px;
  background-color: #C91617;
  border: none;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 130%;
}`

const stepperJsx = `<div className="stepper" role="group" aria-label="Pocet">
  <button type="button" className="stepper-btn">-</button>
  <input type="number" className="stepper-input" value="5" readOnly />
  <button type="button" className="stepper-btn">+</button>
</div>`

function SnippetCard({ title, code, codeType, snippetKey, onCopy, copiedKey }) {
  const isCopied = copiedKey === snippetKey

  return (
    <div className="border rounded-3 bg-light p-3 mb-3">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <strong>{title}</strong>
        <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => onCopy(code, snippetKey)}>
          {isCopied ? 'Zkopirovano' : 'Kopirovat'}
        </button>
      </div>
      <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', fontSize: '13px' }}>
        <code>{codeType ? `/* ${codeType} */\n` : ''}{code}</code>
      </pre>
    </div>
  )
}

export default function DesignSystemPage() {
  const [copiedKey, setCopiedKey] = useState('')

  const handleCopy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedKey(key)
      window.setTimeout(() => setCopiedKey(''), 1400)
    } catch {
      setCopiedKey('')
    }
  }

  return (
    <main className="min-vh-100 bg-light">
      <div className="container order-page-container pt-4 pt-md-5 pb-5">
        <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-4">
          <h1 className="order-page-title mb-0">Design System</h1>
          <a href="/" className="btn btn-outline-secondary order-action-btn-secondary d-inline-flex align-items-center">
            Zpět na objednávku
          </a>
        </div>
        <p className="order-page-subtitle mb-4">
          Přehled reálných UI prvků použitých v projektu.
        </p>

        <section className="mb-4">
          <div className="premium-section-header w-100 d-flex align-items-center justify-content-between flex-wrap gap-2 border-0 text-start">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '40px', height: '40px', backgroundColor: '#1B3C981A' }}
                aria-hidden
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 384 512" fill="#1B3C98" aria-hidden>
                  <path d="M64 464c-8.8 0-16-7.2-16-16V64c0-8.8 7.2-16 16-16H224v80c0 17.7 14.3 32 32 32h80V448c0 8.8-7.2 16-16 16H64zM64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V154.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0H64z" />
                </svg>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <h2 className="premium-section-title mb-0">Typografie</h2>
                <span className="premium-section-summary">Nadpisy a textové styly</span>
              </div>
            </div>
          </div>
          <div className="premium-section-content premium-section-content--open">
            <div className="p-3 p-md-4 bg-white">
              <h2 className="heading-h2 mb-2">Heading H2</h2>
              <p className="order-page-subtitle mb-3">Podtitul / pomocný popis</p>
              <p className="card-subtitle-text mb-2">Card subtitle text (Inter 14)</p>
              <span className="card-quantity-label d-inline-block">MNOŽSTVÍ</span>
            </div>
          </div>
        </section>

        <section className="mb-4" id="options-content">
          <div className="premium-section-header w-100 d-flex align-items-center justify-content-between flex-wrap gap-2 border-0 text-start">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '40px', height: '40px', backgroundColor: '#1B3C981A' }}
                aria-hidden
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512" fill="#1B3C98" aria-hidden>
                  <path d="M247.6 8.1c3.7-10.8 19-10.8 22.8 0l31 90.1c1.6 4.7 6 7.8 10.9 7.8l95 0c11.4 0 16.2 14.6 7 21.4l-76.8 56c-4 2.9-5.6 8-4.1 12.7l31 90.1c3.7 10.8-8.7 19.8-17.9 13l-76.8-56c-4-2.9-9.5-2.9-13.5 0l-76.8 56c-9.2 6.7-21.6-2.2-17.9-13l31-90.1c1.6-4.7-.1-9.8-4.1-12.7l-76.8-56c-9.2-6.7-4.4-21.4 7-21.4l95 0c5 0 9.3-3.1 10.9-7.8l31-90.1z" />
                </svg>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <h2 className="premium-section-title mb-0">Tlačítka</h2>
                <span className="premium-section-summary">Primary / Secondary / Hover states</span>
              </div>
            </div>
          </div>
          <div className="premium-section-content premium-section-content--open">
            <div className="p-3 p-md-4 bg-white">
              <div className="d-flex flex-wrap gap-3 mb-3">
                <button type="button" className="btn btn-outline-secondary d-flex align-items-center">
                  Darovat zdarma
                </button>
                <button type="button" className="btn btn-outline-secondary d-flex align-items-center">
                  S konečnou fakturou
                </button>
                <button type="button" className="btn btn-outline-secondary d-flex align-items-center">
                  Bez faktury
                </button>
              </div>
              <div className="order-actions-section p-0 m-0">
                <div className="d-flex flex-wrap gap-3 order-actions-buttons m-0">
                  <button type="button" className="btn btn-outline-secondary order-action-btn-secondary d-flex align-items-center">
                    Uložit cenovou nabídku
                  </button>
                  <button type="button" className="btn btn-outline-secondary order-action-btn-secondary d-flex align-items-center">
                    Odeslat cenovou nabídku
                  </button>
                  <button type="button" className="btn btn-primary order-action-btn-primary d-flex align-items-center">
                    Vytvořit objednávku
                  </button>
                </div>
              </div>
              <div className="mt-4">
                <SnippetCard
                  title="Secondary button - JSX"
                  code={secondaryButtonJsx}
                  codeType="jsx"
                  snippetKey="secondary-jsx"
                  onCopy={handleCopy}
                  copiedKey={copiedKey}
                />
                <SnippetCard
                  title="Secondary button - CSS"
                  code={secondaryButtonCss}
                  codeType="css"
                  snippetKey="secondary-css"
                  onCopy={handleCopy}
                  copiedKey={copiedKey}
                />
                <SnippetCard
                  title="Primary button - JSX"
                  code={primaryButtonJsx}
                  codeType="jsx"
                  snippetKey="primary-jsx"
                  onCopy={handleCopy}
                  copiedKey={copiedKey}
                />
                <SnippetCard
                  title="Primary button - CSS"
                  code={primaryButtonCss}
                  codeType="css"
                  snippetKey="primary-css"
                  onCopy={handleCopy}
                  copiedKey={copiedKey}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="premium-section-header w-100 d-flex align-items-center justify-content-between flex-wrap gap-2 border-0 text-start">
            <div className="d-flex align-items-center gap-3">
              <div
                className="rounded d-flex align-items-center justify-content-center flex-shrink-0"
                style={{ width: '40px', height: '40px', backgroundColor: '#1B3C981A' }}
                aria-hidden
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 576 512" fill="#1B3C98" aria-hidden>
                  <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 222.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6h277.2c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 73.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                </svg>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <h2 className="premium-section-title mb-0">Komponenty</h2>
                <span className="premium-section-summary">Badge, varianty, stepper, formulář</span>
              </div>
            </div>
          </div>
          <div className="premium-section-content premium-section-content--open">
            <div className="p-3 p-md-4 bg-white">
              <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
                <span className="badge rounded-pill package-card-favorite-badge" style={{ position: 'static' }}>
                  NEJOBLÍBENĚJŠÍ
                </span>
                <span className="premium-service-order-badge">Přidáno</span>
                <span className="quantity-badge" style={{ position: 'static', transform: 'none' }}>
                  -15 %
                </span>
              </div>

              <div className="d-flex flex-wrap gap-2 mb-4" role="group" aria-label="Množství">
                <button type="button" className="quantity-option">3x</button>
                <button type="button" className="quantity-option active">5x</button>
                <button type="button" className="quantity-option">10x</button>
              </div>

              <div className="stepper mb-4" role="group" aria-label="Počet">
                <button type="button" className="stepper-btn">−</button>
                <input type="number" className="stepper-input" value="5" readOnly />
                <button type="button" className="stepper-btn">+</button>
              </div>
              <SnippetCard
                title="Stepper - JSX"
                code={stepperJsx}
                codeType="jsx"
                snippetKey="stepper-jsx"
                onCopy={handleCopy}
                copiedKey={copiedKey}
              />

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Firma či jméno</label>
                  <input type="text" className="form-control" placeholder="Lead - HR Services s.r.o." />
                </div>
                <div className="col-md-6">
                  <label className="form-label">IČO</label>
                  <input type="text" className="form-control" placeholder="09415637" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
