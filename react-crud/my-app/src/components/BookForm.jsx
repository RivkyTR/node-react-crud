import React from 'react'
import InputBox from './InputBox'
import Button from './Button'

const BookForm = ({onSubmit, title, setTitle, author, setAuthor}) => {
  return (
    <form onSubmit={onSubmit}>
      <InputBox placeholder="title" value={title} onChange={setTitle} />
      <InputBox placeholder="author" value={author} onChange={setAuthor} />
      <Button type="submit" value="Submit" />
    </form>
  )
}

export default BookForm