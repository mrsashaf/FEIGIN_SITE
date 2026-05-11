# FEIGIN SITE — Services & Access System

## Purpose

This file documents the external services used by the FEIGIN / ABERRATION website and explains how the Level 2 access system works.

The site is not just a portfolio. It is a recruitment / retention system for the ABERRATION universe.

Main flow:

Visitor enters email  
↓  
Email is saved in Supabase  
↓  
PRISM access email is sent through Resend  
↓  
Visitor clicks ACTIVATE ACCESS  
↓  
Website unlocks Level 2 content in browser localStorage  

---

# 1. Website Hosting

## Service

Vercel

## Project

feigin-site

## Production domain

https://feiginentertainment.com

## Purpose

Vercel hosts the website and runs the backend API route:

/api/register

This endpoint receives emails from the Level 2 form.

---

# 2. Database

## Service

Supabase

## Project URL

https://xgycgovhzezeqwnfrojf.supabase.co

## Table

subscribers

## Columns

- id
- created_at
- email
- level
- confirmed

## Purpose

Supabase stores people who submit their email on the site.

This is the main fan / recruit database.

Resend is only for sending emails.
Supabase is the real subscriber list.

---

# 3. Email Sending

## Service

Resend

## Domain

feiginentertainment.com

## Domain status

Verified

## Sender

PRISM OVERSIGHT AUTHORITY <access@feiginentertainment.com>

## Purpose

Resend sends the PRISM access email after someone submits the Level 2 form.

The email includes a button linking to:

https://feiginentertainment.com/clearance.html?level=2

---

# 4. DNS

## Service

Namecheap

## Domain

feiginentertainment.com

## Purpose

Namecheap manages DNS records for the domain.

DNS records are used for:

- website domain connection
- email verification
- SPF
- DKIM
- DMARC
- MX records for Resend

Important: do not delete DNS records unless you know what they do.

---

# 5. Vercel Environment Variables

The following variables are required in Vercel:

## Supabase

SUPABASE_URL  
SUPABASE_SERVICE_KEY  
SUPABASE_SERVICE_ROLE_KEY

## Resend

RESEND_API_KEY  
RESEND_FROM

## Current RESEND_FROM value

PRISM OVERSIGHT AUTHORITY <access@feiginentertainment.com>

## Important

Never put secret keys directly inside frontend JavaScript.

Secret keys must only exist in:

- Vercel Environment Variables
- local .env.local file for local testing

Do not commit .env.local to GitHub.

---

# 6. Level 2 Access Flow

## User flow

1. User visits the site.
2. User finds the Level 2 / restricted access form.
3. User enters email.
4. Frontend sends POST request to:

/api/register

5. Backend saves email to Supabase table:

subscribers

6. Backend sends PRISM email through Resend.
7. User receives email.
8. User clicks:

ACTIVATE ACCESS

9. User lands on:

/clearance.html?level=2

10. clearance.html saves this in the browser:

localStorage.setItem("aberration_clearance_level", "2")

11. Website checks:

localStorage.getItem("aberration_clearance_level") === "2"

12. If true, Level 2 content becomes unlocked.

---

# 7. What Level 2 Unlocks

Currently Level 2 unlocks:

- restricted gallery files
- extra PRISM / ABERRATION archive materials
- Comfort Zone / Jerry page access
- future case drops

This may expand later.

---

# 8. Important Behavior

Access is stored in browser localStorage.

This means:

- same browser: access stays open
- page refresh: access stays open
- user returns later: access stays open
- new device: user must request access again
- cleared browser data: access is lost

If user enters the same email again, the system should not fail. It should resend the access email.

---

# 9. Debugging Checklist

## If form says TRANSMISSION FAILED

Check Vercel Logs:

Vercel → feigin-site → Logs → /api/register

Common problems:

- missing SUPABASE_URL
- missing SUPABASE_SERVICE_KEY
- missing RESEND_API_KEY
- wrong RESEND_FROM
- Resend domain not verified
- Supabase table name mismatch
- package/dependency issue

## If email does not arrive

Check:

1. Resend → Emails
2. Gmail Spam folder
3. Vercel Logs
4. RESEND_FROM value
5. Resend domain status

## If email goes to spam

Check:

- domain is verified in Resend
- From address uses @feiginentertainment.com
- no broken images in email
- email is not too image-heavy
- email has plain text
- click "Report not spam" during testing

---

# 10. Current Email Notes

The email originally used:

PRISM <onboarding@resend.dev>

This was temporary and caused spam issues.

The correct sender is now:

PRISM OVERSIGHT AUTHORITY <access@feiginentertainment.com>

If emails start coming from onboarding@resend.dev again, check:

- Vercel RESEND_FROM
- api/register.js
- fallback sender logic

---

# 11. Files Related to This System

Expected files:

api/register.js  
clearance.html  
index.html  
assets/email/  
package.json  
package-lock.json  

Optional future file:

admin-subscribers.html

---

# 12. Future Improvements

Possible next steps:

- admin page for viewing subscribers
- unsubscribe link
- better email template
- email sequence for future lore drops
- Level 3 access
- user-specific tokens instead of simple localStorage
- analytics tracking for access activation
- separate subscriber tags by source
- Steam wishlist tracking link
- private archive page

---

# 13. Do Not Forget

The real business asset is not just the Steam wishlist.

The real asset is:

- email list
- repeat visitors
- lore engagement
- Level 2 access
- fan conversion

The website works as a recruitment system for the ABERRATION universe.
