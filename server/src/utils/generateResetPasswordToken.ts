import crypto from "crypto";

const resetTokens = () => {
  const token = crypto.randomBytes(20).toString("hex");

  const hash_token = crypto.createHash("sha256").update(token).digest("hex");

  const resetPasswordExpireTime = Date.now() + 10 * 60 * 60; //10 minutes

  return { token, hash_token, resetPasswordExpireTime };
};

export default resetTokens;
