import React from 'react'

const SearchResultTile = ({ title, description, imgSrc }) => {
  return (
    <div
      style={{
        backgroundColor: '#f1f2fd',
        borderRadius: 12,
        display: 'flex',
        padding: '20px 48px 20px 24px',
        columnGap: 30,
      }}
    >
      <div
        style={{
          borderRadius: 12,
          overflow: 'hidden',
          width: 'max-content',
          height: '100px',
        }}
      >
        <img src={imgSrc} width={100} height="auto" />
      </div>
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
        <p
          style={{
            fontSize: '22px',
            fontWeight: 'bold',
            margin: 0,
          }}
        >
          {title}
        </p>
        <p
          style={{
            fontSize: '18px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

export default SearchResultTile
