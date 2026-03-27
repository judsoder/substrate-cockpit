// Substrate Cockpit Schema v2
// Shaped by the real Learner project object, not abstract guesses.

// ── 1. Project Identity ─────────────────────────────────

export interface ProjectIdentity {
  project_id: string;
  project_name: string;
  one_line_purpose: string;
  client_or_owner: string;
  overall_status: 'stable' | 'active-work' | 'degraded' | 'down';
  last_verified_at: string;        // ISO timestamp
  verified_by: string;
  current_environment: 'local' | 'production' | 'mixed';
  active_agents: string[];
  primary_human_owner: string;
}

// ── 2. Current State ────────────────────────────────────

export type StateStatus = 'verified' | 'attention' | 'blocked' | 'neutral';
export type StateScope = 'workflow' | 'repo' | 'env' | 'deploy' | 'infra';

export interface StateItem {
  id: string;
  label: string;
  status: StateStatus;
  summary: string;
  verified_at: string;
  verified_by: string;
  scope: StateScope;
}

export interface CurrentState {
  state_items: StateItem[];
  current_blockers: string[];
  current_assumptions: string[];
  last_meaningful_change: string;
}

// ── 3. Authority Map ────────────────────────────────────

export type ActorType = 'human' | 'agent' | 'machine';

export interface Actor {
  id: string;
  name: string;
  type: ActorType;
  role: string;
}

export interface ScopedAuthority {
  id: string;
  actor_name: string;
  authority: string;
  scope: string;
}

export interface AuthorityMap {
  actors: Actor[];
  allowed_actions: string[];
  forbidden_actions: string[];
  requires_countersignature: string[];
  scoped_authorities: ScopedAuthority[];
  authority_notes: string;
}

// ── 4. Resource Graph ───────────────────────────────────

export type ResourceStatus = 'connected' | 'partial' | 'disconnected' | 'unknown';

export interface Resource {
  id: string;
  kind: string;
  name: string;
  provider: string;
  environment: string;
  status: ResourceStatus;
  source_of_truth: string;
}

export interface Machine {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'inactive' | 'degraded';
}

export interface Environment {
  name: string;
  purpose: string;
}

export interface ResourceGraph {
  resources: Resource[];
  machines: Machine[];
  environments: Environment[];
  missing_resources: string[];
}

// ── 5. Verified Actions ─────────────────────────────────

export type ActionType = 'fix' | 'build' | 'update-authority' | 'deploy' | 'review';
export type VerificationStatus = 'verified' | 'reported' | 'unverified';

export interface VerifiedAction {
  id: string;
  timestamp: string;
  actor: string;
  action_type: ActionType;
  summary: string;
  artifact: string;
  verification_status: VerificationStatus;
}

export interface VerifiedActions {
  actions: VerifiedAction[];
  handoff_note: string;
}

// ── 6. Attention Items ──────────────────────────────────

export type AttentionType = 'blocker' | 'risk' | 'unknown' | 'debt';
export type Severity = 'high' | 'medium' | 'low';

export interface AttentionItem {
  id: string;
  title: string;
  type: AttentionType;
  severity: Severity;
  summary: string;
  owner: string;
  next_step: string;
  discovered_at: string;
}

export interface AttentionItems {
  items: AttentionItem[];
}

// ── 7. Approval Queue ───────────────────────────────────

export interface ApprovalItem {
  id: string;
  type: string;
  text: string;
  requested_by: string;
  requested_at: string;
}

export interface ApprovalQueue {
  approvals: ApprovalItem[];
}

// ── 8. Substrate Quality ────────────────────────────────

export type FitScore = 1 | 2 | 3 | 4 | 5;
export type ConditioningStatus = 'raw' | 'partially-conditioned' | 'conditioned' | 'needs-rework';
export type UseMode = 'canonical' | 'reference' | 'context-only' | 'exclude';
export type AssetType = 'document' | 'spec' | 'example' | 'research' | 'transcript' | 'code' | 'data' | 'template' | 'memo' | 'other';

export interface SubstrateAsset {
  id: string;
  name: string;
  asset_type: AssetType;
  fit_score: FitScore | null; // null = not yet scored
  fit_rationale: string;       // why this score — the explanation IS the value
  conditioning_status: ConditioningStatus;
  conditioning_note: string;   // what was done or needs doing
  use_mode: UseMode;
  last_reviewed_at: string;    // ISO timestamp, empty string if never
  reviewed_by: string;
}

export type ImprovementAction = 'distill' | 'split' | 'add-header' | 'create' | 'merge' | 'rewrite' | 'exclude' | 'archive';
export type ImprovementPriority = 'now' | 'soon' | 'later';

export interface ImprovementItem {
  id: string;
  action: ImprovementAction;
  target: string;              // asset name or description of what to create
  rationale: string;
  priority: ImprovementPriority;
  assigned_to: string;
  completed: boolean;
}

export interface WeakSubstrateNote {
  id: string;
  description: string;         // what's missing or weak
  impact: string;              // why it matters for this project
  suggested_fix: string;       // what would help
}

export interface SubstrateQuality {
  assets: SubstrateAsset[];
  improvement_queue: ImprovementItem[];
  weak_substrate: WeakSubstrateNote[];
  last_audit_at: string;       // ISO timestamp
  last_audit_by: string;
  audit_note: string;          // freeform summary of substrate health
}

// ── Cockpit (top-level) ─────────────────────────────────

export interface SubstrateCockpit {
  project_identity: ProjectIdentity;
  current_state: CurrentState;
  authority_map: AuthorityMap;
  resource_graph: ResourceGraph;
  verified_actions: VerifiedActions;
  attention_items: AttentionItems;
  approval_queue: ApprovalQueue;
  substrate_quality: SubstrateQuality;
}
