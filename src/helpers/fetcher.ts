type FetcherResponse<T> = {
  ok: boolean
  status: number
  statusText: string
  headers: Headers
  data: T
}

export const fetcher = async <T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<FetcherResponse<T>> => {
  const data = await fetch(input, init)
  const result = await data.json()

  if (!data.ok)
    throw new Error(result.message, {
      cause: result.cause,
    })

  return {
    ok: data.ok,
    status: data.status,
    statusText: data.statusText,
    headers: data.headers,
    data: result as T,
  }
}

export const createInstance = (baseUrl: string) => {
  return async <T = unknown>(url: string, init?: RequestInit | undefined) => {
    return await fetcher<T>(baseUrl + url, init)
  }
}
