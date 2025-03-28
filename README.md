# Notes for reviewers: 
- I know using regex in production is a terrible idea, I have done it to mimic an AI parsing the text.
- The api key is hardcoded in code for testing purposes, it won't be like that in production of course.
- Deployed link is [Render Deployment](https://growth-gear-assignment.onrender.com/)
- Please note that it may take more than 50 seconds for the first request on the above URL because Render marks the project inactive

# Setup Instructions

### Clone the repository
```bash
git clone https://github.com/rudransh-shrivastava/growth-gear-assignment.git
cd growth-gear-assignment
```

### Install Dependencies
```bash
npm install
```

### Running the Project in Development Mode
```bash
npm run dev
``` 

# API Documentation

### 1. POST `/api/query`

**Description:** `/query` executes a query in the engine, returns a data

**Headers:**
- `Content-Type: application/json`
- `x-api-key: some_api_key_here`

**Request Body Example:**
```json
{
  "query": "find laptop in products",
}
```
**Response Body Example:**
```json
{
  "success":true,
  "data":
    [
      {
        "id":1,
        "name":"laptop",
        "price":1000,
        "category":"electronics"
      }
    ]
  }
```

### 2. POST `/api/validate`

**Description:** `/validate` validates a query and returns its SQL Query along with the parsed query data

**Headers:**
- `Content-Type: application/json`
- `x-api-key: some_api_key_here`

**Request Body Example:**
```json
{
  "query": "find laptop in products",
}
```

**Response Body Example:**
```json
{
  "success": true,
  "data": {
    "isValid": true,
    "message": "Query is valid",
    "data": {
      "table": "products",
      "where": [
        "name",
        "laptop"
      ],
      "SQLQuery": "SELECT * FROM products WHERE name = 'laptop'"
    }
  }
}
```

### 3. POST `/api/explain`

**Description:** `/explain` explains the query, this returns a explaination on how the data was formed from the db

**Headers:**
- `Content-Type: application/json`
- `x-api-key: some_api_key_here`

**Request Body Example:**
```json
{
  "query": "find laptop in products",
}
```

**Response Body Example:**
```json
{
  "success": true,
  "explaination": [
    "Starting with all products data",
    "Filtering by name = laptop"
  ]
}
```

# Curl Request Examples for /query

## Fetch all products
```bash
curl -X POST "https://growth-gear-assignment.onrender.com/api/query" \
     -H "Content-Type: application/json" \
     -H "x-api-key: some_api_key_here" \
     -d '{ "query": "show all products" }'
```

## Fetch all customers
```bash
curl -X POST "https://growth-gear-assignment.onrender.com/api/query" \
     -H "Content-Type: application/json" \
     -H "x-api-key: some_api_key_here" \
     -d '{ "query": "show all customers" }'
```

## Get total purchases in the North region
```bash
curl -X POST "https://growth-gear-assignment.onrender.com/api/query" \
     -H "Content-Type: application/json" \
     -H "x-api-key: some_api_key_here" \
     -d '{ "query": "total purchases in north" }'
```

## Find "laptop" in products
```bash
curl -X POST "https://growth-gear-assignment.onrender.com/api/query" \
     -H "Content-Type: application/json" \
     -H "x-api-key: some_api_key_here" \
     -d '{ "query": "find laptop in products" }'
```

## Find "newcustomer" in customers
```bash
curl -X POST "https://growth-gear-assignment.onrender.com/api/query" \
     -H "Content-Type: application/json" \
     -H "x-api-key: some_api_key_here" \
     -d '{ "query": "find sofa in products" }'
```

# Curl Request Examples for /validate
## Validate any query
```bash
curl -X POST "https://growth-gear-assignment.onrender.com/api/validate" \
     -H "Content-Type: application/json" \
     -H "x-api-key: some_api_key_here" \
     -d '{ "query": "show all products" }'
```

# Curl Request Examples for /explain

## Explain "total purchases in north"
```bash
curl -X POST "https://growth-gear-assignment.onrender.com/api/explain" \
     -H "Content-Type: application/json" \
     -H "x-api-key: some_api_key_here" \
     -d '{ "query": "total purchases in north" }'
```
## Explain "find laptop in products"
```bash
curl -X POST "https://growth-gear-assignment.onrender.com/api/explain" \
     -H "Content-Type: application/json" \
     -H "x-api-key: some_api_key_here" \
     -d '{ "query": "find laptop in products" }'
