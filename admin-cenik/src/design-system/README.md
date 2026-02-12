# Design System – Admin ceník

Atomic Design: **Foundations → Atoms → Molecules → Organisms → Templates → Pages**.  
Vše extrahováno z existujícího UI, bez nového vizuálního jazyka.

---

## 1. Vytvořené složky

```
src/design-system/
├── tokens.css           # CSS proměnné (barvy, typo, spacing, radius, shadow, z-index)
├── tokens.ts            # Token konstanty pro JS/TS
├── index.ts             # Veřejné API (export všech komponent)
├── utils/
│   └── cn.ts            # Pomocná funkce classNames
├── atoms/
│   ├── Button.tsx + .css
│   ├── Heading.tsx + .css
│   ├── Text.tsx + .css
│   ├── Badge.tsx + .css
│   ├── Chip.tsx + .css
│   ├── IconWrapper.tsx + .css
│   ├── Container.tsx + .css
│   ├── Stack.tsx + .css
│   ├── Divider.tsx + .css
│   ├── CardSurface.tsx + .css
│   ├── Stepper.tsx + .css
│   └── Tooltip.tsx + .css
├── molecules/
│   ├── QuantityChips.tsx + .css
│   ├── Price.tsx + .css
│   └── FormField.tsx + .css
├── organisms/
│   ├── Accordion.tsx + .css
│   ├── Modal.tsx + .css
│   └── SectionCard.tsx + .css
├── docs/
│   ├── DocLayout.tsx + .css   # Sidebar + Outlet pro podstránky
│   ├── pages/
│   │   ├── DocHome.tsx
│   │   ├── FoundationsPage.tsx
│   │   ├── ButtonDoc.tsx
│   │   ├── HeadingDoc.tsx
│   │   ├── BadgeDoc.tsx
│   │   ├── ChipDoc.tsx
│   │   ├── StepperDoc.tsx
│   │   ├── TooltipDoc.tsx
│   │   ├── QuantityChipsDoc.tsx
│   │   ├── PriceDoc.tsx
│   │   ├── AccordionDoc.tsx
│   │   ├── ModalDoc.tsx
│   │   └── DocPage.css
│   └── ...
└── README.md (tento soubor)
```

**Pozn.:** Složky `templates` a plná náhrada stránek za DS komponenty zatím nejsou – stávající stránky (OrderPage, PackageCard, …) stále používají původní třídy z `index.css`. Design system je připraven k postupnému zapojení.

---

## 2. Klíčové extrahované komponenty (stručný diff)

- **Button**  
  Původ: `.btn-cta--primary`, `.save-offer-btn-primary`, `.save-offer-btn-cancel`, `.order-items-cart-browse-packages-btn`.  
  DS: `<Button variant="primary|secondary|tertiary|ghost-danger" />` – jediná komponenta, všechny varianty, žádné hex v kódu.

- **Card**  
  Původ: `.package-card`, `.package-card--favorite`, `.card`, stín a radius v index.css.  
  DS: `<CardSurface variant="default|highlight|selected" />` – plocha karty; obsah (název, cena, CTA) zůstává v page/organism (PackageCard zatím nerefaktorován).

- **Accordion**  
  Původ: `.premium-accordion`, `.order-accordion-section`, `.premium-section-header`, `.premium-section-content--open`.  
  DS: `<Accordion id title summary icon expanded defaultExpanded onToggle />` – složen z DS Heading, Text, IconWrapper.

- **Tooltip**  
  Původ: PriceInfoPopover (hover), DPH info (CSS :hover).  
  DS: `<Tooltip trigger={…} />` – první klik otevře, druhý / klik mimo zavře, klávesnice (Enter/Space), bez rozbití layoutu.

- **QuantityChips**  
  Původ: Opakovaný blok `.quantity-option-wrapper` + `.quantity-option` + `.quantity-badge` v PackageCard, PremiumServicesAccordion, BasicAdsSectionContent, OrderItemsCart.  
  DS: `<QuantityChips options selectedIndex onSelect compact />` – uvnitř používá atom `<Chip>`.

---

## 3. Refaktorované soubory

- **App.tsx** – přepnutí na React Router, route `/` (OrderPage) a `/design-system/*` (DocLayout + doc stránky).
- **main.tsx** – přidán import `./design-system/tokens.css`.
- **OrderPage.tsx** – přidán odkaz „Design systém“ (Link na `/design-system`).
- **index.css** – oprava barvy `.order-items-bottom-bar-count-badge` na `#09924C` (sjednocení s success).

**Pozn.:** OrderPage, PackageCard, PremiumServicesAccordion, OrderAccordionSection, BasicAdsSectionContent, OrderItemsCart, PriceInfoPopover zatím **nebyly** přepsány na komponenty z design-system. Jsou připraveny tokeny a komponenty; samotný refaktor stránek je další krok.

---

## 4. Route struktura `/design-system/...`

| Route | Obsah |
|-------|--------|
| `/design-system` | Úvod – přehled kategorií |
| `/design-system/foundations` | Foundations – barvy, spacing, radius, typo, z-index |
| `/design-system/atoms/button` | Button – varianty, props, snippet |
| `/design-system/atoms/heading` | Heading |
| `/design-system/atoms/badge` | Badge |
| `/design-system/atoms/chip` | Chip |
| `/design-system/atoms/stepper` | Stepper |
| `/design-system/atoms/tooltip` | Tooltip |
| `/design-system/molecules/quantity-chips` | QuantityChips |
| `/design-system/molecules/price` | Price |
| `/design-system/organisms/accordion` | Accordion |
| `/design-system/organisms/modal` | Modal |

Dokumentace je vykreslená v aplikaci (bez Storybooku), sidebar v DocLayout s odkazy na tyto route.

---

## 5. Checklist dokončených kroků

- [x] Audit současného UI (komponenty, třídy, barvy, spacing, duplicity)
- [x] Extrakce tokenů (barvy, typo, spacing, radius, shadow, z-index, states) → `tokens.css` + `tokens.ts`
- [x] Extrakce atomů: Button, Heading, Text, Badge, Chip, IconWrapper, Container, Stack, Divider, CardSurface, Stepper, Tooltip
- [x] Extrakce molekul: FormField, QuantityChips, Price
- [x] Extrakce organismů: Accordion, Modal, SectionCard
- [x] Vizuální dokumentace na route `/design-system` s sidebar a podstránkami (Foundations, Atoms, Molecules, Organisms)
- [x] Tooltip: první klik otevře, druhý / klik mimo zavře, přístup z klávesnice
- [ ] Templates (PricingTemplate, DefaultLayoutTemplate) – nepřidány
- [ ] Plný refaktor stránek (OrderPage, PackageCard, …) na výhradní použití DS komponent – připraveno, neprovedeno

Build zůstává funkční (`npm run build`).

---

## Rozšíření: kompletní organismy a composed examples

### Nové organismy

| Organismus | Popis |
|------------|--------|
| **PricingCard** | Kompletní karta: badge, nadpis, podnadpis, MNOŽSTVÍ, QuantityChips, discount note, CTA/Stepper, cena, info ikona → otevře PricingHintTable |
| **PricingHintTable** | Modal s tabulkou (Počet, Cena před slevou, Sleva, Cena po slevě), dynamické badge -10 % / -15 % / -20 %, footer text, focus trap, ESC/klik mimo zavře |
| **AccordionSection** | Plná sekce: header s ikonou, summary (X položek • Y vybráno), expand/collapse, řádky s cenou, QuantityChips, Stepper, CTA, info ikona |
| **BottomSummaryBar** | Fixní spodní lišta: ikona + count badge, title, subtitle, cena, tlačítko „Zobrazit detail“ |

### Nové route

| Route | Obsah |
|-------|--------|
| `/design-system/organisms/pricing-card` | Pricing Card – state gallery (default, selected, disabled, loading, favorite badge, dlouhý název), Behavior, When to use, Do/Don't |
| `/design-system/organisms/pricing-hint-table` | Hint Pricing Table – samostatná ukázka, Behavior, Props |
| `/design-system/organisms/accordion-section` | Accordion Section – collapsed/expanded, Behavior, Props |
| `/design-system/examples/pricing-layout` | Composed: více pricing karet, accordion sekce, bottom summary bar, jeden otevřený hint modal z info ikony |

### Doplněné stavy (state gallery)

- **Pricing Card:** default, selected (s množstvím), disabled, loading, s badge NEJOBLÍBENĚJŠÍ, edge case dlouhý název.
- **Button:** default, disabled pro primary/secondary; Behavior + State gallery sekce.
- **Chip / Accordion / Modal:** stavy popsány v příslušných doc stránkách.

### Composed příklady

- **/design-system/examples/pricing-layout** – více PricingCard vedle sebe, AccordionSection pod nimi, BottomSummaryBar při quantity &gt; 0; hint modal otevřený klikem na info u libovolné ceny.

### Diff upravených komponent

- **design-system/index.ts** – export PricingCard, PricingHintTable, AccordionSection, BottomSummaryBar.
- **design-system/utils/pricing.ts** – nový soubor: formatPriceCZK, getDiscountPercentForQuantity, getDiscountForQuantity (pro DS dokumentaci bez závislosti na src/utils).
- **design-system/organisms/** – nové: PricingCard.tsx+.css, PricingHintTable.tsx+.css, AccordionSection.tsx+.css, BottomSummaryBar.tsx+.css.
- **design-system/docs/DocLayout.tsx** – NAV rozšířen o accordion-section, pricing-card, pricing-hint-table, examples/pricing-layout.
- **design-system/docs/pages/** – nové: PricingCardDoc.tsx, PricingHintTableDoc.tsx, AccordionSectionDoc.tsx, PricingLayoutExample.tsx.
- **design-system/docs/pages/ButtonDoc.tsx** – přidána sekce Behavior, State gallery.
- **App.tsx** – nové route a importy doc stránek.
