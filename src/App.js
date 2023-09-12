import React, { useState, useEffect } from 'react'
import { Chip, createTheme, ThemeProvider } from '@mui/material'
import debounce from 'lodash.debounce'

import SearchIcon from '@mui/icons-material/Search'

const theme = createTheme({
  palette: {
    primary: {
      main: '#575be1',
      contrastText: '#fff',
    },
  },
  typography: {
    fontSize: 18,
  },
})

const CATALOGS = [
  { name: 'Nike', id: 'nike' },
  { name: 'Walmart', id: 'walmart' },
  { name: 'Netflix', id: 'netflix' },
]

const App = () => {
  const [loading, setLoading] = useState(false)
  const [catalogSelected, setCatalogSelected] = useState('nike')
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  const [debouncedSearchHandler] = useState(() => {
    const searchHandler = (query, catalogId) => {
      fetch(
        `https://l2clhcofuc.execute-api.us-east-1.amazonaws.com/prod/pinecone?query=${query}&catalog_id=${catalogId}`
      )
        .then((res) => res.json())
        .then((res) => {
          setSearchResults(res.matches)
          setLoading(false)
        })
    }
    return debounce(searchHandler, 1000)
  })

  useEffect(() => {
    setLoading(true)
    debouncedSearchHandler(query, catalogSelected)
  }, [query, catalogSelected, debouncedSearchHandler])

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: 550,
          overflowX: 'hidden',
        }}
      >
        <div style={{ display: 'flex', columnGap: 6 }}>
          {CATALOGS.map(({ name, id }) => (
            <Chip
              label={name}
              onClick={() => {
                setQuery('')
                setCatalogSelected(id)
              }}
              color={'primary'}
              variant={id === catalogSelected ? 'filled' : 'outlined'}
              sx={{ fontSize: '20px', padding: '0 4px' }}
            />
          ))}
        </div>

        <form
          style={{
            marginTop: 12,
            marginBottom: 12,
            padding: 20,
            border: '1.5px solid rgb(221, 221, 221)',
            borderRadius: 50,
            boxShadow:
              '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <div
              style={{
                paddingLeft: 6,
                paddingRight: 12,
                display: 'grid',
                placeItems: 'center',
              }}
            >
              <SearchIcon />
            </div>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              name="query-box"
              style={{
                border: 'none',
                outline: 'none',
                width: '100%',
                fontSize: '18px',
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

        <div style={{ flex: 1, overflowY: 'auto' }}>
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
    </ThemeProvider>
  )
}

export default App
