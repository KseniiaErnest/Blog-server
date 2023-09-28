const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
    },

    author: {
      type: {type: Schema.Types.ObjectId, ref: 'User'},
    },

    comments: [
      {
        type: Schema.Types.ObjectId, ref: 'Comment',
      }
    ],

    likes: {
      type: Number,
      default: 0
    },

    images: [
      {
        type: String
      },
    ]

  },
  {
    timestamps: true,
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Post = model("Post", postSchema);

module.exports = Post;