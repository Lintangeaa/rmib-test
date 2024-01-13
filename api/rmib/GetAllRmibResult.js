import axios from 'axios';
import GetToken from '../utils/GetToken';
import { urlRmib } from '../routes/rmib';

const GetAllRmibResult = async () => {
  try {
    const res = await axios({
      method: 'GET',
      baseURL: `${urlRmib}`,
      headers: {
        Authorization: GetToken(),
      },
      timeout: 5000,
      timeoutErrorMessage: 'Request time out, coba lagi',
    });
    return res.data;
  } catch (error) {
    if (error.code === 'ECONNABORTED') {
      console.log(error.message);
    } else {
      console.log(error);
      return error.response.data;
    }
  }
};

export default GetAllRmibResult;
