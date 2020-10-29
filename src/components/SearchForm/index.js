import "./index.css";

const SearchForm = ({ value, handleChange, onSubmit }) => {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        className="search-input"
        value={value}
        name="searchString"
        type="number"
        onChange={handleChange}
        required
      />
      <button className="search-btn"> Generate</button>
    </form>
  );
};

export default SearchForm;
