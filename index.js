// Importing Express
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import Book from "./models/book.js";
const app = express();

// Connecting to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase")
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importing Router
const router = express.Router();

// Routes
router.post("/addbook", async (req, res) => { 
    try {
        const data = req.body;
        const newBook = new Book({
            title: data.title,
            author: data.author,
            price: data.price
        });

        await newBook.save();
        res.status(200).json({ message: "Book added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding book", error: error.message });
    }
});

router.get("/getbooks", async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Error getting books", error: error.message });
    }
});

router.put("/updatebook/:id", async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
});

router.delete("/deletebook/:name", async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ title: req.params.name });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
});

// Using Local Host
app.use("/", router);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log("Access it at http://localhost:3000");
});