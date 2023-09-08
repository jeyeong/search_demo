import React, { useRef, useState } from 'react'

const App = () => {
  const searchQueryRef = useRef()
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState([])

  const submitHandler = (e) => {
    e.preventDefault() // prevent page refresh

    setLoading(true)

    fetch(
      `https://l2clhcofuc.execute-api.us-east-1.amazonaws.com/prod/pinecone?query=${searchQueryRef.current.value}`
    )
      .then((res) => res.json())
      .then((res) => {
        setSearchResults(res.matches)
        setLoading(false)
      })
  }

  console.log(searchResults)

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
