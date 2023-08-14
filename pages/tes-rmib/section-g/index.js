import ButtonAbuBgt from "@/pages/components/button/ButtonAbuBgt"
import ButtonPrimary from "@/pages/components/button/ButtonPrimary"
import LayoutRmib from "@/pages/components/rmib/LayoutRmib"
import Link from "next/link"
import React from "react"
import ButtonPilihan from "@/pages/components/button/ButtonPilihan"

const index = () => {
  const numbers = Array.from({ length: 12 }, (_, index) => index + 1)
  return (
    <LayoutRmib>
      <section className="px-80">
        <div className="flex justify-center">
          <ButtonPrimary title={"Section G"} />
        </div>
        <p className="mt-12 mb-12 font-semibold text-center text-black">
          Urutkan bidang pekerjaan berikut berdasarkan yang paling kamu sukai
        </p>
        <fieldset className="flex justify-between">
          <div className="flex flex-col space-y-8">
            <ButtonPrimary title={"Outdor"} />
            <ButtonPrimary title={"Mecanical"} />
            <ButtonPrimary title={"Computational"} />
            <ButtonPrimary title={"Science"} />
            <ButtonPrimary title={"Personal Contact"} />
            <ButtonPrimary title={"Aesthetic"} />
          </div>
          <div className="flex flex-col space-y-8">
            <ButtonPrimary title={"Literary"} />
            <ButtonPrimary title={"Music"} />
            <ButtonPrimary title={"Social Service"} />
            <ButtonPrimary title={"Clarical"} />
            <ButtonPrimary title={"Praktical"} />
            <ButtonPrimary title={"Medical"} />
          </div>
        </fieldset>
        <fieldset className="flex justify-between mt-20">
          {numbers.map((number, i) => (
            <ButtonPilihan key={i} isi={number} />
          ))}
        </fieldset>
      </section>
      <fieldset className="flex justify-between mt-40">
        <ButtonAbuBgt link={"/tes-rmib/section-f"} title={"Kembali"} />
        <ButtonAbuBgt link={"/tes-rmib/section-h"} title={"Selanjutnya"} />
      </fieldset>
    </LayoutRmib>
  )
}

export default index
