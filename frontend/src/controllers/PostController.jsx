import JSZip from "jszip";
import { sendAxiosRequest, sendRequest } from "../components/Request";

export async function getPostImages(postId) {
  try {
    const images = await sendAxiosRequest("GET", `post/${postId}`);

    if (images.data.type !== "text/html") {
      const blob = images.data;
      const zip = new JSZip();

      await zip.loadAsync(blob);
      const urls = [];
      zip.forEach(async (relativePath, file) => {
        const blob = await file.async("blob");
        const imageUrl = URL.createObjectURL(blob);

        urls.push(imageUrl);
      });
      return urls;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
}

export function TimePassed(createdAt) {
  const formatCreatedAt = Number(new Date(createdAt));
  const currentTime = new Date();
  const timeDifference = currentTime - formatCreatedAt; //ms

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30); // Approximate months

  if (months > 0) {
    return `${months} ${months === 1 ? "month" : "months"} left`;
  } else if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} left`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} left`;
  } else if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} left`;
  } else {
    return "Just now";
  }
}

export async function getFriendsPosts(userId) {
  const query = `query getFriendsPosts($userId : ID!){
  myFriendsPosts(userId: $userId){
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
     
      createdAt
    }
  }
}`;

  try {
    const res = await sendRequest(query, { userId: userId });

    return res.data.data.myFriendsPosts;
  } catch (err) {
    console.log(err);
  }
}

export async function likePost(userId, postId, emoji) {
  const query = `
  mutation likePost($userId: ID!, $postId: ID!, $emoji: String) {
    likePost(userId: $userId, postId: $postId, emoji: $emoji) {
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
        
        createdAt
      }
    }
  }
`;

  try {
    const res = await sendRequest(query, {
      userId: userId,
      postId: postId,
      emoji: emoji,
    });
    console.log("result is ", res);
    // return res.data.data.myFriendsPosts;
  } catch (err) {
    console.log(err);
  }
}
