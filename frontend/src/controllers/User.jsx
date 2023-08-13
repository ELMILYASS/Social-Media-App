import { sendRequest, sendAxiosRequest } from "../components/Request";
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
          friends{
            userId
            email
            dateOfBirth
            country
            city
            username
            description
            image
          }
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

export async function getUserProfileImage(userId) {
  try {
    const res = await sendAxiosRequest("GET", `profileimage/${userId}`);
    const fileImage = res.data;
    const image = URL.createObjectURL(fileImage);
    return image;
  } catch (err) {
    console.log(err);
  }
}
