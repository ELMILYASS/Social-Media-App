import { sendRequest } from "../components/Request";

export const addComment = async (postId, userId, content) => {
  const query = `
    mutation addComment($userId: ID!, $postId: ID!, $content: String) {
      addComment(userId: $userId, postId: $postId, content: $content) {
        postId
        content

      }
    }
  `;

  try {
    const res = await sendRequest(query, {
      userId: userId,
      postId: postId,
      content: content,
    });
    // console.log("result ", res);
  } catch (err) {
    console.log(err);
  }
};
