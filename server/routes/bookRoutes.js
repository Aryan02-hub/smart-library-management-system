const express = require("express");

const router = express.Router();

const Book = require("../models/Book");


// ADD BOOK

// router.post("/add", async (req, res) => {

//     const { title, author, description } = req.body;

//     const newBook = new Book({
//         title,
//         author,
//         description
//     });

//     await newBook.save();

//     res.json({
//         message: "Book Added Successfully"
//     });

// });
router.post("/add", async (req, res) => {

    try {

        const { title, author, description, image } = req.body;

        const newBook = new Book({
            title,
            author,
            description,
            image
        });

        await newBook.save();

        res.json({
            message: "Book Added Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Failed To Add Book"
        });

    }

});


// GET BOOKS

router.get("/", async (req, res) => {

    const books = await Book.find();

    res.json(books);

});

router.delete("/delete/:id", async (req, res) => {

    await Book.findByIdAndDelete(req.params.id);

    res.json({
        message: "Book Deleted Successfully"
    });

});

module.exports = router;