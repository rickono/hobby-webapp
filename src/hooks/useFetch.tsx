import {
  useQuery,
  UseQueryReturn,
  UseQuerySingleReturn,
} from '@supabase-cache-helpers/postgrest-react-query'
import {
  PostgrestResponse,
  PostgrestSingleResponse,
} from '@supabase/supabase-js'

const useFetch = async <QueryiedType, Response>(
  query: PromiseLike<PostgrestResponse<QueryiedType>>,
  transform: (data: UseQueryReturn<QueryiedType>) => Response,
) => {
  const response = await useQuery(query)
  return transform(response)
}
