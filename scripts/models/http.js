/**
 * @template T
 * @typedef {Object} FetcherResponse - Represents the response from the fetcher function.
 * @property {boolean} ok - Indicates if the request was successful.
 * @property {number} status - The HTTP status code of the response.
 * @property {string} statusText - The status text of the response.
 * @property {Headers} headers - The headers of the response.
 * @property {T} data - The data returned from the response.
 */
