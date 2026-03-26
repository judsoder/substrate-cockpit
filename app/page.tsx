// Substrate Cockpit — Project Control Room
// Each panel represents a different form of trust:
//   Header = orientation, State = reality, Authority = safety,
//   Resources = legibility, Trace = continuity, Unknowns = honesty,
//   Approvals = human sovereignty

export default function CockpitPage() {
  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '40px 24px 80px' }}>

      {/* ━━━ 1. PROJECT HEADER ━━━ */}
      {/* Trust form: Orientation — "I know where I am" */}
      <header style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px' }}>
          <div>
            <h1 className="heading-serif" style={{ fontSize: '2rem', lineHeight: 1.15, marginBottom: '6px' }}>
              Learner
            </h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '480px', lineHeight: 1.5 }}>
              Adaptive diagnostic + evidence fusion platform for Max and Lev
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', flexShrink: 0 }}>
            <span className="badge badge-verified">Stable</span>
            <span className="mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              Verified 11:24 AM
            </span>
          </div>
        </div>

        {/* Meta row */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border)',
          flexWrap: 'wrap',
        }}>
          <MetaItem label="Owner" value="Jud" />
          <MetaItem label="Environment" value="Local + Vercel prod" />
          <MetaItem label="Agents" value="Jed · Hermes" />
          <MetaItem label="Repo" value="judsoder/learner" />
        </div>
      </header>

      {/* ━━━ MAIN GRID ━━━ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px',
      }}>

        {/* ━━━ 2. CURRENT STATE ━━━ */}
        {/* Trust form: Reality — "What is true right now" */}
        <div className="card">
          <div className="section-label">Current State</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <StateRow status="verified" text="Repo synced to latest bounded fixes" />
            <StateRow status="verified" text="Home → About discoverability improved" />
            <StateRow status="verified" text="Evidence upload flow simplified" />
            <StateRow status="verified" text="/api/learners route live, /api/seed GET deprecated" />
            <StateRow status="blocked" text="Deploy blocked — missing Supabase env on Hermes mini" />
            <StateRow status="neutral" text="No unverified production changes detected" />
          </div>
        </div>

        {/* ━━━ 3. AUTHORITY / BOUNDARIES ━━━ */}
        {/* Trust form: Safety — "The boundaries are real" */}
        <div className="card">
          <div className="section-label">Authority &amp; Boundaries</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="authority-row">
              <span className="authority-scope">CAN</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                Bounded repo work, tests, build verification, project-scoped deploys
              </span>
            </div>
            <div className="authority-row">
              <span className="authority-scope">CANNOT</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                Access personal browser sessions, broad messaging, money movement, credential creation
              </span>
            </div>
            <div className="authority-row">
              <span className="authority-scope" style={{ color: 'var(--attention)' }}>APPROVE</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                Prod release, credential changes, messaging authority changes, new resource connections
              </span>
            </div>
          </div>

          <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <AgentBadge name="Hermes" role="Bounded operator" />
              <AgentBadge name="Jed" role="Advisor / inspector" />
            </div>
          </div>
        </div>
      </div>

      {/* ━━━ SECOND ROW ━━━ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px',
      }}>

        {/* ━━━ 4. CONNECTED RESOURCES ━━━ */}
        {/* Trust form: Legibility — "The project has a body I can see" */}
        <div className="card">
          <div className="section-label">Connected Resources</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            <ResourcePill icon="◉" label="GitHub" value="judsoder/learner" status="verified" />
            <ResourcePill icon="▲" label="Vercel" value="learner-flame" status="attention" />
            <ResourcePill icon="◆" label="Supabase" value="connected" status="verified" />
            <ResourcePill icon="◎" label="Domain" value="learner-flame.vercel.app" status="neutral" />
            <ResourcePill icon="⬡" label="Env bundle" value="incomplete on Hermes mini" status="blocked" />
            <ResourcePill icon="⬢" label="Machines" value="Jud mini · Hermes mini" status="neutral" />
          </div>
        </div>

        {/* ━━━ 5. RECENT VERIFIED ACTIONS ━━━ */}
        {/* Trust form: Continuity — "There is a coherent thread of work" */}
        <div className="card">
          <div className="section-label">Recent Verified Actions</div>
          <div>
            <TraceItem agent="Hermes" text="Improved home → about discoverability for parents" />
            <TraceItem agent="Hermes" text="Removed dead GET /api/seed export" />
            <TraceItem agent="Hermes" text="Introduced dedicated /api/learners route" />
            <TraceItem agent="Hermes" text="Simplified evidence upload learner selection" />
            <TraceItem agent="Jed" text="Updated Hermes authority rules and operator scope" />
          </div>
        </div>
      </div>

      {/* ━━━ BOTTOM ROW ━━━ */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
      }}>

        {/* ━━━ 6. UNKNOWNS / NEEDS ATTENTION ━━━ */}
        {/* Trust form: Honesty — "We say what we don't know" */}
        <div className="card">
          <div className="section-label">Needs Attention</div>
          <div>
            <UnknownItem severity="blocked" text="Supabase env vars missing on Hermes mini — blocks all deploys and server-rendered pages" />
            <UnknownItem severity="attention" text="Three seed-link fallbacks now return 405 after GET removal — low urgency, empty-state only" />
            <UnknownItem severity="attention" text="Prod deploy verification pending once env is restored" />
            <UnknownItem severity="neutral" text="Question bank limited to ~20 items per domain — CAT precision ceiling" />
          </div>
        </div>

        {/* ━━━ 7. APPROVAL QUEUE ━━━ */}
        {/* Trust form: Human sovereignty — "The human is still above the system" */}
        <div className="card">
          <div className="section-label">Awaiting Approval</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <ApprovalItem
              text="Configure Supabase env vars on Hermes mini"
              type="credential"
            />
            <ApprovalItem
              text="Deploy Learner to Vercel production"
              type="deploy"
            />
            <ApprovalItem
              text="Expand Hermes authority to include practice-loop feature work"
              type="authority"
            />
          </div>

          {/* Empty state hint */}
          <div style={{
            marginTop: '20px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border)',
          }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-faint)', lineHeight: 1.5 }}>
              Items appear here when an agent action requires human countersignature before proceeding.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ─── Component helpers ────────────────────────────────── */

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
      <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{value}</span>
    </div>
  );
}

function StateRow({ status, text }: { status: 'verified' | 'attention' | 'blocked' | 'neutral'; text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
      <span className={`status-dot ${status}`} style={{ marginTop: '6px' }} />
      <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.45 }}>{text}</span>
    </div>
  );
}

function ResourcePill({ icon, label, value, status }: {
  icon: string; label: string; value: string;
  status: 'verified' | 'attention' | 'blocked' | 'neutral';
}) {
  const dotColor = {
    verified: 'var(--verified)',
    attention: 'var(--attention)',
    blocked: 'var(--blocked)',
    neutral: 'var(--text-faint)',
  }[status];

  return (
    <div className="resource-pill">
      <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{icon}</span>
      <span className="label">{label}</span>
      <span style={{ fontSize: '0.78rem', color: 'var(--text-primary)' }}>{value}</span>
      <span style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: dotColor, flexShrink: 0,
      }} />
    </div>
  );
}

function AgentBadge({ name, role }: { name: string; role: string }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '8px',
      padding: '6px 12px',
      background: 'var(--bg-subtle)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
    }}>
      <span style={{ fontSize: '0.84rem', fontWeight: 500 }}>{name}</span>
      <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{role}</span>
    </div>
  );
}

function TraceItem({ agent, text }: { agent: string; text: string }) {
  return (
    <div className="trace-item">
      <span className="agent">{agent}</span>
      <span>{text}</span>
    </div>
  );
}

function UnknownItem({ severity, text }: { severity: 'blocked' | 'attention' | 'neutral'; text: string }) {
  return (
    <div className="unknown-item">
      <span className={`status-dot ${severity}`} style={{ marginTop: '5px' }} />
      <span style={{ color: severity === 'blocked' ? 'var(--blocked)' : 'var(--text-secondary)' }}>{text}</span>
    </div>
  );
}

function ApprovalItem({ text, type }: { text: string; type: 'credential' | 'deploy' | 'authority' }) {
  const typeLabel = { credential: 'Credential', deploy: 'Deploy', authority: 'Authority' }[type];
  const badgeClass = {
    credential: 'badge-blocked',
    deploy: 'badge-attention',
    authority: 'badge-neutral',
  }[type];

  return (
    <div className="approval-item">
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
        <span className={`badge ${badgeClass}`}>{typeLabel}</span>
        <span>{text}</span>
      </div>
      <button className="approval-btn">Approve</button>
    </div>
  );
}
