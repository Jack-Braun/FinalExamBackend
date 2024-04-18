const router = require('express').Router();
const Book = require('./bookStorage');

//Get all
router.get('/', async (req, res) => {
    try{
        const books = await Book.find();
        if(!books || books.length === 0) {
            return res.status(404).json({message: "No books found"});
        }
        res.json(books);
    } catch(err) {
        res.status(500).json({message: 'Internal server error'});
    }
});

//Get by id
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

//Post new book
router.post('/', async (req, res) => {
    try {
        const {title, author, description} = req.body;
        const newBook = new Book({
            title, 
            author,
            description,
        })
        await newBook.save();
        res.status(201).json({message: "Book added successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})
    
//Update by id
router.put('/:id', async (req, res) => {
    try {
        const { title, author, description } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, { title, author, description }, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book updated successfully", updatedBook });
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json({ message: "Book deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;