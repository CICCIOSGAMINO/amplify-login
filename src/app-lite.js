import { LitElement, html, css } from 'lit'
import page from 'page'

/* material design modules */
import '@material/mwc-drawer'
import '@material/mwc-tab'
import '@material/mwc-tab-bar'
import '@material/mwc-top-app-bar'
import '@material/mwc-fab'
import '@material/mwc-icon'
import '@material/mwc-icon-button'
import '@material/mwc-list'
import '@material/mwc-list/mwc-list-item'
import '@material/mwc-linear-progress'
import '@material/mwc-snackbar'
import '@material/mwc-textfield'

/* components */
import { PendingContainer } from './components/pending-container'
import { views } from './components/views'
import { lazyLoad } from './components/lazy-load'

/* shared styles */
import { sharedStyles } from './styles/shared-styles.js'

class AppLite extends PendingContainer(LitElement) {
  // properties
  static get properties () {
    return {
      title: String,
      offline: Boolean,
      dark: Boolean,
      drawerIsOpen: Boolean,
      maxDrawerWidth: {
        type: Number,
        attribute: 'max-drawer-width'
      },
      drawerMode: Boolean,
      currentView: String
    }
  }

  constructor () {
    super()
    // init
    this.drawerIsOpen = false
    this.maxDrawerWidth = 800
    this.offline = !navigator.onLine
    // routing stuff (some binding)
    this._initRoutes = this._initRoutes.bind(this)
    this._homeRoute = this._homeRoute.bind(this)
    this._loginRoute = this._loginRoute.bind(this)
    this._notFoundRoute = this._notFoundRoute.bind(this)
    // init the Routing
    this._initRoutes()

    // listener for window.resize (some binding)
    this._drawerOrTabsLayout = this._drawerOrTabsLayout.bind(this)
    this._goingOnline = this._goingOnline.bind(this)
    this._goingOffline = this._goingOffline.bind(this)
  }

  connectedCallback () {
    super.connectedCallback()

    // init the drawer or tabs layout
    this._drawerOrTabsLayout()

    // init the listeners
    window.addEventListener('resize', this._drawerOrTabsLayout)
    window.addEventListener('online', this._goingOnline)
    window.addEventListener('offline', this._goingOffline)
  }

  disconnectedCallback () {
    // disconnect the callbacks
    window.removeEventListener('resize', this._drawerOrTabsLayout)
    window.removeEventListener('online', this._goingOnline)
    window.removeEventListener('offline', this._goingOffline)

    super.disconnectedCallback()
  }

  static get styles () {
    return [
      sharedStyles,
      css`

      [hidden] { 
        display: none !important; 
      }

      :host {
        display: block;
        background: linear-gradient(
          to bottom right, var(--mdc-theme-background), var(--my-color));

        /* drawer 100% full screen, default is 256px */ 
        --mdc-drawer-width: 100%;
      }

      /* All elements interested have online / offline class */


      /* drawer */ 
      .drawer-content {
        background-color: var(--mdc-theme-background);
      }

      .drawer-close-icon {
        display: block;
        position: fixed;
        background-color: var(--mdc-theme-primary);
        /* bottom centered */ 
        bottom: 2em;
        left: 50%;
        transform: translate(-50%, 0);
      }

      #container {
        background-color: var(--mdc-theme-background);
        /* overflow: hidden; */
      }
      
      .main-content {
        min-height: 300px;
        padding: 48px 18px 0 18px;
      }

      /* fab */ 
      #fab-menu {
        position: fixed;
        bottom: 1.5em;
        right: 2em;
      }
      `
    ]
  }

  // init routing service
  _initRoutes () {
    // you define some URL's patterns and some callbacks to call
    // if the current URL matches those patterns
    page.redirect('/', '/home')
    page('/home', this._homeRoute)
    page('/login', this._loginRoute)
    page('*', this._notFoundRoute)
    page()
  }

  // routing callback (data driven URLs model)
  _homeRoute () {
    this.currentView = views.HOME
  }

  _loginRoute () {
    this.currentView = views.LOGIN
  }

  _notFoundRoute () {
    this.currentView = views.NOTFOUND
  }

  _tabsRoute (event) {
    // retrieve the views (eg. home, login)
    const view = Object.values(views)[event.detail.index]
    // handle the tab with page.js API (CustomEvent is possible too)
    if (view) {
      page(`/${view}`)
    }
  }

  // handle back online
  _goingOnline () {
    this.offline = false
    // TODO
    const snack = this.shadowRoot.querySelector('mwc-snackbar')
    snack.setAttribute('labelText', 'Online')
    snack.show()
  }

  // handle going Offline
  _goingOffline () {
    this.offline = true
    // TODO
    const snack = this.shadowRoot.querySelector('mwc-snackbar')
    snack.setAttribute('labelText', 'Offline')
    snack.show()
  }

  // handle the drawer or tabs layout to render base on screen
  _drawerOrTabsLayout () {
    if (window.innerWidth > this.maxDrawerWidth) {
      this.drawerMode = false
    } else {
      this.drawerMode = true
    }
  }

  // open / close drawer
  _handleDrawer () {
    this.drawerIsOpen = !this.drawerIsOpen
  }

  // TODO - Test Async tasks
  _firePendingState () {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })
    const event = new CustomEvent('pending-state', {
      detail: {
        title: 'Async task',
        promise
      }
    })
    this.dispatchEvent(event)
  }

  // Helper function to render the MainContent
  _renderMainContent () {
    switch (this.currentView) {
      case views.HOME:
        return lazyLoad(
          import('./views/view-home'),
          html`
            <view-home 
              ._hasPendingChildren="${this._hasPendingChildren}"
              ._pendingCount="${this._pendingCount}" >
            </view-home>
            `
        )
      case views.LOGIN:
        return lazyLoad(
          import('./views/view-login'),
          html`<view-login
              ._hasPendingChildren="${this._hasPendingChildren}"
              ._pendingCount="${this._pendingCount}" >
            </view-login>`
        )
      default:
        return lazyLoad(
          import('./views/view-notfound'),
          html`<view-notfound></view-notfound>`
        )
    }
  }

  render () {
    const drawerLayout = html`
      <mwc-drawer
            hasHeader 
            type="modal" 
            ?open="${this.drawerIsOpen}" 
            @MDCDrawer:opened="${() => this.drawerIsOpen = true}"
            @MDCDrawer:closed="${() => this.drawerIsOpen = false}">

            <span slot="title">Drawer Title</span>
            <span slot="subtitle">subtitle</span>

            <!-- Drawer Menu Content --> 
            <div class="drawer-content">
              
              <mwc-list activatable @selected="${this._logSelected}">
                <mwc-list-item value="Item0" twoline hasMeta>
                  <span>Item 0</span>
                  <span slot="secondary">Secondary line</span>
                  <mwc-icon slot="meta">info</mwc-icon>
                </mwc-list-item>
                <mwc-list-item twoline hasMeta>
                  <span>Item 1</span>
                  <span slot="secondary">Secondary line</span>
                  <mwc-icon slot="meta">info</mwc-icon>
                </mwc-list-item>
                <li divider padded role="separator"></li>
                <mwc-list-item graphic="avatar">
                  <span>Item 2</span>
                  <mwc-icon slot="graphic">folder</mwc-icon>
                </mwc-list-item>
                <mwc-list-item graphic="avatar">
                  <span>Item 3</span>
                  <mwc-icon slot="graphic">folder</mwc-icon>
                </mwc-list-item>
              </mwc-list>
              
              <!-- button to close the drawer for full width drawer --> 
              <mwc-icon-button
                icon="close"
                class="drawer-close-icon"
                @click="${() => this.drawerIsOpen = false}">
              </mwc-icon-button>

            </div>

            <!-- Drawer Content --> 
            <div id="container" slot="appContent">
              <mwc-top-app-bar @MDCTopAppBar:nav="${this._handleDrawer}">
                <!-- navigationIcon fire the @MDCTopAppBar:nav itself --> 
                <mwc-icon-button slot="navigationIcon" icon="menu"></mwc-icon-button>
                
                <div slot="title">${this.title}</div>

                <!-- example of handle click event --> 
                <mwc-icon-button
                  icon="message"
                  slot="actionItems"
                  @click="${() => console.log('@CLICK >> Message')}">
                </mwc-icon-button>

                <!-- Offline Icon --> 
                <mwc-icon 
                  slot="actionItems"
                  ?hidden="${!this.offline}"
                  ?aria-hidden="${!this.offline}">cloud_off</mwc-icon>

              </mwc-top-app-bar>

              <mwc-fab
                id="fab-menu"
                icon="menu"
                label="menu"
                @click="${this._handleDrawer}">
              </mwc-fab>
            </div>

          </mwc-drawer>
    `

    const tabsLayout = html`
      <!-- Tabs --> 
      <mwc-tab-bar @MDCTabBar:activated="${this._tabsRoute}">
        <mwc-tab label="home"></mwc-tab>
        <mwc-tab label="login"></mwc-tab>
      </mwc-tab-bar>
    `
    const materialSnackbar = html`
      <mwc-snackbar>
         <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
      </mwc-snackbar>
    `

    return html`
      <!-- Main -->
      <main>

        <!-- Progress Bar for Async tasks -->
        <mwc-linear-progress 
          indeterminate 
          .closed="${!this._hasPendingChildren}">
        </mwc-linear-progress>

        <!-- Layout --> 
        ${this.drawerMode ? drawerLayout : tabsLayout}
        ${this._renderMainContent()}

      </main>

      <!-- Snackbar -->
      ${materialSnackbar}
    `
  }
}

window.customElements.define('app-lite', AppLite)
