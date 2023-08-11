const url = "http://localhost:3006/graphql";
import endPoint from "../backendEndPoint";
import axios from "axios";
const sendRequest = async (query, variables) => {
  try {
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
  } catch (err) {
  
    try {
      const res = await axios.get(`${endPoint}/refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("accessToken", res.data.accessToken);
      const result = await axios.post(
        url,
        {
          query: query,
          variables: variables,
        },
        {
          headers: {
            Authorization: `Bearer ${res.data.accessToken}`,
          },
        }
      );
      return result;
    } catch (err) {
    
      console.log(err.message);
    }
  }
};

export default sendRequest;
