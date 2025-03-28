import { Request, Response } from "express";
import queryTranslatorService from "../services/queryTranslatorService";

type QueryResponse = {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
  explaination?: string[];
};

export class QueryController {
  static processQuery = (req: Request, res: Response<QueryResponse>) => {
    try {
      const { query } = req.body;

      if (!query || query == "") {
        throw new Error("Query is empty");
      }

      const results = queryTranslatorService.processQuery(query);

      res.json({
        success: true,
        data: results.data,
      });
    } catch (error) {
      res.status(422).json({
        success: false,
        error: "Query Processing Error",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  static explainQuery = (req: Request, res: Response<QueryResponse>) => {
    try {
      const { query } = req.body;

      const data = queryTranslatorService.processQuery(query);
      res.json({
        success: true,
        explaination: data.explaination,
      });
    } catch (error) {
      res.status(422).json({
        success: false,
        error: "Query Explanation Error",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  };

  static validateQuery = (req: Request, res: Response<QueryResponse>) => {
    try {
      const { query } = req.body;

      // Attempt to translate the query
      const result = queryTranslatorService.translate(query);
      res.json({
        success: true,
        data: {
          isValid: true,
          message: "Query is valid",
          data: result,
        },
      });
    } catch (error) {
      res.status(422).json({
        success: false,
        error: "Query Validation Error",
        message: error instanceof Error ? error.message : "Query is not valid",
      });
    }
  };
}
