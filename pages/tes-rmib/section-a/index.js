import ButtonPrimary from "@/pages/components/button/ButtonPrimary"
import LayoutRmib from "@/pages/components/rmib/LayoutRmib"
import React, { useState, useEffect } from "react"
import ButtonAbuBgt from "@/pages/components/button/ButtonAbuBgt"
import ButtonPilihan from "@/pages/components/button/ButtonPilihan"
import ButtonCategory from "@/pages/components/button/ButtonCategory"
import { useRouter } from "next/router"
import { Alert } from "antd"
import Loader from "@/pages/components/Loader"

const Index = () => {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const numbers = Array.from({ length: 12 }, (_, index) => index + 1)
  const categories = [
    { label: "Outdoor", name: "outdoor" },
    { label: "Mecanical", name: "mecanical" },
    { label: "Computational", name: "computational" },
    { label: "Science", name: "science" },
    { label: "Personal Contact", name: "personalContact" },
    { label: "Aesthetic", name: "aesthetic" },
    { label: "Literary", name: "literary" },
    { label: "Music", name: "music" },
    { label: "Social Service", name: "socialService" },
    { label: "Clarical", name: "clarical" },
    { label: "Practical", name: "practical" },
    { label: "Medical", name: "medical" },
  ]

  const [selectedFields, setSelectedFields] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCategoryMap, setSelectedCategoryMap] = useState({})
  const [selectedFieldCategory, setSelectedFieldCategory] = useState({})
  const [fieldValues, setFieldValues] = useState({})

  const handleFieldClick = (fieldNumber, fieldName, label) => {
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

  const handleCategoryClick = (categoryName, categoryList) => {
    setSelectedCategory(categoryName)
    setSelectedCategoryMap((prevMap) => ({
      ...prevMap,
      [categoryList]: categoryName,
    }))
  }

  const handleFieldCategoryChange = (fieldNumber) => {
    if (!selectedCategory) {
      return
    }

    const selectedCategoryObj = categories.find(
      (cat) => cat.name === selectedCategory
    )

    if (!selectedCategoryObj) {
      return
    }

    const categoryName = selectedCategoryObj.name
    setSelectedFieldCategory((prevMap) => ({
      ...prevMap,
      [fieldNumber]: categoryName,
    }))

    const fieldValue = fieldNumber

    setFieldValues((prevValues) => ({
      ...prevValues,
      [categoryName]: fieldValue,
    }))
  }

  const handlePrev = () => {
    router.push("/tes-rmib")
  }

  console.log("field value", fieldValues)

  const handleNextClick = () => {
    if (Object.keys(fieldValues).length === 12) {
      setIsLoading(true)
      localStorage.setItem("value", JSON.stringify(fieldValues))
      setTimeout(() => {
        setIsLoading(false)
        router.push("/tes-rmib/section-b")
      }, 3000)
    } else {
      setAlertVisible(true)
      setMessage("Pilih semua jenis pekerjaan")
      setTimeout(() => {
        setAlertVisible(false)
      }, 2000)
    }
  }

  const sortedSelectedFields = selectedFields
    .slice()
    .sort((a, b) => a.number - b.number)

  return (
    <LayoutRmib>
      {isLoading ? <Loader /> : null}
      <section className="mb-20 md:px-16 lg:px-60">
        <div className="flex justify-center space-x-8">
          <ButtonPrimary title={"Section A"} />
        </div>
        <p className="mt-12 mb-12 font-semibold text-center text-black">
          Urutkan bidang pekerjaan berikut berdasarkan yang paling kamu sukai
        </p>

        <span className="flex justify-center">
          {alertVisible ? (
            <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-opacity-75 backdrop-blur-md">
              <Alert
                type="error"
                message={message}
                showIcon
                className="w-1/2 mb-5 text-center"
              />
            </div>
          ) : null}
        </span>

        <fieldset className="flex justify-between">
          <div className="grid grid-cols-1 gap-8">
            {categories.map((category, i) => (
              <ButtonCategory
                key={i}
                title={category.label}
                isSelected={
                  selectedCategoryMap[category.name] === category.name
                }
                onClick={() =>
                  handleCategoryClick(category.name, category.name)
                }
                className="w-full mb-4"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-8">
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
          </div>
          <div className="w-56 ">
            <table className="border border-primary">
              <thead>
                <tr>
                  <td className="px-4 py-2 border border-primary">No</td>
                  <td className="px-4 py-2 border border-primary">
                    Jenis Pekerjaan
                  </td>
                </tr>
              </thead>
              <tbody>
                {sortedSelectedFields.map((item, i) => (
                  <tr key={i}>
                    <td className="text-center border border-primary">
                      {item.number}
                    </td>
                    <td className="px-4 py-2 border border-primary">
                      {
                        categories.find(
                          (category) => category.name === item.title
                        )?.label
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
        <fieldset className="flex justify-between mt-20">
          <ButtonAbuBgt onClick={handlePrev} title={"Kembali"} />
          <ButtonAbuBgt title={"Selanjutnya"} onClick={handleNextClick} />
        </fieldset>
      </section>
    </LayoutRmib>
  )
}

export default Index
