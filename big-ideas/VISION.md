# Magic Graphs: Vision & Plan

_Written June 2026. A record of the strategy._

---

## What Is Magic Graphs

Magic Graphs is a discrete mathematics IDE for CS education. Not just a generic graph tool or a visualization library but a complete interactive environment spanning the entire visual realm of undergraduate CS theory for example: BFS/DFS, Strongly Connected Components, Sets, Markov Chains, Network Flow, Trees, Path Finding, and a bunch of other canvas-representable experiences.

Each of these examples are packaged as product experiences and built with the core SDK (`@magic/graph`) and rendered with the canvas primitives in `@magic/shapes`. The products dogfood the SDK. The SDK is validated by the products. The products get better when the SDK gets better, and new product features surface the blind spots that the SDK doesn't address on a system level.

Product experiences are designed to be immediately intuitive and obviously useful. Double click to add a few nodes, drag anchors to connect them with edges, edit the edge weights and get instant feedback. On Markov Chains? Steady state vectors update, recurrent classes are highlighted, and transient states populate instantly. On Set Theory? Targeted set space highlights, mathematical syntax errors in the LaTeX keyboard are flagged, editing the set space by dragging a set provides live results.

---

## Why This Isn't Won't Be "Just A Dream" If We Execute

The [competition](./COMPETITION.md) sucks! The landscape consists of Java applications from 2003 or hard to use, clunky, and unintuitive read-only animations. None of them let a professor build a custom graph on a fluid canvas, run an algorithm, pause mid-execution, annotate it freehand, and share the exact state with 200 students via a URL or invite live collaboration with students in the classroom. Magic Graphs does all of that today.

The idea has already been validated by the real-world:

- 4th place out of 200+ at HackUMass, WolframAlpha Letter Award Winner
- Experienced organic student adoption via Piazza posts demonstrating real users found real utility immediately
- Interest from professors like Timothy Richards & Peter Haas, along with industry pros like Alexander Lichter (at SquiggleConf 2025) and other software engineers.

Our philosophy simple. Building with an emphasis on product and engineering quality, slowly, without pressure to monetize.

**We provide students, TAs, and professors with excellent tools for a fraction of the cost of stale textbooks or competing ed-tech platforms because all learners deserve a great educational experience regardless of ability to pay.**

---

## The Product Strategy

### Breadth and attention to design detail are the moat

A competitor can clone Dijkstra's. They cannot easily clone the entire discrete math curriculum with a shared canvas engine, consistent UX, annotation layer, shareable links, and simulation controls all built with an obsessive product focus and attention to detail. Catalog completeness is what converts Magic Graphs from a useful tool into the default answer to "how do I teach this visually."

For more information, read [COMPETITION.md](./COMPETITION.md)

### The demo-to-organic-adoption loop

Professors do not need to put Magic Canvas on the syllabus (although they absolutely could). They open it in lecture to demonstrate a concept. Students see it, want it, and will find our link. The Markov chain Piazza adoption demonstrates that students will see the value right away and seek the product out. I believe this to be our primary growth engine and it requires no institutional buy-in to activate.

### The professor experience must be flawless

The average professor is not a power user. They are pulling up a URL five minutes before a lecture. If loading is slow and lags, sharing a graph is a pain in the ass, or worst of all, the algorithm output is wrong only **once** in front of 200 students, Magic Graphs hangs itself. Correctness and reliability are the non-negotiables. Everything else is secondary.

---

## Making This Financially Sustainable

### Tiered by value

**Free**: Open the app, load a shared link, use the basic sandbox. No account required. Zero friction. This makes it effortless to get your hands on it, and means everyone can use Magic Graphs even if they don't have the means to upgrade to a paid tier.

**$2/semester**: Unlocks one product experience in full including the ability to take part in collaboration and graph sharing features. This is the individual student tier. Low enough that the logistical friction of account sharing outweighs the cost. Priced as an explicit signal that this is a lean, high-velocity product — not a mature enterprise suite.

**$8/semester**: Full suite access across all products and features. Natural upgrade when a student takes a second course, or a course that has very dense curriculum spanning multiple product experiences.

**Institutional / LMS integration**: Per-department annual contracts in the $5,000-15,000/year range. Canvas, Blackboard, Moodle integration. This is the tier that makes this a viable business that can justify multiple full-time maintainers. When one department head signs, every professor, student, and course staff gets access. This is where metrics from per school student adoption come in handy as the more students use it, the more proven value exists for an institution.

**White Glove Partner**: For universities that want to build their own custom product experiences on top of `@magic/graph`. We scope and co-develop the experience with them, provide direct team access, guaranteed support response times, and ongoing maintenance. $25,000-100,000+ per engagement depending on scope, with an annual retainer. Reserved for a small number of research-active partners where the relationship also generates academic visibility, think conference presentations, CS education papers, and citations that reach every CS education researcher in the world.

### Why Charge $2?

A user who won't pay $2 is not a user whose feedback is, generally speaking, reliable. The minor financial exchange filters for actual skin-in-the-game users and creates an honest feedback loop. It also sets the expectation that the product is a tool worth paying for, but a very specialized, lean tool.

### What Is Realistic In Terms of Revenue?

The US alone has ~4,000 colleges and universities, ~6,000 in the entire English speaking world, and 25,000-50,000 globally.

Globally roughly 1.5 to 2 million students graduate with computer science (CS) and related degrees worldwide, translating to 6 to 8 million active students at any given time concentrated mainly in 1. India (~1.2m) 2. USA (~600k) 3. China (~425k).

We model two scenarios: a **base case** reflecting disciplined execution and real but modest adoption, and a **high-end case** reflecting strong organic growth and institutional traction.

#### Base Case

Assume 8% of North American + Western European students at a $3.50 average semester price, and 2% of students globally at an average of $2.50.

(800,000 x 0.08) x $3.50 = $224,000 / Semester
(6,200,000 x 0.02) x $2.50 = $310,000 / Semester

= $534,000 x 2 = **$1,068,000 in Student Subscriptions Annually**

50 institutional partnerships at $8,000 each:

50 x $8,000 = **$400,000 in Institutional Contracts Annually**

2 white glove university partners at $35,000 each:

2 x $35,000 = **$70,000 in White Glove Partnerships Annually**

Base case total: **~$1.5M ARR**

#### High-End Case

Assume 12% of North American + Western European students at a $4 average semester price, and 4% of students globally at an average of $3.

(800,000 x 0.12) x $4 = $384,000 / Semester
(6,200,000 x 0.04) x $3 = $744,000 / Semester

= $1,128,000 x 2 = **$2,256,000 in Student Subscriptions Annually**

150 institutional partnerships at $10,000 each:

150 x $10,000 = **$1,500,000 in Institutional Contracts Annually**

8 white glove university partners at $50,000 each:

8 x $50,000 = **$400,000 in White Glove Partnerships Annually**

High-end total: **~$4.15M ARR**

At either scale, with a 3-5 person team and near-zero marginal infrastructure cost (compute is client-side), the margins are exceptional.

---

## The SDK Business (Year 3+ Long Term)

The Magic Graphs ed-tech platform is also the best advertisement for the SDK one could ask for. When a developer at a company building a network topology visualizer, workflow builder, or org chart tool finds Magic Graphs, they see a production-grade application built on top of `@magic/graph` and `@magic/shapes`. That is the demo. That is the proof it works.

Companies that will pay for `@magic/graph`:

- Network topology and infrastructure visualization (cybersecurity, DevOps tooling)
- Workflow and pipeline builders
- Org chart and dependency mapping tools
- Knowledge graph UIs
- Decision tree builders

All of them hit the same wall: Canvas rendering is hard, hit detection is hard, performance at scale is hard, reactive data models for graph state are hard. Magic Graphs has solved all of this and will continue to solve these problems even more elegantly as a necessary condition of our success. A small team at a B2B SaaS company will pay $1,500-3,000/year rather than spend 3 months building and owning this themselves.

10-15 SDK customers puts meaningful revenue on the board. 50 customers is a significant business line on its own.

Conservatively at 25 customers: 25 x $2,000 = $50,000 in additional annual revenue.
At real traction with 50 customers: 50 x $3,000 = **$150,000 in additional annual revenue.**

SDK revenue compounds the ed-tech business without adding meaningful overhead — the same codebase, the same engineering investment, a second revenue stream.

---

## The Timeline

### Now → September, 2026

Before September we should have completed the following:

1. Mathematical Correctness: Guarantee 100% accuracy via robust automated tests including property-based testing on all algorithm and mathematical implementations
2. Stability: No crashes, obviously glitchy or buggy behavior.
3. Polished Product Catalog: The catalog should roll-out with complete feeling and polished product experiences that all clearly have a reason for existing and rapid time-to-value.

### Fall 2026

Get in front of professors personally. Tabling events at CS buildings, targeting students leaving algorithms and discrete math lectures.

The only goal? Spread Magic Graphs to the first real users.

This will be a free "open beta" with no tiers or subscriptions. Will students get and stay on the platform?

Watch what professors do with the annotation layer. Watch what students share with each other. Watch which products get opened most. We pool analytics on everything so we can act in data informed approach going forward.

### Spring 2027

Get at least one professor to use Magic Graphs in lecture while rolling out the $2 model.

### 2027-2028

Refine based on a full year of classroom feedback. Begin SDK documentation and outreach to developer teams who have found the product organically. Pursue the first institutional LMS conversation when usage data justifies it.

### 2028-2029

The flywheel. Professors at conferences are mentioning it. Developers who evaluated the SDK are telling colleagues. Inbound starts. Each new customer costs less than the last.

### 2029+

At real scale this is a 3-5 person team generating $5-6M ARR with exceptional margins, full ownership, and the freedom to go deep on interesting problems because the business is stable. At this point we will have a durable, profitable craft software business, built on something genuinely loved by the people who use it.

---

## What Makes This Different

In a category flooded with AI tools that instantly produce homework answers, Magic Graphs is the antidote. LLMs cannot synthesize spatial intuition. They notoriously struggle with topological reasoning. Magic Graphs allows students to visually manipulate nodes, execute mutations, and build genuine comprehension that will survive not only the exam they are studying for, but their career ahead of them as well.

Moreover, we will build Magic Graphs with a level of engineering discipline that puts it in a different category than the landscape of hastily assembled ed-tech tools. That quality is visible to anyone who looks at the code, which matters for developer trust in the SDK and for long-term maintainability.

This was started out of love for TypeScript, graph theory, and education. That origin will always be the most important thing about it.
