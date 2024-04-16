import '../models/index.js'

/**
 * @template T
 * @param {RequestInfo | URL} input - The URL or request object.
 * @param {RequestInit} [init] - The request options.
 * @returns {Promise<FetcherResponse<T>>} - The response from the fetch request.
 */
export const fetcher = async (input, init) => {
  const data = await fetch(input, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  })
  const result = await data.json()

  if (!data.ok) {
    throw new Error(result.message, {
      cause: result.cause,
    })
  }

  return {
    ok: data.ok,
    status: data.status,
    statusText: data.statusText,
    headers: data.headers,
    data: result,
  }
}

/**
 * @template T
 * @param {string} baseUrl - The base URL for the API.
 * @returns {function(string, RequestInit): Promise<FetcherResponse<T>>} - The function that creates an instance of the fetcher.
 */
export const createInstance = baseUrl => {
  return async (url, init) => {
    return await fetcher(baseUrl + url, init)
  }
}
