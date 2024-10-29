import React from 'react'
import BookItem from './BookItem'

const BookList = ({ books, deleteBook, editBook }) => {
    return (
        <ul>
            {books.map((book) => <BookItem key={book.id} book={book} deleteBook={deleteBook} editBook={editBook} />)}
        </ul>
    )
}

export default BookList