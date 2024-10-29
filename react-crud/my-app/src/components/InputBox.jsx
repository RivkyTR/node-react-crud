import React from 'react'

const InputBox = ({placeholder, value,onChange}) => {
  return (
    <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
  )
}

export default InputBox