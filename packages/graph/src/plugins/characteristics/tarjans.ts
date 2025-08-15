class TarjanGraph {
  private V: number; // Number of vertices
  private adj: number[][]; // Adjacency list
  private Time: number; // Timer to keep track of discovery time
  private SCCs: number[][] = []; // To store SCCs

  constructor(v: number) {
    this.V = v;
    this.adj = new Array(v).fill(0).map(() => []);
    this.Time = 0;
  }

  addEdge(v: number, w: number): void {
    this.adj[v].push(w);
  }

  // A recursive function that finds and prints strongly
  // connected components using DFS traversal
  private SCCUtil(
    u: number,
    low: number[],
    disc: number[],
    stackMember: boolean[],
    st: number[],
  ) {
    // Initialize discovery time and low value
    disc[u] = this.Time;
    low[u] = this.Time;
    this.Time += 1;
    stackMember[u] = true;
    st.push(u);

    // Go through all vertices adjacent to this
    for (const n of this.adj[u]) {
      if (disc[n] === -1) {
        // If n is not visited, recur for it
        this.SCCUtil(n, low, disc, stackMember, st);

        // Update low value of u for parent function calls
        low[u] = Math.min(low[u], low[n]);
      } else if (stackMember[n]) {
        // Update low value of u for back edge
        low[u] = Math.min(low[u], disc[n]);
      }
    }

    // Head node found, pop the stack and print an SCC
    if (low[u] === disc[u]) {
      let w: number;
      const scc: number[] = []; // To store SCC members
      do {
        w = st.pop()!;
        scc.push(w);
        stackMember[w] = false;
      } while (w !== u);

      this.SCCs.push(scc);
    }
  }

  // The function to do DFS traversal and find all SCCs
  SCC() {
    const disc: number[] = new Array(this.V).fill(-1); // Discovery times
    const low: number[] = new Array(this.V).fill(-1); // Low values
    const stackMember: boolean[] = new Array(this.V).fill(false); // Stack membership
    const st: number[] = []; // Stack to store nodes

    // Call the recursive helper function to find SCCs
    for (let i = 0; i < this.V; i++) {
      if (disc[i] === -1) {
        this.SCCUtil(i, low, disc, stackMember, st);
      }
    }

    return this.SCCs;
  }
}

export default TarjanGraph;
