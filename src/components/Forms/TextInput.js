import React from "react"
const TextInput = ({ type, placeholder, error, label, value, onChange }) => {
  const change = e => onChange(e.target.value)

  return (
    <div className="FormInputContainer">
      <div className="FormInput">
        {label && <label className="InputLabel">{label}</label>}
        <input
          type={type ?? "text"}
          placeholder={placeholder ?? ""}
          value={value}
          onChange={change}
          className="Input"
        />
        <label className="Borders">
          <span className="Left" />
          <span className="Right" />
          <span className="Top" />
          <span className="Bottom" />
        </label>
      </div>
      {error && <div className="FormError">{error}</div>}
    </div>
  )
}

export default TextInput
