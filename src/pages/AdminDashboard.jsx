import OpenLibrarySearch from "../components/OpenLibrarySearch";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";

function AdminDashboard() {

  const navigate = useNavigate();

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    description: "",
    image: ""
  });

  const [books, setBooks] = useState([]);

  const [stats, setStats] = useState({});

  useEffect(() => {

    fetchBooks();
    fetchStats();

  }, []);

  // FETCH BOOKS

  const fetchBooks = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/books"
      );

      setBooks(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // FETCH STATS

  const fetchStats = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/admin/stats"
      );

      setStats(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // HANDLE INPUT

  const handleChange = (e) => {

    setBookData({
      ...bookData,
      [e.target.name]: e.target.value
    });

  };

  // ADD BOOK

  const addBook = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/books/add",
        bookData
      );

      alert(res.data.message);

      setBookData({
        title: "",
        author: "",
        description: "",
        image: ""
      });

      fetchBooks();
      fetchStats();

    } catch (err) {

      alert("Failed To Add Book");

    }

  };

  // DELETE BOOK

  const deleteBook = async (id) => {

    try {

      const res = await axios.delete(
        `http://localhost:5000/api/books/delete/${id}`
      );

      alert(res.data.message);

      fetchBooks();
      fetchStats();

    } catch (err) {

      alert("Delete Failed");

    }

  };

  return (

    <div style={styles.container}>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <h2 style={styles.logo}>
          📚 Admin Panel
        </h2>

        <div style={styles.menu}>

          <div style={styles.menuItem}>
            Dashboard
          </div>

          <div style={styles.menuItem}>
            Add Books
          </div>

          <div style={styles.menuItem}>
            Manage Books
          </div>

          <div
            style={styles.menuItem}
            onClick={() => navigate("/profile")}
          >
            Profile
          </div>

        </div>

      </div>

      {/* MAIN */}

      <div style={styles.main}>

        <Navbar title="Admin Dashboard" />

        {/* OPEN LIBRARY SEARCH */}

        <OpenLibrarySearch
          setBookData={setBookData}
        />

        <h1>Add New Book</h1>

        {/* STATS */}

        <div style={styles.statsContainer}>

          <div style={styles.statsCard}>
            <h3>Total Books</h3>
            <p>{stats.totalBooks}</p>
          </div>

          <div style={styles.statsCard}>
            <h3>Total Students</h3>
            <p>{stats.totalStudents}</p>
          </div>

          <div style={styles.statsCard}>
            <h3>Issued Books</h3>
            <p>{stats.issuedBooks}</p>
          </div>

        </div>

        {/* FORM */}

        <div style={styles.form}>

          <input
            type="text"
            name="title"
            placeholder="Book Title"
            value={bookData.title}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="author"
            placeholder="Author Name"
            value={bookData.author}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="image"
            placeholder="Book Cover Image URL"
            value={bookData.image}
            onChange={handleChange}
            style={styles.input}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={bookData.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button
            style={styles.button}
            onClick={addBook}
          >
            Add Book
          </button>

        </div>

        {/* BOOK LIST */}

        <h2 style={{ marginTop: "40px" }}>
          All Books
        </h2>

        <div style={styles.bookContainer}>

          {books.map((book) => (

            <div key={book._id} style={styles.card}>

              <img
                src={
                  book.image &&
                  book.image.trim() !== ""
                    ? book.image
                    : "https://covers.openlibrary.org/b/id/10523338-L.jpg"
                }
                alt={book.title}
                style={styles.bookImage}
              />

              <h3>{book.title}</h3>

              <p>
                <strong>Author:</strong> {book.author}
              </p>

              <p>{book.description}</p>

              <button
                style={styles.deleteButton}
                onClick={() => deleteBook(book._id)}
              >
                Delete Book
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

const styles = {

  container: {
    display: "flex",
    minHeight: "100vh"
  },

  sidebar: {
    width: "230px",
    background: "#020617",
    color: "white",
    padding: "20px"
  },

  logo: {
    marginBottom: "40px",
    fontSize: "28px",
    fontWeight: "700"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  menuItem: {
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    background: "rgba(255,255,255,0.05)"
  },

  main: {
    flex: 1,
    background: "#f1f5f9",
    padding: "30px"
  },

  statsContainer: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px",
    marginTop: "20px"
  },

  statsCard: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "200px",
    boxShadow: "0 0 10px rgba(0,0,0,0.08)"
  },

  form: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "420px",
    marginTop: "20px"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1"
  },

  textarea: {
    width: "100%",
    padding: "12px",
    height: "100px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  },

  bookContainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    marginTop: "20px"
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    width: "260px",
    boxShadow: "0 0 10px rgba(0,0,0,0.08)"
  },

  bookImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "15px"
  },

  deleteButton: {
    marginTop: "10px",
    width: "100%",
    padding: "10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer"
  }

};

export default AdminDashboard;