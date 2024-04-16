export const elements = {
  main: document.querySelector('main'),
}

/**
 * Renders the content.
 * @param {keyof typeof elements} element - The element to render the content in.
 * @param {string} content - The content to render.
 */
export function render(element, content) {
  elements[element].innerHTML = content
  return elements[element]
}
