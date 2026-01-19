# Database Query Examples - Step by Step

## Quick Reference: Common Query Patterns

### 1. User Registration Query Flow

```
Frontend (Signup.js)
    │
    │ POST /api/signup
    │ Body: { name, email, password, ... }
    │
    ▼
Backend (server.js)
    │
    │ 1. Validate input
    │ 2. Check if user exists:
    │    const existing = await User.findOne({ email });
    │    │
    │    MongoDB Query:
    │    db.users.findOne({ email: "user@example.com" })
    │    │
    │    Returns: null (if new) or user document (if exists)
    │
    │ 3. Hash password: bcrypt.hash(password, 10)
    │
    │ 4. Create user:
    │    const user = new User({ name, email, password: hashed, ... });
    │    await user.save();
    │    │
    │    MongoDB Operation:
    │    db.users.insertOne({
    │      name: "...",
    │      email: "...",
    │      password: "$2a$10$...",
    │      isVerified: false,
    │      otp: "123456",
    │      otpExpires: ISODate("..."),
    │      created_at: new Date()
    │    })
    │
    │ 5. Send OTP email
    │
    ▼
Response: { message: "User registered. OTP sent." }
```

### 2. User Login Query Flow

```
Frontend (Login.js)
    │
    │ POST /api/login
    │ Body: { email: "user@example.com", password: "pass123" }
    │
    ▼
Backend (server.js)
    │
    │ 1. Extract credentials:
    │    const { email, password } = req.body;
    │
    │ 2. Find user:
    │    const user = await User.findOne({ email });
    │    │
    │    MongoDB Query:
    │    db.users.findOne({ email: "user@example.com" })
    │    │
    │    MongoDB Process:
    │    - Uses email index (if exists)
    │    - Searches for document with matching email
    │    - Returns user document or null
    │
    │ 3. Check if user exists:
    │    if (!user) return 401
    │
    │ 4. Check verification:
    │    if (!user.isVerified) return 401
    │
    │ 5. Verify password:
    │    const isValid = await bcrypt.compare(password, user.password);
    │    │
    │    (Not a database query - cryptographic operation)
    │
    │ 6. Generate JWT token
    │
    │ 7. Return response:
    │    res.json({ token, user: {...user, password: undefined} })
    │
    ▼
Response: { token: "eyJhbG...", user: {...} }
```

### 3. Fetch Schemes by Category

```
Frontend (SearchSection.js)
    │
    │ GET /api/schemes/1
    │ (Disability type 1 = Visual Impairment)
    │
    ▼
Backend (server.js)
    │
    │ app.get('/api/schemes/:id', async (req, res) => {
    │   const disabilityType = parseInt(req.params.id); // 1
    │   const schemes = await Scheme.find({ disability_type: disabilityType });
    │   │
    │   Mongoose Query:
    │   Scheme.find({ disability_type: 1 })
    │   │
    │   MongoDB Query:
    │   db.schemes.find({ disability_type: 1 })
    │   │
    │   MongoDB Process:
    │   1. Scans schemes collection
    │   2. Filters documents where disability_type === 1
    │   3. Returns array of matching documents
    │   │
    │   Returns: [
    │     { _id: "...", name: "ADIP Scheme", disability_type: 1, ... },
    │     { _id: "...", name: "Education Scheme", disability_type: 1, ... },
    │     ...
    │   ]
    │ })
    │
    ▼
Response: Array of scheme objects
```

### 4. Get Single Scheme Details

```
Frontend (DetailInfo.js)
    │
    │ GET /api/scheme/507f1f77bcf86cd799439011
    │
    ▼
Backend (server.js)
    │
    │ app.get('/api/scheme/:id', async (req, res) => {
    │   const id = req.params.id;
    │   │
    │   // Validate ObjectId format
    │   if (!mongoose.Types.ObjectId.isValid(id)) {
    │     return res.status(400).json({ message: 'Invalid ID' });
    │   }
    │   │
    │   const scheme = await Scheme.findById(id);
    │   │
    │   Mongoose Query:
    │   Scheme.findById("507f1f77bcf86cd799439011")
    │   │
    │   MongoDB Query:
    │   db.schemes.findOne({ 
    │     _id: ObjectId("507f1f77bcf86cd799439011") 
    │   })
    │   │
    │   MongoDB Process:
    │   1. Uses _id index (automatic, very fast)
    │   2. Direct lookup by ObjectId
    │   3. Returns single document or null
    │ })
    │
    ▼
Response: Single scheme object
```

### 5. Get Recommendations (Graph-Based)

```
Frontend (DetailInfo.js)
    │
    │ GET /api/scheme/507f1f77bcf86cd799439011/recommendations?method=bfs&limit=5
    │
    ▼
Backend (server.js)
    │
    │ app.get('/api/scheme/:id/recommendations', async (req, res) => {
    │   const { id } = req.params;
    │   const { method = 'bfs', limit = 5 } = req.query;
    │   │
    │   // Option 1: Use Graph (no database query)
    │   if (schemeGraph) {
    │     const recommendations = schemeGraph.getRecommendations(id, limit, method);
    │     // Graph traversal - all in memory
    │     // No database query needed!
    │     return res.json(recommendations.map(r => r.scheme));
    │   }
    │   │
    │   // Option 2: Fallback to database
    │   // Step 1: Get the scheme
    │   const scheme = await Scheme.findById(id);
    │   │
    │   // Step 2: Find related schemes
    │   const relatedSchemes = await Scheme.find({
    │     disability_type: scheme.disability_type,
    │     _id: { $ne: id }  // Not equal to current scheme
    │   }).limit(limit);
    │   │
    │   MongoDB Queries:
    │   Query 1: db.schemes.findOne({ _id: ObjectId(id) })
    │   Query 2: db.schemes.find({ 
    │     disability_type: 1, 
    │     _id: { $ne: ObjectId(id) } 
    │   }).limit(5)
    │ })
    │
    ▼
Response: Array of recommended scheme objects
```

---

## MongoDB Query Language Examples

### Basic Queries

```javascript
// Find all documents
db.schemes.find({})

// Find with filter
db.schemes.find({ disability_type: 1 })

// Find one document
db.schemes.findOne({ name: "ADIP Scheme" })

// Find by ID
db.schemes.findOne({ _id: ObjectId("507f1f77bcf86cd799439011") })
```

### Advanced Queries

```javascript
// OR condition
db.schemes.find({
  $or: [
    { name: { $regex: "education", $options: "i" } },
    { short_description: { $regex: "education", $options: "i" } }
  ]
})

// AND condition (implicit)
db.schemes.find({
  disability_type: 1,
  name: { $regex: "scholarship", $options: "i" }
})

// Not equal
db.schemes.find({
  _id: { $ne: ObjectId("507f1f77bcf86cd799439011") }
})

// Array contains
db.schemes.find({
  benefits: "Scholarship"
})

// Limit results
db.schemes.find({ disability_type: 1 }).limit(10)

// Sort results
db.schemes.find({}).sort({ created_at: -1 })  // -1 = descending
```

---

## Mongoose vs MongoDB Native Queries

### Mongoose (What We Use)

```javascript
// Find all
const schemes = await Scheme.find({});

// Find with filter
const schemes = await Scheme.find({ disability_type: 1 });

// Find one
const scheme = await Scheme.findById(id);
const user = await User.findOne({ email: email });

// Create
const user = new User({ ... });
await user.save();

// Update
user.isVerified = true;
await user.save();
```

### MongoDB Native (Direct)

```javascript
// Using MongoDB native driver
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);
const db = client.db('informaid');

// Find all
const schemes = await db.collection('schemes').find({}).toArray();

// Find with filter
const schemes = await db.collection('schemes')
  .find({ disability_type: 1 })
  .toArray();

// Find one
const scheme = await db.collection('schemes')
  .findOne({ _id: new ObjectId(id) });

// Insert
await db.collection('users').insertOne({ ... });

// Update
await db.collection('users').updateOne(
  { _id: new ObjectId(id) },
  { $set: { isVerified: true } }
);
```

**Why We Use Mongoose:**
- Schema validation
- Type conversion
- Middleware hooks
- Easier to use
- Better error handling

---

## Complete Request-Response Example

### Example: User Login

**1. Frontend Request:**
```javascript
// src/pages/Login.js
const response = await axios.post("http://localhost:5000/api/login", {
  email: "john@example.com",
  password: "password123"
});
```

**2. HTTP Request (Browser sends):**
```http
POST /api/login HTTP/1.1
Host: localhost:5000
Content-Type: application/json
Content-Length: 65

{
  "email": "john@example.com",
  "password": "password123"
}
```

**3. Express Receives:**
```javascript
// server.js
app.post('/api/login', async (req, res) => {
  // req.body = { email: "john@example.com", password: "password123" }
  const { email, password } = req.body;
  
  // Database query
  const user = await User.findOne({ email });
  // Mongoose sends: db.users.findOne({ email: "john@example.com" })
});
```

**4. MongoDB Executes:**
```javascript
// MongoDB server processes:
db.users.findOne({ email: "john@example.com" })

// Uses email index (if exists)
// Returns document:
{
  _id: ObjectId("..."),
  email: "john@example.com",
  password: "$2a$10$hashed...",
  isVerified: true,
  name: "John Doe",
  ...
}
```

**5. Backend Processes:**
```javascript
// Verify password (not a database query)
const isValid = await bcrypt.compare(password, user.password);

// Generate token
const token = jwt.sign({ userId: user._id, email: user.email }, secret);

// Prepare response
const responseData = {
  message: 'Login successful',
  token: "eyJhbG...",
  user: { ...user, password: undefined }
};
```

**6. HTTP Response (Backend sends):**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 245

{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com",
    "disabilityType": "Visual Impairment",
    ...
  }
}
```

**7. Frontend Receives:**
```javascript
// Response received
if (response.data.token) {
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  navigate("/");
}
```

---

## Database Connection Lifecycle

### Server Startup

```
1. Node.js starts server.js
   │
   ▼
2. mongoose.connect() called
   │
   ▼
3. MongoDB driver establishes TCP connection
   │
   ▼
4. Connection pool created (multiple connections)
   │
   ▼
5. Server ready to accept requests
   │
   ▼
6. buildTrie() and buildGraph() called
   │
   │ - Fetch all schemes: Scheme.find({})
   │ - Build Trie and Graph in memory
   │
   ▼
7. Server listening on port 5000
```

### During Request

```
Request arrives
   │
   ▼
Express route handler
   │
   ▼
Mongoose query (e.g., Scheme.findById())
   │
   ▼
Mongoose gets connection from pool
   │
   ▼
Sends query to MongoDB
   │
   ▼
MongoDB executes query
   │
   ▼
Returns result
   │
   ▼
Connection returned to pool
   │
   ▼
Response sent to frontend
```

---

## Summary

### Database Architecture

- **Type:** MongoDB (NoSQL Document Database)
- **Collections:** Schemes, Users
- **ODM:** Mongoose
- **Connection:** Single connection pool, reused for all queries

### Query Flow

1. **Frontend** → HTTP Request → **Backend**
2. **Backend** → Mongoose Query → **MongoDB**
3. **MongoDB** → Documents → **Backend**
4. **Backend** → JSON Response → **Frontend**
5. **Frontend** → Update State → **UI Renders**

### Key Points

- All database operations go through Mongoose
- Queries are asynchronous (async/await)
- Connection pooling improves performance
- Indexes speed up lookups
- Error handling at each layer

This architecture ensures reliable, efficient data flow throughout the application!


