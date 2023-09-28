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

    publicationDate: {
      type: Date,
      default: Date.now,
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
  }
);

const Post = model("Post", postSchema);

module.exports = Post;