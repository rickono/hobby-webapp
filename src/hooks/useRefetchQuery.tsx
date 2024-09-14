import {
  useQuery,
  UseQuerySingleReturn,
} from '@supabase-cache-helpers/postgrest-react-query'
import { PostgrestSingleResponse } from '@supabase/supabase-js'
import { useEffect } from 'react'

export const useRefetchQuery = async <Result,>(
  query: PromiseLike<PostgrestSingleResponse<Result>>,
  dependencies: any[],
): Promise<UseQuerySingleReturn<Result>> => {
  const response = await useQuery(query)
  return response
}
