import axios from "axios"
import GetToken from "../utils/GetToken"
import { urlAuth } from "../routes/auth"

const WhoamiApi = async () => {
  try {
    const res = await axios({
      method: "GET",
      baseURL: `${urlAuth}/me`,
      headers: {
        Authorization: GetToken(),
      },
      timeout: 5000,
      timeoutErrorMessage: "Request time out, coba lagi",
    })
    return res.data
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      console.log(error.message)
    } else {
      console.log(error)
      return error.response.data
    }
  }
}

export default WhoamiApi
