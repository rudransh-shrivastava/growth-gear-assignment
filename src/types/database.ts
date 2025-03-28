export interface SalesRecord {
  id: number;
  product: string;
  revenue: number;
  quarter: string;
}

export interface CustomerRecord {
  id: number;
  name: string;
  region: string;
  spend: number;
}

export type DatabaseTable = "sales" | "customers";
