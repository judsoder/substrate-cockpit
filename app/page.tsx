// Substrate Cockpit
// Precision operations UI. Trust through structure, not warmth.

export default function CockpitPage() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 20px 64px' }}>

      {/* ━━━ 1. PROJECT HEADER ━━━ */}
      <header style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.01em' }}>
              Learner
            </h1>
            <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
              Adaptive diagnostic + evidence fusion for Max and Lev
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="badge badge-green">Stable</span>
            <span className="mono" style={{ fontSize: '10px', color: 'var(--text-faint)' }}>
              Verified 11:24 AM
            </span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '20px',
          marginTop: '12px',
          paddingTop: '10px',
          borderTop: '1px solid var(--border)',
        }}>
          <Meta label="Owner" value="Jud" />
          <Meta label="Env" value="Local + Vercel" />
          <Meta label="Agents" value="Jed · Hermes" />
          <Meta label="Repo" value="judsoder/learner" />
        </div>
      </header>

      {/* ━━━ GRID ━━━ */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

        {/* ━━━ 2. CURRENT STATE ━━━ */}
        <div className="card">
          <div className="section-header">
            <div className="section-icon">◉</div>
            <div className="section-title">Current State</div>
          </div>
          <div>
            <StateRow dot="green" text="Repo synced to latest bounded fixes" />
            <StateRow dot="green" text="Home → About discoverability improved" />
            <StateRow dot="green" text="Evidence upload flow simplified" />
            <StateRow dot="green" text="/api/learners route live, /api/seed GET removed" />
            <StateRow dot="red" text="Deploy blocked — missing Supabase env on Hermes mini" />
            <StateRow dot="neutral" text="No unverified production changes" />
          </div>
        </div>

        {/* ━━━ 3. AUTHORITY ━━━ */}
        <div className="card">
          <div className="section-header">
            <div className="section-icon">◈</div>
            <div className="section-title">Authority & Boundaries</div>
          </div>
          <div>
            <div className="auth-row">
              <span className="auth-scope" style={{ color: 'var(--green)' }}>CAN</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                Bounded repo work, tests, build verification, project-scoped deploys
              </span>
            </div>
            <div className="auth-row">
              <span className="auth-scope" style={{ color: 'var(--red)' }}>CANNOT</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                Personal browser sessions, broad messaging, money movement, credential creation
              </span>
            </div>
            <div className="auth-row">
              <span className="auth-scope" style={{ color: 'var(--amber)' }}>NEEDS</span>
              <span style={{ color: 'var(--text-secondary)' }}>
                Prod release, credential changes, messaging authority, new resource connections
              </span>
            </div>
          </div>
          <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid var(--border)', display: 'flex', gap: '8px' }}>
            <AgentTag name="Hermes" role="bounded operator" />
            <AgentTag name="Jed" role="advisor" />
          </div>
        </div>

        {/* ━━━ 4. RESOURCES ━━━ */}
        <div className="card">
          <div className="section-header">
            <div className="section-icon">⬡</div>
            <div className="section-title">Connected Resources</div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            <Chip label="GitHub" value="judsoder/learner" dot="green" />
            <Chip label="Vercel" value="learner-flame" dot="amber" />
            <Chip label="Supabase" value="connected" dot="green" />
            <Chip label="Domain" value="learner-flame.vercel.app" dot="neutral" />
            <Chip label="Env" value="incomplete — Hermes mini" dot="red" />
            <Chip label="Machines" value="Jud mini · Hermes mini" dot="neutral" />
          </div>
        </div>

        {/* ━━━ 5. TRACE ━━━ */}
        <div className="card">
          <div className="section-header">
            <div className="section-icon">▸</div>
            <div className="section-title">Recent Verified Actions</div>
          </div>
          <div>
            <Trace agent="Hermes" text="Improved home → about discoverability for parents" />
            <Trace agent="Hermes" text="Removed dead GET /api/seed export" />
            <Trace agent="Hermes" text="Introduced dedicated /api/learners route" />
            <Trace agent="Hermes" text="Simplified evidence upload learner selection" />
            <Trace agent="Jed" text="Updated Hermes authority rules and operator scope" />
          </div>
        </div>

        {/* ━━━ 6. UNKNOWNS ━━━ */}
        <div className="card">
          <div className="section-header">
            <div className="section-icon">△</div>
            <div className="section-title">Needs Attention</div>
          </div>
          <div>
            <StateRow dot="red" text="Supabase env vars missing on Hermes mini — blocks all deploys and server-rendered pages" />
            <StateRow dot="amber" text="Three seed-link fallbacks now return 405 — low urgency, empty-state only" />
            <StateRow dot="amber" text="Prod deploy verification pending once env is restored" />
            <StateRow dot="neutral" text="Question bank limited to ~20 items per domain — CAT precision ceiling" />
          </div>
        </div>

        {/* ━━━ 7. APPROVALS ━━━ */}
        <div className="card">
          <div className="section-header">
            <div className="section-icon">⏎</div>
            <div className="section-title">Awaiting Approval</div>
          </div>
          <div>
            <Approval type="credential" text="Configure Supabase env vars on Hermes mini" />
            <Approval type="deploy" text="Deploy Learner to Vercel production" />
            <Approval type="authority" text="Expand Hermes authority for practice-loop feature work" />
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-faint)', marginTop: '14px', lineHeight: 1.5 }}>
            Items here require human countersignature before proceeding.
          </p>
        </div>

      </div>
    </div>
  );
}

/* ─── Components ──────────────────────────────────────── */

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span className="label">{label}</span>
      <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{value}</span>
    </div>
  );
}

function StateRow({ dot, text }: { dot: 'green' | 'amber' | 'red' | 'neutral'; text: string }) {
  return (
    <div className="row-item">
      <span className={`dot dot-${dot}`} style={{ marginTop: '5px' }} />
      <span style={{ color: dot === 'red' ? 'var(--text-primary)' : undefined }}>{text}</span>
    </div>
  );
}

function Chip({ label, value, dot }: { label: string; value: string; dot: 'green' | 'amber' | 'red' | 'neutral' }) {
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
      padding: '4px 10px',
      background: 'var(--bg-subtle)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)',
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

function Approval({ type, text }: { type: 'credential' | 'deploy' | 'authority'; text: string }) {
  const badge = {
    credential: 'badge-red',
    deploy: 'badge-amber',
    authority: 'badge-neutral',
  }[type];
  const label = { credential: 'Credential', deploy: 'Deploy', authority: 'Authority' }[type];

  return (
    <div className="approval">
      <span className={`badge ${badge}`}>{label}</span>
      <span style={{ flex: 1 }}>{text}</span>
      <button className="approve-btn">Approve</button>
    </div>
  );
}
