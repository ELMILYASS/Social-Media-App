const url = "http://localhost:3006/graphql";
import endPoint from "../backendEndPoint";
import axios from "axios";
async function sendRequest(query, variables) {
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
}

async function send(method, url, body) {
  const URL = `${endPoint}/${url}`;
  if (method === "POST") {
    const res = await axios.post(URL, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res;
  }
  if (method === "GET") {
    const res = await axios.get(URL, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res;
  }
  if (method === "PUT") {
    const res = await axios.put(URL, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res;
  }
  if (method === "DELETE") {
    const res = await axios.delete(URL, body, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res;
  }
}
async function sendAxiosRequest(method, url, body) {
  try {
    const res = await send(method, url, body);

    return res;
  } catch (err) {
    if (err.response.status === 413 || err.response.status === 402) {
      throw err;
    } else {
      try {
        const res = await axios.get(`${endPoint}/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        const result = await send(method, url, body);

        return result;
      } catch (err) {
        if (err.response.status === 413 || err.response.status === 402) {
          throw err;
        } else {
          console.log(err);
        }
      }
    }
  }
}

export { sendRequest, sendAxiosRequest };
