const request = require('supertest');
const app = require('../server');

describe('Books API', () => {
    describe('GET /api/books', () => {
        it('returns all books with status 200', async () => {
            const res = await request(app).get('/api/books');
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);
            expect(res.body.length).toBeGreaterThanOrEqual(3);
        });

        it('includes the starter books', async () => {
            const res = await request(app).get('/api/books');
            const titles = res.body.map((b) => b.title);
            expect(titles).toEqual(
                expect.arrayContaining(['The Great Gatsby', 'To Kill a Mockingbird', '1984'])
            );
        });

        it('filters with the search query', async () => {
            const res = await request(app).get('/api/books?search=orwell');
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveLength(1);
            expect(res.body[0].title).toBe('1984');
        });
    });

    describe('GET /api/books/:id', () => {
        it('returns a specific book', async () => {
            const res = await request(app).get('/api/books/1');
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject({
                id: 1,
                title: 'The Great Gatsby',
                author: 'F. Scott Fitzgerald'
            });
        });

        it('returns 404 for a nonexistent book', async () => {
            const res = await request(app).get('/api/books/9999');
            expect(res.statusCode).toBe(404);
            expect(res.body).toHaveProperty('error');
        });
    });

    describe('POST /api/books', () => {
        it('creates a new book and returns 201', async () => {
            const newBook = {
                title: 'Dune',
                author: 'Frank Herbert',
                genre: 'Science Fiction',
                copiesAvailable: 4
            };
            const res = await request(app).post('/api/books').send(newBook);
            expect(res.statusCode).toBe(201);
            expect(res.body).toMatchObject(newBook);
            expect(res.body).toHaveProperty('id');

            const check = await request(app).get(`/api/books/${res.body.id}`);
            expect(check.statusCode).toBe(200);
            expect(check.body.title).toBe('Dune');
        });

        it('returns 400 when title or author is missing', async () => {
            const res = await request(app).post('/api/books').send({ title: 'No Author' });
            expect(res.statusCode).toBe(400);
            expect(res.body).toHaveProperty('error');
        });

        it('returns 400 when no body is sent', async () => {
            const res = await request(app).post('/api/books');
            expect(res.statusCode).toBe(400);
        });
    });

    describe('PUT /api/books/:id', () => {
        it('updates an existing book', async () => {
            const res = await request(app)
                .put('/api/books/2')
                .send({ copiesAvailable: 10, genre: 'Classic Fiction' });
            expect(res.statusCode).toBe(200);
            expect(res.body).toMatchObject({
                id: 2,
                title: 'To Kill a Mockingbird',
                copiesAvailable: 10,
                genre: 'Classic Fiction'
            });

            const check = await request(app).get('/api/books/2');
            expect(check.body.copiesAvailable).toBe(10);
        });

        it('returns 404 when updating a nonexistent book', async () => {
            const res = await request(app).put('/api/books/9999').send({ title: 'Nope' });
            expect(res.statusCode).toBe(404);
        });
    });

    describe('DELETE /api/books/:id', () => {
        it('removes a book', async () => {
            const created = await request(app)
                .post('/api/books')
                .send({ title: 'Temp Book', author: 'Temp Author' });
            const id = created.body.id;

            const res = await request(app).delete(`/api/books/${id}`);
            expect(res.statusCode).toBe(200);

            const check = await request(app).get(`/api/books/${id}`);
            expect(check.statusCode).toBe(404);
        });

        it('returns 404 when deleting a nonexistent book', async () => {
            const res = await request(app).delete('/api/books/9999');
            expect(res.statusCode).toBe(404);
        });
    });
});
