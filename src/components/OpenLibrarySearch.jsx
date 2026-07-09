import { useState } from "react";
import axios from "axios";

import "../css/openLibrary.css";

function OpenLibrarySearch({ setBookData }) {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  // SEARCH BOOKS

  const searchBooks = async () => {

    if (!search.trim()) return;

    try {

      const res = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(search)}`
      );

      setResults(res.data.docs.slice(0, 8));

    } catch (err) {

      console.log(err);

    }

  };

  // GET BEST COVER

  const getCover = (book) => {

    // First Preference → ISBN
    if (book.isbn && book.isbn.length > 0) {
      return `https://covers.openlibrary.org/b/isbn/${book.isbn[0]}-M.jpg`;
    }

    // Second Preference → cover_i
    if (book.cover_i) {
      return `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    }

    return "";

  };

  // SELECT BOOK

  const selectBook = (book) => {

    setBookData({

      title: book.title || "",

      author: book.author_name?.[0] || "Unknown",

      description:
        `Published in ${book.first_publish_year || "N/A"}`,

      image: getCover(book)

    });

  };

  return (

    <div className="open-library-container">

      <h2>Search Books From Open Library</h2>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={searchBooks}>
          Search
        </button>

      </div>

      <div className="results-container">

        {results.map((book, index) => (

          <div
            key={index}
            className="book-card"
          >

            <img
              src={
                getCover(book) ||
                "https://placehold.co/150x220?text=No+Cover"
              }
              alt={book.title}
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/150x220?text=No+Cover";
              }}
            />

            <h3>{book.title}</h3>

            <p>
              {book.author_name?.[0] || "Unknown"}
            </p>

            <button
              onClick={() => selectBook(book)}
            >
              Select
            </button>

          </div>

        ))}

      </div>

    </div>

  );

}

export default OpenLibrarySearch;