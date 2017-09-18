/* eslint-env jest */
var focusEnterExit = require('../')

function setupDom () {
  var rootEl = document.createElement('div')
  var targetEl = document.createElement('div')
  var siblingEl = document.createElement('div')

  rootEl.className = 'test'
  targetEl.id = 'target'
  targetEl.tabIndex = 0
  siblingEl.id = 'sibling'
  siblingEl.tabIndex = 0

  ;['btn1', 'btn2'].forEach(function (id) {
    var btn = document.createElement('button')
    btn.id = id
    targetEl.appendChild(btn)
  })

  rootEl.appendChild(targetEl)
  rootEl.appendChild(siblingEl)

  document.querySelectorAll('.test').forEach(function (prevTestEl) {
    prevTestEl.parentNode.removeChild(prevTestEl)
  })

  document.body.appendChild(rootEl)
}

function focusElements (els) {
  var prevEl = null

  els.forEach(function (el) {
    var ev = null

    if (prevEl) {
      ev = new window.FocusEvent('focusout', {
        bubbles: true,
        relatedTarget: el
      })
      prevEl.dispatchEvent(ev)
    }

    ev = new window.FocusEvent('focusin', {
      bubbles: true,
      relatedTarget: prevEl || document.body
    })
    el.dispatchEvent(ev)
    el.focus()
    prevEl = el
  })
}

var target = document.getElementById.bind(document, 'target')
var sibling = document.getElementById.bind(document, 'sibling')
var child1 = document.getElementById.bind(document, 'btn1')
var child2 = document.getElementById.bind(document, 'btn2')

describe('Focus enter/exit', function () {
  describe('onFocusEnter', function () {
    test('triggers on first focus of target element', function () {
      setupDom()
      var targetEl = document.getElementById('target')
      var onFocusEnter = jest.fn()
      focusEnterExit(targetEl, { onFocusEnter: onFocusEnter })
      focusElements([targetEl, child1()])
      expect(onFocusEnter.mock.calls.length).toBe(1)
    })

    test('triggers on first focus of descendent', function () {
      setupDom()
      var targetEl = target()
      var onFocusEnter = jest.fn()
      focusEnterExit(targetEl, { onFocusEnter: onFocusEnter })
      focusElements([child1(), child2()])
      expect(onFocusEnter.mock.calls.length).toBe(1)
    })

    test('NOT triggered when focusing external dom nodes', function () {
      setupDom()
      var targetEl = target()
      var onFocusEnter = jest.fn()
      focusEnterExit(targetEl, { onFocusEnter: onFocusEnter })
      focusElements([sibling()])
      expect(onFocusEnter).not.toHaveBeenCalled()
    })

    test.skip('NOT triggered when target already has focus', function () {
      // Skipping. There is no way to support this without tracking state, but
      // so has it's own set of problems.
      setupDom()
      var targetEl = target()
      var onFocusEnter = jest.fn()
      targetEl.focus()
      focusEnterExit(targetEl, { onFocusEnter: onFocusEnter })
      focusElements([child1()])
      expect(onFocusEnter).not.toHaveBeenCalled()
    })

    test.skip('NOT triggered when descendent already has focus', function () {
      // Skipping. There is no way to support this without tracking state, but
      // so has it's own set of problems.
      setupDom()
      var targetEl = target()
      var onFocusEnter = jest.fn()
      child1().focus()
      focusEnterExit(targetEl, { onFocusEnter: onFocusEnter })
      focusElements([targetEl])
      expect(onFocusEnter).not.toHaveBeenCalled()
    })

    test('NOT triggered once stopListening is called', function () {
      setupDom()
      var targetEl = document.getElementById('target')
      var onFocusEnter = jest.fn()
      focusEnterExit(targetEl, { onFocusEnter: onFocusEnter }).stopListening()
      focusElements([targetEl, child1()])
      expect(onFocusEnter).not.toHaveBeenCalled()
    })
  })

  describe('onFocusExit', function () {
    test('triggers when target element loses focus to external element', function () {
      setupDom()
      var targetEl = target()
      var onFocusExit = jest.fn()
      focusEnterExit(targetEl, { onFocusExit: onFocusExit })
      focusElements([targetEl, sibling()])
      expect(onFocusExit).toHaveBeenCalled()
    })

    test('triggers when descendent loses focus to external element', function () {
      setupDom()
      var targetEl = target()
      var onFocusExit = jest.fn()
      focusEnterExit(targetEl, { onFocusExit: onFocusExit })
      focusElements([child1(), sibling()])
      expect(onFocusExit).toHaveBeenCalled()
    })

    test('NOT triggered when focus is kept within target', function () {
      setupDom()
      var targetEl = target()
      var onFocusExit = jest.fn()
      focusEnterExit(targetEl, { onFocusExit: onFocusExit })
      focusElements([targetEl, child1(), child2()])
      expect(onFocusExit).not.toHaveBeenCalled()
    })

    test('NOT triggered once stopListening is called', function () {
      setupDom()
      var targetEl = target()
      var onFocusExit = jest.fn()
      focusEnterExit(targetEl, { onFocusExit: onFocusExit }).stopListening()
      focusElements([targetEl, sibling()])
      expect(onFocusExit).not.toHaveBeenCalled()
    })
  })
})
