import { QueryOptions } from "./mockDatabaseService";
import mockDatabaseService from "./mockDatabaseService";

export class QueryTranslator {
  translate(query: string): QueryOptions {
    const lowercaseQuery = query.toLowerCase();
    const queryPatterns = [
      {
        // SELECT * FROM TABLE
        // ex: show all products
        pattern: /show all (products|customers|sales)/,
        translate: (match: RegExpMatchArray) => ({
          table: match[1],
          SQLQuery: "SELECT * FROM " + match[1],
        }),
      },
      {
        // total purchases in region
        // ex: total purchases in North
        // SELECT SUM(totalPurchases) FROM customers WHERE region = 'North'
        // OR
        // SELECT SUM(revenue) FROM sales
        pattern: /total (purchases|revenue) in (\w+)/,
        translate: (match: RegExpMatchArray) => {
          if (match[1] == "purchases") {
            return {
              table: "customers",
              aggregate: "sum",
              aggregateField: "totalPurchases",
              where: ["region", `${match[2]}`],
              SQLQuery: `SELECT SUM(totalPurchases) FROM customers WHERE region = '${match[2]}'`,
            };
          }
          return {
            table: "sales",
            aggregate: "sum",
            aggregateField: "revenue",
            SQLQuery: `SELECT SUM(revenue) FROM sales`,
          };
        },
      },
      {
        // SELECT * FROM TABLE WHERE name = 'name'
        // ex: find Acme Corp in customers
        pattern: /find (\w+) in (\w+)/,
        translate: (match: RegExpMatchArray) => ({
          table: match[2],
          where: ["name", `${match[1]}`],
          SQLQuery: `SELECT * FROM ${match[2]} WHERE name = '${match[1]}'`,
        }),
      },
    ];
    for (let pattern of queryPatterns) {
      const match = lowercaseQuery.match(pattern.pattern);
      if (match) {
        console.log("Matched pattern: ", pattern.pattern);
        return pattern.translate(match);
      }
    }

    throw new Error("Unable to translate query");
  }
  processQuery(query: string) {
    try {
      const options = this.translate(query);
      console.log("Translated Options: ", options);
      return mockDatabaseService.query(options);
    } catch (error) {
      console.error("Query processing error:", error);
      throw error;
    }
  }
}

export default new QueryTranslator();
