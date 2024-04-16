import '../models/index.js'

const KEY_PREFIX = '@verifica-ticket'

export const storageKeys = {
  platforms: `${KEY_PREFIX}:platforms`,
  events: `${KEY_PREFIX}:events`,
}

export const platformsStorage = {
  key: storageKeys.platforms,
  delete: () => sessionStorage.removeItem(storageKeys.platforms),
  /** @returns {Platform[] | null} */
  get: () => {
    const data = sessionStorage.getItem(storageKeys.platforms)
    return data ? JSON.parse(data) : null
  },
  has: () => !!sessionStorage.getItem(storageKeys.platforms),
  /** @param {Platform[]} data */
  set: data => sessionStorage.setItem(storageKeys.platforms, JSON.stringify(data)),
}

/** @param {Platform} platform */
export const makeEventsStorage = platform => {
  const eventStorageKey = `${storageKeys.events}:${platform.name}`

  return {
    key: eventStorageKey,
    delete: () => sessionStorage.removeItem(eventStorageKey),
    /** @returns {PlatformEvent[] | null} */
    get: () => {
      const data = sessionStorage.getItem(eventStorageKey)
      return data ? JSON.parse(data) : null
    },
    has: () => !!sessionStorage.getItem(eventStorageKey),
    /** @param {PlatformEvent[]} data */
    set: data => sessionStorage.setItem(eventStorageKey, JSON.stringify(data)),
  }
}
