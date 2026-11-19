# JT FlowOps · Ops dashboard demo

A clickable demo of an operations dashboard for a marketing and automation agency: task board,
clients, my tasks with team workload, calendar, packages, team, SOPs, checklists, approvals,
finance, a suggestion box and a helper bot (Flo).

Everything in it is sample data. No real clients, people or figures.

## How it works

- Plain HTML, CSS and JavaScript. No build step, no server, no database, no API keys.
- Each visitor's changes are kept in their own browser (localStorage). The **Reset** button in the
  top bar puts the sample data back.
- Dates are stored relative to today, so the demo always looks current.
- Flo answers from the workspace data with simple rules (what's due, overdue, waiting on approval,
  workload, a client by name, an SOP). It does not call an AI service, so it costs nothing to run.

## Files

| File | What it is |
|---|---|
| `index.html` | The page shell |
| `css/app.css` | All styling, light and dark themes |
| `js/data.js` | The sample data. Edit this to change clients, tasks, team, SOPs and numbers |
| `js/app.js` | The app: pages, board drag and drop, drawers, search, Flo |
| `render.yaml` | Render settings (free static site) |

## Try it on your computer

Double-click `index.html`. It opens in your browser and works offline.

## Put it on Render (free)

1. Create a new GitHub repository, for example `jtflowops-ops-demo`, and upload everything in this
   folder to it (GitHub's "uploading an existing file" page accepts the whole folder by drag and drop).
2. In Render: **New > Static Site**, pick the repository.
3. Settings: Build command `echo "No build required"`, Publish directory `.`
   (Render also reads these from `render.yaml`).
4. Create. The site appears at `https://<name>.onrender.com` in about a minute.

Render's free static sites do not sleep, so the demo loads instantly for anyone you send it to.
