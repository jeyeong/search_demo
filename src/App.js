import React, { useRef, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'

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
      <form
        style={{
          // backgroundColor: '#8a62aa',
          padding: 10,
          border: '1.5px solid rgb(221, 221, 221)',
          borderRadius: 50,
          boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
          width: 'max-content',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div
            style={{
              paddingLeft: '4px',
              paddingRight: '8px',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <SearchIcon fontSize="small" />
          </div>
          <input
            ref={searchQueryRef}
            name="query-box"
            style={{
              border: 'none',
              outline: 'none',
              width: '300px',
              fontSize: '16px',
            }}
            type="search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            placeholder="Search anything"
          />
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
