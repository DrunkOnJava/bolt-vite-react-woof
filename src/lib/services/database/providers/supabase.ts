import { supabase } from '../../../supabase';
import { DatabaseProvider, QueryOptions } from '../types';
import { ServiceError } from '../../error';

export class SupabaseDatabaseProvider implements DatabaseProvider {
  async query<T>(
    table: string,
    options: QueryOptions = {}
  ): Promise<T[]> {
    try {
      let query = supabase.from(table).select(options.select || '*');

      if (options.where) {
        Object.entries(options.where).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      if (options.orderBy) {
        query = query.order(options.orderBy.field, {
          ascending: options.orderBy.ascending,
        });
      }

      const { data, error } = await query;
      
      if (error) throw error;
      
      return data as T[];
    } catch (error) {
      throw new ServiceError(
        'Database query failed',
        'DB_QUERY_ERROR',
        'supabase',
        error
      );
    }
  }

  async insert<T>(
    table: string,
    data: Partial<T>
  ): Promise<T> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      
      return result as T;
    } catch (error) {
      throw new ServiceError(
        'Database insert failed',
        'DB_INSERT_ERROR',
        'supabase',
        error
      );
    }
  }
}