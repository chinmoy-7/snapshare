import axios from "axios";
import React, { useEffect, useState } from "react";
import "../css/booksearch.css";

function BookSearch() {
  const [loader,setLoader]=useState(false);
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  useEffect(()=>{
    if(search==""){
      setList([])
    }
  },[search])

  const handleClick = async () => {
    // console.log("Working");
    setLoader(true)
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBcHb_lxUdqiFdPrfXHWe5xdZdd4_ApLJI`
    );
    console.log(res.data.items);
    console.log(search);
    setList(res.data.items);
    setLoader(false)
  };

  return (
    <div>
      <div className="book-container">
        <div className="book-heading">
          <h1>Search for your favourite book</h1>
        </div>
        <div className="book-input">
          <input
            type="text"
            placeholder="Example: Java"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            value={search}
          />
          <button className="book-btn" onClick={handleClick}>
            Search
          </button>
        </div>

        <div className="result">
        { loader?<div className="spinner-border text-danger loader" role="status">
        <span clasNames="sr-only"></span>
        </div>:""}
          <div className="show-books">
            {list.map((book, id) => {
              return (
                <div className="book" key={id}>
                  {book.volumeInfo.imageLinks && (
                    <a target="_blank" href={book.volumeInfo.previewLink}>
                      <img src={book.volumeInfo.imageLinks.thumbnail} alt="" />
                    </a>
                  )}

                  <h3> {book.volumeInfo.title} </h3>

                  {book.volumeInfo.authors && (
                    <h5> Author: {book.volumeInfo.authors[0]}</h5>
                  )}

                  <h5>Page Count: {book.volumeInfo.pageCount}</h5>
                  <h5>Rating: {book.volumeInfo.ratingsCount}</h5>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookSearch;
