# 1. Přihlášení na GitHub a push (tvůj osobní účet)

Repozitář **origin** už míří na tvůj osobní GitHub: `solinpetr-jpg/AdminCenikV3`.

## Krok 1: Přihlášení na GitHub v prohlížeči

1. Otevři **https://github.com**
2. Klikni **Sign in** a přihlas se účtem **solinpetr-jpg** (tvůj osobní účet).

*(Pro push z počítače můžeš používat buď HTTPS + heslo/token, nebo SSH – viz krok 3.)*

---

## Krok 2: Commit změn v projektu

V terminálu (nebo v Cursoru otevři terminál) v adresáři projektu:

```bash
cd "/Users/petr/Documents/GitHub/Cursor Repos/Admin Cenik 3/AdminCenikV3"

# Přidat všechny změny (včetně nových souborů pro Vercel)
git add -A

# Vytvořit commit
git commit -m "Přidán Vercel deploy a návod"
```

---

## Krok 3: Push na tvůj osobní GitHub (origin)

Aktuálně jsi na větvi **UI-design-+-prototyp-petr**. Pošleme ji na **origin** (tvůj repo):

```bash
git push -u origin UI-design-+-prototyp-petr
```

- Pokud Git vyžaduje přihlášení:
  - **HTTPS:** zadáš své GitHub uživatelské jméno a **Personal Access Token** (ne heslo). Token vytvoříš na GitHubu: **Settings → Developer settings → Personal access tokens → Generate new token** (scope např. `repo`).
  - **SSH:** pokud máš nastavený SSH klíč a remote je jako `git@github.com:...`, přihlášení nebude chtít.

Po úspěšném pushu uvidíš na **https://github.com/solinpetr-jpg/AdminCenikV3** větev **UI-design-+-prototyp-petr** (a v ní i složku `admin-cenik` a nové soubory).

*(Kdybys chtěl pushovat přímo na `main`, přepni se na `main`, slouč změny a pushni: `git checkout main` → `git merge UI-design-+-prototyp-petr` → `git push -u origin main`.)*

---

# 2. Připojení Vercel k tomuto GitHub repozitáři

Až je kód na tvém osobním GitHubu:

1. Jdi na **https://vercel.com** a přihlas se (ideálně **Continue with GitHub** – vyber účet **solinpetr-jpg**).
2. Klikni **Add New…** → **Project**.
3. V seznamu repozitářů najdi **solinpetr-jpg/AdminCenikV3** a u něj **Import**.
4. U projektu nastav **Root Directory** na **`admin-cenik`** (Edit → zadej `admin-cenik`).
5. Klikni **Deploy**.

Vercel pak nasadí z toho, co je na GitHubu (větve můžeš zvolit v nastavení – např. **UI-design-+-prototyp-petr** nebo **main**). Odkaz typu `https://admin-cenik-xxx.vercel.app` bude 24/7.

---

**Shrnutí pořadí:** Přihlásit se na GitHub → commit + push na **origin** (solinpetr-jpg/AdminCenikV3) → přihlásit se na Vercel přes GitHub → Import projektu z tohoto repa → Root Directory `admin-cenik` → Deploy.
