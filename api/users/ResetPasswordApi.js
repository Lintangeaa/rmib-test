import axios from 'axios';
import { urlUsers } from '../routes/users';
import GetToken from '../utils/GetToken';

const ResetPasswordApi = async (id) => {
  try {
    const res = await axios({
      baseURL: `${urlUsers}/reset-password/${id}`,
      method: 'PUT',
      headers: {
        Authorization: GetToken(),
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

export default ResetPasswordApi;
