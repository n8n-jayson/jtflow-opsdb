/* Demo data for the JT FlowOps dashboard.
   Every business, person and figure here is fictional sample data.
   Dates are written as day offsets from "today" so the demo never looks stale. */

function buildSeed() {
  const iso = (n) => {
    const x = new Date();
    x.setHours(12, 0, 0, 0);
    x.setDate(x.getDate() + n);
    const p = (v) => String(v).padStart(2, '0');
    return `${x.getFullYear()}-${p(x.getMonth() + 1)}-${p(x.getDate())}`;
  };

  const team = [
    { id: 'u1', name: 'Alex Rivera', initials: 'AR', title: 'Owner, strategy and client relationships', email: 'alex@demo-agency.com', role: 'Admin', status: 'Signed up', color: '#c9a24a' },
    { id: 'u2', name: 'Jayson Tolentino', initials: 'JT', title: 'Operations Manager', email: 'ops@demo-agency.com', role: 'Admin', status: 'Signed up', color: '#d2a648', me: true },
    { id: 'u3', name: 'Maya Chen', initials: 'MC', title: 'Video editor', email: 'maya@demo-agency.com', role: 'Viewer', status: 'Signed up', color: '#3b82f6' },
    { id: 'u4', name: 'Sam Okafor', initials: 'SO', title: 'GoHighLevel funnel builder', email: 'sam@demo-agency.com', role: 'Viewer', status: 'Signed up', color: '#22a06b' },
    { id: 'u5', name: 'Priya Nair', initials: 'PN', title: 'Social media manager', email: 'priya@demo-agency.com', role: 'Viewer', status: 'Signed up', color: '#a855f7' },
    { id: 'u6', name: 'Leo Santos', initials: 'LS', title: 'Copywriter', email: 'leo@demo-agency.com', role: 'Viewer', status: 'Invited', color: '#ef6c4a' },
    { id: 'u7', name: 'Ana Cruz', initials: 'AC', title: 'Virtual assistant, admin and scheduling', email: 'ana@demo-agency.com', role: 'Viewer', status: 'Signed up', color: '#14b8c4' },
    { id: 'u8', name: 'Ben Hart', initials: 'BH', title: 'Paid ads specialist', email: 'ben@demo-agency.com', role: 'Viewer', status: 'Invited', color: '#e5484d' },
  ];

  const clients = [
    { id: 'c1', name: 'Harbor Point Dental', contact: 'Dr. Lena Ortiz', location: 'San Diego, CA', status: 'Active', packageId: 'p2', next: 'Monthly report call', nextDate: iso(4) },
    { id: 'c2', name: 'Summit Ridge Roofing', contact: 'Mark Delaney', location: 'Denver, CO', status: 'Active', packageId: 'p1', next: 'Storm-season ads go live', nextDate: iso(6) },
    { id: 'c3', name: 'Bright Path Law', contact: 'Carla Benson', location: 'Austin, TX', status: 'Active', packageId: 'p5', next: 'Live seminar', nextDate: iso(9) },
    { id: 'c4', name: 'Luma Wellness Studio', contact: 'Jade Kim', location: 'Portland, OR', status: 'Onboarding', packageId: 'p3', next: 'Kickoff call', nextDate: iso(1) },
    { id: 'c5', name: 'Atlas Strength Gym', contact: 'Tony Reyes', location: 'Phoenix, AZ', status: 'Active', packageId: 'p4', next: 'Member win-back campaign', nextDate: iso(12) },
    { id: 'c6', name: 'Nova Skin Clinic', contact: 'Dr. Aisha Patel', location: 'Miami, FL', status: 'Active', packageId: 'p2', next: 'New offer landing page', nextDate: iso(3) },
    { id: 'c7', name: 'Cedar & Oak Realty', contact: 'Grace Whitman', location: 'Nashville, TN', status: 'Prospect', packageId: 'p1', next: 'Proposal follow-up', nextDate: iso(2) },
    { id: 'c8', name: 'Kindred Coaching', contact: 'Daniel Park', location: 'Remote', status: 'Prospect', packageId: 'p6', next: 'Discovery call', nextDate: iso(5) },
    { id: 'c9', name: 'Greenline Landscaping', contact: 'Rosa Martinez', location: 'Sacramento, CA', status: 'Paused', packageId: 'p1', next: 'Resumes in spring', nextDate: iso(70) },
    { id: 'c10', name: 'Riverbend Bakery', contact: 'Holly Fisher', location: 'Asheville, NC', status: 'Goodwill', packageId: 'p6', next: 'Holiday menu page', nextDate: iso(15) },
    { id: 'c11', name: 'Peak Physio Co.', contact: 'Owen Clarke', location: 'Boise, ID', status: 'Active', packageId: 'p4', next: 'Review request rollout', nextDate: iso(8) },
    { id: 'c0', name: 'Internal', contact: 'Agency team', location: '', status: 'Internal', packageId: null, next: 'Weekly team sync', nextDate: iso(2) },
  ];

  const packages = [
    { id: 'p1', cat: 'Home services', name: 'Home Services Growth Engine', price: '$1,500/mo', desc: 'Lead flow for roofers, landscapers and contractors: ads, a quote funnel and fast follow-up.', items: 'Meta and Google lead ads; quote request funnel; missed-call text back; 5-minute speed-to-lead workflow; monthly report.' },
    { id: 'p2', cat: 'Clinics and wellness', name: 'Patient Lead Engine', price: '$1,800/mo', desc: 'New-patient funnel with booking, reminders and review requests, built in GoHighLevel.', items: 'Offer landing page; online booking calendar; SMS and email reminders; no-show follow-up; review request after visit.' },
    { id: 'p3', cat: 'Clinics and wellness', name: 'Social Media Management', price: '$1,200/mo', desc: 'Organic content planned, edited, approved and scheduled two weeks ahead.', items: '12 posts and 8 short videos a month; content calendar; client view-only access; monthly social report.' },
    { id: 'p4', cat: 'Automation', name: 'CRM and Automation Retainer', price: '$900/mo', desc: 'Ongoing GoHighLevel and n8n support: new workflows, fixes and clean data.', items: 'Up to 10 build hours a month; pipeline and tag hygiene; workflow QA; A2P and deliverability checks.' },
    { id: 'p5', cat: 'Funnels', name: 'Seminar Funnel System', price: '$2,500 setup + $1,000/mo', desc: 'Live or webinar event funnel for professional services, run end to end.', items: 'Registration and confirmation pages; email and SMS reminders; waitlist; post-event follow-up; reusable template.' },
    { id: 'p6', cat: 'Funnels', name: 'Website and Funnel Build', price: '$1,800 one-time', desc: 'Fast, mobile-first site or funnel with CRM hookup and tracking.', items: 'Up to 5 pages; forms into the CRM; pixel and analytics setup; 30 days of fixes after launch.' },
  ];

  // status: todo | progress | waiting | approval | revision | done
  const T = (id, title, status, clientId, assigneeId, due, priority, waitingOn, details) => ({
    id, title, status, clientId, assigneeId, due: due === null ? '' : iso(due), priority: priority || 'medium',
    waitingOn: waitingOn || '', details: details || '', links: { raw: '', review: status === 'approval' ? 'https://example.com/review' : '', final: '' },
    approval: status === 'approval' ? { submitted: iso(0), by: assigneeId } : null,
  });

  const tasks = [
    T('t1', 'Build the storm-season quote funnel', 'progress', 'c2', 'u4', 1, 'high', '', 'Two-step form: address first, then roof type. Push into the Roofing pipeline, stage New Lead.'),
    T('t2', 'Approve ad angles for storm season', 'waiting', 'c2', 'u8', 2, 'high', 'Alex', 'Three angles drafted: free inspection, insurance help, financing.'),
    T('t3', 'Seminar reminder emails 1 to 4', 'progress', 'c3', 'u6', 3, 'medium', '', 'Day-7, day-3, day-1 and 2-hour reminders. Parking details in every email.'),
    T('t4', 'Confirm seminar venue capacity', 'waiting', 'c3', 'u2', 0, 'high', 'Carla (client)', 'Registrations are close to the room limit. Need the final seat count before we open a waitlist.'),
    T('t5', 'Set up waitlist workflow for the seminar', 'todo', 'c3', 'u4', 4, 'medium'),
    T('t6', 'Kickoff call agenda and intake form', 'progress', 'c4', 'u2', 0, 'high', '', 'Brand assets, platform logins, posting goals, approval contact.'),
    T('t7', 'Collect Instagram and Facebook partner access', 'waiting', 'c4', 'u5', 2, 'medium', 'Jade (client)'),
    T('t8', 'Two-week content calendar draft', 'todo', 'c4', 'u5', 6, 'medium'),
    T('t9', 'Member win-back email sequence', 'todo', 'c5', 'u6', 8, 'medium'),
    T('t10', 'Fix duplicate contacts from calendar sync', 'done', 'c5', 'u4', -3, 'high', '', 'Calendar was syncing both ways and creating contacts from invites. Set to one-way, merged duplicates.'),
    T('t11', 'New offer landing page: HydraGlow facial', 'progress', 'c6', 'u4', 2, 'high'),
    T('t12', 'Before and after reel, 30 seconds', 'approval', 'c6', 'u3', 0, 'medium', '', 'Captions burned in, 9:16. Client consent forms on file.'),
    T('t13', 'Review request SMS after appointments', 'revision', 'c6', 'u4', 1, 'medium', '', 'Client wants the Google link only, no Yelp.'),
    T('t14', 'Proposal: Cedar & Oak Realty', 'waiting', 'c7', 'u1', 1, 'high', 'Alex', 'Draft is ready. Alex to confirm pricing before it goes out.'),
    T('t15', 'Discovery call prep: Kindred Coaching', 'todo', 'c8', 'u2', 4, 'low'),
    T('t16', 'Holiday menu page', 'todo', 'c10', 'u4', 13, 'low'),
    T('t17', 'Physio review request rollout', 'progress', 'c11', 'u4', 5, 'medium'),
    T('t18', 'Patient testimonial edit', 'approval', 'c11', 'u3', -1, 'medium'),
    T('t19', 'Monthly report: Harbor Point Dental', 'todo', 'c1', 'u2', 3, 'medium'),
    T('t20', 'No-show follow-up workflow QA', 'done', 'c1', 'u4', -2, 'medium'),
    T('t21', 'Swap booking calendar to new hygienist hours', 'waiting', 'c1', 'u7', -1, 'medium', 'Dr. Ortiz (client)'),
    T('t22', 'Weekly team sync agenda', 'todo', 'c0', 'u2', 2, 'low'),
    T('t23', 'Interview social media VA candidates', 'progress', 'c0', 'u2', 0, 'medium'),
    T('t24', 'Update the creative QA SOP', 'todo', 'c0', 'u2', 5, 'low'),
    T('t25', 'Decide on the client reporting template', 'waiting', 'c0', 'u1', 3, 'medium', 'Alex'),
    T('t26', 'A2P 10DLC registration for Peak Physio', 'waiting', 'c11', 'u2', -2, 'high', 'Carrier review', 'Brand approved. Campaign submitted, waiting on carrier vetting.'),
    T('t27', 'Retarget website visitors, 30-day audience', 'todo', 'c2', 'u8', 7, 'medium'),
    T('t28', 'Clean up pipeline stages and tags', 'done', 'c2', 'u4', -5, 'low'),
    T('t29', 'Short clips from the gym promo shoot', 'progress', 'c5', 'u3', 2, 'medium'),
    T('t30', 'Thank-you page and calendar link check', 'done', 'c3', 'u4', -4, 'medium'),
    T('t31', 'Upload October invoices to the finance folder', 'done', 'c0', 'u7', -6, 'low'),
    T('t32', 'Pricing for the social media package', 'waiting', 'c0', 'u1', 6, 'medium', 'Alex'),
    T('t33', 'Write onboarding welcome email', 'done', 'c4', 'u6', -1, 'medium'),
    T('t34', 'Pixel and conversion tracking check', 'todo', 'c6', 'u8', 9, 'medium'),
    T('t35', 'Holiday hours auto-reply', 'todo', 'c1', 'u7', 10, 'low'),
    T('t36', 'Seminar slide deck design', 'waiting', 'c3', 'u3', 5, 'medium', 'Carla (client)'),
    T('t37', 'Quarterly results summary for Alex', 'todo', 'c0', 'u2', 11, 'low'),
    T('t38', 'Video testimonial shoot schedule', 'done', 'c11', 'u7', -7, 'low'),
  ];

  const events = [
    { id: 'e1', date: iso(0), title: 'Check the weekend lead report', type: 'Reminder', clientId: 'c2', time: '9:00 AM' },
    { id: 'e2', date: iso(1), title: 'Luma Wellness kickoff call', type: 'Event', clientId: 'c4', time: '10:00 AM' },
    { id: 'e3', date: iso(6), title: 'Storm-season ads go live', type: 'Launch', clientId: 'c2' },
    { id: 'e4', date: iso(9), title: 'Bright Path Law live seminar', type: 'Event', clientId: 'c3', time: '6:00 PM' },
    { id: 'e5', date: iso(3), title: 'HydraGlow page due to client', type: 'Deadline', clientId: 'c6' },
    { id: 'e6', date: iso(14), title: 'Luma Wellness socials go live', type: 'Launch', clientId: 'c4' },
    { id: 'e7', date: iso(-2), title: 'Month-end invoicing', type: 'Deadline', clientId: 'c0' },
    { id: 'e8', date: iso(2), title: 'Weekly team sync', type: 'Event', clientId: 'c0', time: '8:30 AM' },
    { id: 'e9', date: iso(-6), title: 'Peak Physio testimonial shoot', type: 'Event', clientId: 'c11' },
    { id: 'e10', date: iso(12), title: 'Gym win-back campaign launch', type: 'Launch', clientId: 'c5' },
  ];

  const sops = [
    { id: 's1', cat: 'Onboarding', title: 'Taking on a new client', owner: 'Jayson', summary: 'From the signed agreement to day 14: access, kickoff, build, review and go-live, with one owner per step.',
      steps: ['Send the welcome email and intake form the same day the agreement is signed.', 'Create the client folder, the GHL sub-account and the board card.', 'Collect platform access: Meta partner access, Google Business, domain and DNS.', 'Hold the kickoff call. Confirm goals, offer, approval contact and go-live date.', 'Build, then run the pre-launch checklist before anything is shown to the client.', 'Client review. Log every change request on the board, never in DMs.', 'Go live, then check daily for the first 14 days.'] },
    { id: 's2', cat: 'Onboarding', title: 'Client-facing onboarding guide', owner: 'Jayson', summary: 'The document we send new clients: what we need from them, how approvals and revisions work, and what happens after launch.',
      steps: ['What we need from you in week 1.', 'How to approve work: one approver, 48-hour turnaround.', 'Revisions: two rounds included, batched in one message.', 'How to reach us and response times.', 'What reporting looks like each month.'] },
    { id: 's3', cat: 'Launch', title: 'Pre-launch checklist: funnels and campaigns', owner: 'Jayson', summary: 'Run before any funnel, event or campaign goes live, and again after any change to its forms or workflows.',
      steps: ['Submit every form with a test contact and confirm it lands in the right pipeline stage.', 'Check every email and SMS: links, merge fields, sender name, unsubscribe.', 'Confirm the calendar shows the right time zone and availability.', 'Check the page on a phone: speed, buttons, spelling.', 'Confirm tracking: pixel, conversion event, UTM on ad links.', 'Turn off test workflows and delete test contacts.'] },
    { id: 's4', cat: 'Quality', title: 'Creative check before a post is scheduled', owner: 'Jayson', summary: 'Every post passes this check before it goes into the scheduler: words, claims, details and the video itself.',
      steps: ['Spelling, names and dates match the brief.', 'No claims we cannot back up (results, prices, guarantees).', 'Captions are readable on a phone and safe-zone friendly.', 'Correct aspect ratio for each platform.', 'The editor checks first, the person scheduling checks again.'] },
    { id: 's5', cat: 'Compliance', title: 'A2P 10DLC texting registration', owner: 'Jayson', summary: 'Register a client for business texting so messages are not blocked by carriers.',
      steps: ['Get the EIN letter and the exact legal business name.', 'Register the brand in the client sub-account.', 'Write the campaign use case with sample messages and opt-in wording.', 'Add the opt-in checkbox and privacy wording to every form that collects phone numbers.', 'Submit and track carrier review on the board.'] },
    { id: 's6', cat: 'Reporting', title: 'Monthly client report', owner: 'Jayson', summary: 'One page per client: leads, booked calls, cost per lead, what we changed and what is next.',
      steps: ['Pull numbers on the 1st business day.', 'Compare with last month and the target.', 'Write three bullets: what worked, what did not, what we change.', 'Send by the 3rd business day and log it on the board.'] },
  ];

  const checklistTemplates = [
    { id: 'ct1', name: 'New client onboarding', items: ['Agreement signed and package confirmed in writing', 'Welcome email and intake form sent', 'Client folder created', 'GHL sub-account created', 'Board card and tasks created', 'Meta partner access granted', 'Google Business access granted', 'Domain and DNS access confirmed', 'Kickoff call held', 'Go-live date agreed', 'Approval contact named', 'First invoice sent'] },
    { id: 'ct2', name: 'Funnel go-live', items: ['Test contact submitted on every form', 'Pipeline stage correct', 'Emails and SMS checked', 'Calendar time zone checked', 'Mobile check done', 'Pixel and conversion event firing', 'UTMs on ad links', 'Test contacts deleted', 'Client sign-off received', 'Day-1 check booked'] },
  ];
  const checklists = [
    { id: 'k1', templateId: 'ct1', clientId: 'c4', done: [0, 1, 2, 3, 4] },
    { id: 'k2', templateId: 'ct2', clientId: 'c2', done: [0, 1, 2] },
    { id: 'k3', templateId: 'ct2', clientId: 'c6', done: [] },
    { id: 'k4', templateId: 'ct1', clientId: 'c11', done: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  ];

  // Finance: monthly recurring revenue for the last 12 months, plus payments.
  const mrrHistory = [3200, 3800, 4400, 4400, 5600, 6300, 6300, 7400, 8100, 8900, 9600, 10400];
  const payments = [4100, 4300, 5200, 4900, 6400, 7100, 6900, 8200, 8800, 9500, 10200, 11300];
  const revenue = [
    { clientId: 'c3', pkg: 'Seminar Funnel System', type: 'Recurring', amount: '$1,000/mo' },
    { clientId: 'c2', pkg: 'Home Services Growth Engine', type: 'Recurring', amount: '$1,500/mo' },
    { clientId: 'c1', pkg: 'Patient Lead Engine', type: 'Recurring', amount: '$1,800/mo' },
    { clientId: 'c6', pkg: 'Patient Lead Engine', type: 'Recurring', amount: '$1,800/mo' },
    { clientId: 'c5', pkg: 'CRM and Automation Retainer', type: 'Recurring', amount: '$900/mo' },
    { clientId: 'c11', pkg: 'CRM and Automation Retainer', type: 'Recurring', amount: '$900/mo' },
    { clientId: 'c4', pkg: 'Social Media Management', type: 'Recurring', amount: '$1,200/mo' },
    { clientId: 'c3', pkg: 'Seminar Funnel System setup', type: 'One-time', amount: '$2,500 total' },
    { clientId: 'c10', pkg: 'Website and Funnel Build', type: 'Goodwill', amount: '$0' },
  ];
  const reviewQueue = [
    { id: 'r1', text: 'Luma Wellness asked to start at 8 posts a month instead of 12 for the first two months, at $900/mo, then move to the full package.', clientId: 'c4', amount: '$900', source: 'Email from the client, 2 days ago', note: 'Suggested: accept, with the full package starting in month 3 written into the agreement.' },
    { id: 'r2', text: 'Cedar & Oak Realty wants the growth engine without the Google ads part. Proposed price: $1,200/mo.', clientId: 'c7', amount: '$1,200', source: 'Discovery call notes, yesterday', note: 'Margin is still fine at this price. Needs Alex to approve.' },
  ];
  const needed = [
    { id: 'n1', title: 'Holiday menu page', clientId: 'c10', freq: 'One-time' },
    { id: 'n2', title: 'Discovery and strategy session', clientId: 'c8', freq: 'One-time' },
    { id: 'n3', title: 'Review request add-on', clientId: 'c1', freq: 'Monthly' },
    { id: 'n4', title: 'Extra short-video pack', clientId: 'c5', freq: 'Monthly' },
  ];

  const suggestions = [
    { id: 'sg1', by: 'u3', text: 'Could the board show how many revision rounds a video has been through?', date: iso(-3) },
    { id: 'sg2', by: 'u7', text: 'A quick filter for "waiting on client" would save me time on Mondays.', date: iso(-1) },
  ];

  return {
    version: 1, seededOn: iso(0),
    team, clients, packages, tasks, events, sops, checklistTemplates, checklists,
    finance: { mrrHistory, payments, revenue, reviewQueue, needed, recorded: [] },
    suggestions,
  };
}
