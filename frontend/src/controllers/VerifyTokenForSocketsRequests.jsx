const accessToken = localStorage.getItem("accessToken");
const email = localStorage.getItem("email");

const verifyToken = async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const res = await axios.get(`${endPoint}/verify`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      setConnected(true);

      if (location.pathname === "/") {
        navigate("/home");
      }
      setIsSignPage(false);
    } catch (err) {
      try {
        //refreshing accessToken
        const res = await axios.get(`${endPoint}/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem("accessToken", res.data.accessToken);
        setConnected(true);

        if (location.pathname === "/") {
          navigate("/home");
        }
      } catch (err) {
        setConnected(false);
        setSocket(null);
        console.log(err);
        setIsSignPage(true);
        // navigate("/")
      }
    }
  } else {
    setConnected(false);
    setIsSignPage(true);
    setSocket(null);
  }
};

export default verifyToken;
