/**
 * Factory to create a new focus enter/exit state container.
 *
 * @param {HTMLElement} el Target DOM node
 * @param {object} options
 * @param {function} [options.onFocusEnter] Focus enter callback
 * @param {function} [options.onFocusExit] Focus exit callback
 * @return {object}
 */
function focusEnterExit (el, opts) {
  function onFocusIn (e) {
    if (!el.contains(e.relatedTarget)) {
      return opts.onFocusEnter && opts.onFocusEnter(e)
    }
  }

  function onFocusOut (e) {
    if (!el.contains(e.relatedTarget)) {
      return opts.onFocusExit && opts.onFocusExit(e)
    }
  }

  el.addEventListener('focusin', onFocusIn)
  el.addEventListener('focusout', onFocusOut)

  return {
    stopListening: function stopListening () {
      el.removeEventListener('focusin', onFocusIn)
      el.removeEventListener('focusout', onFocusOut)
    }
  }
}

module.exports = focusEnterExit
