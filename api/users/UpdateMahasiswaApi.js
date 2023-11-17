import axios from 'axios';
import { urlUsers } from '../routes/users';
import GetToken from '../utils/GetToken';

const UpdateMahasiswaApi = async ({ id, email, name, nim, prodi, phone }) => {
  try {
    const data = {
      email,
      name,
      nim,
      prodi,
      phone,
    };
    const res = await axios({
      baseURL: `${urlUsers}/mahasiswa/${id}`,
      method: 'PUT',
      data,
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

export default UpdateMahasiswaApi;
