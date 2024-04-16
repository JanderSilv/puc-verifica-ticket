import '../models/event.js'

import { render } from './elements.js'
import { renderTicketForm } from './ticket.js'

import { eventsService } from '../services/events.js'
import { makeEventsStorage } from '../helpers/storages.js'

/** @type {() => void} */
let localGoBack

/** @type {Platform} */
let localPlatform

/**
 * Fetches and renders the events.
 * @param {Platform} platform - The platform to render events for.
 * @param {() => void} goBack - The function to go back to the platforms.
 */
export async function fetchAndRenderEvents(platform, goBack) {
  const eventsStorage = makeEventsStorage(platform)
  const eventsCache = eventsStorage.get()

  localPlatform = platform
  localGoBack = goBack

  if (eventsCache?.length) {
    renderEvents(platform, eventsCache)
    return
  }

  const { data: events } = await eventsService.list(platform.id)

  eventsStorage.set(events)
  renderEvents(platform, events)
}

/**
 * Renders the events.
 * @param {Platform['id']} platformId - The platform to render events for.
 * @param {PlatformEvent[]} events - The events to render.
 */
function renderEvents(platform, events) {
  const title = `Eventos de ${platform.name}`

  const content = `
    <div class="main__container">
      <button aria-label="Voltar para plataformas" class="back-button">⬅️ Voltar</button>

      <h2>${title}</h2>
      
      <p>Selecione o evento</p>

      <ul aria-label="${title}" class="events">
        ${events.map(event => `<li>${makeEventCard(event)}</li>`).join('')}
      </ul>
    </div>
  `
  const mainElement = render('main', content)
  attachBackButtonEventListener()
  attachEventListeners(mainElement, events)
}

function attachBackButtonEventListener() {
  document.querySelector('.back-button')?.addEventListener('click', localGoBack)
}

/**
 *  Attaches event listeners to the event cards.
 * @param {HTMLElement} element - The element to search for event cards.
 * @param {PlatformEvent[]} events - The events to attach event listeners to.
 */
function attachEventListeners(element, events) {
  const eventCards = element.querySelectorAll('.event__card')

  eventCards.forEach((eventCard, index) =>
    eventCard.addEventListener('click', () =>
      renderTicketForm(events[index], () => fetchAndRenderEvents(localPlatform, localGoBack))
    )
  )
}

/**
 * Makes a event card.
 * @param {PlatformEvent} event - The event to make a card for.
 * @returns {string} - The event card.
 */
function makeEventCard(event) {
  return `
    <button class="card event__card">
      <img src="${event.image}" alt="${event.name}" width="270" height="142" />

      <ul aria-label="Datas do evento">
        ${event.dates.map(date => `<li>${formatDate(date)}</li>`).join('')}
      </ul>
    </button>
  `
}

/**
 * Formats a date.
 * @param {string} date - The date to format.
 * @returns {string} - The formatted date.
 */
function formatDate(date) {
  const newDate = new Date(date)
  newDate.setHours(newDate.getHours() + 3)
  return newDate.toLocaleDateString('pt-BR')
}
