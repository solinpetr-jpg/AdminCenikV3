export default function DesignSystemPage() {
  return (
    <div className="order-page-container min-vh-100">
      <div className="container py-4">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h1 className="order-page-title mb-2">Design systém – Admin ceník</h1>
            <p className="order-page-subtitle mb-0">
              Přehled základních stylů, komponent a stavebních bloků použitého UI.
            </p>
          </div>
          <a href="#order" className="btn btn-link text-decoration-none">
            Zpět na stránku objednávky
          </a>
        </header>

        <section className="order-page-section-gap">
          <h2 className="heading-h2 mb-3">Typografie</h2>
          <div className="card p-3 mb-3">
            <p className="text-muted mb-2 small">Nadpisy</p>
            <div className="mb-2">
              <div className="order-page-title">H1 – Nadpis stránky (Open Sans 36 / 600)</div>
            </div>
            <div className="mb-2">
              <div className="heading-h2">H2 – Nadpis sekce (Open Sans 28 / 600)</div>
            </div>
            <div className="mb-2">
              <div className="premium-section-header">
                <div className="premium-section-title">H3 – Nadpis bloku (Open Sans 20 / 600)</div>
              </div>
            </div>
          </div>

          <div className="card p-3">
            <p className="text-muted mb-2 small">Text a popisky</p>
            <p className="order-page-subtitle mb-1">
              Tělo textu – Inter 16 / 400, sekundární barva textu.
            </p>
            <p className="card-subtitle-text mb-1">
              Podtitul v kartách – Inter 14 / 400, použitý např. pro popis služby.
            </p>
            <p className="card-quantity-label mb-0">Label MNOŽSTVÍ – Inter 12 / 400, uppercase.</p>
          </div>
        </section>

        <section className="order-page-section-gap">
          <h2 className="heading-h2 mb-3">Barvy</h2>
          <div className="row g-3">
            {[
              { name: 'Primary', hex: '#C91617', usage: 'Hlavní CTA, akce, zvýraznění' },
              { name: 'Primary hover', hex: '#A91214', usage: 'Hover stavy tlačítek' },
              { name: 'Accent blue', hex: '#1B3C98', usage: 'Ikony sekcí, badge NEJOBLÍBENĚJŠÍ' },
              { name: 'Success', hex: '#09924C', usage: 'Badge PŘIDÁNO, potvrzení' },
              { name: 'Background', hex: '#F8F9FA', usage: 'Pozadí stránky objednávky' },
              { name: 'Surface', hex: '#FFFFFF', usage: 'Karty, akordeony, modaly' },
              { name: 'Muted text', hex: '#65758B', usage: 'Podtituly, pomocný text' },
              { name: 'Strong text', hex: '#0F172A', usage: 'Ceny, klíčové informace' },
            ].map((color) => (
              <div className="col-12 col-sm-6 col-md-3" key={color.name}>
                <div className="card h-100">
                  <div
                    style={{
                      backgroundColor: color.hex,
                      height: 56,
                      borderTopLeftRadius: '0.375rem',
                      borderTopRightRadius: '0.375rem',
                    }}
                  />
                  <div className="card-body py-2">
                    <div className="fw-semibold small mb-1">{color.name}</div>
                    <div className="small text-muted mb-1">{color.hex}</div>
                    <div className="small text-muted">{color.usage}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="order-page-section-gap">
          <h2 className="heading-h2 mb-3">Tlačítka</h2>
          <div className="card p-3">
            <p className="text-muted mb-3 small">
              Ukázky primárního a sekundárního CTA podle Figma design systému.
            </p>
            <div className="d-flex flex-wrap gap-3 align-items-center">
              <button type="button" className="save-offer-btn-primary">
                Primární CTA
              </button>
              <button type="button" className="save-offer-btn-primary" disabled>
                Primární CTA (disabled)
              </button>
              <button type="button" className="save-offer-btn-cancel">
                Sekundární CTA
              </button>
            </div>
          </div>
        </section>

        <section className="order-page-section-gap mb-5">
          <h2 className="heading-h2 mb-3">Karty &amp; akordeony</h2>

          <div className="row g-3">
            <div className="col-12 col-lg-6">
              <div className="card h-100 p-3">
                <p className="text-muted mb-2 small">Karta balíčku (zjednodušená ukázka)</p>
                <div className="mb-2">
                  <span className="premium-service-order-badge">PŘIDÁNO</span>
                </div>
                <h3 className="premium-service-title mb-1">TOP balíček</h3>
                <p className="card-subtitle-text mb-2">
                  Prioritní zobrazení, zvýraznění a další výhody.
                </p>
                <p className="mb-0">
                  <strong>24 900 Kč</strong>{' '}
                  <span className="small text-muted">bez DPH / 12 měsíců</span>
                </p>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="premium-accordion premium-accordion--open">
                <div className="premium-section-header">
                  <div className="premium-section-title">Akordeon sekce</div>
                </div>
                <div className="premium-section-content premium-section-content--open">
                  <div className="premium-service-row-wrapper">
                    <div className="premium-service-row premium-service-row--grid py-3">
                      <div>
                        <div className="premium-service-title mb-1">
                          Prémiová služba v akordeonu
                        </div>
                        <p className="card-subtitle-text mb-0">
                          Text popisuje konkrétní benefit nebo vlastnost služby.
                        </p>
                      </div>
                      <div className="d-flex align-items-center gap-3">
                        <button type="button" className="save-offer-btn-primary">
                          Přidat do košíku
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
