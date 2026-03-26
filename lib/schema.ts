// Substrate Cockpit Schema v1
// One canonical object drives the entire cockpit UI.
// A future agent updates project state by editing the mock/data file,
// not by editing component markup.

export type Status = 'verified' | 'attention' | 'blocked' | 'neutral';

// ── 1. Project Identity ─────────────────────────────────

export interface ProjectIdentity {
  name: string;
  purpose: string;
  status: 'stable' | 'active' | 'degraded' | 'down';
  last_verified: string;           // human-readable timestamp
  owner: string;
  environment: string;
  repo: string;
  agents: AgentAssignment[];
}

export interface AgentAssignment {
  name: string;
  role: string;
}

// ── 2. Current State ────────────────────────────────────

export interface StateItem {
  status: Status;
  text: string;
}

// ── 3. Authority Map ────────────────────────────────────

export interface AuthorityMap {
  allowed: string[];               // what agents CAN do
  forbidden: string[];             // what agents CANNOT do
  requires_approval: string[];     // what needs human sign-off
}

// ── 4. Resource Graph ───────────────────────────────────

export interface Resource {
  kind: string;                    // "GitHub", "Vercel", "Supabase", etc.
  value: string;                   // "judsoder/learner", "connected", etc.
  status: Status;
}

// ── 5. Verified Actions ─────────────────────────────────

export interface VerifiedAction {
  agent: string;
  text: string;
}

// ── 6. Attention Items ──────────────────────────────────

export interface AttentionItem {
  severity: 'blocked' | 'attention' | 'neutral';
  text: string;
}

// ── 7. Approval Queue ───────────────────────────────────

export type ApprovalType = 'credential' | 'deploy' | 'authority' | 'resource';

export interface ApprovalItem {
  type: ApprovalType;
  text: string;
}

// ── Cockpit (top-level) ─────────────────────────────────

export interface SubstrateCockpit {
  project_identity: ProjectIdentity;
  current_state: StateItem[];
  authority_map: AuthorityMap;
  resource_graph: Resource[];
  verified_actions: VerifiedAction[];
  attention_items: AttentionItem[];
  approval_queue: ApprovalItem[];
}
