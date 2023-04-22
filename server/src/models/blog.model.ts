import mongoose, { Document, Schema } from "mongoose";

export interface IBaseBlog {
  userId: string;
  heading: string;
  category: string;
  isPublish: boolean;
  fImage: string;
  description: string;
  content: string;
  likes: string[];
}

export interface IBlogSchema extends IBaseBlog, Document {}

const blogSchema = new Schema<IBlogSchema>(
  {
    userId: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isPublish: {
      type: Boolean,
      required: true,
    },
    fImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const blogModel = mongoose.model<IBlogSchema>("Blog", blogSchema);

export default blogModel;
