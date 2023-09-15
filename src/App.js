import React, { useState, useEffect } from "react";
import {
  Chip,
  createTheme,
  ThemeProvider,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import debounce from "lodash.debounce";

import SearchIcon from "@mui/icons-material/Search";

import SearchResultTile from "./SearchResultTile";

const theme = createTheme({
  palette: {
    primary: {
      main: "#575be1",
      contrastText: "#fff",
    },
    white: {
      main: "#FFFFFF",
    },
  },
  typography: {
    fontSize: 18,
  },
});

const CATALOGS = [
  // { name: 'Nike', id: 'nike' },
  // { name: 'Walmart', id: 'walmart' },
  // { name: 'Netflix', id: 'netflix' },
  {
    name: "Movies",
    id: "movies",
    placeholder: "E.g. Super hero movies for my 10 year old",
    getters: {
      getTitle: (item) => item.Title,
      getDescription: (item) => item.Overview,
      getImgSrc: (item) => item.Poster_Url,
    },
  },
  {
    name: "Groceries",
    id: "groceries",
    placeholder: "Wine pairings for date night",
    getters: {
      getTitle: (item) => item.name,
      getDescription: (item) => item.description,
      getImgSrc: (item) => `https://${item.images}`,
    },
  },
];

const App = () => {
  const [loading, setLoading] = useState(false);
  const [catalogSelected, setCatalogSelected] = useState(0);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [debouncedSearchHandler] = useState(() => {
    const searchHandler = (query, catalogId) => {
      fetch(
        `https://l2clhcofuc.execute-api.us-east-1.amazonaws.com/prod/pinecone?query=${query}&catalog_id=${catalogId}`
      )
        .then((res) => res.json())
        .then((res) => {
          setSearchResults(res.matches);
          setLoading(false);
        });
    };
    return debounce(searchHandler, 1000);
  });

  useEffect(() => {
    setLoading(true);
    debouncedSearchHandler(query, CATALOGS[catalogSelected].id);
  }, [query, catalogSelected, debouncedSearchHandler]);

  const { getters } = CATALOGS[catalogSelected];

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          flexDirection: "column",
          height: 600,
          overflowX: "hidden",
          backgroundColor: "#27242C",
          padding: 40,
          paddingTop: 25,
          borderRadius: 12,
        }}
      >
        <Box
          sx={{
            borderRadius: "20px",
            backgroundColor: "primary.main",
            width: "150px",
            p: 1,
            alignSelf: "end",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            color="white.main"
            sx={{ fontSize: "14px", fontWeight: "bold" }}
          >
            TRY IT YOURSELF!
          </Typography>
        </Box>
        {/* <div style={{ display: "flex", columnGap: 12 }}>
          {CATALOGS.map(({ name, id }, index) => (
            <Chip
              key={id}
              label={name}
              onClick={() => {
                setQuery("");
                setCatalogSelected(index);
              }}
              color={"primary"}
              variant={index === catalogSelected ? "filled" : "outlined"}
              sx={{
                fontSize: "20px",
                padding: "20px 8px",
                borderRadius: "30px",
                backgroundColor: index !== catalogSelected && "#eee",
                border: "1.5px solid rgba(87,91,225,0.7)",
                ":hover": {
                  backgroundColor:
                    index !== catalogSelected && "#fff !important",
                },
                fontWeight: "bold",
              }}
            />
          ))}
        </div> */}

        <form
          style={{
            marginTop: 18,
            marginBottom: 10,
            padding: 16,
            border: "1.5px solid rgb(221, 221, 221)",
            borderRadius: 50,
            boxShadow:
              "0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)",
            backgroundColor: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div
              style={{
                paddingLeft: 6,
                paddingRight: 12,
                display: "grid",
                placeItems: "center",
              }}
            >
              <SearchIcon />
            </div>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              name="query-box"
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                fontSize: "18px",
              }}
              type="search"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              placeholder={CATALOGS[catalogSelected].placeholder}
            />
          </div>
        </form>

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            marginTop: 16,
            paddingRight: 8,
            display: "flex",
            flexDirection: "column",
            rowGap: 16,
          }}
        >
          {loading ? (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="white" size={50} />
            </Box>
          ) : (
            searchResults.map(({ metadata }, index) => (
              <SearchResultTile
                key={`${metadata.name}-${index}`}
                title={getters.getTitle(metadata)}
                description={getters.getDescription(metadata)}
                imgSrc={getters.getImgSrc(metadata)}
              />
            ))
          )}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
