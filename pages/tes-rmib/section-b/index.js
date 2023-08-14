import ButtonPrimary from "@/pages/components/button/ButtonPrimary"
import LayoutRmib from "@/pages/components/rmib/LayoutRmib"
import Link from "next/link"
import { set, get } from "local-storage"
import React, { useState } from "react"
import ButtonAbuBgt from "@/pages/components/button/ButtonAbuBgt"
import ButtonPilihan from "@/pages/components/button/ButtonPilihan"
import ButtonCategory from "@/pages/components/button/ButtonCategory"

const Index = () => {
  const numbers = Array.from({ length: 12 }, (_, index) => index + 1)
  const category1 = [
    "Outdor",
    "Mecanical",
    "Computational",
    "Science",
    "Personal Contact",
    "Aesthetic",
  ]
  const category2 = [
    "Literary",
    "Music",
    "Social Service",
    "Clarical",
    "Practical",
    "Medical",
  ]

  const [selectedFields, setSelectedFields] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCategoryMap, setSelectedCategoryMap] = useState({})
  const [selectedFieldCategory, setSelectedFieldCategory] = useState({})

  const handleFieldClick = (fieldNumber, fieldName) => {
    const existingFieldIndex = selectedFields.findIndex(
      (field) => field.number === fieldNumber
    )
    if (existingFieldIndex !== -1) {
      const updatedFields = [...selectedFields]
      updatedFields.splice(existingFieldIndex, 1)
      setSelectedFields(updatedFields)
    } else {
      setSelectedFields([
        ...selectedFields,
        { number: fieldNumber, title: fieldName },
      ])
    }
  }

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName)
    setSelectedCategoryMap((prevMap) => ({
      ...prevMap,
      [categoryName]: true,
    }))
  }

  const handleFieldCategoryChange = (fieldNumber, categoryName) => {
    setSelectedFieldCategory((prevMap) => ({
      ...prevMap,
      [fieldNumber]: categoryName,
    }))
  }

  const handleNextClick = () => {
    // Save the selected fields and category to local storage
    set("selectedFields", selectedFields)
    set("selectedCategory", selectedCategory)

    // Navigate to the next page
    const nextPageUrl = "/tes-rmib/section-b" // Change this URL to the next page's URL
    window.location.href = nextPageUrl
  }

  const sortedSelectedFields = selectedFields
    .slice()
    .sort((a, b) => a.number - b.number)

  console.log(selectedFields)
  return (
    <LayoutRmib>
      <section className="px-80">
        <div className="flex justify-center">
          <ButtonPrimary title={"Section A"} />
        </div>
        <p className="mt-12 mb-12 font-semibold text-center text-black">
          Urutkan bidang pekerjaan berikut berdasarkan yang paling kamu sukai
        </p>
        <fieldset className="flex justify-between">
          <div className="flex flex-col space-y-8">
            {category1.map((categoryName, i) => (
              <ButtonCategory
                key={i}
                title={categoryName}
                isSelected={selectedCategoryMap[categoryName]}
                onClick={() => handleCategoryClick(categoryName)}
              />
            ))}
          </div>
          <div className="mt-4">
            <p>Selected Fields:</p>
            <ul>
              {sortedSelectedFields.map((field, index) => (
                <li key={index}>
                  {field.number} - {field.title}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col space-y-8">
            {category2.map((categoryName, i) => (
              <ButtonCategory
                key={i}
                title={categoryName}
                isSelected={selectedCategoryMap[categoryName]}
                onClick={() => handleCategoryClick(categoryName)}
              />
            ))}
          </div>
        </fieldset>
      </section>
      <fieldset className="flex justify-between mt-20">
        {numbers.map((number, i) => (
          <ButtonPilihan
            key={i}
            isi={number}
            isSelected={
              selectedFields.some((field) => field.number === number) &&
              selectedCategory !== ""
            }
            onClick={() => {
              handleFieldClick(number, selectedCategory)
              handleFieldCategoryChange(number, selectedCategory)
            }}
            additionalStyle={{
              backgroundColor:
                selectedFieldCategory[number] === selectedCategory
                  ? "yellow" // Change this to your desired style
                  : "",
            }}
          />
        ))}
      </fieldset>
      <fieldset className="flex justify-between mt-40">
        <ButtonAbuBgt link={"/tes-rmib"} title={"Kembali"} />
        <ButtonAbuBgt
          link={"/tes-rmib/section-b"}
          title={"Selanjutnya"}
          onClick={handleNextClick}
        />
      </fieldset>
    </LayoutRmib>
  )
}

export default Index
