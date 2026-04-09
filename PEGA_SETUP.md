# Pega Constellation Setup for Test Automation

This document explains how to configure a **Pega Constellation** application so it can be reliably automated using **Playwright**.  
It also includes the recommended design for **authentication & session reuse**.

---

## ✅ 1. Use the Correct Pega URL

Automation should always target the **end‑user Constellation portal**, not Dev Studio.

Examples:

- Community Edition --> https://.pega.net/prweb
- Blueprint / MediaCo+ --> https:///prweb/app/


✅ Make sure the UI shows the **Constellation React‑based experience**.

---

## ✅ 2. Create a Dedicated Test User

In Dev Studio or Admin Studio:

- Username: `autotest_user`
- Stable access group (CSR / User role)
- No password expiration (optional)
- Full access to flows you will automate

✅ One user → predictable tests  
✅ No dependencies on personal accounts

---

## ✅ 3. Add `data-testid` Attributes (Mandatory)

Constellation DOM is dynamic. To create stable selectors, add explicit attributes.

### How to add:

In **App Studio → View / Section → Advanced → Attributes**:


data-testid = create-case-btn
### Add test IDs to:

- Create button
- Submit / Save / Cancel buttons
- Assignment action buttons
- Case header / Case ID label
- Step containers
- Navigation items

### Naming convention:

✅ Good:

create-case-btn
submit-assignment-btn
case-id-label
assignment-container

❌ Avoid:

btn1
fieldXYZ
test123

**Treat `data-testid` as a public API for tests.**

---

## ✅ 4. General UI Testability Recommendations

- Prefer **one primary CTA** per screen  
- Avoid sudden DOM rebuilds (e.g., multiple conditional wrappers)  
- Keep button texts stable  
- Avoid dynamic IDs or runtime-generated labels  
- Ensure assignment transitions are deterministic  

---

## ✅ 5. Authentication & Session Reuse Strategy

To avoid logging in before every test, Playwright should:

1. Login **once** via a setup script  
2. Save session state to `storage/auth.json`  
3. Reuse session in all tests  

This reduces:
- Repeated login failures  
- Flakiness  
- Execution time  

---

## ✅ 6. One‑Time Login Script

Create:


tests/auth/setup.auth.ts

Contents:

```ts
import { test } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

test('Authenticate into Pega and save storage state', async ({ page }) => {
  // 1. Navigate to login screen
  await page.goto(process.env.PEGA_BASE_URL!);

  // 2. Fill credentials
  await page.getByLabel('Username').fill(process.env.PEGA_USER!);
  await page.getByLabel('Password').fill(process.env.PEGA_PASS!);

  // 3. Submit login
  await page.getByRole('button', { name: /log in/i }).click();

  // 4. Wait for Constellation home/app shell
  await page.waitForURL('**/app/**', { timeout: 20000 });

  // 5. Save session
  await page.context().storageState({ path: 'storage/auth.json' });

  console.log('✅ Auth session generated at storage/auth.json');
});


✅ 7. Configure Playwright to Use Saved Session
In playwright.config.ts, add:
TypeScriptuse: {  storageState: 'storage/auth.json'}Show more lines
Now all tests start already logged in.

✅ 8. Environment Variables
Create a .env file:
PEGA_BASE_URL=https://your-pega-app-url
PEGA_USER=autotest_user
PEGA_PASS=yourpassword

✅ Do NOT commit .env
✅ Add it to .gitignore

✅ 9. Multi‑User / Multi‑Role Support
You can create multiple saved sessions:
storage/
 ├─ admin.json
 ├─ csr.json
 └─ manager.json

In test config:
TypeScriptprojects: [  {    name: 'CSR',    use: { storageState: 'storage/csr.json' }  },  {    name: 'Admin',    use: { storageState: 'storage/admin.json' }  }]Show more lines

✅ 10. Checklist Before Writing Tests
✅ You can log in manually
✅ data-testid is added for all important elements
✅ Dedicated automation user exists
✅ Login and session reuse work
✅ No flaky components in the tested flow
✅ storage/auth.json is created

This document ensures Pega is properly configured for stable and maintainable Playwright automation.

---

