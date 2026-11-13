const express = require('express');

const app = express();
const PORT = 3000;

// Parse JSON request bodies
app.use(express.json());

// Books for bookstore API
let books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        copiesAvailable: 5
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
        copiesAvailable: 3
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian Fiction",
        copiesAvailable: 7
    }
    // Add more books if you'd like!
];

// Counter so IDs are never reused after a delete
let nextId = books.length + 1;

// GET /api/books - Get all books (optional ?search= filters by title/author)
app.get('/api/books', (req, res) => {
    const { search } = req.query;
    if (search) {
        const term = String(search).toLowerCase();
        return res.json(
            books.filter(
                (b) =>
                    b.title.toLowerCase().includes(term) ||
                    b.author.toLowerCase().includes(term)
            )
        );
    }
    res.json(books);
});

// GET /api/books/:id - Get a specific book
app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

// POST /api/books - Add a new book
app.post('/api/books', (req, res) => {
    // In Express 5, req.body is undefined when no body is sent
    const { title, author, genre, copiesAvailable } = req.body || {};
    if (!title || !author) {
        return res.status(400).json({ error: 'Title and author are required' });
    }
    const newBook = {
        id: nextId++,
        title,
        author,
        genre,
        copiesAvailable: copiesAvailable !== undefined ? copiesAvailable : 1
    };
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT /api/books/:id - Update a book
app.put('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find((b) => b.id === id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const body = req.body || {};
    if (body.title !== undefined) book.title = body.title;
    if (body.author !== undefined) book.author = body.author;
    if (body.genre !== undefined) book.genre = body.genre;
    if (body.copiesAvailable !== undefined) book.copiesAvailable = body.copiesAvailable;
    res.json(book);
});

// DELETE /api/books/:id - Delete a book
app.delete('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex((b) => b.id === id);
    if (index === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }
    const [removed] = books.splice(index, 1);
    res.json(removed);
});

// Only start listening when run directly, so tests can import the app
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Books API running on http://localhost:${PORT}`);
    });
}

module.exports = app;
