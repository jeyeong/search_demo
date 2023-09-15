import React from 'react'
import { Typography, Paper, Box } from '@mui/material'
const SearchResultTile = ({ title, description, imgSrc }) => {
  const isXS = window.innerWidth < 600

  return (
    <Paper
      elevation={3}
      style={{
        backgroundColor: 'white',
        borderRadius: 12,
        display: 'flex',
        padding: isXS ? '14px 30px 14px 16px' : '20px 48px 20px 24px',
        columnGap: isXS ? 26 : 30,
        border: '2px solid #575be1',
      }}
    >
      <Box
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          width: 'max-content',
          height: isXS ? '70px' : '100px',
        }}
      >
        <img src={imgSrc} width={isXS ? 70 : 100} height="auto" />
      </Box>
      <div
        style={{
          flex: 1,
          marginTop: 6,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '18px', sm: '20px' },
            fontWeight: 'bold',
            margin: 0,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: '14.5px', sm: '16px' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {description}
        </Typography>
      </div>
    </Paper>
  )
}

export default SearchResultTile
