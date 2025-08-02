import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();

const jwtSecret = process.env.JWT_SECRET_KEY;
console.log("JWT SECRET",jwtSecret)

export function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  console.log("Recived Token :",req.headers.authorization)
  if (!authHeader || !authHeader.startsWith("Bearer")){    
    console.log("No Auth is provided")
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = { userId: decoded.userId, username: decoded.username };
    console.log("Token Verified:", decoded);
    next();
  } catch (error) {
    console.error("Toker Verification Failed :", error.message)
    return res.status(403).json({ error: "Invalid token" });
  }
};