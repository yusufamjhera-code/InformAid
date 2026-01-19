# Graph-Based Scheme Recommendations

## Overview

InformAid uses **Graph Traversal (BFS/DFS)** to provide intelligent scheme recommendations. The system builds a graph where schemes are nodes, connected by similarity relationships based on disability types, benefits, and eligibility criteria.

## How It Works

### Graph Structure

```
Scheme A (Visual Impairment)
    ├── Scheme B (Visual Impairment, similar benefits) [weight: 0.8]
    ├── Scheme C (Visual Impairment, similar eligibility) [weight: 0.6]
    └── Scheme D (Different type, but similar benefits) [weight: 0.4]

Scheme B
    ├── Scheme A [weight: 0.8]
    └── Scheme E [weight: 0.7]
```

### Similarity Calculation

The graph connects schemes based on a **similarity score** (0-1) calculated from:

1. **Disability Type Match** (40% weight)
   - Same disability type = 0.4 points
   - Different type = 0 points

2. **Common Benefits** (30% weight)
   - Percentage of shared benefits
   - Example: 3 common benefits out of 5 total = 0.3 × (3/5) = 0.18

3. **Common Eligibility Criteria** (20% weight)
   - Percentage of shared eligibility requirements
   - Example: 2 common criteria out of 4 total = 0.2 × (2/4) = 0.1

4. **Similar Keywords** (10% weight)
   - Common words in scheme names/descriptions
   - Example: "Education" and "Educational" = 0.1 × similarity

**Total Similarity = Sum of all factors**

### Graph Traversal Algorithms

#### BFS (Breadth-First Search) - Default
- **Use Case**: Find closely related schemes
- **Method**: Explores neighbors level by level
- **Max Depth**: 2 levels (direct neighbors + their neighbors)
- **Best For**: Most relevant, immediate recommendations

**Example:**
```
Starting from Scheme A:
Level 0: Scheme A (start)
Level 1: Scheme B, Scheme C (direct neighbors)
Level 2: Scheme D, Scheme E (neighbors of B and C)
```

#### DFS (Depth-First Search) - Alternative
- **Use Case**: Find distant but potentially relevant schemes
- **Method**: Explores deeply before moving to next branch
- **Max Depth**: 3 levels
- **Best For**: Discovering less obvious connections

## API Endpoint

### Get Recommendations

```
GET /api/scheme/:id/recommendations
```

**Query Parameters:**
- `method` (optional): `'bfs'` or `'dfs'` (default: `'bfs'`)
- `limit` (optional): Number of recommendations (default: 5)

**Example:**
```javascript
// Get 5 recommendations using BFS
fetch('/api/scheme/507f1f77bcf86cd799439011/recommendations?method=bfs&limit=5')

// Get 10 recommendations using DFS
fetch('/api/scheme/507f1f77bcf86cd799439011/recommendations?method=dfs&limit=10')
```

**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Education Support Scheme",
    "short_description": "Financial assistance for education",
    "disability_type": 1,
    "benefits": ["Scholarship", "Books", "Tuition"],
    ...
  },
  ...
]
```

## Implementation Details

### Frontend (`src/utils/SchemeGraph.js`)

**Key Methods:**
- `buildGraph(schemes, threshold)` - Build graph from scheme array
- `bfs(schemeId, maxDepth, limit)` - Breadth-first search
- `dfs(schemeId, maxDepth, limit)` - Depth-first search
- `getRecommendations(schemeId, limit, method)` - Get recommendations
- `calculateSimilarity(scheme1, scheme2)` - Calculate similarity score

**Usage:**
```javascript
import SchemeGraph from './utils/SchemeGraph';

const graph = new SchemeGraph();
graph.buildGraph(allSchemes, 0.2); // 0.2 = minimum similarity threshold

// Get recommendations
const recommendations = graph.getRecommendations(schemeId, 5, 'bfs');
```

### Backend (`utils/graphServer.js`)

Server-side implementation with same logic, built on server startup for faster API responses.

## Performance

### Time Complexity

- **Graph Building**: O(n²) where n = number of schemes
  - Compares each scheme with every other scheme
  - Done once on server startup

- **BFS Traversal**: O(V + E) where V = vertices, E = edges
  - Typically O(n) for small graphs
  - Very fast for recommendations

- **DFS Traversal**: O(V + E)
  - Similar to BFS but explores deeper

### Space Complexity

- **Graph Storage**: O(V + E)
  - For 1000 schemes: ~2-5 MB memory
  - Edges stored as adjacency lists

## Example Use Cases

### 1. User Views "Education Support Scheme"
**Recommendations:**
- "Scholarship Program" (same disability type, similar benefits)
- "Educational Assistance" (same disability type, similar eligibility)
- "Skill Development Program" (different type, but similar benefits)

### 2. User Views "Hearing Aid Support"
**Recommendations:**
- "Hearing Equipment Scheme" (same disability type)
- "Medical Equipment Assistance" (similar benefits)
- "Disability Equipment Support" (similar eligibility)

## Benefits

1. **Intelligent Recommendations**: Not just same disability type, but considers multiple factors
2. **Scalable**: Graph structure handles large datasets efficiently
3. **Flexible**: Can use BFS for immediate recommendations or DFS for deeper exploration
4. **Fast**: O(V + E) traversal is very fast even for large graphs
5. **Weighted**: Edge weights ensure most relevant schemes appear first

## Future Enhancements

1. **User Behavior**: Track clicks and adjust weights based on user preferences
2. **Machine Learning**: Use ML to improve similarity calculations
3. **Caching**: Cache recommendations for popular schemes
4. **A/B Testing**: Test BFS vs DFS to see which users prefer
5. **Personalization**: Factor in user's disability type and profile

## Testing

To test the recommendations:

1. Start the server: `node server.js`
2. Navigate to any scheme detail page
3. Scroll down to see "Related Schemes You Might Like"
4. Click on recommended schemes to navigate

**Test Different Methods:**
```javascript
// In browser console on scheme detail page:
fetch('/api/scheme/YOUR_SCHEME_ID/recommendations?method=bfs&limit=5')
  .then(r => r.json())
  .then(console.log);

fetch('/api/scheme/YOUR_SCHEME_ID/recommendations?method=dfs&limit=5')
  .then(r => r.json())
  .then(console.log);
```

## Graph Statistics

View graph statistics in server console:
```
Server-side Graph built: { nodes: 150, edges: 450, averageDegree: 6 }
```

This shows:
- **nodes**: Number of schemes
- **edges**: Number of connections
- **averageDegree**: Average connections per scheme




