const { Schema, Types, model } = require('mongoose');

//Reaction model that contains the contents of the reaction, and when it was created
const reactionSchema = new Schema(
    {
      reactionId: {
          type: Schema.Types.ObjectId,
          default: () => new Types.ObjectId(),
        },
      reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
    },
    {
      toJSON: {
        getters: true,
      },
      id: false
    }
  )

  //Model for the thought that contains what the thought says, when it was created, and by whom
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            unique: true,
            trim: true,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          getters: true,
        },
        id: false
    }
)

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

const Thought = model('thought', thoughtSchema);
module.exports = Thought;