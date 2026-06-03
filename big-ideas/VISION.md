# Magic Graphs: Vision & Plan

_Written June 2026. A record of the strategy._

---

## What Is Magic Graphs

Magic Graphs is a discrete mathematics IDE for CS education. Not a graph tool, not a visualization library — a complete interactive environment covering the visual layer of the CS theory curriculum: graph algorithms, set theory, Markov chains, network flow, binary trees, path finding, and every other canvas-representable experience in the standard CS program.

It is built on a high-quality SDK (`@magic/graph`) that powers every product experience. The products dogfood the SDK. The SDK is validated by the products. They are not separate concerns.

Product experiences are designed to deliver time-to-value in under a minute. Double click to add a few nodes, drag a couple edges, edit the edge weights and get instant feedback. On Markov Chains? Steady state vectors update, recurrent classes are highlighted, and transient states populate instantly. On Set Theory? Targeted set space highlights, mathematical syntax errors in the LaTeX keyboard are flagged, editing the set space by dragging a set provides live results.

---

## Why This Has a Chance

The competition kinda sucks. JFLAP, VisuAlgo, David Galles' applets — these are Java applications from 2003 or read-only animations. None of them let a professor build a custom graph, run an algorithm, pause mid-execution, annotate it freehand, and share the exact state with 200 students via a URL. Magic Graphs does all of that today.

The validation signals are real and independent:

- 4th place out of 200+ at HackUMass, WolframAlpha Letter Award Winner
- Organic student adoption on Piazza from a single post about the Markov chain product — students sharing a study tool they were never assigned
- Interest from professors and software engineers alike when viewing early stage demos

The distribution strategy has an unfair advantage: direct personal relationships with professors who are actively frustrated with their current tooling and are known to be open to better options.

Our philosophy is building this right, slowly, without pressure to monetize prematurely. Providing students, TAs, and professors alike with excellent tooling for a fraction of the cost of stale textbooks or competing ed-tech platforms because all learners deserve great technology.

---

## The Product Strategy

### Breadth and attention to design detail are the moat

A competitor can clone Dijkstra's. They cannot easily clone the entire discrete math curriculum with a shared canvas engine, consistent UX, annotation layer, shareable links, and simulation controls — all built on a typed, composable SDK. Catalog completeness is what converts Magic Graphs from a useful tool into the default answer to "how do I teach this visually."

Target coverage: sets, path finding, binary trees, network flow, Markov chains, spanning trees, BFS/DFS, and every other topic that lives in the standard algorithms and discrete math curriculum.

### The demo-to-organic-adoption loop

Professors do not need to put this on the syllabus. They open it in lecture to demonstrate a concept. Students see it, want it, find it themselves. This is how the Markov chain Piazza adoption happened — nobody assigned it. This loop is the primary growth engine and it requires no institutional buy-in to activate.

### The professor experience must be flawless

The professor is not a power user. They are pulling up a URL five minutes before a lecture. If loading is slow, sharing a graph is more than two clicks, or the algorithm output is wrong once in front of 200 students — the tool is dead. Correctness and reliability are the non-negotiables. Everything else is secondary.

---

## The Monetization Model

### Tiered by value, not by lock-in

**Free**: Open the app, load a shared link, use the basic sandbox. No account required. This is the distribution mechanism — it keeps friction at zero for the first contact moment.

**$2/semester**: Unlocks simulation execution, algorithm playback, workspace saving. This is the individual student tier. Low enough that the logistical friction of account sharing outweighs the cost. Priced as an explicit signal that this is a lean, high-velocity product — not a mature enterprise suite.

**$5/semester**: Full suite access across all products. Natural upgrade when a student hits a second course that uses a different tool.

**Institutional / LMS integration**: Per-department annual contracts in the $5,000-15,000/year range. Canvas, Blackboard, Moodle integration. This is the tier that makes this a viable small business that can justify multiple full-time maintainers. One department head signs, every professor and every student gets access. Requires real usage density to justify, which the lower tiers build.

### Why $2 is the right floor

A user who won't pay $2 is not a user whose feedback is reliable. The minor financial exchange filters for actual skin-in-the-game users and creates an honest feedback loop. It also sets the right expectation — $2 implies "lean and fast-moving," not "enterprise and bloated."

### The revenue ceiling

The US alone has ~4,000 colleges and universities. Conservative 10% penetration at the $2 student tier, institutional conversion where adoption is dense, and LMS integration contracts at scale produces a realistic path to $2-4M ARR on the ed-tech business alone. This is before the SDK licensing tier is factored in.

For context: 1/4 the reach of Desmos in a narrower, more monetizable niche (college CS students who have a clear payment model) implies 2-5M monthly actives at peak semester periods, institutional presence at 500-1,000 universities, and SDK licensing revenue from companies building adjacent tools. At that scale with a 3-5 person team and near-zero marginal infrastructure cost (compute is client-side), the margins are exceptional.

---

## The SDK Business (Year 3+)

The ed-tech product is also the best advertisement for the SDK. When a developer at a company building a network topology visualizer, workflow builder, or org chart tool finds Magic Graphs, they see a production-grade application built on top of `@magic/graph`. That is the demo. That is the proof it works.

Companies that will pay for `@magic/graph`:

- Network topology and infrastructure visualization (cybersecurity, DevOps tooling)
- Workflow and pipeline builders
- Org chart and dependency mapping tools
- Knowledge graph UIs
- Decision tree builders

All of them hit the same wall: Canvas rendering is hard, hit detection is hard, performance at scale is hard, reactive data models for graph state are hard. Magic Graphs has solved all of this. A small team at a B2B SaaS company will pay $1,500-3,000/year rather than spend 3 months building and owning this themselves.

10-15 SDK customers puts meaningful revenue on the board. 50 customers is a significant business line on its own.

---

## The Timeline

### Now → September, 2026

The deadline is the start of fall semester. Professors finalize syllabi and set up tools in the last two weeks of August.

The goal is not to ship more features. The goal is:

1. Mathematical correctness guaranteed by robust automated tests across all algorithm implementations
2. Property-based testing on the expression evaluator (commutativity, De Morgan's laws, distributivity verified across thousands of generated inputs)
3. Stability: No crashes during a live demo, reliable behavior under real classroom conditions
4. Shareable link flow polished to two clicks or fewer

The product already has the magic. The job is not breaking it on the way to the user.

### Fall 2026

Get in front of professors personally. Tabling events at CS buildings, targeting students leaving algorithms and discrete math lectures. One professor, one class, real students. Free during this phase — the signal needed is usage, not revenue. This is our open beta.

Watch what professors do with the annotation layer. Watch what students share with each other. Watch which products get opened most. This data shapes everything that follows.

### Spring 2027

First payment validation. One class, $2/student, Stripe link, manual process. No paywall infrastructure needed — just a real transaction with real students. If 40% of a class pays $2 for an optional study tool, the model is validated.

### 2027-2028

Build usage density. Refine based on a full year of classroom feedback. Begin SDK documentation and outreach to developer teams who have found the product organically. Pursue the first institutional LMS conversation when usage data justifies it.

### 2028-2029

The flywheel. Professors at conferences are mentioning it. Developers who evaluated the SDK are telling colleagues. Inbound starts. Each new customer costs less than the last. Consider bringing on 1-2 people who combine theory depth with engineering ability.

### 2029+

At real scale (1/4 the reach of Desmos in this niche) this is a 3-5 person team generating $5-6M ARR with exceptional margins, full ownership, and the freedom to go deep on interesting problems because the business is stable. Not a unicorn outcome. Something better: a durable, profitable craft business at software scale, built on something genuinely loved by the people who use it.

---

## The Team Vision

The right team for this business is not a large one. 2-3 people with complementary instincts:

- Deep theory knowledge: The math has to be right and the product has to go deeper than any competitor will follow
- Engineering discipline: The SDK quality is the moat, it has to be maintained with rigor
- Customer instinct: Someone has to love students and professors as much as they love the code

---

## What Makes This Different

In a category flooded with AI tools that instantly produce homework answers, Magic Graphs is the antidote. LLMs cannot synthesize spatial intuition. They notoriously struggle with topological reasoning. Magic Graphs allows students to visually manipulate nodes, execute mutations, and build genuine comprehension that will survive not only the exam they are studying for, but their career ahead of them as well.

But moreover: it is built with a level of engineering discipline, typed plugin architecture, transaction system, composable simulation controls, custom expression evaluator, that puts it in a different category than the landscape of hastily assembled ed-tech tools. That quality is visible to anyone who looks at the code, which matters for developer trust in the SDK and for long-term maintainability.

This was started out of love for TypeScript, graph theory, and education. That origin will always be the most important thing about it.

---

_The goal is one professor, one class, real students, real usage data. Everything else follows from that._
