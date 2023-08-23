import { sendRequest, sendAxiosRequest } from "../components/Request";
import defaultImage from "../images/default profile image.jpg";
export async function getUserByUsername(username) {
  const query = `query getUser($username : String){
        user(username: $username){
          userId
          email
         
          country
          city
          image
          description
          friends
          username
          socketIoId
          sentInvitations
          receivedInvitations
          notifications{
            userId
            postId
            message
            createdAt
            isSeen
            notificationId
            status
            post{
              postId
              content
              images
              videos
              createdAt
              updatedAt
              userId
              likes {
                userId
                emoji
              }
              comments {
                commentId
                userId
                content
                createdAt
              }
            
            }
          }
          
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
          sentInvitations
           receivedInvitations
          country
          city
          image
          description
          friends
          username
          socketIoId
          notifications{
            userId
            postId
            message
            createdAt
            isSeen
            notificationId
            status
            post{
              postId
              content
              images
              videos
              createdAt
              updatedAt
              userId
              likes {
                userId
                emoji
              }
              comments {
                commentId
                userId
                content
                createdAt
              }
            
            }
          }
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

    const fileImage = res.data;

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

export async function getUserPosts(userId) {
  const query = `
  query getPosts($userId: ID!) {
    posts(userId: $userId) {
      postId
      content
      images
      videos
      createdAt
      updatedAt
      userId
    

      likes {
        userId
        emoji
      }
      comments {
        userId
        content
        commentId
        createdAt
      }
    }
  }
`;

  try {
    const res = await sendRequest(query, { userId, userId });

    return res.data.data.posts;
  } catch (err) {
    console.log(err);
  }
}
