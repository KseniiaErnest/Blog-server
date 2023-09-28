const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    text: {
      type: String,
    },

    post: {
      type: Schema.Types.ObjectId, ref: 'Post',
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    user: {
      type: String,
    }
  },
  
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;