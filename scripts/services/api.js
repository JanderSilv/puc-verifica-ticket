import { createInstance } from '../helpers/fetcher.js'

const apiURL = ['localhost', '127.0.0.1'].includes(window.location.hostname)
  ? 'http://localhost:5001/api'
  : 'https://jandersilv.pythonanywhere.com/api'

export const apiFetcher = createInstance(apiURL)
