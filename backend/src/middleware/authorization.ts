import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || "MY_SECRET"

export const authenticateToken = (req: any, res: any, next: any) => {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access denied. No token provided." });
  
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      req.body.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
  };