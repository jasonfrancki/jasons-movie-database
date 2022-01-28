import React from 'react'
import { useGlobalContext } from './context'
import './SearchForm.css'
import { TextField, Button } from '@mui/material'

const Form = () => {
  const { query, setQuery } = useGlobalContext()
  const updateQuery = (e) => setQuery(e.target.value)
  return (
    <header className="header">
      <img className="logo" src="./img/jmdb2.png" alt="" />
      <div className="form">
        <TextField
          style={{ borderRadius: '0px' }}
          id="standard-basic"
          label="Search"
          variant="outlined"
          value={query}
          onChange={updateQuery}
        />
        <Button
          style={{
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
          }}
          className="clearBtn"
          variant="outlined"
          onClick={() => setQuery('')}
        >
          Clear
        </Button>
      </div>
    </header>
  )
}

export default Form
