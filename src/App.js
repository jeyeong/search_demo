import React, { useRef, useState } from 'react'

const App = () => {
  const searchQueryRef = useRef()
  const datasetSelectRef = useRef()
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const submitHandler = (e) => {
    e.preventDefault() // prevent page refresh

    setLoading(true)

    fetch(
      `https://l2clhcofuc.execute-api.us-east-1.amazonaws.com/prod/pinecone?query=${searchQueryRef.current.value}&catalog_id=${datasetSelectRef.current.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res.matches)
        setLoading(false)
      })
  }

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <label htmlFor="query-box">Search anything</label>
        <div>
          <input ref={searchQueryRef} name="query-box" />
          <input type="submit" value="Search" />
        </div>
      </form>

      <div>
        <p style={{ marginBottom: 0 }}>Dataset</p>
        <select ref={datasetSelectRef}>
          <option value="nike">Nike</option>
          <option value="walmart">Walmart</option>
        </select>
      </div>

      <div>
        <h2>Search Results</h2>
        {loading
          ? 'loading...'
          : searchResults.map(({ metadata }) => (
              <div key={metadata.name}>
                <h4>{metadata.name}</h4>
                <p>{metadata.description}</p>
              </div>
            ))}
      </div>
    </div>
  )
}

export default App
