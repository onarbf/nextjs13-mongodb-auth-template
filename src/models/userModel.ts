import { UserTypes } from "@/types";
import mongoose from "mongoose";
 
  

const userSchema = new mongoose.Schema<UserTypes>({
username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true,
},
password: {
    type: String,
    required: [true, "Please provide a password"],
},
email: {
    type: String,
    required: [true, "Please provide an email"]
},
 isVerified: {
    type: Boolean,
    default: false
 },
 isAdmin: {
    type: Boolean,
    default: false
 },
 forgotPasswordToken: String,
 forgotPasswordTokenExpiry: Date,
 verifyToken: String,
 verifyTokenExpiry: String
})

const User = mongoose.models.users || mongoose.model<UserTypes>("users", userSchema)

export default User;