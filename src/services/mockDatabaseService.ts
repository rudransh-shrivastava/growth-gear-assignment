export interface DataRecord {
  id: number;
  [key: string]: any;
}
export interface QueryOptions {
  table: string;
  select?: string[];
  where?: [string, string];
  aggregate?: "sum" | "average";
  aggregateField?: string;
  SQLQuery: string;
}

class MockDatabase {
  private data: {
    [tableName: string]: DataRecord[];
  } = {
    products: [
      { id: 1, name: "laptop", price: 1000, category: "electronics" },
      { id: 2, name: "smartphone", price: 800, category: "electronics" },
      { id: 3, name: "desk chair", price: 250, category: "furniture" },
      { id: 4, name: "tablet", price: 500, category: "electronics" },
      { id: 5, name: "sofa", price: 20000, category: "furniture" },
    ],
    sales: [
      { id: 1, productId: 1, quantity: 5, revenue: 5000 },
      { id: 2, productId: 2, quantity: 3, revenue: 2400 },
      { id: 3, productId: 3, quantity: 2, revenue: 500 },
    ],
    customers: [
      { id: 1, name: "acme corp", region: "north", totalPurchases: 7500 },
      { id: 2, name: "beta inc", region: "south", totalPurchases: 5000 },
      { id: 3, name: "hello world", region: "east", totalPurchases: 0 },
      { id: 4, name: "new customer", region: "north", totalPurchases: 7500 },
    ],
  };
  public query(options: QueryOptions): DataRecord[] {
    // Start with all the data
    // then we will filter / select / aggregate as needed

    let data = this.data[options.table];

    // SELECT
    // we only return the specified fields
    if (options.select) {
      console.log("Selecting: ", options.select);
      data.map((row) => {
        let newRow: DataRecord = { id: row.id };
        options.select!.forEach((field) => {
          newRow[field] = row[field];
        });
        return newRow;
      });
    }
    console.log("After select clause: ", data);

    // WHERE
    // we only return the rows that match the where clause
    if (options.where) {
      console.log("Filtering by: ", options.where);
      data = data.filter((row) => row[options.where![0]] == options.where![1]);
    }
    console.log("After where clause: ", data);

    // AGGREGATE
    // we aggregate the data
    // we can either add up the values or average them
    if (options.aggregate) {
      console.log("Aggregating by: ", options.aggregateField);
      if (options.aggregate == "sum") {
        let total = 0;
        data.forEach((row) => {
          total += row[options.aggregateField!];
        });
        data = [{ id: 1, total }];
      } else {
        let total = 0;
        data.forEach((row) => {
          total += row[options.aggregateField!];
        });
        data = [{ id: 1, average: total / data.length }];
      }
    }

    return data;
  }
}

export default new MockDatabase();
