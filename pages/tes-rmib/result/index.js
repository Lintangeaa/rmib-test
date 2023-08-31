import Layout from "@/components/Layout"
import React, { useEffect, useState } from "react"

const Result = () => {
  const [sortedValues, setSortedValues] = useState([])
  const [topCategory, setTopCategory] = useState("")
  const [totalValue, setTotalValue] = useState(0)

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

  useEffect(() => {
    const result = localStorage.getItem("accumulatedValues")
    const parsedResult = JSON.parse(result)

    // Convert object values into an array of objects
    const valuesArray = Object.entries(parsedResult).map(
      ([category, value]) => ({
        category,
        value,
      })
    )

    const sortedArray = valuesArray.sort((a, b) => a.value - b.value)

    setSortedValues(sortedArray)

    if (sortedArray.length > 0) {
      setTopCategory(sortedArray[0].category)
    }

    const calculatedTotalValue = valuesArray.reduce(
      (total, item) => total + item.value,
      0
    )
    setTotalValue(calculatedTotalValue)
  }, [])

  console.log("total", totalValue)

  return (
    <Layout>
      <section className="justify-center px-60">
        <h1 className="my-8 font-semibold text-center text-black">
          Hasil PSIKOTES RMIB
        </h1>
        <div className="flex justify-between">
          <fieldset className="w-1/2 p-2 border-2 rounded-lg border-primary">
            <p>Nama: User Test</p>
            <p>NIM : - </p>
            <p>
              Jenis pekerjaan yang paling anda minati adalah{" "}
              <span className="font-semibold text-primary">
                {categories.find((cat) => cat.name === topCategory)?.label}
              </span>
            </p>
          </fieldset>
          <fieldset className="flex flex-col items-center p-2">
            <p>Tabel urutan pekerjaan dari paling disukai </p>
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
                {sortedValues.map((item, i) => (
                  <tr key={i}>
                    <td className="text-center border border-primary">
                      {i + 1}
                    </td>
                    <td className="px-4 border border-primary">
                      {
                        categories.find((cat) => cat.name === item.category)
                          ?.label
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </fieldset>
        </div>
      </section>
    </Layout>
  )
}

export default Result
