import React from "react"
import PropTypes from "prop-types"

const ButtonCategory = ({ title, isSelected, onClick }) => {
  return (
    <button
      className={`font-bold text-white rounded-lg w-44 h-11 ${
        isSelected ? "bg-primary" : "bg-opacity-50 bg-primary"
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

ButtonCategory.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ButtonCategory
