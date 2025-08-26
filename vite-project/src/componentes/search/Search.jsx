import "./../../componentes/search/search.css";

const Search = ({ query, onChange }) => {
  return (
    <div className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => onChange(e.target.value)} // función para manejar cambios
      />
    </div>
  );
};
export default Search;
