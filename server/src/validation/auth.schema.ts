import zod, { string, object } from "zod";

export const signInSchema = zod.object({
  body: object({
    name: string({ required_error: "name is required" }),
    email: string({ required_error: "email is required" }).email({
      message: "Invalid email address",
    }),
    sub: string({ required_error: "sub is required" }),
    picture: string({ required_error: "picture is required" }),
  }),
});

export const validateTokenSchema = zod.object({
  query: object({
    token: string({ required_error: "token is required for validation" }),
  }),
});
