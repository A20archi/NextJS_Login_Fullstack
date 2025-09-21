import mongoose from "mongoose"; // ✅ Correct import

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      select: false, // Exclude password from queries unless explicitly selected
    },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
  },
  { timestamps: true }
);

// ✅ Prevent OverwriteModelError during hot reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

//our application has mainly three types  of parts -  users/browsers and api(or controller) and database. The verifyToken and forgotPasswordToken are used to store tokens for email verification and password reset functionalities, respectively. The expiry fields are used to set expiration times for these tokens to enhance security.
//the verifyToken is sent to both user and database. when user clicks on the link in email, the token is sent back to our api. our api then verifies the token with the one stored in database. if they match and not expired, the user's email is marked as verified.
//the forgotPasswordToken is used when user requests a password reset. a token is generated and sent to user's email. when user clicks the link, the token is sent back to our api. our api verifies the token with the one in database. if they match and not expired, user is allowed to reset password.
//the timestamps option in the schema automatically adds createdAt and updatedAt fields to each user document, which helps in tracking when a user was created and last updated.
