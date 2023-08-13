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
const fileExtLimiter = require("../middleware/fileExtLimiter");
const fileSizeLimiter = require("../middleware/fileSizeLimiter");
const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a user",
  fields: () => ({
    userId: { type: new GraphQLNonNull(GraphQLID) },
    username: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    password: { type: new GraphQLNonNull(GraphQLString) },
    refreshToken: { type: GraphQLString },
    friends: { type: new GraphQLList(UserType) },
    dateOfBirth: { type: GraphQLString },
    country: { type: GraphQLString },
    city: { type: GraphQLString },
    description: { type: GraphQLString },
    image: { type: GraphQLString },
  }),
});

const PostType = new GraphQLObjectType({
  name: "Post",
  description: "This represents a Post",
  fields: () => ({
    postId: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: GraphQLString },
    image: { type: new GraphQLList(GraphQLString) },
    video: { type: new GraphQLList(GraphQLString) },
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
    image: { type: GraphQLString },
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
      resolve: () => User.find(),
    },

    posts: {
      type: new GraphQLList(PostType),
      description: "List of all posts",
      args: {
        userId: { type: GraphQLID },
      },
      resolve: async (parent, args) => {
        if (args.userId) {
          console.log(args.userId);
          const res = await Post.find({ userId: args.userId });
          console.log(res);
          console.log();
          return res;
        }

        return Post.find();
      },
    },

    user: {
      type: UserType,
      description: "A Single User",
      args: {
        //possible args for the query
        username: { type: GraphQLString },
        email: { type: GraphQLString }, // can be email or username
      },
      resolve: (parent, args) => {
        if (args.email) {
          return User.findOne({ email: args.email }).exec();
        }

        return User.findOne({ username: args.username }).exec();
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

    updateUserImage: {
      type: GraphQLString,
      description: "Update the user image",
      args: {
        userId: { type: new GraphQLNonNull(GraphQLID) },
        image: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let user = await User.findOne({ userId: args.userId });

        user.username = args.username;
        user.email = args.email;
        user.description = args.description;
        user.country = args.country;
        user.city = args.city;
        console.log(user);
        if (args.password) {
          user.password = await bcrypt.hash(args.password, 10);
        }

        const userUpdated = await user.save();
        return userUpdated;
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
        console.log(user);
        if (args.password) {
          user.password = await bcrypt.hash(args.password, 10);
        }

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
              console.log("here");
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
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

module.exports = schema;
