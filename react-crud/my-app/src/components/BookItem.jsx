import React from 'react'
import Button from './Button'

const BookItem = ({ book, editBook, deleteBook }) => {
    return (

        <li>
            {book.title} by {book.author}
            <Button type='button' onClick={editBook} variable={book} value="Edit" />
            <Button type='button' onClick={deleteBook} variable={book.id} value="Delete" />
        </li>

    )
}

export default BookItem