import axios from "axios"
import GetToken from "../utils/GetToken"
import { urlUsers } from "../routes/users"

const GetMahasiswaById = async ({ userId }) => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: `${urlUsers}/mahasiswa/${userId}`,
      headers: {
        Authorization: GetToken(),
      },
      timeout: 5000,
      timeoutErrorMessage: "Request time out, coba lagi",
    })
    return res.data.data
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      console.log(error.message)
    } else {
      console.log(error)
      return error.response.data
    }
  }
}

export default GetMahasiswaById
