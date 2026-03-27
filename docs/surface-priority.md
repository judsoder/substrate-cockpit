# Surface Priority Rules

How the cockpit decides what appears on the main surface, what demotes to a visible drilldown, and what stays in the data layer only.

## Core principle

**Secondary truth is acceptable. Hidden truth is not.**

If a truth is important enough to matter, there must be a visible path to it from the main surface. The cockpit does not "clean up" by removing information — it creates hierarchy. A calm surface with reachable depth is trustworthy. A clean surface with invisible depth is not.

---

## Three layers

| Layer | Meaning | Affordance |
|-------|---------|------------|
| **Primary** | What you need to know right now | Always visible on the card surface |
| **Secondary** | Supporting truth that gives context | Behind a visible `▸` toggle (details/summary) |
| **Data-only** | In the schema, not rendered | Available to future views or API consumers |

The toggle pattern uses native `<details>/<summary>` with a `▸` indicator that rotates on expand. Every card that has secondary content uses the same pattern so users learn it once.

---

## Per-card rules

### 1. Project Header
| Field | Layer |
|-------|-------|
| project_name, one_line_purpose | Primary |
| overall_status badge | Primary |
| last_verified_at, verified_by | Primary |
| owner, environment, agents | Primary (meta row) |
| project_id | Data-only |

The header has no secondary layer. Everything here is orientation — it should all be visible.

### 2. Current State
| Field | Layer |
|-------|-------|
| state_items (label + summary + status dot + scope badge) | Primary |
| current_blockers | Primary (sub-section, red label) |
| current_assumptions | Secondary → "Assumptions & context" toggle |
| last_meaningful_change | Secondary → inside same toggle |

Blockers are always primary. They are the most important truth on the card. Assumptions and last_meaningful_change add context but don't require immediate attention.

### 3. Authority & Boundaries
| Field | Layer |
|-------|-------|
| allowed_actions (CAN rows) | Primary |
| forbidden_actions (CANNOT rows) | Primary |
| requires_countersignature (NEEDS rows) | Primary |
| scoped_authorities | Primary (sub-section) |
| actors (typed tags) | Primary (below rules) |
| authority_notes | Secondary → "Authority notes" toggle |

The three permission tiers (CAN/CANNOT/NEEDS) are always visible — they are the trust contract. Scoped authorities and actors reinforce this. The notes field is editorial context.

### 4. Connected Resources
| Field | Layer |
|-------|-------|
| resources (provider chip + name + status dot) | Primary |
| machines (chip with role) | Primary (sub-section) |
| missing_resources | Primary (red label) |
| environments | Secondary → "Environments & provenance" toggle |
| source_of_truth (per resource) | Secondary → inside same toggle |

Resource chips give instant status. Missing resources are blockers and stay primary. Environments and provenance are "how do we know this" — important but not urgent.

### 5. Recent Verified Actions
| Field | Layer |
|-------|-------|
| First 2 actions (full trace rows) | Primary |
| Remaining actions | Secondary → "Earlier actions (N)" toggle |
| handoff_note | Primary — distinct container with ⏸ icon |

The primary count is currently hardcoded at 2. Actions behind the toggle render at 0.7 opacity to signal "continuity, not current." The handoff note is a posture statement — it's not a log entry and not a drilldown. It gets its own visual container.

### 6. Needs Attention
| Field | Layer |
|-------|-------|
| High-severity items (title + type badge + summary + owner + next_step) | Primary |
| Low/medium-severity items (title only) | Secondary tier — "Watching (N)" section |
| Per-item details (summary, owner, next_step) for watching items | Secondary → "Details" toggle per item |

Blockers dominate the card. Watch items are visibly present but lighter — they don't compete for attention with the thing that's actually blocking work.

### 7. Approval Queue
| State | Rendering |
|-------|-----------|
| Has items | Full card with approval rows and "Approve" buttons |
| Empty | Quiet stub — single-line with icon, title, "— No pending items" |

When empty, the approval queue collapses to a `card-stub` class that occupies its grid position but at reduced visual weight and 0.7 opacity. The category stays visible (it's a real part of the model) but doesn't demand attention when there's nothing to act on.

---

## Empty-state rules

- **Cards with content**: render normally
- **Cards with no items**: render a quiet empty message inside the card
- **Approval queue with no items**: collapse to stub (special case — this card represents human sovereignty and should be visually quiet when no action is needed)
- **Drilldowns with no content**: don't render the toggle at all

---

## What stays data-only (not rendered)

These fields exist in the schema and mock data but are not currently rendered:

- `project_identity.project_id` — internal identifier, no user-facing signal
- `state_items[].verified_at` / `verified_by` — per-item verification timestamps exist in the data but aren't shown on state rows (the card-level "Verified at" in the header covers temporal trust)
- `attention_items[].discovered_at` — in the schema, not rendered (the attention card focuses on severity and next steps, not discovery time)
- `resource_graph.resources[].environment` — available but only rendered inside the "Environments & provenance" toggle alongside source_of_truth

None of these are hidden. They're in the schema, in the data object, and available to any future view that needs them. They just don't earn primary or secondary surface in this view.
