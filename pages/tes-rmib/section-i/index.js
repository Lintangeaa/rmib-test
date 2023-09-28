import ButtonPrimary from "@/components/button/ButtonPrimary"
import LayoutRmib from "@/components/rmib/LayoutRmib"
import React, { useState, useEffect } from "react"
import ButtonAbuBgt from "@/components/button/ButtonAbuBgt"
import ButtonPilihan from "@/components/button/ButtonPilihan"
import ButtonCategory from "@/components/button/ButtonCategory"
import Loader from "@/components/Loader"
import { Alert } from "antd"
import { useRouter } from "next/router"
import SaveResultApi from "@/api/rmib/SaveResultApi"
import Cookies from "js-cookie"

const Index = () => {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [alertVisible, setAlertVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showNextButton, setShowNextButton] = useState(false)
  const [userId, setUserId] = useState("")
  const [result, setResult] = useState("")

  const numbers = Array.from({ length: 12 }, (_, index) => index + 1)
  const categories = [
    { label: "Social Service", name: "socialService" },
    { label: "Clarical", name: "clarical" },
    { label: "Practical", name: "practical" },
    { label: "Medical", name: "medical" },
    { label: "Outdoor", name: "outdoor" },
    { label: "Mecanical", name: "mecanical" },
    { label: "Computational", name: "computational" },
    { label: "Science", name: "science" },
    { label: "Personal Contact", name: "personalContact" },
    { label: "Aesthetic", name: "aesthetic" },
    { label: "Literary", name: "literary" },
    { label: "Music", name: "music" },
  ]

  const [selectedFields, setSelectedFields] = useState([])
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedCategoryMap, setSelectedCategoryMap] = useState({})
  const [selectedFieldCategory, setSelectedFieldCategory] = useState({})
  const [fieldValues, setFieldValues] = useState({})

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
    router.push("/tes-rmib/section-a")
  }

  const handleSelesai = () => {
    const storedValue = localStorage.getItem("accumulatedValues")
    if (Object.keys(fieldValues).length === 12) {
      if (storedValue) {
        const parsedValue = JSON.parse(storedValue)

        const accumulatedValues = { ...fieldValues }

        for (const category in parsedValue) {
          if (parsedValue.hasOwnProperty(category)) {
            if (!accumulatedValues[category]) {
              accumulatedValues[category] = parsedValue[category]
            } else {
              accumulatedValues[category] += parsedValue[category]
            }
          }
        }
        setResult(JSON.stringify(accumulatedValues))
        localStorage.setItem(
          "accumulatedValues",
          JSON.stringify(accumulatedValues)
        )
      }
      setShowNextButton(true)
    } else {
      setAlertVisible(true)
      setMessage("Pilih semua jenis pekerjaan")
      setTimeout(() => {
        setAlertVisible(false)
      }, 2000)
    }
  }

  const handleNextClick = () => {
    if (result) {
      SaveResultApi({ userId, result }).then((res) => {
        console.log(res)
        if (res.status === true) {
          console.log("Berhasil")
        } else {
          console.log("Gagal")
        }
      })
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        router.push("/tes-rmib/result")
      }, 3000)
    }
  }

  console.log("result", result)

  const sortedSelectedFields = selectedFields
    .slice()
    .sort((a, b) => a.number - b.number)

  console.log("field value", fieldValues)
  useEffect(() => {
    const id = Cookies.get("userId")

    setUserId(id)

    const cek = localStorage.getItem("accumulatedValues")
    console.log("total", cek)
  }, [])

  return (
    <LayoutRmib>
      {isLoading ? <Loader /> : null}
      <section className="mb-20 md:px-16 lg:px-60">
        <div className="flex justify-center space-x-8">
          <ButtonPrimary title={"Section B"} />
        </div>
        <p className="mt-12 mb-12 font-semibold text-center text-black">
          Urutkan bidang pekerjaan berikut berdasarkan yang paling kamu sukai
        </p>
        <span className="flex justify-center">
          {alertVisible ? (
            <Alert
              type="error"
              message={message}
              showIcon
              className="w-1/2 mb-5 text-center"
            />
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
                      {item.title}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
        <fieldset className="flex justify-between mt-20">
          <ButtonAbuBgt onClick={handlePrev} title={"Kembali"} />
          <ButtonAbuBgt onClick={handleSelesai} title={"Selesai"} />
          {showNextButton ? (
            <ButtonAbuBgt title={"Selanjutnya"} onClick={handleNextClick} />
          ) : null}
        </fieldset>
      </section>
    </LayoutRmib>
  )
}

export default Index
