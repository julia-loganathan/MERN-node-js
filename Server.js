
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3030;

app.use(bodyParser.json());
/*
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
*/
//chrgmt
const booksData = JSON.parse(fs.readFileSync('books.json', 'utf8'));



app.get('/books', (req, res) => {
    res.json(booksData);
});


app.get('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = booksData.find(book => book.id === bookId);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Livre non trouvé' });
    }
});

app.get('/books/title/:title', (req, res) => {
    const bookTitle = req.params.title;
    const book = booksData.find(book => book.title === bookTitle);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: 'Livre non trouvé' });
    }
});

//ajt
app.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.id = booksData.length + 1;
    booksData.push(newBook);
    fs.writeFileSync('books.json', JSON.stringify(booksData, null, 2), 'utf8');
    res.json(newBook);
});

//mdf
app.put('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const index = booksData.findIndex(book => book.id === bookId);
    if (index !== -1) {
        booksData[index] = { ...booksData[index], ...updatedBook };
        fs.writeFileSync('books.json', JSON.stringify(booksData, null, 2), 'utf8');
        res.json(booksData[index]);
    } else {
        res.status(404).json({ message: 'Livre non trouvé' });
    }
});

//dlt
app.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = booksData.findIndex(book => book.id === bookId);
    if (index !== -1) {
        const deletedBook = booksData.splice(index, 1)[0];
        fs.writeFileSync('books.json', JSON.stringify(booksData, null, 2), 'utf8');
        res.json(deletedBook);
    } else {
        res.status(404).json({ message: 'Livre non trouvé' });
    }
});

app.listen(port, () => {
    console.log(`Serveur démarré sur le port ${port}`);
});