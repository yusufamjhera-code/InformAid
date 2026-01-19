/**
 * Server-side Trie implementation for Node.js
 * This can be used for server-side search optimization
 */

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
    this.schemeIds = [];
    this.count = 0;
  }
}

class ServerTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word, schemeId) {
    if (!word || !schemeId) return;
    
    const normalizedWord = word.toLowerCase().trim();
    if (!normalizedWord) return;

    let currentNode = this.root;
    
    for (let char of normalizedWord) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode();
      }
      currentNode = currentNode.children[char];
      currentNode.count++;
    }

    currentNode.isEndOfWord = true;
    if (!currentNode.schemeIds.includes(schemeId)) {
      currentNode.schemeIds.push(schemeId);
    }
  }

  insertScheme(scheme) {
    if (!scheme || !scheme.name || !scheme._id) return;

    const schemeId = scheme._id.toString();
    
    // Insert full name
    this.insert(scheme.name, schemeId);

    // Insert each word
    const words = scheme.name.toLowerCase().split(/\s+/);
    words.forEach(word => {
      if (word.length > 2) {
        this.insert(word, schemeId);
      }
    });

    if (scheme.short_description) {
      const descWords = scheme.short_description.toLowerCase().split(/\s+/);
      descWords.forEach(word => {
        if (word.length > 3) {
          this.insert(word, schemeId);
        }
      });
    }
  }

  search(prefix, limit = 10) {
    if (!prefix || prefix.trim().length === 0) {
      return [];
    }

    const normalizedPrefix = prefix.toLowerCase().trim();
    let currentNode = this.root;

    for (let char of normalizedPrefix) {
      if (!currentNode.children[char]) {
        return [];
      }
      currentNode = currentNode.children[char];
    }

    const results = new Set();
    this._collectSchemeIds(currentNode, results, limit);

    return Array.from(results);
  }

  _collectSchemeIds(node, results, limit) {
    if (results.size >= limit) return;

    if (node.isEndOfWord) {
      node.schemeIds.forEach(id => {
        if (results.size < limit) {
          results.add(id);
        }
      });
    }

    for (let char in node.children) {
      if (results.size >= limit) break;
      this._collectSchemeIds(node.children[char], results, limit);
    }
  }

  buildFromSchemes(schemes) {
    this.root = new TrieNode();
    if (!Array.isArray(schemes)) return;
    
    schemes.forEach(scheme => {
      this.insertScheme(scheme);
    });
  }

  clear() {
    this.root = new TrieNode();
  }
}

module.exports = ServerTrie;

