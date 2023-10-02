import axios from 'axios';
import { urlRmib } from '../routes/rmib';

const SaveResultApi = async ({
  userId,
  result,
  minat,
  pertama,
  kedua,
  ketiga,
  keempat,
  kelima,
  keenam,
  ketujuh,
  kelapan,
  kesembilan,
  kesepuluh,
  kesebelas,
  keduabelas,
}) => {
  try {
    const data = {
      userId,
      result,
      minat,
      pertama,
      kedua,
      ketiga,
      keempat,
      kelima,
      keenam,
      ketujuh,
      kelapan,
      kesembilan,
      kesepuluh,
      kesebelas,
      keduabelas,
    };
    const res = await axios({
      baseURL: `${urlRmib}`,
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

export default SaveResultApi;
