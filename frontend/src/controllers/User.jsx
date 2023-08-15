import { sendRequest, sendAxiosRequest } from "../components/Request";
import defaultImage from "../images/default profile image.jpg";
export async function getUserByUsername(username) {
  const query = `query getUser($username : String){
        user(username: $username){
          userId
          email
          dateOfBirth
          country
          city
          image
          description
          friends
          username
          
        }
      }`;

  try {
    const res = await sendRequest(query, { username: username });
    return res.data.data.user;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserById(userId) {
  const query = `query getUser($userId : ID!){
        user(userId: $userId){
          userId
          email
          dateOfBirth
          country
          city
          image
          description
          friends
          username
          socketIoId
        }
      }`;

  try {
    const res = await sendRequest(query, { userId: userId });

    return res.data.data.user;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserProfileImage(userId) {
  try {
    const res = await sendAxiosRequest("GET", `profileimage/${userId}`);
    console.log("response from ", res);
    const fileImage = res.data;
    console.log(fileImage);
    if (fileImage.type !== "application/json") {
      const image = URL.createObjectURL(fileImage);
      return image;
    } else {
      return defaultImage;
    }
  } catch (err) {
    console.log(err);
  }
}
