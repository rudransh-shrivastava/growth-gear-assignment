import { Request, Response, NextFunction } from "express";

const VALID_API_KEY = "some_api_key_here";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== VALID_API_KEY) {
    res.status(401).json({
      error: "Unauthorized",
      message: "Invalid or missing API key",
    });
    return;
  }

  next();
};
