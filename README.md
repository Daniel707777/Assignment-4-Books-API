# Assignment #4: Books API
This repository contains your starter code for the Books API assignment.

## Getting Started
1. Clone this repository to your local machine
2. Navigate to the project directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Assignment Overview
You will build a complete RESTful API for a bookstore inventory management system:
- **server.js** - Express.js server with full CRUD operations for book management
- **tests/api.test.js** - Comprehensive Jest tests for all API endpoints

## Pre-installed Dependencies
This repository comes with the following packages already configured:
- `express` - Web framework for Node.js
- `jest` - Testing framework
- `supertest` - HTTP assertion library for testing APIs

## Sample Data
Your repository includes a starter book inventory in `server.js`:
```javascript
const books = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction", copiesAvailable: 5 },
  { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", copiesAvailable: 3 },
  { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian Fiction", copiesAvailable: 7 }
];
```

## API Endpoints
| Method | Endpoint | Description | Success | Errors |
| ------ | -------- | ----------- | ------- | ------ |
| GET | `/api/books` | Retrieve all books | 200 | |
| GET | `/api/books?search=term` | Search books by title or author | 200 | |
| GET | `/api/books/:id` | Retrieve a specific book by ID | 200 | 404 |
| POST | `/api/books` | Add a new book (`title` and `author` required) | 201 | 400 |
| PUT | `/api/books/:id` | Update an existing book | 200 | 404 |
| DELETE | `/api/books/:id` | Remove a book | 200 | 404 |

### Example requests
```bash
# Create a book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{"title": "Dune", "author": "Frank Herbert", "genre": "Science Fiction", "copiesAvailable": 4}'

# Update copies available
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{"copiesAvailable": 8}'

# Delete a book
curl -X DELETE http://localhost:3000/api/books/1
```

## Running the Server
Start your development server:
```bash
npm start
```
Your API will be available at `http://localhost:3000`

## Testing
Run your automated tests:
```bash
npm test
```

## File Structure
```
server.js
tests/
└── api.test.js
package.json
README.md
```

## Notes
- Data is stored in memory, so it resets whenever the server restarts.
- IDs come from an incrementing counter, so they are never reused after a delete.

## Key Learning Objectives
- Build RESTful APIs using Express.js with proper HTTP methods
- Implement full CRUD operations (Create, Read, Update, Delete)
- Handle HTTP status codes and error responses appropriately
- Test API endpoints using Jest and Supertest
- Understand the request-response model in backend applications
- Apply REST architectural principles to API design
