// view-login (Login)
import { LitElement, html, css } from 'lit'
import { Auth } from 'aws-amplify'

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
      }
      main {
        height: 100vh;
        display: grid;
        /* place-items: center; */
        grid-template-areas:
          "login";
      }
      .backdrop {
        display: none;
        background: 
          url(images/future.jpg)      /* image */
          top center / auto auto      /* position / size */
          no-repeat ;                 /* repeat */
        grid-area: backdrop;
      }
      .login {
        grid-area: login;
      }
      /* ----------------------------- form ----------------------------- */
      form {
        padding-top: 3rem;
        padding-left: 3rem;
        padding-right: 3rem;

        display: grid;
        /* place-items: center; */
        gap: 3rem;

        text-align: center;
      }
      label {
        display: block;
        margin-top: .7rem;
      }
      input {
        margin-top: .7rem;
        width: 100%;
        /* always start with mobile */
        font-size: var(--mobile-font-size);

        /* Base 
        border: 0.5px solid black;
        border-radius: 10px; */

        /* Bottom Line Layout */
        border: 0;
        border-bottom: 2px solid var(--md-grey-800);
        padding: 0.7rem 0;
        outline: 0;
        background: transparent;
        transition: border-color 0.2s;
      }
      input[type=email]:not(:focus):invalid,
      input[type=password]:not(:focus):invalid {
        color: var(--text-warning-color, hsl(0, 80%, 55%));
        outline-color: var(--text-warning-color, hsl(0, 80%, 55%));
      }
      /* colored bottom-line */
      input[type=email]:focus,
      input[type=password]:focus {
        border-color: purple;
      }
      .field {
        /* width: calc(100% - 20rem); */
        width: 85%;
        text-align: start;
        /* for password show/hide positioning */
        position: relative;
      }
      button#toggle-password {
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 150;

        padding: 0;
        position: absolute;
        top: 0rem;
        right: 0rem;
      }
      button#show-password-svg {
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 150;

        padding: 0;
        position: absolute;
        top: 2.5rem;
        right: 1rem;
      }
      button#hide-password-svg {
        display: none;
        background: none;
        border: none;
        cursor: pointer;
        font-weight: 150;

        padding: 0;
        position: absolute;
        top: 2.5rem;
        right: 1rem;
      }
      #password-constraints {
        margin-top: 0.5rem;
      }
      button#sign-in:disabled {
        border: none;
        background-color: #bbb;
        color: whitesmoke;
      }

      /* ----------------------------- text ----------------------------- */
      h1 {
        font-size: 2.8rem;
      }

      #sign-in {
        padding: 1.5rem 3rem;

        background-color: #fff;
        color: var(--md-grey-800);

        border: 2px solid var(--md-grey-800);
        border-radius: 1rem;
        border-bottom-left-radius: 0;

        text-align: center;
        text-decoration: none;

        cursor: pointer;
      }

      /* ------------------------- media query -------------------------- */
      @media only screen and (min-width: 768px) and (max-width: 1280px){
        main {
          grid-template-columns: 1fr 1fr;
          grid-template-areas: 
          "backdrop login";
        }
        .backdrop {
          display: block;
        }
        form {
          padding-left: 3rem;
          padding-right: 3rem;
        }
        input {
          /* always start with mobile */
          font-size: var(--desktop-font-size);
        }
      }

      @media only screen and (min-width: 1281px) {
        main {
          grid-template-columns: 2fr 5fr 5fr 2fr;
          grid-template-rows: 1fr 7fr 1fr;
          /* grid-template-rows: 1fr; */
          grid-template-areas:
            " . . . . "
            " . backdrop login . "
            " . . . . ";
        }
        .backdrop {
          display: block;
        }
        input {
          /* always start with mobile */
          font-size: var(--desktop-font-size);
        }
      }
    `
  }

  firstUpdated () {
    console.log('@UPDATED')
  }

  #showPsw () {
    // hide the showButton show the hideButton
    const showButton = this.renderRoot.querySelector('#show-password-svg')
    const hideButton = this.renderRoot.querySelector('#hide-password-svg')
    const pswInput = this.renderRoot.querySelector('#password')
    showButton.style.display = 'none'
    hideButton.style.display = 'block'
    if (pswInput.type === 'password') {
      pswInput.type = 'text'
    }
  }

  #hidePsw () {
    // hide the hideButton show the showButton
    const showButton = this.renderRoot.querySelector('#show-password-svg')
    const hideButton = this.renderRoot.querySelector('#hide-password-svg')
    const pswInput = this.renderRoot.querySelector('#password')
    showButton.style.display = 'block'
    hideButton.style.display = 'none'
    if (pswInput.type === 'text') {
      pswInput.type = 'password'
    }
  }

  #setCustomValidity (event) {
    const pswInput = this.renderRoot.querySelector('#password')
    pswInput.setCustomValidity('')
  }

  #validatePsw () {
    const pswInput = this.renderRoot.querySelector('#password')
    let message = ''
    if (!/.{8,}/.test(pswInput.value)) {
      message = 'At least eight characters. '
    }
    if (!/.*[A-Z].*/.test(pswInput.value)) {
      message = 'At least one uppercase letter. '
    }
    if (!/.*[a-z].*/.test(pswInput.value)) {
      message = 'At least one lowercase letter.  '
    }
    pswInput.setCustomValidity(message)
  }

  async login (event) {
    event.preventDefault()

    const p = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('')
      }, 5000)
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
      <main>
        <!-- Section Intro -->
        <section class="backdrop">
          <h2>Backdrop</h2>
        </section>

        <!-- Section Login -->
        <section class="login">

          <!-- Form -->
          <form>
            <h1>Login Layout 🦝 </h1>
            <!-- email -->
              <div class="field">
                <label for="email">Email</label>
                <input 
                  id="email" 
                  name="email" 
                  type="email" 
                  autocomplete="username"
                  required
                  autofocus>
              </div>
            <!-- psw -->
            <div class="field">
              <label for="current-password">Password</label>

              <!-- toggle password chars 
              <button 
                id="toggle-password" 
                type="button"
                aria-label="Show password as plain text. Warning: this will display your password on the screen.">
                Show Password</button> -->
              <input 
                id="password"
                name="password"
                type="password"
                minlength="8"
                maxlength="32"
                autocomplete="new-password"
                aria-describedby="password-constraints"
                @input=${this.#setCustomValidity}
                required>
              <button
                id="show-password-svg"
                type="button"
                aria-label="Show password as plain text. Warning: this will display your password on the screen."
                @click=${this.#showPsw}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" shape-rendering="geometricPrecision">
                  <path d="M0 0h24v24H0V0z" fill="none"/>
                  <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4zm0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7z"/>
                </svg>
              </button>
              <button
                id="hide-password-svg"
                type="button"
                aria-label="Hide password."
                @click=${this.#hidePsw}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" shape-rendering="geometricPrecision">
                  <path d="M0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/>
                  <path d="M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6zm-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14zM2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45 2.01 3.87zm7.5 7.5l2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13zm-3.4-3.4l1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53z"/>
                </svg>
              </button>
              
              <div id="password-constraints">
                At least eight characters, with at least one lowercase and one uppercase letter.
              </div>

            </div>
            <div class="field">
              <button
                  id="sign-in"
                  @click=${this.login}
                  ?disabled=${this._hasPendingChildren}>
                Sign In
              </button>
            </div>
          </form>

        </section>
      </main>
    `
  }
}

customElements.define('view-login', ViewLogin)
