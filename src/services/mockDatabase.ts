import { DataRecord, QueryOptions } from "../types";

class MockDatabase {
  private data: {
    [tableName: string]: DataRecord[];
  } = {
    products: [
      { id: 1, name: "Laptop", price: 1000, category: "Electronics" },
      { id: 2, name: "Smartphone", price: 800, category: "Electronics" },
      { id: 3, name: "Desk Chair", price: 250, category: "Furniture" },
      { id: 4, name: "Tablet", price: 500, category: "Electronics" },
    ],
    sales: [
      { id: 1, productId: 1, quantity: 5, revenue: 5000 },
      { id: 2, productId: 2, quantity: 3, revenue: 2400 },
      { id: 3, productId: 3, quantity: 2, revenue: 500 },
    ],
    customers: [
      { id: 1, name: "Acme Corp", region: "North", totalPurchases: 7500 },
      { id: 2, name: "Beta Inc", region: "South", totalPurchases: 5000 },
    ],
  };

  query(tableName: string, options: QueryOptions = {}): DataRecord[] {
    // Validate table exists
    if (!this.data[tableName]) {
      throw new Error(`Table '${tableName}' not found`);
    }

    // Start with all records from the table
    let results = [...this.data[tableName]];

    // Apply filtering (WHERE clause)
    if (options.where) {
      results = results.filter((record) =>
        Object.entries(options.where || {}).every(
          ([key, value]) => record[key] === value,
        ),
      );
    }

    // Apply selection (SELECT clause)
    if (options.select) {
      results = results.map((record) => {
        // Ensure id is always included
        const selectedFields: DataRecord = { id: record.id };

        options.select!.forEach((field) => {
          if (field !== "id") {
            selectedFields[field] = record[field];
          }
        });

        return selectedFields;
      });
    }

    // Apply aggregation
    if (options.aggregate && options.aggregateField) {
      switch (options.aggregate) {
        case "sum":
          return [
            {
              id: 1, // Provide a dummy id to satisfy DataRecord
              total: results.reduce(
                (sum, record) => sum + (record[options.aggregateField!] || 0),
                0,
              ),
            },
          ];
        case "average":
          const total = results.reduce(
            (sum, record) => sum + (record[options.aggregateField!] || 0),
            0,
          );
          return [
            {
              id: 1, // Provide a dummy id to satisfy DataRecord
              average: total / results.length,
            },
          ];
      }
    }

    return results;
  }
}

export default new MockDatabase();
