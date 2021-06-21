// import { html, css, LitElement } from 'lit-element'
import { LitElement, html, css } from 'lit'
import { linkedinSVG, instagramSVG, facebookSVG } from './iconsSVG'
import './bug-report'

class CustomFooter extends LitElement {
  static get properties () {
    return {
      name: String,
      address: String,
      other: String,
      facebook: String,
      instagram: String,
      linkedin: String
    }
  }

  constructor () {
    super()
    this.name = 'Custom Footer'
    this.address = 'Maximilian Straße'
    this.other = 'Other Contents'
  }

  static get styles () {
    return css`
      :host {
        display: block;
      }

      footer {
        /* background-color: var(--mdc-theme-background); */
        background-color: transparent;
        color: var(--mdc-theme-on-primary);
      }

      h1 {
        font-weight: 500;
        font-size: 2.8rem;
        /* text-transform: uppercase; */
      }

      address {
        font-weight: 300;
        font-size: 1.6rem;
        font-style: normal;
      }

      .container {
        padding-bottom: 2rem;
        /* flexbox in action */
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
      }

      section {
        flex-grow: 0;
        width: 301px;
        margin: 15px;

        text-align: center;
      }

      section a {
        margin: 0.5rem;
      }

      #address {
        order: 1;
      }

      #socials {
        order: 2;
      }

      #details {
        order: 3;
      }

      a:link {
        text-decoration: none;
        color: var(--mdc-theme-on-primary);
      }

      a:visited {
        text-decoration: none;
        color: var(--mdc-theme-on-primary);
      }

      mark {
        background: none;
      }

      #madeby {
        font-size: 1.2rem;
        text-align: center;
        padding: 1px 1px 1px 1px;
        color: var(--mdc-theme-on-primary);
        background-color: hsla(0, 0%, 50%, .15);
      }

      p {
          margin-block-start: 1rem;
          margin-block-end: 1rem;
      }

      svg {
        width: 50px;
        height: 50px;
        /* Only affects SVG */
        fill: var(--mdc-theme-on-primary);
      }

      /* Compute the 992px (margin + flex element width) + the scroolbar 15px */
      @media only screen and (max-width: 1007px) {
        #address {
          order: 1;
        }
  
        #socials {
          order: 3;
        }
  
        #details {
          order: 2;
        }

        .container {
          padding-bottom: 5px;
        }
      }
    `
  }

  render () {
    return html`
      <footer>
        <div class="container">

          <!-- Address -->
          <section id="address">
            <address>
              <h1>${this.name}</h1>
              <p>${this.address}</p>
            </address>
          </section>

          <!-- Social network -->
          <section id="socials">
              <a href="https://facebook.com/${this.facebook}" target="_blank"> 
                ${facebookSVG}
              </a>
              <a href="https://instagram.com/${this.instagram}" target="_blank">
                ${instagramSVG}
              </a>
              <a href="https://www.linkedin.com/${this.linkedin}" target="_blank">
                ${linkedinSVG}
              </a>
          </section>

          <!-- Details -->
          <section id="details">
            <address>
              ${this.other}
            </address>
          </section>

        </div>

        <!-- Creator part -->
        <div id="madeby">
          
          <bug-report></bug-report>
          <p> Made  <mark>🧑‍💻</mark> by 
            <a href="https://github.com/CICCIOSGAMINO">
              @cicciosgamino
            </a>
          </p>
        </div>
      </footer>
    `
  }
}

customElements.define('custom-footer', CustomFooter)
