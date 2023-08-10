const url = "http://localhost:3006/graphql";
import axios from "axios";
const sendRequest = async (query,variables) => {
  const res = await axios.post(
    url,
    {
      query: query,
      variables: variables,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }
  );
  return res;
};

export default sendRequest;
