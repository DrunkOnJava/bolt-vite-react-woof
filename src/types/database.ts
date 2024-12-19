export interface Database {
  public: {
    Tables: {
      patients: {
        Row: {
          id: string;
          first_name: string;
          last_name: string | null;
          email: string | null;
          phone: string | null;
          date_of_birth: string | null;
          status: 'active' | 'inactive';
          notes: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['patients']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['patients']['Insert']>;
      };
      medications: {
        Row: {
          id: string;
          patient_id: string;
          name: string;
          weekly_dosage: string;
          monthly_dosage: string;
          weekly_volume: string;
          monthly_volume: string;
          tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
          price: string;
          contact_info: string;
          refill_due: string;
          last_fill_date: string;
          days_until_fill: number;
          status: 'active' | 'discontinued' | 'completed';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['medications']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['medications']['Insert']>;
      };
      pickups: {
        Row: {
          id: string;
          medication_id: string;
          patient_id: string;
          pickup_date: string;
          next_pickup_date: string;
          quantity: number;
          notes: string | null;
          status: 'completed' | 'missed' | 'scheduled';
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['pickups']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['pickups']['Insert']>;
      };
      receipts: {
        Row: {
          id: string;
          patient_id: string;
          medication_id: string;
          amount: number;
          transaction_date: string;
          payment_method: 'credit' | 'debit' | 'cash' | 'insurance';
          status: 'completed' | 'pending' | 'failed';
          document_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['receipts']['Row'], 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['receipts']['Insert']>;
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}