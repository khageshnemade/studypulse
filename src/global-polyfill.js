if (typeof global === 'undefined') {
    window.global = window;  // Polyfill 'global' as 'window' in the browser
  }