/**
 * Graph Data Structure for Scheme Recommendations
 * 
 * Uses BFS (Breadth-First Search) and DFS (Depth-First Search) to find
 * related schemes based on:
 * - Same disability type
 * - Similar benefits
 * - Similar eligibility criteria
 * 
 * Graph Structure:
 * - Nodes: Schemes
 * - Edges: Relationships (similarity connections)
 * - Edge Weight: Similarity score (0-1)
 */

class GraphNode {
  constructor(scheme) {
    this.scheme = scheme;
    this.id = scheme._id.toString();
    this.neighbors = new Map(); // Map<nodeId, edgeWeight>
    this.visited = false;
  }

  addNeighbor(nodeId, weight = 1) {
    this.neighbors.set(nodeId, weight);
  }

  getNeighbors() {
    return Array.from(this.neighbors.keys());
  }
}

class SchemeGraph {
  constructor() {
    this.nodes = new Map(); // Map<schemeId, GraphNode>
    this.schemes = [];
  }

  /**
   * Add a scheme node to the graph
   */
  addNode(scheme) {
    if (!scheme || !scheme._id) return;
    
    const nodeId = scheme._id.toString();
    if (!this.nodes.has(nodeId)) {
      this.nodes.set(nodeId, new GraphNode(scheme));
      this.schemes.push(scheme);
    }
  }

  /**
   * Add an edge between two schemes with a weight (similarity score)
   */
  addEdge(schemeId1, schemeId2, weight = 1) {
    const id1 = schemeId1.toString();
    const id2 = schemeId2.toString();
    
    if (this.nodes.has(id1) && this.nodes.has(id2) && id1 !== id2) {
      this.nodes.get(id1).addNeighbor(id2, weight);
      this.nodes.get(id2).addNeighbor(id1, weight); // Undirected graph
    }
  }

  /**
   * Calculate similarity score between two schemes
   * Returns a value between 0 and 1
   */
  calculateSimilarity(scheme1, scheme2) {
    let score = 0;
    let factors = 0;

    // Factor 1: Same disability type (weight: 0.4)
    if (scheme1.disability_type === scheme2.disability_type) {
      score += 0.4;
    }
    factors += 0.4;

    // Factor 2: Common benefits (weight: 0.3)
    if (scheme1.benefits && scheme2.benefits) {
      const benefits1 = new Set(scheme1.benefits.map(b => b.toLowerCase()));
      const benefits2 = new Set(scheme2.benefits.map(b => b.toLowerCase()));
      const common = [...benefits1].filter(b => benefits2.has(b)).length;
      const total = new Set([...benefits1, ...benefits2]).size;
      if (total > 0) {
        score += 0.3 * (common / total);
      }
    }
    factors += 0.3;

    // Factor 3: Common eligibility criteria (weight: 0.2)
    if (scheme1.eligibility && scheme2.eligibility) {
      const elig1 = new Set(scheme1.eligibility.map(e => e.toLowerCase()));
      const elig2 = new Set(scheme2.eligibility.map(e => e.toLowerCase()));
      const common = [...elig1].filter(e => elig2.has(e)).length;
      const total = new Set([...elig1, ...elig2]).size;
      if (total > 0) {
        score += 0.2 * (common / total);
      }
    }
    factors += 0.2;

    // Factor 4: Similar keywords in name/description (weight: 0.1)
    const name1 = (scheme1.name || '').toLowerCase().split(/\s+/);
    const name2 = (scheme2.name || '').toLowerCase().split(/\s+/);
    const commonWords = name1.filter(w => name2.includes(w) && w.length > 3);
    if (name1.length > 0 && name2.length > 0) {
      score += 0.1 * (commonWords.length / Math.max(name1.length, name2.length));
    }
    factors += 0.1;

    return Math.min(score / factors, 1); // Normalize to 0-1
  }

  /**
   * Build the graph by calculating relationships between all schemes
   */
  buildGraph(schemes, similarityThreshold = 0.2) {
    this.clear();
    
    // Add all schemes as nodes
    schemes.forEach(scheme => this.addNode(scheme));

    // Build edges based on similarity
    const schemeArray = Array.from(this.nodes.values());
    
    for (let i = 0; i < schemeArray.length; i++) {
      for (let j = i + 1; j < schemeArray.length; j++) {
        const node1 = schemeArray[i];
        const node2 = schemeArray[j];
        const similarity = this.calculateSimilarity(node1.scheme, node2.scheme);
        
        // Add edge if similarity is above threshold
        if (similarity >= similarityThreshold) {
          this.addEdge(node1.id, node2.id, similarity);
        }
      }
    }

    console.log(`Graph built: ${this.nodes.size} nodes, ${this.getEdgeCount()} edges`);
  }

  /**
   * Get total number of edges in the graph
   */
  getEdgeCount() {
    let count = 0;
    this.nodes.forEach(node => {
      count += node.neighbors.size;
    });
    return count / 2; // Divide by 2 for undirected graph
  }

  /**
   * BFS (Breadth-First Search) - Find related schemes
   * Returns schemes in order of proximity (closest first)
   */
  bfs(startSchemeId, maxDepth = 2, limit = 10) {
    const startId = startSchemeId.toString();
    if (!this.nodes.has(startId)) return [];

    // Reset visited flags
    this.nodes.forEach(node => node.visited = false);

    const queue = [{ nodeId: startId, depth: 0, weight: 1 }];
    const visited = new Set();
    const results = [];

    while (queue.length > 0 && results.length < limit) {
      const { nodeId, depth, weight } = queue.shift();

      if (visited.has(nodeId) || depth > maxDepth) continue;
      visited.add(nodeId);

      const node = this.nodes.get(nodeId);
      node.visited = true;

      // Add to results if not the starting node
      if (nodeId !== startId) {
        results.push({
          scheme: node.scheme,
          similarity: weight,
          depth: depth
        });
      }

      // Add neighbors to queue
      if (depth < maxDepth) {
        node.getNeighbors().forEach(neighborId => {
          if (!visited.has(neighborId)) {
            const edgeWeight = node.neighbors.get(neighborId);
            queue.push({
              nodeId: neighborId,
              depth: depth + 1,
              weight: weight * edgeWeight // Multiply weights along path
            });
          }
        });
      }
    }

    // Sort by similarity (descending) and depth (ascending)
    return results.sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return b.similarity - a.similarity;
    }).slice(0, limit);
  }

  /**
   * DFS (Depth-First Search) - Find related schemes with deeper exploration
   * Useful for finding distant but potentially relevant schemes
   */
  dfs(startSchemeId, maxDepth = 3, limit = 10) {
    const startId = startSchemeId.toString();
    if (!this.nodes.has(startId)) return [];

    // Reset visited flags
    this.nodes.forEach(node => node.visited = false);

    const results = [];
    const visited = new Set();

    const dfsRecursive = (nodeId, depth, weight) => {
      if (visited.has(nodeId) || depth > maxDepth || results.length >= limit) {
        return;
      }

      visited.add(nodeId);
      const node = this.nodes.get(nodeId);
      node.visited = true;

      // Add to results if not the starting node
      if (nodeId !== startId) {
        results.push({
          scheme: node.scheme,
          similarity: weight,
          depth: depth
        });
      }

      // Recursively visit neighbors
      if (depth < maxDepth && results.length < limit) {
        const neighbors = node.getNeighbors();
        // Sort neighbors by weight (highest first) for better results
        const sortedNeighbors = neighbors.sort((a, b) => {
          return node.neighbors.get(b) - node.neighbors.get(a);
        });

        sortedNeighbors.forEach(neighborId => {
          if (!visited.has(neighborId)) {
            const edgeWeight = node.neighbors.get(neighborId);
            dfsRecursive(neighborId, depth + 1, weight * edgeWeight);
          }
        });
      }
    };

    dfsRecursive(startId, 0, 1);

    // Sort by similarity (descending)
    return results.sort((a, b) => {
      if (a.depth !== b.depth) return a.depth - b.depth;
      return b.similarity - a.similarity;
    }).slice(0, limit);
  }

  /**
   * Get recommendations using BFS (default) or DFS
   * @param {string} schemeId - ID of the scheme to get recommendations for
   * @param {number} limit - Maximum number of recommendations
   * @param {string} method - 'bfs' or 'dfs'
   */
  getRecommendations(schemeId, limit = 5, method = 'bfs') {
    if (method === 'dfs') {
      return this.dfs(schemeId, 3, limit);
    }
    return this.bfs(schemeId, 2, limit);
  }

  /**
   * Get all schemes of the same disability type (simple recommendation)
   */
  getSameDisabilityType(schemeId, limit = 5) {
    const startId = schemeId.toString();
    if (!this.nodes.has(startId)) return [];

    const startScheme = this.nodes.get(startId).scheme;
    const disabilityType = startScheme.disability_type;

    const results = [];
    this.nodes.forEach(node => {
      if (node.id !== startId && 
          node.scheme.disability_type === disabilityType) {
        results.push({
          scheme: node.scheme,
          similarity: 1.0,
          depth: 0
        });
      }
    });

    return results.slice(0, limit);
  }

  /**
   * Clear the graph
   */
  clear() {
    this.nodes.clear();
    this.schemes = [];
  }

  /**
   * Get graph statistics
   */
  getStats() {
    return {
      nodes: this.nodes.size,
      edges: this.getEdgeCount(),
      averageDegree: this.nodes.size > 0 
        ? (2 * this.getEdgeCount()) / this.nodes.size 
        : 0
    };
  }
}

export default SchemeGraph;




