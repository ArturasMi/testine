import React from "react"
import Autocomplete from "react-google-autocomplete"

const AutocompleteInput = ({
  type,
  placeholder,
  error,
  label,
  value,
  onChange,
  onPlaceSelected,
  componentRestrictions,
}) => {
  const change = e => onChange(e.target.value)

  return (
    <div className="FormInputContainer">
      <div className="FormInput">
        {label && <label className="InputLabel">{label}</label>}
        <Autocomplete
          defaultValue={value}
          onPlaceSelected={onPlaceSelected}
          types={type}
          componentRestrictions={componentRestrictions}
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

export default AutocompleteInput
