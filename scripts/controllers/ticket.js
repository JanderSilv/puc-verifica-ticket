import '../models/platform.js'
import '../models/ticket.js'

import { render } from './elements.js'
import { fetchAndRenderPlatforms } from './platform.js'

import { ticketsService } from '../services/ticket.js'

/**
 * Renders the ticker form.
 * @param {PlatformEvent} event - The event to render the ticket form for.
 * @param {() => void} goBack - The function to go back to the events.
 */
export async function renderTicketForm(platformEvent, goBack) {
  const content = `
  <form class="main__container ticket-form">
    <button aria-label="Voltar para eventos" class="back-button">⬅️ Voltar</button>

    <h2>Verificação do Ingresso</h2>
    
    <p>Para verificar seu ingresso, precisamos do identificador, além do seu email para que possamos te avisar caso o seu ingresso seja cadastrado por outra pessoa posteriormente.</p>

    <input name="ticket" placeholder="Identificador do ingresso" type="text" class="ticket-form__ticket-input" required />

    <div class="ticket-form__disclaimer">
      <span aria-label="Cadeado">🔒</span>
      <p>Utilizamos criptografia para garantir que ninguém descubra o identificador do seu ingresso, nem mesmo nós.</p>
    </div>

    <input name="email" placeholder="Seu melhor email" type="email" class="ticket-form__email-input" required />

    <div class="ticket-form__checkbox">
      <input id="agree" name="agree" type="checkbox" required />
      <label for="agree">Permito compartilhar meu email, caso surja outros compradores.</label>
    </div>

    <button type="submit" class="ticket-form__verify-button">
      Verificar ingresso
    </button>
  </form>
`
  const mainElement = render('main', content)
  attachBackButtonEventListener(goBack)
  document
    .querySelector('form')
    .addEventListener('submit', event => handleSubmit(event, platformEvent))
}

/**
 * Attaches event listener to the back button.
 * @param {() => void} goBack - The function to go back to the events.
 */
function attachBackButtonEventListener(goBack) {
  document.querySelector('.back-button')?.addEventListener('click', goBack)
}

/**
 * Handles the form submission.
 * @param {Event} event - The form submission event.
 * @param {PlatformEvent} platformEvent - The event to verify the ticket for.
 */
async function handleSubmit(event, platformEvent) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const values = Object.fromEntries(formData)

  try {
    const { data: result } = await ticketsService.verify({
      code: values.ticket,
      contact_email: values.email,
      event_id: platformEvent.id,
    })

    renderTicketVerificationResult(result, values.email)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Renders the ticket verification result.
 * @param {TicketVerificationResult} result - The result to render.
 * @param {string} contactEmail - The email to render.
 */
function renderTicketVerificationResult(result) {
  const message = getTicketVerificationMessage(result)
  const content = `
    <div class="main__container verify-result">
      <button aria-label="Voltar para plataformas" class="back-button">⬅️ Voltar</button>
      <h2>Resultado da verificação.</h2>
      <p>${message}</p>
    </div>
  `
  render('main', content)
  attachBackButtonEventListener(fetchAndRenderPlatforms)
}

/**
 * Renders the ticket verification result.
 * @param {TicketVerificationResult} result - The result to render.
 * @param {string} contactEmail - The email to render.
 */
function getTicketVerificationMessage(result, contactEmail) {
  const { matches, contact_emails } = result

  const email = filterEmail(contactEmail, contact_emails)[0]

  if (matches === 'owner') {
    if (contact_emails.length === 1)
      return 'Por enquanto, ninguém cadastrou seu ingresso. Não precisa retornar aqui novamente, te enviaremos um email caso alguém o cadastre, mas esperamos que não 🙏🏻.'
    if (contact_emails.length === 2)
      return `Infelizmente outra pessoa já cadastrou seu ingresso. Caso você queira entrar em contato com o outro comprador, seu email é <a href="mailto:${email}">${email}</a>`
    if (contact_emails.length > 2)
      return `Infelizmente outras pessoas já cadastraram seu ingresso. Caso você queira entrar em contato com os outros compradores, seus emails são ${contact_emails
        .map(e => `<a href="mailto:${e}">${e}</a>`)
        .join(', ')}.`
  } else if (matches === true) {
    if (contact_emails.length === 1)
      return `Infelizmente seu ingresso já foi cadastrado por outra pessoa. Caso você queira
      entrar em contato com o outro comprador, seu email é <a href="mailto:${contact_emails[0]}"}>${contact_emails[0]}</a>.`
    if (contact_emails.length > 1)
      return `Infelizmente seu ingresso já foi cadastrado por outra pessoa. Caso você queira
      entrar em contato com os outros compradores, seus emails são ${contact_emails
        .map(e => `<a href="mailto:${e}">${e}</a>`)
        .join(', ')}.`
  } else {
    return 'Oba! Seu ingresso ainda não foi cadastrado por ninguém. Te enviaremos um email caso alguém o cadastre, mas esperamos que não 🙏🏻.'
  }
}

/**
 * Filters the email from the emails.
 * @param {string} email - The email to filter.
 * @param {string[]} emails - The emails to filter from.
 */
function filterEmail(email, emails) {
  return emails.filter(e => e !== email)
}
