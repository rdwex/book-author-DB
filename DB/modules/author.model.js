import mongoose from "mongoose";

const { Schema, model } = mongoose;

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    birthDate: {
      type: Date,
    },
    books: [{
      type: Schema.Types.ObjectId,
      ref: "Book",
    }],
  },
  { timestamps: true }
);

export default mongoose.models.Author || model("Author", authorSchema);
