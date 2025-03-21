import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions
} from '@tanstack/react-query';

interface FetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = 'GET', headers = {}, body } = options;

  const response = await fetch(`/api${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body ? JSON.stringify(body) : undefined
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'An error occurred');
  }

  return response.json();
}

export function useApiQuery<T>(
  endpoint: string,
  options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) {
  return useQuery<T, Error>({
    queryKey: [endpoint],
    queryFn: () => fetchApi<T>(endpoint),
    ...options
  });
}

export function useApiMutation<T, V>(
  endpoint: string,
  options?: Omit<UseMutationOptions<T, Error, V>, 'mutationFn'>
) {
  return useMutation<T, Error, V>({
    mutationFn: (variables: V) =>
      fetchApi<T>(endpoint, {
        method: 'POST',
        body: variables
      }),
    ...options
  });
}
