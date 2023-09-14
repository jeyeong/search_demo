import React from "react";
import { Typography, Paper, Box } from "@mui/material";
const SearchResultTile = ({ title, description, imgSrc }) => {
  return (
    <Paper
      elevation={3}
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        display: "flex",
        padding: "20px 48px 20px 24px",
        columnGap: 30,
        borderColor: "#575be1",
        border: "3px solid #575be1",
      }}
    >
      <Box
        style={{
          borderRadius: 12,
          overflow: "hidden",
          width: "max-content",
          height: "100px",
        }}
      >
        <img src={imgSrc} width={100} height="auto" />
      </Box>
      <div
        style={{
          flex: 1,
          marginTop: 6,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "bold",
            margin: 0,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "16px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {description}
        </Typography>
      </div>
    </Paper>
  );
};

export default SearchResultTile;
