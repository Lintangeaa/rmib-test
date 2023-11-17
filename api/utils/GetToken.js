import Cookies from 'js-cookie';

const GetToken = () => {
  const token = Cookies.get('token');
  token ? token : 'Unauthorized';
  return `Bearer ${token}`;
};

export default GetToken;
