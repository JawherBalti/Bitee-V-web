import React, { useState } from 'react';

function Search() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  const onChange = (e) => {
    setSearch(e.target.value);
    fetch(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' +
        e.target.value
    )
      .then((res) => res.json())
      .then((res) => setResults(res.drinks));
    console.log(results);
  };
  return (
    <div>
      <input value={search} onChange={onChange} />
      {results.map((res) => (
        <p style={{ color: '#000' }} key={res.idDrink}>
          {res.strDrink}
        </p>
      ))}{' '}
    </div>
  );
}

export default Search;
