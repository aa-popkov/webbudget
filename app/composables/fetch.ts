import type { FetchOptions } from "ofetch"

export const useFetchWithHeaders = (options: FetchOptions = {}) => {
  const headers = useRequestHeaders()

  return {
    $fetchWithHeaders: $fetch.create({
      ...options,
      headers,
    }),
  }
}
