/**
 * Trie (Prefix Tree) Data Structure for Fast Autocomplete
 * 
 * This implementation provides O(m) search time complexity where m is the length of the query,
 * compared to O(n*m) for linear search where n is the number of schemes.
 * 
 * Features:
 * - Fast prefix matching
 * - Case-insensitive search
 * - Returns top N suggestions
 * - Supports multiple words (e.g., "education skill")
 */

class TrieNode {
  constructor() {
    this.children = {}; // Map of character to TrieNode
    this.isEndOfWord = false;
    this.schemes = []; // Store scheme objects that end at this node
    this.count = 0; // Number of schemes passing through this node
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
    this.allSchemes = []; // Store all schemes for reference
  }

  /**
   * Insert a scheme into the Trie
   * @param {string} word - The scheme name or searchable text
   * @param {Object} scheme - The scheme object to associate with this word
   */
  insert(word, scheme) {
    if (!word || !scheme) return;
    
    const normalizedWord = word.toLowerCase().trim();
    if (!normalizedWord) return;

    let currentNode = this.root;
    
    // Insert each character
    for (let char of normalizedWord) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
      currentNode.count++;
    }

    // Mark end of word and store scheme
    currentNode.isEndOfWord = true;
    currentNode.schemes.push(scheme);
    
    // Also store in allSchemes array for quick access
    if (!this.allSchemes.find(s => s._id === scheme._id)) {
      this.allSchemes.push(scheme);
    }
  }

  /**
   * Insert multiple words from a scheme (name, description, etc.)
   * This allows searching by any word in the scheme name
   */
  insertScheme(scheme) {
    if (!scheme || !scheme.name) return;

    // Insert the full name
    this.insert(scheme.name, scheme);

    // Insert each word separately for better matching
    const words = scheme.name.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word.length > 2) { // Only index words longer than 2 characters
        this.insert(word, scheme);
      }
    });

    // Optionally index short_description for better search
    if (scheme.short_description) {
      const descWords = scheme.short_description.toLowerCase().split(/\s+/);
      descWords.forEach(word => {
        if (word.length > 3) {
          this.insert(word, scheme);
        }
      });
    }
  }

  /**
   * Search for schemes matching the prefix
   * @param {string} prefix - The search query
   * @param {number} limit - Maximum number of results to return
   * @returns {Array} Array of matching scheme objects
   */
  search(prefix, limit = 10) {
    if (!prefix || prefix.trim().length === 0) {
      return [];
    }

    const normalizedPrefix = prefix.toLowerCase().trim();
    let currentNode = this.root;

    // Traverse to the node matching the prefix
    for (let char of normalizedPrefix) {
      if (!currentNode.children[char]) {
        return []; // No matches found
      }
      currentNode = currentNode.children[char];
    }

    // Collect all schemes from this node and its descendants
    const results = new Set(); // Use Set to avoid duplicates
    this._collectSchemes(currentNode, results, limit);

    return Array.from(results);
  }

  /**
   * Recursively collect all schemes from a node and its children
   * @private
   */
  _collectSchemes(node, results, limit) {
    if (results.size >= limit) return;

    // Add schemes from current node
    if (node.isEndOfWord) {
      node.schemes.forEach(scheme => {
        if (results.size < limit) {
          results.add(scheme);
        }
      });
    }

    // Recursively search children
    for (let char in node.children) {
      if (results.size >= limit) break;
      this._collectSchemes(node.children[char], results, limit);
    }
  }

  /**
   * Get all schemes (useful for fallback)
   */
  getAllSchemes() {
    return this.allSchemes;
  }

  /**
   * Clear the Trie
   */
  clear() {
    this.root = new TrieNode();
    this.allSchemes = [];
  }

  /**
   * Build Trie from an array of schemes
   * @param {Array} schemes - Array of scheme objects
   */
  buildFromSchemes(schemes) {
    this.clear();
    if (!Array.isArray(schemes)) return;
    
    schemes.forEach(scheme => {
      this.insertScheme(scheme);
    });
  }

  /**
   * Get statistics about the Trie
   */
  getStats() {
    const countNodes = (node) => {
      let count = 1;
      for (let char in node.children) {
        count += countNodes(node.children[char]);
      }
      return count;
    };

    return {
      totalSchemes: this.allSchemes.length,
      totalNodes: countNodes(this.root),
      rootChildren: Object.keys(this.root.children).length
    };
  }
}

export default Trie;

