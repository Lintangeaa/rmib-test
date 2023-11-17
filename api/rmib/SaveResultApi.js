import axios from 'axios';
import { urlRmib } from '../routes/rmib';
import GetToken from '../utils/GetToken';

const SaveResultApi = async ({ result, minat }) => {
  try {
    const data = {
      result,
      minat,
    };
    const res = await axios({
      baseURL: `${urlRmib}`,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: GetToken(),
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

export default SaveResultApi;
