# Microcopy Reference

Canonical UI language for the substrate cockpit. When in doubt, use these exact strings. Consistency across cards builds trust.

---

## Status labels

Used in badges, dots, and the project header.

| Label | Meaning | Color | Used where |
|-------|---------|-------|------------|
| **Stable** | System healthy, no active issues | Green badge | Header status |
| **Active Work** | System healthy, work in progress | Green badge | Header status |
| **Degraded** | Partially functional, issues present | Amber badge | Header status |
| **Down** | Not operational | Red badge | Header status |

## Status dots

| Dot color | Schema values that map to it |
|-----------|------------------------------|
| Green | `verified`, `connected`, `active`, `active-work` |
| Amber | `attention`, `partial`, `degraded` |
| Red | `blocked`, `disconnected` |
| Neutral (gray) | `neutral`, `unknown`, `inactive` |

---

## Verification language

| Term | Meaning |
|------|---------|
| **Verified** | Confirmed by direct observation or artifact check |
| **Reported** | Agent says it's done, not independently confirmed |
| **Unverified** | State unknown or not yet checked |

Used in: trace card verification dots, header "Verified [time] by [agent]"

Format: `Verified 11:24 AM by Hermes`

---

## Authority labels

| Label | Meaning | Color |
|-------|---------|-------|
| **CAN** | Agent is authorized to do this | Green |
| **CANNOT** | Explicitly forbidden | Red |
| **NEEDS** | Requires human countersignature | Amber |

These three labels are the trust contract. They appear on every authority card. Use exactly these words — not "allowed," "prohibited," "requires approval."

---

## Attention severity

| Severity | Rendering | Visual weight |
|----------|-----------|---------------|
| **high** | Primary surface, full detail | Red dot, full text, owner + next step visible |
| **medium** | Watching tier, title + toggle | Amber dot, lighter rendering |
| **low** | Watching tier, title + toggle | Neutral dot, lighter rendering |

Type badges on attention items:

| Type | Badge color | Meaning |
|------|-------------|---------|
| **blocker** | Red | Blocks progress on something |
| **risk** | Amber | Could become a problem |
| **unknown** | Neutral | Not yet understood |
| **debt** | Neutral | Known compromise, tracked |

---

## Drilldown toggle labels

These are the `<summary>` text strings on expandable sections. Keep them short, lowercase, descriptive.

| Card | Toggle text |
|------|------------|
| Current State | `Assumptions & context` |
| Authority | `Authority notes` |
| Resources | `Environments & provenance` |
| Trace | `Earlier actions (N)` |
| Attention watching items | `Details` |

Pattern: the toggle label tells you what you'll find inside. No "Show more" or "Expand" — those are generic. These are specific.

---

## Empty states

| Card | Empty text |
|------|-----------|
| Approval queue (stub) | `— No pending items` |
| Approval queue (explanation) | `Items here require human countersignature before proceeding.` |
| Attention | `No current attention items.` |

Empty states should be calm and factual, not promotional or encouraging. "No pending items" is correct. "Nothing to approve yet!" is not.

---

## Handoff note

Rendered as a distinct container with ⏸ icon. Not italic, not a toggle, not a log entry. It's a posture statement about where the project stands.

Example: `Learner is paused after a strong bounded Hermes streak; next work should come from product priorities, not momentum alone.`

---

## Approval items

| Type label | Badge color | Meaning |
|------------|-------------|---------|
| **Credential** | Red | Credential or secret change |
| **Deploy** | Amber | Production deployment |
| **Authority** | Neutral | Permission or scope change |
| **Resource** | Neutral | Infrastructure or connection change |

Action button: `Approve` (single word, no icon)

Footer: `Items here require human countersignature before proceeding.`

The word "countersignature" is deliberate — not "approval" or "permission." It signals that this is a co-signing action, not a rubber stamp.

---

## Card titles

These are fixed. They are panel identity, not content.

| Card | Title |
|------|-------|
| 1 | *(header — no section title, just project name)* |
| 2 | `Current State` |
| 3 | `Authority & Boundaries` |
| 4 | `Connected Resources` |
| 5 | `Recent Verified Actions` |
| 6 | `Needs Attention` |
| 7 | `Awaiting Approval` |

---

## Meta labels (header row)

| Label | Example value |
|-------|---------------|
| `Owner` | `Jud Soderborg` |
| `Env` | `Local + Vercel` |
| `Agents` | `Jed · Hermes` |

These are uppercase 10px labels with values inline. Keep them terse.

---

## General rules

- Labels are factual, not emotional
- No exclamation marks in status text
- No "successfully" — either it's verified or it's not
- Severity is expressed through color and position, not adjectives
- When in doubt, use fewer words
