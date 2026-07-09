require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const User = require("./models/User");
const Book = require("./models/Book");
const Issue = require("./models/Issue");

const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/bookRoutes");
const issueRoutes = require("./routes/issueRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://smart-library-management-system-chi.vercel.app"
    ],
    credentials: true,
  })
);
app.use(express.json());
console.log(process.env.MONGO_URI);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/issues", issueRoutes);

app.get("/api/admin/stats", async (req, res) => {
  const totalBooks = await Book.countDocuments();

  const totalStudents = await User.countDocuments({
    role: "student",
  });

  const issuedBooks = await Issue.countDocuments({
    returned: false,
  });

  res.json({
    totalBooks,
    totalStudents,
    issuedBooks,
  });
});

app.get("/", (req, res) => {
  res.send("Server Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});