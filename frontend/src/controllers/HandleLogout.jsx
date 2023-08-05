import endPoint from "../backendEndPoint";
import axios from "axios";
const handleLogout = async () => {
  const res = await axios.get(`${endPoint}/logout`, { withCredentials: true });
  console.log(res);
};

export default handleLogout;
