import { LitElement, html, css } from 'lit'
import page from 'page'

/* components */
import { PendingContainer } from './components/pending-container'
import { views } from './components/views'
import { lazyLoad } from './components/lazy-load'

import '@cicciosgamino/snack-bar'

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
        /* drawer 100% full screen, default is 256px */ 
        --mdc-drawer-width: 100%;
      }
      /* All elements interested have online / offline class */
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
    const snack = this.shadowRoot.querySelector('snack-bar')
    snack.setAttribute('title', 'Online')
    snack.setAttribute('active', '')
  }

  // handle going Offline
  _goingOffline () {
    this.offline = true
    const snack = this.shadowRoot.querySelector('snack-bar')
    snack.setAttribute('title', 'Offline')
    snack.setAttribute('active', '')
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
      <!-- Drawer layout -->
    `

    const tabsLayout = html`
      <!-- Tabs layout --> 
    `

    return html`

      <!-- Progress Bar for Async tasks TODO -->
      <h2>
        Async Tasks > ${this._hasPendingChildren} (#${this._pendingCount})
        <a href="/home">Home</a>|<a href="/login">Login</a>|<a href="/xxx">XXX</a>|
      </h2>

      <!-- Layout --> 
      ${this.drawerMode ? drawerLayout : tabsLayout}
      ${this._renderMainContent()}

      <snack-bar></snack-bar>
    `
  }
}

window.customElements.define('app-lite', AppLite)
