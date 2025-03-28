export interface DataRecord {
  id: number;
  [key: string]: any;
}

export interface QueryOptions {
  select?: string[];
  where?: Record<string, any>;
  aggregate?: "sum" | "average";
  aggregateField?: string;
}

export interface QueryRequest {
  query: string;
}

export interface QueryResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}
