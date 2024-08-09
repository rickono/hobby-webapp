export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      coffee_brewer: {
        Row: {
          created_at: string
          id: number
          name: string
          type: Database['public']['Enums']['brewer_type']
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          type?: Database['public']['Enums']['brewer_type']
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          type?: Database['public']['Enums']['brewer_type']
        }
        Relationships: []
      }
      coffee_coffee_variety: {
        Row: {
          coffee: number
          created_at: string
          variety: number
        }
        Insert: {
          coffee: number
          created_at?: string
          variety: number
        }
        Update: {
          coffee?: number
          created_at?: string
          variety?: number
        }
        Relationships: [
          {
            foreignKeyName: 'public_coffee_coffee_variety_coffee_fkey'
            columns: ['coffee']
            isOneToOne: false
            referencedRelation: 'coffee_coffees'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'public_coffee_coffee_variety_variety_fkey'
            columns: ['variety']
            isOneToOne: false
            referencedRelation: 'coffee_variety'
            referencedColumns: ['id']
          },
        ]
      }
      coffee_coffees: {
        Row: {
          created_at: string
          description: string | null
          elevation: number | null
          farm_name: string | null
          farm_size: number | null
          harvest_period: string | null
          id: number
          image_url: string | null
          name: string
          origin: number | null
          process: number | null
          producer: string | null
          region: string | null
          roaster: number
          variety: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          elevation?: number | null
          farm_name?: string | null
          farm_size?: number | null
          harvest_period?: string | null
          id?: number
          image_url?: string | null
          name: string
          origin?: number | null
          process?: number | null
          producer?: string | null
          region?: string | null
          roaster: number
          variety?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          elevation?: number | null
          farm_name?: string | null
          farm_size?: number | null
          harvest_period?: string | null
          id?: number
          image_url?: string | null
          name?: string
          origin?: number | null
          process?: number | null
          producer?: string | null
          region?: string | null
          roaster?: number
          variety?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'coffee_coffees_origin_fkey'
            columns: ['origin']
            isOneToOne: false
            referencedRelation: 'coffee_origins'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'coffee_coffees_process_fkey'
            columns: ['process']
            isOneToOne: false
            referencedRelation: 'coffee_process'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'coffee_coffees_roaster_fkey'
            columns: ['roaster']
            isOneToOne: false
            referencedRelation: 'coffee_roaster'
            referencedColumns: ['id']
          },
        ]
      }
      coffee_log_beans: {
        Row: {
          coffee: number | null
          created_at: string
          exp_date: string | null
          id: number
          notes: string | null
          roast_date: string | null
        }
        Insert: {
          coffee?: number | null
          created_at?: string
          exp_date?: string | null
          id?: number
          notes?: string | null
          roast_date?: string | null
        }
        Update: {
          coffee?: number | null
          created_at?: string
          exp_date?: string | null
          id?: number
          notes?: string | null
          roast_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'coffee_log_beans_coffee_fkey'
            columns: ['coffee']
            isOneToOne: false
            referencedRelation: 'coffee_coffees'
            referencedColumns: ['id']
          },
        ]
      }
      coffee_log_brew: {
        Row: {
          coffee: number | null
          created_at: string
          details: number | null
          id: number
          notes: string | null
          rating: number | null
        }
        Insert: {
          coffee?: number | null
          created_at?: string
          details?: number | null
          id?: number
          notes?: string | null
          rating?: number | null
        }
        Update: {
          coffee?: number | null
          created_at?: string
          details?: number | null
          id?: number
          notes?: string | null
          rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'coffee_log_brew_coffee_fkey'
            columns: ['coffee']
            isOneToOne: false
            referencedRelation: 'coffee_coffees'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'coffee_log_brew_details_fkey'
            columns: ['details']
            isOneToOne: false
            referencedRelation: 'coffee_log_brew_details'
            referencedColumns: ['id']
          },
        ]
      }
      coffee_log_brew_details: {
        Row: {
          brewer: number
          created_at: string
          dose: number
          id: number
        }
        Insert: {
          brewer?: number
          created_at?: string
          dose?: number
          id?: number
        }
        Update: {
          brewer?: number
          created_at?: string
          dose?: number
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'coffee_log_brew_details_brewer_fkey'
            columns: ['brewer']
            isOneToOne: false
            referencedRelation: 'coffee_brewer'
            referencedColumns: ['id']
          },
        ]
      }
      coffee_log_brew_step: {
        Row: {
          agitation_times: number | null
          agitation_type:
            | Database['public']['Enums']['coffee_agitation_type']
            | null
          brew: number
          created_at: string
          duration: number | null
          id: number
          start: number
          type: Database['public']['Enums']['coffee_brew_step_type']
          water_grams: number | null
          water_temp: number | null
        }
        Insert: {
          agitation_times?: number | null
          agitation_type?:
            | Database['public']['Enums']['coffee_agitation_type']
            | null
          brew: number
          created_at?: string
          duration?: number | null
          id?: number
          start: number
          type: Database['public']['Enums']['coffee_brew_step_type']
          water_grams?: number | null
          water_temp?: number | null
        }
        Update: {
          agitation_times?: number | null
          agitation_type?:
            | Database['public']['Enums']['coffee_agitation_type']
            | null
          brew?: number
          created_at?: string
          duration?: number | null
          id?: number
          start?: number
          type?: Database['public']['Enums']['coffee_brew_step_type']
          water_grams?: number | null
          water_temp?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'coffee_log_brew_step_brew_fkey'
            columns: ['brew']
            isOneToOne: false
            referencedRelation: 'coffee_log_brew_details'
            referencedColumns: ['id']
          },
        ]
      }
      coffee_log_recipe: {
        Row: {
          created_at: string
          details: number | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          details?: number | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          details?: number | null
          id?: number
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'coffee_log_recipe_details_fkey'
            columns: ['details']
            isOneToOne: false
            referencedRelation: 'coffee_log_brew_details'
            referencedColumns: ['id']
          },
        ]
      }
      coffee_origins: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      coffee_process: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      coffee_roaster: {
        Row: {
          created_at: string
          id: number
          logo_url: string | null
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          logo_url?: string | null
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          logo_url?: string | null
          name?: string
        }
        Relationships: []
      }
      coffee_variety: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      culinary_ingredient: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      culinary_ingredient_category: {
        Row: {
          category: number
          created_at: string
          id: number
          ingredient: number
        }
        Insert: {
          category: number
          created_at?: string
          id?: number
          ingredient: number
        }
        Update: {
          category?: number
          created_at?: string
          id?: number
          ingredient?: number
        }
        Relationships: [
          {
            foreignKeyName: 'culinary_ingredient_category_category_fkey'
            columns: ['category']
            isOneToOne: false
            referencedRelation: 'culinary_ingredient'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'culinary_ingredient_category_ingredient_fkey'
            columns: ['ingredient']
            isOneToOne: false
            referencedRelation: 'culinary_ingredient'
            referencedColumns: ['id']
          },
        ]
      }
      culinary_recipe: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      culinary_recipe_ingredient: {
        Row: {
          alternative: Json | null
          created_at: string
          display_name: string
          id: number
          ingredient: number
          optional: boolean
          quantity: number | null
          recipe: number
          unit: number | null
        }
        Insert: {
          alternative?: Json | null
          created_at?: string
          display_name: string
          id?: number
          ingredient: number
          optional?: boolean
          quantity?: number | null
          recipe: number
          unit?: number | null
        }
        Update: {
          alternative?: Json | null
          created_at?: string
          display_name?: string
          id?: number
          ingredient?: number
          optional?: boolean
          quantity?: number | null
          recipe?: number
          unit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'culinary_recipe_ingredient_ingredient_fkey'
            columns: ['ingredient']
            isOneToOne: false
            referencedRelation: 'culinary_ingredient'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'culinary_recipe_ingredient_recipe_fkey'
            columns: ['recipe']
            isOneToOne: false
            referencedRelation: 'culinary_recipe'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'culinary_recipe_ingredient_unit_fkey'
            columns: ['unit']
            isOneToOne: false
            referencedRelation: 'culinary_unit'
            referencedColumns: ['id']
          },
        ]
      }
      culinary_recipe_source: {
        Row: {
          author: string | null
          created_at: string
          id: number
          name: string
        }
        Insert: {
          author?: string | null
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          author?: string | null
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      culinary_unit: {
        Row: {
          created_at: string
          id: number
          name: string
          std: number | null
          type: Database['public']['Enums']['culinary_unit_type'] | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          std?: number | null
          type?: Database['public']['Enums']['culinary_unit_type'] | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          std?: number | null
          type?: Database['public']['Enums']['culinary_unit_type'] | null
        }
        Relationships: []
      }
      dining_award: {
        Row: {
          award: Json | null
          award_type: number | null
          created_at: string
          id: number
          restaurant: number | null
        }
        Insert: {
          award?: Json | null
          award_type?: number | null
          created_at?: string
          id?: number
          restaurant?: number | null
        }
        Update: {
          award?: Json | null
          award_type?: number | null
          created_at?: string
          id?: number
          restaurant?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'dining_award_award_type_fkey'
            columns: ['award_type']
            isOneToOne: false
            referencedRelation: 'dining_award_type'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dining_award_restaurant_fkey'
            columns: ['restaurant']
            isOneToOne: false
            referencedRelation: 'dining_restaurants'
            referencedColumns: ['id']
          },
        ]
      }
      dining_award_type: {
        Row: {
          created_at: string
          fields: Json | null
          id: number
          name: string | null
        }
        Insert: {
          created_at?: string
          fields?: Json | null
          id?: number
          name?: string | null
        }
        Update: {
          created_at?: string
          fields?: Json | null
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      dining_city: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      dining_cuisine: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      dining_neighborhood: {
        Row: {
          city: string | null
          created_at: string
          id: string
          name: string
        }
        Insert: {
          city?: string | null
          created_at?: string
          id: string
          name: string
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: 'dining_neighborhood_city_fkey'
            columns: ['city']
            isOneToOne: false
            referencedRelation: 'dining_city'
            referencedColumns: ['id']
          },
        ]
      }
      dining_restaurant_cuisine: {
        Row: {
          created_at: string
          cuisine: number
          restaurant: number
        }
        Insert: {
          created_at?: string
          cuisine: number
          restaurant: number
        }
        Update: {
          created_at?: string
          cuisine?: number
          restaurant?: number
        }
        Relationships: [
          {
            foreignKeyName: 'dining_restaurant_cuisine_cuisine_fkey'
            columns: ['cuisine']
            isOneToOne: false
            referencedRelation: 'dining_cuisine'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dining_restaurant_cuisine_restaurant_fkey'
            columns: ['restaurant']
            isOneToOne: false
            referencedRelation: 'dining_restaurants'
            referencedColumns: ['id']
          },
        ]
      }
      dining_restaurants: {
        Row: {
          city: string | null
          created_at: string
          id: number
          la_liste_curr: number | null
          maps: string | null
          menus: Database['public']['Enums']['dining_menus'][] | null
          name: string
          neighborhood: string | null
          notes: string | null
          price: number | null
          price_point: Database['public']['Enums']['dining_price'] | null
          website: string | null
        }
        Insert: {
          city?: string | null
          created_at?: string
          id?: number
          la_liste_curr?: number | null
          maps?: string | null
          menus?: Database['public']['Enums']['dining_menus'][] | null
          name: string
          neighborhood?: string | null
          notes?: string | null
          price?: number | null
          price_point?: Database['public']['Enums']['dining_price'] | null
          website?: string | null
        }
        Update: {
          city?: string | null
          created_at?: string
          id?: number
          la_liste_curr?: number | null
          maps?: string | null
          menus?: Database['public']['Enums']['dining_menus'][] | null
          name?: string
          neighborhood?: string | null
          notes?: string | null
          price?: number | null
          price_point?: Database['public']['Enums']['dining_price'] | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'dining_restaurants_city_fkey'
            columns: ['city']
            isOneToOne: false
            referencedRelation: 'dining_city'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'dining_restaurants_neighborhood_fkey'
            columns: ['neighborhood']
            isOneToOne: false
            referencedRelation: 'dining_neighborhood'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      brewer_type: 'percolation' | 'immersion' | 'hybrid'
      coffee_agitation_type: 'swirl' | 'wet_wdt' | 'stir'
      coffee_brew_step_type:
        | 'pour'
        | 'agitation'
        | 'immersion'
        | 'release'
        | 'finish'
      culinary_unit_type: 'volume' | 'weight'
      dining_meal: 'breakfast' | 'lunch' | 'dinner' | 'brunch'
      dining_menus:
        | 'breakfast_a_la_carte'
        | 'lunch_a_la_carte'
        | 'dinner_a_la_carte'
        | 'lunch_fixe'
        | 'dinner_fixe'
        | 'brunch_a_la_carte'
        | 'brunch_bottomless'
        | 'brunch_fixe'
      dining_michelin:
        | '*'
        | '**'
        | '***'
        | 'bib_gourmand'
        | 'green_star'
        | 'guide'
      dining_price: '$' | '$$' | '$$$' | '$$$$' | '$$$$$' | '$$$$$$' | '$$$$$$$'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never
