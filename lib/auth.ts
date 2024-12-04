import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

export interface CustomNextApiRequest extends NextApiRequest {
  user?: { id: number; email: string };
}

export const verifyToken = (
  req: CustomNextApiRequest,
  res: NextApiResponse,
  next: () => void
) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      email: string;
    };

    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
