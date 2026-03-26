import { SubstrateCockpit } from '../schema';

// Learner project cockpit — current as of Mar 26 2026
// To update project state: edit this object, not the page components.

export const LEARNER_COCKPIT: SubstrateCockpit = {

  project_identity: {
    name: 'Learner',
    purpose: 'Adaptive diagnostic + evidence fusion for Max and Lev',
    status: 'stable',
    last_verified: '11:24 AM',
    owner: 'Jud',
    environment: 'Local + Vercel',
    repo: 'judsoder/learner',
    agents: [
      { name: 'Hermes', role: 'bounded operator' },
      { name: 'Jed', role: 'advisor' },
    ],
  },

  current_state: [
    { status: 'verified', text: 'Repo synced to latest bounded fixes' },
    { status: 'verified', text: 'Home → About discoverability improved' },
    { status: 'verified', text: 'Evidence upload flow simplified' },
    { status: 'verified', text: '/api/learners route live, /api/seed GET removed' },
    { status: 'blocked', text: 'Deploy blocked — missing Supabase env on Hermes mini' },
    { status: 'neutral', text: 'No unverified production changes' },
  ],

  authority_map: {
    allowed: [
      'Bounded repo work, tests, build verification, project-scoped deploys',
    ],
    forbidden: [
      'Personal browser sessions, broad messaging, money movement, credential creation',
    ],
    requires_approval: [
      'Prod release, credential changes, messaging authority, new resource connections',
    ],
  },

  resource_graph: [
    { kind: 'GitHub', value: 'judsoder/learner', status: 'verified' },
    { kind: 'Vercel', value: 'learner-flame', status: 'attention' },
    { kind: 'Supabase', value: 'connected', status: 'verified' },
    { kind: 'Domain', value: 'learner-flame.vercel.app', status: 'neutral' },
    { kind: 'Env', value: 'incomplete — Hermes mini', status: 'blocked' },
    { kind: 'Machines', value: 'Jud mini · Hermes mini', status: 'neutral' },
  ],

  verified_actions: [
    { agent: 'Hermes', text: 'Improved home → about discoverability for parents' },
    { agent: 'Hermes', text: 'Removed dead GET /api/seed export' },
    { agent: 'Hermes', text: 'Introduced dedicated /api/learners route' },
    { agent: 'Hermes', text: 'Simplified evidence upload learner selection' },
    { agent: 'Jed', text: 'Updated Hermes authority rules and operator scope' },
  ],

  attention_items: [
    { severity: 'blocked', text: 'Supabase env vars missing on Hermes mini — blocks all deploys and server-rendered pages' },
    { severity: 'attention', text: 'Three seed-link fallbacks now return 405 — low urgency, empty-state only' },
    { severity: 'attention', text: 'Prod deploy verification pending once env is restored' },
    { severity: 'neutral', text: 'Question bank limited to ~20 items per domain — CAT precision ceiling' },
  ],

  approval_queue: [
    { type: 'credential', text: 'Configure Supabase env vars on Hermes mini' },
    { type: 'deploy', text: 'Deploy Learner to Vercel production' },
    { type: 'authority', text: 'Expand Hermes authority for practice-loop feature work' },
  ],
};
