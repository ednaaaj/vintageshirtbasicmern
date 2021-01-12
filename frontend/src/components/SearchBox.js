import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      history.push(`/search/${searchTerm}`)
    } else {
      history.push('/')
    }
  }
  return (
    <Form onSubmit={handleSubmit} inline>
      <Form.Control
        type='text'
        name='q'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search Effects...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-warning'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
