import endPoint from "../backendEndPoint";
import axios from "axios";
const handleLogout = async () => {
  const res = await axios.get(`${endPoint}/logout`, { withCredentials: true });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("email");
  window.location.reload();
  console.log(res);
};

export default handleLogout;
