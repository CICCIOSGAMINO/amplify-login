// view-login (Login)
import { html, css, LitElement } from 'lit'
import Amplify from 'aws-amplify'
import awsconfig from '../aws-exports'
import '@material/mwc-textfield'

class ViewLogin extends LitElement {
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
        background-color: red;
      }
    `
  }

  constructor () {
    super()
    Amplify.configure(awsconfig)
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

  _auth () {
    console.log('@LOGIN >> Click')
    const p = new Promise((resolve, reject) => {

    })
  }

  render () {
    return html`
      <h1>Login</h1>
      <hr>
      <h3>Login Here!</h3>
      <p>Pending Tasks (${this._pendingCount}) ${this._hasPendingChildren}</p>
      <button @click="${this._handleClick}">Fire pending-state </button>

      <form>
        
        <!-- 
        <mwc-textfield
          id="email"
          label="Email">
        </mwc-textfield>

        <label for="psw">password</label>
        <mwc-textfield
          id="psw"
          label="Password">
        </mwc-textfield> -->
        <label for="email">email</label>
        <input id="email" type="text" />

        <label for="psw">password</label>
        <input id="psw" type="password" />
      </form>

      <button @click=${this._auth}>Login</button>
    `
  }
}

customElements.define('view-login', ViewLogin)
