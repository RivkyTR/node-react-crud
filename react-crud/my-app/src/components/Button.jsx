import React from 'react'

const Button = ({ type = "button", onClick, variable, value }) => {
    return (
        <button type={type}
            onClick={type === "submit" ? undefined : () => { onClick(variable) }}>{value}
        </button>
    )
}

export default Button