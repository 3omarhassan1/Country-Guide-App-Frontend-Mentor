import React, { useState } from "react";

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("");

  const mySubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };


  return (
    <form className="col-md-6 col-sm-12" onSubmit={mySubmit}>
      <input
        type="text"
        className="bg2 br p-3 ps-5 w-100"
        placeholder="Search..."
        value={input}
        onChange={(e) => {
          onSearch(e.target.value);
          setInput(e.target.value);
        }}
      />
    </form>
  );
};

export default Search;
