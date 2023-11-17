import axios from 'axios';
import { urlUsers } from '../routes/users';

const SignUpApi = async ({
  username,
  email,
  password,
  role,
  name,
  nim,
  prodi,
  phone,
  gender,
}) => {
  try {
    const data = {
      username,
      email,
      password,
      role,
      name,
      nim,
      prodi,
      phone,
      gender,
    };
    const res = await axios({
      baseURL: `${urlUsers}`,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      timeout: 10000,
      timeoutErrorMessage: 'Request time out, coba lagi',
    });
    return res.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.log(error.message);
    } else {
      return error.response.data;
    }
  }
};

export default SignUpApi;
