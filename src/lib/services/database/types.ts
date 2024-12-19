export interface QueryOptions {
  select?: string;
  where?: Record<string, unknown>;
  orderBy?: {
    field: string;
    ascending?: boolean;
  };
  limit?: number;
}

export interface DatabaseProvider {
  query<T>(table: string, options?: QueryOptions): Promise<T[]>;
  insert<T>(table: string, data: Partial<T>): Promise<T>;
  update?<T>(table: string, id: string, data: Partial<T>): Promise<T>;
  delete?(table: string, id: string): Promise<void>;
}