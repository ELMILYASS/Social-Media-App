import JSZip from "jszip";
import { sendAxiosRequest, sendRequest } from "../routes/Request";

export async function getPostImages(postId) {
  try {
    const images = await sendAxiosRequest("GET", `post/${postId}`);

    if (images.data.type !== "text/html") {
      const blob = images.data;
      const zip = new JSZip();

      await zip.loadAsync(blob);
      const urls = [];

      const asyncOperations = [];

      zip.forEach(async (relativePath, file) => {
        const asyncOperation = (async () => {
          const blob = await file.async("blob");
          const imageUrl = URL.createObjectURL(blob);
          urls.push(imageUrl);
        })();

        asyncOperations.push(asyncOperation);
      });

      await Promise.all(asyncOperations);

      return urls;
    } else {
      return [];
    }
  } catch (err) {
    console.log(err);
  }
}

export function TimePassed(createdAt) {
  const formatCreatedAt = new Date(Number(createdAt));
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
      commentId
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
        commentId
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
  } catch (err) {
    console.log(err);
  }
}

export async function deletePost(postId) {
  const query = `
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId) 
  }
`;

  try {
    const res = await sendRequest(query, {
      postId: postId,
    });
    // console.log("result is ", res);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteComment(postId, commentId) {
  const query = `
  mutation updateComment($postId: ID! , $commentId: ID!) {
    updateComment(postId: $postId , commentId:$commentId){
      postId
      comments{
      content
      }
    
    } 
  }
`;

  try {
    const res = await sendRequest(query, {
      postId: postId,
      commentId: commentId,
    });
    // console.log("result is ", res);
  } catch (err) {
    console.log(err);
  }
}

export async function updateComment(postId, commentId, content) {
  const query = `
  mutation updateComment($postId: ID! , $commentId: ID! , $content: String) {
    updateComment(postId: $postId , commentId:$commentId , content: $content) {
    postId
    comments{
    content
    }
    }
  }
`;

  try {
    const res = await sendRequest(query, {
      postId: postId,
      commentId: commentId,
      content: content,
    });
    // console.log("result is ", res);
  } catch (err) {
    console.log(err);
  }
}
