const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLID,
} = require("graphql");
const bcrypt = require("bcrypt");
const User = require("../model/User");
const Post = require("../model/Posts");
const path = require("path");
const fs = require("fs");
const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a user",
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    refreshToken: { type: GraphQLString },
    friends: { type: new GraphQLList(GraphQLID) },
    dateOfBirth: { type: GraphQLString },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
    socketIoId: { type: GraphQLString },
    sentInvitations: { type: new GraphQLList(GraphQLID) },
    receivedInvitations: { type: new GraphQLList(GraphQLID) },

    // invitedUsers: {
    //   type: new GraphQLList(UserType),
    //   resolve: async (user) => {
    //     let users = [];
    //     for (id of user.sentInvitations) {
    //       const u = await User.findOne({ userId: id }).exec();
    //       users.push(u);
    //     }

    //     return users;
    //   },
    // },
    // ReceivedInvitationsUsers: {
    //   type: new GraphQLList(UserType),
    //   resolve: async (user) => {
    //     let users = [];
    //     for (id of user.receivedInvitations) {
    //       const u = await User.findOne({ userId: id }).exec();
    //       users.push(u);
    //     }

    //     return users;
    //   },
    // },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represents a Post",
  fields: () => ({
    postId: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: GraphQLString },
    images: { type: new GraphQLList(GraphQLString) },
    videos: { type: new GraphQLList(GraphQLString) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
    updatedAt: { type: GraphQLString },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    likes: { type: new GraphQLList(LikeType) },
    comments: { type: new GraphQLList(CommentType) },
    user: {
      type: UserType,
      resolve: (post) => {
        return User.findOne({ userId: post.userId }).exec();
      },
    },
  }),
});

const LikeType = new GraphQLObjectType({
  name: "Like",
  description: "This represents a Like",
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLID) },
    emoji: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (like) => {
        return User.findOne({ userId: like.userId }).exec();
      },
    },
  }),
});
const CommentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    userId: { type: GraphQLID },
    content: { type: GraphQLString },
    commentId: { type: GraphQLID },
    // image: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: (comment) => {
        return User.findOne({ userId: comment.userId }).exec();
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",

  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of All users",
      resolve: async () => {
        const users = await User.find();
        return users;
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      description: "List of all posts",
      args: {
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        if (args.userId) {
          const res = await Post.find({ userId: args.userId });

          return res;
        }

        return await Post.find();
      },
    },
    myFriendsPosts: {
      description: "user's friends posts",
      type: new GraphQLList(PostType),
      args: {
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        const user = await User.findOne({ userId: args.userId }).exec();
        let friends = user.friends;
        let Posts = [];
        friends.push(args.userId);
        for (const friendId of friends) {
          const posts = await Post.find({ userId: friendId });
          Posts.push(...posts);
        }
        console.log(Posts);
        return Posts;
      },
    },
    user: {
      type: UserType,
      description: "A Single User",
      args: {
        //possible args for the query
        userId: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString }, // can be email or username
      },
      resolve: (parent, args) => {
        if (args.email) {
          return User.findOne({ email: args.email }).exec();
        }
        if (args.username)
          return User.findOne({ username: args.username }).exec();

        if (args.userId) return User.findOne({ userId: args.userId }).exec();
      },
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      description: "Add a user",
      args: {
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (parent, args) => {
        const newUser = {
          username: args.username,
          email: args.email,
          password: args.password,
        };
        return User.create(newUser);
      },
    },
    updateUser: {
      type: UserType,
      description: "Update a user",
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLString },
        description: { type: GraphQLString },
        country: { type: GraphQLString },
        city: { type: GraphQLString },
      },

      resolve: async (parent, args) => {
        let user = await User.findOne({ userId: args.userId });

        user.username = args.username;
        user.email = args.email;
        user.description = args.description;
        user.country = args.country;
        user.city = args.city;
        if (args.password) {
          user.password = await bcrypt.hash(args.password, 10);
        }

        const userUpdated = await user.save();
        return userUpdated;
      },
    },
    // sendInvitation:{
    //   type:GraphQLString ,
    //   description: "Sending an invitation",
    //   args: {

    //   },
    //   resolve: async (parent, args) => {
    //     let user = await User.findOne({ email: args.email });

    //     user.socketIoId = args.socketIoId;

    //     const userUpdated = await user.save();
    //     return userUpdated;
    //   },
    // },
    updateUserSocketId: {
      type: UserType,
      description: "Update a user",
      args: {
        email: { type: new GraphQLNonNull(GraphQLString) },
        socketIoId: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let user = await User.findOne({ email: args.email });

        user.socketIoId = args.socketIoId;

        const userUpdated = await user.save();
        return userUpdated;
      },
    },
    deletePost: {
      type: GraphQLString,
      description: "Delete a post",
      args: {
        postId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (parent, args) => {
        Post.deleteOne({ postId: args.postId }).exec();
        const filepath = path.join(
          __dirname,
          "..",
          "files",
          "posts",
          `${args.postId}`
        );
        if (fs.existsSync(filepath)) {
          fs.rmdirSync(filepath, { recursive: true });
        }
        return "Post deleted successfully";
      },
    },
    likePost: {
      type: PostType,
      description: "Like a post",
      args: {
        postId: { type: new GraphQLNonNull(GraphQLID) },
        userId: { type: new GraphQLNonNull(GraphQLID) },
        emoji: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const post = await Post.findOne({ postId: args.postId }).exec();

        let likes = post.likes;

        let alreadyLiked = false;

        let updatedLikes = likes.map((like) => {
          if (like.userId.toString() === args.userId) {
            if (args.emoji) {
              alreadyLiked = true;
              like.emoji = args.emoji;
              return like;
            }

            alreadyLiked = true;
          } else {
            return like;
          }
        });

        updatedLikes = updatedLikes.filter((like) => like);

        if (!alreadyLiked) {
          updatedLikes.push({ userId: args.userId, emoji: args.emoji || "" });
        }

        post.likes = updatedLikes;

        const updatedPost = await post.save();

        return updatedPost;
      },
    },
    addComment: {
      description: "add a comment",
      type: PostType,
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        postId: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const post = await Post.findOne({ postId: args.postId }).exec();

        post.comments.push({
          userId: args.userId,
          content: args.content,
          createdAt: new Date().toString(),
        });

        const newPost = post.save();
        return newPost;
      },
    },
    // deleteComment: {
    //   description: "delete a comment",
    //   type: PostType,
    //   args: {
    //     commentId: { type: new GraphQLNonNull(GraphQLID) },
    //     postId: { type: new GraphQLNonNull(GraphQLID) },
    //   },
    //   resolve: async (parent, args) => {
    //     const post = await Post.findOne({ postId: args.postId }).exec();

    //     post.comments = post.comments.filter((comment) => {
    //       return comment.commentId !== args.commentId;
    //     });
    //     console.log("post", post);
    //     const newPost = post.save();
    //     return newPost;
    //   },
    // },
    updateComment: {
      description: "update/delete a comment",
      type: PostType,
      args: {
        commentId: { type: new GraphQLNonNull(GraphQLID) },
        postId: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        const post = await Post.findOne({ postId: args.postId }).exec();

        post.comments = post.comments.map((comment) => {
          if (comment.commentId.toString() === args.commentId) {
            if (args.content) {
              comment.content = args.content;
              return comment;
            }
          } else {
            return comment;
          }
        });
        console.log("post", post);
        post.comments = post.comments.filter((comment) => comment);
        console.log("post", post);
        const newPost = post.save();
        return newPost;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
