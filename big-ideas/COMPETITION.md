# Magic Graphs — Competitive Landscape

_An honest assessment of who we compete with, why we win, what could hurt us, and how we build a moat that compounds._

---

## The Competitive Landscape

### Direct Competitors

**VisuAlgo** (visualgo.net)
The most widely used algorithm visualization tool in university CS courses. Built by a National University of Singapore professor and maintained by a small academic team.

Why they lose:

- Read-only. You watch animations, you do not interact. You cannot build your own graph, modify edge weights mid-simulation, or manipulate the structure to test your intuition.
- No sharing. You cannot create a specific graph state and send it to 200 students via a URL.
- No annotation. A professor cannot circle a node, draw an arrow, or write on the canvas during a lecture.
- No composability. Each algorithm is a separate page with no coherent platform experience connecting them.
- No simulation controls that let a professor pause mid-execution and ask the class what happens next.
- Visually dated. It communicates "academic project" not "professional tool."

**David Galles' Data Structure Visualizations** (usfca.edu)
The default fallback for professors who need something, anything, that works. Ancient UI built as individual standalone pages over many years.

Why they lose:

- Same read-only problem as VisuAlgo — you step through preset animations, you don't build and explore.
- No platform. It's a collection of disconnected tools with no shared UX, no sharing, no state persistence.
- Actively unmaintained. Bugs don't get fixed. Features don't get added.
- Zero mobile or modern browser optimization.

**JFLAP**
Dominates automata theory and formal languages. Java desktop application requiring a local install. Captive academic audience because nothing better exists for its specific niche.

Why they lose (in our space):

- Desktop application in 2026. No sharing, no URL state, no instant access.
- Scoped entirely to automata and formal languages — no graph algorithms, no set theory, no data structures.
- The tool students dread opening. High friction, low reward.

**CS50 Visualization Tools**
Harvard's CS50 has built various interactive aids attached to their course materials.

Why they lose:

- Tightly coupled to CS50's curriculum. Not general purpose.
- Not available as standalone tools professors can use independently.
- Harvard's institutional weight keeps them used within CS50, not beyond it.

**Lucidchart / Draw.io**
Not educational tools but the default answer when a student just wants to draw a graph to study from. They win by default in the absence of something better.

Why they lose:

- No algorithm execution. You can draw a graph but you cannot run Dijkstra's on it and watch it step through.
- No mathematical correctness layer. No live bipartite detection, no steady state vectors, no transition matrices.
- General purpose diagramming tools that happen to support graph-like shapes. Not built for CS education.

---

## Why We Win Against All of Them

The common thread across every competitor is the same: they built viewers, not tools. They show you a preset algorithm running on a preset graph. We built an environment where you construct the graph yourself, run any algorithm on it, pause it, annotate it, share it, and come back to it later.

That is a fundamentally different product category dressed in similar clothes.

Beyond interactivity, we win on:

**Mathematical depth that earns professor trust.** The shunting-yard expression evaluator, the live transition matrix, the steady state vector computation, the simulation guard system that tells you why your graph can't run a specific algorithm — these are not cosmetic features. They are proof that the people who built this understand the mathematics. Professors probe tools immediately with edge cases. We hold up.

**Platform coherence.** Every product experience shares the same canvas engine, the same annotation layer, the same shareable link mechanic, the same UI language. A professor who learns one product has learned all of them. That coherence is invisible until you've used five disconnected competitors in one semester and felt the friction.

**Time to value under a minute.** Add nodes, drag edges, run the simulation, get insight. No tutorial required. No account required. No friction between curiosity and comprehension.

**The annotation layer.** A freehand drawing layer on top of an interactive graph is something no competitor has. It transforms the tool from a student study aid into a professor lecture tool. That dual use case is the distribution engine.

---

## Competitive Risks

### Risk 1 — A Large Platform Bundles "Good Enough"

**The threat**: Desmos, Wolfram Alpha, Khan Academy, or a major LMS like Canvas decides to add graph algorithm visualization as a feature. They don't need to be as good as us. They just need to be good enough and already inside the workflow.

**Why it's real**: These platforms have the distribution and the institutional relationships we are still building. A Desmos graph theory module would get immediate attention from every math and CS professor who already uses Desmos.

**Why we survive it**: First, none of them are currently doing this — the niche requires genuine mathematical depth that doesn't fit their roadmaps. Second, and more importantly, we get into LMS workflows first. If Magic Graphs is already the Canvas integration at 200 universities when Desmos decides to enter, we are the thing they have to displace rather than the thing they bundle around. Professor switching costs are enormous. They don't replace tools that work.

**Mitigation**: Move fast on LMS integration once usage density justifies it. Every semester of institutional adoption is a semester of switching cost accumulating in our favor.

### Risk 2 — A Well-Funded EdTech Startup Sees the Same Gap

**The threat**: A YC-backed team of strong engineers raises $3M, hires fast, and ships a polished competitor within 18 months. They have more engineering resources than we do in the early phase.

**Why it's real**: The gap is obvious once you see it. We are not the only people who have noticed that VisuAlgo is stagnant.

**Why we survive it**: Engineering resources alone don't solve this problem. You need people who understand the mathematics deeply enough to implement it correctly and design the educational layer authentically. A funded team of generalist engineers will build something that looks impressive in a demo and fails under professor scrutiny. We have Ian. They will have contractors.

More importantly, professor trust is built over semesters, not sprints. A professor who has used Magic Graphs in two courses and recommended it to three colleagues is not switching to a better-funded competitor with a shinier UI. Academic tool adoption is slow to start and nearly impossible to reverse.

**Mitigation**: Get real professors using it before a well-funded competitor can ship. Every month of real classroom usage is a month of loyalty being built.

### Risk 3 — AI Changes How Students Learn

**The threat**: If LLMs become genuinely capable of spatial and topological reasoning, a student could ask ChatGPT to walk them through Dijkstra's interactively and the study tool use case weakens.

**Why it's real**: AI is changing every category of educational tooling. We should not assume our use case is immune.

**Why we survive it**: Current evidence shows LLMs notoriously struggle with graph reasoning and topological problems. The spatial intuition that Magic Graphs builds — dragging nodes, watching the algorithm respond, developing an embodied understanding of graph traversal — is exactly the kind of comprehension that text-based AI cannot replicate. You cannot develop spatial intuition by reading about it.

The professor demonstration use case is AI-proof regardless. A professor using Magic Graphs in lecture to show a class what happens to the shortest path when you remove an edge is not a use case that AI replaces.

**Mitigation**: Build the product that develops genuine comprehension, not just correct answers. The tools that survive AI are the ones that build skills AI cannot replicate.

---

## The Loss Leader Strategy — Why We Obsess Over Network Flow and AST

### The Kroger Principle

Kroger stocks certain items at a loss because those items are the reason a customer walks through the door. Once they're in the store for the one thing they needed, they buy everything else.

Our network flow visualizer and abstract syntax tree tool are those items.

### Why Network Flow

Ford-Fulkerson and max flow problems have the worst existing tooling of any topic in the standard algorithms curriculum. VisuAlgo's implementation is hard to follow. Most professors resort to drawing residual graphs by hand on a whiteboard or stepping through static slides. The gap between what exists and what is possible is larger here than anywhere else in our catalog.

A professor who searches for "interactive network flow visualization" and finds ours — where they can build any flow network, designate source and sink, watch augmenting paths get found iteratively, see the residual graph update in real time, and share that exact state with their class via a URL — will not go back to drawing residual graphs on a whiteboard.

They are now in our ecosystem. When they need to teach Dijkstra's next week, they are not going to VisuAlgo. They already know we do it better.

### Why Abstract Syntax Trees

ASTs are taught in compilers, programming languages, and discrete math courses. Every CS student encounters them. The current tooling is essentially nonexistent — professors draw trees on whiteboards or use generic tree diagram tools that have no awareness of expression structure.

A Magic Graphs AST product that lets a professor type an expression, watch the tree build, annotate specific nodes, and share it with students is a tool that does not exist anywhere else. It becomes the reason a programming languages professor discovers us and brings their entire course into the ecosystem.

### The Compounding Effect

Every loss leader product that earns genuine professor trust makes the rest of the catalog easier to adopt. A professor who trusts our network flow implementation trusts our Dijkstra's implementation. A professor who shares our AST tool with their compilers class shares our BFS tool with their algorithms class.

The catalog is not a feature list. It is a web of trust that compounds with every product we get right.

### What "Getting It Right" Means

Getting a loss leader product right means:

- **Mathematically provably correct.** Ian designs the test suite. We verify against multiple academic sources. We find the edge cases professors use to test tools before we ship.
- **Pedagogically designed, not just technically correct.** The step explanations, the tooltips, the simulation pacing, the visual language — all designed around how the concept is actually taught, not just how the algorithm works.
- **Shareable from day one.** A professor must be able to build a specific example, encode it in a URL, and paste it into their course page in under two minutes.
- **Annotation-ready.** The freehand layer must work seamlessly so a professor can use it live in lecture without thinking about the tool.

If we get those four things right on network flow and AST, we do not need a marketing budget. The professors find us, use us, trust us, and bring us into every other course they teach.

That is how a small team with a superior product beats a well-funded competitor that enters later. Not by outspending them. By being already trusted by the people whose opinion matters before the competitor shows up.

---

_The goal is not to win a feature comparison. The goal is to be the tool a professor reaches for without thinking about it._
