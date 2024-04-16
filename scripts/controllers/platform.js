import '../models/platform.js'
import { fetchAndRenderEvents } from './event.js'

import { render } from './elements.js'
import { platformsStorage } from '../helpers/storages.js'
import { platformsService } from '../services/platforms.js'

export async function fetchAndRenderPlatforms() {
  const platformsCache = platformsStorage.get()

  if (platformsCache?.length) {
    renderPlatforms(platformsCache)
    return
  }

  const { data: platforms } = await platformsService.list()

  platformsStorage.set(platforms)
  renderPlatforms(platforms)
}

/**
 * Renders the platforms.
 * @param {Platform[]} platforms - The platforms to render.
 */
function renderPlatforms(platforms) {
  const content = `
    <div class="main__container">
      <h2>Plataformas</h2>
      
      <p>Selecione a plataforma</p>

      <ul aria-label="Plataformas" class="platforms">
        ${platforms.map(platform => `<li>${makePlatformCard(platform)}</li>`).join('')}
      </ul>
    </div>
  `
  const mainElement = render('main', content)
  attachEventListeners(mainElement, platforms)
}

/**
 *  Attaches event listeners to the platform cards.
 * @param {HTMLElement} element - The element to search for platform cards.
 * @param {Platform[]} platforms - The platforms to attach event listeners to.
 */
function attachEventListeners(element, platforms) {
  const platformCards = element.querySelectorAll('.platform__card')

  platformCards.forEach((platformCard, index) =>
    platformCard.addEventListener('click', () =>
      fetchAndRenderEvents(platforms[index], fetchAndRenderPlatforms)
    )
  )
}

/**
 * Makes a platform card.
 * @param {Platform} platform - The platform to make a card for.
 * @returns {string} - The platform card.
 */
function makePlatformCard(platform) {
  return `
    <button class="card platform__card">
      <img src="${platform.image}" alt="${platform.name}" />
    </button>
  `
}
