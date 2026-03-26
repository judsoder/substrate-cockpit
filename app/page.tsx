// Substrate Cockpit — renders entirely from a single schema object.
// To update content: edit lib/mock/learner.ts, not this file.

import { LEARNER_COCKPIT } from '@/lib/mock/learner';
import type {
  SubstrateCockpit, ProjectIdentity, StateItem, AuthorityMap,
  Resource, VerifiedAction, AttentionItem, ApprovalItem, ApprovalType,
} from '@/lib/schema';

const cockpit: SubstrateCockpit = LEARNER_COCKPIT;

const STATUS_BADGE: Record<string, string> = {
  stable: 'badge-green',
  active: 'badge-green',
  degraded: 'badge-amber',
  down: 'badge-red',
};

const APPROVAL_BADGE: Record<ApprovalType, string> = {
  credential: 'badge-red',
  deploy: 'badge-amber',
  authority: 'badge-neutral',
  resource: 'badge-neutral',
};

const STATUS_DOT: Record<string, string> = {
  verified: 'green',
  attention: 'amber',
  blocked: 'red',
  neutral: 'neutral',
};

export default function CockpitPage() {
  const { project_identity: p, current_state, authority_map, resource_graph, verified_actions, attention_items, approval_queue } = cockpit;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 64px' }}>

      {/* ━━━ 1. PROJECT HEADER ━━━ */}
      <Header identity={p} />

      {/* ━━━ GRID ━━━ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

        {/* ━━━ 2. CURRENT STATE ━━━ */}
        <Card icon="◉" title="Current State">
          {current_state.map((item, i) => (
            <StateRow key={i} dot={STATUS_DOT[item.status]} text={item.text} />
          ))}
        </Card>

        {/* ━━━ 3. AUTHORITY ━━━ */}
        <Card icon="◈" title="Authority & Boundaries">
          <AuthorityPanel map={authority_map} agents={p.agents} />
        </Card>

        {/* ━━━ 4. RESOURCES ━━━ */}
        <Card icon="⬡" title="Connected Resources">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {resource_graph.map((r, i) => (
              <Chip key={i} label={r.kind} value={r.value} dot={STATUS_DOT[r.status]} />
            ))}
          </div>
        </Card>

        {/* ━━━ 5. TRACE ━━━ */}
        <Card icon="▸" title="Recent Verified Actions">
          {verified_actions.map((a, i) => (
            <Trace key={i} agent={a.agent} text={a.text} />
          ))}
        </Card>

        {/* ━━━ 6. UNKNOWNS ━━━ */}
        <Card icon="△" title="Needs Attention">
          {attention_items.map((item, i) => (
            <StateRow key={i} dot={STATUS_DOT[item.severity]} text={item.text} />
          ))}
        </Card>

        {/* ━━━ 7. APPROVALS ━━━ */}
        <Card icon="⏎" title="Awaiting Approval">
          {approval_queue.map((item, i) => (
            <ApprovalRow key={i} item={item} />
          ))}
          {approval_queue.length > 0 && (
            <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '14px', lineHeight: 1.5 }}>
              Items here require human countersignature before proceeding.
            </p>
          )}
          {approval_queue.length === 0 && (
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              No pending approvals.
            </p>
          )}
        </Card>

      </div>
    </div>
  );
}


/* ─── Composition components ──────────────────────────── */

function Header({ identity }: { identity: ProjectIdentity }) {
  return (
    <header style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' }}>
            {identity.name}
          </h1>
          <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
            {identity.purpose}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className={`badge ${STATUS_BADGE[identity.status] || 'badge-neutral'}`}>
            {identity.status.charAt(0).toUpperCase() + identity.status.slice(1)}
          </span>
          <span className="mono" style={{ fontSize: '10px', color: 'var(--text-faint)' }}>
            Verified {identity.last_verified}
          </span>
        </div>
      </div>
      <div style={{
        display: 'flex', gap: '20px', marginTop: '12px',
        paddingTop: '10px', borderTop: '1px solid var(--border)',
      }}>
        <MetaLabel label="Owner" value={identity.owner} />
        <MetaLabel label="Env" value={identity.environment} />
        <MetaLabel label="Agents" value={identity.agents.map(a => a.name).join(' · ')} />
        <MetaLabel label="Repo" value={identity.repo} />
      </div>
    </header>
  );
}

function AuthorityPanel({ map, agents }: { map: AuthorityMap; agents: ProjectIdentity['agents'] }) {
  return (
    <>
      <div>
        {map.allowed.map((text, i) => (
          <div key={`a${i}`} className="auth-row">
            <span className="auth-scope" style={{ color: 'var(--green)' }}>CAN</span>
            <span style={{ color: 'var(--text-secondary)' }}>{text}</span>
          </div>
        ))}
        {map.forbidden.map((text, i) => (
          <div key={`f${i}`} className="auth-row">
            <span className="auth-scope" style={{ color: 'var(--red)' }}>CANNOT</span>
            <span style={{ color: 'var(--text-secondary)' }}>{text}</span>
          </div>
        ))}
        {map.requires_approval.map((text, i) => (
          <div key={`r${i}`} className="auth-row">
            <span className="auth-scope" style={{ color: 'var(--amber)' }}>NEEDS</span>
            <span style={{ color: 'var(--text-secondary)' }}>{text}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
        {agents.map((a, i) => (
          <AgentTag key={i} name={a.name} role={a.role} />
        ))}
      </div>
    </>
  );
}

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


/* ─── Leaf components ─────────────────────────────────── */

function MetaLabel({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span className="label">{label}</span>
      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{value}</span>
    </div>
  );
}

function StateRow({ dot, text }: { dot: string; text: string }) {
  return (
    <div className="row-item">
      <span className={`dot dot-${dot}`} style={{ marginTop: '5px' }} />
      <span style={{ color: dot === 'red' ? 'var(--text-primary)' : undefined }}>{text}</span>
    </div>
  );
}

function Chip({ label, value, dot }: { label: string; value: string; dot: string }) {
  return (
    <div className="chip">
      <span className="chip-label">{label}</span>
      <span style={{ color: 'var(--text-primary)', fontSize: '11.5px' }}>{value}</span>
      <span className={`dot dot-${dot}`} />
    </div>
  );
}

function AgentTag({ name, role }: { name: string; role: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '6px',
      padding: '4px 10px', background: 'var(--bg-subtle)',
      border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
      fontSize: '11.5px',
    }}>
      <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>{name}</span>
      <span className="mono" style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{role}</span>
    </div>
  );
}

function Trace({ agent, text }: { agent: string; text: string }) {
  return (
    <div className="trace">
      <span className="trace-agent">{agent}</span>
      <span>{text}</span>
    </div>
  );
}

function ApprovalRow({ item }: { item: ApprovalItem }) {
  const badge = APPROVAL_BADGE[item.type];
  const label = item.type.charAt(0).toUpperCase() + item.type.slice(1);
  return (
    <div className="approval">
      <span className={`badge ${badge}`}>{label}</span>
      <span style={{ flex: 1 }}>{item.text}</span>
      <button className="approve-btn">Approve</button>
    </div>
  );
}
