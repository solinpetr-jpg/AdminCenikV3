# Návod: Nasadit Admin Cenik na Vercel (krok za krokem)

Až to uděláš, bude mít aplikace vlastní odkaz (např. `https://admin-cenik-xxx.vercel.app`) a poběží 24/7.

---

## 1. Repozitář musí být na GitHubu

- Pokud tento projekt ještě **není** na GitHubu:
  - Na [github.com](https://github.com) založ nový repozitář (např. `AdminCenikV3`).
  - V terminálu v adresáři projektu (tam, kde je složka `admin-cenik`) spusť:
    - `git remote add origin https://github.com/TVEJMENO/TVUJ-REPO.git` (nahraď TVEJMENO a TVUJ-REPO).
    - `git push -u origin main` (nebo `master`, podle toho, jakou větev máš).
- Pokud už na GitHubu je, nic nedělej a jdi na krok 2.

---

## 2. Účet na Vercel

1. Otevři v prohlížeči: **https://vercel.com**
2. Klikni na **„Sign Up“** (Registrovat).
3. Zvol **„Continue with GitHub“** a přihlas se přes GitHub (nejjednodušší).
4. Až Vercel požádá o přístup k repozitářům, povol přístup (alespoň k tomu repu, kde je Admin Cenik).

---

## 3. Nový projekt z GitHubu

1. Na Vercel po přihlášení klikni na **„Add New…“** (nebo **„New Project“**).
2. Uvidíš seznam repozitářů z GitHubu. Najdi **AdminCenikV3** (nebo jak se tvůj repo jmenuje) a u něj klikni **„Import“**.

---

## 4. Důležité: Root Directory

1. Po importu uvidíš nastavení projektu.
2. Najdi řádek **„Root Directory“** – vedle něj je **„Edit“**.
3. Klikni na **„Edit“**.
4. Zadej: **`admin-cenik`** (jen toto slovo, bez lomítek).
5. Potvrď (Enter nebo klik mimo). Mělo by se zobrazit, že root je `admin-cenik`.

*(Kdyby to tam nebylo, znamená to, že Vercel bere celý repo – u nás je ale aplikace ve složce `admin-cenik`, takže to musíš nastavit.)*

---

## 5. Build nastavení (můžeš nechat jak je)

- **Framework Preset:** mělo by být automaticky **Vite** (nebo „Other“ – nevadí).
- **Build Command:** `npm run build` (nebo prázdné – Vite to má v `package.json`).
- **Output Directory:** `dist` (nebo prázdné – Vite to má výchozí).
- **Install Command:** `npm install` (nebo prázdné).

Pokud jsou pole prázdná a Framework je Vite, nech to tak a jdi dál.

---

## 6. Deploy

1. Dole klikni na **„Deploy“**.
2. Počkej cca 1–2 minuty. Uvidíš log z buildu.
3. Až doběhne, uvidíš zelenou hlášku a odkaz typu:
   - **https://admin-cenik-xxxxx.vercel.app**

---

## 7. Hotovo

- Klikni na ten odkaz – otevře se tvoje aplikace.
- Tento odkaz můžeš posílat dál a bude fungovat 24/7 (i když máš vypnutý počítač).
- Při dalším **push do GitHubu** se Vercel sám znovu nasadí – odkaz zůstane stejný.

---

## 8. Přihlášení (login + heslo) před vstupem (volitelně)

Před načtením projektu se zobrazí přihlašovací stránka s polem pro **přihlašovací jméno** a **heslo**. Bez správných údajů se do aplikace nedostaneš.

1. Na Vercelu otevři projekt → **Settings** → **Environment Variables**.
2. Přidej dvě proměnné:
   - **Name:** `VITE_ACCESS_LOGIN` → **Value:** např. `admin` (přihlašovací jméno)
   - **Name:** `VITE_ACCESS_PASSWORD` → **Value:** tvé heslo
   - **Environment:** zaškrtni Production (a případně Preview).
3. Ulož a v **Deployments** spusť **Redeploy**, aby se proměnné zahrnuly do buildu.

Po nasazení se na https://admin-cenik-v3.vercel.app/ nejdřív zobrazí stránka „Pro vstup se přihlaste“ s poli **Přihlašovací jméno** a **Heslo**. Po zadání správných údajů se načte aplikace; přihlášení platí v rámci session (do zavření záložky).

- **Jen heslo:** Pokud nastavíš jen `VITE_ACCESS_PASSWORD` (bez `VITE_ACCESS_LOGIN`), kontroluje se pouze heslo; přihlašovací jméno může uživatel nechat prázdné nebo cokoli.
- **Žádná brána:** Pokud `VITE_ACCESS_PASSWORD` nenastavíš, přihlašovací stránka se nezobrazí (vhodné pro lokální vývoj).
- Toto je klientská ochrana (proti náhodnému prohlížení). Pro silnější zabezpečení je potřeba serverové přihlášení nebo Vercel Password Protection (placený plán).

---

## Když něco nevyjde

- **Build failed:** Zkontroluj, že **Root Directory** je opravdu `admin-cenik` (bez překlepů).
- **Stránka je bílá / 404:** V projektu už je `vercel.json` s rewrites – po úspěšném deployi by to mělo fungovat. Zkus tvůj odkaz znovu (bez `/` na konci, nebo s `/`).
- **Nemáš repo na GitHubu:** Nejdřív ho nahraj (krok 1), pak teprve import na Vercel.

Kdybys chtěl později vlastní doménu (např. `cenik.mojefirma.cz`), v projektu na Vercel jde v záložce **Settings → Domains** přidat doménu a nastavit DNS u poskytovatele domény.
