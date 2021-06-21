// view-home (Home)
import { html, css, LitElement } from 'lit'
import '../components/custom-footer'

class ViewHome extends LitElement {
  static get properties () {
    return {
      _pendingCount: Number,
      _hasPendingChildren: Boolean
    }
  }

  static get styles () {
    return css`
      :host {
        display: block;
      }
    `
  }

  _handleClick () {
    console.log('@HANDLE >> CLICK')
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('')
      }, 5000)
    })
    const pendingStateEvent = new CustomEvent('pending-state', {
      bubbles: true,
      composed: true,
      detail: {
        promise: p
      }
    })

    this.dispatchEvent(pendingStateEvent)
  }

  render () {
    return html`
      <h1>View (Home)</h1>
      <hr>
      <h3>Trigger some 5sec Async Tasks!</h3>
      <p>Pending Tasks (${this._pendingCount}) ${this._hasPendingChildren}</p>
      <button @click="${this._handleClick}">Fire pending-state </button>

      <custom-footer></custom-footer>
    `
  }
}

customElements.define('view-home', ViewHome)
