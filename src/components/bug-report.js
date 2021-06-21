// import { html, css, LitElement } from 'lit-element'
import { LitElement, html, css } from 'lit'
import { bugSVG } from './iconsSVG'

class BugReport extends LitElement {
  static get styles () {
    return css`
      :host {
        display: inline-block;
      }

      svg {
        width: 2.5rem;
        height: 2.5rem;
        /* Only affects SVG 
        fill: var(--mdc-theme-on-primary); */
      }
    `
  }

  render () {
    return html`
      ${bugSVG}
    `
  }
}

customElements.define('bug-report', BugReport)
