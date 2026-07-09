
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

import {
  FaBook,
  FaHome,
  FaUser,
  FaClipboardList
} from "react-icons/fa";

function StudentDashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [books, setBooks] = useState([]);

  const [issuedBooks, setIssuedBooks] = useState([]);

  const [search, setSearch] = useState("");

  useEffect(() => {

    fetchBooks();
    fetchIssuedBooks();

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

  // FETCH ISSUED BOOKS

  const fetchIssuedBooks = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/issues/${user.email}`
      );

      setIssuedBooks(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  // ISSUE BOOK

  const issueBook = async (title) => {

    try {

      const res = await axios.post(
        "http://localhost:5000/api/issues/issue",
        {
          studentEmail: user.email,
          bookTitle: title
        }
      );

      alert(res.data.message);

      fetchIssuedBooks();

    } catch (err) {

      alert("Failed To Issue Book");

    }

  };

  // RETURN BOOK

  const returnBook = async (id) => {

    try {

      const res = await axios.put(
        `http://localhost:5000/api/issues/return/${id}`
      );

      alert(
        `${res.data.message} | Fine: ₹${res.data.fine}`
      );

      fetchIssuedBooks();

    } catch (err) {

      alert("Return Failed");

    }

  };

  return (

    <div style={styles.container}>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <h2 style={styles.logo}>
          📚 Library
        </h2>

        <div style={styles.menu}>

          <div style={styles.menuItem}>
            <FaHome />
            <span>Dashboard</span>
          </div>

          <div style={styles.menuItem}>
            <FaBook />
            <span>Books</span>
          </div>

          <div style={styles.menuItem}>
            <FaClipboardList />
            <span>Issued Books</span>
          </div>

          <div
            style={styles.menuItem}
            onClick={() => navigate("/profile")}
          >
            <FaUser />
            <span>Profile</span>
          </div>

        </div>

      </div>

      {/* MAIN */}

      <div style={styles.main}>

        <Navbar title="Student Dashboard" />

        <h1 style={styles.heading}>
          Welcome {user?.username}
        </h1>

        <h2>Available Books</h2>

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search Books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        {/* BOOKS */}

        <div style={styles.bookContainer}>

          {books
            .filter((book) =>
              book.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((book) => (

              <div key={book._id} style={styles.card}>

                <img
  src={
    book.image &&
    book.image.trim() !== ""
      ? book.image
      : "https://upload.wikimedia.org/wikipedia/en/d/d6/Atomic_Habits.jpg"
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
                  style={styles.button}
                  onClick={() => issueBook(book.title)}
                >
                  Issue Book
                </button>

              </div>

            ))}

        </div>

        {/* ISSUED BOOKS */}

        <h2 style={{ marginTop: "40px" }}>
          Issued Books
        </h2>

        <div style={styles.bookContainer}>

          {issuedBooks.map((item) => (

  <div key={item._id} style={styles.card}>

    <img
      src={
        item.image && item.image.trim() !== ""
          ? item.image
          : "https://placehold.co/220x300?text=No+Cover"
      }
      alt={item.bookTitle}
      style={styles.bookImage}
      onError={(e) => {
        e.target.src =
          "https://placehold.co/220x300?text=No+Cover";
      }}
    />

    <h3>{item.bookTitle}</h3>

    <p>
      <strong>Author:</strong>{" "}
      {item.author || "Unknown"}
    </p>

    <p>
      Fine: ₹{item.fine}
    </p>

    <p>
      <strong>Status:</strong>{" "}
      {item.returned ? "Returned" : "Issued"}
    </p>

    {!item.returned && (

      <button
        style={styles.button}
        onClick={() => returnBook(item._id)}
      >
        Return Book
      </button>

    )}

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
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "14px",
    borderRadius: "12px",
    cursor: "pointer",
    background: "rgba(255,255,255,0.05)"
  },

  main: {
    flex: 1,
    background: "#f1f5f9",
    padding: "20px"
  },

  heading: {
    marginBottom: "20px"
  },

  searchInput: {
    width: "320px",
    padding: "12px",
    marginTop: "15px",
    marginBottom: "20px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1"
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

  button: {
    marginTop: "10px",
    padding: "12px",
    width: "100%",
    background: "#2563eb",
    color: "white",
    border: "none",
    cursor: "pointer",
    borderRadius: "8px"
  }

};

export default StudentDashboard;