export function sendInvitation(socket, setUser, senderId, receiverId) {
  socket.emit("send-invitation", senderId, receiverId);
  socket.on("server-response", (response) => {
    setUser(response.senderUser);
    if (response.receiverSocketId) {
      socket.emit(
        "send-notification-toReceiver",
        response.senderUser,
        response.receiverUser,
        response.receiverSocketId
      );
    }
  });
}

export function deleteInvitation(socket, setUser, senderId, receiverId) {
  socket.emit("delete-invitation", senderId, receiverId);
  socket.on("server-response", (response) => {
    setUser(response.senderUser);
    if (response.receiverSocketId) {
      socket.emit(
        "send-DeleteNotification-toReceiver",
        response.senderUser,
        response.receiverUser,
        response.receiverSocketId
      );
    }
  });
}

export function acceptInvitation(socket, setUser, senderId, receiverId) {
  socket.emit("accept-invitation", senderId, receiverId);
  socket.on("server-response", (response) => {
    setUser(response.receiverUser);
    if (response.senderSocketId) {
      socket.emit(
        "send-AcceptedNotification-toSender",
        response.senderUser,
        response.receiverUser,
        response.senderSocketId
      );
    }
  });
}

export function deleteFriend(socket, setUser, senderId, receiverId) {
  socket.emit("deleteFriend", senderId, receiverId);
  socket.on("server-response", (response) => {
   
    setUser(response.senderUser);
    if (response.receiverSocketId) {
      socket.emit(
        "send-DeletedFriend-toReceiver",
        response.senderUser,
        response.receiverUser,
        response.receiverSocketId
      );
    }
  });
}
