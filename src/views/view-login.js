// view-login (Login)
import { LitElement, html, css } from 'lit'

class ViewLogin extends LitElement {
  static get properties () {
    return {
      _hasPendingChildren: Boolean
    }
  }

  static get styles () {
    return css`
      :host {
        display: block;
        background-color: red;
      }
    `
  }

  connectedCallback () {
    super.connectedCallback()
    /*
    this._timerInterval = setInterval(() => {
      this.pending = true
      // this.requestUpdate()
    }, 5000) */
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    // clearInterval(this._timerInterval)
  }

  firstUpdated () {
    // disable form submit
    const form = this.shadowRoot.querySelector('form')
    form.addEventListener('submit', event => {
      // event.preventDefault()
      console.log(`@EVENT >> ${event.target}`)
    })
  }

  _login (event) {
    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('')
      }, 2000)
    })

    // fire the pending-state event
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
      <h1>Login</h1>
      <form>
        <mwc-textfield
          id="email"
          label="Email">
        </mwc-textfield>

        <label for="psw">password</label>
        <mwc-textfield
          id="psw"
          label="Password">
        </mwc-textfield>

        <button
          @click=${this._login}
          ?disabled=${this._hasPendingChildren} >
          Login
        </button>
      </form>
    `
  }
}

customElements.define('view-login', ViewLogin)
