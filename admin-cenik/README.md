# Admin Cenik V3

React + Vite aplikace pro objednávku a cenovou nabídku.

## Nasazení – web vždy dostupný (bez localhost / ngrok)

Aby byl web dostupný **pořád**, i když nemáš zapnutý počítač, nasaď ho na Vercel (zdarma):

1. Účet: [vercel.com](https://vercel.com) → Sign up (např. přes GitHub).
2. **Import projektu:** Add New → Project → Import z tohoto Git repa.
3. **Root Directory:** nastav na `admin-cenik` (tlačítko Edit vedle názvu projektu).
4. **Deploy** – Vercel sestaví Vite a nasadí. Dostaneš stálou URL typu `https://admin-cenik-xxx.vercel.app`.

Po každém push do repozitáře se nasazení automaticky znovu spustí. Odkaz zůstane stejný.

- **Lokální vývoj / ngrok:** `npm run dev` + `npm run tunnel` – pro testování na ngrok, když máš zapnutý počítač.
- **Stálý provoz:** deploy na Vercel – funguje i s vypnutým localhost.

## Design System

Stránka **Design System** (`/designsystem`) obsahuje přehled všech UI komponent bez možnosti kopírování kódu:

| Sekce | Komponenty / prvky |
|-------|---------------------|
| Typografie | Heading H2, podtitul, card subtitle, MNOŽSTVÍ label |
| Tlačítka | Outline (Darovat zdarma, …), Secondary (Uložit nabídku), Primary (Vytvořit objednávku) |
| Komponenty | Badge (NEJOBLÍBENĚJŠÍ, Přidáno, -15 %), varianty množství (3x/5x/10x), stepper, formulář |
| Accordion | `OrderAccordionSection` – záhlaví sekce a rozbalovací obsah |
| Karta balíčku | `PackageCard` – TOP balíčky (název, cena, varianty, CTA) |
| Popover ceníku | `PriceInfoPopover` – ikona ℹ️ a tabulka cen + hint |
| Texty a štítky | „Přidejte 3+ ks pro slevu“, Sleva 15 %, platnost |
| Tabulka položek | Ukázka `OrderItemsCart` – hlavičky a řádek (Položka, Sleva, Platnost, Množství, Ceny, Akce) |

Komponenty: `App`, `OrderPage`, `OrderAccordionSection`, `TopPackagesSection`, `PackageCard`, `BasicAdsSectionContent`, `PremiumServicesAccordion`, `OrderItemsCart`, `PriceInfoPopover`, `CartContext`, `DesignSystemPage`.

---

## React + Vite (šablona)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
