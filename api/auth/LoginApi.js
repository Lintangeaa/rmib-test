import axios from "axios"
import { urlAuth } from "../routes/auth"

const LoginApi = async ({ email, password }) => {
  try {
    const data = { email, password }
    const res = await axios({
      baseURL: `${urlAuth}/me`,
      method: "POST",
      data,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 10000,
      timeoutErrorMessage: "Request time out, coba lagi",
    })
    return res.data
  } catch (error) {
    if (error.code === "ECONNABORTED") {
      console.log(error.message)
    } else {
      return error.response.data
    }
  }
}

export default LoginApi
