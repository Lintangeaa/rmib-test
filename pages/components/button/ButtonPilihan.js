import React from "react"
import PropTypes from "prop-types"

const ButtonPilihan = ({ isi, isSelected, onClick }) => {
  return (
    <button
      className={`py-3 px-6 w-20 text-center font-semibold text-white rounded-md focus:outline-none ${
        isSelected ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
      }`}
      onClick={onClick}
    >
      {isi}
    </button>
  )
}

ButtonPilihan.propTypes = {
  isi: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ButtonPilihan
