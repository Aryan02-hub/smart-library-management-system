const express = require("express");

const router = express.Router();

const Issue = require("../models/Issue");
const Book = require("../models/Book");


// ISSUE BOOK

router.post("/issue", async (req, res) => {

    try {

        const { studentEmail, bookTitle } = req.body;

        const book = await Book.findOne({ title: bookTitle });

        if (!book) {
            return res.status(404).json({
                message: "Book Not Found"
            });
        }

        const newIssue = new Issue({
            studentEmail,
            bookTitle,
            image: book.image,
            author: book.author
        });

        await newIssue.save();

        res.json({
            message: "Book Issued Successfully"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error issuing book"
        });

    }

});


// GET ISSUED BOOKS

router.get("/:email", async (req, res) => {

    const issues = await Issue.find({
        studentEmail: req.params.email
    });

    res.json(issues);

});


// RETURN BOOK

router.put("/return/:id", async (req, res) => {

    const issue = await Issue.findById(req.params.id);

    if (!issue) {

        return res.json({
            message: "Issue not found"
        });

    }

    issue.returned = true;

    issue.returnDate = new Date();

    // Fine Calculation

    const currentDate = new Date();

    const issueDate = new Date(issue.issueDate);

    const diffTime = currentDate - issueDate;

    const diffDays = Math.floor(
        diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 7) {

        issue.fine = (diffDays - 7) * 10;

    }

    await issue.save();

    res.json({
        message: "Book Returned",
        fine: issue.fine
    });

});

module.exports = router;