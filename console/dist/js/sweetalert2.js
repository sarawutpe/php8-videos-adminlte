!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : ((e = e || self).Sweetalert2 = t())
})(this, function () {
  'use strict'
  var p = {
    awaitingPromise: new WeakMap(),
    promise: new WeakMap(),
    innerParams: new WeakMap(),
    domCache: new WeakMap(),
  }
  var e = (e) => {
    var t = {}
    for (const n in e) t[e[n]] = 'swal2-' + e[n]
    return t
  }
  const m = e([
      'container',
      'shown',
      'height-auto',
      'iosfix',
      'popup',
      'modal',
      'no-backdrop',
      'no-transition',
      'toast',
      'toast-shown',
      'show',
      'hide',
      'close',
      'title',
      'html-container',
      'actions',
      'confirm',
      'deny',
      'cancel',
      'default-outline',
      'footer',
      'icon',
      'icon-content',
      'image',
      'input',
      'file',
      'range',
      'select',
      'radio',
      'checkbox',
      'label',
      'textarea',
      'inputerror',
      'input-label',
      'validation-message',
      'progress-steps',
      'active-progress-step',
      'progress-step',
      'progress-step-line',
      'loader',
      'loading',
      'styled',
      'top',
      'top-start',
      'top-end',
      'top-left',
      'top-right',
      'center',
      'center-start',
      'center-end',
      'center-left',
      'center-right',
      'bottom',
      'bottom-start',
      'bottom-end',
      'bottom-left',
      'bottom-right',
      'grow-row',
      'grow-column',
      'grow-fullscreen',
      'rtl',
      'timer-progress-bar',
      'timer-progress-bar-container',
      'scrollbar-measure',
      'icon-success',
      'icon-warning',
      'icon-info',
      'icon-question',
      'icon-error',
      'no-war',
    ]),
    o = e(['success', 'warning', 'info', 'question', 'error']),
    D = 'SweetAlert2:',
    q = (e) => e.charAt(0).toUpperCase() + e.slice(1),
    a = (e) => {
      console.warn(''.concat(D, ' ').concat('object' == typeof e ? e.join(' ') : e))
    },
    l = (e) => {
      console.error(''.concat(D, ' ').concat(e))
    },
    V = [],
    N = (e, t) => {
      ;(e = '"'
        .concat(e, '" is deprecated and will be removed in the next major release. Please use "')
        .concat(t, '" instead.')),
        V.includes(e) || (V.push(e), a(e))
    },
    R = (e) => ('function' == typeof e ? e() : e),
    F = (e) => e && 'function' == typeof e.toPromise,
    u = (e) => (F(e) ? e.toPromise() : Promise.resolve(e)),
    U = (e) => e && Promise.resolve(e) === e
  const g = () => document.body.querySelector('.'.concat(m.container)),
    W = (e) => {
      var t = g()
      return t ? t.querySelector(e) : null
    },
    t = (e) => W('.'.concat(e)),
    h = () => t(m.popup),
    z = () => t(m.icon),
    K = () => t(m.title),
    _ = () => t(m['html-container']),
    Y = () => t(m.image),
    Z = () => t(m['progress-steps']),
    X = () => t(m['validation-message']),
    f = () => W('.'.concat(m.actions, ' .').concat(m.confirm)),
    b = () => W('.'.concat(m.actions, ' .').concat(m.deny))
  const v = () => W('.'.concat(m.loader)),
    y = () => W('.'.concat(m.actions, ' .').concat(m.cancel)),
    $ = () => t(m.actions),
    J = () => t(m.footer),
    Q = () => t(m['timer-progress-bar']),
    G = () => t(m.close),
    ee = () => {
      var e = Array.from(h().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort((e, t) => {
          ;(e = parseInt(e.getAttribute('tabindex'))), (t = parseInt(t.getAttribute('tabindex')))
          return t < e ? 1 : e < t ? -1 : 0
        }),
        t = Array.from(
          h().querySelectorAll(
            '\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n'
          )
        ).filter((e) => '-1' !== e.getAttribute('tabindex'))
      return ((t) => {
        var n = []
        for (let e = 0; e < t.length; e++) -1 === n.indexOf(t[e]) && n.push(t[e])
        return n
      })(e.concat(t)).filter((e) => x(e))
    },
    te = () => i(document.body, m.shown) && !i(document.body, m['toast-shown']) && !i(document.body, m['no-backdrop']),
    ne = () => h() && i(h(), m.toast)
  function oe(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1]
    const n = Q()
    x(n) &&
      (t && ((n.style.transition = 'none'), (n.style.width = '100%')),
      setTimeout(() => {
        ;(n.style.transition = 'width '.concat(e / 1e3, 's linear')), (n.style.width = '0%')
      }, 10))
  }
  const n = { previousBodyPadding: null },
    w = (t, e) => {
      ;(t.textContent = ''),
        e &&
          ((e = new DOMParser().parseFromString(e, 'text/html')),
          Array.from(e.querySelector('head').childNodes).forEach((e) => {
            t.appendChild(e)
          }),
          Array.from(e.querySelector('body').childNodes).forEach((e) => {
            e instanceof HTMLVideoElement || e instanceof HTMLAudioElement
              ? t.appendChild(e.cloneNode(!0))
              : t.appendChild(e)
          }))
    },
    i = (t, e) => {
      if (!e) return !1
      var n = e.split(/\s+/)
      for (let e = 0; e < n.length; e++) if (!t.classList.contains(n[e])) return !1
      return !0
    },
    ie = (t, n) => {
      Array.from(t.classList).forEach((e) => {
        Object.values(m).includes(e) ||
          Object.values(o).includes(e) ||
          Object.values(n.showClass).includes(e) ||
          t.classList.remove(e)
      })
    },
    C = (e, t, n) => {
      if ((ie(e, t), t.customClass && t.customClass[n])) {
        if ('string' != typeof t.customClass[n] && !t.customClass[n].forEach)
          return a(
            'Invalid type of customClass.'
              .concat(n, '! Expected string or iterable object, got "')
              .concat(typeof t.customClass[n], '"')
          )
        A(e, t.customClass[n])
      }
    },
    ae = (e, t) => {
      if (!t) return null
      switch (t) {
        case 'select':
        case 'textarea':
        case 'file':
          return e.querySelector('.'.concat(m.popup, ' > .').concat(m[t]))
        case 'checkbox':
          return e.querySelector('.'.concat(m.popup, ' > .').concat(m.checkbox, ' input'))
        case 'radio':
          return (
            e.querySelector('.'.concat(m.popup, ' > .').concat(m.radio, ' input:checked')) ||
            e.querySelector('.'.concat(m.popup, ' > .').concat(m.radio, ' input:first-child'))
          )
        case 'range':
          return e.querySelector('.'.concat(m.popup, ' > .').concat(m.range, ' input'))
        default:
          return e.querySelector('.'.concat(m.popup, ' > .').concat(m.input))
      }
    },
    re = (e) => {
      var t
      e.focus(), 'file' !== e.type && ((t = e.value), (e.value = ''), (e.value = t))
    },
    se = (e, t, n) => {
      e &&
        t &&
        (t = 'string' == typeof t ? t.split(/\s+/).filter(Boolean) : t).forEach((t) => {
          Array.isArray(e)
            ? e.forEach((e) => {
                n ? e.classList.add(t) : e.classList.remove(t)
              })
            : n
            ? e.classList.add(t)
            : e.classList.remove(t)
        })
    },
    A = (e, t) => {
      se(e, t, !0)
    },
    k = (e, t) => {
      se(e, t, !1)
    },
    d = (e, t) => {
      var n = Array.from(e.children)
      for (let e = 0; e < n.length; e++) {
        var o = n[e]
        if (o instanceof HTMLElement && i(o, t)) return o
      }
    },
    r = (e, t, n) => {
      ;(n = n === ''.concat(parseInt(n)) ? parseInt(n) : n) || 0 === parseInt(n)
        ? (e.style[t] = 'number' == typeof n ? ''.concat(n, 'px') : n)
        : e.style.removeProperty(t)
    },
    B = function (e) {
      e.style.display = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'flex'
    },
    P = (e) => {
      e.style.display = 'none'
    },
    ce = (e, t, n, o) => {
      e = e.querySelector(t)
      e && (e.style[n] = o)
    },
    le = function (e, t) {
      var n = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : 'flex'
      t ? B(e, n) : P(e)
    },
    x = (e) => !(!e || !(e.offsetWidth || e.offsetHeight || e.getClientRects().length)),
    ue = () => !x(f()) && !x(b()) && !x(y()),
    de = (e) => !!(e.scrollHeight > e.clientHeight),
    pe = (e) => {
      var e = window.getComputedStyle(e),
        t = parseFloat(e.getPropertyValue('animation-duration') || '0'),
        e = parseFloat(e.getPropertyValue('transition-duration') || '0')
      return 0 < t || 0 < e
    },
    me = 100,
    E = {},
    ge = () => {
      E.previousActiveElement instanceof HTMLElement
        ? (E.previousActiveElement.focus(), (E.previousActiveElement = null))
        : document.body && document.body.focus()
    },
    he = (o) =>
      new Promise((e) => {
        if (!o) return e()
        var t = window.scrollX,
          n = window.scrollY
        ;(E.restoreFocusTimeout = setTimeout(() => {
          ge(), e()
        }, me)),
          window.scrollTo(t, n)
      }),
    fe = () => 'undefined' == typeof window || 'undefined' == typeof document,
    be = '\n <div aria-labelledby="'
      .concat(m.title, '" aria-describedby="')
      .concat(m['html-container'], '" class="')
      .concat(m.popup, '" tabindex="-1">\n   <button type="button" class="')
      .concat(m.close, '"></button>\n   <ul class="')
      .concat(m['progress-steps'], '"></ul>\n   <div class="')
      .concat(m.icon, '"></div>\n   <img class="')
      .concat(m.image, '" />\n   <h2 class="')
      .concat(m.title, '" id="')
      .concat(m.title, '"></h2>\n   <div class="')
      .concat(m['html-container'], '" id="')
      .concat(m['html-container'], '"></div>\n   <input class="')
      .concat(m.input, '" />\n   <input type="file" class="')
      .concat(m.file, '" />\n   <div class="')
      .concat(m.range, '">\n     <input type="range" />\n     <output></output>\n   </div>\n   <select class="')
      .concat(m.select, '"></select>\n   <div class="')
      .concat(m.radio, '"></div>\n   <label for="')
      .concat(m.checkbox, '" class="')
      .concat(m.checkbox, '">\n     <input type="checkbox" />\n     <span class="')
      .concat(m.label, '"></span>\n   </label>\n   <textarea class="')
      .concat(m.textarea, '"></textarea>\n   <div class="')
      .concat(m['validation-message'], '" id="')
      .concat(m['validation-message'], '"></div>\n   <div class="')
      .concat(m.actions, '">\n     <div class="')
      .concat(m.loader, '"></div>\n     <button type="button" class="')
      .concat(m.confirm, '"></button>\n     <button type="button" class="')
      .concat(m.deny, '"></button>\n     <button type="button" class="')
      .concat(m.cancel, '"></button>\n   </div>\n   <div class="')
      .concat(m.footer, '"></div>\n   <div class="')
      .concat(m['timer-progress-bar-container'], '">\n     <div class="')
      .concat(m['timer-progress-bar'], '"></div>\n   </div>\n </div>\n')
      .replace(/(^|\n)\s*/g, ''),
    ve = () => {
      var e = g()
      return (
        !!e &&
        (e.remove(),
        k([document.documentElement, document.body], [m['no-backdrop'], m['toast-shown'], m['has-column']]),
        !0)
      )
    },
    s = () => {
      E.currentInstance.resetValidationMessage()
    },
    ye = () => {
      var e = h(),
        t = d(e, m.input),
        n = d(e, m.file)
      const o = e.querySelector('.'.concat(m.range, ' input')),
        i = e.querySelector('.'.concat(m.range, ' output'))
      var a = d(e, m.select),
        r = e.querySelector('.'.concat(m.checkbox, ' input')),
        e = d(e, m.textarea)
      ;(t.oninput = s),
        (n.onchange = s),
        (a.onchange = s),
        (r.onchange = s),
        (e.oninput = s),
        (o.oninput = () => {
          s(), (i.value = o.value)
        }),
        (o.onchange = () => {
          s(), (i.value = o.value)
        })
    },
    we = (e) => ('string' == typeof e ? document.querySelector(e) : e),
    Ce = (e) => {
      var t = h()
      t.setAttribute('role', e.toast ? 'alert' : 'dialog'),
        t.setAttribute('aria-live', e.toast ? 'polite' : 'assertive'),
        e.toast || t.setAttribute('aria-modal', 'true')
    },
    Ae = (e) => {
      'rtl' === window.getComputedStyle(e).direction && A(g(), m.rtl)
    },
    ke = (e, t) => {
      if (e instanceof HTMLElement) t.appendChild(e)
      else if ('object' == typeof e) {
        var n = e,
          o = t
        if (n.jquery) Be(o, n)
        else w(o, n.toString())
      } else e && w(t, e)
    },
    Be = (t, n) => {
      if (((t.textContent = ''), 0 in n)) for (let e = 0; e in n; e++) t.appendChild(n[e].cloneNode(!0))
      else t.appendChild(n.cloneNode(!0))
    },
    Pe = (() => {
      if (!fe()) {
        var e = document.createElement('div'),
          t = { WebkitAnimation: 'webkitAnimationEnd', animation: 'animationend' }
        for (const n in t) if (Object.prototype.hasOwnProperty.call(t, n) && void 0 !== e.style[n]) return t[n]
      }
      return !1
    })(),
    xe = (e, t) => {
      var n,
        o,
        i,
        a,
        r,
        s = $(),
        c = v(),
        l =
          ((t.showConfirmButton || t.showDenyButton || t.showCancelButton ? B : P)(s),
          C(s, t, 'actions'),
          (s = s),
          (n = c),
          (o = t),
          (i = f()),
          (a = b()),
          (r = y()),
          Ee(i, 'confirm', o),
          Ee(a, 'deny', o),
          Ee(r, 'cancel', o),
          i),
        u = a,
        d = r,
        p = o
      p.buttonsStyling
        ? (A([l, u, d], m.styled),
          p.confirmButtonColor && ((l.style.backgroundColor = p.confirmButtonColor), A(l, m['default-outline'])),
          p.denyButtonColor && ((u.style.backgroundColor = p.denyButtonColor), A(u, m['default-outline'])),
          p.cancelButtonColor && ((d.style.backgroundColor = p.cancelButtonColor), A(d, m['default-outline'])))
        : k([l, u, d], m.styled),
        o.reverseButtons &&
          (o.toast
            ? (s.insertBefore(r, i), s.insertBefore(a, i))
            : (s.insertBefore(r, n), s.insertBefore(a, n), s.insertBefore(i, n))),
        w(c, t.loaderHtml),
        C(c, t, 'loader')
    }
  function Ee(e, t, n) {
    le(e, n['show'.concat(q(t), 'Button')], 'inline-block'),
      w(e, n[''.concat(t, 'ButtonText')]),
      e.setAttribute('aria-label', n[''.concat(t, 'ButtonAriaLabel')]),
      (e.className = m[t]),
      C(e, n, ''.concat(t, 'Button')),
      A(e, n[''.concat(t, 'ButtonClass')])
  }
  const Te = (e, t) => {
      var n = G()
      w(n, t.closeButtonHtml),
        C(n, t, 'closeButton'),
        le(n, t.showCloseButton),
        n.setAttribute('aria-label', t.closeButtonAriaLabel)
    },
    Le = (e, t) => {
      var n,
        o,
        i = g()
      i &&
        ((o = i),
        'string' == typeof (n = t.backdrop)
          ? (o.style.background = n)
          : n || A([document.documentElement, document.body], m['no-backdrop']),
        (o = i),
        (n = t.position) in m
          ? A(o, m[n])
          : (a('The "position" parameter is not valid, defaulting to "center"'), A(o, m.center)),
        (n = i),
        (o = t.grow) && 'string' == typeof o && (o = 'grow-'.concat(o)) in m && A(n, m[o]),
        C(i, t, 'container'))
    }
  const Se = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'],
    Oe = (e, r) => {
      const s = h()
      e = p.innerParams.get(e)
      const c = !e || r.input !== e.input
      if (
        (Se.forEach((e) => {
          var t = d(s, m[e])
          {
            var n = e,
              o = r.inputAttributes,
              i = ae(h(), n)
            if (i) {
              Me(i)
              for (const a in o) i.setAttribute(a, o[a])
            }
          }
          ;(t.className = m[e]), c && P(t)
        }),
        r.input)
      ) {
        if (c) {
          e = r
          if (T[e.input]) {
            var t = Ie(e.input)
            const n = T[e.input](t, e)
            B(t),
              setTimeout(() => {
                re(n)
              })
          } else
            l(
              'Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(
                e.input,
                '"'
              )
            )
        }
        ;(t = r), (e = Ie(t.input))
        'object' == typeof t.customClass && A(e, t.customClass.input)
      }
    },
    Me = (t) => {
      for (let e = 0; e < t.attributes.length; e++) {
        var n = t.attributes[e].name
        ;['type', 'value', 'style'].includes(n) || t.removeAttribute(n)
      }
    },
    je = (e, t) => {
      ;(e.placeholder && !t.inputPlaceholder) || (e.placeholder = t.inputPlaceholder)
    },
    He = (e, t, n) => {
      var o, i
      n.inputLabel &&
        ((e.id = m.input),
        (o = document.createElement('label')),
        (i = m['input-label']),
        o.setAttribute('for', e.id),
        (o.className = i),
        'object' == typeof n.customClass && A(o, n.customClass.inputLabel),
        (o.innerText = n.inputLabel),
        t.insertAdjacentElement('beforebegin', o))
    },
    Ie = (e) => d(h(), m[e] || m.input),
    De = (e, t) => {
      ;['string', 'number'].includes(typeof t)
        ? (e.value = ''.concat(t))
        : U(t) ||
          a('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(typeof t, '"'))
    },
    T = {},
    qe =
      ((T.text =
        T.email =
        T.password =
        T.number =
        T.tel =
        T.url =
          (e, t) => (De(e, t.inputValue), He(e, e, t), je(e, t), (e.type = t.input), e)),
      (T.file = (e, t) => (He(e, e, t), je(e, t), e)),
      (T.range = (e, t) => {
        var n = e.querySelector('input'),
          o = e.querySelector('output')
        return De(n, t.inputValue), (n.type = t.input), De(o, t.inputValue), He(n, e, t), e
      }),
      (T.select = (e, t) => {
        var n
        return (
          (e.textContent = ''),
          t.inputPlaceholder &&
            ((n = document.createElement('option')),
            w(n, t.inputPlaceholder),
            (n.value = ''),
            (n.disabled = !0),
            (n.selected = !0),
            e.appendChild(n)),
          He(e, e, t),
          e
        )
      }),
      (T.radio = (e) => ((e.textContent = ''), e)),
      (T.checkbox = (e, t) => {
        var n = ae(h(), 'checkbox'),
          e = ((n.value = '1'), (n.id = m.checkbox), (n.checked = Boolean(t.inputValue)), e.querySelector('span'))
        return w(e, t.inputPlaceholder), n
      }),
      (T.textarea = (n, e) => {
        De(n, e.inputValue), je(n, e), He(n, n, e)
        return (
          setTimeout(() => {
            if ('MutationObserver' in window) {
              const t = parseInt(window.getComputedStyle(h()).width)
              new MutationObserver(() => {
                var e =
                  n.offsetWidth +
                  ((e = n),
                  parseInt(window.getComputedStyle(e).marginLeft) + parseInt(window.getComputedStyle(e).marginRight))
                e > t ? (h().style.width = ''.concat(e, 'px')) : (h().style.width = null)
              }).observe(n, { attributes: !0, attributeFilter: ['style'] })
            }
          }),
          n
        )
      }),
      (e, t) => {
        var n = _()
        C(n, t, 'htmlContainer'),
          t.html ? (ke(t.html, n), B(n, 'block')) : t.text ? ((n.textContent = t.text), B(n, 'block')) : P(n),
          Oe(e, t)
      }),
    Ve = (e, t) => {
      var n = J()
      le(n, t.footer), t.footer && ke(t.footer, n), C(n, t, 'footer')
    },
    Ne = (e, t) => {
      var e = p.innerParams.get(e),
        n = z()
      e && t.icon === e.icon
        ? (ze(n, t), Re(n, t))
        : t.icon || t.iconHtml
        ? t.icon && -1 === Object.keys(o).indexOf(t.icon)
          ? (l('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(t.icon, '"')),
            P(n))
          : (B(n), ze(n, t), Re(n, t), A(n, t.showClass.icon))
        : P(n)
    },
    Re = (e, t) => {
      for (const n in o) t.icon !== n && k(e, o[n])
      A(e, o[t.icon]), Ke(e, t), Fe(), C(e, t, 'icon')
    },
    Fe = () => {
      var e = h(),
        t = window.getComputedStyle(e).getPropertyValue('background-color'),
        n = e.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix')
      for (let e = 0; e < n.length; e++) n[e].style.backgroundColor = t
    },
    Ue =
      '\n  <div class="swal2-success-circular-line-left"></div>\n  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n  <div class="swal2-success-circular-line-right"></div>\n',
    We =
      '\n  <span class="swal2-x-mark">\n    <span class="swal2-x-mark-line-left"></span>\n    <span class="swal2-x-mark-line-right"></span>\n  </span>\n',
    ze = (e, t) => {
      let n = e.innerHTML,
        o
      var i
      t.iconHtml
        ? (o = _e(t.iconHtml))
        : 'success' === t.icon
        ? ((o = Ue), (n = n.replace(/ style=".*?"/g, '')))
        : (o = 'error' === t.icon ? We : ((i = { question: '?', warning: '!', info: 'i' }), _e(i[t.icon]))),
        n.trim() !== o.trim() && w(e, o)
    },
    Ke = (e, t) => {
      if (t.iconColor) {
        ;(e.style.color = t.iconColor), (e.style.borderColor = t.iconColor)
        for (const n of [
          '.swal2-success-line-tip',
          '.swal2-success-line-long',
          '.swal2-x-mark-line-left',
          '.swal2-x-mark-line-right',
        ])
          ce(e, n, 'backgroundColor', t.iconColor)
        ce(e, '.swal2-success-ring', 'borderColor', t.iconColor)
      }
    },
    _e = (e) => '<div class="'.concat(m['icon-content'], '">').concat(e, '</div>'),
    Ye = (e, t) => {
      var n = Y()
      t.imageUrl
        ? (B(n, ''),
          n.setAttribute('src', t.imageUrl),
          n.setAttribute('alt', t.imageAlt),
          r(n, 'width', t.imageWidth),
          r(n, 'height', t.imageHeight),
          (n.className = m.image),
          C(n, t, 'image'))
        : P(n)
    },
    Ze = (e, t) => {
      var n = g(),
        o = h(),
        n =
          (t.toast
            ? (r(n, 'width', t.width), (o.style.width = '100%'), o.insertBefore(v(), z()))
            : r(o, 'width', t.width),
          r(o, 'padding', t.padding),
          t.color && (o.style.color = t.color),
          t.background && (o.style.background = t.background),
          P(X()),
          o),
        o = t
      ;((n.className = ''.concat(m.popup, ' ').concat(x(n) ? o.showClass.popup : '')), o.toast)
        ? (A([document.documentElement, document.body], m['toast-shown']), A(n, m.toast))
        : A(n, m.modal)
      C(n, o, 'popup'), 'string' == typeof o.customClass && A(n, o.customClass)
      o.icon && A(n, m['icon-'.concat(o.icon)])
    },
    Xe = (e, n) => {
      const o = Z()
      n.progressSteps && 0 !== n.progressSteps.length
        ? (B(o),
          (o.textContent = ''),
          n.currentProgressStep >= n.progressSteps.length &&
            a(
              'Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)'
            ),
          n.progressSteps.forEach((e, t) => {
            var e = ((e) => {
              const t = document.createElement('li')
              return A(t, m['progress-step']), w(t, e), t
            })(e)
            o.appendChild(e),
              t === n.currentProgressStep && A(e, m['active-progress-step']),
              t !== n.progressSteps.length - 1 &&
                ((e = ((e) => {
                  const t = document.createElement('li')
                  if ((A(t, m['progress-step-line']), e.progressStepsDistance)) r(t, 'width', e.progressStepsDistance)
                  return t
                })(n)),
                o.appendChild(e))
          }))
        : P(o)
    },
    $e = (e, t) => {
      var n = K()
      le(n, t.title || t.titleText, 'block'),
        t.title && ke(t.title, n),
        t.titleText && (n.innerText = t.titleText),
        C(n, t, 'title')
    },
    Je = (e, t) => {
      Ze(e, t),
        Le(e, t),
        Xe(e, t),
        Ne(e, t),
        Ye(e, t),
        $e(e, t),
        Te(e, t),
        qe(e, t),
        xe(e, t),
        Ve(e, t),
        'function' == typeof t.didRender && t.didRender(h())
    }
  function Qe() {
    var e,
      t,
      n = p.innerParams.get(this)
    n &&
      ((e = p.domCache.get(this)),
      P(e.loader),
      ne()
        ? n.icon && B(z())
        : (t = (n = e).popup.getElementsByClassName(n.loader.getAttribute('data-button-to-replace'))).length
        ? B(t[0], 'inline-block')
        : ue() && P(n.actions),
      k([e.popup, e.actions], m.loading),
      e.popup.removeAttribute('aria-busy'),
      e.popup.removeAttribute('data-loading'),
      (e.confirmButton.disabled = !1),
      (e.denyButton.disabled = !1),
      (e.cancelButton.disabled = !1))
  }
  const Ge = () => f() && f().click()
  const L = Object.freeze({ cancel: 'cancel', backdrop: 'backdrop', close: 'close', esc: 'esc', timer: 'timer' }),
    et = (e) => {
      e.keydownTarget &&
        e.keydownHandlerAdded &&
        (e.keydownTarget.removeEventListener('keydown', e.keydownHandler, { capture: e.keydownListenerCapture }),
        (e.keydownHandlerAdded = !1))
    },
    tt = (e, t, n) => {
      var o = ee()
      if (o.length) return (t += n) === o.length ? (t = 0) : -1 === t && (t = o.length - 1), o[t].focus()
      h().focus()
    },
    nt = ['ArrowRight', 'ArrowDown'],
    ot = ['ArrowLeft', 'ArrowUp'],
    it = (e, n, t) => {
      var o = p.innerParams.get(e)
      if (o && !n.isComposing && 229 !== n.keyCode)
        if ((o.stopKeydownPropagation && n.stopPropagation(), 'Enter' === n.key))
          (e = e),
            (s = n),
            (i = o),
            R(i.allowEnterKey) &&
              s.target &&
              e.getInput() &&
              s.target instanceof HTMLElement &&
              s.target.outerHTML === e.getInput().outerHTML &&
              (['textarea', 'file'].includes(i.input) || (Ge(), s.preventDefault()))
        else if ('Tab' === n.key) {
          e = n
          var i = o
          var a = e.target,
            r = ee()
          let t = -1
          for (let e = 0; e < r.length; e++)
            if (a === r[e]) {
              t = e
              break
            }
          e.shiftKey ? tt(i, t, -1) : tt(i, t, 1)
          e.stopPropagation(), e.preventDefault()
        } else if ([...nt, ...ot].includes(n.key)) {
          var s = n.key,
            e = f(),
            c = b(),
            l = y()
          if (!(document.activeElement instanceof HTMLElement) || [e, c, l].includes(document.activeElement)) {
            var u = nt.includes(s) ? 'nextElementSibling' : 'previousElementSibling'
            let t = document.activeElement
            for (let e = 0; e < $().children.length; e++) {
              if (!(t = t[u])) return
              if (t instanceof HTMLButtonElement && x(t)) break
            }
            t instanceof HTMLButtonElement && t.focus()
          }
        } else if ('Escape' === n.key) {
          ;(e = n), (c = o), (l = t)
          if (R(c.allowEscapeKey)) {
            e.preventDefault()
            l(L.esc)
          }
        }
    }
  var at = { swalPromiseResolve: new WeakMap(), swalPromiseReject: new WeakMap() }
  const rt = () => {
      Array.from(document.body.children).forEach((e) => {
        e === g() ||
          e.contains(g()) ||
          (e.hasAttribute('aria-hidden') && e.setAttribute('data-previous-aria-hidden', e.getAttribute('aria-hidden')),
          e.setAttribute('aria-hidden', 'true'))
      })
    },
    st = () => {
      Array.from(document.body.children).forEach((e) => {
        e.hasAttribute('data-previous-aria-hidden')
          ? (e.setAttribute('aria-hidden', e.getAttribute('data-previous-aria-hidden')),
            e.removeAttribute('data-previous-aria-hidden'))
          : e.removeAttribute('aria-hidden')
      })
    },
    ct = () => {
      if (
        ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
          ('MacIntel' === navigator.platform && 1 < navigator.maxTouchPoints)) &&
        !i(document.body, m.iosfix)
      ) {
        var e = document.body.scrollTop
        ;(document.body.style.top = ''.concat(-1 * e, 'px')), A(document.body, m.iosfix)
        {
          e = g()
          let t
          ;(e.ontouchstart = (e) => {
            t = lt(e)
          }),
            (e.ontouchmove = (e) => {
              t && (e.preventDefault(), e.stopPropagation())
            })
        }
        var t,
          e = navigator.userAgent,
          n = !!e.match(/iPad/i) || !!e.match(/iPhone/i),
          o = !!e.match(/WebKit/i)
        n &&
          o &&
          !e.match(/CriOS/i) &&
          ((t = 44), h().scrollHeight > window.innerHeight - 44 && (g().style.paddingBottom = ''.concat(44, 'px')))
      }
    },
    lt = (e) => {
      var t,
        n = e.target,
        o = g()
      return (
        !(
          ((t = e).touches && t.touches.length && 'stylus' === t.touches[0].touchType) ||
          ((t = e).touches && 1 < t.touches.length)
        ) &&
        (n === o ||
          (!de(o) &&
            n instanceof HTMLElement &&
            'INPUT' !== n.tagName &&
            'TEXTAREA' !== n.tagName &&
            (!de(_()) || !_().contains(n))))
      )
    },
    ut = () => {
      var e
      i(document.body, m.iosfix) &&
        ((e = parseInt(document.body.style.top, 10)),
        k(document.body, m.iosfix),
        (document.body.style.top = ''),
        (document.body.scrollTop = -1 * e))
    },
    dt = () => {
      var e, t
      null === n.previousBodyPadding &&
        document.body.scrollHeight > window.innerHeight &&
        ((n.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'))),
        (document.body.style.paddingRight = ''.concat(
          n.previousBodyPadding +
            (((e = document.createElement('div')).className = m['scrollbar-measure']),
            document.body.appendChild(e),
            (t = e.getBoundingClientRect().width - e.clientWidth),
            document.body.removeChild(e),
            t),
          'px'
        )))
    },
    pt = () => {
      null !== n.previousBodyPadding &&
        ((document.body.style.paddingRight = ''.concat(n.previousBodyPadding, 'px')), (n.previousBodyPadding = null))
    }
  function mt(e, t, n, o) {
    ne() ? bt(e, o) : (he(n).then(() => bt(e, o)), et(E)),
      /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
        ? (t.setAttribute('style', 'display:none !important'), t.removeAttribute('class'), (t.innerHTML = ''))
        : t.remove(),
      te() && (pt(), ut(), st()),
      k([document.documentElement, document.body], [m.shown, m['height-auto'], m['no-backdrop'], m['toast-shown']])
  }
  function gt(e) {
    e =
      void 0 !== (t = e)
        ? Object.assign({ isConfirmed: !1, isDenied: !1, isDismissed: !1 }, t)
        : { isConfirmed: !1, isDenied: !1, isDismissed: !0 }
    var t = at.swalPromiseResolve.get(this),
      n = ((e) => {
        const t = h()
        if (!t) return false
        const n = p.innerParams.get(e)
        if (!n || i(t, n.hideClass.popup)) return false
        k(t, n.showClass.popup), A(t, n.hideClass.popup)
        const o = g()
        return k(o, n.showClass.backdrop), A(o, n.hideClass.backdrop), ft(e, t, n), true
      })(this)
    this.isAwaitingPromise() ? e.isDismissed || (ht(this), t(e)) : n && t(e)
  }
  const ht = (e) => {
      e.isAwaitingPromise() && (p.awaitingPromise.delete(e), p.innerParams.get(e) || e._destroy())
    },
    ft = (e, t, n) => {
      var o,
        i,
        a,
        r = g(),
        s = Pe && pe(t)
      'function' == typeof n.willClose && n.willClose(t),
        s
          ? ((s = e),
            (o = t),
            (t = r),
            (i = n.returnFocus),
            (a = n.didClose),
            (E.swalCloseEventFinishedCallback = mt.bind(null, s, t, i, a)),
            o.addEventListener(Pe, function (e) {
              e.target === o && (E.swalCloseEventFinishedCallback(), delete E.swalCloseEventFinishedCallback)
            }))
          : mt(e, r, n.returnFocus, n.didClose)
    },
    bt = (e, t) => {
      setTimeout(() => {
        'function' == typeof t && t.bind(e.params)(), e._destroy()
      })
    }
  function vt(e, t, n) {
    const o = p.domCache.get(e)
    t.forEach((e) => {
      o[e].disabled = n
    })
  }
  function yt(e, t) {
    if (e)
      if ('radio' === e.type) {
        var n = e.parentNode.parentNode.querySelectorAll('input')
        for (let e = 0; e < n.length; e++) n[e].disabled = t
      } else e.disabled = t
  }
  const c = {
      title: '',
      titleText: '',
      text: '',
      html: '',
      footer: '',
      icon: void 0,
      iconColor: void 0,
      iconHtml: void 0,
      template: void 0,
      toast: !1,
      showClass: { popup: 'swal2-show', backdrop: 'swal2-backdrop-show', icon: 'swal2-icon-show' },
      hideClass: { popup: 'swal2-hide', backdrop: 'swal2-backdrop-hide', icon: 'swal2-icon-hide' },
      customClass: {},
      target: 'body',
      color: void 0,
      backdrop: !0,
      heightAuto: !0,
      allowOutsideClick: !0,
      allowEscapeKey: !0,
      allowEnterKey: !0,
      stopKeydownPropagation: !0,
      keydownListenerCapture: !1,
      showConfirmButton: !0,
      showDenyButton: !1,
      showCancelButton: !1,
      preConfirm: void 0,
      preDeny: void 0,
      confirmButtonText: 'OK',
      confirmButtonAriaLabel: '',
      confirmButtonColor: void 0,
      denyButtonText: 'No',
      denyButtonAriaLabel: '',
      denyButtonColor: void 0,
      cancelButtonText: 'Cancel',
      cancelButtonAriaLabel: '',
      cancelButtonColor: void 0,
      buttonsStyling: !0,
      reverseButtons: !1,
      focusConfirm: !0,
      focusDeny: !1,
      focusCancel: !1,
      returnFocus: !0,
      showCloseButton: !1,
      closeButtonHtml: '&times;',
      closeButtonAriaLabel: 'Close this dialog',
      loaderHtml: '',
      showLoaderOnConfirm: !1,
      showLoaderOnDeny: !1,
      imageUrl: void 0,
      imageWidth: void 0,
      imageHeight: void 0,
      imageAlt: '',
      timer: void 0,
      timerProgressBar: !1,
      width: void 0,
      padding: void 0,
      background: void 0,
      input: void 0,
      inputPlaceholder: '',
      inputLabel: '',
      inputValue: '',
      inputOptions: {},
      inputAutoTrim: !0,
      inputAttributes: {},
      inputValidator: void 0,
      returnInputValueOnDeny: !1,
      validationMessage: void 0,
      grow: !1,
      position: 'center',
      progressSteps: [],
      currentProgressStep: void 0,
      progressStepsDistance: void 0,
      willOpen: void 0,
      didOpen: void 0,
      didRender: void 0,
      willClose: void 0,
      didClose: void 0,
      didDestroy: void 0,
      scrollbarPadding: !0,
    },
    wt = [
      'allowEscapeKey',
      'allowOutsideClick',
      'background',
      'buttonsStyling',
      'cancelButtonAriaLabel',
      'cancelButtonColor',
      'cancelButtonText',
      'closeButtonAriaLabel',
      'closeButtonHtml',
      'color',
      'confirmButtonAriaLabel',
      'confirmButtonColor',
      'confirmButtonText',
      'currentProgressStep',
      'customClass',
      'denyButtonAriaLabel',
      'denyButtonColor',
      'denyButtonText',
      'didClose',
      'didDestroy',
      'footer',
      'hideClass',
      'html',
      'icon',
      'iconColor',
      'iconHtml',
      'imageAlt',
      'imageHeight',
      'imageUrl',
      'imageWidth',
      'preConfirm',
      'preDeny',
      'progressSteps',
      'returnFocus',
      'reverseButtons',
      'showCancelButton',
      'showCloseButton',
      'showConfirmButton',
      'showDenyButton',
      'text',
      'title',
      'titleText',
      'willClose',
    ],
    Ct = {},
    At = [
      'allowOutsideClick',
      'allowEnterKey',
      'backdrop',
      'focusConfirm',
      'focusDeny',
      'focusCancel',
      'returnFocus',
      'heightAuto',
      'keydownListenerCapture',
    ],
    kt = (e) => Object.prototype.hasOwnProperty.call(c, e),
    Bt = (e) => -1 !== wt.indexOf(e),
    Pt = (e) => Ct[e],
    xt = (e) => {
      !e.backdrop &&
        e.allowOutsideClick &&
        a('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`')
      for (const n in e)
        (t = n),
          kt(t) || a('Unknown parameter "'.concat(t, '"')),
          e.toast && ((t = n), At.includes(t) && a('The parameter "'.concat(t, '" is incompatible with toasts'))),
          (t = n),
          Pt(t) && N(t, Pt(t))
      var t
    }
  const Et = (e) => {
      e.isAwaitingPromise() ? (Tt(p, e), p.awaitingPromise.set(e, !0)) : (Tt(at, e), Tt(p, e))
    },
    Tt = (e, t) => {
      for (const n in e) e[n].delete(t)
    }
  e = Object.freeze({
    hideLoading: Qe,
    disableLoading: Qe,
    getInput: function (e) {
      var t = p.innerParams.get(e || this)
      return (e = p.domCache.get(e || this)) ? ae(e.popup, t.input) : null
    },
    close: gt,
    isAwaitingPromise: function () {
      return !!p.awaitingPromise.get(this)
    },
    rejectPromise: function (e) {
      var t = at.swalPromiseReject.get(this)
      ht(this), t && t(e)
    },
    handleAwaitingPromise: ht,
    closePopup: gt,
    closeModal: gt,
    closeToast: gt,
    enableButtons: function () {
      vt(this, ['confirmButton', 'denyButton', 'cancelButton'], !1)
    },
    disableButtons: function () {
      vt(this, ['confirmButton', 'denyButton', 'cancelButton'], !0)
    },
    enableInput: function () {
      yt(this.getInput(), !1)
    },
    disableInput: function () {
      yt(this.getInput(), !0)
    },
    showValidationMessage: function (e) {
      var t = p.domCache.get(this),
        n = p.innerParams.get(this)
      w(t.validationMessage, e),
        (t.validationMessage.className = m['validation-message']),
        n.customClass && n.customClass.validationMessage && A(t.validationMessage, n.customClass.validationMessage),
        B(t.validationMessage),
        (e = this.getInput()) &&
          (e.setAttribute('aria-invalid', !0),
          e.setAttribute('aria-describedby', m['validation-message']),
          re(e),
          A(e, m.inputerror))
    },
    resetValidationMessage: function () {
      var e = p.domCache.get(this)
      e.validationMessage && P(e.validationMessage),
        (e = this.getInput()) &&
          (e.removeAttribute('aria-invalid'), e.removeAttribute('aria-describedby'), k(e, m.inputerror))
    },
    getProgressSteps: function () {
      return p.domCache.get(this).progressSteps
    },
    update: function (e) {
      var t = h(),
        n = p.innerParams.get(this)
      if (!t || i(t, n.hideClass.popup))
        return a(
          "You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup."
        )
      ;(t = ((t) => {
        const n = {}
        return (
          Object.keys(t).forEach((e) => {
            if (Bt(e)) n[e] = t[e]
            else a('Invalid parameter to update: '.concat(e))
          }),
          n
        )
      })(e)),
        (n = Object.assign({}, n, t)),
        Je(this, n),
        p.innerParams.set(this, n),
        Object.defineProperties(this, {
          params: { value: Object.assign({}, this.params, e), writable: !1, enumerable: !0 },
        })
    },
    _destroy: function () {
      var e = p.domCache.get(this),
        t = p.innerParams.get(this)
      t
        ? (e.popup &&
            E.swalCloseEventFinishedCallback &&
            (E.swalCloseEventFinishedCallback(), delete E.swalCloseEventFinishedCallback),
          'function' == typeof t.didDestroy && t.didDestroy(),
          (e = this),
          Et(e),
          delete e.params,
          delete E.keydownHandler,
          delete E.keydownTarget,
          delete E.currentInstance)
        : Et(this)
    },
  })
  const S = (e) => {
      var t,
        n,
        o,
        i = h(),
        a = (i || new An(), (i = h()), v())
      ne()
        ? P(z())
        : ((t = i),
          (e = e),
          (n = $()),
          (o = v()),
          !e && x(f()) && (e = f()),
          B(n),
          e && (P(e), o.setAttribute('data-button-to-replace', e.className)),
          o.parentNode.insertBefore(o, e),
          A([t, n], m.loading)),
        B(a),
        i.setAttribute('data-loading', 'true'),
        i.setAttribute('aria-busy', 'true'),
        i.focus()
    },
    Lt = (t, n) => {
      const o = h(),
        i = (e) => {
          Ot[n.input](o, Mt(e), n)
        }
      F(n.inputOptions) || U(n.inputOptions)
        ? (S(f()),
          u(n.inputOptions).then((e) => {
            t.hideLoading(), i(e)
          }))
        : 'object' == typeof n.inputOptions
        ? i(n.inputOptions)
        : l('Unexpected type of inputOptions! Expected object, Map or Promise, got '.concat(typeof n.inputOptions))
    },
    St = (t, n) => {
      const o = t.getInput()
      P(o),
        u(n.inputValue)
          .then((e) => {
            ;(o.value = 'number' === n.input ? ''.concat(parseFloat(e) || 0) : ''.concat(e)),
              B(o),
              o.focus(),
              t.hideLoading()
          })
          .catch((e) => {
            l('Error in inputValue promise: '.concat(e)), (o.value = ''), B(o), o.focus(), t.hideLoading()
          })
    },
    Ot = {
      select: (e, t, i) => {
        const o = d(e, m.select),
          a = (e, t, n) => {
            var o = document.createElement('option')
            ;(o.value = n), w(o, t), (o.selected = jt(n, i.inputValue)), e.appendChild(o)
          }
        t.forEach((e) => {
          var t = e[0],
            e = e[1]
          if (Array.isArray(e)) {
            const n = document.createElement('optgroup')
            ;(n.label = t), (n.disabled = !1), o.appendChild(n), e.forEach((e) => a(n, e[1], e[0]))
          } else a(o, e, t)
        }),
          o.focus()
      },
      radio: (e, t, i) => {
        const a = d(e, m.radio)
        t.forEach((e) => {
          var t = e[0],
            e = e[1],
            n = document.createElement('input'),
            o = document.createElement('label'),
            t =
              ((n.type = 'radio'),
              (n.name = m.radio),
              (n.value = t),
              jt(t, i.inputValue) && (n.checked = !0),
              document.createElement('span'))
          w(t, e), (t.className = m.label), o.appendChild(n), o.appendChild(t), a.appendChild(o)
        })
        e = a.querySelectorAll('input')
        e.length && e[0].focus()
      },
    },
    Mt = (n) => {
      const o = []
      return (
        'undefined' != typeof Map && n instanceof Map
          ? n.forEach((e, t) => {
              let n = e
              'object' == typeof n && (n = Mt(n)), o.push([t, n])
            })
          : Object.keys(n).forEach((e) => {
              let t = n[e]
              'object' == typeof t && (t = Mt(t)), o.push([e, t])
            }),
        o
      )
    },
    jt = (e, t) => t && t.toString() === e.toString(),
    Ht = (e, t) => {
      var n = p.innerParams.get(e)
      if (n.input) {
        var o = ((e, t) => {
          var n,
            o = e.getInput()
          if (!o) return null
          switch (t.input) {
            case 'checkbox':
              return o.checked ? 1 : 0
            case 'radio':
              return (n = o).checked ? n.value : null
            case 'file':
              return (n = o).files.length ? (null !== n.getAttribute('multiple') ? n.files : n.files[0]) : null
            default:
              return t.inputAutoTrim ? o.value.trim() : o.value
          }
        })(e, n)
        if (n.inputValidator) {
          var i = e
          var a = o
          var r = t
          const s = p.innerParams.get(i),
            c = (i.disableInput(), Promise.resolve().then(() => u(s.inputValidator(a, s.validationMessage))))
          c.then((e) => {
            i.enableButtons(), i.enableInput(), e ? i.showValidationMessage(e) : ('deny' === r ? It : Vt)(i, a)
          })
        } else
          e.getInput().checkValidity()
            ? ('deny' === t ? It : Vt)(e, o)
            : (e.enableButtons(), e.showValidationMessage(n.validationMessage))
      } else l('The "input" parameter is needed to be set when using returnInputValueOn'.concat(q(t)))
    },
    It = (t, n) => {
      const e = p.innerParams.get(t || void 0)
      e.showLoaderOnDeny && S(b()),
        e.preDeny
          ? (p.awaitingPromise.set(t || void 0, !0),
            Promise.resolve()
              .then(() => u(e.preDeny(n, e.validationMessage)))
              .then((e) => {
                !1 === e ? (t.hideLoading(), ht(t)) : t.close({ isDenied: !0, value: void 0 === e ? n : e })
              })
              .catch((e) => qt(t || void 0, e)))
          : t.close({ isDenied: !0, value: n })
    },
    Dt = (e, t) => {
      e.close({ isConfirmed: !0, value: t })
    },
    qt = (e, t) => {
      e.rejectPromise(t)
    },
    Vt = (t, n) => {
      const e = p.innerParams.get(t || void 0)
      e.showLoaderOnConfirm && S(),
        e.preConfirm
          ? (t.resetValidationMessage(),
            p.awaitingPromise.set(t || void 0, !0),
            Promise.resolve()
              .then(() => u(e.preConfirm(n, e.validationMessage)))
              .then((e) => {
                x(X()) || !1 === e ? (t.hideLoading(), ht(t)) : Dt(t, void 0 === e ? n : e)
              })
              .catch((e) => qt(t || void 0, e)))
          : Dt(t, n)
    },
    Nt = (n, e, o) => {
      e.popup.onclick = () => {
        var e,
          t = p.innerParams.get(n)
        ;(t &&
          ((e = t).showConfirmButton ||
            e.showDenyButton ||
            e.showCancelButton ||
            e.showCloseButton ||
            t.timer ||
            t.input)) ||
          o(L.close)
      }
    }
  let Rt = !1
  const Ft = (t) => {
      t.popup.onmousedown = () => {
        t.container.onmouseup = function (e) {
          ;(t.container.onmouseup = void 0), e.target === t.container && (Rt = !0)
        }
      }
    },
    Ut = (t) => {
      t.container.onmousedown = () => {
        t.popup.onmouseup = function (e) {
          ;(t.popup.onmouseup = void 0), (e.target !== t.popup && !t.popup.contains(e.target)) || (Rt = !0)
        }
      }
    },
    Wt = (n, o, i) => {
      o.container.onclick = (e) => {
        var t = p.innerParams.get(n)
        Rt ? (Rt = !1) : e.target === o.container && R(t.allowOutsideClick) && i(L.backdrop)
      }
    },
    zt = (e) => 'object' == typeof e && e.jquery,
    Kt = (e) => e instanceof Element || zt(e)
  const _t = () => {
      if (E.timeout)
        return (
          (e = Q()),
          (t = parseInt(window.getComputedStyle(e).width)),
          e.style.removeProperty('transition'),
          (e.style.width = '100%'),
          (n = parseInt(window.getComputedStyle(e).width)),
          (t = (t / n) * 100),
          e.style.removeProperty('transition'),
          (e.style.width = ''.concat(t, '%')),
          E.timeout.stop()
        )
      var e, t, n
    },
    Yt = () => {
      var e
      if (E.timeout) return (e = E.timeout.start()), oe(e), e
    }
  let Zt = !1
  const Xt = {}
  const $t = (t) => {
    for (let e = t.target; e && e !== document; e = e.parentNode)
      for (const o in Xt) {
        var n = e.getAttribute(o)
        if (n) return void Xt[o].fire({ template: n })
      }
  }
  var Jt = Object.freeze({
    isValidParameter: kt,
    isUpdatableParameter: Bt,
    isDeprecatedParameter: Pt,
    argsToParams: (n) => {
      const o = {}
      return (
        'object' != typeof n[0] || Kt(n[0])
          ? ['title', 'html', 'icon'].forEach((e, t) => {
              t = n[t]
              'string' == typeof t || Kt(t)
                ? (o[e] = t)
                : void 0 !== t &&
                  l('Unexpected type of '.concat(e, '! Expected "string" or "Element", got ').concat(typeof t))
            })
          : Object.assign(o, n[0]),
        o
      )
    },
    isVisible: () => x(h()),
    clickConfirm: Ge,
    clickDeny: () => b() && b().click(),
    clickCancel: () => y() && y().click(),
    getContainer: g,
    getPopup: h,
    getTitle: K,
    getHtmlContainer: _,
    getImage: Y,
    getIcon: z,
    getInputLabel: () => t(m['input-label']),
    getCloseButton: G,
    getActions: $,
    getConfirmButton: f,
    getDenyButton: b,
    getCancelButton: y,
    getLoader: v,
    getFooter: J,
    getTimerProgressBar: Q,
    getFocusableElements: ee,
    getValidationMessage: X,
    isLoading: () => h().hasAttribute('data-loading'),
    fire: function () {
      for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n]
      return new this(...t)
    },
    mixin: function (n) {
      class e extends this {
        _main(e, t) {
          return super._main(e, Object.assign({}, n, t))
        }
      }
      return e
    },
    showLoading: S,
    enableLoading: S,
    getTimerLeft: () => E.timeout && E.timeout.getTimerLeft(),
    stopTimer: _t,
    resumeTimer: Yt,
    toggleTimer: () => {
      var e = E.timeout
      return e && (e.running ? _t : Yt)()
    },
    increaseTimer: (e) => {
      if (E.timeout) return (e = E.timeout.increase(e)), oe(e, !0), e
    },
    isTimerRunning: () => E.timeout && E.timeout.isRunning(),
    bindClickHandler: function () {
      var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 'data-swal-template'
      ;(Xt[e] = this), Zt || (document.body.addEventListener('click', $t), (Zt = !0))
    },
  })
  class Qt {
    constructor(e, t) {
      ;(this.callback = e), (this.remaining = t), (this.running = !1), this.start()
    }
    start() {
      return (
        this.running ||
          ((this.running = !0), (this.started = new Date()), (this.id = setTimeout(this.callback, this.remaining))),
        this.remaining
      )
    }
    stop() {
      return (
        this.running &&
          ((this.running = !1),
          clearTimeout(this.id),
          (this.remaining -= new Date().getTime() - this.started.getTime())),
        this.remaining
      )
    }
    increase(e) {
      var t = this.running
      return t && this.stop(), (this.remaining += e), t && this.start(), this.remaining
    }
    getTimerLeft() {
      return this.running && (this.stop(), this.start()), this.remaining
    }
    isRunning() {
      return this.running
    }
  }
  const Gt = ['swal-title', 'swal-html', 'swal-footer'],
    en = (e) => {
      const n = {}
      return (
        Array.from(e.querySelectorAll('swal-param')).forEach((e) => {
          O(e, ['name', 'value'])
          var t = e.getAttribute('name'),
            e = e.getAttribute('value')
          'boolean' == typeof c[t] && (n[t] = 'false' !== e), 'object' == typeof c[t] && (n[t] = JSON.parse(e))
        }),
        n
      )
    },
    tn = (e) => {
      const n = {}
      return (
        Array.from(e.querySelectorAll('swal-button')).forEach((e) => {
          O(e, ['type', 'color', 'aria-label'])
          var t = e.getAttribute('type')
          ;(n[''.concat(t, 'ButtonText')] = e.innerHTML),
            (n['show'.concat(q(t), 'Button')] = !0),
            e.hasAttribute('color') && (n[''.concat(t, 'ButtonColor')] = e.getAttribute('color')),
            e.hasAttribute('aria-label') && (n[''.concat(t, 'ButtonAriaLabel')] = e.getAttribute('aria-label'))
        }),
        n
      )
    },
    nn = (e) => {
      var t = {},
        e = e.querySelector('swal-image')
      return (
        e &&
          (O(e, ['src', 'width', 'height', 'alt']),
          e.hasAttribute('src') && (t.imageUrl = e.getAttribute('src')),
          e.hasAttribute('width') && (t.imageWidth = e.getAttribute('width')),
          e.hasAttribute('height') && (t.imageHeight = e.getAttribute('height')),
          e.hasAttribute('alt') && (t.imageAlt = e.getAttribute('alt'))),
        t
      )
    },
    on = (e) => {
      var t = {},
        e = e.querySelector('swal-icon')
      return (
        e &&
          (O(e, ['type', 'color']),
          e.hasAttribute('type') && (t.icon = e.getAttribute('type')),
          e.hasAttribute('color') && (t.iconColor = e.getAttribute('color')),
          (t.iconHtml = e.innerHTML)),
        t
      )
    },
    an = (e) => {
      const n = {}
      var t = e.querySelector('swal-input'),
        t =
          (t &&
            (O(t, ['type', 'label', 'placeholder', 'value']),
            (n.input = t.getAttribute('type') || 'text'),
            t.hasAttribute('label') && (n.inputLabel = t.getAttribute('label')),
            t.hasAttribute('placeholder') && (n.inputPlaceholder = t.getAttribute('placeholder')),
            t.hasAttribute('value') && (n.inputValue = t.getAttribute('value'))),
          Array.from(e.querySelectorAll('swal-input-option')))
      return (
        t.length &&
          ((n.inputOptions = {}),
          t.forEach((e) => {
            O(e, ['value'])
            var t = e.getAttribute('value'),
              e = e.innerHTML
            n.inputOptions[t] = e
          })),
        n
      )
    },
    rn = (e, t) => {
      var n = {}
      for (const a in t) {
        var o = t[a],
          i = e.querySelector(o)
        i && (O(i, []), (n[o.replace(/^swal-/, '')] = i.innerHTML.trim()))
      }
      return n
    },
    sn = (e) => {
      const t = Gt.concat(['swal-param', 'swal-button', 'swal-image', 'swal-icon', 'swal-input', 'swal-input-option'])
      Array.from(e.children).forEach((e) => {
        e = e.tagName.toLowerCase()
        t.includes(e) || a('Unrecognized element <'.concat(e, '>'))
      })
    },
    O = (t, n) => {
      Array.from(t.attributes).forEach((e) => {
        ;-1 === n.indexOf(e.name) &&
          a([
            'Unrecognized attribute "'.concat(e.name, '" on <').concat(t.tagName.toLowerCase(), '>.'),
            ''.concat(
              n.length
                ? 'Allowed attributes are: '.concat(n.join(', '))
                : 'To set the value, use HTML within the element.'
            ),
          ])
      })
    },
    cn = 10,
    ln = (e) => {
      var t = h()
      e.target === t && ((e = g()), t.removeEventListener(Pe, ln), (e.style.overflowY = 'auto'))
    },
    un = (e, t) => {
      Pe && pe(t) ? ((e.style.overflowY = 'hidden'), t.addEventListener(Pe, ln)) : (e.style.overflowY = 'auto')
    },
    dn = (e, t, n) => {
      ct(),
        t && 'hidden' !== n && dt(),
        setTimeout(() => {
          e.scrollTop = 0
        })
    },
    pn = (e, t, n) => {
      A(e, n.showClass.backdrop),
        t.style.setProperty('opacity', '0', 'important'),
        B(t, 'grid'),
        setTimeout(() => {
          A(t, n.showClass.popup), t.style.removeProperty('opacity')
        }, cn),
        A([document.documentElement, document.body], m.shown),
        n.heightAuto && n.backdrop && !n.toast && A([document.documentElement, document.body], m['height-auto'])
    }
  var mn = {
    email: (e, t) =>
      /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(e)
        ? Promise.resolve()
        : Promise.resolve(t || 'Invalid email address'),
    url: (e, t) =>
      /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(e)
        ? Promise.resolve()
        : Promise.resolve(t || 'Invalid URL'),
  }
  function gn(e) {
    var t, n, o
    ;(t = e).inputValidator ||
      Object.keys(mn).forEach((e) => {
        t.input === e && (t.inputValidator = mn[e])
      }),
      e.showLoaderOnConfirm &&
        !e.preConfirm &&
        a(
          'showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request'
        ),
      ((n = e).target &&
        ('string' != typeof n.target || document.querySelector(n.target)) &&
        ('string' == typeof n.target || n.target.appendChild)) ||
        (a('Target parameter is not valid, defaulting to "body"'), (n.target = 'body')),
      'string' == typeof e.title && (e.title = e.title.split('\n').join('<br />')),
      (n = e),
      (e = ve()),
      fe()
        ? l('SweetAlert2 requires document to initialize')
        : (((o = document.createElement('div')).className = m.container),
          e && A(o, m['no-transition']),
          w(o, be),
          (e = we(n.target)).appendChild(o),
          Ce(n),
          Ae(e),
          ye())
  }
  let M
  class j {
    constructor() {
      if ('undefined' != typeof window) {
        M = this
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n]
        var o = Object.freeze(this.constructor.argsToParams(t)),
          o =
            (Object.defineProperties(this, { params: { value: o, writable: !1, enumerable: !0, configurable: !0 } }),
            M._main(M.params))
        p.promise.set(this, o)
      }
    }
    _main(e) {
      var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
        e =
          (xt(Object.assign({}, t, e)),
          E.currentInstance && (E.currentInstance._destroy(), te() && st()),
          (E.currentInstance = M),
          fn(e, t)),
        t =
          (gn(e),
          Object.freeze(e),
          E.timeout && (E.timeout.stop(), delete E.timeout),
          clearTimeout(E.restoreFocusTimeout),
          bn(M))
      return Je(M, e), p.innerParams.set(M, e), hn(M, t, e)
    }
    then(e) {
      return p.promise.get(this).then(e)
    }
    finally(e) {
      return p.promise.get(this).finally(e)
    }
  }
  const hn = (l, u, d) =>
      new Promise((e, t) => {
        const n = (e) => {
          l.close({ isDismissed: !0, dismiss: e })
        }
        var o, i, a
        at.swalPromiseResolve.set(l, e),
          at.swalPromiseReject.set(l, t),
          (u.confirmButton.onclick = () => {
            var e, t
            ;(e = l), (t = p.innerParams.get(e)), e.disableButtons(), t.input ? Ht(e, 'confirm') : Vt(e, !0)
          }),
          (u.denyButton.onclick = () => {
            var e, t
            ;(e = l),
              (t = p.innerParams.get(e)),
              e.disableButtons(),
              t.returnInputValueOnDeny ? Ht(e, 'deny') : It(e, !1)
          }),
          (u.cancelButton.onclick = () => {
            var e, t
            ;(e = l), (t = n), e.disableButtons(), t(L.cancel)
          }),
          (u.closeButton.onclick = () => {
            n(L.close)
          }),
          (e = l),
          (t = u),
          (a = n),
          (p.innerParams.get(e).toast ? Nt : (Ft(t), Ut(t), Wt))(e, t, a),
          (o = l),
          (e = E),
          (t = d),
          (i = n),
          et(e),
          t.toast ||
            ((e.keydownHandler = (e) => it(o, e, i)),
            (e.keydownTarget = t.keydownListenerCapture ? window : h()),
            (e.keydownListenerCapture = t.keydownListenerCapture),
            e.keydownTarget.addEventListener('keydown', e.keydownHandler, { capture: e.keydownListenerCapture }),
            (e.keydownHandlerAdded = !0)),
          (a = l),
          'select' === (t = d).input || 'radio' === t.input
            ? Lt(a, t)
            : ['text', 'email', 'number', 'tel', 'textarea'].includes(t.input) &&
              (F(t.inputValue) || U(t.inputValue)) &&
              (S(f()), St(a, t))
        {
          var r = d
          const s = g(),
            c = h()
          'function' == typeof r.willOpen && r.willOpen(c),
            (e = window.getComputedStyle(document.body).overflowY),
            pn(s, c, r),
            setTimeout(() => {
              un(s, c)
            }, cn),
            te() && (dn(s, r.scrollbarPadding, e), rt()),
            ne() || E.previousActiveElement || (E.previousActiveElement = document.activeElement),
            'function' == typeof r.didOpen && setTimeout(() => r.didOpen(c)),
            k(s, m['no-transition'])
        }
        vn(E, d, n),
          yn(u, d),
          setTimeout(() => {
            u.container.scrollTop = 0
          })
      }),
    fn = (e, t) => {
      var n = (n = 'string' == typeof (n = e).template ? document.querySelector(n.template) : n.template)
          ? ((n = n.content), sn(n), Object.assign(en(n), tn(n), nn(n), on(n), an(n), rn(n, Gt)))
          : {},
        t = Object.assign({}, c, t, n, e)
      return (
        (t.showClass = Object.assign({}, c.showClass, t.showClass)),
        (t.hideClass = Object.assign({}, c.hideClass, t.hideClass)),
        t
      )
    },
    bn = (e) => {
      var t = {
        popup: h(),
        container: g(),
        actions: $(),
        confirmButton: f(),
        denyButton: b(),
        cancelButton: y(),
        loader: v(),
        closeButton: G(),
        validationMessage: X(),
        progressSteps: Z(),
      }
      return p.domCache.set(e, t), t
    },
    vn = (e, t, n) => {
      var o = Q()
      P(o),
        t.timer &&
          ((e.timeout = new Qt(() => {
            n('timer'), delete e.timeout
          }, t.timer)),
          t.timerProgressBar &&
            (B(o),
            C(o, t, 'timerProgressBar'),
            setTimeout(() => {
              e.timeout && e.timeout.running && oe(t.timer)
            })))
    },
    yn = (e, t) => {
      t.toast || (R(t.allowEnterKey) ? wn(e, t) || tt(t, -1, 1) : Cn())
    },
    wn = (e, t) =>
      t.focusDeny && x(e.denyButton)
        ? (e.denyButton.focus(), !0)
        : t.focusCancel && x(e.cancelButton)
        ? (e.cancelButton.focus(), !0)
        : !(!t.focusConfirm || !x(e.confirmButton)) && (e.confirmButton.focus(), !0),
    Cn = () => {
      document.activeElement instanceof HTMLElement &&
        'function' == typeof document.activeElement.blur &&
        document.activeElement.blur()
    }
  if (
    'undefined' != typeof window &&
    /^ru\b/.test(navigator.language) &&
    location.host.match(/\.(ru|su|xn--p1ai)$/) &&
    Math.random() < 0.3
  ) {
    const I = document.createElement('div')
    I.className = 'save-yourself-from-war'
    var H = (H = [
        {
          text: 'Главная задача сейчас - не попасть на войну и помочь своим ближним не быть мобилизоваными.',
          id: 'X39ZkynPjpQ',
        },
      ])[Math.floor(Math.random() * H.length)],
      H =
        (w(
          I,
          '<div>'
            .concat(H.text, '</div>\n      <iframe width="560" height="315" src="https://www.youtube.com/embed/')
            .concat(
              H.id,
              '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\n      <div>Сохраните себя и своих близких!</div>\n      '
            )
        ),
        document.createElement('button'))
    ;(H.innerHTML = '&times;'),
      (H.onclick = () => I.remove()),
      I.appendChild(H),
      window.addEventListener('load', () => {
        setTimeout(() => {
          document.body.appendChild(I)
        }, 1e3)
      })
  }
  Object.assign(j.prototype, e),
    Object.assign(j, Jt),
    Object.keys(e).forEach((e) => {
      j[e] = function () {
        if (M) return M[e](...arguments)
      }
    }),
    (j.DismissReason = L),
    (j.version = '11.4.37')
  const An = j
  return (An.default = An)
}),
  void 0 !== this && this.Sweetalert2 && (this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2)
'undefined' != typeof document &&
  (function (e, t) {
    var n = e.createElement('style')
    if ((e.getElementsByTagName('head')[0].appendChild(n), n.styleSheet))
      n.styleSheet.disabled || (n.styleSheet.cssText = t)
    else
      try {
        n.innerHTML = t
      } catch (e) {
        n.innerText = t
      }
  })(
    document,
    '.swal2-popup.swal2-toast{box-sizing:border-box;grid-column:1/4!important;grid-row:1/4!important;grid-template-columns:1fr 99fr 1fr;padding:1em;overflow-y:hidden;background:#fff;box-shadow:0 0 1px hsla(0deg,0%,0%,.075),0 1px 2px hsla(0deg,0%,0%,.075),1px 2px 4px hsla(0deg,0%,0%,.075),1px 3px 8px hsla(0deg,0%,0%,.075),2px 4px 16px hsla(0deg,0%,0%,.075);pointer-events:all}.swal2-popup.swal2-toast>*{grid-column:2}.swal2-popup.swal2-toast .swal2-title{margin:.5em 1em;padding:0;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-loading{justify-content:center}.swal2-popup.swal2-toast .swal2-input{height:2em;margin:.5em;font-size:1em}.swal2-popup.swal2-toast .swal2-validation-message{font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{grid-column:3/3;grid-row:1/99;align-self:center;width:.8em;height:.8em;margin:0;font-size:2em}.swal2-popup.swal2-toast .swal2-html-container{margin:.5em 1em;padding:0;overflow:initial;font-size:1em;text-align:initial}.swal2-popup.swal2-toast .swal2-html-container:empty{padding:0}.swal2-popup.swal2-toast .swal2-loader{grid-column:1;grid-row:1/99;align-self:center;width:2em;height:2em;margin:.25em}.swal2-popup.swal2-toast .swal2-icon{grid-column:1;grid-row:1/99;align-self:center;width:2em;min-width:2em;height:2em;margin:0 .5em 0 0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{justify-content:flex-start;height:auto;margin:0;margin-top:.5em;padding:0 .5em}.swal2-popup.swal2-toast .swal2-styled{margin:.25em .5em;padding:.4em .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{animation:swal2-toast-hide .1s forwards}.swal2-container{display:grid;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;box-sizing:border-box;grid-template-areas:"top-start     top            top-end" "center-start  center         center-end" "bottom-start  bottom-center  bottom-end";grid-template-rows:minmax(min-content,auto) minmax(min-content,auto) minmax(min-content,auto);height:100%;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show,.swal2-container.swal2-noanimation{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-bottom-start,.swal2-container.swal2-center-start,.swal2-container.swal2-top-start{grid-template-columns:minmax(0,1fr) auto auto}.swal2-container.swal2-bottom,.swal2-container.swal2-center,.swal2-container.swal2-top{grid-template-columns:auto minmax(0,1fr) auto}.swal2-container.swal2-bottom-end,.swal2-container.swal2-center-end,.swal2-container.swal2-top-end{grid-template-columns:auto auto minmax(0,1fr)}.swal2-container.swal2-top-start>.swal2-popup{align-self:start}.swal2-container.swal2-top>.swal2-popup{grid-column:2;align-self:start;justify-self:center}.swal2-container.swal2-top-end>.swal2-popup,.swal2-container.swal2-top-right>.swal2-popup{grid-column:3;align-self:start;justify-self:end}.swal2-container.swal2-center-left>.swal2-popup,.swal2-container.swal2-center-start>.swal2-popup{grid-row:2;align-self:center}.swal2-container.swal2-center>.swal2-popup{grid-column:2;grid-row:2;align-self:center;justify-self:center}.swal2-container.swal2-center-end>.swal2-popup,.swal2-container.swal2-center-right>.swal2-popup{grid-column:3;grid-row:2;align-self:center;justify-self:end}.swal2-container.swal2-bottom-left>.swal2-popup,.swal2-container.swal2-bottom-start>.swal2-popup{grid-column:1;grid-row:3;align-self:end}.swal2-container.swal2-bottom>.swal2-popup{grid-column:2;grid-row:3;justify-self:center;align-self:end}.swal2-container.swal2-bottom-end>.swal2-popup,.swal2-container.swal2-bottom-right>.swal2-popup{grid-column:3;grid-row:3;align-self:end;justify-self:end}.swal2-container.swal2-grow-fullscreen>.swal2-popup,.swal2-container.swal2-grow-row>.swal2-popup{grid-column:1/4;width:100%}.swal2-container.swal2-grow-column>.swal2-popup,.swal2-container.swal2-grow-fullscreen>.swal2-popup{grid-row:1/4;align-self:stretch}.swal2-container.swal2-no-transition{transition:none!important}.swal2-popup{display:none;position:relative;box-sizing:border-box;grid-template-columns:minmax(0,100%);width:32em;max-width:100%;padding:0 0 1.25em;border:none;border-radius:5px;background:#fff;color:#545454;font-family:inherit;font-size:7px}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-title{position:relative;max-width:100%;margin:0;padding:.8em 1em 0;color:inherit;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;box-sizing:border-box;flex-wrap:wrap;align-items:center;justify-content:center;width:auto;margin:1.25em auto 0;padding:0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-loader{display:none;align-items:center;justify-content:center;width:2.2em;height:2.2em;margin:0 1.875em;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border-width:.25em;border-style:solid;border-radius:100%;border-color:#2778c4 transparent #2778c4 transparent}.swal2-styled{margin:.3125em;padding:.625em 1.1em;transition:box-shadow .1s;box-shadow:0 0 0 3px transparent;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#7066e0;color:#fff;font-size:1em}.swal2-styled.swal2-confirm:focus{box-shadow:0 0 0 3px rgba(112,102,224,.5)}.swal2-styled.swal2-deny{border:0;border-radius:.25em;background:initial;background-color:#dc3741;color:#fff;font-size:1em}.swal2-styled.swal2-deny:focus{box-shadow:0 0 0 3px rgba(220,55,65,.5)}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#6e7881;color:#fff;font-size:1em}.swal2-styled.swal2-cancel:focus{box-shadow:0 0 0 3px rgba(110,120,129,.5)}.swal2-styled.swal2-default-outline:focus{box-shadow:0 0 0 3px rgba(100,150,200,.5)}.swal2-styled:focus{outline:0}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1em 0 0;padding:1em 1em 0;border-top:1px solid #eee;color:inherit;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;grid-column:auto!important;overflow:hidden;border-bottom-right-radius:5px;border-bottom-left-radius:5px}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:2em auto 1em}.swal2-close{z-index:2;align-items:center;justify-content:center;width:1.2em;height:1.2em;margin-top:0;margin-right:0;margin-bottom:-1.2em;padding:0;overflow:hidden;transition:color .1s,box-shadow .1s;border:none;border-radius:5px;background:0 0;color:#ccc;font-family:serif;font-family:monospace;font-size:2.5em;cursor:pointer;justify-self:end}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close:focus{outline:0;box-shadow:inset 0 0 0 3px rgba(100,150,200,.5)}.swal2-close::-moz-focus-inner{border:0}.swal2-html-container{z-index:1;justify-content:center;margin:1em 1.6em .3em;padding:0;overflow:auto;color:inherit;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word;word-break:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em 2em 3px}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:auto;transition:border-color .1s,box-shadow .1s;border:1px solid #d9d9d9;border-radius:.1875em;background:0 0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px transparent;color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:inset 0 1px 1px rgba(0,0,0,.06),0 0 0 3px rgba(100,150,200,.5)}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em 2em 3px;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-file{width:75%;margin-right:auto;margin-left:auto;background:0 0;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:0 0;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{flex-shrink:0;margin:0 .4em}.swal2-input-label{display:flex;justify-content:center;margin:1em auto 0}.swal2-validation-message{align-items:center;justify-content:center;margin:1em 0 0;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:"!";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:2.5em auto .6em;border:.25em solid transparent;border-radius:50%;border-color:#000;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-warning.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-warning.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .5s}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-info.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-info.swal2-icon-show .swal2-icon-content{animation:swal2-animate-i-mark .8s}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-question.swal2-icon-show{animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-question.swal2-icon-show .swal2-icon-content{animation:swal2-animate-question-mark .8s}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{flex-wrap:wrap;align-items:center;max-width:100%;margin:1.25em auto;padding:0;background:0 0;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;flex-shrink:0;width:2em;height:2em;border-radius:2em;background:#2778c4;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#2778c4}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;flex-shrink:0;width:2.5em;height:.4em;margin:0 -1px;background:#2778c4}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{animation:swal2-show .3s}.swal2-hide{animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{margin-right:initial;margin-left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}.save-yourself-from-war{display:flex;position:fixed;z-index:1939;top:0;right:0;bottom:0;left:0;flex-direction:column;align-items:center;justify-content:center;padding:25px 0 20px;background:#20232a;color:#fff;text-align:center}.save-yourself-from-war div{max-width:560px;margin:10px;line-height:146%}.save-yourself-from-war iframe{max-width:100%;max-height:55.5555555556vmin;margin:16px auto}.save-yourself-from-war strong{border-bottom:2px dashed #fff}.save-yourself-from-war button{display:flex;position:fixed;z-index:1940;top:0;right:0;align-items:center;justify-content:center;width:48px;height:48px;margin-right:10px;margin-bottom:-10px;border:none;background:0 0;color:#aaa;font-size:48px;font-weight:700;cursor:pointer}.save-yourself-from-war button:hover{color:#fff}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-animate-question-mark{0%{transform:rotateY(-360deg)}100%{transform:rotateY(0)}}@keyframes swal2-animate-i-mark{0%{transform:rotateZ(45deg);opacity:0}25%{transform:rotateZ(-25deg);opacity:.4}50%{transform:rotateZ(15deg);opacity:.8}75%{transform:rotateZ(-5deg);opacity:1}100%{transform:rotateX(0);opacity:1}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{background-color:transparent!important;pointer-events:none}body.swal2-no-backdrop .swal2-container .swal2-popup{pointer-events:all}body.swal2-no-backdrop .swal2-container .swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{box-sizing:border-box;width:360px;max-width:100%;background-color:transparent;pointer-events:none}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}'
  )
