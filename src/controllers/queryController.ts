import { Request, Response } from "express";
import queryTranslatorService from "../services/queryTranslatorService";
import { QueryResponse } from "../types";

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
        data: results,
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

      // const explanation = queryTranslatorService.explainQuery(query);
      const explanation = "todo";
      res.json({
        success: true,
        data: explanation,
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
      // const result = queryTranslatorService.translateQuery(query);
      const result = "todo";
      res.json({
        success: true,
        data: {
          isValid: true,
          message: "Query is valid",
          details: result,
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
