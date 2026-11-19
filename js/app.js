/* JT FlowOps demo dashboard. Plain JS, no build step, no backend.
   Changes are kept in this browser (localStorage) so visitors can click around;
   "Reset" puts the sample data back. */
(function () {
  'use strict';

  // ---------- icons ----------
  const P = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    board: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 7v7M12 7v4M16 7v9"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    tasks: '<path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    package: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 12 0v1"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    checks: '<path d="m3 17 2 2 4-4M3 7l2 2 4-4M13 6h8M13 12h8M13 18h8"/>',
    approve: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
    dollar: '<path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    panel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-14.07 1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    hourglass: '<path d="M5 22h14M5 2h14M17 22v-4.17a2 2 0 0 0-.59-1.42L12 12l-4.41 4.41A2 2 0 0 0 7 17.83V22M7 2v4.17a2 2 0 0 0 .59 1.42L12 12l4.41-4.41A2 2 0 0 0 17 6.17V2"/>',
    alarm: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2M5 3 2 6M22 6l-3-3"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    undo: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    ext: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    pencil: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>',
    trash: '<path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    circleCheck: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  };
  const ic = (n, cls) => `<svg class="i ${cls || ''}" viewBox="0 0 24 24" aria-hidden="true">${P[n] || ''}</svg>`;
  const BOT_FACE = `<svg class="bot-face" viewBox="0 0 64 64" aria-hidden="true"><defs><linearGradient id="bg" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#f4f9ff"/><stop offset="1" stop-color="#b9d3ec"/></linearGradient></defs><rect x="29" y="4" width="6" height="8" rx="3" fill="#7fa9cf"/><circle cx="32" cy="5" r="4" fill="#00e5ff"/><rect x="8" y="12" width="48" height="40" rx="18" fill="url(#bg)"/><rect x="14" y="21" width="36" height="20" rx="10" fill="#0b2240"/><ellipse cx="25" cy="31" rx="5" ry="6" fill="#00e5ff"/><ellipse cx="39" cy="31" rx="5" ry="6" fill="#00e5ff"/><rect x="3" y="26" width="6" height="12" rx="3" fill="#7fa9cf"/><rect x="55" y="26" width="6" height="12" rx="3" fill="#7fa9cf"/><path d="M26 46q6 4 12 0" stroke="#0b3fc4" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`;

  // ---------- state ----------
  const KEY = 'jtflowops-demo-v1';
  const pad = (n) => String(n).padStart(2, '0');
  const isoOf = (dt) => `${dt.getFullYear()}-${pad(dt.getMonth() + 1)}-${pad(dt.getDate())}`;
  const todayISO = () => isoOf(new Date());
  const parse = (s) => new Date(s + 'T12:00:00');
  const addDays = (s, n) => { const x = parse(s); x.setDate(x.getDate() + n); return isoOf(x); };
  const diffDays = (a, b) => Math.round((parse(b) - parse(a)) / 86400000);

  function shiftAll(s, n) {
    if (!n) return;
    s.tasks.forEach((t) => { if (t.due) t.due = addDays(t.due, n); if (t.approval) t.approval.submitted = addDays(t.approval.submitted, n); });
    s.events.forEach((e) => { e.date = addDays(e.date, n); });
    s.clients.forEach((c) => { if (c.nextDate) c.nextDate = addDays(c.nextDate, n); });
    s.suggestions.forEach((g) => { g.date = addDays(g.date, n); });
  }
  function load() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { s = null; }
    if (!s || s.version !== 1) {
      s = buildSeed();
      const off = diffDays(s.seededOn, todayISO());
      shiftAll(s, off);
      s.seededOn = todayISO();
    } else if (s.seededOn !== todayISO()) {
      // Keep the demo current: slide every date forward by the days since it was last opened.
      shiftAll(s, diffDays(s.seededOn, todayISO()));
      s.seededOn = todayISO();
    }
    return s;
  }
  let S = load();
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* private mode: changes last until refresh */ } };
  save();

  const ui = {
    board: { q: '', client: '', assignee: '', priority: '', waiting: '', view: 'board' },
    clients: { status: 'All', view: 'grid' },
    cal: { cursor: todayISO().slice(0, 7) + '-01', view: 'month' },
    team: 'people', checklists: 'progress', approvals: 'mine', sopQ: '',
  };

  // ---------- helpers ----------
  const $ = (sel, root) => (root || document).querySelector(sel);
  const esc = (v) => String(v == null ? '' : v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const uid = (p) => p + Math.random().toString(36).slice(2, 9);
  const me = () => S.team.find((u) => u.me) || S.team[0];
  const user = (id) => S.team.find((u) => u.id === id);
  const client = (id) => S.clients.find((c) => c.id === id);
  const pkg = (id) => S.packages.find((p) => p.id === id);
  const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const MONTHS_FULL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const short = (s) => { const d = parse(s); return `${MONTHS[d.getMonth()]} ${d.getDate()}`; };
  const rel = (s) => {
    if (!s) return '';
    const n = diffDays(todayISO(), s);
    if (n === 0) return 'Today';
    if (n === -1) return 'Yesterday';
    if (n === 1) return 'Tomorrow';
    return short(s);
  };
  const dueCls = (s) => { if (!s) return ''; const n = diffDays(todayISO(), s); return n < 0 ? 'late' : n === 0 ? 'today' : ''; };
  const money = (n) => '$' + Math.round(n).toLocaleString('en-US');

  const STATUSES = [
    { k: 'todo', label: 'To do' }, { k: 'progress', label: 'In progress' }, { k: 'waiting', label: 'Waiting' },
    { k: 'approval', label: 'For approval' }, { k: 'revision', label: 'Revision' }, { k: 'done', label: 'Done' },
  ];
  const statusVar = (k) => `var(--status-${k})`;
  const prioVar = (p) => `var(--prio-${p || 'medium'})`;
  const open = () => S.tasks.filter((t) => t.status !== 'done');
  const isWaiting = (t) => t.status !== 'done' && (t.status === 'waiting' || !!t.waitingOn);

  const avatar = (id, lg) => {
    const u = user(id);
    if (!u) return '';
    return `<span class="avatar${lg ? ' lg' : ''}" style="background:${u.color}" title="${esc(u.name)}">${esc(u.initials)}</span>`;
  };
  const tags = (t) => {
    const c = client(t.clientId);
    let h = c ? `<span class="tag">${esc(c.name)}</span>` : '';
    if (t.waitingOn && t.status !== 'done') h += `<span class="tag wait">${ic('hourglass')}${esc(t.waitingOn)}</span>`;
    return h;
  };
  const trow = (t) => `
    <div class="trow" data-act="task" data-id="${t.id}">
      <span class="dot" style="background:${statusVar(t.status)}"></span>
      <div class="t"><div class="title">${esc(t.title)}</div><div class="meta">${tags(t)}</div></div>
      <div class="due ${dueCls(t.due)}"><span class="dot" style="background:${prioVar(t.priority)}"></span>${t.due ? rel(t.due) : ''}</div>
      ${avatar(t.assigneeId)}
    </div>`;

  // ---------- views ----------
  const views = {};

  views.overview = () => {
    const t0 = todayISO();
    const op = open();
    const waiting = op.filter(isWaiting);
    const week = op.filter((t) => t.due && diffDays(t0, t.due) >= 0 && diffDays(t0, t.due) <= 6);
    const overdue = op.filter((t) => t.due && diffDays(t0, t.due) < 0);
    const active = S.clients.filter((c) => c.status === 'Active');
    const appr = S.tasks.filter((t) => t.status === 'approval');
    const stat = (icon, label, n, color, href) => `<div class="card stat" data-act="go" data-href="${href}"><div class="lbl">${ic(icon)}${label}</div><div class="num" style="color:${color}">${n}</div></div>`;

    const groups = {};
    waiting.forEach((t) => { const k = t.waitingOn || 'Someone'; (groups[k] = groups[k] || []).push(t); });
    const gkeys = Object.keys(groups).sort((a, b) => groups[b].length - groups[a].length);
    const due7 = op.filter((t) => t.due && diffDays(t0, t.due) <= 7).sort((a, b) => a.due.localeCompare(b.due)).slice(0, 12);
    const evs = S.events.filter((e) => e.date >= t0).sort((a, b) => a.date.localeCompare(b.date)).slice(0, 5);

    return `
    <div class="page-head"><div><h1>Overview</h1><p>What's moving, what's stuck, and what's next.</p></div></div>
    <div class="stats">
      ${stat('list', 'Open tasks', op.length, 'var(--foreground)', '#/board')}
      ${stat('hourglass', 'Waiting on someone', waiting.length, 'var(--status-waiting)', '#/board?waiting=yes')}
      ${stat('calendar', 'Due this week', week.length, 'var(--status-progress)', '#/my-tasks')}
      ${stat('alarm', 'Overdue', overdue.length, 'var(--destructive)', '#/my-tasks')}
      ${stat('users', 'Active clients', active.length, 'var(--success)', '#/clients')}
      ${stat('circleCheck', 'For approval', appr.length, 'var(--status-approval)', '#/approvals')}
    </div>
    <div class="cols2">
      <div class="card"><div class="card-h"><h3>Waiting on</h3><a href="#/board?waiting=yes">Board →</a></div>
        ${gkeys.length ? gkeys.map((k) => `<div class="group-h">${ic('hourglass')}${esc(k)} <span>· ${groups[k].length}</span></div>${groups[k].map(trow).join('')}`).join('') : '<div class="empty">Nothing is waiting on anyone.</div>'}
        <div style="height:8px"></div>
      </div>
      <div class="stack">
        <div class="card"><div class="card-h"><h3>Due in the next 7 days</h3><a href="#/board">Board →</a></div>
          ${due7.length ? due7.map(trow).join('') : '<div class="empty">Nothing due this week.</div>'}<div style="height:8px"></div></div>
        <div class="card"><div class="card-h"><h3>Upcoming events</h3><a href="#/calendar">Calendar →</a></div>
          <div style="padding-bottom:6px">${evs.map((e) => `<div class="erow"><span class="d">${rel(e.date)}</span><div><b>${esc(e.title)}</b><small>${e.type}${e.time ? ' · ' + esc(e.time) : ''}</small></div><small class="muted">${esc((client(e.clientId) || {}).name || '')}</small></div>`).join('') || '<div class="empty">No events coming up.</div>'}</div>
        </div>
      </div>
    </div>`;
  };

  function boardTasks() {
    const f = ui.board; const q = f.q.toLowerCase();
    return S.tasks.filter((t) =>
      (!q || t.title.toLowerCase().includes(q) || (client(t.clientId) || {}).name?.toLowerCase().includes(q)) &&
      (!f.client || t.clientId === f.client) && (!f.assignee || t.assigneeId === f.assignee) &&
      (!f.priority || t.priority === f.priority) &&
      (!f.waiting || (f.waiting === 'yes' ? isWaiting(t) : !isWaiting(t))));
  }
  const opt = (v, label, cur) => `<option value="${esc(v)}" ${v === cur ? 'selected' : ''}>${esc(label)}</option>`;
  views.board = () => {
    const f = ui.board; const list = boardTasks();
    const filters = `
      <div class="filters">
        <input class="input search" placeholder="Search tasks..." value="${esc(f.q)}" data-filter="q">
        <select class="input" data-filter="client">${opt('', 'Client: any', f.client)}${S.clients.map((c) => opt(c.id, c.name, f.client)).join('')}</select>
        <select class="input" data-filter="assignee">${opt('', 'Assignee: any', f.assignee)}${S.team.map((u) => opt(u.id, u.name, f.assignee)).join('')}</select>
        <select class="input" data-filter="priority">${opt('', 'Priority: any', f.priority)}${['high', 'medium', 'low'].map((p) => opt(p, p[0].toUpperCase() + p.slice(1), f.priority)).join('')}</select>
        <select class="input" data-filter="waiting">${opt('', 'Waiting on: any', f.waiting)}${opt('yes', 'Waiting on someone', f.waiting)}${opt('no', 'Not waiting', f.waiting)}</select>
      </div>`;
    let body;
    if (f.view === 'table') {
      const rows = list.slice().sort((a, b) => (a.due || '9').localeCompare(b.due || '9'));
      body = `<div class="card" style="overflow-x:auto"><table class="tbl"><thead><tr><th>Task</th><th class="hide-m">Client</th><th>Status</th><th class="hide-m">Priority</th><th>Due</th><th class="hide-m">Assignee</th></tr></thead><tbody>
        ${rows.map((t) => `<tr data-act="task" data-id="${t.id}"><td>${esc(t.title)}</td><td class="hide-m">${esc((client(t.clientId) || {}).name || '')}</td>
        <td><span class="dot" style="background:${statusVar(t.status)}"></span> ${STATUSES.find((s) => s.k === t.status).label}</td>
        <td class="hide-m">${t.priority}</td><td class="due ${t.status === 'done' ? '' : dueCls(t.due)}">${rel(t.due)}</td><td class="hide-m">${avatar(t.assigneeId)}</td></tr>`).join('')}
        </tbody></table>${rows.length ? '' : '<div class="empty">No tasks match these filters.</div>'}</div>`;
    } else {
      body = `<div class="kanban">${STATUSES.map((s) => {
        let col = list.filter((t) => t.status === s.k);
        if (s.k === 'done') col = col.slice().sort((a, b) => (b.due || '').localeCompare(a.due || ''));
        else col = col.slice().sort((a, b) => (a.due || '9').localeCompare(b.due || '9'));
        return `<div class="col" data-col="${s.k}"><div class="col-h"><span class="dot" style="background:${statusVar(s.k)}"></span><span>${s.label}</span><span>${col.length}</span></div>
          ${col.map((t) => {
            const late = t.status !== 'done' && dueCls(t.due) === 'late';
            return `<div class="kcard ${t.status === 'done' ? 'done' : ''} ${late ? 'late' : ''}" draggable="true" data-act="task" data-id="${t.id}">
              <div class="title">${esc(t.title)}</div><div class="meta">${tags(t)}</div>
              <div class="foot"><span class="dot" style="background:${prioVar(t.priority)}"></span><span class="due ${t.status === 'done' ? '' : dueCls(t.due)}">${rel(t.due)}</span>${avatar(t.assigneeId)}</div></div>`;
          }).join('') || '<div class="empty" style="padding:14px 4px">No tasks</div>'}</div>`;
      }).join('')}</div>`;
    }
    return `<div class="page-head"><div><h1>Board</h1><p>${open().length} open tasks · drag a card to change its status</p></div>
      <div class="actions"><div class="seg"><button class="${f.view === 'board' ? 'on' : ''}" data-act="boardview" data-v="board" title="Board">${ic('board')}</button><button class="${f.view === 'table' ? 'on' : ''}" data-act="boardview" data-v="table" title="Table">${ic('list')}</button></div>
      <button class="btn gold" data-act="newtask">${ic('plus')}New task</button></div></div>${filters}${body}`;
  };

  const CLIENT_STATUSES = ['Active', 'Onboarding', 'Prospect', 'Paused', 'Goodwill', 'Internal'];
  views.clients = () => {
    const f = ui.clients;
    const list = S.clients.filter((c) => f.status === 'All' || c.status === f.status);
    const cnt = (s) => S.clients.filter((c) => c.status === s).length;
    const openFor = (c) => open().filter((t) => t.clientId === c.id);
    const lead = (c) => { const m = {}; openFor(c).forEach((t) => { m[t.assigneeId] = (m[t.assigneeId] || 0) + 1; }); return Object.keys(m).sort((a, b) => m[b] - m[a])[0]; };
    const grid = `<div class="cgrid">${list.map((c) => `
      <div class="card ccard" data-act="client" data-id="${c.id}">
        <div class="top"><b>${esc(c.name)}</b><span class="badge ${c.status}">${c.status}</span></div>
        <div class="sub">${esc(c.contact)}${c.location ? ` <span class="muted">· ${ic('pin')} ${esc(c.location)}</span>` : ''}</div>
        <div class="pk">${esc((pkg(c.packageId) || {}).name || 'Internal work')}</div>
        ${c.next ? `<div class="nxt">${ic('calendar')}<span>${esc(c.next)} · ${rel(c.nextDate)}</span></div>` : ''}
        <div class="foot">${ic('folder')}${lead(c) ? avatar(lead(c)) : ''}<span>${openFor(c).length} open task${openFor(c).length === 1 ? '' : 's'}</span></div>
      </div>`).join('')}</div>`;
    const table = `<div class="card" style="overflow-x:auto"><table class="tbl"><thead><tr><th>Client</th><th>Status</th><th class="hide-m">Package</th><th class="hide-m">Open tasks</th><th class="hide-m">Next</th></tr></thead><tbody>
      ${list.map((c) => `<tr data-act="client" data-id="${c.id}"><td class="who">${esc(c.name)}<small>${esc(c.contact)}</small></td><td><span class="badge ${c.status}">${c.status}</span></td><td class="hide-m">${esc((pkg(c.packageId) || {}).name || '')}</td><td class="hide-m">${openFor(c).length}</td><td class="hide-m">${esc(c.next || '')}${c.nextDate ? ' · ' + rel(c.nextDate) : ''}</td></tr>`).join('')}</tbody></table></div>`;
    return `<div class="page-head"><div><h1>Clients</h1><p>${S.clients.length} total</p></div>
      <div class="actions"><div class="seg"><button class="${f.view === 'grid' ? 'on' : ''}" data-act="clientview" data-v="grid">${ic('grid')}</button><button class="${f.view === 'list' ? 'on' : ''}" data-act="clientview" data-v="list">${ic('list')}</button></div>
      <button class="btn gold" data-act="newclient">${ic('plus')}New client</button></div></div>
      <div class="chips"><button class="chip ${f.status === 'All' ? 'on' : ''}" data-act="cfilter" data-v="All">All</button>
      ${CLIENT_STATUSES.map((s) => `<button class="chip ${f.status === s ? 'on' : ''}" data-act="cfilter" data-v="${s}">${s} ${cnt(s)}</button>`).join('')}</div>
      ${list.length ? (f.view === 'grid' ? grid : table) : '<div class="card empty">No clients with this status.</div>'}`;
  };

  views['my-tasks'] = () => {
    const t0 = todayISO(); const mine = open().filter((t) => t.assigneeId === me().id);
    const g = { Overdue: [], Today: [], 'This week': [], Later: [], 'No date': [] };
    mine.forEach((t) => {
      if (!t.due) return g['No date'].push(t);
      const n = diffDays(t0, t.due);
      (n < 0 ? g.Overdue : n === 0 ? g.Today : n <= 7 ? g['This week'] : g.Later).push(t);
    });
    Object.values(g).forEach((a) => a.sort((x, y) => (x.due || '').localeCompare(y.due || '')));
    const left = Object.keys(g).filter((k) => g[k].length).map((k) => `<div class="card" style="margin-bottom:14px"><div class="card-h"><h3>${k} · ${g[k].length}</h3></div>${g[k].map(trow).join('')}<div style="height:8px"></div></div>`).join('') || '<div class="card empty">Nothing assigned to you. Nice.</div>';
    const wl = S.team.map((u) => {
      const ts = open().filter((t) => t.assigneeId === u.id);
      const by = (k) => ts.filter((t) => t.status === k).length;
      const doneN = S.tasks.filter((t) => t.assigneeId === u.id && t.status === 'done').length;
      const max = Math.max(1, ...S.team.map((x) => open().filter((t) => t.assigneeId === x.id).length));
      return `<div class="wl"><div class="top">${avatar(u.id)}${esc(u.name)}<span class="cnt">${ts.length} open</span></div>
        <div class="bar" style="width:${Math.max(4, (ts.length / max) * 100)}%">${STATUSES.slice(0, 5).map((s) => `<span style="flex:${by(s.k)};background:${statusVar(s.k)}"></span>`).join('')}</div>
        <div class="legend">${STATUSES.slice(0, 5).map((s) => `<span>${s.label} ${by(s.k)}</span>`).join('')}<span>Done ${doneN}</span></div></div>`;
    }).join('');
    return `<div class="page-head"><div><h1>My tasks</h1><p>${mine.length} open for ${esc(me().name.split(' ')[0])}</p></div><div class="actions"><button class="btn gold" data-act="newtask">${ic('plus')}New task</button></div></div>
      <div class="mytasks"><div>${left}</div><div class="card"><div class="card-h"><h3>Team workload</h3></div>${wl}<div style="height:6px"></div></div></div>`;
  };

  function calItems(day) {
    const evs = S.events.filter((e) => e.date === day).map((e) => ({ kind: 'event', id: e.id, type: e.type, title: e.title }));
    const ts = S.tasks.filter((t) => t.due === day && t.status !== 'done').map((t) => ({ kind: 'task', id: t.id, type: 'Task', title: t.title }));
    return evs.concat(ts);
  }
  const calChip = (it) => `<span class="ev ${it.type}" data-act="${it.kind === 'task' ? 'task' : 'event'}" data-id="${it.id}" title="${esc(it.title)}">${esc(it.title)}</span>`;
  views.calendar = () => {
    const c = ui.cal; const cur = parse(c.cursor); const t0 = todayISO();
    let cells = ''; let title;
    if (c.view === 'month') {
      title = `${MONTHS_FULL[cur.getMonth()]} ${cur.getFullYear()}`;
      const first = new Date(cur.getFullYear(), cur.getMonth(), 1, 12);
      const start = new Date(first); start.setDate(1 - first.getDay());
      for (let i = 0; i < 42; i++) {
        const d = new Date(start); d.setDate(start.getDate() + i); const iso = isoOf(d);
        if (i === 35 && d.getMonth() !== cur.getMonth()) break;
        const items = calItems(iso);
        cells += `<div class="cell ${d.getMonth() !== cur.getMonth() ? 'out' : ''} ${iso === t0 ? 'today' : ''}"><span class="n">${d.getDate()}</span>
          ${items.slice(0, 3).map(calChip).join('')}${items.length > 3 ? `<span class="more">+${items.length - 3} more</span>` : ''}</div>`;
      }
    } else {
      const start = new Date(cur); start.setDate(cur.getDate() - cur.getDay());
      const end = new Date(start); end.setDate(start.getDate() + 6);
      title = `${short(isoOf(start))} to ${short(isoOf(end))}`;
      for (let i = 0; i < 7; i++) {
        const d = new Date(start); d.setDate(start.getDate() + i); const iso = isoOf(d);
        cells += `<div class="cell ${iso === t0 ? 'today' : ''}" style="min-height:300px"><span class="n">${d.getDate()}</span>${calItems(iso).map(calChip).join('')}</div>`;
      }
    }
    return `<div class="page-head"><div><h1>Calendar</h1><p>${title}</p></div>
      <div class="actions"><div class="tabs" style="margin:0"><button class="${c.view === 'month' ? 'on' : ''}" data-act="calview" data-v="month">Month</button><button class="${c.view === 'week' ? 'on' : ''}" data-act="calview" data-v="week">Week</button></div>
      <button class="iconbtn" data-act="calnav" data-v="-1">${ic('left')}</button><button class="btn sm" data-act="calnav" data-v="0">Today</button><button class="iconbtn" data-act="calnav" data-v="1">${ic('right')}</button>
      <button class="btn gold" data-act="newevent">${ic('plus')}Event</button></div></div>
      <div class="legend-row"><span class="ev Deadline">Deadline</span><span class="ev Event">Event</span><span class="ev Launch">Launch</span><span class="ev Reminder">Reminder</span><span class="ev Task" style="border:1px solid var(--border)">Task due</span></div>
      <div class="cal">${['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => `<div class="dh">${d}</div>`).join('')}${cells}</div>`;
  };

  views.packages = () => {
    const cats = [...new Set(S.packages.map((p) => p.cat))];
    return `<div class="page-head"><div><h1>Packages</h1><p>What we sell and what's included.</p></div><div class="actions"><button class="btn gold" data-act="editpkg">${ic('plus')}New package</button></div></div>
      ${cats.map((cat) => `<div class="sec-h">${esc(cat)}</div><div class="pgrid">${S.packages.filter((p) => p.cat === cat).map((p) => `
        <div class="card pcard"><div class="top"><b>${esc(p.name)}</b><span class="price">${esc(p.price)}</span><button class="iconbtn" data-act="editpkg" data-id="${p.id}">${ic('pencil')}</button></div>
        <p>${esc(p.desc)}</p><ul><li>${esc(p.items)}</li></ul>
        <div class="muted" style="font-size:11.5px;margin-top:8px">${S.clients.filter((c) => c.packageId === p.id && c.status === 'Active').length} active client(s)</div></div>`).join('')}</div>`).join('')}`;
  };

  views.team = () => {
    const tab = ui.team;
    const people = `<div class="card" style="overflow-x:auto"><table class="tbl"><thead><tr><th>Name</th><th class="hide-m">Title</th><th class="hide-m">Email</th><th>Role</th><th class="hide-m">Status</th><th></th></tr></thead><tbody>
      ${S.team.map((u) => `<tr data-act="person" data-id="${u.id}"><td class="who">${avatar(u.id)}${esc(u.name)}${u.me ? ' <span class="muted" style="font-weight:400">(you)</span>' : ''}</td><td class="hide-m muted">${esc(u.title)}</td><td class="hide-m muted">${esc(u.email)}</td>
      <td><span class="badge role ${u.role}">${u.role}</span></td><td class="hide-m">${u.status}</td><td>${ic('pencil')}</td></tr>`).join('')}</tbody></table></div>`;
    const sugs = S.suggestions.length ? S.suggestions.slice().reverse().map((g) => `<div class="card rq"><b>${esc(g.text)}</b><div class="sub">${esc((user(g.by) || {}).name || 'Team member')} · ${rel(g.date)}</div>
      <div class="btns" style="display:flex;gap:8px"><button class="btn sm gold" data-act="sug2task" data-id="${g.id}">${ic('plus')}Make it a task</button><button class="btn sm ghost" data-act="sugdel" data-id="${g.id}">${ic('x')}Dismiss</button></div></div>`).join('') : '<div class="card empty">No suggestions yet. They arrive from the box in the sidebar.</div>';
    return `<div class="page-head"><div><h1>Team</h1><p>${S.team.length} active</p></div><div class="actions"><button class="btn gold" data-act="person">${ic('plus')}Add person</button></div></div>
      <div class="tabs"><button class="${tab === 'people' ? 'on' : ''}" data-act="teamtab" data-v="people">People</button><button class="${tab === 'sugs' ? 'on' : ''}" data-act="teamtab" data-v="sugs">Suggestions ${S.suggestions.length}</button></div>
      ${tab === 'people' ? people : sugs}`;
  };

  views.sops = () => {
    const q = ui.sopQ.toLowerCase();
    const list = S.sops.filter((s) => !q || (s.title + s.summary + s.steps.join(' ')).toLowerCase().includes(q));
    const cats = [...new Set(list.map((s) => s.cat))];
    return `<div class="page-head"><div><h1>SOPs</h1><p>How we do things, written down once.</p></div><div class="actions"><button class="btn gold" data-act="editsop">${ic('plus')}New SOP</button></div></div>
      <input class="input" placeholder="Search SOPs..." value="${esc(ui.sopQ)}" data-filter="sop" style="margin-bottom:16px">
      ${cats.map((cat) => `<div class="sec-h">${esc(cat)}</div><div class="pgrid">${list.filter((s) => s.cat === cat).map((s) => `
        <div class="card sop" data-act="sop" data-id="${s.id}"><b>${esc(s.title)}</b><p>${esc(s.summary)}</p><small>${esc(s.owner)} · ${s.steps.length} steps</small></div>`).join('')}</div>`).join('') || '<div class="card empty">No SOP matches that search.</div>'}`;
  };

  const tpl = (id) => S.checklistTemplates.find((x) => x.id === id);
  views.checklists = () => {
    const tab = ui.checklists;
    const prog = S.checklists.map((k) => {
      const t = tpl(k.templateId); const n = t.items.length; const d = k.done.length;
      const nextI = t.items.find((_, i) => !k.done.includes(i));
      return `<div class="card chk" data-act="checklist" data-id="${k.id}"><b>${esc(t.name)}</b><div class="sub">${esc((client(k.clientId) || {}).name || '')}</div>
        <div class="progress"><span style="width:${(d / n) * 100}%"></span></div><div class="cnt">${d} of ${n}</div><div class="nexti">${nextI ? 'Next: ' + esc(nextI) : 'All done'}</div></div>`;
    }).join('');
    const tpls = S.checklistTemplates.map((t) => `<div class="card chk"><b>${esc(t.name)}</b><div class="sub">${t.items.length} items</div>
      <ol class="steps" style="margin-bottom:12px">${t.items.map((i) => `<li>${esc(i)}</li>`).join('')}</ol>
      <button class="btn sm gold" data-act="startchk" data-id="${t.id}">${ic('plus')}Start for a client</button></div>`).join('');
    return `<div class="page-head"><div><h1>Checklists</h1><p>Repeatable steps, tracked per client.</p></div></div>
      <div class="tabs"><button class="${tab === 'progress' ? 'on' : ''}" data-act="chktab" data-v="progress">In progress</button><button class="${tab === 'tpl' ? 'on' : ''}" data-act="chktab" data-v="tpl">Templates</button></div>
      <div class="pgrid">${tab === 'progress' ? prog || '<div class="card empty">No checklists running.</div>' : tpls}</div>`;
  };

  const approver = (t) => (t.approval && t.approval.approver) || (t.clientId === 'c0' || t.priority === 'high' ? 'u1' : me().id);
  views.approvals = () => {
    const all = S.tasks.filter((t) => t.status === 'approval');
    const tab = ui.approvals;
    const list = all.filter((t) => tab === 'all' || (tab === 'mine' ? approver(t) === me().id : approver(t) === tab));
    const tabs = [['mine', 'Mine'], ['u1', user('u1').name.split(' ')[0]], [me().id, me().name.split(' ')[0]], ['all', 'All']];
    return `<div class="page-head"><div><h1>For approval</h1><p>${all.length} waiting for a decision</p></div></div>
      <div class="tabs">${tabs.map(([k, l]) => `<button class="${tab === k ? 'on' : ''}" data-act="aprtab" data-v="${k}">${esc(l)}</button>`).join('')}</div>
      ${list.map((t) => `<div class="card appr"><h3>${esc(t.title)}</h3><div class="sub">${esc((client(t.clientId) || {}).name || '')} · ${esc((user(t.assigneeId) || {}).name || '')}</div>
        <div style="margin-top:10px"><button class="btn sm gold" data-act="review" data-id="${t.id}">${ic('ext')}Open review link</button> <button class="btn sm ghost" data-act="task" data-id="${t.id}">Details</button></div>
        <div class="latest">Latest approval<b>Submitted ${rel(t.approval ? t.approval.submitted : todayISO())} by ${esc((user(t.assigneeId) || {}).name || '')} · approver ${esc((user(approver(t)) || {}).name || '')}</b></div>
        <div class="btns"><button class="btn gold" data-act="approve" data-id="${t.id}">${ic('check')}Approve</button><button class="btn" data-act="changes" data-id="${t.id}">${ic('undo')}Request changes</button></div></div>`).join('') || '<div class="card empty">Nothing waiting for this approver.</div>'}`;
  };

  function financeNumbers() {
    const F = S.finance; const now = new Date();
    const mrr = F.mrrHistory[F.mrrHistory.length - 1]; const prev = F.mrrHistory[F.mrrHistory.length - 2];
    const thisMonthRec = F.recorded.filter((r) => r.date.slice(0, 7) === todayISO().slice(0, 7)).reduce((a, r) => a + r.amount, 0);
    const monthsThisYear = now.getMonth() + 1;
    const ytd = F.payments.slice(-monthsThisYear).reduce((a, b) => a + b, 0) + F.recorded.reduce((a, r) => a + r.amount, 0);
    const total = F.payments.reduce((a, b) => a + b, 0) + F.recorded.reduce((a, r) => a + r.amount, 0);
    return { mrr, prev, arr: mrr * 12, month: F.payments[F.payments.length - 1] + thisMonthRec, ytd, total };
  }
  function monthLabels(n, forward) {
    const out = []; const d = new Date(); d.setDate(1);
    for (let i = n - 1; i >= 0; i--) { const x = new Date(d.getFullYear(), d.getMonth() - i, 1); out.push(MONTHS[x.getMonth()] + " '" + String(x.getFullYear()).slice(2)); }
    for (let i = 1; i <= (forward || 0); i++) { const x = new Date(d.getFullYear(), d.getMonth() + i, 1); out.push(MONTHS[x.getMonth()] + " '" + String(x.getFullYear()).slice(2)); }
    return out;
  }
  function lineChart(actual, forecast, labels) {
    const W = 460, H = 210, L = 40, B = 24, T = 10, R = 10;
    const all = actual.concat(forecast); const max = Math.ceil(Math.max(...all) / 2000) * 2000;
    const x = (i) => L + (i * (W - L - R)) / (all.length - 1); const y = (v) => T + (H - T - B) * (1 - v / max);
    let g = '';
    for (let k = 0; k <= 4; k++) { const v = (max / 4) * k; g += `<line class="grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 6}" y="${y(v) + 3}" text-anchor="end">$${(v / 1000).toFixed(v % 1000 ? 1 : 0)}k</text>`; }
    labels.forEach((l, i) => { if (i % 3 === 0) g += `<text x="${x(i)}" y="${H - 6}" text-anchor="middle">${l}</text>`; });
    const pa = actual.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ');
    const fc = [actual[actual.length - 1]].concat(forecast).map((v, i) => `${i ? 'L' : 'M'}${x(actual.length - 1 + i)},${y(v)}`).join(' ');
    const area = `${pa} L${x(actual.length - 1)},${y(0)} L${x(0)},${y(0)} Z`;
    return `<svg viewBox="0 0 ${W} ${H}">${g}<path d="${area}" fill="var(--finance-fill, oklch(74% .11 85 / .10))"/><path d="${pa}" fill="none" stroke="var(--foreground)" stroke-width="2"/><path d="${fc}" fill="none" stroke="var(--gold)" stroke-width="2" stroke-dasharray="5 4"/>
      ${actual.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="2.5" fill="var(--foreground)"><title>${labels[i]}: ${money(v)}</title></circle>`).join('')}</svg>`;
  }
  function barChart(vals, labels) {
    const W = 460, H = 210, L = 40, B = 24, T = 10, R = 10;
    const max = Math.ceil(Math.max(...vals) / 2000) * 2000; const bw = (W - L - R) / vals.length;
    const y = (v) => T + (H - T - B) * (1 - v / max);
    let g = '';
    for (let k = 0; k <= 4; k++) { const v = (max / 4) * k; g += `<line class="grid" x1="${L}" x2="${W - R}" y1="${y(v)}" y2="${y(v)}"/><text x="${L - 6}" y="${y(v) + 3}" text-anchor="end">$${(v / 1000).toFixed(v % 1000 ? 1 : 0)}k</text>`; }
    vals.forEach((v, i) => {
      const xx = L + i * bw + bw * 0.18;
      g += `<rect x="${xx}" y="${y(v)}" width="${bw * 0.64}" height="${y(0) - y(v)}" rx="3" fill="${i === vals.length - 1 ? 'var(--gold)' : 'var(--status-progress)'}" opacity="${i === vals.length - 1 ? 1 : 0.75}"><title>${labels[i]}: ${money(v)}</title></rect>`;
      if (i % 2 === 1 || vals.length < 8) g += `<text x="${xx + bw * 0.32}" y="${H - 6}" text-anchor="middle">${labels[i]}</text>`;
    });
    return `<svg viewBox="0 0 ${W} ${H}">${g}</svg>`;
  }
  views.finance = () => {
    const F = S.finance; const n = financeNumbers();
    const fc = []; let last = n.mrr; for (let i = 0; i < 6; i++) { last = Math.round(last * 1.05); fc.push(last); }
    const labels = monthLabels(12, 6); const pl = monthLabels(12);
    const kpi = (l, v, delta) => `<div class="card kpi"><div class="lbl">${l}</div><div class="num">${v}${delta ? `<span class="delta">${delta}</span>` : ''}</div></div>`;
    const recurring = F.revenue.filter((r) => r.type === 'Recurring');
    const booked = 22500 + F.revenue.filter((r) => r.added).reduce((a, r) => a + (parseInt(String(r.amount).replace(/[^0-9]/g, ''), 10) || 0), 0);
    return `<div class="page-head"><div><h1>Finance</h1><p>${MONTHS_FULL[new Date().getMonth()]} ${new Date().getFullYear()} · sample figures</p></div>
      <div class="actions"><button class="btn" data-act="payment">${ic('dollar')}Record payment</button><button class="btn gold" data-act="deal">${ic('plus')}Add deal</button></div></div>
      <div class="kpis">
        ${kpi('MRR', money(n.mrr), '+' + Math.round(((n.mrr - n.prev) / n.prev) * 100) + '%')}${kpi('ARR', money(n.arr))}${kpi('Revenue this month', money(n.month))}${kpi('Revenue YTD', money(n.ytd))}
        ${kpi('Total revenue', money(n.total))}${kpi('Booked contract value', money(booked))}${kpi('Active paying clients', recurring.length ? new Set(recurring.map((r) => r.clientId)).size : 0)}${kpi('New clients this month', 2)}
      </div>
      <div class="charts">
        <div class="card chart" style="padding:13px 14px"><h3>MRR · history and forecast</h3><div class="lg"><span>── Actual</span><span style="color:var(--gold)">- - Forecast (+5%/mo)</span></div>${lineChart(F.mrrHistory, fc, labels)}</div>
        <div class="card chart" style="padding:13px 14px"><h3>Payments by month</h3><div class="lg"><span>Last 12 months</span></div>${barChart(F.payments, pl)}</div>
      </div>
      <h2 class="sec">Review queue · ${F.reviewQueue.length}</h2>
      ${F.reviewQueue.map((r) => `<div class="card rq"><b>${esc(r.text)}</b><div class="sub">${esc((client(r.clientId) || {}).name || '')} · ${esc(r.amount)}</div>
        <div style="display:flex;gap:8px"><button class="btn sm gold" data-act="rqok" data-id="${r.id}">${ic('check')}Approve</button><button class="btn sm ghost" data-act="rqno" data-id="${r.id}">${ic('x')}Dismiss</button></div>
        <div class="note">${esc(r.note)}</div><div class="muted" style="font-size:11px;margin-top:8px">${ic('ext')} ${esc(r.source)}</div></div>`).join('') || '<div class="card empty">Review queue is clear.</div>'}
      <h2 class="sec">Amount needed</h2>
      <div class="need">${F.needed.map((x) => `<div class="card"><div><b>${esc(x.title)}</b><small>${esc((client(x.clientId) || {}).name || '')} · ${x.freq}</small></div>
        <input class="input" placeholder="$" inputmode="numeric" data-need="${x.id}"><button class="ok" data-act="needok" data-id="${x.id}" title="Save amount">${ic('check')}</button></div>`).join('') || '<div class="card empty">Every deal has an amount.</div>'}</div>
      <h2 class="sec">Revenue by client</h2>
      <div class="card" style="overflow-x:auto"><table class="tbl"><thead><tr><th>Client</th><th class="hide-m">Package</th><th>Deal type</th><th>Amount</th></tr></thead><tbody>
        ${F.revenue.map((r) => `<tr data-act="client" data-id="${r.clientId}"><td class="who">${esc((client(r.clientId) || {}).name || '')}</td><td class="hide-m">${esc(r.pkg)}</td><td>${esc(r.type)}</td><td><b>${esc(r.amount)}</b></td></tr>`).join('')}
      </tbody></table></div>
      ${F.recorded.length ? `<h2 class="sec">Payments recorded in this demo</h2><div class="card"><table class="tbl"><tbody>${F.recorded.slice().reverse().map((r) => `<tr><td>${esc((client(r.clientId) || {}).name || '')}</td><td>${short(r.date)}</td><td><b>${money(r.amount)}</b></td></tr>`).join('')}</tbody></table></div>` : ''}`;
  };

  // ---------- shell ----------
  const NAV = [
    ['overview', 'Overview', 'grid'], ['board', 'Board', 'board'], ['clients', 'Clients', 'users'], ['my-tasks', 'My tasks', 'tasks'],
    ['calendar', 'Calendar', 'calendar'], ['packages', 'Packages', 'package'], ['team', 'Team', 'user'], ['sops', 'SOPs', 'book'],
    ['checklists', 'Checklists', 'checks'], ['approvals', 'For approval', 'approve', true], ['finance', 'Finance', 'dollar', true],
  ];
  const TITLES = Object.fromEntries(NAV.map((n) => [n[0], n[1]]));
  function shell() {
    document.getElementById('app').innerHTML = `
      <aside class="sidebar">
        <div class="brand"><div class="logo">JT</div><div><b>JT FlowOps</b><small>Ops dashboard · demo</small></div></div>
        <nav class="nav" id="nav"></nav>
        <div class="suggest"><h4>Suggestion box</h4>
          <textarea id="sugText" maxlength="2000" placeholder="Type anything you'd like to see that would help improve our dashboard..."></textarea>
          <div class="row"><small id="sugCount">0/2000</small><button class="btn sm gold" data-act="sugsend">${ic('send')}Send</button></div></div>
        <div style="padding:0 12px 10px;font-size:10.5px;color:var(--sidebar-muted)">Built by Jayson Tolentino · <a href="https://jtflowops.onrender.com" target="_blank" rel="noopener" style="color:var(--gold);text-decoration:none">JT FlowOps</a></div>
      </aside>
      <div class="main">
        <header class="topbar">
          <button class="iconbtn mob-only" data-act="mobnav" aria-label="Menu">${ic('menu')}</button>
          <button class="iconbtn desk-only" data-act="collapse" aria-label="Toggle sidebar">${ic('panel')}</button>
          <button class="searchbtn" data-act="cmdk">${ic('search')}<span>Search tasks and clients...</span><kbd>Ctrl K</kbd></button>
          <div class="demo-pill"><span class="lbl">Demo workspace · sample data</span><button data-act="reset">Reset</button></div>
          <button class="iconbtn" data-act="theme" aria-label="Toggle theme" id="themeBtn"></button>
          ${avatar(me().id, true)}
        </header>
        <main class="content" id="view"></main>
      </div>
      <div class="overlay" id="overlay"></div>
      <aside class="drawer" id="drawer"></aside>
      <div class="modal" id="modal"></div>
      <button class="bot-fab" data-act="bot" aria-label="Open Flo helper"><span class="pill">Flo</span>${BOT_FACE}</button>
      <aside class="bot-panel" id="bot"></aside>
      <div class="toast" id="toast"></div>`;
  }
  function renderNav(route) {
    const appr = S.tasks.filter((t) => t.status === 'approval').length;
    const fin = S.finance.reviewQueue.length;
    $('#nav').innerHTML = NAV.map(([k, l, i, gold]) => {
      const c = k === 'approvals' ? appr : k === 'finance' ? fin : 0;
      return `<a href="#/${k}" class="${route === k ? 'active' : ''} ${gold ? 'gold' : ''}">${ic(i)}${l}${c ? `<span class="count">${c}</span>` : ''}</a>`;
    }).join('');
  }
  function currentRoute() {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, query] = h.split('?');
    return { route: TITLES[path] ? path : 'overview', query: new URLSearchParams(query || '') };
  }
  function render() {
    const { route, query } = currentRoute();
    if (route === 'board' && query.get('waiting')) ui.board.waiting = query.get('waiting');
    renderNav(route);
    const v = $('#view');
    v.className = 'content' + (route === 'board' || route === 'calendar' ? ' wide' : '');
    v.innerHTML = views[route]();
    document.title = `${TITLES[route]} · JT FlowOps`;
    $('#themeBtn').innerHTML = ic(document.documentElement.classList.contains('dark') ? 'sun' : 'moon');
    if (route === 'board') bindDnD();
  }

  // ---------- drag and drop ----------
  let dragId = null;
  function bindDnD() {
    document.querySelectorAll('.kcard').forEach((c) => {
      c.addEventListener('dragstart', (e) => { dragId = c.dataset.id; try { e.dataTransfer.setData('text/plain', c.dataset.id); e.dataTransfer.effectAllowed = 'move'; } catch (x) { /* ignore */ } c.classList.add('dragging'); });
      c.addEventListener('dragend', () => c.classList.remove('dragging'));
    });
    document.querySelectorAll('.col').forEach((col) => {
      col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('drop'); });
      col.addEventListener('dragleave', () => col.classList.remove('drop'));
      col.addEventListener('drop', (e) => {
        e.preventDefault(); col.classList.remove('drop');
        let id = dragId; try { id = e.dataTransfer.getData('text/plain') || dragId; } catch (x) { /* ignore */ }
        dragId = null;
        const t = S.tasks.find((x) => x.id === id);
        if (t && t.status !== col.dataset.col) { setStatus(t, col.dataset.col); save(); render(); toast(`Moved to ${STATUSES.find((s) => s.k === t.status).label}`); }
      });
    });
  }
  function setStatus(t, s) {
    t.status = s;
    if (s === 'approval') t.approval = { submitted: todayISO(), by: t.assigneeId, approver: t.approval && t.approval.approver };
    if (s === 'done') t.waitingOn = t.status === 'done' ? '' : t.waitingOn;
  }

  // ---------- overlays ----------
  function openOverlay() { $('#overlay').classList.add('open'); }
  function closeAll() {
    ['#overlay', '#drawer', '#modal', '#bot'].forEach((s) => $(s).classList.remove('open'));
    document.body.classList.remove('nav-open');
  }
  function drawer(title, body, foot) {
    $('#drawer').innerHTML = `<div class="dh"><h2>${title}</h2><button class="iconbtn" data-act="close">${ic('x')}</button></div><div class="db">${body}</div><div class="df">${foot}</div>`;
    $('#drawer').classList.add('open'); openOverlay();
  }
  function modal(title, body, foot) {
    $('#modal').classList.remove('cmdk');
    $('#modal').innerHTML = `<div class="mh"><h2>${title}</h2><button class="iconbtn" data-act="close">${ic('x')}</button></div><div class="mb">${body}</div>${foot ? `<div class="mf">${foot}</div>` : ''}`;
    $('#modal').classList.add('open'); openOverlay();
  }
  let toastT;
  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200); }
  const val = (id) => { const e = document.getElementById(id); return e ? e.value.trim() : ''; };

  function taskDrawer(id) {
    const t = S.tasks.find((x) => x.id === id) || { id: '', title: '', details: '', status: 'todo', priority: 'medium', clientId: 'c0', assigneeId: me().id, due: '', waitingOn: '', links: { raw: '', review: '', final: '' } };
    drawer(id ? 'Edit task' : 'New task', `
      <label class="f">Title</label><input class="input" id="f_title" value="${esc(t.title)}" placeholder="What needs doing?">
      <label class="f">Details</label><textarea class="input" id="f_details">${esc(t.details)}</textarea>
      <div class="grid2"><div><label class="f">Status</label><select class="input" id="f_status">${STATUSES.map((s) => opt(s.k, s.label, t.status)).join('')}</select></div>
      <div><label class="f">Priority</label><select class="input" id="f_priority">${['high', 'medium', 'low'].map((p) => opt(p, p, t.priority)).join('')}</select></div>
      <div><label class="f">Client</label><select class="input" id="f_client">${S.clients.map((c) => opt(c.id, c.name, t.clientId)).join('')}</select></div>
      <div><label class="f">Assignee</label><select class="input" id="f_assignee">${S.team.map((u) => opt(u.id, u.name, t.assigneeId)).join('')}</select></div>
      <div><label class="f">Due date</label><input class="input" type="date" id="f_due" value="${esc(t.due)}"></div>
      <div><label class="f">Waiting on</label><input class="input" id="f_waiting" value="${esc(t.waitingOn)}" placeholder="e.g. Client"></div></div>
      <label class="f">Raw link</label><input class="input" id="f_raw" value="${esc(t.links.raw)}" placeholder="https://">
      <label class="f">Review link</label><input class="input" id="f_review" value="${esc(t.links.review)}" placeholder="https://">
      <label class="f">Final link</label><input class="input" id="f_final" value="${esc(t.links.final)}" placeholder="https://">`,
      `${id ? `<button class="btn danger" data-act="deltask" data-id="${id}">${ic('trash')}Delete</button>` : ''}<button class="btn gold" data-act="savetask" data-id="${id}">Save</button><button class="btn" data-act="close">Cancel</button>`);
    setTimeout(() => $('#f_title').focus(), 50);
  }
  function clientDrawer(id) {
    const c = client(id) || { id: '', name: '', contact: '', location: '', status: 'Prospect', packageId: S.packages[0].id, next: '', nextDate: '' };
    const ts = id ? open().filter((t) => t.clientId === id) : [];
    drawer(id ? esc(c.name) : 'New client', `
      <label class="f">Business name</label><input class="input" id="c_name" value="${esc(c.name)}">
      <div class="grid2"><div><label class="f">Main contact</label><input class="input" id="c_contact" value="${esc(c.contact)}"></div>
      <div><label class="f">Location</label><input class="input" id="c_loc" value="${esc(c.location)}"></div>
      <div><label class="f">Status</label><select class="input" id="c_status">${CLIENT_STATUSES.map((s) => opt(s, s, c.status)).join('')}</select></div>
      <div><label class="f">Package</label><select class="input" id="c_pkg">${opt('', 'None', c.packageId || '')}${S.packages.map((p) => opt(p.id, p.name, c.packageId)).join('')}</select></div>
      <div><label class="f">Next milestone</label><input class="input" id="c_next" value="${esc(c.next)}"></div>
      <div><label class="f">Milestone date</label><input class="input" type="date" id="c_nextd" value="${esc(c.nextDate)}"></div></div>
      ${id ? `<div style="margin-top:14px"><button class="btn sm" data-act="drive">${ic('folder')}Open Drive folder</button></div>
      <label class="f" style="margin-top:18px">Open tasks · ${ts.length}</label><div class="card">${ts.map(trow).join('') || '<div class="empty">No open tasks.</div>'}</div>` : ''}`,
      `<button class="btn gold" data-act="saveclient" data-id="${id}">Save</button><button class="btn" data-act="close">Cancel</button>`);
  }

  // ---------- search ----------
  function cmdk() {
    modal('', '', '');
    $('#modal').classList.add('cmdk');
    $('#modal').innerHTML = `<input id="kq" placeholder="Search tasks, clients, SOPs and pages..." autocomplete="off"><div class="res" id="kres"></div>`;
    const run = () => {
      const q = $('#kq').value.toLowerCase().trim();
      const items = [];
      NAV.forEach(([k, l, i]) => { if (!q || l.toLowerCase().includes(q)) items.push({ act: 'go', href: '#/' + k, icon: i, label: l, kind: 'Page' }); });
      if (q) {
        S.tasks.filter((t) => (t.title + ' ' + ((client(t.clientId) || {}).name || '')).toLowerCase().includes(q)).slice(0, 8).forEach((t) => items.push({ act: 'task', id: t.id, icon: 'tasks', label: t.title, kind: (client(t.clientId) || {}).name }));
        S.clients.filter((c) => (c.name + c.contact).toLowerCase().includes(q)).forEach((c) => items.push({ act: 'client', id: c.id, icon: 'users', label: c.name, kind: 'Client' }));
        S.sops.filter((s) => s.title.toLowerCase().includes(q)).forEach((s) => items.push({ act: 'sop', id: s.id, icon: 'book', label: s.title, kind: 'SOP' }));
      }
      $('#kres').innerHTML = items.slice(0, 14).map((it, i) => `<div class="r ${i === 0 ? 'sel' : ''}" data-act="${it.act}" data-id="${it.id || ''}" data-href="${it.href || ''}">${ic(it.icon)}${esc(it.label)}<small>${esc(it.kind || '')}</small></div>`).join('') || '<div class="empty">No results.</div>';
    };
    $('#kq').addEventListener('input', run);
    $('#kq').addEventListener('keydown', (e) => { if (e.key === 'Enter') { const f = $('#kres .r'); if (f) f.click(); } });
    run(); setTimeout(() => $('#kq').focus(), 30);
  }

  // ---------- Flo helper (rule-based, reads this workspace) ----------
  function botOpen() {
    const p = $('#bot');
    if (!p.innerHTML) {
      p.innerHTML = `<div class="bot-head">${BOT_FACE.replace('class="bot-face"', 'class="bot-face" style="width:34px;height:34px"')}<div><b>Flo</b><small>Your ops sidekick. Knows our tasks, clients and SOPs.</small></div><button class="iconbtn" data-act="close">${ic('x')}</button></div>
        <div class="bot-body" id="botBody"><div class="bot-hello">${BOT_FACE.replace('class="bot-face"', 'class="bot-face" style="width:72px;height:72px"')}<h3>Hi, I'm Flo!</h3>
        <div class="bot-sugs">${["What's due this week?", "What's waiting on approval?", "What's overdue?", 'Who has the most on their plate?', 'Where is the Summit Ridge folder?', 'How do we onboard a new client?'].map((s) => `<button data-act="botask" data-q="${esc(s)}">${esc(s)}</button>`).join('')}</div></div></div>
        <div class="bot-foot"><textarea class="input" id="botIn" placeholder="Ask Flo..."></textarea><button data-act="botsend" aria-label="Send">${ic('send')}</button></div>`;
      $('#botIn').addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); botSend(); } });
    }
    p.classList.add('open'); openOverlay(); setTimeout(() => $('#botIn').focus(), 60);
  }
  function botSend(q) {
    const input = $('#botIn'); q = (q || input.value).trim(); if (!q) return; input.value = '';
    const body = $('#botBody'); const hello = $('.bot-hello', body); if (hello) hello.remove();
    body.insertAdjacentHTML('beforeend', `<div class="msg me">${esc(q)}</div><div class="msg bot typing" id="typing"><span></span><span></span><span></span></div>`);
    body.scrollTop = body.scrollHeight;
    setTimeout(() => { const t = $('#typing'); if (t) t.remove(); body.insertAdjacentHTML('beforeend', `<div class="msg bot">${botAnswer(q)}</div>`); body.scrollTop = body.scrollHeight; }, 550 + Math.random() * 400);
  }
  const li = (arr, fn) => `<ul>${arr.map((x) => `<li>${fn(x)}</li>`).join('')}</ul>`;
  const tline = (t) => `${esc(t.title)} <span class="muted">(${esc((client(t.clientId) || {}).name || '')}, ${rel(t.due) || 'no date'}, ${esc(((user(t.assigneeId) || {}).name || '').split(' ')[0])})</span>`;
  function botAnswer(raw) {
    const q = raw.toLowerCase(); const t0 = todayISO();
    const cl = S.clients.find((c) => c.id !== 'c0' && q.includes(c.name.toLowerCase().split(' ')[0].replace(/[^a-z]/g, '')) && c.name.split(' ')[0].length > 3);
    if (/approv/.test(q)) {
      const a = S.tasks.filter((t) => t.status === 'approval');
      return a.length ? `${a.length} item(s) waiting for a decision:${li(a, tline)}Open <b>For approval</b> to approve or send back.` : 'Nothing is waiting for approval right now.';
    }
    if (/overdue|late|behind/.test(q)) {
      const a = open().filter((t) => t.due && t.due < t0).sort((x, y) => x.due.localeCompare(y.due));
      return a.length ? `${a.length} overdue:${li(a, tline)}` : 'Nothing is overdue. Good week so far.';
    }
    if (/due|this week|deadline|today/.test(q) && !cl) {
      const a = open().filter((t) => t.due && diffDays(t0, t.due) >= 0 && diffDays(t0, t.due) <= 6).sort((x, y) => x.due.localeCompare(y.due));
      return a.length ? `${a.length} due in the next 7 days. The first few:${li(a.slice(0, 7), tline)}` : 'Nothing is due in the next 7 days.';
    }
    if (/wait|stuck|block/.test(q)) {
      const m = {}; open().filter(isWaiting).forEach((t) => { const k = t.waitingOn || 'Someone'; m[k] = (m[k] || 0) + 1; });
      const ks = Object.keys(m).sort((a, b) => m[b] - m[a]);
      return ks.length ? `Here's who we're waiting on:${li(ks, (k) => `${esc(k)}: ${m[k]} task(s)`)}` : 'Nothing is waiting on anyone.';
    }
    if (/plate|workload|busy|capacity|most/.test(q)) {
      const rows = S.team.map((u) => [u, open().filter((t) => t.assigneeId === u.id).length]).sort((a, b) => b[1] - a[1]);
      return `Open tasks per person:${li(rows.slice(0, 6), ([u, n]) => `${esc(u.name)}: ${n}`)}`;
    }
    if (/mrr|revenue|money|finance|earn/.test(q)) {
      const n = financeNumbers();
      return `MRR is ${money(n.mrr)} (${money(n.arr)} a year). ${S.finance.reviewQueue.length} pricing change(s) are waiting in the Finance review queue. These are sample figures.`;
    }
    if (cl) {
      const ts = open().filter((t) => t.clientId === cl.id);
      return `<b>${esc(cl.name)}</b> · ${cl.status} · ${esc((pkg(cl.packageId) || {}).name || 'no package')}\nContact: ${esc(cl.contact)}\nDrive folder: Clients / ${esc(cl.name)} (demo link)\nNext: ${esc(cl.next)} · ${rel(cl.nextDate)}\n${ts.length} open task(s)${ts.length ? li(ts.slice(0, 5), tline) : ''}`;
    }
    const sop = S.sops.find((s) => s.title.toLowerCase().split(/\W+/).filter((w) => w.length > 4).some((w) => q.includes(w)));
    if (sop || /sop|how do (we|i)/.test(q)) {
      const s = sop || S.sops[0];
      return `From the SOP "<b>${esc(s.title)}</b>":${li(s.steps, esc)}`;
    }
    return 'I can answer from this workspace. Try: what is due this week, what is overdue, what is waiting on approval, who has the most on their plate, a client name, or "how do we" plus a process.';
  }

  // ---------- actions ----------
  const A = {
    go: (el) => { closeAll(); location.hash = el.dataset.href; },
    task: (el) => { closeAll(); taskDrawer(el.dataset.id); },
    newtask: () => taskDrawer(''),
    savetask: (el) => {
      const title = val('f_title'); if (!title) { toast('Add a title first'); return; }
      let t = S.tasks.find((x) => x.id === el.dataset.id);
      if (!t) { t = { id: uid('t'), links: {}, approval: null }; S.tasks.push(t); }
      const prevStatus = t.status;
      Object.assign(t, { title, details: val('f_details'), priority: val('f_priority'), clientId: val('f_client'), assigneeId: val('f_assignee'), due: val('f_due'), waitingOn: val('f_waiting'), links: { raw: val('f_raw'), review: val('f_review'), final: val('f_final') } });
      t.status = prevStatus; setStatus(t, val('f_status'));
      save(); closeAll(); render(); toast('Task saved');
    },
    deltask: (el) => { S.tasks = S.tasks.filter((t) => t.id !== el.dataset.id); save(); closeAll(); render(); toast('Task deleted'); },
    boardview: (el) => { ui.board.view = el.dataset.v; render(); },
    client: (el) => { closeAll(); clientDrawer(el.dataset.id); },
    newclient: () => clientDrawer(''),
    saveclient: (el) => {
      const name = val('c_name'); if (!name) { toast('Add a business name'); return; }
      let c = client(el.dataset.id);
      if (!c) { c = { id: uid('c') }; S.clients.push(c); }
      Object.assign(c, { name, contact: val('c_contact'), location: val('c_loc'), status: val('c_status'), packageId: val('c_pkg') || null, next: val('c_next'), nextDate: val('c_nextd') });
      save(); closeAll(); render(); toast('Client saved');
    },
    drive: () => toast('In the live version this opens the client\'s Google Drive folder'),
    cfilter: (el) => { ui.clients.status = el.dataset.v; render(); },
    clientview: (el) => { ui.clients.view = el.dataset.v; render(); },
    calview: (el) => { ui.cal.view = el.dataset.v; render(); },
    calnav: (el) => {
      const n = +el.dataset.v; const c = ui.cal;
      if (!n) c.cursor = c.view === 'month' ? todayISO().slice(0, 7) + '-01' : todayISO();
      else if (c.view === 'month') { const d = parse(c.cursor); d.setMonth(d.getMonth() + n, 1); c.cursor = isoOf(d); }
      else c.cursor = addDays(c.cursor.length ? c.cursor : todayISO(), 7 * n);
      render();
    },
    event: (el) => eventModal(el.dataset.id),
    newevent: () => eventModal(''),
    saveevent: (el) => {
      const title = val('e_title'); const date = val('e_date'); if (!title || !date) { toast('Add a title and date'); return; }
      let e = S.events.find((x) => x.id === el.dataset.id); if (!e) { e = { id: uid('e') }; S.events.push(e); }
      Object.assign(e, { title, date, type: val('e_type'), clientId: val('e_client'), time: val('e_time') });
      save(); closeAll(); render(); toast('Event saved');
    },
    delevent: (el) => { S.events = S.events.filter((e) => e.id !== el.dataset.id); save(); closeAll(); render(); toast('Event deleted'); },
    editpkg: (el) => {
      const p = pkg(el.dataset.id) || { id: '', cat: 'Automation', name: '', price: '', desc: '', items: '' };
      modal(p.id ? 'Edit package' : 'New package', `<label class="f">Name</label><input class="input" id="p_name" value="${esc(p.name)}">
        <div class="grid2"><div><label class="f">Category</label><input class="input" id="p_cat" value="${esc(p.cat)}"></div><div><label class="f">Price</label><input class="input" id="p_price" value="${esc(p.price)}"></div></div>
        <label class="f">Short description</label><textarea class="input" id="p_desc">${esc(p.desc)}</textarea><label class="f">What's included</label><textarea class="input" id="p_items">${esc(p.items)}</textarea>`,
        `<button class="btn" data-act="close">Cancel</button><button class="btn gold" data-act="savepkg" data-id="${p.id}">Save</button>`);
    },
    savepkg: (el) => {
      const name = val('p_name'); if (!name) { toast('Add a name'); return; }
      let p = pkg(el.dataset.id); if (!p) { p = { id: uid('p') }; S.packages.push(p); }
      Object.assign(p, { name, cat: val('p_cat') || 'Other', price: val('p_price'), desc: val('p_desc'), items: val('p_items') });
      save(); closeAll(); render(); toast('Package saved');
    },
    teamtab: (el) => { ui.team = el.dataset.v; render(); },
    person: (el) => {
      const u = user(el.dataset.id) || { id: '', name: '', title: '', email: '', role: 'Viewer', status: 'Invited' };
      modal(u.id ? 'Edit person' : 'Add person', `<label class="f">Name</label><input class="input" id="u_name" value="${esc(u.name)}">
        <label class="f">Title</label><input class="input" id="u_title" value="${esc(u.title)}"><label class="f">Email</label><input class="input" id="u_email" value="${esc(u.email)}">
        <div class="grid2"><div><label class="f">Role</label><select class="input" id="u_role">${opt('Admin', 'Admin', u.role)}${opt('Viewer', 'Viewer', u.role)}</select></div>
        <div><label class="f">Status</label><select class="input" id="u_status">${opt('Signed up', 'Signed up', u.status)}${opt('Invited', 'Invited', u.status)}</select></div></div>`,
        `<button class="btn" data-act="close">Cancel</button><button class="btn gold" data-act="saveperson" data-id="${u.id}">Save</button>`);
    },
    saveperson: (el) => {
      const name = val('u_name'); if (!name) { toast('Add a name'); return; }
      let u = user(el.dataset.id);
      if (!u) { const cols = ['#0ea5e9', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899']; u = { id: uid('u'), color: cols[S.team.length % cols.length] }; S.team.push(u); }
      Object.assign(u, { name, title: val('u_title'), email: val('u_email'), role: val('u_role'), status: val('u_status'), initials: name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase() });
      save(); closeAll(); render(); toast('Saved');
    },
    sug2task: (el) => {
      const g = S.suggestions.find((x) => x.id === el.dataset.id);
      S.tasks.push({ id: uid('t'), title: 'Dashboard idea: ' + g.text.slice(0, 80), details: g.text, status: 'todo', priority: 'low', clientId: 'c0', assigneeId: me().id, due: addDays(todayISO(), 7), waitingOn: '', links: { raw: '', review: '', final: '' }, approval: null });
      S.suggestions = S.suggestions.filter((x) => x.id !== g.id); save(); render(); toast('Added to the board');
    },
    sugdel: (el) => { S.suggestions = S.suggestions.filter((x) => x.id !== el.dataset.id); save(); render(); },
    sugsend: () => {
      const v = val('sugText'); if (!v) { toast('Write a suggestion first'); return; }
      S.suggestions.push({ id: uid('sg'), by: me().id, text: v, date: todayISO() }); $('#sugText').value = ''; $('#sugCount').textContent = '0/2000';
      save(); render(); toast('Thanks! Sent to the team (see Team › Suggestions)');
    },
    sop: (el) => {
      closeAll(); const s = S.sops.find((x) => x.id === el.dataset.id);
      modal(esc(s.title), `<div class="muted" style="font-size:12px">${esc(s.cat)} · owner ${esc(s.owner)}</div><p style="font-size:13px">${esc(s.summary)}</p><ol class="steps">${s.steps.map((x) => `<li>${esc(x)}</li>`).join('')}</ol>`,
        `<button class="btn" data-act="editsop" data-id="${s.id}">${ic('pencil')}Edit</button><button class="btn gold" data-act="close">Done</button>`);
    },
    editsop: (el) => {
      const s = S.sops.find((x) => x.id === el.dataset.id) || { id: '', title: '', cat: 'Onboarding', summary: '', steps: [], owner: me().name.split(' ')[0] };
      modal(s.id ? 'Edit SOP' : 'New SOP', `<label class="f">Title</label><input class="input" id="s_title" value="${esc(s.title)}"><label class="f">Section</label><input class="input" id="s_cat" value="${esc(s.cat)}">
        <label class="f">Summary</label><textarea class="input" id="s_sum">${esc(s.summary)}</textarea><label class="f">Steps (one per line)</label><textarea class="input" id="s_steps" style="min-height:140px">${esc(s.steps.join('\n'))}</textarea>`,
        `<button class="btn" data-act="close">Cancel</button><button class="btn gold" data-act="savesop" data-id="${s.id}">Save</button>`);
    },
    savesop: (el) => {
      const title = val('s_title'); if (!title) { toast('Add a title'); return; }
      let s = S.sops.find((x) => x.id === el.dataset.id); if (!s) { s = { id: uid('s'), owner: me().name.split(' ')[0] }; S.sops.push(s); }
      Object.assign(s, { title, cat: val('s_cat') || 'General', summary: val('s_sum'), steps: val('s_steps').split('\n').map((x) => x.trim()).filter(Boolean) });
      save(); closeAll(); render(); toast('SOP saved');
    },
    chktab: (el) => { ui.checklists = el.dataset.v; render(); },
    checklist: (el) => checklistModal(el.dataset.id),
    chkitem: (el) => {
      const k = S.checklists.find((x) => x.id === el.dataset.id); const i = +el.dataset.i;
      k.done = k.done.includes(i) ? k.done.filter((x) => x !== i) : k.done.concat(i);
      save(); checklistModal(k.id); render();
    },
    startchk: (el) => {
      modal('Start checklist', `<label class="f">Client</label><select class="input" id="k_client">${S.clients.filter((c) => c.id !== 'c0').map((c) => opt(c.id, c.name, '')).join('')}</select>`,
        `<button class="btn" data-act="close">Cancel</button><button class="btn gold" data-act="startchk2" data-id="${el.dataset.id}">Start</button>`);
    },
    startchk2: (el) => { S.checklists.push({ id: uid('k'), templateId: el.dataset.id, clientId: val('k_client'), done: [] }); ui.checklists = 'progress'; save(); closeAll(); render(); toast('Checklist started'); },
    aprtab: (el) => { ui.approvals = el.dataset.v; render(); },
    review: () => toast('In the live version this opens the Frame.io or Drive review link'),
    approve: (el) => { const t = S.tasks.find((x) => x.id === el.dataset.id); setStatus(t, 'done'); save(); render(); toast('Approved and moved to Done'); },
    changes: (el) => {
      modal('Request changes', `<label class="f">What needs to change?</label><textarea class="input" id="chg" placeholder="Be specific: timestamp, line, or element."></textarea>`,
        `<button class="btn" data-act="close">Cancel</button><button class="btn gold" data-act="changes2" data-id="${el.dataset.id}">Send back</button>`);
    },
    changes2: (el) => {
      const t = S.tasks.find((x) => x.id === el.dataset.id); const note = val('chg');
      if (note) t.details = (t.details ? t.details + '\n\n' : '') + `Changes requested ${short(todayISO())}: ${note}`;
      setStatus(t, 'revision'); save(); closeAll(); render(); toast('Sent back for revision');
    },
    payment: () => modal('Record payment', `<label class="f">Client</label><select class="input" id="pay_c">${S.clients.filter((c) => c.id !== 'c0').map((c) => opt(c.id, c.name, '')).join('')}</select>
      <div class="grid2"><div><label class="f">Amount (USD)</label><input class="input" id="pay_a" inputmode="numeric" placeholder="1500"></div><div><label class="f">Date</label><input class="input" type="date" id="pay_d" value="${todayISO()}"></div></div>`,
      `<button class="btn" data-act="close">Cancel</button><button class="btn gold" data-act="payment2">Save payment</button>`),
    payment2: () => {
      const a = parseFloat(val('pay_a').replace(/[^0-9.]/g, '')); if (!a) { toast('Enter an amount'); return; }
      S.finance.recorded.push({ id: uid('pay'), clientId: val('pay_c'), amount: a, date: val('pay_d') || todayISO() }); save(); closeAll(); render(); toast('Payment recorded');
    },
    deal: () => modal('Add deal', `<label class="f">Client</label><select class="input" id="d_c">${S.clients.filter((c) => c.id !== 'c0').map((c) => opt(c.id, c.name, '')).join('')}</select>
      <label class="f">Package</label><select class="input" id="d_p">${S.packages.map((p) => opt(p.name, p.name, '')).join('')}</select>
      <div class="grid2"><div><label class="f">Deal type</label><select class="input" id="d_t">${opt('Recurring', 'Recurring', '')}${opt('One-time', 'One-time', '')}</select></div><div><label class="f">Amount</label><input class="input" id="d_a" placeholder="$1,500/mo"></div></div>`,
      `<button class="btn" data-act="close">Cancel</button><button class="btn gold" data-act="deal2">Add deal</button>`),
    deal2: () => { S.finance.revenue.unshift({ clientId: val('d_c'), pkg: val('d_p'), type: val('d_t'), amount: val('d_a') || 'Amount needed', added: true }); save(); closeAll(); render(); toast('Deal added'); },
    rqok: (el) => {
      const r = S.finance.reviewQueue.find((x) => x.id === el.dataset.id);
      S.finance.revenue.unshift({ clientId: r.clientId, pkg: 'Updated pricing', type: 'Recurring', amount: r.amount + '/mo', added: true });
      S.finance.reviewQueue = S.finance.reviewQueue.filter((x) => x.id !== r.id); save(); render(); toast('Approved and added to revenue');
    },
    rqno: (el) => { S.finance.reviewQueue = S.finance.reviewQueue.filter((x) => x.id !== el.dataset.id); save(); render(); toast('Dismissed'); },
    needok: (el) => {
      const inp = document.querySelector(`[data-need="${el.dataset.id}"]`); const a = parseFloat((inp.value || '').replace(/[^0-9.]/g, ''));
      if (!a) { toast('Enter an amount'); return; }
      const n = S.finance.needed.find((x) => x.id === el.dataset.id);
      S.finance.revenue.push({ clientId: n.clientId, pkg: n.title, type: n.freq === 'Monthly' ? 'Recurring' : 'One-time', amount: money(a) + (n.freq === 'Monthly' ? '/mo' : ' total'), added: true });
      S.finance.needed = S.finance.needed.filter((x) => x.id !== n.id); save(); render(); toast('Amount saved');
    },
    cmdk: () => cmdk(),
    bot: () => botOpen(),
    botask: (el) => botSend(el.dataset.q),
    botsend: () => botSend(),
    theme: () => {
      const dark = document.documentElement.classList.toggle('dark');
      try { localStorage.setItem('jtflowops-theme', dark ? 'dark' : 'light'); } catch (e) { /* ignore */ }
      render();
    },
    collapse: () => document.body.classList.toggle('sidebar-collapsed'),
    mobnav: () => { document.body.classList.add('nav-open'); openOverlay(); },
    reset: () => modal('Reset demo data?', '<p style="font-size:13px">This puts every task, client and number back to the original sample data. Anything you changed in this browser is cleared.</p>',
      '<button class="btn" data-act="close">Cancel</button><button class="btn gold" data-act="reset2">Reset demo</button>'),
    reset2: () => { S = buildSeed(); shiftAll(S, diffDays(S.seededOn, todayISO())); S.seededOn = todayISO(); save(); closeAll(); render(); toast('Demo data restored'); },
    close: () => closeAll(),
  };
  function eventModal(id) {
    closeAll();
    const e = S.events.find((x) => x.id === id) || { id: '', title: '', date: todayISO(), type: 'Event', clientId: 'c0', time: '' };
    modal(id ? 'Edit event' : 'New event', `<label class="f">Title</label><input class="input" id="e_title" value="${esc(e.title)}">
      <div class="grid2"><div><label class="f">Date</label><input class="input" type="date" id="e_date" value="${esc(e.date)}"></div><div><label class="f">Time</label><input class="input" id="e_time" value="${esc(e.time || '')}" placeholder="10:00 AM"></div>
      <div><label class="f">Type</label><select class="input" id="e_type">${['Event', 'Deadline', 'Launch', 'Reminder'].map((t) => opt(t, t, e.type)).join('')}</select></div>
      <div><label class="f">Client</label><select class="input" id="e_client">${S.clients.map((c) => opt(c.id, c.name, e.clientId)).join('')}</select></div></div>`,
      `${id ? `<button class="btn danger" data-act="delevent" data-id="${id}" style="margin-right:auto">${ic('trash')}Delete</button>` : ''}<button class="btn" data-act="close">Cancel</button><button class="btn gold" data-act="saveevent" data-id="${id}">Save</button>`);
  }
  function checklistModal(id) {
    const k = S.checklists.find((x) => x.id === id); const t = tpl(k.templateId);
    modal(`${esc(t.name)} · ${esc((client(k.clientId) || {}).name || '')}`,
      `<div class="progress" style="margin:6px 0 4px"><span style="width:${(k.done.length / t.items.length) * 100}%"></span></div><div class="muted" style="font-size:12px;margin-bottom:6px">${k.done.length} of ${t.items.length} done</div>
      ${t.items.map((it, i) => `<label class="citem ${k.done.includes(i) ? 'done' : ''}" data-act="chkitem" data-id="${k.id}" data-i="${i}"><input type="checkbox" ${k.done.includes(i) ? 'checked' : ''} tabindex="-1"><span>${esc(it)}</span></label>`).join('')}`,
      '<button class="btn gold" data-act="close">Done</button>');
  }

  // ---------- events ----------
  function init() {
    let theme = 'dark';
    try { theme = localStorage.getItem('jtflowops-theme') || 'dark'; } catch (e) { /* ignore */ }
    document.documentElement.classList.toggle('dark', theme === 'dark');
    shell(); render();
    window.addEventListener('hashchange', () => { closeAll(); render(); window.scrollTo(0, 0); });
    document.addEventListener('click', (e) => {
      if (e.target.id === 'overlay') { closeAll(); return; }
      const el = e.target.closest('[data-act]');
      if (!el) { if (e.target.closest('.nav a')) closeAll(); return; }
      if (el.tagName === 'LABEL') e.preventDefault();
      const fn = A[el.dataset.act]; if (fn) { e.stopPropagation(); fn(el, e); }
    });
    document.addEventListener('input', (e) => {
      const f = e.target.dataset && e.target.dataset.filter;
      if (f === 'sop') { ui.sopQ = e.target.value; const pos = e.target.selectionStart; render(); const n = $('[data-filter="sop"]'); n.focus(); n.setSelectionRange(pos, pos); }
      else if (f === 'q') { ui.board.q = e.target.value; const pos = e.target.selectionStart; render(); const n = $('[data-filter="q"]'); n.focus(); n.setSelectionRange(pos, pos); }
      if (e.target.id === 'sugText') $('#sugCount').textContent = `${e.target.value.length}/2000`;
    });
    document.addEventListener('change', (e) => {
      const f = e.target.dataset && e.target.dataset.filter;
      if (f && f !== 'q' && f !== 'sop') { ui.board[f] = e.target.value; if (f === 'waiting' && location.hash.includes('?')) history.replaceState(null, '', '#/board'); render(); }
    });
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); closeAll(); cmdk(); }
      if (e.key === 'Escape') closeAll();
    });
  }
  init();
})();
