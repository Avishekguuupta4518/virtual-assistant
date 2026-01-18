import jwt from "jsonwebtoken";

const genToken = async (userId) => {
  try {
    if (!userId) {
      throw new Error("User ID is required to generate token");
    }
    const token = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
        issuer: "virtual-assistant-api"
      }
    );

    return token;

  } catch (error) {
    console.error("Token generation error:", error.message);
    throw error;
  }
};

export default genToken;
