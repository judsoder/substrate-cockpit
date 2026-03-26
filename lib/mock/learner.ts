import type { SubstrateCockpit } from '../schema';

// Learner project cockpit — canonical real data as of Mar 26 2026.
// To update project state: edit this object only.

export const LEARNER_COCKPIT: SubstrateCockpit = {

  project_identity: {
    project_id: 'learner-v1',
    project_name: 'Learner',
    one_line_purpose: 'Adaptive diagnostic and evidence-fusion app for Max and Lev.',
    client_or_owner: 'Jud Soderborg',
    overall_status: 'active-work',
    last_verified_at: '2026-03-26T11:56:00-06:00',
    verified_by: 'Hermes',
    current_environment: 'mixed',
    active_agents: ['Jed', 'Hermes'],
    primary_human_owner: 'Jud Soderborg',
  },

  current_state: {
    state_items: [
      {
        id: 'state-home-about',
        label: 'Parent onboarding surface',
        status: 'verified',
        summary: 'Home page now explains the app in plain language and visibly routes parents to the About page.',
        verified_at: '2026-03-26T11:56:00-06:00',
        verified_by: 'Hermes',
        scope: 'workflow',
      },
      {
        id: 'state-evidence-upload',
        label: 'Evidence upload flow',
        status: 'verified',
        summary: 'Evidence upload now uses direct learner selection for Max and Lev instead of manual name lookup.',
        verified_at: '2026-03-26T10:39:00-06:00',
        verified_by: 'Hermes',
        scope: 'workflow',
      },
      {
        id: 'state-learner-route',
        label: 'Learner listing route',
        status: 'verified',
        summary: 'Dedicated /api/learners route exists and active GET consumers were migrated off /api/seed.',
        verified_at: '2026-03-26T10:44:00-06:00',
        verified_by: 'Hermes',
        scope: 'repo',
      },
      {
        id: 'state-hermes-env',
        label: 'Hermes machine readiness',
        status: 'blocked',
        summary: 'Hermes can typecheck and build locally, but full deployability is blocked by missing Supabase environment values on that machine.',
        verified_at: '2026-03-26T11:19:00-06:00',
        verified_by: 'Hermes',
        scope: 'env',
      },
    ],
    current_blockers: [
      'Supabase environment values are missing on Hermes mini.',
    ],
    current_assumptions: [
      'Existing production deployment remains stable while Hermes-side local improvements continue.',
    ],
    last_meaningful_change: 'Hermes improved parent discoverability from home to About after a sequence of bounded Learner fixes.',
  },

  authority_map: {
    actors: [
      { id: 'actor-jud', name: 'Jud', type: 'human', role: 'owner and countersignature authority' },
      { id: 'actor-jed', name: 'Jed', type: 'agent', role: 'strategy, review, and project interpretation' },
      { id: 'actor-hermes', name: 'Hermes', type: 'agent', role: 'bounded executor for Learner implementation and inspection' },
      { id: 'actor-hermes-mini', name: 'Hermes mini', type: 'machine', role: 'project-scoped execution environment' },
    ],
    allowed_actions: [
      'Inspect Learner repo and implementation state.',
      'Run local typecheck and build verification.',
      'Implement bounded fixes inside the Learner project.',
      'Push project-scoped Learner changes to git.',
    ],
    forbidden_actions: [
      'No personal browser/session inheritance by default.',
      'No unsupervised human or client messaging.',
      'No authority expansion without explicit approval.',
      'No unrelated production changes outside Learner scope.',
    ],
    requires_countersignature: [
      'Credential scope changes.',
      'Authority changes for Hermes.',
      'Client-visible production changes with meaningful user impact.',
      'Any messaging or trust-boundary change.',
    ],
    scoped_authorities: [
      { id: 'scope-git', actor_name: 'Hermes', authority: 'git push', scope: 'Learner project only' },
      { id: 'scope-vercel', actor_name: 'Hermes', authority: 'Vercel deploy', scope: 'Learner project only' },
    ],
    authority_notes: 'Hermes is operating here as a Tier 2 bounded executor: thorough, project-scoped, and non-ambient.',
  },

  resource_graph: {
    resources: [
      { id: 'res-repo', kind: 'repo', name: 'learner', provider: 'GitHub', environment: 'mixed', status: 'connected', source_of_truth: 'Hermes git push reports and repo history' },
      { id: 'res-deploy', kind: 'deploy', name: 'learner-flame.vercel.app', provider: 'Vercel', environment: 'production', status: 'connected', source_of_truth: 'Existing live deployment memory' },
      { id: 'res-db', kind: 'database', name: 'iniqozhjuhlzocdkkyvs', provider: 'Supabase', environment: 'production', status: 'connected', source_of_truth: 'Learner project memory and prior build context' },
      { id: 'res-hermes-local', kind: 'machine', name: 'Hermes mini local environment', provider: 'local', environment: 'local', status: 'partial', source_of_truth: 'Hermes report: missing env values for full deployability' },
      { id: 'res-jud-main', kind: 'machine', name: 'Jud main environment', provider: 'local', environment: 'mixed', status: 'connected', source_of_truth: 'Active working context' },
    ],
    machines: [
      { id: 'machine-hermes', name: 'Hermes mini', role: 'bounded implementation and verification', status: 'active' },
      { id: 'machine-jud', name: 'Jud main environment', role: 'strategy, review, approval', status: 'active' },
    ],
    environments: [
      { name: 'local', purpose: 'implementation and verification' },
      { name: 'production', purpose: 'live deployed experience' },
      { name: 'mixed', purpose: 'combined project view' },
    ],
    missing_resources: [
      'Complete Supabase environment bundle on Hermes mini.',
    ],
  },

  verified_actions: {
    actions: [
      {
        id: 'action-about-link',
        timestamp: '2026-03-26T11:56:00-06:00',
        actor: 'Hermes',
        action_type: 'fix',
        summary: 'Improved parent discoverability from home to the About page.',
        artifact: 'app/page.tsx',
        verification_status: 'reported',
      },
      {
        id: 'action-seed-cleanup',
        timestamp: '2026-03-26T11:25:00-06:00',
        actor: 'Hermes',
        action_type: 'fix',
        summary: 'Removed dead GET /api/seed path while preserving POST seeding behavior.',
        artifact: 'app/api/seed/route.ts',
        verification_status: 'reported',
      },
      {
        id: 'action-learners-route',
        timestamp: '2026-03-26T10:44:00-06:00',
        actor: 'Hermes',
        action_type: 'build',
        summary: 'Created dedicated /api/learners route and migrated active consumer usage.',
        artifact: 'app/api/learners/route.ts',
        verification_status: 'reported',
      },
      {
        id: 'action-evidence-upload',
        timestamp: '2026-03-26T10:39:00-06:00',
        actor: 'Hermes',
        action_type: 'fix',
        summary: 'Simplified evidence upload learner selection to direct Max/Lev toggles.',
        artifact: 'app/evidence/upload/page.tsx',
        verification_status: 'reported',
      },
      {
        id: 'action-authority-lock',
        timestamp: '2026-03-26T10:37:00-06:00',
        actor: 'Jed',
        action_type: 'update-authority',
        summary: 'Locked Hermes to project-scoped bounded execution rules for Learner work.',
        artifact: 'memory/2026-03-26.md',
        verification_status: 'verified',
      },
    ],
    handoff_note: 'Learner is paused after a strong bounded Hermes streak; next work should come from product priorities, not momentum alone.',
  },

  attention_items: {
    items: [
      {
        id: 'attention-env',
        title: 'Hermes deploy environment incomplete',
        type: 'blocker',
        severity: 'high',
        summary: 'Hermes mini cannot fully support Learner deploy workflows until Supabase environment values are present.',
        owner: 'Jud',
        next_step: 'Add the required Supabase environment values on Hermes mini during a dedicated machine session.',
        discovered_at: '2026-03-26T11:19:00-06:00',
      },
      {
        id: 'attention-seed-fallback',
        title: 'Seed fallback UX remains inelegant in edge states',
        type: 'risk',
        severity: 'low',
        summary: 'Some empty/error-state seed pathways are still awkward and should be revisited only if they show up in real use.',
        owner: 'Hermes',
        next_step: 'Leave alone for now; revisit only if it becomes visible product friction.',
        discovered_at: '2026-03-26T11:25:00-06:00',
      },
    ],
  },

  approval_queue: {
    approvals: [],
  },
};
