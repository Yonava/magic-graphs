# Magic Graphs — Competitive Landscape

---

## The Competitive Landscape

### Direct Competitors

**VisuAlgo** (visualgo.net)
The most widely used algorithm visualization tool in university CS courses. Built by a National University of Singapore professor and maintained by a small academic team.

Why they lose:

- Read-only simulation experience. Building your own graph is clunky unintuitive and a paid in the ass.
- No dragging or rearranging nodes and edges.
- No sharing. You cannot create a specific graph state and send it to 200 students via a URL.
- No collaboration tools. Single player only.
- No annotation. A professor cannot circle a node, draw an arrow, or write on the canvas during a lecture.
- No composability. Each algorithm is a separate page with no coherent platform experience connecting them.
- Visually unappealing. It screams "academic project" not "consumer grade software."
- Huge walls of text force fed to you via endless pop-ups. Info wise very rich, but gives textbook energy.
- No rich interactivity, such as what our Canvas enabled.

**David Galles' Data Structure Visualizations** (usfca.edu)
The default fallback for professors who need something, anything, that works. Ancient UI built as individual standalone pages over many years.

Why they lose:

- Same read-only boat as VisuAlgo. You step through preset animations instead of building and exploring.
- No platform. It's a collection of disconnected tools with no UX cohesion, no sharing, no state persistence.
- Actively unmaintained. Bugs don't get fixed. Features don't get added.
- Zero mobile or modern browser optimization.
- It's really hard to use. One glance and it's the most obvious candidate for disruption.

**JFLAP**
Dominates automata theory and formal languages. Java desktop application requiring a local install (which alone is disqualifying). Captive academic audience because nothing better exists for its specific niche.

Why they lose (in our space):

- Desktop application in 2026. No sharing, no URL state, no instant access.
- Scoped entirely to automata and formal languages with no graph algorithms, no set theory, no data structures.
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
- Like a designer using MSPaint instead of Figma. No structure, components, framing, or prototyping

---

## Why We Win Against All of Them

The common thread across every competitor is the same: they built viewers, not tools. They show you a preset algorithm running on a preset graph. We built an environment where you construct the graph yourself, run any algorithm on it, pause it, annotate it, share it, and come back to it later.

That is a fundamentally different product category.

Beyond interactivity, we win on:

**Mathematical depth that earns professor trust.** The shunting-yard expression evaluator, the live transition matrix, the steady state vector computation, the simulation guard system that tells you why your graph can't run a specific algorithm are not merely cosmetic features but deeply integrated with the way Magic Graphs is engineered on the most primitive layer. Professors probe tools immediately with edge cases. We hold up.

**Platform coherence.** Every product experience shares the same canvas engine, the same annotation layer, the same shareable link mechanic, the same keyboard shortcuts, the same UI language. A professor who learns one product has learned all of them. That coherence is invisible until you've used five disconnected competitors in one semester and felt the friction.

**Time to value under a minute.** Add nodes, drag edges, run the simulation, get insight. No tutorial required. No account required. No reading a whole damn instruction manual. No friction between curiosity and comprehension.

**What professors dont have but need.** A freehand drawing layer and multiplayer collaborative classroom support on top of an interactive graph is something no competitor has. It transforms the tool from a student study aid into a professors best friend during lecture.
