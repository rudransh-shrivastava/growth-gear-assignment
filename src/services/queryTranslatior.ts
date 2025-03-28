import mockDatabase from "./mockDatabase";
import { QueryOptions } from "../types";

class QueryTranslator {
  translateQuery(query: string): { table: string; options: QueryOptions } {
    const lowercaseQuery = query.toLowerCase();

    // Query patterns with their translations
    const queryPatterns = [
      {
        pattern: /total (revenue|price) for (\w+)/,
        translate: (match: RegExpMatchArray) => ({
          table: match[2] === "revenue" ? "sales" : "products",
          options: {
            aggregate: "sum" as const,
            aggregateField: match[1],
            where: match[2] !== "revenue" ? { name: match[2] } : {},
          },
        }),
      },
      {
        pattern: /average (price|purchases) in (\w+)/,
        translate: (match: RegExpMatchArray) => ({
          table: match[1] === "price" ? "products" : "customers",
          options: {
            aggregate: "average" as const,
            aggregateField: match[1],
          },
        }),
      },
      {
        pattern: /find (\w+) in (\w+)/,
        translate: (match: RegExpMatchArray) => ({
          table: match[2],
          options: {
            where: { name: match[1] },
          },
        }),
      },
    ];

    // Find and execute the first matching pattern
    for (let pattern of queryPatterns) {
      const match = lowercaseQuery.match(pattern.pattern);
      if (match) {
        return pattern.translate(match);
      }
    }

    throw new Error("Unable to translate query");
  }

  // Main query processing method
  processQuery(query: string) {
    try {
      const { table, options } = this.translateQuery(query);
      return mockDatabase.query(table, options);
    } catch (error) {
      console.error("Query processing error:", error);
      throw error;
    }
  }

  // Query explanation method
  explainQuery(query: string) {
    try {
      const { table, options } = this.translateQuery(query);
      return {
        originalQuery: query,
        translatedTable: table,
        translatedOptions: options,
      };
    } catch (error) {
      return {
        error: "Query explanation failed",
        message: (error as Error).message,
      };
    }
  }
}

export default new QueryTranslator();
