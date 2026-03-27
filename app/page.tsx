// Substrate Cockpit — renders from a single canonical schema object.
// To update content: edit lib/mock/learner.ts only.

import { LEARNER_COCKPIT } from '@/lib/mock/learner';
import type {
  SubstrateCockpit, ProjectIdentity, CurrentState, StateItem,
  AuthorityMap, Actor, ResourceGraph, Resource, Machine,
  VerifiedActions, VerifiedAction, AttentionItems, AttentionItem,
  ApprovalQueue, ApprovalItem,
  SubstrateQuality, SubstrateAsset, ImprovementItem, WeakSubstrateNote,
} from '@/lib/schema';

const cockpit: SubstrateCockpit = LEARNER_COCKPIT;

// ── Status mapping helpers ───────────────────────────────

function statusDot(s: string): string {
  const map: Record<string, string> = {
    verified: 'green', connected: 'green', active: 'green',
    attention: 'amber', partial: 'amber', 'active-work': 'green',
    blocked: 'red', disconnected: 'red', degraded: 'amber',
    neutral: 'neutral', unknown: 'neutral', inactive: 'neutral',
  };
  return map[s] || 'neutral';
}

function statusBadge(s: string): string {
  const map: Record<string, string> = {
    stable: 'badge-green', 'active-work': 'badge-green',
    degraded: 'badge-amber', down: 'badge-red',
  };
  return map[s] || 'badge-neutral';
}

function statusLabel(s: string): string {
  return s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function shortTime(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  } catch { return iso; }
}

function shortDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + ' ' + shortTime(iso);
  } catch { return iso; }
}

const SEVERITY_DOT: Record<string, string> = { high: 'red', medium: 'amber', low: 'neutral' };
const TYPE_BADGE: Record<string, string> = { blocker: 'badge-red', risk: 'badge-amber', unknown: 'badge-neutral', debt: 'badge-neutral' };
const ACTION_BADGE: Record<string, string> = { fix: 'badge-green', build: 'badge-green', 'update-authority': 'badge-amber', deploy: 'badge-green', review: 'badge-neutral' };
const VERIFY_DOT: Record<string, string> = { verified: 'green', reported: 'amber', unverified: 'neutral' };

export default function CockpitPage() {
  const { project_identity: p, current_state, authority_map, resource_graph, verified_actions, attention_items, approval_queue, substrate_quality } = cockpit;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 64px' }}>

      <Header identity={p} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
        <CurrentStateCard state={current_state} />
        <AuthorityCard map={authority_map} />
        <ResourceCard graph={resource_graph} />
        <TraceCard actions={verified_actions} />
        <AttentionCard items={attention_items} />
        <ApprovalCard queue={approval_queue} />
      </div>

      {/* Substrate Quality — full width below the grid */}
      <SubstrateQualityCard quality={substrate_quality} />
    </div>
  );
}


/* ━━━ 1. HEADER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function Header({ identity }: { identity: ProjectIdentity }) {
  return (
    <header style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' }}>
            {identity.project_name}
          </h1>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            {identity.one_line_purpose}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className={`badge ${statusBadge(identity.overall_status)}`}>
            {statusLabel(identity.overall_status)}
          </span>
          <span className="mono" style={{ fontSize: '10px', color: 'var(--text-faint)' }}>
            Verified {shortTime(identity.last_verified_at)} by {identity.verified_by}
          </span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
        <MetaLabel label="Owner" value={identity.primary_human_owner} />
        <MetaLabel label="Env" value={identity.current_environment} />
        <MetaLabel label="Agents" value={identity.active_agents.join(' · ')} />
      </div>
    </header>
  );
}


/* ━━━ 2. CURRENT STATE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function CurrentStateCard({ state }: { state: CurrentState }) {
  return (
    <Card icon="◉" title="Current State">
      {state.state_items.map(item => (
        <div key={item.id} className="row-item" style={{ flexDirection: 'column', gap: '2px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`dot dot-${statusDot(item.status)}`} />
            <span style={{ fontWeight: 500, fontSize: '12.5px', color: 'var(--text-primary)' }}>{item.label}</span>
            <span className="badge badge-neutral" style={{ fontSize: '9px', height: '16px', padding: '0 5px' }}>{item.scope}</span>
          </div>
          <div style={{ paddingLeft: '14px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {item.summary}
          </div>
        </div>
      ))}

      {state.current_blockers.length > 0 && (
        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
          <div className="label" style={{ marginBottom: '6px', color: 'var(--red)' }}>Blockers</div>
          {state.current_blockers.map((b, i) => (
            <div key={i} style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', gap: '6px', marginBottom: '2px' }}>
              <span className="dot dot-red" style={{ marginTop: '5px' }} />
              {b}
            </div>
          ))}
        </div>
      )}

      {/* Secondary: assumptions + last meaningful change */}
      {(state.current_assumptions.length > 0 || state.last_meaningful_change) && (
        <details className="detail-toggle">
          <summary>Assumptions & context</summary>
          <div className="detail-body">
            {state.current_assumptions.map((a, i) => (
              <div key={i} style={{ marginBottom: '4px' }}>{a}</div>
            ))}
            {state.last_meaningful_change && (
              <div style={{ marginTop: '6px', color: 'var(--text-muted)' }}>
                Last change: {state.last_meaningful_change}
              </div>
            )}
          </div>
        </details>
      )}
    </Card>
  );
}


/* ━━━ 3. AUTHORITY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function AuthorityCard({ map }: { map: AuthorityMap }) {
  return (
    <Card icon="◈" title="Authority & Boundaries">
      {map.allowed_actions.map((text, i) => (
        <div key={`a${i}`} className="auth-row">
          <span className="auth-scope" style={{ color: 'var(--green)' }}>CAN</span>
          <span style={{ color: 'var(--text-secondary)' }}>{text}</span>
        </div>
      ))}
      {map.forbidden_actions.map((text, i) => (
        <div key={`f${i}`} className="auth-row">
          <span className="auth-scope" style={{ color: 'var(--red)' }}>CANNOT</span>
          <span style={{ color: 'var(--text-secondary)' }}>{text}</span>
        </div>
      ))}
      {map.requires_countersignature.map((text, i) => (
        <div key={`r${i}`} className="auth-row">
          <span className="auth-scope" style={{ color: 'var(--amber)' }}>NEEDS</span>
          <span style={{ color: 'var(--text-secondary)' }}>{text}</span>
        </div>
      ))}

      {/* Scoped authorities */}
      {map.scoped_authorities.length > 0 && (
        <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
          <div className="label" style={{ marginBottom: '6px' }}>Scoped Authorities</div>
          {map.scoped_authorities.map(sa => (
            <div key={sa.id} style={{ display: 'flex', gap: '8px', fontSize: '11.5px', color: 'var(--text-secondary)', marginBottom: '3px' }}>
              <span className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{sa.actor_name}</span>
              <span>{sa.authority}</span>
              <span style={{ color: 'var(--text-faint)' }}>→ {sa.scope}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actors */}
      <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid var(--border)', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {map.actors.map(a => (
          <ActorTag key={a.id} actor={a} />
        ))}
      </div>

      {map.authority_notes && (
        <details className="detail-toggle">
          <summary>Authority notes</summary>
          <div className="detail-body" style={{ fontStyle: 'italic' }}>
            {map.authority_notes}
          </div>
        </details>
      )}
    </Card>
  );
}


/* ━━━ 4. RESOURCES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ResourceCard({ graph }: { graph: ResourceGraph }) {
  return (
    <Card icon="⬡" title="Connected Resources">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '10px' }}>
        {graph.resources.map(r => (
          <div key={r.id} className="chip">
            <span className="chip-label">{r.provider}</span>
            <span style={{ color: 'var(--text-primary)', fontSize: '11.5px' }}>{r.name}</span>
            <span className={`dot dot-${statusDot(r.status)}`} />
          </div>
        ))}
      </div>

      {graph.machines.length > 0 && (
        <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
          <div className="label" style={{ marginBottom: '6px' }}>Machines</div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {graph.machines.map(m => (
              <div key={m.id} className="chip">
                <span className={`dot dot-${statusDot(m.status)}`} />
                <span style={{ color: 'var(--text-primary)', fontSize: '11.5px' }}>{m.name}</span>
                <span className="chip-label">{m.role}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {graph.missing_resources.length > 0 && (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid var(--border)' }}>
          <div className="label" style={{ marginBottom: '4px', color: 'var(--red)' }}>Missing</div>
          {graph.missing_resources.map((m, i) => (
            <div key={i} style={{ fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', gap: '6px' }}>
              <span className="dot dot-red" style={{ marginTop: '5px' }} />
              {m}
            </div>
          ))}
        </div>
      )}

      {/* Secondary: environments + source of truth */}
      <details className="detail-toggle">
        <summary>Environments & provenance</summary>
        <div className="detail-body">
          {graph.environments.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              {graph.environments.map((e, i) => (
                <div key={i}><span style={{ color: 'var(--text-muted)' }}>{e.name}</span> — {e.purpose}</div>
              ))}
            </div>
          )}
          {graph.resources.filter(r => r.source_of_truth).map(r => (
            <div key={r.id} style={{ marginBottom: '3px' }}>
              <span style={{ color: 'var(--text-muted)' }}>{r.name}</span>: {r.source_of_truth}
            </div>
          ))}
        </div>
      </details>
    </Card>
  );
}


/* ━━━ 5. TRACE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function TraceCard({ actions }: { actions: VerifiedActions }) {
  // Primary: most recent 2 actions. Secondary: the rest.
  const PRIMARY_COUNT = 2;
  const primary = actions.actions.slice(0, PRIMARY_COUNT);
  const earlier = actions.actions.slice(PRIMARY_COUNT);

  return (
    <Card icon="▸" title="Recent Verified Actions">
      {/* Primary: latest high-signal actions */}
      {primary.map(a => (
        <TraceRow key={a.id} action={a} />
      ))}

      {/* Secondary: earlier actions, visibly reachable */}
      {earlier.length > 0 && (
        <details className="detail-toggle">
          <summary>Earlier actions ({earlier.length})</summary>
          <div className="detail-body" style={{ paddingLeft: '0' }}>
            {earlier.map(a => (
              <TraceRow key={a.id} action={a} muted />
            ))}
          </div>
        </details>
      )}

      {/* Handoff: distinct posture statement, not floating editorial */}
      {actions.handoff_note && (
        <div style={{
          marginTop: '12px',
          padding: '8px 10px',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          fontSize: '11px',
          color: 'var(--text-muted)',
          lineHeight: 1.5,
          display: 'flex',
          gap: '8px',
          alignItems: 'flex-start',
        }}>
          <span style={{ color: 'var(--text-faint)', flexShrink: 0, fontSize: '10px', marginTop: '1px' }}>⏸</span>
          <span>{actions.handoff_note}</span>
        </div>
      )}
    </Card>
  );
}

function TraceRow({ action: a, muted = false }: { action: VerifiedAction; muted?: boolean }) {
  return (
    <div className="trace" style={muted ? { opacity: 0.7 } : undefined}>
      <span className="trace-agent">{a.actor}</span>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>{a.summary}</span>
        </div>
        <div style={{ display: 'flex', gap: '8px', marginTop: '2px' }}>
          <span className="mono" style={{ fontSize: '9.5px', color: 'var(--text-faint)' }}>{a.artifact}</span>
          <span className={`dot dot-${VERIFY_DOT[a.verification_status]}`} style={{ width: '5px', height: '5px', marginTop: '4px' }} />
          <span style={{ fontSize: '9.5px', color: 'var(--text-faint)' }}>{shortDate(a.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}


/* ━━━ 6. ATTENTION ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function AttentionCard({ items }: { items: AttentionItems }) {
  const primary = items.items.filter(i => i.severity === 'high');
  const watching = items.items.filter(i => i.severity !== 'high');

  if (items.items.length === 0) {
    return (
      <Card icon="△" title="Needs Attention">
        <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No current attention items.</p>
      </Card>
    );
  }
  return (
    <Card icon="△" title="Needs Attention">
      {/* Primary: high-severity blockers */}
      {primary.map(item => (
        <div key={item.id} className="row-item" style={{ flexDirection: 'column', gap: '3px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`dot dot-${SEVERITY_DOT[item.severity]}`} />
            <span style={{ fontWeight: 500, fontSize: '12.5px', color: 'var(--text-primary)' }}>{item.title}</span>
            <span className={`badge ${TYPE_BADGE[item.type]}`} style={{ fontSize: '9px', height: '16px', padding: '0 5px' }}>{item.type}</span>
          </div>
          <div style={{ paddingLeft: '14px', fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
            {item.summary}
          </div>
          <div style={{ paddingLeft: '14px', display: 'flex', gap: '12px', fontSize: '10.5px', marginTop: '2px' }}>
            <span style={{ color: 'var(--text-faint)' }}>Owner: {item.owner}</span>
            <span style={{ color: 'var(--text-faint)' }}>Next: {item.next_step}</span>
          </div>
        </div>
      ))}

      {/* Secondary: lower-severity watch items */}
      {watching.length > 0 && (
        <div className="watching-section">
          <div className="watching-label">Watching ({watching.length})</div>
          {watching.map(item => (
            <div key={item.id} className="watching-item">
              <span className={`dot dot-${SEVERITY_DOT[item.severity]}`} style={{ marginTop: '4px' }} />
              <div>
                <span>{item.title}</span>
                <details className="detail-toggle" style={{ marginTop: '2px' }}>
                  <summary>Details</summary>
                  <div className="detail-body">
                    <div>{item.summary}</div>
                    <div style={{ marginTop: '4px' }}>Owner: {item.owner} · Next: {item.next_step}</div>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}


/* ━━━ 7. APPROVALS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function ApprovalCard({ queue }: { queue: ApprovalQueue }) {
  // Empty: render as quiet stub, not a full card
  if (queue.approvals.length === 0) {
    return (
      <div className="card-stub">
        <div className="section-icon">⏎</div>
        <div className="section-title" style={{ fontSize: '11px' }}>Awaiting Approval</div>
        <span style={{ fontSize: '11px', color: 'var(--text-faint)', marginLeft: '4px' }}>
          — No pending items
        </span>
      </div>
    );
  }

  return (
    <Card icon="⏎" title="Awaiting Approval">
      {queue.approvals.map(item => (
        <div key={item.id} className="approval">
          <span className="badge badge-amber">{item.type}</span>
          <span style={{ flex: 1 }}>{item.text}</span>
          <button className="approve-btn">Approve</button>
        </div>
      ))}
      <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '14px', lineHeight: 1.5 }}>
        Items here require human countersignature before proceeding.
      </p>
    </Card>
  );
}


/* ━━━ 8. SUBSTRATE QUALITY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

const FIT_COLORS: Record<number, string> = { 1: 'var(--red)', 2: 'var(--red)', 3: 'var(--amber)', 4: 'var(--green)', 5: 'var(--green)' };
const CONDITIONING_DOT: Record<string, string> = { raw: 'red', 'partially-conditioned': 'amber', conditioned: 'green', 'needs-rework': 'red' };
const USE_BADGE: Record<string, string> = { canonical: 'badge-green', reference: 'badge-neutral', 'context-only': 'badge-neutral', exclude: 'badge-red' };
const PRIORITY_DOT: Record<string, string> = { now: 'red', soon: 'amber', later: 'neutral' };
const ACTION_LABEL: Record<string, string> = { distill: 'Distill', split: 'Split', 'add-header': 'Add header', create: 'Create', merge: 'Merge', rewrite: 'Rewrite', exclude: 'Exclude', archive: 'Archive' };

function SubstrateQualityCard({ quality }: { quality: SubstrateQuality }) {
  const scored = quality.assets.filter(a => a.fit_score !== null);
  const unscored = quality.assets.filter(a => a.fit_score === null);
  const activeImprovements = quality.improvement_queue.filter(i => !i.completed);

  return (
    <div className="card" style={{ marginTop: '14px' }}>
      <div className="section-header">
        <div className="section-icon">◆</div>
        <div className="section-title">Substrate Quality</div>
        {quality.last_audit_at && (
          <span className="mono" style={{ fontSize: '10px', color: 'var(--text-faint)', marginLeft: 'auto' }}>
            Audited {shortDate(quality.last_audit_at)} by {quality.last_audit_by}
          </span>
        )}
      </div>

      {/* Audit note */}
      {quality.audit_note && (
        <div style={{
          padding: '8px 10px',
          background: 'var(--bg-subtle)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--r-md)',
          fontSize: '11.5px',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          marginBottom: '14px',
        }}>
          {quality.audit_note}
        </div>
      )}

      {/* Asset table */}
      <div className="label" style={{ marginBottom: '8px' }}>Assets ({quality.assets.length})</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        {scored.map(asset => (
          <AssetRow key={asset.id} asset={asset} />
        ))}
        {unscored.map(asset => (
          <AssetRow key={asset.id} asset={asset} />
        ))}
      </div>

      {/* Improvement queue */}
      {activeImprovements.length > 0 && (
        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
          <div className="label" style={{ marginBottom: '8px' }}>Improvement Queue ({activeImprovements.length})</div>
          {activeImprovements.map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '8px', marginBottom: '8px', fontSize: '12px', alignItems: 'flex-start' }}>
              <span className={`dot dot-${PRIORITY_DOT[item.priority]}`} style={{ marginTop: '5px', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span className="badge badge-neutral" style={{ fontSize: '9px', height: '16px', padding: '0 5px' }}>
                    {ACTION_LABEL[item.action] || item.action}
                  </span>
                  <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{item.target}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', lineHeight: 1.45, marginTop: '2px' }}>
                  {item.rationale}
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '2px', fontSize: '10.5px', color: 'var(--text-faint)' }}>
                  <span>Assigned: {item.assigned_to}</span>
                  <span>Priority: {item.priority}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Weak / missing substrate */}
      {quality.weak_substrate.length > 0 && (
        <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
          <div className="label" style={{ marginBottom: '8px', color: 'var(--amber)' }}>Missing or Weak Substrate</div>
          {quality.weak_substrate.map(note => (
            <div key={note.id} style={{ marginBottom: '10px', fontSize: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                <span className="dot dot-amber" style={{ flexShrink: 0 }} />
                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{note.description}</span>
              </div>
              <div style={{ paddingLeft: '14px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                <div>{note.impact}</div>
                <div style={{ marginTop: '3px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Fix: {note.suggested_fix}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Footer note */}
      <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border)', fontSize: '10.5px', color: 'var(--text-faint)', lineHeight: 1.5 }}>
        Scores reflect human consulting judgment, not automated evaluation. Fit scores indicate how well an asset serves the current project task — not inherent quality.
      </div>
    </div>
  );
}

function AssetRow({ asset }: { asset: SubstrateAsset }) {
  const hasScore = asset.fit_score !== null;
  const scoreColor = hasScore ? FIT_COLORS[asset.fit_score!] : 'var(--text-faint)';

  return (
    <details className="detail-toggle" style={{ margin: 0, padding: 0 }}>
      <summary style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 0',
        fontSize: '12.5px',
        cursor: 'pointer',
      }}>
        {/* Score */}
        <span className="mono" style={{
          width: '24px',
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 600,
          color: scoreColor,
          flexShrink: 0,
        }}>
          {hasScore ? asset.fit_score : '—'}
        </span>

        {/* Conditioning dot */}
        <span className={`dot dot-${CONDITIONING_DOT[asset.conditioning_status]}`} style={{ flexShrink: 0 }} />

        {/* Name */}
        <span style={{ fontWeight: 500, color: 'var(--text-primary)', flex: 1 }}>{asset.name}</span>

        {/* Type + use mode badges */}
        <span className="badge badge-neutral" style={{ fontSize: '9px', height: '16px', padding: '0 5px' }}>
          {asset.asset_type}
        </span>
        <span className={`badge ${USE_BADGE[asset.use_mode]}`} style={{ fontSize: '9px', height: '16px', padding: '0 5px' }}>
          {asset.use_mode.replace(/-/g, ' ')}
        </span>
      </summary>

      <div className="detail-body" style={{ paddingLeft: '32px', marginBottom: '8px' }}>
        {/* Rationale — this is the primary content */}
        {asset.fit_rationale && (
          <div style={{ marginBottom: '6px', lineHeight: 1.5 }}>
            {asset.fit_rationale}
          </div>
        )}

        {/* Conditioning note */}
        {asset.conditioning_note && (
          <div style={{ marginBottom: '4px' }}>
            <span style={{ color: 'var(--text-faint)' }}>Conditioning:</span>{' '}
            <span>{asset.conditioning_note}</span>
          </div>
        )}

        {/* Review metadata */}
        {asset.last_reviewed_at ? (
          <div style={{ fontSize: '10.5px', color: 'var(--text-faint)', marginTop: '4px' }}>
            Reviewed {shortDate(asset.last_reviewed_at)} by {asset.reviewed_by}
          </div>
        ) : (
          <div style={{ fontSize: '10.5px', color: 'var(--text-faint)', marginTop: '4px', fontStyle: 'italic' }}>
            Not yet reviewed
          </div>
        )}
      </div>
    </details>
  );
}


/* ─── Shared components ───────────────────────────────── */

function Card({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="section-header">
        <div className="section-icon">{icon}</div>
        <div className="section-title">{title}</div>
      </div>
      <div>{children}</div>
    </div>
  );
}

function MetaLabel({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span className="label">{label}</span>
      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{value}</span>
    </div>
  );
}

function ActorTag({ actor }: { actor: Actor }) {
  const typeColor: Record<string, string> = { human: 'var(--blue)', agent: 'var(--green)', machine: 'var(--text-muted)' };
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '4px 10px', background: 'var(--bg-subtle)',
      border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
      fontSize: '11.5px',
    }}>
      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: typeColor[actor.type] || 'var(--text-faint)' }} />
      <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{actor.name}</span>
      <span className="mono" style={{ fontSize: '9.5px', color: 'var(--text-muted)' }}>{actor.role}</span>
    </div>
  );
}
