/**
 * Graph Manager - Singleton pattern to manage the scheme graph
 * Builds and maintains the graph for recommendations
 */

import SchemeGraph from './SchemeGraph';

class GraphManager {
  constructor() {
    this.graph = new SchemeGraph();
    this.isBuilt = false;
    this.schemes = [];
  }

  /**
   * Initialize the graph with schemes
   */
  async initialize() {
    if (this.isBuilt && this.schemes.length > 0) {
      return; // Already initialized
    }

    try {
      // Fetch all schemes
      let allSchemes = [];
      for (let id = 1; id <= 4; id++) {
        const res = await fetch(`/api/schemes/${id}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          allSchemes = allSchemes.concat(data);
        }
      }

      this.schemes = allSchemes;
      this.graph.buildGraph(allSchemes, 0.2); // 0.2 similarity threshold
      this.isBuilt = true;
      
      console.log('Graph initialized:', this.graph.getStats());
    } catch (err) {
      console.error('Error initializing graph:', err);
    }
  }

  /**
   * Get recommendations for a scheme
   */
  getRecommendations(schemeId, limit = 5, method = 'bfs') {
    if (!this.isBuilt) {
      console.warn('Graph not built yet. Returning empty recommendations.');
      return [];
    }

    return this.graph.getRecommendations(schemeId, limit, method);
  }

  /**
   * Rebuild graph (useful when schemes are updated)
   */
  async rebuild() {
    this.isBuilt = false;
    await this.initialize();
  }

  /**
   * Get graph instance
   */
  getGraph() {
    return this.graph;
  }
}

// Singleton instance
const graphManager = new GraphManager();

export default graphManager;




