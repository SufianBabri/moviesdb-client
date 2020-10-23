import React from "react";

const SearchBox = ({ name, value, onChange }) => {
  return (
    <input
      type="text"
      name={name}
      className="form-control my-3"
      placeholder="Search..."
      value={value}
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
