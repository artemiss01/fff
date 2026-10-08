/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var e = {
    496(e, t, s) {
      var i, n;
      (window.Element &&
        !Element.prototype.closest &&
        (Element.prototype.closest = function (e) {
          var t,
            s = (this.document || this.ownerDocument).querySelectorAll(e),
            i = this;
          do {
            for (t = s.length; 0 <= --t && s.item(t) !== i;);
          } while (t < 0 && (i = i.parentElement));
          return i;
        }),
        (function () {
          function e(e, t) {
            t = t || { bubbles: !1, cancelable: !1, detail: void 0 };
            var s = document.createEvent("CustomEvent");
            return (s.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), s);
          }
          "function" != typeof window.CustomEvent &&
            ((e.prototype = window.Event.prototype), (window.CustomEvent = e));
        })(),
        (function () {
          for (
            var e = 0, t = ["ms", "moz", "webkit", "o"], s = 0;
            s < t.length && !window.requestAnimationFrame;
            ++s
          )
            ((window.requestAnimationFrame =
              window[t[s] + "RequestAnimationFrame"]),
              (window.cancelAnimationFrame =
                window[t[s] + "CancelAnimationFrame"] ||
                window[t[s] + "CancelRequestAnimationFrame"]));
          (window.requestAnimationFrame ||
            (window.requestAnimationFrame = function (t, s) {
              var i = new Date().getTime(),
                n = Math.max(0, 16 - (i - e)),
                a = window.setTimeout(function () {
                  t(i + n);
                }, n);
              return ((e = i + n), a);
            }),
            window.cancelAnimationFrame ||
              (window.cancelAnimationFrame = function (e) {
                clearTimeout(e);
              }));
        })(),
        (n =
          void 0 !== s.g ? s.g : "undefined" != typeof window ? window : this),
        (i = function () {
          return (function (e) {
            "use strict";
            var t = {
                ignore: "[data-scroll-ignore]",
                header: null,
                topOnEmptyHash: !0,
                speed: 500,
                speedAsDuration: !1,
                durationMax: null,
                durationMin: null,
                clip: !0,
                offset: 0,
                easing: "easeInOutCubic",
                customEasing: null,
                updateURL: !0,
                popstate: !0,
                emitEvents: !0,
              },
              s = function () {
                var e = {};
                return (
                  Array.prototype.forEach.call(arguments, function (t) {
                    for (var s in t) {
                      if (!t.hasOwnProperty(s)) return;
                      e[s] = t[s];
                    }
                  }),
                  e
                );
              },
              i = function (e) {
                "#" === e.charAt(0) && (e = e.substr(1));
                for (
                  var t,
                    s = String(e),
                    i = s.length,
                    n = -1,
                    a = "",
                    r = s.charCodeAt(0);
                  ++n < i;
                ) {
                  if (0 === (t = s.charCodeAt(n)))
                    throw new InvalidCharacterError(
                      "Invalid character: the input contains U+0000.",
                    );
                  a +=
                    (1 <= t && t <= 31) ||
                    127 == t ||
                    (0 === n && 48 <= t && t <= 57) ||
                    (1 === n && 48 <= t && t <= 57 && 45 === r)
                      ? "\\" + t.toString(16) + " "
                      : 128 <= t ||
                          45 === t ||
                          95 === t ||
                          (48 <= t && t <= 57) ||
                          (65 <= t && t <= 90) ||
                          (97 <= t && t <= 122)
                        ? s.charAt(n)
                        : "\\" + s.charAt(n);
                }
                return "#" + a;
              },
              n = function () {
                return Math.max(
                  document.body.scrollHeight,
                  document.documentElement.scrollHeight,
                  document.body.offsetHeight,
                  document.documentElement.offsetHeight,
                  document.body.clientHeight,
                  document.documentElement.clientHeight,
                );
              },
              a = function (t) {
                return t
                  ? ((s = t),
                    parseInt(e.getComputedStyle(s).height, 10) + t.offsetTop)
                  : 0;
                var s;
              },
              r = function (t, s, i) {
                (0 === t && document.body.focus(),
                  i ||
                    (t.focus(),
                    document.activeElement !== t &&
                      (t.setAttribute("tabindex", "-1"),
                      t.focus(),
                      (t.style.outline = "none")),
                    e.scrollTo(0, s)));
              },
              l = function (t, s, i, n) {
                if (s.emitEvents && "function" == typeof e.CustomEvent) {
                  var a = new CustomEvent(t, {
                    bubbles: !0,
                    detail: { anchor: i, toggle: n },
                  });
                  document.dispatchEvent(a);
                }
              };
            return function (o, c) {
              var d,
                u,
                p,
                h,
                m = {
                  cancelScroll: function (e) {
                    (cancelAnimationFrame(h),
                      (h = null),
                      e || l("scrollCancel", d));
                  },
                  animateScroll: function (i, o, c) {
                    m.cancelScroll();
                    var u = s(d || t, c || {}),
                      f =
                        "[object Number]" === Object.prototype.toString.call(i),
                      g = f || !i.tagName ? null : i;
                    if (f || g) {
                      var v = e.pageYOffset;
                      u.header && !p && (p = document.querySelector(u.header));
                      var b,
                        y,
                        w,
                        S,
                        E,
                        x,
                        T,
                        C,
                        A = a(p),
                        L = f
                          ? i
                          : (function (t, s, i, a) {
                              var r = 0;
                              if (t.offsetParent)
                                for (
                                  ;
                                  (r += t.offsetTop), (t = t.offsetParent);
                                );
                              return (
                                (r = Math.max(r - s - i, 0)),
                                a && (r = Math.min(r, n() - e.innerHeight)),
                                r
                              );
                            })(
                              g,
                              A,
                              parseInt(
                                "function" == typeof u.offset
                                  ? u.offset(i, o)
                                  : u.offset,
                                10,
                              ),
                              u.clip,
                            ),
                        O = L - v,
                        _ = n(),
                        M = 0,
                        k =
                          ((b = O),
                          (w = (y = u).speedAsDuration
                            ? y.speed
                            : Math.abs((b / 1e3) * y.speed)),
                          y.durationMax && w > y.durationMax
                            ? y.durationMax
                            : y.durationMin && w < y.durationMin
                              ? y.durationMin
                              : parseInt(w, 10)),
                        P = function (t) {
                          var s, n, a;
                          (S || (S = t),
                            (M += t - S),
                            (x =
                              v +
                              O *
                                ((n = E =
                                  1 < (E = 0 === k ? 0 : M / k) ? 1 : E),
                                "easeInQuad" === (s = u).easing && (a = n * n),
                                "easeOutQuad" === s.easing && (a = n * (2 - n)),
                                "easeInOutQuad" === s.easing &&
                                  (a =
                                    n < 0.5 ? 2 * n * n : (4 - 2 * n) * n - 1),
                                "easeInCubic" === s.easing && (a = n * n * n),
                                "easeOutCubic" === s.easing &&
                                  (a = --n * n * n + 1),
                                "easeInOutCubic" === s.easing &&
                                  (a =
                                    n < 0.5
                                      ? 4 * n * n * n
                                      : (n - 1) * (2 * n - 2) * (2 * n - 2) +
                                        1),
                                "easeInQuart" === s.easing &&
                                  (a = n * n * n * n),
                                "easeOutQuart" === s.easing &&
                                  (a = 1 - --n * n * n * n),
                                "easeInOutQuart" === s.easing &&
                                  (a =
                                    n < 0.5
                                      ? 8 * n * n * n * n
                                      : 1 - 8 * --n * n * n * n),
                                "easeInQuint" === s.easing &&
                                  (a = n * n * n * n * n),
                                "easeOutQuint" === s.easing &&
                                  (a = 1 + --n * n * n * n * n),
                                "easeInOutQuint" === s.easing &&
                                  (a =
                                    n < 0.5
                                      ? 16 * n * n * n * n * n
                                      : 1 + 16 * --n * n * n * n * n),
                                s.customEasing && (a = s.customEasing(n)),
                                a || n)),
                            e.scrollTo(0, Math.floor(x)),
                            (function (t, s) {
                              var n = e.pageYOffset;
                              if (
                                t == s ||
                                n == s ||
                                (v < s && e.innerHeight + n) >= _
                              )
                                return (
                                  m.cancelScroll(!0),
                                  r(i, s, f),
                                  l("scrollStop", u, i, o),
                                  !(h = S = null)
                                );
                            })(x, L) ||
                              ((h = e.requestAnimationFrame(P)), (S = t)));
                        };
                      (0 === e.pageYOffset && e.scrollTo(0, 0),
                        (T = i),
                        (C = u),
                        f ||
                          (history.pushState &&
                            C.updateURL &&
                            history.pushState(
                              { smoothScroll: JSON.stringify(C), anchor: T.id },
                              document.title,
                              T === document.documentElement
                                ? "#top"
                                : "#" + T.id,
                            )),
                        "matchMedia" in e &&
                        e.matchMedia("(prefers-reduced-motion)").matches
                          ? r(i, Math.floor(L), !1)
                          : (l("scrollStart", u, i, o),
                            m.cancelScroll(!0),
                            e.requestAnimationFrame(P)));
                    }
                  },
                },
                f = function (t) {
                  if (
                    !t.defaultPrevented &&
                    !(0 !== t.button || t.metaKey || t.ctrlKey || t.shiftKey) &&
                    "closest" in t.target &&
                    (u = t.target.closest(o)) &&
                    "a" === u.tagName.toLowerCase() &&
                    !t.target.closest(d.ignore) &&
                    u.hostname === e.location.hostname &&
                    u.pathname === e.location.pathname &&
                    /#/.test(u.href)
                  ) {
                    var s, n;
                    try {
                      s = i(decodeURIComponent(u.hash));
                    } catch (t) {
                      s = i(u.hash);
                    }
                    if ("#" === s) {
                      if (!d.topOnEmptyHash) return;
                      n = document.documentElement;
                    } else n = document.querySelector(s);
                    (n = n || "#top" !== s ? n : document.documentElement) &&
                      (t.preventDefault(),
                      (function (t) {
                        if (
                          history.replaceState &&
                          t.updateURL &&
                          !history.state
                        ) {
                          var s = e.location.hash;
                          ((s = s || ""),
                            history.replaceState(
                              {
                                smoothScroll: JSON.stringify(t),
                                anchor: s || e.pageYOffset,
                              },
                              document.title,
                              s || e.location.href,
                            ));
                        }
                      })(d),
                      m.animateScroll(n, u));
                  }
                },
                g = function (e) {
                  if (
                    null !== history.state &&
                    history.state.smoothScroll &&
                    history.state.smoothScroll === JSON.stringify(d)
                  ) {
                    var t = history.state.anchor;
                    ("string" == typeof t &&
                      t &&
                      !(t = document.querySelector(i(history.state.anchor)))) ||
                      m.animateScroll(t, null, { updateURL: !1 });
                  }
                };
              return (
                (m.destroy = function () {
                  d &&
                    (document.removeEventListener("click", f, !1),
                    e.removeEventListener("popstate", g, !1),
                    m.cancelScroll(),
                    (h = p = u = d = null));
                }),
                (function () {
                  if (!(
                    "querySelector" in document &&
                    "addEventListener" in e &&
                    "requestAnimationFrame" in e &&
                    "closest" in e.Element.prototype
                  ))
                    throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                  (m.destroy(),
                    (d = s(t, c || {})),
                    (p = d.header ? document.querySelector(d.header) : null),
                    document.addEventListener("click", f, !1),
                    d.updateURL &&
                      d.popstate &&
                      e.addEventListener("popstate", g, !1));
                })(),
                m
              );
            };
          })(n);
        }.apply(t, [])),
        void 0 === i || (e.exports = i));
    },
    144(e) {
      e.exports = (function () {
        "use strict";
        const e = "undefined" != typeof window,
          t =
            (e && !("onscroll" in window)) ||
            ("undefined" != typeof navigator &&
              /(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent)),
          s = e && window.devicePixelRatio > 1,
          i = {
            elements_selector: ".lazy",
            container: t || e ? document : null,
            threshold: 300,
            thresholds: null,
            data_src: "src",
            data_srcset: "srcset",
            data_sizes: "sizes",
            data_bg: "bg",
            data_bg_hidpi: "bg-hidpi",
            data_bg_multi: "bg-multi",
            data_bg_multi_hidpi: "bg-multi-hidpi",
            data_bg_set: "bg-set",
            data_poster: "poster",
            class_applied: "applied",
            class_loading: "loading",
            class_loaded: "loaded",
            class_error: "error",
            class_entered: "entered",
            class_exited: "exited",
            unobserve_completed: !0,
            unobserve_entered: !1,
            cancel_on_exit: !0,
            callback_enter: null,
            callback_exit: null,
            callback_applied: null,
            callback_loading: null,
            callback_loaded: null,
            callback_error: null,
            callback_finish: null,
            callback_cancel: null,
            use_native: !1,
            restore_on_error: !1,
          },
          n = (e) => Object.assign({}, i, e),
          a = function (e, t) {
            let s;
            const i = "LazyLoad::Initialized",
              n = new e(t);
            try {
              s = new CustomEvent(i, { detail: { instance: n } });
            } catch (e) {
              ((s = document.createEvent("CustomEvent")),
                s.initCustomEvent(i, !1, !1, { instance: n }));
            }
            window.dispatchEvent(s);
          },
          r = "src",
          l = "srcset",
          o = "sizes",
          c = "poster",
          d = "llOriginalAttrs",
          u = "data",
          p = "loading",
          h = "loaded",
          m = "applied",
          f = "error",
          g = "native",
          v = "data-",
          b = "ll-status",
          y = (e, t) => e.getAttribute(v + t),
          w = (e) => y(e, b),
          S = (e, t) =>
            ((e, t, s) => {
              const i = v + t;
              null !== s ? e.setAttribute(i, s) : e.removeAttribute(i);
            })(e, b, t),
          E = (e) => S(e, null),
          x = (e) => null === w(e),
          T = (e) => w(e) === g,
          C = [p, h, m, f],
          A = (e, t, s, i) => {
            e &&
              "function" == typeof e &&
              (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i));
          },
          L = (t, s) => {
            e && "" !== s && t.classList.add(s);
          },
          O = (t, s) => {
            e && "" !== s && t.classList.remove(s);
          },
          _ = (e) => e.llTempImage,
          M = (e, t) => {
            if (!t) return;
            const s = t._observer;
            s && s.unobserve(e);
          },
          k = (e, t) => {
            e && (e.loadingCount += t);
          },
          P = (e, t) => {
            e && (e.toLoadCount = t);
          },
          I = (e) => {
            let t = [];
            for (let s, i = 0; (s = e.children[i]); i += 1)
              "SOURCE" === s.tagName && t.push(s);
            return t;
          },
          z = (e, t) => {
            const s = e.parentNode;
            s && "PICTURE" === s.tagName && I(s).forEach(t);
          },
          D = (e, t) => {
            I(e).forEach(t);
          },
          $ = [r],
          N = [r, c],
          q = [r, l, o],
          B = [u],
          V = (e) => !!e[d],
          H = (e) => e[d],
          G = (e) => delete e[d],
          W = (e, t) => {
            if (V(e)) return;
            const s = {};
            (t.forEach((t) => {
              s[t] = e.getAttribute(t);
            }),
              (e[d] = s));
          },
          R = (e, t) => {
            if (!V(e)) return;
            const s = H(e);
            t.forEach((t) => {
              ((e, t, s) => {
                s ? e.setAttribute(t, s) : e.removeAttribute(t);
              })(e, t, s[t]);
            });
          },
          F = (e, t, s) => {
            (L(e, t.class_applied),
              S(e, m),
              s &&
                (t.unobserve_completed && M(e, t),
                A(t.callback_applied, e, s)));
          },
          j = (e, t, s) => {
            (L(e, t.class_loading),
              S(e, p),
              s && (k(s, 1), A(t.callback_loading, e, s)));
          },
          Y = (e, t, s) => {
            s && e.setAttribute(t, s);
          },
          X = (e, t) => {
            (Y(e, o, y(e, t.data_sizes)),
              Y(e, l, y(e, t.data_srcset)),
              Y(e, r, y(e, t.data_src)));
          },
          U = {
            IMG: (e, t) => {
              (z(e, (e) => {
                (W(e, q), X(e, t));
              }),
                W(e, q),
                X(e, t));
            },
            IFRAME: (e, t) => {
              (W(e, $), Y(e, r, y(e, t.data_src)));
            },
            VIDEO: (e, t) => {
              (D(e, (e) => {
                (W(e, $), Y(e, r, y(e, t.data_src)));
              }),
                W(e, N),
                Y(e, c, y(e, t.data_poster)),
                Y(e, r, y(e, t.data_src)),
                e.load());
            },
            OBJECT: (e, t) => {
              (W(e, B), Y(e, u, y(e, t.data_src)));
            },
          },
          Q = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
          J = (e, t) => {
            !t ||
              ((e) => e.loadingCount > 0)(t) ||
              ((e) => e.toLoadCount > 0)(t) ||
              A(e.callback_finish, t);
          },
          Z = (e, t, s) => {
            (e.addEventListener(t, s), (e.llEvLisnrs[t] = s));
          },
          K = (e, t, s) => {
            e.removeEventListener(t, s);
          },
          ee = (e) => !!e.llEvLisnrs,
          te = (e) => {
            if (!ee(e)) return;
            const t = e.llEvLisnrs;
            for (let s in t) {
              const i = t[s];
              K(e, s, i);
            }
            delete e.llEvLisnrs;
          },
          se = (e, t, s) => {
            (((e) => {
              delete e.llTempImage;
            })(e),
              k(s, -1),
              ((e) => {
                e && (e.toLoadCount -= 1);
              })(s),
              O(e, t.class_loading),
              t.unobserve_completed && M(e, s));
          },
          ie = (e, t, s) => {
            const i = _(e) || e;
            ee(i) ||
              ((e, t, s) => {
                ee(e) || (e.llEvLisnrs = {});
                const i = "VIDEO" === e.tagName ? "loadeddata" : "load";
                (Z(e, i, t), Z(e, "error", s));
              })(
                i,
                (n) => {
                  (((e, t, s, i) => {
                    const n = T(t);
                    (se(t, s, i),
                      L(t, s.class_loaded),
                      S(t, h),
                      A(s.callback_loaded, t, i),
                      n || J(s, i));
                  })(0, e, t, s),
                    te(i));
                },
                (n) => {
                  (((e, t, s, i) => {
                    const n = T(t);
                    (se(t, s, i),
                      L(t, s.class_error),
                      S(t, f),
                      A(s.callback_error, t, i),
                      s.restore_on_error && R(t, q),
                      n || J(s, i));
                  })(0, e, t, s),
                    te(i));
                },
              );
          },
          ne = (e, t, i) => {
            ((e) => Q.indexOf(e.tagName) > -1)(e)
              ? ((e, t, s) => {
                  (ie(e, t, s),
                    ((e, t, s) => {
                      const i = U[e.tagName];
                      i && (i(e, t), j(e, t, s));
                    })(e, t, s));
                })(e, t, i)
              : ((e, t, i) => {
                  (((e) => {
                    e.llTempImage = document.createElement("IMG");
                  })(e),
                    ie(e, t, i),
                    ((e) => {
                      V(e) ||
                        (e[d] = { backgroundImage: e.style.backgroundImage });
                    })(e),
                    ((e, t, i) => {
                      const n = y(e, t.data_bg),
                        a = y(e, t.data_bg_hidpi),
                        l = s && a ? a : n;
                      l &&
                        ((e.style.backgroundImage = `url("${l}")`),
                        _(e).setAttribute(r, l),
                        j(e, t, i));
                    })(e, t, i),
                    ((e, t, i) => {
                      const n = y(e, t.data_bg_multi),
                        a = y(e, t.data_bg_multi_hidpi),
                        r = s && a ? a : n;
                      r && ((e.style.backgroundImage = r), F(e, t, i));
                    })(e, t, i),
                    ((e, t, s) => {
                      const i = y(e, t.data_bg_set);
                      if (!i) return;
                      let n = i.split("|").map((e) => `image-set(${e})`);
                      ((e.style.backgroundImage = n.join()), F(e, t, s));
                    })(e, t, i));
                })(e, t, i);
          },
          ae = (e) => {
            (e.removeAttribute(r), e.removeAttribute(l), e.removeAttribute(o));
          },
          re = (e) => {
            (z(e, (e) => {
              R(e, q);
            }),
              R(e, q));
          },
          le = {
            IMG: re,
            IFRAME: (e) => {
              R(e, $);
            },
            VIDEO: (e) => {
              (D(e, (e) => {
                R(e, $);
              }),
                R(e, N),
                e.load());
            },
            OBJECT: (e) => {
              R(e, B);
            },
          },
          oe = (e, t) => {
            (((e) => {
              const t = le[e.tagName];
              t
                ? t(e)
                : ((e) => {
                    if (!V(e)) return;
                    const t = H(e);
                    e.style.backgroundImage = t.backgroundImage;
                  })(e);
            })(e),
              ((e, t) => {
                x(e) ||
                  T(e) ||
                  (O(e, t.class_entered),
                  O(e, t.class_exited),
                  O(e, t.class_applied),
                  O(e, t.class_loading),
                  O(e, t.class_loaded),
                  O(e, t.class_error));
              })(e, t),
              E(e),
              G(e));
          },
          ce = ["IMG", "IFRAME", "VIDEO"],
          de = (e) => e.use_native && "loading" in HTMLImageElement.prototype,
          ue = (e, t, s) => {
            e.forEach((e) =>
              ((e) => e.isIntersecting || e.intersectionRatio > 0)(e)
                ? ((e, t, s, i) => {
                    const n = ((e) => C.indexOf(w(e)) >= 0)(e);
                    (S(e, "entered"),
                      L(e, s.class_entered),
                      O(e, s.class_exited),
                      ((e, t, s) => {
                        t.unobserve_entered && M(e, s);
                      })(e, s, i),
                      A(s.callback_enter, e, t, i),
                      n || ne(e, s, i));
                  })(e.target, e, t, s)
                : ((e, t, s, i) => {
                    x(e) ||
                      (L(e, s.class_exited),
                      ((e, t, s, i) => {
                        s.cancel_on_exit &&
                          ((e) => w(e) === p)(e) &&
                          "IMG" === e.tagName &&
                          (te(e),
                          ((e) => {
                            (z(e, (e) => {
                              ae(e);
                            }),
                              ae(e));
                          })(e),
                          re(e),
                          O(e, s.class_loading),
                          k(i, -1),
                          E(e),
                          A(s.callback_cancel, e, t, i));
                      })(e, t, s, i),
                      A(s.callback_exit, e, t, i));
                  })(e.target, e, t, s),
            );
          },
          pe = (e) => Array.prototype.slice.call(e),
          he = (e) => e.container.querySelectorAll(e.elements_selector),
          me = (e) => ((e) => w(e) === f)(e),
          fe = (e, t) => ((e) => pe(e).filter(x))(e || he(t)),
          ge = function (t, s) {
            const i = n(t);
            ((this._settings = i),
              (this.loadingCount = 0),
              ((e, t) => {
                de(e) ||
                  (t._observer = new IntersectionObserver(
                    (s) => {
                      ue(s, e, t);
                    },
                    ((e) => ({
                      root: e.container === document ? null : e.container,
                      rootMargin: e.thresholds || e.threshold + "px",
                    }))(e),
                  ));
              })(i, this),
              ((t, s) => {
                e &&
                  ((s._onlineHandler = () => {
                    ((e, t) => {
                      var s;
                      (((s = he(e)), pe(s).filter(me)).forEach((t) => {
                        (O(t, e.class_error), E(t));
                      }),
                        t.update());
                    })(t, s);
                  }),
                  window.addEventListener("online", s._onlineHandler));
              })(i, this),
              this.update(s));
          };
        return (
          (ge.prototype = {
            update: function (e) {
              const s = this._settings,
                i = fe(e, s);
              var n, a;
              (P(this, i.length),
                t
                  ? this.loadAll(i)
                  : de(s)
                    ? ((e, t, s) => {
                        (e.forEach((e) => {
                          -1 !== ce.indexOf(e.tagName) &&
                            ((e, t, s) => {
                              (e.setAttribute("loading", "lazy"),
                                ie(e, t, s),
                                ((e, t) => {
                                  const s = U[e.tagName];
                                  s && s(e, t);
                                })(e, t),
                                S(e, g));
                            })(e, t, s);
                        }),
                          P(s, 0));
                      })(i, s, this)
                    : ((a = i),
                      ((e) => {
                        e.disconnect();
                      })((n = this._observer)),
                      ((e, t) => {
                        t.forEach((t) => {
                          e.observe(t);
                        });
                      })(n, a)));
            },
            destroy: function () {
              (this._observer && this._observer.disconnect(),
                e && window.removeEventListener("online", this._onlineHandler),
                he(this._settings).forEach((e) => {
                  G(e);
                }),
                delete this._observer,
                delete this._settings,
                delete this._onlineHandler,
                delete this.loadingCount,
                delete this.toLoadCount);
            },
            loadAll: function (e) {
              const t = this._settings;
              fe(e, t).forEach((e) => {
                (M(e, this), ne(e, t, this));
              });
            },
            restoreAll: function () {
              const e = this._settings;
              he(e).forEach((t) => {
                oe(t, e);
              });
            },
          }),
          (ge.load = (e, t) => {
            const s = n(t);
            ne(e, s);
          }),
          (ge.resetStatus = (e) => {
            E(e);
          }),
          e &&
            ((e, t) => {
              if (t)
                if (t.length) for (let s, i = 0; (s = t[i]); i += 1) a(e, s);
                else a(e, t);
            })(ge, window.lazyLoadOptions),
          ge
        );
      })();
    },
  };
  const t = {};
  function s(i) {
    const n = t[i];
    if (void 0 !== n) return n.exports;
    const a = (t[i] = { exports: {} });
    return (e[i].call(a.exports, a, a.exports, s), a.exports);
  }
  ((s.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (e) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      function e(e) {
        this.type = e;
      }
      ((e.prototype.init = function () {
        const e = this;
        ((this.оbjects = []),
          (this.daClassname = "_dynamic_adapt_"),
          (this.nodes = document.querySelectorAll("[data-da]")));
        for (let e = 0; e < this.nodes.length; e++) {
          const t = this.nodes[e],
            s = t.dataset.da.trim().split(","),
            i = {};
          ((i.element = t),
            (i.parent = t.parentNode),
            (i.destination = document.querySelector(s[0].trim())),
            (i.breakpoint = s[1] ? s[1].trim() : "767"),
            (i.place = s[2] ? s[2].trim() : "last"),
            (i.index = this.indexInParent(i.parent, i.element)),
            this.оbjects.push(i));
        }
        (this.arraySort(this.оbjects),
          (this.mediaQueries = Array.prototype.map.call(
            this.оbjects,
            function (e) {
              return (
                "(" +
                this.type +
                "-width: " +
                e.breakpoint +
                "px)," +
                e.breakpoint
              );
            },
            this,
          )),
          (this.mediaQueries = Array.prototype.filter.call(
            this.mediaQueries,
            function (e, t, s) {
              return Array.prototype.indexOf.call(s, e) === t;
            },
          )));
        for (let t = 0; t < this.mediaQueries.length; t++) {
          const s = this.mediaQueries[t],
            i = String.prototype.split.call(s, ","),
            n = window.matchMedia(i[0]),
            a = i[1],
            r = Array.prototype.filter.call(this.оbjects, function (e) {
              return e.breakpoint === a;
            });
          (n.addListener(function () {
            e.mediaHandler(n, r);
          }),
            this.mediaHandler(n, r));
        }
      }),
        (e.prototype.mediaHandler = function (e, t) {
          if (e.matches)
            for (let e = 0; e < t.length; e++) {
              const s = t[e];
              ((s.index = this.indexInParent(s.parent, s.element)),
                this.moveTo(s.place, s.element, s.destination));
            }
          else
            for (let e = t.length - 1; e >= 0; e--) {
              const s = t[e];
              s.element.classList.contains(this.daClassname) &&
                this.moveBack(s.parent, s.element, s.index);
            }
        }),
        (e.prototype.moveTo = function (e, t, s) {
          (t.classList.add(this.daClassname),
            "last" === e || e >= s.children.length
              ? s.insertAdjacentElement("beforeend", t)
              : "first" !== e
                ? s.children[e].insertAdjacentElement("beforebegin", t)
                : s.insertAdjacentElement("afterbegin", t));
        }),
        (e.prototype.moveBack = function (e, t, s) {
          (t.classList.remove(this.daClassname),
            void 0 !== e.children[s]
              ? e.children[s].insertAdjacentElement("beforebegin", t)
              : e.insertAdjacentElement("beforeend", t));
        }),
        (e.prototype.indexInParent = function (e, t) {
          const s = Array.prototype.slice.call(e.children);
          return Array.prototype.indexOf.call(s, t);
        }),
        (e.prototype.arraySort = function (e) {
          "min" === this.type
            ? Array.prototype.sort.call(e, function (e, t) {
                return e.breakpoint === t.breakpoint
                  ? e.place === t.place
                    ? 0
                    : "first" === e.place || "last" === t.place
                      ? -1
                      : "last" === e.place || "first" === t.place
                        ? 1
                        : e.place - t.place
                  : e.breakpoint - t.breakpoint;
              })
            : Array.prototype.sort.call(e, function (e, t) {
                return e.breakpoint === t.breakpoint
                  ? e.place === t.place
                    ? 0
                    : "first" === e.place || "last" === t.place
                      ? 1
                      : "last" === e.place || "first" === t.place
                        ? -1
                        : t.place - e.place
                  : t.breakpoint - e.breakpoint;
              });
        }));
      new e("max").init();
      class t {
        constructor(e) {
          let t = {
            logging: !0,
            init: !0,
            attributeOpenButton: "data-popup",
            attributeCloseButton: "data-close",
            fixElementSelector: "[data-lp]",
            youtubeAttribute: "data-youtube",
            youtubePlaceAttribute: "data-youtube-place",
            setAutoplayYoutube: !0,
            classes: {
              popup: "popup",
              popupContent: "popup__content",
              popupActive: "popup_show",
              bodyActive: "popup-show",
            },
            focusCatch: !0,
            closeEsc: !0,
            bodyLock: !0,
            bodyLockDelay: 500,
            hashSettings: { location: !0, goHash: !0 },
            on: {
              beforeOpen: function () {},
              afterOpen: function () {},
              beforeClose: function () {},
              afterClose: function () {},
            },
          };
          ((this.isOpen = !1),
            (this.targetOpen = { selector: !1, element: !1 }),
            (this.previousOpen = { selector: !1, element: !1 }),
            (this.lastClosed = { selector: !1, element: !1 }),
            (this._dataValue = !1),
            (this.hash = !1),
            (this._reopen = !1),
            (this._selectorOpen = !1),
            (this.lastFocusEl = !1),
            (this._focusEl = [
              "a[href]",
              'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
              "button:not([disabled]):not([aria-hidden])",
              "select:not([disabled]):not([aria-hidden])",
              "textarea:not([disabled]):not([aria-hidden])",
              "area[href]",
              "iframe",
              "object",
              "embed",
              "[contenteditable]",
              '[tabindex]:not([tabindex^="-"])',
            ]),
            (this.options = {
              ...t,
              ...e,
              classes: { ...t.classes, ...e?.classes },
              hashSettings: { ...t.hashSettings, ...e?.hashSettings },
              on: { ...t.on, ...e?.on },
            }),
            this.options.init && this.initPopups());
        }
        initPopups() {
          (this.popupLogging("Проснулся"), this.eventsPopup());
        }
        eventsPopup() {
          (document.addEventListener(
            "click",
            function (e) {
              const t = e.target.closest(
                `[${this.options.attributeOpenButton}]`,
              );
              if (t)
                return (
                  e.preventDefault(),
                  (this._dataValue = t.getAttribute(
                    this.options.attributeOpenButton,
                  )
                    ? t.getAttribute(this.options.attributeOpenButton)
                    : "error"),
                  "error" !== this._dataValue
                    ? (this.isOpen || (this.lastFocusEl = t),
                      (this.targetOpen.selector = `${this._dataValue}`),
                      (this._selectorOpen = !0),
                      void this.open())
                    : void this.popupLogging(
                        `Ой ой, не заполнен атрибут у ${t.classList}`,
                      )
                );
              return e.target.closest(
                `[${this.options.attributeCloseButton}]`,
              ) ||
                (!e.target.closest(`.${this.options.classes.popupContent}`) &&
                  this.isOpen)
                ? (e.preventDefault(), void this.close())
                : void 0;
            }.bind(this),
          ),
            document.addEventListener(
              "keydown",
              function (e) {
                if (
                  this.options.closeEsc &&
                  27 == e.which &&
                  "Escape" === e.code &&
                  this.isOpen
                )
                  return (e.preventDefault(), void this.close());
                this.options.focusCatch &&
                  9 == e.which &&
                  this.isOpen &&
                  this._focusCatch(e);
              }.bind(this),
            ),
            document.querySelector("form[data-ajax],form[data-dev]") &&
              document.addEventListener(
                "formSent",
                function (e) {
                  const t = e.detail.form.dataset.popupMessage;
                  t && this.open(t);
                }.bind(this),
              ),
            this.options.hashSettings.goHash &&
              (window.addEventListener(
                "hashchange",
                function () {
                  window.location.hash
                    ? this._openToHash()
                    : this.close(this.targetOpen.selector);
                }.bind(this),
              ),
              window.addEventListener(
                "load",
                function () {
                  window.location.hash && this._openToHash();
                }.bind(this),
              )));
        }
        open(e) {
          if (
            (e &&
              "string" == typeof e &&
              "" !== e.trim() &&
              ((this.targetOpen.selector = e), (this._selectorOpen = !0)),
            this.isOpen && ((this._reopen = !0), this.close()),
            this._selectorOpen ||
              (this.targetOpen.selector = this.lastClosed.selector),
            this._reopen ||
              (this.previousActiveElement = document.activeElement),
            (this.targetOpen.element = document.querySelector(
              this.targetOpen.selector,
            )),
            this.targetOpen.element)
          ) {
            if (
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute,
              )
            ) {
              const e = `https://www.youtube.com/embed/${this.targetOpen.element.getAttribute(this.options.youtubeAttribute)}?rel=0&showinfo=0&autoplay=1`,
                t = document.createElement("iframe");
              t.setAttribute("allowfullscreen", "");
              const s = this.options.setAutoplayYoutube ? "autoplay;" : "";
              (t.setAttribute("allow", `${s}; encrypted-media`),
                t.setAttribute("src", e),
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`,
                ) &&
                  this.targetOpen.element
                    .querySelector(`[${this.options.youtubePlaceAttribute}]`)
                    .appendChild(t));
            }
            (this.options.hashSettings.location &&
              (this._getHash(), this._setHash()),
              this.options.on.beforeOpen(this),
              this.targetOpen.element.classList.add(
                this.options.classes.popupActive,
              ),
              document.body.classList.add(this.options.classes.bodyActive),
              this._reopen ? (this._reopen = !1) : o(),
              this.targetOpen.element.setAttribute("aria-hidden", "false"),
              (this.previousOpen.selector = this.targetOpen.selector),
              (this.previousOpen.element = this.targetOpen.element),
              (this._selectorOpen = !1),
              (this.isOpen = !0),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              document.dispatchEvent(
                new CustomEvent("afterPopupOpen", { detail: { popup: this } }),
              ),
              this.popupLogging("Открыл попап"));
          } else
            this.popupLogging(
              "Ой ой, такого попапа нет. Проверьте корректность ввода. ",
            );
        }
        close(e) {
          (e &&
            "string" == typeof e &&
            "" !== e.trim() &&
            (this.previousOpen.selector = e),
            this.isOpen &&
              l &&
              (this.options.on.beforeClose(this),
              this.targetOpen.element.hasAttribute(
                this.options.youtubeAttribute,
              ) &&
                this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`,
                ) &&
                (this.targetOpen.element.querySelector(
                  `[${this.options.youtubePlaceAttribute}]`,
                ).innerHTML = ""),
              this.previousOpen.element.classList.remove(
                this.options.classes.popupActive,
              ),
              this.previousOpen.element.setAttribute("aria-hidden", "true"),
              this._reopen ||
                (document.body.classList.remove(
                  this.options.classes.bodyActive,
                ),
                o(),
                (this.isOpen = !1)),
              this._removeHash(),
              this._selectorOpen &&
                ((this.lastClosed.selector = this.previousOpen.selector),
                (this.lastClosed.element = this.previousOpen.element)),
              this.options.on.afterClose(this),
              setTimeout(() => {
                this._focusTrap();
              }, 50),
              this.popupLogging("Закрыл попап")));
        }
        _getHash() {
          this.options.hashSettings.location &&
            (this.hash = this.targetOpen.selector.includes("#")
              ? this.targetOpen.selector
              : this.targetOpen.selector.replace(".", "#"));
        }
        _openToHash() {
          let e = document.querySelector(
            `.${window.location.hash.replace("#", "")}`,
          )
            ? `.${window.location.hash.replace("#", "")}`
            : document.querySelector(`${window.location.hash}`)
              ? `${window.location.hash}`
              : null;
          document.querySelector(
            `[${this.options.attributeOpenButton}="${e}"]`,
          ) &&
            e &&
            this.open(e);
        }
        _setHash() {
          history.pushState("", "", this.hash);
        }
        _removeHash() {
          history.pushState("", "", window.location.href.split("#")[0]);
        }
        _focusCatch(e) {
          const t = this.targetOpen.element.querySelectorAll(this._focusEl),
            s = Array.prototype.slice.call(t),
            i = s.indexOf(document.activeElement);
          (e.shiftKey &&
            0 === i &&
            (s[s.length - 1].focus(), e.preventDefault()),
            e.shiftKey ||
              i !== s.length - 1 ||
              (s[0].focus(), e.preventDefault()));
        }
        _focusTrap() {
          const e = this.previousOpen.element.querySelectorAll(this._focusEl);
          !this.isOpen && this.lastFocusEl
            ? this.lastFocusEl.focus()
            : e[0].focus();
        }
        popupLogging(e) {
          this.options.logging && u(`[Попапос]: ${e}`);
        }
      }
      let i = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            i.Android() || i.BlackBerry() || i.iOS() || i.Opera() || i.Windows()
          );
        },
      };
      let n = (e, t = 500, s = 0) => {
          e.classList.contains("_slide") ||
            (e.classList.add("_slide"),
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = `${e.offsetHeight}px`),
            e.offsetHeight,
            (e.style.overflow = "hidden"),
            (e.style.height = s ? `${s}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            window.setTimeout(() => {
              ((e.hidden = !s),
                !s && e.style.removeProperty("height"),
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                !s && e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property"),
                e.classList.remove("_slide"));
            }, t));
        },
        a = (e, t = 500, s = 0) => {
          if (!e.classList.contains("_slide")) {
            (e.classList.add("_slide"),
              (e.hidden = !e.hidden && null),
              s && e.style.removeProperty("height"));
            let i = e.offsetHeight;
            ((e.style.overflow = "hidden"),
              (e.style.height = s ? `${s}px` : "0px"),
              (e.style.paddingTop = 0),
              (e.style.paddingBottom = 0),
              (e.style.marginTop = 0),
              (e.style.marginBottom = 0),
              e.offsetHeight,
              (e.style.transitionProperty = "height, margin, padding"),
              (e.style.transitionDuration = t + "ms"),
              (e.style.height = i + "px"),
              e.style.removeProperty("padding-top"),
              e.style.removeProperty("padding-bottom"),
              e.style.removeProperty("margin-top"),
              e.style.removeProperty("margin-bottom"),
              window.setTimeout(() => {
                (e.style.removeProperty("height"),
                  e.style.removeProperty("overflow"),
                  e.style.removeProperty("transition-duration"),
                  e.style.removeProperty("transition-property"),
                  e.classList.remove("_slide"));
              }, t));
          }
        },
        r = (e, t = 500) => (e.hidden ? a(e, t) : n(e, t)),
        l = !0,
        o = (e = 500) => {
          document.documentElement.classList.contains("lock") ? c(e) : d(e);
        },
        c = (e = 500) => {
          let t = document.querySelector("body");
          if (l) {
            let s = document.querySelectorAll("[data-lp]");
            (setTimeout(() => {
              for (let e = 0; e < s.length; e++) {
                s[e].style.paddingRight = "0px";
              }
              ((t.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock"));
            }, e),
              (l = !1),
              setTimeout(function () {
                l = !0;
              }, e));
          }
        },
        d = (e = 500) => {
          let t = document.querySelector("body");
          if (l) {
            let s = document.querySelectorAll("[data-lp]");
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            ((t.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (l = !1),
              setTimeout(function () {
                l = !0;
              }, e));
          }
        };
      function u(e) {
        setTimeout(() => {
          window.FLS && console.log(e);
        }, 0);
      }
      function p(e, t) {
        const s = Array.from(e).filter(function (e, s, i) {
          if (e.dataset[t]) return e.dataset[t].split(",")[0];
        });
        if (s.length) {
          const e = [];
          s.forEach((s) => {
            const i = {},
              n = s.dataset[t].split(",");
            ((i.value = n[0]),
              (i.type = n[1] ? n[1].trim() : "max"),
              (i.item = s),
              e.push(i));
          });
          let i = e.map(function (e) {
            return (
              "(" +
              e.type +
              "-width: " +
              e.value +
              "px)," +
              e.value +
              "," +
              e.type
            );
          });
          i = (function (e) {
            return e.filter(function (e, t, s) {
              return s.indexOf(e) === t;
            });
          })(i);
          const n = [];
          if (i.length)
            return (
              i.forEach((t) => {
                const s = t.split(","),
                  i = s[1],
                  a = s[2],
                  r = window.matchMedia(s[0]),
                  l = e.filter(function (e) {
                    if (e.value === i && e.type === a) return !0;
                  });
                n.push({ itemsArray: l, matchMedia: r });
              }),
              n
            );
        }
      }
      var h = s(496);
      let m = (e, t = !1, s = 500, i = 0) => {
        const n = document.querySelector(e);
        if (n) {
          let a = "",
            r = 0;
          t &&
            ((a = "header.header"),
            (r = document.querySelector(a).offsetHeight));
          let l = {
            speedAsDuration: !0,
            speed: s,
            header: a,
            offset: i,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (c(), document.documentElement.classList.remove("menu-open")),
            void 0 !== h)
          )
            new h().animateScroll(n, "", l);
          else {
            let e = n.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: r ? e - r : e, behavior: "smooth" });
          }
          u(`[gotoBlock]: Юхуу...едем к ${e}`);
        } else u(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
      };
      class f {
        constructor(e, t = null) {
          if (
            ((this.config = Object.assign({ init: !0, logging: !0 }, e)),
            (this.selectClasses = {
              classSelect: "select",
              classSelectBody: "select__body",
              classSelectTitle: "select__title",
              classSelectValue: "select__value",
              classSelectLabel: "select__label",
              classSelectInput: "select__input",
              classSelectText: "select__text",
              classSelectLink: "select__link",
              classSelectOptions: "select__options",
              classSelectOptionsScroll: "select__scroll",
              classSelectOption: "select__option",
              classSelectContent: "select__content",
              classSelectRow: "select__row",
              classSelectData: "select__asset",
              classSelectDisabled: "_select-disabled",
              classSelectTag: "_select-tag",
              classSelectOpen: "_select-open",
              classSelectActive: "_select-active",
              classSelectFocus: "_select-focus",
              classSelectMultiple: "_select-multiple",
              classSelectCheckBox: "_select-checkbox",
              classSelectOptionSelected: "_select-selected",
            }),
            (this._this = this),
            this.config.init)
          ) {
            const e = t
              ? document.querySelectorAll(t)
              : document.querySelectorAll("select");
            e.length
              ? (this.selectsInit(e),
                this.setLogging(`Проснулся, построил селектов: (${e.length})`))
              : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
          }
        }
        getSelectClass(e) {
          return `.${e}`;
        }
        getSelectElement(e, t) {
          return {
            originalSelect: e.querySelector("select"),
            selectElement: e.querySelector(this.getSelectClass(t)),
          };
        }
        selectsInit(e) {
          (e.forEach((e, t) => {
            this.selectInit(e, t + 1);
          }),
            document.addEventListener(
              "click",
              function (e) {
                this.selectsActions(e);
              }.bind(this),
            ),
            document.addEventListener(
              "keydown",
              function (e) {
                this.selectsActions(e);
              }.bind(this),
            ),
            document.addEventListener(
              "focusin",
              function (e) {
                this.selectsActions(e);
              }.bind(this),
            ),
            document.addEventListener(
              "focusout",
              function (e) {
                this.selectsActions(e);
              }.bind(this),
            ));
        }
        selectInit(e, t) {
          const s = this;
          let i = document.createElement("div");
          if (
            (i.classList.add(this.selectClasses.classSelect),
            e.parentNode.insertBefore(i, e),
            i.appendChild(e),
            (e.hidden = !0),
            t && (e.dataset.id = t),
            i.insertAdjacentHTML(
              "beforeend",
              `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`,
            ),
            this.selectBuild(e),
            this.getSelectPlaceholder(e) &&
              ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
              this.getSelectPlaceholder(e).label.show))
          ) {
            this.getSelectElement(
              i,
              this.selectClasses.classSelectTitle,
            ).selectElement.insertAdjacentHTML(
              "afterbegin",
              `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(e).label.text ? this.getSelectPlaceholder(e).label.text : this.getSelectPlaceholder(e).value}</span>`,
            );
          }
          ((e.dataset.speed = e.dataset.speed ? e.dataset.speed : "150"),
            e.addEventListener("change", function (e) {
              s.selectChange(e);
            }));
        }
        selectBuild(e) {
          const t = e.parentElement;
          ((t.dataset.id = e.dataset.id),
            t.classList.add(
              e.getAttribute("class")
                ? `select_${e.getAttribute("class")}`
                : "",
            ),
            e.multiple
              ? t.classList.add(this.selectClasses.classSelectMultiple)
              : t.classList.remove(this.selectClasses.classSelectMultiple),
            e.hasAttribute("data-checkbox") && e.multiple
              ? t.classList.add(this.selectClasses.classSelectCheckBox)
              : t.classList.remove(this.selectClasses.classSelectCheckBox),
            this.setSelectTitleValue(t, e),
            this.setOptions(t, e),
            e.hasAttribute("data-search") && this.searchActions(t),
            e.hasAttribute("data-open") && this.selectAction(t),
            this.selectDisabled(t, e));
        }
        selectsActions(e) {
          const t = e.target,
            s = e.type;
          if (
            t.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
            t.closest(this.getSelectClass(this.selectClasses.classSelectTag))
          ) {
            const i = t.closest(".select")
                ? t.closest(".select")
                : document.querySelector(
                    `.${this.selectClasses.classSelect}[data-id="${t.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`,
                  ),
              n = this.getSelectElement(i).originalSelect;
            if ("click" === s) {
              if (!n.disabled)
                if (
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag),
                  )
                ) {
                  const e = t.closest(
                      this.getSelectClass(this.selectClasses.classSelectTag),
                    ),
                    s = document.querySelector(
                      `.${this.selectClasses.classSelect}[data-id="${e.dataset.selectId}"] .select__option[data-value="${e.dataset.value}"]`,
                    );
                  this.optionAction(i, n, s);
                } else if (
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectTitle),
                  )
                )
                  this.selectAction(i);
                else if (
                  t.closest(
                    this.getSelectClass(this.selectClasses.classSelectOption),
                  )
                ) {
                  const e = t.closest(
                    this.getSelectClass(this.selectClasses.classSelectOption),
                  );
                  this.optionAction(i, n, e);
                }
            } else
              "focusin" === s || "focusout" === s
                ? t.closest(
                    this.getSelectClass(this.selectClasses.classSelect),
                  ) &&
                  ("focusin" === s
                    ? i.classList.add(this.selectClasses.classSelectFocus)
                    : i.classList.remove(this.selectClasses.classSelectFocus))
                : "keydown" === s && "Escape" === e.code && this.selectsСlose();
          } else this.selectsСlose();
        }
        selectsСlose() {
          const e = document.querySelectorAll(
            `${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`,
          );
          e.length &&
            e.forEach((e) => {
              this.selectAction(e);
            });
        }
        selectAction(e) {
          const t = this.getSelectElement(e).originalSelect,
            s = this.getSelectElement(
              e,
              this.selectClasses.classSelectOptions,
            ).selectElement;
          s.classList.contains("_slide") ||
            (e.classList.toggle(this.selectClasses.classSelectOpen),
            r(s, t.dataset.speed));
        }
        setSelectTitleValue(e, t) {
          const s = this.getSelectElement(
              e,
              this.selectClasses.classSelectBody,
            ).selectElement,
            i = this.getSelectElement(
              e,
              this.selectClasses.classSelectTitle,
            ).selectElement;
          (i && i.remove(),
            s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(e, t)));
        }
        getSelectTitleValue(e, t) {
          let s = this.getSelectedOptionsData(t, 2).html;
          if (
            (t.multiple &&
              t.hasAttribute("data-tags") &&
              ((s = this.getSelectedOptionsData(t)
                .elements.map(
                  (t) =>
                    `<span role="button" data-select-id="${e.dataset.id}" data-value="${t.value}" class="_select-tag">${this.getSelectElementContent(t)}</span>`,
                )
                .join("")),
              t.dataset.tags &&
                document.querySelector(t.dataset.tags) &&
                ((document.querySelector(t.dataset.tags).innerHTML = s),
                t.hasAttribute("data-search") && (s = !1))),
            (s = s.length ? s : t.dataset.placeholder),
            this.getSelectedOptionsData(t).values.length
              ? e.classList.add(this.selectClasses.classSelectActive)
              : e.classList.remove(this.selectClasses.classSelectActive),
            t.hasAttribute("data-search"))
          )
            return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
          {
            const e =
              this.getSelectedOptionsData(t).elements.length &&
              this.getSelectedOptionsData(t).elements[0].dataset.class
                ? ` ${this.getSelectedOptionsData(t).elements[0].dataset.class}`
                : "";
            return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${e}">${s}</span></span></button>`;
          }
        }
        getSelectElementContent(e) {
          const t = e.dataset.asset ? `${e.dataset.asset}` : "",
            s = t.indexOf("img") >= 0 ? `<img src="${t}" alt="">` : t;
          let i = "";
          return (
            (i += t
              ? `<span class="${this.selectClasses.classSelectRow}">`
              : ""),
            (i += t
              ? `<span class="${this.selectClasses.classSelectData}">`
              : ""),
            (i += t ? s : ""),
            (i += t ? "</span>" : ""),
            (i += t
              ? `<span class="${this.selectClasses.classSelectText}">`
              : ""),
            (i += e.textContent),
            (i += t ? "</span>" : ""),
            (i += t ? "</span>" : ""),
            i
          );
        }
        getSelectPlaceholder(e) {
          const t = Array.from(e.options).find((e) => !e.value);
          if (t)
            return {
              value: t.textContent,
              show: t.hasAttribute("data-show"),
              label: {
                show: t.hasAttribute("data-label"),
                text: t.dataset.label,
              },
            };
        }
        getSelectedOptionsData(e, t) {
          let s = [];
          return (
            e.multiple
              ? (s = Array.from(e.options)
                  .filter((e) => e.value)
                  .filter((e) => e.selected))
              : s.push(e.options[e.selectedIndex]),
            {
              elements: s.map((e) => e),
              values: s.filter((e) => e.value).map((e) => e.value),
              html: s.map((e) => this.getSelectElementContent(e)),
            }
          );
        }
        getOptions(e) {
          let t = e.hasAttribute("data-scroll") ? "data-simplebar" : "",
            s = e.dataset.scroll
              ? `style="max-height:${e.dataset.scroll}px"`
              : "",
            i = Array.from(e.options);
          if (i.length > 0) {
            let n = "";
            return (
              ((this.getSelectPlaceholder(e) &&
                !this.getSelectPlaceholder(e).show) ||
                e.multiple) &&
                (i = i.filter((e) => e.value)),
              (n += t
                ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
                : ""),
              i.forEach((t) => {
                n += this.getOption(t, e);
              }),
              (n += t ? "</div>" : ""),
              n
            );
          }
        }
        getOption(e, t) {
          const s =
              e.selected && t.multiple
                ? ` ${this.selectClasses.classSelectOptionSelected}`
                : "",
            i =
              e.selected && !t.hasAttribute("data-show-selected")
                ? "hidden"
                : "",
            n = e.dataset.class ? ` ${e.dataset.class}` : "",
            a = !!e.dataset.href && e.dataset.href,
            r = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
          let l = "";
          return (
            (l += a
              ? `<a ${r} ${i} href="${a}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
              : `<button ${i} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${e.value}" type="button">`),
            (l += this.getSelectElementContent(e)),
            (l += a ? "</a>" : "</button>"),
            l
          );
        }
        setOptions(e, t) {
          this.getSelectElement(
            e,
            this.selectClasses.classSelectOptions,
          ).selectElement.innerHTML = this.getOptions(t);
        }
        optionAction(e, t, s) {
          if (t.multiple) {
            s.classList.toggle(this.selectClasses.classSelectOptionSelected);
            this.getSelectedOptionsData(t).elements.forEach((e) => {
              e.removeAttribute("selected");
            });
            e.querySelectorAll(
              this.getSelectClass(this.selectClasses.classSelectOptionSelected),
            ).forEach((e) => {
              t.querySelector(
                `option[value="${e.dataset.value}"]`,
              ).setAttribute("selected", "selected");
            });
          } else
            (t.hasAttribute("data-show-selected") ||
              (e.querySelector(
                `${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`,
              ) &&
                (e.querySelector(
                  `${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`,
                ).hidden = !1),
              (s.hidden = !0)),
              (t.value = s.hasAttribute("data-value")
                ? s.dataset.value
                : s.textContent),
              this.selectAction(e));
          (this.setSelectTitleValue(e, t), this.setSelectChange(t));
        }
        selectChange(e) {
          const t = e.target;
          (this.selectBuild(t), this.setSelectChange(t));
        }
        setSelectChange(e) {
          if (
            (e.hasAttribute("data-validate") && w.validateInput(e),
            e.hasAttribute("data-submit") && e.value)
          ) {
            let t = document.createElement("button");
            ((t.type = "submit"),
              e.closest("form").append(t),
              t.click(),
              t.remove());
          }
          const t = e.parentElement;
          this.selectCallback(t, e);
        }
        selectDisabled(e, t) {
          t.disabled
            ? (e.classList.add(this.selectClasses.classSelectDisabled),
              (this.getSelectElement(
                e,
                this.selectClasses.classSelectTitle,
              ).selectElement.disabled = !0))
            : (e.classList.remove(this.selectClasses.classSelectDisabled),
              (this.getSelectElement(
                e,
                this.selectClasses.classSelectTitle,
              ).selectElement.disabled = !1));
        }
        searchActions(e) {
          this.getSelectElement(e).originalSelect;
          const t = this.getSelectElement(
              e,
              this.selectClasses.classSelectInput,
            ).selectElement,
            s = this.getSelectElement(
              e,
              this.selectClasses.classSelectOptions,
            ).selectElement,
            i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
            n = this;
          t.addEventListener("input", function () {
            (i.forEach((e) => {
              e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
                ? (e.hidden = !1)
                : (e.hidden = !0);
            }),
              !0 === s.hidden && n.selectAction(e));
          });
        }
        selectCallback(e, t) {
          document.dispatchEvent(
            new CustomEvent("selectCallback", { detail: { select: t } }),
          );
        }
        setLogging(e) {
          this.config.logging && u(`[select]: ${e}`);
        }
      }
      const g = { inputMaskModule: null, selectModule: null };
      let v,
        b,
        y,
        w = {
          getErrors(e) {
            let t = 0,
              s = e.querySelectorAll("*[data-required]");
            return (
              s.length &&
                s.forEach((e) => {
                  (null === e.offsetParent && "SELECT" !== e.tagName) ||
                    e.disabled ||
                    (t += this.validateInput(e));
                }),
              t
            );
          },
          validateInput(e) {
            let t = 0;
            return (
              "email" === e.dataset.required
                ? ((e.value = e.value.replace(" ", "")),
                  this.emailTest(e)
                    ? (this.addError(e), t++)
                    : this.removeError(e))
                : ("checkbox" !== e.type || e.checked) && e.value
                  ? this.removeError(e)
                  : (this.addError(e), t++),
              t
            );
          },
          addError(e) {
            (e.classList.add("_form-error"),
              e.parentElement.classList.add("_form-error"));
            let t = e.parentElement.querySelector(".form__error");
            (t && e.parentElement.removeChild(t),
              e.dataset.error &&
                e.parentElement.insertAdjacentHTML(
                  "beforeend",
                  `<div class="form__error">${e.dataset.error}</div>`,
                ));
          },
          removeError(e) {
            (e.classList.remove("_form-error"),
              e.parentElement.classList.remove("_form-error"),
              e.parentElement.querySelector(".form__error") &&
                e.parentElement.removeChild(
                  e.parentElement.querySelector(".form__error"),
                ));
          },
          formClean(e) {
            (e.reset(),
              setTimeout(() => {
                let t = e.querySelectorAll("input,textarea");
                for (let e = 0; e < t.length; e++) {
                  const s = t[e];
                  (s.parentElement.classList.remove("_form-focus"),
                    s.classList.remove("_form-focus"),
                    w.removeError(s),
                    (s.value = s.dataset.placeholder));
                }
                let s = e.querySelectorAll(".checkbox__input");
                if (s.length > 0)
                  for (let e = 0; e < s.length; e++) {
                    s[e].checked = !1;
                  }
                if (g.selectModule) {
                  let t = e.querySelectorAll(".select");
                  if (t.length)
                    for (let e = 0; e < t.length; e++) {
                      const s = t[e].querySelector("select");
                      g.selectModule.selectBuild(s);
                    }
                }
              }, 0));
          },
          emailTest: (e) =>
            !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
        };
      function S(e, t = 0) {
        return setTimeout(e, t);
      }
      function E() {
        return Date.now();
      }
      function x(e, t = "x") {
        const s = (function (e) {
            return window.getComputedStyle(e, null);
          })(e),
          i = s.transform || s.webkitTransform;
        if (!i || "none" === i) return 0;
        const n = new DOMMatrixReadOnly(i);
        return "x" === t ? n.m41 : n.m42;
      }
      function T(e) {
        return (
          "object" == typeof e &&
          null !== e &&
          !!e.constructor &&
          "Object" === Object.prototype.toString.call(e).slice(8, -1)
        );
      }
      function C(e) {
        return (
          ("undefined" != typeof HTMLElement && e instanceof HTMLElement) ||
          (!!e &&
            "object" == typeof e &&
            (1 === e.nodeType || 11 === e.nodeType))
        );
      }
      function A(e, ...t) {
        const s = Object(e);
        for (let e = 0; e < t.length; e += 1) {
          const i = t[e];
          if (null == i || C(i)) continue;
          const n = i,
            a = Object.keys(Object(n));
          for (let e = 0, t = a.length; e < t; e += 1) {
            const t = a[e];
            if ("__proto__" === t || "constructor" === t || "prototype" === t)
              continue;
            const i = Object.getOwnPropertyDescriptor(n, t);
            if (!i || !i.enumerable) continue;
            const r = n[t];
            T(s[t]) && T(r)
              ? r.__swiper__
                ? (s[t] = r)
                : A(s[t], r)
              : !T(s[t]) && T(r)
                ? ((s[t] = {}), r.__swiper__ ? (s[t] = r) : A(s[t], r))
                : (s[t] = r);
          }
        }
        return s;
      }
      function L(e, t, s) {
        e.style.setProperty(t, s);
      }
      function O(e) {
        const t = e.querySelector(".swiper-slide-transform");
        if (t) return t;
        if (e.shadowRoot) {
          const t = e.shadowRoot.querySelector(".swiper-slide-transform");
          if (t) return t;
        }
        return e;
      }
      function _(e, t = "") {
        const s = [...e.children];
        return (
          e instanceof HTMLSlotElement && s.push(...e.assignedElements()),
          t ? s.filter((e) => e.matches(t)) : s
        );
      }
      function M(e) {
        try {
          console.warn(e);
        } catch {}
      }
      function k(e, t = []) {
        const s = document.createElement(e);
        return (
          s.classList.add(
            ...(Array.isArray(t)
              ? t
              : (function (e = "") {
                  return e
                    .trim()
                    .split(" ")
                    .filter((e) => !!e.trim());
                })(t)),
          ),
          s
        );
      }
      function P(e, t) {
        return window.getComputedStyle(e, null).getPropertyValue(t);
      }
      function I(e) {
        if (e && e.parentNode) return [...e.parentNode.children].indexOf(e);
      }
      function z(e, t) {
        const s = [];
        let i = e.parentElement;
        for (; i;) ((t && !i.matches(t)) || s.push(i), (i = i.parentElement));
        return s;
      }
      function D(e, t, s) {
        {
          const s = window.getComputedStyle(e, null);
          return (
            e["width" === t ? "offsetWidth" : "offsetHeight"] +
            parseFloat(
              s.getPropertyValue("width" === t ? "margin-right" : "margin-top"),
            ) +
            parseFloat(
              s.getPropertyValue(
                "width" === t ? "margin-left" : "margin-bottom",
              ),
            )
          );
        }
      }
      function $(e) {
        return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
      }
      function N(e, t = "") {
        const s = globalThis.trustedTypes;
        e.innerHTML =
          void 0 !== s
            ? s.createPolicy("html", { createHTML: (e) => e }).createHTML(t)
            : t;
      }
      function q() {
        return (
          v ||
            (v =
              "undefined" == typeof window
                ? { touch: !1 }
                : {
                    touch:
                      "ontouchstart" in window || navigator.maxTouchPoints > 0,
                  }),
          v
        );
      }
      function B(e = {}) {
        return (
          b ||
            (b = (function ({ userAgent: e } = {}) {
              if ("undefined" == typeof window) return { ios: !1, android: !1 };
              const t = q(),
                s = navigator.platform,
                i = e || navigator.userAgent,
                n = { ios: !1, android: !1 },
                a = /(Android);?[\s/]+([\d.]+)?/.test(i),
                r = /(iPhone\sOS|iOS|iPod)/.test(i),
                l = /iPad/.test(i),
                o = "MacIntel" === s && t.touch && navigator.maxTouchPoints > 1,
                c = l || o;
              return (
                a && !("Win32" === s) && ((n.os = "android"), (n.android = !0)),
                (c || r) && ((n.os = "ios"), (n.ios = !0)),
                n
              );
            })(e)),
          b
        );
      }
      function V() {
        return (
          y ||
            (y = (function () {
              if ("undefined" == typeof window)
                return { isSafari: !1, isWebView: !1, need3dFix: !1 };
              const e = B(),
                t = navigator.userAgent,
                s = t.toLowerCase(),
                i =
                  s.includes("safari") &&
                  !s.includes("chrome") &&
                  !s.includes("android"),
                n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t);
              return {
                isSafari: i,
                isWebView: n,
                need3dFix: i || (n && e.ios),
              };
            })()),
          y
        );
      }
      const H = (e, t) => {
          if (!e || e.destroyed || !e.params || !e.params.lazyPreload) return;
          const s = t.closest(
            e.isElement ? "swiper-slide" : `.${e.params.slideClass}`,
          );
          if (s) {
            let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
            (!t &&
              e.isElement &&
              (s.shadowRoot
                ? (t = s.shadowRoot.querySelector(
                    `.${e.params.lazyPreloaderClass}`,
                  ))
                : requestAnimationFrame(() => {
                    if (s.shadowRoot) {
                      const t = s.shadowRoot.querySelector(
                        `.${e.params.lazyPreloaderClass}`,
                      );
                      t && !t.lazyPreloaderManaged && t.remove();
                    }
                  })),
              t && !t.lazyPreloaderManaged && t.remove());
          }
        },
        G = (e, t) => {
          if (!e.slides[t]) return;
          const s = e.slides[t].querySelector('[loading="lazy"]');
          s && s.removeAttribute("loading");
        },
        W = (e) => {
          if (!e || e.destroyed || !e.params || !e.params.lazyPreload) return;
          let t = e.params.lazyPreloadPrevNext;
          const s = e.slides.length;
          if (!s || !t || t < 0) return;
          t = Math.min(t, s);
          const i =
              "auto" === e.params.slidesPerView
                ? e.slidesPerViewDynamic()
                : Math.ceil(e.params.slidesPerView),
            n = e.activeIndex;
          if (e.params.grid && (e.params.grid.rows ?? 1) > 1) {
            const s = n,
              a = [s - t];
            return (
              a.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
              void e.slides.forEach((t, s) => {
                void 0 !== t.column && a.includes(t.column) && G(e, s);
              })
            );
          }
          const a = n + i - 1;
          if (e.params.rewind || e.params.loop)
            for (let i = n - t; i <= a + t; i += 1) {
              const t = ((i % s) + s) % s;
              (t < n || t > a) && G(e, t);
            }
          else
            for (
              let i = Math.max(n - t, 0);
              i <= Math.min(a + t, s - 1);
              i += 1
            )
              i !== n && (i > a || i < n) && G(e, i);
        };
      const R = (e, t) => !!(e.grid && t.grid && t.grid.rows > 1);
      var F = {
        setBreakpoint: function () {
          const e = this,
            { realIndex: t, initialized: s, params: i, el: n } = e,
            a = i.breakpoints;
          if (!a || (a && 0 === Object.keys(a).length)) return;
          const r =
              "window" !== i.breakpointsBase && i.breakpointsBase
                ? "container"
                : i.breakpointsBase,
            l =
              ["window", "container"].includes(i.breakpointsBase) ||
              !i.breakpointsBase
                ? e.el
                : document.querySelector(i.breakpointsBase),
            o = e.getBreakpoint(a, r, l);
          if (!o || e.currentBreakpoint === o) return;
          const c = (o in a ? a[o] : void 0) || e.originalParams,
            d = R(e, i),
            u = R(e, c),
            p = e.params.grabCursor,
            h = c.grabCursor,
            m = i.enabled;
          (d && !u
            ? (n.classList.remove(
                `${i.containerModifierClass}grid`,
                `${i.containerModifierClass}grid-column`,
              ),
              e.emitContainerClasses())
            : !d &&
              u &&
              (n.classList.add(`${i.containerModifierClass}grid`),
              ((c.grid.fill && "column" === c.grid.fill) ||
                (!c.grid.fill && "column" === i.grid.fill)) &&
                n.classList.add(`${i.containerModifierClass}grid-column`),
              e.emitContainerClasses()),
            p && !h ? e.unsetGrabCursor() : !p && h && e.setGrabCursor());
          const f = (e, t) => e[t];
          ["navigation", "pagination", "scrollbar"].forEach((t) => {
            const s = f(c, t);
            if (void 0 === s) return;
            const n = f(i, t),
              a = "object" == typeof n && null !== n && n.enabled,
              r = "object" == typeof s && null !== s && s.enabled,
              l = e[t];
            (a && !r && l?.disable?.(), !a && r && l?.enable?.());
          });
          const g = c.direction && c.direction !== i.direction,
            v = i.loop && (c.slidesPerView !== i.slidesPerView || g),
            b = i.loop;
          (g && s && e.changeDirection(), A(e.params, c));
          const y = e.params.enabled,
            w = e.params.loop;
          (Object.assign(e, {
            allowTouchMove: e.params.allowTouchMove,
            allowSlideNext: e.params.allowSlideNext,
            allowSlidePrev: e.params.allowSlidePrev,
          }),
            m && !y ? e.disable() : !m && y && e.enable(),
            (e.currentBreakpoint = o),
            e.emit("_beforeBreakpoint", c),
            s &&
              (v
                ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
                : !b && w
                  ? (e.loopCreate(t), e.updateSlides())
                  : b && !w && e.loopDestroy()),
            e.emit("breakpoint", c));
        },
        getBreakpoint: function (e, t = "window", s) {
          if (!e || ("container" === t && !s)) return;
          let i = !1;
          const n = "window" === t ? window.innerHeight : s.clientHeight,
            a = Object.keys(e).map((e) => {
              if ("string" == typeof e && 0 === e.indexOf("@")) {
                const t = parseFloat(e.substr(1));
                return { value: n * t, point: e };
              }
              return { value: e, point: e };
            });
          a.sort(
            (e, t) =>
              parseInt(String(e.value), 10) - parseInt(String(t.value), 10),
          );
          for (let e = 0; e < a.length; e += 1) {
            const { point: n, value: r } = a[e];
            "window" === t
              ? window.matchMedia(`(min-width: ${r}px)`).matches && (i = n)
              : r <= s.clientWidth && (i = n);
          }
          return i || "max";
        },
      };
      var j = {
        checkOverflow: function () {
          const e = this,
            { isLocked: t, params: s } = e,
            { slidesOffsetBefore: i } = s;
          if (i) {
            const t = e.slides.length - 1,
              s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
            e.isLocked = e.size > s;
          } else e.isLocked = 1 === e.snapGrid.length;
          (!0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
            !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
            t && t !== e.isLocked && (e.isEnd = !1),
            t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"));
        },
      };
      var Y = {
        addClasses: function () {
          const e = this,
            { classNames: t, params: s, rtl: i, el: n, device: a } = e,
            r = (function (e, t) {
              const s = [];
              return (
                e.forEach((e) => {
                  "object" == typeof e
                    ? Object.keys(e).forEach((i) => {
                        e[i] && s.push(t + i);
                      })
                    : "string" == typeof e && s.push(t + e);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "free-mode": e.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: a.android },
                { ios: a.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
                { "watch-progress": s.watchSlidesProgress },
              ],
              s.containerModifierClass,
            );
          (t.push(...r), n.classList.add(...t), e.emitContainerClasses());
        },
        removeClasses: function () {
          const { el: e, classNames: t } = this;
          e &&
            "string" != typeof e &&
            (e.classList.remove(...t), this.emitContainerClasses());
        },
      };
      const X = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        swiperElementNodeName: "SWIPER-CONTAINER",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        eventsPrefix: "swiper",
        enabled: !0,
        focusableElements:
          "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        snapToSlideEdge: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopAddBlankSlides: !0,
        loopAdditionalSlides: 0,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreload: !0,
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: !0,
        _emitClasses: !1,
      };
      var U = {
        on(e, t, s) {
          const i = this;
          if (!i.eventsListeners || i.destroyed) return i;
          if ("function" != typeof t) return i;
          const n = s ? "unshift" : "push";
          return (
            e.split(" ").forEach((e) => {
              (i.eventsListeners[e] || (i.eventsListeners[e] = []),
                i.eventsListeners[e][n](t));
            }),
            i
          );
        },
        once(e, t, s) {
          const i = this;
          if (!i.eventsListeners || i.destroyed) return i;
          if ("function" != typeof t) return i;
          const n = function (...s) {
            (i.off(e, n),
              n.__emitterProxy && delete n.__emitterProxy,
              t.apply(i, s));
          };
          return ((n.__emitterProxy = t), i.on(e, n, s));
        },
        onAny(e, t) {
          const s = this;
          if (!s.eventsListeners || s.destroyed) return s;
          if ("function" != typeof e) return s;
          const i = t ? "unshift" : "push";
          return (
            s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e),
            s
          );
        },
        offAny(e) {
          const t = this;
          if (!t.eventsListeners || t.destroyed) return t;
          if (!t.eventsAnyListeners) return t;
          const s = t.eventsAnyListeners.indexOf(e);
          return (s >= 0 && t.eventsAnyListeners.splice(s, 1), t);
        },
        off(e, t) {
          const s = this;
          return !s.eventsListeners || s.destroyed
            ? s
            : s.eventsListeners
              ? (e.split(" ").forEach((e) => {
                  void 0 === t
                    ? (s.eventsListeners[e] = [])
                    : s.eventsListeners[e] &&
                      s.eventsListeners[e].forEach((i, n) => {
                        (i === t ||
                          (i.__emitterProxy && i.__emitterProxy === t)) &&
                          s.eventsListeners[e].splice(n, 1);
                      });
                }),
                s)
              : s;
        },
        emit(...e) {
          const t = this;
          if (!t.eventsListeners || t.destroyed) return t;
          if (!t.eventsListeners) return t;
          let s, i, n;
          if ("string" == typeof e[0] || Array.isArray(e[0]))
            ((s = e[0]), (i = e.slice(1, e.length)), (n = t));
          else {
            const a = e[0];
            ((s = a.events), (i = a.data ?? []), (n = a.context || t));
          }
          i.unshift(n);
          return (
            (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
              (t.eventsAnyListeners &&
                t.eventsAnyListeners.length &&
                t.eventsAnyListeners.forEach((t) => {
                  t.apply(n, [e, ...i]);
                }),
                t.eventsListeners &&
                  t.eventsListeners[e] &&
                  t.eventsListeners[e].forEach((e) => {
                    e.apply(n, i);
                  }));
            }),
            t
          );
        },
      };
      function Q(e) {
        const t = this;
        t.destroyed ||
          (t.enabled &&
            (t.allowClick ||
              (t.params.preventClicks && e.preventDefault(),
              t.params.preventClicksPropagation &&
                t.animating &&
                (e.stopPropagation(), e.stopImmediatePropagation()))));
      }
      function J() {
        const e = this;
        e.destroyed ||
          e.documentTouchHandlerProceeded ||
          ((e.documentTouchHandlerProceeded = !0),
          e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
      }
      function Z(e) {
        const t = this;
        t.destroyed ||
          (H(t, e.target),
          t.params.cssMode ||
            ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
            t.update());
      }
      function K() {
        const e = this,
          { params: t, el: s } = e;
        if (s && 0 === s.offsetWidth) return;
        t.breakpoints && e.setBreakpoint();
        const { allowSlideNext: i, allowSlidePrev: n, snapGrid: a } = e,
          r = e.virtual && e.params.virtual?.enabled;
        ((e.allowSlideNext = !0),
          (e.allowSlidePrev = !0),
          e.updateSize(),
          e.updateSlides(),
          e.updateSlidesClasses());
        const l = r && t.loop;
        if (
          !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
          !e.isEnd ||
          e.isBeginning ||
          e.params.centeredSlides ||
          l
        )
          e.params.loop && !r
            ? e.slideToLoop(e.realIndex, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0);
        else {
          const t = r ? e.virtual.slides.length : e.slides.length;
          e.slideTo(t - 1, 0, !1, !0);
        }
        if (e.autoplay && e.autoplay.running && e.autoplay.paused) {
          const t = e.autoplay;
          (clearTimeout(t.resizeTimeout),
            (t.resizeTimeout = setTimeout(() => {
              e.autoplay &&
                e.autoplay.running &&
                e.autoplay.paused &&
                e.autoplay.resume();
            }, 500)));
        }
        ((e.allowSlidePrev = n),
          (e.allowSlideNext = i),
          e.params.watchOverflow && a !== e.snapGrid && e.checkOverflow());
      }
      function ee() {
        const e = this;
        if (e.destroyed) return;
        const { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
        if (!i) return;
        let n;
        ((e.previousTranslate = e.translate),
          e.isHorizontal()
            ? (e.translate = -t.scrollLeft)
            : (e.translate = -t.scrollTop),
          0 === e.translate && (e.translate = 0),
          e.updateActiveIndex(),
          e.updateSlidesClasses());
        const a = e.maxTranslate() - e.minTranslate();
        ((n = 0 === a ? 0 : (e.translate - e.minTranslate()) / a),
          n !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
          e.emit("setTranslate", e.translate, !1));
      }
      function te(e) {
        const t = this;
        if (t.destroyed) return;
        const s = t.touchEventsData;
        let i = e.originalEvent ?? e;
        if ("touchend" === i.type || "touchcancel" === i.type) {
          const e = [...i.changedTouches].find(
            (e) => e.identifier === s.touchId,
          );
          if (!e || e.identifier !== s.touchId) return;
        } else {
          if (null !== s.touchId) return;
          if (i.pointerId !== s.pointerId) return;
        }
        if (
          [
            "pointercancel",
            "pointerout",
            "pointerleave",
            "contextmenu",
          ].includes(i.type)
        ) {
          if (!(
            ["pointercancel", "contextmenu"].includes(i.type) &&
            (t.browser.isSafari || t.browser.isWebView)
          ))
            return;
        }
        ((s.pointerId = null), (s.touchId = null));
        const {
          params: n,
          touches: a,
          rtlTranslate: r,
          slidesGrid: l,
          enabled: o,
        } = t;
        if (!o) return;
        if (!n.simulateTouch && "mouse" === i.pointerType) return;
        if (
          (s.allowTouchCallbacks && t.emit("touchEnd", i),
          (s.allowTouchCallbacks = !1),
          !s.isTouched)
        )
          return (
            s.isMoved && n.grabCursor && t.setGrabCursor(!1),
            (s.isMoved = !1),
            void (s.startMoving = !1)
          );
        n.grabCursor &&
          s.isMoved &&
          s.isTouched &&
          (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
          t.setGrabCursor(!1);
        const c = E(),
          d = c - s.touchStartTime;
        if (t.allowClick) {
          const e = i.path ?? (i.composedPath && i.composedPath());
          (t.updateClickedSlide(e && e[0], e),
            t.emit("tap click", i),
            d < 300 &&
              c - s.lastClickTime < 300 &&
              t.emit("doubleTap doubleClick", i));
        }
        if (
          ((s.lastClickTime = E()),
          S(() => {
            t.destroyed || (t.allowClick = !0);
          }),
          !s.isTouched ||
            !s.isMoved ||
            !t.swipeDirection ||
            (0 === a.diff && !s.loopSwapReset) ||
            (s.currentTranslate === s.startTranslate && !s.loopSwapReset))
        )
          return (
            (s.isTouched = !1),
            (s.isMoved = !1),
            void (s.startMoving = !1)
          );
        let u;
        if (
          ((s.isTouched = !1),
          (s.isMoved = !1),
          (s.startMoving = !1),
          (u = n.followFinger
            ? r
              ? t.translate
              : -t.translate
            : -(s.currentTranslate ?? 0)),
          n.cssMode)
        )
          return;
        if (n.freeMode && n.freeMode.enabled)
          return void t.freeMode.onTouchEnd({ currentPos: u });
        const p = u >= -t.maxTranslate() && !t.params.loop;
        let h = 0,
          m = t.slidesSizesGrid[0];
        for (
          let e = 0;
          e < l.length;
          e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
        ) {
          const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
          void 0 !== l[e + t]
            ? (p || (u >= l[e] && u < l[e + t])) &&
              ((h = e), (m = l[e + t] - l[e]))
            : (p || u >= l[e]) &&
              ((h = e), (m = l[l.length - 1] - l[l.length - 2]));
        }
        let f = null,
          g = null;
        n.rewind &&
          (t.isBeginning
            ? (g =
                n.virtual?.enabled && t.virtual
                  ? t.virtual.slides.length - 1
                  : t.slides.length - 1)
            : t.isEnd && (f = 0));
        const v = (u - l[h]) / m,
          b = h < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        if (d > n.longSwipesMs) {
          if (!n.longSwipes) return void t.slideTo(t.activeIndex);
          ("next" === t.swipeDirection &&
            (v >= n.longSwipesRatio
              ? t.slideTo(n.rewind && t.isEnd ? f : h + b)
              : t.slideTo(h)),
            "prev" === t.swipeDirection &&
              (v > 1 - n.longSwipesRatio
                ? t.slideTo(h + b)
                : null !== g && v < 0 && Math.abs(v) > n.longSwipesRatio
                  ? t.slideTo(g)
                  : t.slideTo(h)));
        } else {
          if (!n.shortSwipes) return void t.slideTo(t.activeIndex);
          t.navigation &&
          (i.target === t.navigation.nextEl || i.target === t.navigation.prevEl)
            ? i.target === t.navigation.nextEl
              ? t.slideTo(h + b)
              : t.slideTo(h)
            : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : h + b),
              "prev" === t.swipeDirection && t.slideTo(null !== g ? g : h));
        }
      }
      function se(e) {
        const t = this;
        if (t.destroyed) return;
        const s = t.touchEventsData,
          { params: i, touches: n, rtlTranslate: a, enabled: r } = t;
        if (!r) return;
        if (!i.simulateTouch && "mouse" === e.pointerType) return;
        const l = e,
          o = l.originalEvent ?? l;
        if ("pointermove" === o.type) {
          if (null !== s.touchId) return;
          if (o.pointerId !== s.pointerId) return;
        }
        let c;
        if ("touchmove" === o.type) {
          const e = [...o.changedTouches].find(
            (e) => e.identifier === s.touchId,
          );
          if (!e || e.identifier !== s.touchId) return;
          c = e;
        } else c = o;
        if (!s.isTouched)
          return void (
            s.startMoving &&
            s.isScrolling &&
            t.emit("touchMoveOpposite", o)
          );
        const d = c.pageX,
          u = c.pageY;
        if (o.preventedByNestedSwiper)
          return ((n.startX = d), void (n.startY = u));
        if (!t.allowTouchMove)
          return (
            o.target.matches(s.focusableElements) || (t.allowClick = !1),
            void (
              s.isTouched &&
              (Object.assign(n, {
                startX: d,
                startY: u,
                currentX: d,
                currentY: u,
              }),
              (s.touchStartTime = E()))
            )
          );
        if (i.touchReleaseOnEdges && !i.loop)
          if (t.isVertical()) {
            if (
              (u < n.startY && t.translate <= t.maxTranslate()) ||
              (u > n.startY && t.translate >= t.minTranslate())
            )
              return ((s.isTouched = !1), void (s.isMoved = !1));
          } else {
            if (
              a &&
              ((d > n.startX && -t.translate <= t.maxTranslate()) ||
                (d < n.startX && -t.translate >= t.minTranslate()))
            )
              return;
            if (
              !a &&
              ((d < n.startX && t.translate <= t.maxTranslate()) ||
                (d > n.startX && t.translate >= t.minTranslate()))
            )
              return;
          }
        if (
          (document.activeElement &&
            document.activeElement.matches(s.focusableElements) &&
            document.activeElement !== o.target &&
            "mouse" !== o.pointerType &&
            document.activeElement.blur(),
          document.activeElement &&
            o.target === document.activeElement &&
            o.target.matches(s.focusableElements))
        )
          return ((s.isMoved = !0), void (t.allowClick = !1));
        (s.allowTouchCallbacks && t.emit("touchMove", o),
          (n.previousX = n.currentX),
          (n.previousY = n.currentY),
          (n.currentX = d),
          (n.currentY = u));
        const p = n.currentX - n.startX,
          h = n.currentY - n.startY;
        if (
          t.params.threshold &&
          Math.sqrt(p ** 2 + h ** 2) < t.params.threshold
        )
          return;
        if (void 0 === s.isScrolling) {
          let e;
          (t.isHorizontal() && n.currentY === n.startY) ||
          (t.isVertical() && n.currentX === n.startX)
            ? (s.isScrolling = !1)
            : p * p + h * h >= 25 &&
              ((e = (180 * Math.atan2(Math.abs(h), Math.abs(p))) / Math.PI),
              (s.isScrolling = t.isHorizontal()
                ? e > i.touchAngle
                : 90 - e > i.touchAngle));
        }
        if (
          (s.isScrolling && t.emit("touchMoveOpposite", o),
          void 0 === s.startMoving &&
            ((n.currentX === n.startX && n.currentY === n.startY) ||
              (s.startMoving = !0)),
          s.isScrolling ||
            ("touchmove" === o.type && s.preventTouchMoveFromPointerMove))
        )
          return void (s.isTouched = !1);
        if (!s.startMoving) return;
        ((t.allowClick = !1),
          !i.cssMode && o.cancelable && o.preventDefault(),
          i.touchMoveStopPropagation && !i.nested && o.stopPropagation());
        let m = t.isHorizontal() ? p : h,
          f = t.isHorizontal()
            ? n.currentX - n.previousX
            : n.currentY - n.previousY;
        (i.oneWayMovement &&
          ((m = Math.abs(m) * (a ? 1 : -1)), (f = Math.abs(f) * (a ? 1 : -1))),
          (n.diff = m),
          (m *= i.touchRatio),
          a && ((m = -m), (f = -f)));
        const g = t.touchesDirection;
        ((t.swipeDirection = m > 0 ? "prev" : "next"),
          (t.touchesDirection = f > 0 ? "prev" : "next"));
        const v = t.params.loop && !i.cssMode,
          b =
            ("next" === t.touchesDirection && t.allowSlideNext) ||
            ("prev" === t.touchesDirection && t.allowSlidePrev);
        if (!s.isMoved) {
          if (
            (v && b && t.loopFix({ direction: t.swipeDirection }),
            (s.startTranslate = t.getTranslate()),
            t.setTransition(0),
            t.animating)
          ) {
            const e = new window.CustomEvent("transitionend", {
              bubbles: !0,
              cancelable: !0,
              detail: { bySwiperTouchMove: !0 },
            });
            t.wrapperEl.dispatchEvent(e);
          }
          ((s.allowMomentumBounce = !1),
            !i.grabCursor ||
              (!0 !== t.allowSlideNext && !0 !== t.allowSlidePrev) ||
              t.setGrabCursor(!0),
            t.emit("sliderFirstMove", o));
        }
        if (
          (new Date().getTime(),
          !1 !== i._loopSwapReset &&
            s.isMoved &&
            s.allowThresholdMove &&
            g !== t.touchesDirection &&
            v &&
            b &&
            Math.abs(m) >= 1)
        )
          return (
            Object.assign(n, {
              startX: d,
              startY: u,
              currentX: d,
              currentY: u,
              startTranslate: s.currentTranslate,
            }),
            (s.loopSwapReset = !0),
            void (s.startTranslate = s.currentTranslate)
          );
        (t.emit("sliderMove", o), (s.isMoved = !0));
        const y = s.startTranslate ?? 0;
        s.currentTranslate = m + y;
        let w = !0,
          S = i.resistanceRatio;
        if (
          (i.touchReleaseOnEdges && (S = 0),
          m > 0
            ? (v &&
                b &&
                s.allowThresholdMove &&
                s.currentTranslate >
                  (i.centeredSlides
                    ? t.minTranslate() -
                      t.slidesSizesGrid[t.activeIndex + 1] -
                      ("auto" !== i.slidesPerView &&
                      t.slides.length - i.slidesPerView >= 2
                        ? t.slidesSizesGrid[t.activeIndex + 1] +
                          t.params.spaceBetween
                        : 0) -
                      t.params.spaceBetween
                    : t.minTranslate()) &&
                t.loopFix({
                  direction: "prev",
                  setTranslate: !0,
                  activeSlideIndex: 0,
                }),
              s.currentTranslate > t.minTranslate() &&
                ((w = !1),
                i.resistance &&
                  (s.currentTranslate =
                    t.minTranslate() - 1 + (-t.minTranslate() + y + m) ** S)))
            : m < 0 &&
              (v &&
                b &&
                s.allowThresholdMove &&
                s.currentTranslate <
                  (i.centeredSlides
                    ? t.maxTranslate() +
                      t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                      t.params.spaceBetween +
                      ("auto" !== i.slidesPerView &&
                      t.slides.length - i.slidesPerView >= 2
                        ? t.slidesSizesGrid[t.slidesSizesGrid.length - 1] +
                          t.params.spaceBetween
                        : 0)
                    : t.maxTranslate()) &&
                t.loopFix({
                  direction: "next",
                  setTranslate: !0,
                  activeSlideIndex:
                    t.slides.length -
                    ("auto" === i.slidesPerView
                      ? t.slidesPerViewDynamic()
                      : Math.ceil(parseFloat(String(i.slidesPerView)))),
                }),
              s.currentTranslate < t.maxTranslate() &&
                ((w = !1),
                i.resistance &&
                  (s.currentTranslate =
                    t.maxTranslate() + 1 - (t.maxTranslate() - y - m) ** S))),
          w && (o.preventedByNestedSwiper = !0),
          !t.allowSlideNext &&
            "next" === t.swipeDirection &&
            (s.currentTranslate ?? 0) < y &&
            (s.currentTranslate = y),
          !t.allowSlidePrev &&
            "prev" === t.swipeDirection &&
            (s.currentTranslate ?? 0) > y &&
            (s.currentTranslate = y),
          t.allowSlidePrev || t.allowSlideNext || (s.currentTranslate = y),
          i.threshold > 0)
        ) {
          if (!(Math.abs(m) > i.threshold || s.allowThresholdMove))
            return void (s.currentTranslate = s.startTranslate);
          if (!s.allowThresholdMove)
            return (
              (s.allowThresholdMove = !0),
              (n.startX = n.currentX),
              (n.startY = n.currentY),
              (s.currentTranslate = s.startTranslate),
              void (n.diff = t.isHorizontal()
                ? n.currentX - n.startX
                : n.currentY - n.startY)
            );
        }
        i.followFinger &&
          !i.cssMode &&
          (((i.freeMode && i.freeMode.enabled && t.freeMode) ||
            i.watchSlidesProgress) &&
            (t.updateActiveIndex(), t.updateSlidesClasses()),
          i.freeMode &&
            i.freeMode.enabled &&
            t.freeMode &&
            t.freeMode.onTouchMove(),
          t.updateProgress(s.currentTranslate),
          t.setTranslate(s.currentTranslate ?? 0));
      }
      function ie(e, t, s) {
        const { params: i } = e,
          n = i.edgeSwipeDetection,
          a = i.edgeSwipeThreshold;
        return (
          !n ||
          !(s <= a || s >= window.innerWidth - a) ||
          ("prevent" === n && (t.preventDefault(), !0))
        );
      }
      function ne(e) {
        const t = this;
        if (t.destroyed) return;
        const s = e.originalEvent ?? e,
          i = t.touchEventsData;
        if ("pointerdown" === s.type) {
          const e = s;
          if (null !== i.pointerId && i.pointerId !== e.pointerId) return;
          i.pointerId = e.pointerId;
        } else
          "touchstart" === s.type &&
            1 === s.targetTouches.length &&
            (i.touchId = s.targetTouches[0].identifier);
        if ("touchstart" === s.type)
          return void ie(t, s, s.targetTouches[0].pageX);
        const { params: n, touches: a, enabled: r } = t;
        if (!r) return;
        if (!n.simulateTouch && "mouse" === s.pointerType) return;
        if (t.animating && n.preventInteractionOnTransition) return;
        !t.animating && n.cssMode && n.loop && t.loopFix();
        let l = s.target;
        if (
          "wrapper" === n.touchEventsTarget &&
          !(function (e, t) {
            let s = t.contains(e);
            !s &&
              t instanceof HTMLSlotElement &&
              ((s = [...t.assignedElements()].includes(e)),
              s ||
                (s = (function (e, t) {
                  const s = [t];
                  for (; s.length > 0;) {
                    const t = s.shift();
                    if (e === t) return !0;
                    s.push(
                      ...t.children,
                      ...(t.shadowRoot ? t.shadowRoot.children : []),
                      ...(t.assignedElements ? t.assignedElements() : []),
                    );
                  }
                  return !1;
                })(e, t)));
            return s;
          })(l, t.wrapperEl)
        )
          return;
        const o = s;
        if ("number" == typeof o.which && 3 === o.which) return;
        if ("number" == typeof o.button && o.button > 0) return;
        if (i.isTouched && i.isMoved) return;
        const c = !!n.noSwipingClass && "" !== n.noSwipingClass,
          d = s.composedPath ? s.composedPath() : s.path;
        c && s.target && s.target.shadowRoot && d && (l = d[0]);
        const u = n.noSwipingSelector
            ? n.noSwipingSelector
            : `.${n.noSwipingClass}`,
          p = !(!s.target || !s.target.shadowRoot);
        if (
          n.noSwiping &&
          (p
            ? ((h = u),
              (function e(t) {
                if (!t || t === document || t === window) return null;
                let s = t;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(h);
                if (!i && !s.getRootNode) return null;
                const n = s.getRootNode();
                return i || e(n.host);
              })(l))
            : l.closest(u))
        )
          return void (t.allowClick = !0);
        var h;
        if (
          n.swipeHandler &&
          "string" == typeof n.swipeHandler &&
          !l.closest(n.swipeHandler)
        )
          return;
        const m = s;
        ((a.currentX = m.pageX), (a.currentY = m.pageY));
        const f = a.currentX,
          g = a.currentY;
        if (!ie(t, s, f)) return;
        (Object.assign(i, {
          isTouched: !0,
          isMoved: !1,
          allowTouchCallbacks: !0,
          isScrolling: void 0,
          startMoving: void 0,
        }),
          (a.startX = f),
          (a.startY = g),
          (i.touchStartTime = E()),
          (t.allowClick = !0),
          t.updateSize(),
          (t.swipeDirection = void 0),
          n.threshold > 0 && (i.allowThresholdMove = !1));
        let v = !0;
        (l.matches(i.focusableElements) &&
          ((v = !1), "SELECT" === l.nodeName && (i.isTouched = !1)),
          document.activeElement &&
            document.activeElement.matches(i.focusableElements) &&
            document.activeElement !== l &&
            ("mouse" === m.pointerType ||
              ("mouse" !== m.pointerType && !l.matches(i.focusableElements))) &&
            document.activeElement.blur());
        const b = v && t.allowTouchMove && n.touchStartPreventDefault;
        ((!n.touchStartForcePreventDefault && !b) ||
          l.isContentEditable ||
          s.preventDefault(),
          n.freeMode &&
            n.freeMode.enabled &&
            t.freeMode &&
            t.animating &&
            !n.cssMode &&
            t.freeMode.onTouchStart(),
          t.emit("touchStart", s));
      }
      const ae = (e, t) => {
        const { params: s, el: i, wrapperEl: n, device: a } = e,
          r = !!s.nested,
          l = "on" === t ? "addEventListener" : "removeEventListener",
          o = t;
        if (!i || "string" == typeof i) return;
        (document[l]("touchstart", e.onDocumentTouchStart, {
          passive: !1,
          capture: r,
        }),
          i[l]("touchstart", e.onTouchStart, { passive: !1 }),
          i[l]("pointerdown", e.onTouchStart, { passive: !1 }),
          document[l]("touchmove", e.onTouchMove, { passive: !1, capture: r }),
          document[l]("pointermove", e.onTouchMove, {
            passive: !1,
            capture: r,
          }),
          document[l]("touchend", e.onTouchEnd, { passive: !0 }),
          document[l]("pointerup", e.onTouchEnd, { passive: !0 }),
          document[l]("pointercancel", e.onTouchEnd, { passive: !0 }),
          document[l]("touchcancel", e.onTouchEnd, { passive: !0 }),
          document[l]("pointerout", e.onTouchEnd, { passive: !0 }),
          document[l]("pointerleave", e.onTouchEnd, { passive: !0 }),
          document[l]("contextmenu", e.onTouchEnd, { passive: !0 }),
          (s.preventClicks || s.preventClicksPropagation) &&
            i[l]("click", e.onClick, !0),
          s.cssMode && n[l]("scroll", e.onScroll));
        const c = (t) => {
          e[o](t, K, !0);
        };
        (s.updateOnWindowResize
          ? c(
              a.ios || a.android
                ? "resize orientationchange observerUpdate"
                : "resize observerUpdate",
            )
          : c("observerUpdate"),
          s.lazyPreload && i[l]("load", e.onLoad, { capture: !0 }));
      };
      var re = {
        loopCreate: function (e, t) {
          const s = this,
            { params: i, slidesEl: n } = s;
          if (!i.loop || (s.virtual && s.params.virtual?.enabled)) return;
          const a = () => {
              _(n, `.${i.slideClass}, swiper-slide`).forEach((e, t) => {
                e.setAttribute("data-swiper-slide-index", String(t));
              });
            },
            r = s.grid && i.grid && i.grid.rows > 1;
          i.loopAddBlankSlides &&
            (i.slidesPerGroup > 1 || r) &&
            (() => {
              const e = _(n, `.${i.slideBlankClass}`);
              (e.forEach((e) => {
                e.remove();
              }),
                e.length > 0 && (s.recalcSlides(), s.updateSlides()));
            })();
          const l = i.slidesPerGroup * (r ? i.grid.rows : 1),
            o = s.slides.length % l !== 0,
            c = r && s.slides.length % i.grid.rows !== 0,
            d = (e) => {
              for (let t = 0; t < e; t += 1) {
                const e = s.isElement
                  ? k("swiper-slide", [i.slideBlankClass])
                  : k("div", [i.slideClass, i.slideBlankClass]);
                s.slidesEl.append(e);
              }
            };
          if (o) {
            if (i.loopAddBlankSlides) {
              (d(l - (s.slides.length % l)),
                s.recalcSlides(),
                s.updateSlides());
            } else
              M(
                "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
              );
            a();
          } else if (c) {
            if (i.loopAddBlankSlides) {
              (d(i.grid.rows - (s.slides.length % i.grid.rows)),
                s.recalcSlides(),
                s.updateSlides());
            } else
              M(
                "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
              );
            a();
          } else a();
          const u =
            i.centeredSlides || !!i.slidesOffsetBefore || !!i.slidesOffsetAfter;
          s.loopFix({
            slideRealIndex: e,
            direction: u ? void 0 : "next",
            initial: t,
          });
        },
        loopFix: function (e = {}) {
          const {
            slideRealIndex: t,
            slideTo: s = !0,
            direction: i,
            setTranslate: n,
            activeSlideIndex: a,
            initial: r,
            byController: l,
            byMousewheel: o,
          } = e;
          let c = a;
          const d = this;
          if (!d.params.loop) return;
          (d.emit("beforeLoopFix"), (d.__loopFixInProgress__ = !0));
          const {
              slides: u,
              allowSlidePrev: p,
              allowSlideNext: h,
              slidesEl: m,
              params: f,
            } = d,
            {
              centeredSlides: g,
              slidesOffsetBefore: v,
              slidesOffsetAfter: b,
              initialSlide: y,
            } = f,
            w = g || !!v || !!b;
          if (
            ((d.allowSlidePrev = !0),
            (d.allowSlideNext = !0),
            d.virtual && f.virtual?.enabled)
          ) {
            if (s) {
              const e = d.virtual.slides.length,
                t = d.virtual.slidesBefore ?? 0;
              w || 0 !== d.snapIndex
                ? w && d.snapIndex < f.slidesPerView
                  ? d.slideTo(e + d.snapIndex, 0, !1, !0)
                  : d.snapIndex === d.snapGrid.length - 1 &&
                    d.slideTo(t, 0, !1, !0)
                : d.slideTo(e, 0, !1, !0);
            }
            return (
              (d.allowSlidePrev = p),
              (d.allowSlideNext = h),
              (d.__loopFixInProgress__ = !1),
              void d.emit("loopFix")
            );
          }
          let S = f.slidesPerView;
          "auto" === S
            ? (S = d.slidesPerViewDynamic())
            : ((S = Math.ceil(parseFloat(String(f.slidesPerView)))),
              w && S % 2 == 0 && (S += 1));
          const E = f.slidesPerGroupAuto ? S : f.slidesPerGroup,
            x = (e) => ("function" == typeof e ? e.call(d) : e) || 0,
            T =
              d.slidesGrid.length > 1
                ? (d.slidesGrid[d.slidesGrid.length - 1] - d.slidesGrid[0]) /
                  (d.slidesGrid.length - 1)
                : d.size,
            C = T > 0 ? x(v) / T : 0,
            A = T > 0 ? x(b) / T : 0;
          let L = w
            ? Math.max(
                E,
                (g ? Math.ceil(S / 2) : 0) + Math.ceil(Math.max(C, A)),
              )
            : E;
          (L % E !== 0 && (L += E - (L % E)),
            (L += f.loopAdditionalSlides),
            (d.loopedSlides = L));
          const O = d.grid && f.grid && f.grid.rows > 1;
          u.length < S + L ||
          ("cards" === d.params.effect && u.length < S + 2 * L)
            ? M(
                "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
              )
            : O &&
              "row" === f.grid.fill &&
              M(
                "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
              );
          const _ = [],
            k = [],
            P = O ? Math.ceil(u.length / f.grid.rows) : u.length,
            I = r && P - y < S && !w;
          let z = I ? y : d.activeIndex;
          void 0 === c
            ? (c = d.getSlideIndex(
                u.find((e) => e.classList.contains(f.slideActiveClass)),
              ))
            : (z = c);
          const D = "next" === i || !i,
            $ = "prev" === i || !i;
          let N = 0,
            q = 0;
          const B =
            (O ? (u[c].column ?? 0) : c) +
            (w && void 0 === n ? (g ? -S / 2 + 0.5 : 0) - C : 0);
          if (B < L) {
            N = Math.max(L - B, E);
            for (let e = 0; e < L - B; e += 1) {
              const t = e - Math.floor(e / P) * P;
              if (O) {
                const e = P - t - 1;
                for (let t = u.length - 1; t >= 0; t -= 1)
                  u[t].column === e && _.push(t);
              } else _.push(P - t - 1);
            }
          } else if (B + S > P - L) {
            ((q = Math.max(B - (P - 2 * L), E)),
              I && (q = Math.max(q, S - P + y + 1)));
            for (let e = 0; e < q; e += 1) {
              const t = e - Math.floor(e / P) * P;
              O
                ? u.forEach((e, s) => {
                    e.column === t && k.push(s);
                  })
                : k.push(t);
            }
          }
          if (
            ((d.__preventObserver__ = !0),
            requestAnimationFrame(() => {
              d.__preventObserver__ = !1;
            }),
            "cards" === d.params.effect &&
              u.length < S + 2 * L &&
              (k.includes(c) && k.splice(k.indexOf(c), 1),
              _.includes(c) && _.splice(_.indexOf(c), 1)),
            $ &&
              _.forEach((e) => {
                const t = u[e];
                ((t.swiperLoopMoveDOM = !0),
                  m.prepend(t),
                  (t.swiperLoopMoveDOM = !1));
              }),
            D &&
              k.forEach((e) => {
                const t = u[e];
                ((t.swiperLoopMoveDOM = !0),
                  m.append(t),
                  (t.swiperLoopMoveDOM = !1));
              }),
            d.recalcSlides(),
            "auto" === f.slidesPerView
              ? d.updateSlides()
              : O &&
                ((_.length > 0 && $) || (k.length > 0 && D)) &&
                d.slides.forEach((e, t) => {
                  d.grid.updateSlide(t, e, d.slides);
                }),
            f.watchSlidesProgress && d.updateSlidesOffset(),
            s)
          )
            if (_.length > 0 && $) {
              if (void 0 === t) {
                const e = d.slidesGrid[z],
                  t = d.slidesGrid[z + N] - e;
                o
                  ? d.setTranslate(d.translate - t)
                  : (d.slideTo(z + Math.ceil(N), 0, !1, !0),
                    n &&
                      ((d.touchEventsData.startTranslate =
                        d.touchEventsData.startTranslate - t),
                      (d.touchEventsData.currentTranslate =
                        d.touchEventsData.currentTranslate - t)));
              } else if (n) {
                const e = O ? _.length / f.grid.rows : _.length;
                (d.slideTo(d.activeIndex + e, 0, !1, !0),
                  (d.touchEventsData.currentTranslate = d.translate));
              }
            } else if (k.length > 0 && D)
              if (void 0 === t) {
                const e = d.slidesGrid[z],
                  t = d.slidesGrid[z - q] - e;
                o
                  ? d.setTranslate(d.translate - t)
                  : (d.slideTo(z - q, 0, !1, !0),
                    n &&
                      ((d.touchEventsData.startTranslate =
                        d.touchEventsData.startTranslate - t),
                      (d.touchEventsData.currentTranslate =
                        d.touchEventsData.currentTranslate - t)));
              } else {
                const e = O ? k.length / f.grid.rows : k.length;
                d.slideTo(d.activeIndex - e, 0, !1, !0);
              }
          ((d.allowSlidePrev = p), (d.allowSlideNext = h));
          const V = d.controller?.control;
          if (V && !l) {
            const e = {
              slideRealIndex: t,
              direction: i,
              setTranslate: n,
              activeSlideIndex: c,
              byController: !0,
            };
            Array.isArray(V)
              ? V.forEach((t) => {
                  !t.destroyed &&
                    t.params.loop &&
                    t.loopFix({
                      ...e,
                      slideTo: t.params.slidesPerView === f.slidesPerView && s,
                    });
                })
              : V instanceof d.constructor &&
                V.params.loop &&
                V.loopFix({
                  ...e,
                  slideTo: V.params.slidesPerView === f.slidesPerView && s,
                });
          }
          ((d.__loopFixInProgress__ = !1), d.emit("loopFix"));
        },
        loopDestroy: function () {
          const e = this,
            { params: t, slidesEl: s } = e;
          if (!t.loop || !s || (e.virtual && e.params.virtual?.enabled)) return;
          e.recalcSlides();
          const i = [];
          (e.slides.forEach((e) => {
            const t = e,
              s =
                void 0 === t.swiperSlideIndex
                  ? Number(e.getAttribute("data-swiper-slide-index"))
                  : t.swiperSlideIndex;
            i[s] = e;
          }),
            e.slides.forEach((e) => {
              e.removeAttribute("data-swiper-slide-index");
            }),
            i.forEach((e) => {
              s.append(e);
            }),
            e.recalcSlides(),
            e.slideTo(e.realIndex, 0));
        },
      };
      function le(e, t) {
        return function (s = {}) {
          const i = Object.keys(s)[0],
            n = s[i];
          "object" == typeof n && null !== n
            ? (!0 === e[i] && (e[i] = { enabled: !0 }),
              "navigation" === i &&
                e[i] &&
                e[i].enabled &&
                !e[i].prevEl &&
                !e[i].nextEl &&
                (e[i].auto = !0),
              ["pagination", "scrollbar"].indexOf(i) >= 0 &&
                e[i] &&
                e[i].enabled &&
                !e[i].el &&
                (e[i].auto = !0),
              i in e && "enabled" in n
                ? ("object" != typeof e[i] ||
                    "enabled" in e[i] ||
                    (e[i].enabled = !0),
                  e[i] || (e[i] = { enabled: !1 }),
                  A(t, s))
                : A(t, s))
            : A(t, s);
        };
      }
      var oe = {
        slideTo: function (e = 0, t, s = !0, i, n) {
          "string" == typeof e && (e = parseInt(e, 10));
          const a = this;
          let r = e;
          r < 0 && (r = 0);
          const {
            params: l,
            snapGrid: o,
            slidesGrid: c,
            previousIndex: d,
            activeIndex: u,
            rtlTranslate: p,
            wrapperEl: h,
            enabled: m,
          } = a;
          if (
            (!m && !i && !n) ||
            a.destroyed ||
            (a.animating && l.preventInteractionOnTransition)
          )
            return !1;
          void 0 === t && (t = a.params.speed);
          const f = Math.min(a.params.slidesPerGroupSkip, r);
          let g = f + Math.floor((r - f) / a.params.slidesPerGroup);
          g >= o.length && (g = o.length - 1);
          const v = -o[g];
          if (l.normalizeSlideIndex)
            for (let e = 0; e < c.length; e += 1) {
              const t = -Math.floor(100 * v),
                s = Math.floor(100 * c[e]),
                i = Math.floor(100 * c[e + 1]);
              void 0 !== c[e + 1]
                ? t >= s && t < i - (i - s) / 2
                  ? (r = e)
                  : t >= s && t < i && (r = e + 1)
                : t >= s && (r = e);
            }
          if (a.initialized && r !== u) {
            if (
              !a.allowSlideNext &&
              (p
                ? v > a.translate && v > a.minTranslate()
                : v < a.translate && v < a.minTranslate())
            )
              return !1;
            if (
              !a.allowSlidePrev &&
              v > a.translate &&
              v > a.maxTranslate() &&
              (u || 0) !== r
            )
              return !1;
          }
          let b;
          (r !== (d || 0) && s && a.emit("beforeSlideChangeStart"),
            a.updateProgress(v),
            (b = r > u ? "next" : r < u ? "prev" : "reset"));
          const y = a.virtual && a.params.virtual?.enabled;
          if (
            !(y && n) &&
            ((p && -v === a.translate) || (!p && v === a.translate))
          )
            return (
              a.updateActiveIndex(r),
              l.autoHeight && a.updateAutoHeight(),
              a.updateSlidesClasses(),
              "slide" !== l.effect && a.setTranslate(v),
              "reset" !== b && (a.transitionStart(s, b), a.transitionEnd(s, b)),
              !1
            );
          if (l.cssMode) {
            const e = a.isHorizontal(),
              s = p ? v : -v;
            return (
              0 === t
                ? (y &&
                    ((a.wrapperEl.style.scrollSnapType = "none"),
                    (a._immediateVirtual = !0)),
                  y &&
                  !a._cssModeVirtualInitialSet &&
                  (a.params.initialSlide ?? 0) > 0
                    ? ((a._cssModeVirtualInitialSet = !0),
                      requestAnimationFrame(() => {
                        h[e ? "scrollLeft" : "scrollTop"] = s;
                      }))
                    : (h[e ? "scrollLeft" : "scrollTop"] = s),
                  y &&
                    requestAnimationFrame(() => {
                      ((a.wrapperEl.style.scrollSnapType = ""),
                        (a._immediateVirtual = !1));
                    }))
                : h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" }),
              !0
            );
          }
          const w = V().isSafari;
          return (
            y && !n && w && a.isElement && a.virtual.update(!1, !1, r),
            a.setTransition(t),
            a.setTranslate(v),
            a.updateActiveIndex(r),
            a.updateSlidesClasses(),
            a.emit("beforeTransitionStart", t, i),
            a.transitionStart(s, b),
            0 === t
              ? a.transitionEnd(s, b)
              : a.animating ||
                ((a.animating = !0),
                a.onSlideToWrapperTransitionEnd ||
                  (a.onSlideToWrapperTransitionEnd = function (e) {
                    a &&
                      !a.destroyed &&
                      e.target === this &&
                      (a.wrapperEl.removeEventListener(
                        "transitionend",
                        a.onSlideToWrapperTransitionEnd,
                      ),
                      (a.onSlideToWrapperTransitionEnd = null),
                      delete a.onSlideToWrapperTransitionEnd,
                      a.transitionEnd(s, b));
                  }),
                a.wrapperEl.addEventListener(
                  "transitionend",
                  a.onSlideToWrapperTransitionEnd,
                )),
            !0
          );
        },
        slideToLoop: function (e = 0, t, s = !0, i) {
          if ("string" == typeof e) {
            e = parseInt(e, 10);
          }
          const n = this;
          if (n.destroyed) return;
          void 0 === t && (t = n.params.speed);
          const a = n.grid && n.params.grid && n.params.grid.rows > 1;
          let r = e;
          if (n.params.loop)
            if (n.virtual && n.params.virtual?.enabled)
              r += n.virtual.slidesBefore ?? 0;
            else {
              let e;
              if (a) {
                const t = r * n.params.grid.rows,
                  s = n.slides.find(
                    (e) =>
                      Number(e.getAttribute("data-swiper-slide-index")) === t,
                  );
                e = s?.column ?? 0;
              } else e = n.getSlideIndexByData(r);
              const t = a
                  ? Math.ceil(n.slides.length / n.params.grid.rows)
                  : n.slides.length,
                {
                  centeredSlides: s,
                  slidesOffsetBefore: l,
                  slidesOffsetAfter: o,
                } = n.params,
                c = s || !!l || !!o;
              let d;
              "auto" === n.params.slidesPerView
                ? (d = n.slidesPerViewDynamic())
                : ((d = Math.ceil(parseFloat(String(n.params.slidesPerView)))),
                  c && d % 2 == 0 && (d += 1));
              let u = t - e < d;
              if (
                (c && (u = u || e < Math.ceil(d / 2)),
                i && c && "auto" !== n.params.slidesPerView && !a && (u = !1),
                u)
              ) {
                const s = c
                  ? e < n.activeIndex
                    ? "prev"
                    : "next"
                  : e - n.activeIndex - 1 < n.params.slidesPerView
                    ? "next"
                    : "prev";
                n.loopFix({
                  direction: s,
                  slideTo: !0,
                  activeSlideIndex: "next" === s ? e + 1 : e - t + 1,
                  slideRealIndex: "next" === s ? n.realIndex : void 0,
                });
              }
              if (a) {
                const e = r * n.params.grid.rows,
                  t = n.slides.find(
                    (t) =>
                      Number(t.getAttribute("data-swiper-slide-index")) === e,
                  );
                r = t?.column ?? 0;
              } else r = n.getSlideIndexByData(r);
            }
          return (
            requestAnimationFrame(() => {
              n.slideTo(r, t, s, i);
            }),
            n
          );
        },
        slideNext: function (e, t = !0, s) {
          const i = this,
            { enabled: n, params: a, animating: r } = i;
          if (!n || i.destroyed) return i;
          void 0 === e && (e = i.params.speed);
          let l = a.slidesPerGroup;
          "auto" === a.slidesPerView &&
            1 === a.slidesPerGroup &&
            a.slidesPerGroupAuto &&
            (l = Math.max(i.slidesPerViewDynamic("current", !0), 1));
          const o = i.activeIndex < a.slidesPerGroupSkip ? 1 : l,
            c = i.virtual && a.virtual?.enabled;
          if (a.loop) {
            if (r && !c && a.loopPreventsSliding) return !1;
            if (
              (i.loopFix({ direction: "next" }),
              (i._clientLeft = i.wrapperEl.clientLeft),
              i.activeIndex === i.slides.length - 1 && a.cssMode)
            )
              return (
                requestAnimationFrame(() => {
                  i.slideTo(i.activeIndex + o, e, t, s);
                }),
                !0
              );
          }
          return a.rewind && i.isEnd
            ? i.slideTo(0, e, t, s)
            : i.slideTo(i.activeIndex + o, e, t, s);
        },
        slidePrev: function (e, t = !0, s) {
          const i = this,
            {
              params: n,
              snapGrid: a,
              slidesGrid: r,
              rtlTranslate: l,
              enabled: o,
              animating: c,
            } = i;
          if (!o || i.destroyed) return i;
          void 0 === e && (e = i.params.speed);
          const d = i.virtual && n.virtual?.enabled;
          if (n.loop) {
            if (c && !d && n.loopPreventsSliding) return !1;
            (i.loopFix({ direction: "prev" }),
              (i._clientLeft = i.wrapperEl.clientLeft));
          }
          function u(e) {
            return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
          }
          const p = u(l ? i.translate : -i.translate),
            h = a.map((e) => u(e)),
            m = n.freeMode && n.freeMode.enabled;
          let f = a[h.indexOf(p) - 1];
          if (void 0 === f && (n.cssMode || m)) {
            let e;
            (a.forEach((t, s) => {
              p >= t && (e = s);
            }),
              void 0 !== e && (f = m ? a[e] : a[e > 0 ? e - 1 : e]));
          }
          let g = 0;
          if (
            (void 0 !== f &&
              ((g = r.indexOf(f)),
              g < 0 && (g = i.activeIndex - 1),
              "auto" === n.slidesPerView &&
                1 === n.slidesPerGroup &&
                n.slidesPerGroupAuto &&
                ((g = g - i.slidesPerViewDynamic("previous", !0) + 1),
                (g = Math.max(g, 0)))),
            n.rewind && i.isBeginning)
          ) {
            const n =
              i.params.virtual?.enabled && i.virtual
                ? i.virtual.slides.length - 1
                : i.slides.length - 1;
            return i.slideTo(n, e, t, s);
          }
          return n.loop && 0 === i.activeIndex && n.cssMode
            ? (requestAnimationFrame(() => {
                i.slideTo(g, e, t, s);
              }),
              !0)
            : i.slideTo(g, e, t, s);
        },
        slideReset: function (e, t = !0, s) {
          const i = this;
          if (!i.destroyed)
            return (
              void 0 === e && (e = i.params.speed),
              i.slideTo(i.activeIndex, e, t, s)
            );
        },
        slideToClosest: function (e, t = !0, s, i = 0.5) {
          const n = this;
          if (n.destroyed) return;
          void 0 === e && (e = n.params.speed);
          let a = n.activeIndex;
          const r = Math.min(n.params.slidesPerGroupSkip, a),
            l = r + Math.floor((a - r) / n.params.slidesPerGroup),
            o = n.rtlTranslate ? n.translate : -n.translate;
          if (o >= n.snapGrid[l]) {
            const e = n.snapGrid[l];
            o - e > (n.snapGrid[l + 1] - e) * i &&
              (a += n.params.slidesPerGroup);
          } else {
            const e = n.snapGrid[l - 1];
            o - e <= (n.snapGrid[l] - e) * i && (a -= n.params.slidesPerGroup);
          }
          return (
            (a = Math.max(a, 0)),
            (a = Math.min(a, n.slidesGrid.length - 1)),
            n.slideTo(a, e, t, s)
          );
        },
        slideToClickedSlide: function () {
          const e = this;
          if (e.destroyed) return;
          const {
            params: t,
            slidesEl: s,
            clickedSlide: i,
            clickedIndex: n,
          } = e;
          if (void 0 === i || void 0 === n) return;
          const a =
            "auto" === t.slidesPerView
              ? e.slidesPerViewDynamic()
              : t.slidesPerView;
          let r,
            l = e.getSlideIndexWhenGrid(n);
          const o = e.isElement ? "swiper-slide" : `.${t.slideClass}`,
            c = e.grid && e.params.grid && e.params.grid.rows > 1;
          if (t.loop) {
            if (e.animating) return;
            ((r = parseInt(i.getAttribute("data-swiper-slide-index"), 10)),
              t.centeredSlides
                ? e.slideToLoop(r)
                : l >
                    (c
                      ? (e.slides.length - a) / 2 - (e.params.grid.rows - 1)
                      : e.slides.length - a)
                  ? (e.loopFix(),
                    (l = e.getSlideIndex(
                      _(s, `${o}[data-swiper-slide-index="${r}"]`)[0],
                    )),
                    S(() => {
                      e.slideTo(l);
                    }))
                  : e.slideTo(l));
          } else e.slideTo(l);
        },
      };
      function ce({ swiper: e, runCallbacks: t, direction: s, step: i }) {
        const { activeIndex: n, previousIndex: a } = e;
        let r = s;
        (r || (r = n > a ? "next" : n < a ? "prev" : "reset"),
          e.emit(`transition${i}`),
          t && "reset" === r
            ? e.emit(`slideResetTransition${i}`)
            : t &&
              n !== a &&
              (e.emit(`slideChangeTransition${i}`),
              "next" === r
                ? e.emit(`slideNextTransition${i}`)
                : e.emit(`slidePrevTransition${i}`)));
      }
      var de = {
        getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
          const {
            params: t,
            rtlTranslate: s,
            translate: i,
            wrapperEl: n,
          } = this;
          if (t.virtualTranslate) return s ? -i : i;
          if (t.cssMode) return i;
          let a = x(n, e);
          return ((a += this.cssOverflowAdjustment()), s && (a = -a), a || 0);
        },
        setTranslate: function (e, t) {
          const s = this,
            { rtlTranslate: i, params: n, wrapperEl: a, progress: r } = s;
          let l,
            o = 0,
            c = 0;
          (s.isHorizontal() ? (o = i ? -e : e) : (c = e),
            n.roundLengths && ((o = Math.floor(o)), (c = Math.floor(c))),
            (s.previousTranslate = s.translate),
            (s.translate = s.isHorizontal() ? o : c),
            n.cssMode
              ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  s.isHorizontal() ? -o : -c)
              : n.virtualTranslate ||
                (s.isHorizontal()
                  ? (o -= s.cssOverflowAdjustment())
                  : (c -= s.cssOverflowAdjustment()),
                (a.style.transform = `translate3d(${o}px, ${c}px, 0px)`)));
          const d = s.maxTranslate() - s.minTranslate();
          ((l = 0 === d ? 0 : (e - s.minTranslate()) / d),
            l !== r && s.updateProgress(e),
            s.emit("setTranslate", s.translate, t));
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (
          e = 0,
          t = this.params.speed,
          s = !0,
          i = !0,
          n,
        ) {
          const a = this,
            { params: r, wrapperEl: l } = a;
          if (a.animating && r.preventInteractionOnTransition) return !1;
          const o = a.minTranslate(),
            c = a.maxTranslate();
          let d;
          if (
            ((d = i && e > o ? o : i && e < c ? c : e),
            a.updateProgress(d),
            r.cssMode)
          ) {
            const e = a.isHorizontal();
            return (
              0 === t
                ? (l[e ? "scrollLeft" : "scrollTop"] = -d)
                : l.scrollTo({ [e ? "left" : "top"]: -d, behavior: "smooth" }),
              !0
            );
          }
          return (
            0 === t
              ? (a.setTransition(0),
                a.setTranslate(d),
                s &&
                  (a.emit("beforeTransitionStart", t, n),
                  a.emit("transitionEnd")))
              : (a.setTransition(t),
                a.setTranslate(d),
                s &&
                  (a.emit("beforeTransitionStart", t, n),
                  a.emit("transitionStart")),
                a.animating ||
                  ((a.animating = !0),
                  a.onTranslateToWrapperTransitionEnd ||
                    (a.onTranslateToWrapperTransitionEnd = function (e) {
                      a &&
                        !a.destroyed &&
                        e.target === this &&
                        (a.wrapperEl.removeEventListener(
                          "transitionend",
                          a.onTranslateToWrapperTransitionEnd,
                        ),
                        (a.onTranslateToWrapperTransitionEnd = null),
                        delete a.onTranslateToWrapperTransitionEnd,
                        (a.animating = !1),
                        s && a.emit("transitionEnd"));
                    }),
                  a.wrapperEl.addEventListener(
                    "transitionend",
                    a.onTranslateToWrapperTransitionEnd,
                  ))),
            !0
          );
        },
      };
      const ue = (e, t, s) => {
        t && !e.classList.contains(s)
          ? e.classList.add(s)
          : !t && e.classList.contains(s) && e.classList.remove(s);
      };
      const pe = (e, t, s) => {
        t && !e.classList.contains(s)
          ? e.classList.add(s)
          : !t && e.classList.contains(s) && e.classList.remove(s);
      };
      var he = {
        updateSize: function () {
          const e = this;
          let t, s;
          const i = e.el;
          ((t =
            void 0 !== e.params.width && null !== e.params.width
              ? e.params.width
              : i.clientWidth),
            (s =
              void 0 !== e.params.height && null !== e.params.height
                ? e.params.height
                : i.clientHeight),
            (0 === t && e.isHorizontal()) ||
              (0 === s && e.isVertical()) ||
              ((t =
                t -
                parseInt(P(i, "padding-left") || "0", 10) -
                parseInt(P(i, "padding-right") || "0", 10)),
              (s =
                s -
                parseInt(P(i, "padding-top") || "0", 10) -
                parseInt(P(i, "padding-bottom") || "0", 10)),
              Number.isNaN(t) && (t = 0),
              Number.isNaN(s) && (s = 0),
              Object.assign(e, {
                width: t,
                height: s,
                size: e.isHorizontal() ? t : s,
              })));
        },
        updateSlides: function () {
          const e = this;
          function t(t, s) {
            return parseFloat(
              t.getPropertyValue(e.getDirectionLabel(s)) || "0",
            );
          }
          const s = e.params,
            { wrapperEl: i, slidesEl: n, rtlTranslate: a, wrongRTL: r } = e,
            l = !(!e.virtual || !s.virtual?.enabled),
            o = l ? e.virtual.slides.length : e.slides.length,
            c = _(n, `.${e.params.slideClass}, swiper-slide`),
            d = l ? e.virtual.slides.length : c.length;
          let u = [];
          const p = [],
            h = [],
            m = (t) => ("function" == typeof t ? t.call(e) : t),
            f = m(s.slidesOffsetBefore),
            g = m(s.slidesOffsetAfter),
            v = e.snapGrid.length,
            b = e.slidesGrid.length,
            y = e.size - f - g;
          let w = s.spaceBetween,
            S = -f,
            E = 0,
            x = 0;
          if (void 0 === y) return;
          ("string" == typeof w && w.indexOf("%") >= 0
            ? (w = (parseFloat(w.replace("%", "")) / 100) * y)
            : "string" == typeof w && (w = parseFloat(w)),
            (e.virtualSize = -w - f - g),
            c.forEach((e) => {
              (a ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
                (e.style.marginBottom = ""),
                (e.style.marginTop = ""));
            }),
            s.centeredSlides &&
              s.cssMode &&
              (L(i, "--swiper-centered-offset-before", ""),
              L(i, "--swiper-centered-offset-after", "")),
            s.cssMode &&
              (L(i, "--swiper-slides-offset-before", `${f}px`),
              L(i, "--swiper-slides-offset-after", `${g}px`)));
          const T = s.grid && s.grid.rows > 1 && e.grid;
          T ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
          let C = 0;
          const A =
            "auto" === s.slidesPerView &&
            s.breakpoints &&
            Object.keys(s.breakpoints).filter((e) => {
              const t = s.breakpoints[e];
              return void 0 !== t?.slidesPerView;
            }).length > 0;
          for (let i = 0; i < d; i += 1) {
            C = 0;
            const n = c[i];
            if (
              !n ||
              (T && e.grid.updateSlide(i, n, c), "none" !== P(n, "display"))
            ) {
              if (l && "auto" === s.slidesPerView)
                (s.virtual?.slidesPerViewAutoSlideSize &&
                  (C = s.virtual.slidesPerViewAutoSlideSize),
                  C &&
                    n &&
                    (s.roundLengths && (C = Math.floor(C)),
                    (n.style[e.getDirectionLabel("width")] = `${C}px`)));
              else if ("auto" === s.slidesPerView) {
                A && (n.style[e.getDirectionLabel("width")] = "");
                const i = getComputedStyle(n),
                  a = n.style.transform,
                  r = n.style.webkitTransform;
                if (
                  (a && (n.style.transform = "none"),
                  r && (n.style.webkitTransform = "none"),
                  s.roundLengths)
                )
                  C = e.isHorizontal() ? D(n, "width") : D(n, "height");
                else {
                  const e = t(i, "width"),
                    s = t(i, "padding-left"),
                    a = t(i, "padding-right"),
                    r = t(i, "margin-left"),
                    l = t(i, "margin-right"),
                    o = i.getPropertyValue("box-sizing");
                  if (o && "border-box" === o) C = e + r + l;
                  else {
                    const { clientWidth: t, offsetWidth: i } = n;
                    C = e + s + a + r + l + (i - t);
                  }
                }
                (a && (n.style.transform = a),
                  r && (n.style.webkitTransform = r),
                  s.roundLengths && (C = Math.floor(C)));
              } else
                ((C = (y - (s.slidesPerView - 1) * w) / s.slidesPerView),
                  s.roundLengths && (C = Math.floor(C)),
                  n && (n.style[e.getDirectionLabel("width")] = `${C}px`));
              (n && (n.swiperSlideSize = C),
                h.push(C),
                s.centeredSlides
                  ? ((S = S + C / 2 + E / 2 + w),
                    0 === E && 0 !== i && (S = S - y / 2 - w),
                    0 === i && (S = S - y / 2 - w),
                    Math.abs(S) < 0.001 && (S = 0),
                    s.roundLengths && (S = Math.floor(S)),
                    x % s.slidesPerGroup === 0 && u.push(S),
                    p.push(S))
                  : (s.roundLengths && (S = Math.floor(S)),
                    (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                      e.params.slidesPerGroup ===
                      0 && u.push(S),
                    p.push(S),
                    (S = S + C + w)),
                (e.virtualSize += C + w),
                (E = C),
                (x += 1));
            }
          }
          if (
            ((e.virtualSize = Math.max(e.virtualSize, y) + g),
            a &&
              r &&
              ("slide" === s.effect || "coverflow" === s.effect) &&
              (i.style.width = `${e.virtualSize + w}px`),
            s.setWrapperSize &&
              (i.style[e.getDirectionLabel("width")] =
                `${e.virtualSize + w}px`),
            T && e.grid.updateWrapperSize(C, u),
            !s.centeredSlides)
          ) {
            const t = "auto" !== s.slidesPerView && s.slidesPerView % 1 != 0,
              i =
                s.snapToSlideEdge &&
                !s.loop &&
                ("auto" === s.slidesPerView || t);
            let n = u.length;
            if (i) {
              let e;
              if ("auto" === s.slidesPerView) {
                e = 1;
                let t = 0;
                for (
                  let s = h.length - 1;
                  s >= 0 && ((t += h[s] + (s < h.length - 1 ? w : 0)), t <= y);
                  s -= 1
                )
                  e = h.length - s;
              } else e = Math.floor(s.slidesPerView);
              n = Math.max(d - e, 0);
            }
            const a = [];
            for (let t = 0; t < u.length; t += 1) {
              let r = u[t];
              (s.roundLengths && (r = Math.floor(r)),
                i
                  ? t <= n && a.push(r)
                  : u[t] <= e.virtualSize - y && a.push(r));
            }
            ((u = a),
              Math.floor(e.virtualSize - y) - Math.floor(u[u.length - 1]) > 1 &&
                (i || u.push(e.virtualSize - y)));
          }
          if (l && s.loop) {
            const t = h[0] + w,
              i = (e.virtual.slidesBefore ?? 0) + (e.virtual.slidesAfter ?? 0);
            if (s.slidesPerGroup > 1) {
              const e = Math.ceil(i / s.slidesPerGroup),
                n = t * s.slidesPerGroup;
              for (let t = 0; t < e; t += 1) u.push(u[u.length - 1] + n);
            }
            for (let n = 0; n < i; n += 1)
              (1 === s.slidesPerGroup && u.push(u[u.length - 1] + t),
                p.push(p[p.length - 1] + t),
                (e.virtualSize += t));
          }
          if ((0 === u.length && (u = [0]), 0 !== w)) {
            const t =
              e.isHorizontal() && a
                ? "marginLeft"
                : e.getDirectionLabel("marginRight");
            c.filter(
              (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1,
            ).forEach((e) => {
              e.style[t] = `${w}px`;
            });
          }
          if (s.centeredSlides && s.centeredSlidesBounds) {
            let e = 0;
            (h.forEach((t) => {
              e += t + (w || 0);
            }),
              (e -= w));
            const t = e > y ? e - y : 0;
            u = u.map((e) => (e <= 0 ? -f : e > t ? t + g : e));
          }
          if (s.centerInsufficientSlides) {
            let e = 0;
            if (
              (h.forEach((t) => {
                e += t + (w || 0);
              }),
              (e -= w),
              e < y)
            ) {
              const t = (y - e) / 2;
              (u.forEach((e, s) => {
                u[s] = e - t;
              }),
                p.forEach((e, s) => {
                  p[s] = e + t;
                }));
            }
          }
          if (
            (Object.assign(e, {
              slides: c,
              snapGrid: u,
              slidesGrid: p,
              slidesSizesGrid: h,
            }),
            s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
          ) {
            (L(i, "--swiper-centered-offset-before", -u[0] + "px"),
              L(
                i,
                "--swiper-centered-offset-after",
                e.size / 2 - h[h.length - 1] / 2 + "px",
              ));
            const t = -e.snapGrid[0],
              s = -e.slidesGrid[0];
            ((e.snapGrid = e.snapGrid.map((e) => e + t)),
              (e.slidesGrid = e.slidesGrid.map((e) => e + s)));
          }
          if (
            (d !== o && e.emit("slidesLengthChange"),
            u.length !== v &&
              (e.params.watchOverflow && e.checkOverflow(),
              e.emit("snapGridLengthChange")),
            p.length !== b && e.emit("slidesGridLengthChange"),
            s.watchSlidesProgress && e.updateSlidesOffset(),
            e.emit("slidesUpdated"),
            !(l || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
          ) {
            const t = `${s.containerModifierClass}backface-hidden`,
              i = e.el.classList.contains(t);
            d <= s.maxBackfaceHiddenSlides
              ? i || e.el.classList.add(t)
              : i && e.el.classList.remove(t);
          }
        },
        updateAutoHeight: function (e) {
          const t = this,
            s = [],
            i = t.virtual && t.params.virtual?.enabled;
          let n,
            a = 0;
          "number" == typeof e
            ? t.setTransition(e)
            : !0 === e && t.setTransition(t.params.speed);
          const r = (e) =>
            i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
          if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
            if (t.params.centeredSlides)
              (t.visibleSlides || []).forEach((e) => {
                s.push(e);
              });
            else
              for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
                const e = t.activeIndex + n;
                if (e > t.slides.length && !i) break;
                const a = r(e);
                a && s.push(a);
              }
          else {
            const e = r(t.activeIndex);
            e && s.push(e);
          }
          for (n = 0; n < s.length; n += 1)
            if (void 0 !== s[n]) {
              const e = s[n].offsetHeight;
              a = e > a ? e : a;
            }
          (a || 0 === a) && (t.wrapperEl.style.height = `${a}px`);
        },
        updateSlidesOffset: function () {
          const e = this,
            t = e.slides,
            s = e.isElement
              ? e.isHorizontal()
                ? e.wrapperEl.offsetLeft
                : e.wrapperEl.offsetTop
              : 0;
          for (let i = 0; i < t.length; i += 1)
            t[i].swiperSlideOffset =
              (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) -
              s -
              e.cssOverflowAdjustment();
        },
        updateSlidesProgress: function (e = (this && this.translate) || 0) {
          const t = this,
            s = t.params,
            { slides: i, rtlTranslate: n, snapGrid: a } = t;
          if (0 === i.length) return;
          void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
          let r = -e;
          (n && (r = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []));
          let l = s.spaceBetween;
          "string" == typeof l && l.indexOf("%") >= 0
            ? (l = (parseFloat(l.replace("%", "")) / 100) * t.size)
            : "string" == typeof l && (l = parseFloat(l));
          for (let e = 0; e < i.length; e += 1) {
            const o = i[e];
            let c = o.swiperSlideOffset ?? 0;
            s.cssMode && s.centeredSlides && (c -= i[0].swiperSlideOffset ?? 0);
            const d = o.swiperSlideSize ?? 0,
              u = (r + (s.centeredSlides ? t.minTranslate() : 0) - c) / (d + l),
              p =
                (r - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - c) /
                (d + l),
              h = -(r - c),
              m = h + t.slidesSizesGrid[e],
              f = h >= 0 && h <= t.size - t.slidesSizesGrid[e],
              g =
                (h >= 0 && h < t.size - 1) ||
                (m > 1 && m <= t.size) ||
                (h <= 0 && m >= t.size);
            (g && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e)),
              pe(o, g, s.slideVisibleClass),
              pe(o, f, s.slideFullyVisibleClass),
              (o.progress = n ? -u : u),
              (o.originalProgress = n ? -p : p));
          }
        },
        updateProgress: function (e) {
          const t = this;
          if (void 0 === e) {
            const s = t.rtlTranslate ? -1 : 1;
            e = (t && t.translate && t.translate * s) || 0;
          }
          const s = t.params,
            i = t.maxTranslate() - t.minTranslate();
          let { progress: n, isBeginning: a, isEnd: r } = t,
            l = t.progressLoop;
          const o = a,
            c = r;
          if (0 === i) ((n = 0), (a = !0), (r = !0));
          else {
            n = (e - t.minTranslate()) / i;
            const s = Math.abs(e - t.minTranslate()) < 1,
              l = Math.abs(e - t.maxTranslate()) < 1;
            ((a = s || n <= 0), (r = l || n >= 1), s && (n = 0), l && (n = 1));
          }
          if (s.loop) {
            const s = t.getSlideIndexByData(0),
              i = t.getSlideIndexByData(t.slides.length - 1),
              n = t.slidesGrid[s],
              a = t.slidesGrid[i],
              r = t.slidesGrid[t.slidesGrid.length - 1],
              o = Math.abs(e);
            ((l = o >= n ? (o - n) / r : (o + r - a) / r), l > 1 && (l -= 1));
          }
          (Object.assign(t, {
            progress: n,
            progressLoop: l,
            isBeginning: a,
            isEnd: r,
          }),
            (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
              t.updateSlidesProgress(e),
            a && !o && t.emit("reachBeginning toEdge"),
            r && !c && t.emit("reachEnd toEdge"),
            ((o && !a) || (c && !r)) && t.emit("fromEdge"),
            t.emit("progress", n));
        },
        updateSlidesClasses: function () {
          const e = this,
            { slides: t, params: s, slidesEl: i, activeIndex: n } = e,
            a = !(!e.virtual || !s.virtual?.enabled),
            r = e.grid && s.grid && s.grid.rows > 1,
            l = (e) => _(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
          let o, c, d;
          if (a)
            if (s.loop) {
              const t = e.virtual.slides;
              let s = n - (e.virtual.slidesBefore ?? 0);
              (s < 0 && (s = t.length + s),
                s >= t.length && (s -= t.length),
                (o = l(`[data-swiper-slide-index="${s}"]`)));
            } else o = l(`[data-swiper-slide-index="${n}"]`);
          else
            r
              ? ((o = t.find((e) => e.column === n)),
                (d = t.find((e) => e.column === n + 1)),
                (c = t.find((e) => e.column === n - 1)))
              : (o = t[n]);
          (o &&
            (r ||
              ((d = (function (e, t) {
                const s = [];
                let i = e.nextElementSibling;
                for (; i;)
                  ((t && !i.matches(t)) || s.push(i),
                    (i = i.nextElementSibling));
                return s;
              })(o, `.${s.slideClass}, swiper-slide`)[0]),
              s.loop && !d && (d = t[0]),
              (c = (function (e, t) {
                const s = [];
                let i = e.previousElementSibling;
                for (; i;)
                  ((t && !i.matches(t)) || s.push(i),
                    (i = i.previousElementSibling));
                return s;
              })(o, `.${s.slideClass}, swiper-slide`)[0]),
              s.loop && 0 === !c && (c = t[t.length - 1]))),
            t.forEach((e) => {
              (ue(e, e === o, s.slideActiveClass),
                ue(e, e === d, s.slideNextClass),
                ue(e, e === c, s.slidePrevClass));
            }),
            e.emitSlidesClasses());
        },
        updateActiveIndex: function (e) {
          const t = this,
            s = t.rtlTranslate ? t.translate : -t.translate,
            {
              snapGrid: i,
              params: n,
              activeIndex: a,
              realIndex: r,
              snapIndex: l,
            } = t;
          let o,
            c = e;
          const d = (e) => {
            const s = t.virtual.slides;
            let i = e - (t.virtual.slidesBefore ?? 0);
            return (
              i < 0 && (i = s.length + i),
              i >= s.length && (i -= s.length),
              i
            );
          };
          if (
            (void 0 === c &&
              (c = (function (e) {
                const { slidesGrid: t, params: s } = e,
                  i = e.rtlTranslate ? e.translate : -e.translate;
                let n;
                for (let e = 0; e < t.length; e += 1)
                  void 0 !== t[e + 1]
                    ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                      ? (n = e)
                      : i >= t[e] && i < t[e + 1] && (n = e + 1)
                    : i >= t[e] && (n = e);
                return (
                  s.normalizeSlideIndex && (n < 0 || void 0 === n) && (n = 0),
                  n
                );
              })(t)),
            i.indexOf(s) >= 0)
          )
            o = i.indexOf(s);
          else {
            const e = Math.min(n.slidesPerGroupSkip, c);
            o = e + Math.floor((c - e) / n.slidesPerGroup);
          }
          if ((o >= i.length && (o = i.length - 1), c === a && !t.params.loop))
            return void (
              o !== l && ((t.snapIndex = o), t.emit("snapIndexChange"))
            );
          if (
            c === a &&
            t.params.loop &&
            t.virtual &&
            t.params.virtual?.enabled
          )
            return void (t.realIndex = d(c));
          const u = t.grid && n.grid && n.grid.rows > 1;
          let p;
          if (t.virtual && n.virtual?.enabled) p = n.loop ? d(c) : c;
          else if (u) {
            const e = t.slides.find((e) => e.column === c);
            let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
            (Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
              (p = Math.floor(s / n.grid.rows)));
          } else if (t.slides[c]) {
            const e = t.slides[c].getAttribute("data-swiper-slide-index");
            p = e ? parseInt(e, 10) : c;
          } else p = c;
          (Object.assign(t, {
            previousSnapIndex: l,
            snapIndex: o,
            previousRealIndex: r,
            realIndex: p,
            previousIndex: a,
            activeIndex: c,
          }),
            t.initialized && W(t),
            t.__loopFixInProgress__ ||
              (t.emit("activeIndexChange"),
              t.emit("snapIndexChange"),
              (t.initialized || t.params.runCallbacksOnInit) &&
                ((t.__lastEmittedRealIndex__ ?? r) !== p &&
                  t.emit("realIndexChange"),
                t.emit("slideChange")),
              (t.__lastEmittedRealIndex__ = p)));
        },
        updateClickedSlide: function (e, t) {
          const s = this,
            i = s.params;
          let n = e.closest(`.${i.slideClass}, swiper-slide`);
          !n &&
            s.isElement &&
            t &&
            t.length > 1 &&
            t.includes(e) &&
            [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
              !n &&
                e.matches &&
                e.matches(`.${i.slideClass}, swiper-slide`) &&
                (n = e);
            });
          let a,
            r = !1;
          if (n)
            for (let e = 0; e < s.slides.length; e += 1)
              if (s.slides[e] === n) {
                ((r = !0), (a = e));
                break;
              }
          if (!n || !r)
            return ((s.clickedSlide = void 0), void (s.clickedIndex = void 0));
          ((s.clickedSlide = n),
            s.virtual && s.params.virtual?.enabled
              ? (s.clickedIndex = parseInt(
                  n.getAttribute("data-swiper-slide-index"),
                  10,
                ))
              : (s.clickedIndex = a),
            i.slideToClickedSlide &&
              void 0 !== s.clickedIndex &&
              s.clickedIndex !== s.activeIndex &&
              s.slideToClickedSlide());
        },
      };
      const me = {
          eventsEmitter: U,
          update: he,
          translate: de,
          transition: {
            setTransition: function (e, t) {
              const s = this;
              (s.params.cssMode ||
                ((s.wrapperEl.style.transitionDuration = `${e}ms`),
                (s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : "")),
                s.emit("setTransition", e, t));
            },
            transitionStart: function (e = !0, t) {
              const s = this,
                { params: i } = s;
              i.cssMode ||
                (i.autoHeight && s.updateAutoHeight(),
                ce({
                  swiper: s,
                  runCallbacks: e,
                  direction: t,
                  step: "Start",
                }));
            },
            transitionEnd: function (e = !0, t) {
              const s = this,
                { params: i } = s;
              ((s.animating = !1),
                i.cssMode ||
                  (s.setTransition(0),
                  ce({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "End",
                  })));
            },
          },
          slide: oe,
          loop: re,
          grabCursor: {
            setGrabCursor: function (e) {
              const t = this;
              if (
                !t.params.simulateTouch ||
                (t.params.watchOverflow && t.isLocked) ||
                t.params.cssMode
              )
                return;
              const s =
                "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
              (t.isElement && (t.__preventObserver__ = !0),
                (s.style.cursor = "move"),
                (s.style.cursor = e ? "grabbing" : "grab"),
                t.isElement &&
                  requestAnimationFrame(() => {
                    t.__preventObserver__ = !1;
                  }));
            },
            unsetGrabCursor: function () {
              const e = this;
              (e.params.watchOverflow && e.isLocked) ||
                e.params.cssMode ||
                (e.isElement && (e.__preventObserver__ = !0),
                (e[
                  "container" === e.params.touchEventsTarget
                    ? "el"
                    : "wrapperEl"
                ].style.cursor = ""),
                e.isElement &&
                  requestAnimationFrame(() => {
                    e.__preventObserver__ = !1;
                  }));
            },
          },
          events: {
            attachEvents: function () {
              const e = this,
                { params: t } = e;
              ((e.onTouchStart = ne.bind(e)),
                (e.onTouchMove = se.bind(e)),
                (e.onTouchEnd = te.bind(e)),
                (e.onDocumentTouchStart = J.bind(e)),
                t.cssMode && (e.onScroll = ee.bind(e)),
                (e.onClick = Q.bind(e)),
                (e.onLoad = Z.bind(e)),
                ae(e, "on"));
            },
            detachEvents: function () {
              ae(this, "off");
            },
          },
          breakpoints: F,
          checkOverflow: j,
          classes: Y,
        },
        fe = {};
      class ge {
        static extendedDefaults;
        static defaults;
        constructor(...e) {
          let t, s;
          if (
            (1 === e.length &&
            null !== e[0] &&
            "object" == typeof e[0] &&
            "Object" === Object.prototype.toString.call(e[0]).slice(8, -1)
              ? (s = e[0])
              : ([t, s] = e),
            s || (s = {}),
            (s = A({}, s)),
            t && !s.el && (s.el = t),
            s.el &&
              "string" == typeof s.el &&
              "undefined" != typeof document &&
              document.querySelectorAll(s.el).length > 1)
          ) {
            const e = [];
            return (
              document.querySelectorAll(s.el).forEach((t) => {
                const i = A({}, s, { el: t });
                e.push(new ge(i));
              }),
              e
            );
          }
          const i = this;
          ((i.__swiper__ = !0),
            (i.support = q()),
            (i.device = B({ userAgent: s.userAgent ?? void 0 })),
            (i.browser = V()),
            (i.eventsListeners = {}),
            (i.eventsAnyListeners = []),
            (i.modules = [...(i.__modules__ || [])]),
            s.modules &&
              Array.isArray(s.modules) &&
              s.modules.forEach((e) => {
                const t = e;
                "function" == typeof t &&
                  i.modules.indexOf(t) < 0 &&
                  i.modules.push(t);
              }));
          const n = {};
          i.modules.forEach((e) => {
            e({
              params: s,
              swiper: i,
              extendParams: le(s, n),
              on: i.on.bind(i),
              once: i.once.bind(i),
              off: i.off.bind(i),
              emit: i.emit.bind(i),
            });
          });
          const a = A({}, X, n);
          if (
            ((i.params = A({}, a, fe, s)),
            (i.originalParams = A({}, i.params)),
            (i.passedParams = A({}, s)),
            i.params && i.params.on)
          ) {
            const e = i.params.on;
            Object.keys(e).forEach((t) => {
              const s = e[t];
              s && i.on(t, s);
            });
          }
          return (
            i.params && i.params.onAny && i.onAny(i.params.onAny),
            Object.assign(i, {
              enabled: i.params.enabled,
              el: t,
              classNames: [],
              slides: [],
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === i.params.direction,
              isVertical: () => "vertical" === i.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              cssOverflowAdjustment() {
                return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
              },
              allowSlideNext: i.params.allowSlideNext,
              allowSlidePrev: i.params.allowSlidePrev,
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: i.params.focusableElements,
                lastClickTime: 0,
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                startMoving: void 0,
                pointerId: null,
                touchId: null,
              },
              allowClick: !0,
              allowTouchMove: i.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            i.emit("_swiper"),
            i.params.init && i.init(),
            i
          );
        }
        getDirectionLabel(e) {
          return this.isHorizontal()
            ? e
            : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom",
              }[e];
        }
        isHorizontal() {
          return "horizontal" === this.params.direction;
        }
        isVertical() {
          return "vertical" === this.params.direction;
        }
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        }
        getSlideIndex(e) {
          const { slidesEl: t, params: s } = this,
            i = I(_(t, `.${s.slideClass}, swiper-slide`)[0]);
          return I(e) - (i ?? 0);
        }
        getSlideIndexByData(e) {
          return this.getSlideIndex(
            this.slides.find(
              (t) => Number(t.getAttribute("data-swiper-slide-index")) === e,
            ),
          );
        }
        getSlideIndexWhenGrid(e) {
          return (
            this.grid &&
              this.params.grid &&
              this.params.grid.rows > 1 &&
              ("column" === this.params.grid.fill
                ? (e = Math.floor(e / this.params.grid.rows))
                : "row" === this.params.grid.fill &&
                  (e %= Math.ceil(this.slides.length / this.params.grid.rows))),
            e
          );
        }
        recalcSlides() {
          const { slidesEl: e, params: t } = this;
          this.slides = _(e, `.${t.slideClass}, swiper-slide`);
        }
        enable() {
          this.enabled ||
            ((this.enabled = !0),
            this.params.grabCursor && this.setGrabCursor(),
            this.emit("enable"));
        }
        disable() {
          this.enabled &&
            ((this.enabled = !1),
            this.params.grabCursor && this.unsetGrabCursor(),
            this.emit("disable"));
        }
        setProgress(e, t) {
          e = Math.min(Math.max(e, 0), 1);
          const s = this.minTranslate(),
            i = (this.maxTranslate() - s) * e + s;
          (this.translateTo(i, void 0 === t ? 0 : t),
            this.updateActiveIndex(),
            this.updateSlidesClasses());
        }
        emitContainerClasses() {
          if (!this.params._emitClasses || !this.el) return;
          const e = this.el.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper") ||
                0 === e.indexOf(this.params.containerModifierClass),
            );
          this.emit("_containerClasses", e.join(" "));
        }
        getSlideClasses(e) {
          return this.destroyed
            ? ""
            : e.className
                .split(" ")
                .filter(
                  (e) =>
                    0 === e.indexOf("swiper-slide") ||
                    0 === e.indexOf(this.params.slideClass),
                )
                .join(" ");
        }
        emitSlidesClasses() {
          if (!this.params._emitClasses || !this.el) return;
          const e = [];
          (this.slides.forEach((t) => {
            const s = this.getSlideClasses(t);
            (e.push({ slideEl: t, classNames: s }),
              this.emit("_slideClass", t, s));
          }),
            this.emit("_slideClasses", e));
        }
        slidesPerViewDynamic(e = "current", t = !1) {
          const {
            params: s,
            slides: i,
            slidesGrid: n,
            slidesSizesGrid: a,
            size: r,
            activeIndex: l,
          } = this;
          let o = 1;
          if ("number" == typeof s.slidesPerView) return s.slidesPerView;
          if (!r) return o;
          if (s.centeredSlides) {
            let e = i[l] ? Math.ceil(i[l].swiperSlideSize ?? 0) : 0,
              t = !1;
            for (let s = l + 1; s < i.length; s += 1)
              i[s] &&
                !t &&
                ((e += Math.ceil(i[s].swiperSlideSize ?? 0)),
                (o += 1),
                e > r && (t = !0));
            for (let s = l - 1; s >= 0; s -= 1)
              i[s] &&
                !t &&
                ((e += i[s].swiperSlideSize ?? 0), (o += 1), e > r && (t = !0));
          } else if ("current" === e)
            for (let e = l + 1; e < i.length; e += 1) {
              (t ? n[e] + a[e] - n[l] < r : n[e] - n[l] < r) && (o += 1);
            }
          else
            for (let e = l - 1; e >= 0; e -= 1) {
              n[l] - n[e] < r && (o += 1);
            }
          return o;
        }
        update() {
          const e = this;
          if (!e || e.destroyed) return;
          const { snapGrid: t, params: s } = e;
          function i() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate,
              s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            (e.setTranslate(s), e.updateActiveIndex(), e.updateSlidesClasses());
          }
          let n;
          if (
            (s.breakpoints && e.setBreakpoint(),
            s.lazyPreload &&
              [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
                t.complete && H(e, t);
              }),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            s.freeMode?.enabled && !s.cssMode)
          )
            (i(), s.autoHeight && e.updateAutoHeight());
          else {
            if (
              ("auto" === s.slidesPerView || s.slidesPerView > 1) &&
              e.isEnd &&
              !s.centeredSlides
            ) {
              const t =
                e.virtual && s.virtual?.enabled
                  ? e.virtual.slides.length
                  : e.slides.length;
              n = e.slideTo(t - 1, 0, !1, !0);
            } else n = e.slideTo(e.activeIndex, 0, !1, !0);
            n || i();
          }
          (s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update"));
        }
        changeDirection(e, t = !0) {
          const s = this,
            i = s.params.direction;
          return (
            e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i ||
              ("horizontal" !== e && "vertical" !== e) ||
              (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
              s.el.classList.add(`${s.params.containerModifierClass}${e}`),
              s.emitContainerClasses(),
              (s.params.direction = e),
              (s.rtlTranslate = "horizontal" === e && s.rtl),
              s.slides.forEach((t) => {
                "vertical" === e ? (t.style.width = "") : (t.style.height = "");
              }),
              s.emit("changeDirection"),
              t && s.update()),
            s
          );
        }
        changeLanguageDirection(e) {
          const t = this;
          (t.rtl && "rtl" === e) ||
            (!t.rtl && "ltr" === e) ||
            ((t.rtl = "rtl" === e),
            (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl),
            t.rtl
              ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
                (t.el.dir = "rtl"))
              : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
                (t.el.dir = "ltr")),
            t.update());
        }
        mount(e) {
          const t = this;
          if (t.mounted) return !0;
          if ("undefined" == typeof document) return !1;
          const s = e ?? t.params.el;
          let i = null;
          if (
            ("string" == typeof s
              ? (i = document.querySelector(s))
              : s instanceof HTMLElement && (i = s),
            !i)
          )
            return !1;
          i.swiper = t;
          const n = i.parentNode;
          n &&
            n.host &&
            n.host.nodeName === t.params.swiperElementNodeName.toUpperCase() &&
            (t.isElement = !0);
          const a = () =>
            `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
          let r = (() => {
            if (i && i.shadowRoot) {
              return i.shadowRoot.querySelector(a());
            }
            return _(i, a())[0];
          })();
          !r &&
            t.params.createElements &&
            ((r = k("div", t.params.wrapperClass)),
            i.append(r),
            _(i, `.${t.params.slideClass}`).forEach((e) => {
              r.append(e);
            }));
          const l = t.isElement ? i.parentNode.host : null;
          return (
            Object.assign(t, {
              el: i,
              wrapperEl: r,
              slidesEl: t.isElement && !l.slideSlots ? l : r,
              hostEl: t.isElement ? l : i,
              mounted: !0,
              rtl: "rtl" === i.dir.toLowerCase() || "rtl" === P(i, "direction"),
              rtlTranslate:
                "horizontal" === t.params.direction &&
                ("rtl" === i.dir.toLowerCase() || "rtl" === P(i, "direction")),
              wrongRTL: "-webkit-box" === P(r, "display"),
            }),
            !0
          );
        }
        init(e) {
          const t = this;
          if (t.initialized) return t;
          if (!1 === t.mount(e)) return t;
          if (
            (t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual?.enabled
              ? t.slideTo(
                  (t.params.initialSlide ?? 0) + (t.virtual.slidesBefore ?? 0),
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0,
                )
              : t.slideTo(
                  t.params.initialSlide,
                  0,
                  t.params.runCallbacksOnInit,
                  !1,
                  !0,
                ),
            t.params.loop && t.loopCreate(void 0, !0),
            t.attachEvents(),
            t.params.lazyPreload)
          ) {
            const e = [...t.el.querySelectorAll('[loading="lazy"]')];
            (t.isElement &&
              e.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
              e.forEach((e) => {
                e.complete
                  ? H(t, e)
                  : e.addEventListener("load", (e) => {
                      H(t, e.target);
                    });
              }));
          }
          return (
            (t.initialized = !0),
            W(t),
            t.emit("init"),
            t.emit("afterInit"),
            t
          );
        }
        destroy(e = !0, t = !0) {
          const s = this,
            { params: i, el: n, wrapperEl: a, slides: r } = s;
          return (
            void 0 === s.params ||
              s.destroyed ||
              (s.emit("beforeDestroy"),
              (s.initialized = !1),
              s.detachEvents(),
              i.loop && s.loopDestroy(),
              t &&
                (s.removeClasses(),
                n && "string" != typeof n && n.removeAttribute("style"),
                a && a.removeAttribute("style"),
                r &&
                  r.length &&
                  r.forEach((e) => {
                    (e.classList.remove(
                      i.slideVisibleClass,
                      i.slideFullyVisibleClass,
                      i.slideActiveClass,
                      i.slideNextClass,
                      i.slidePrevClass,
                    ),
                      e.removeAttribute("style"),
                      e.removeAttribute("data-swiper-slide-index"));
                  })),
              s.emit("destroy"),
              Object.keys(s.eventsListeners).forEach((e) => {
                s.off(e);
              }),
              !1 !== e &&
                (s.el && "string" != typeof s.el && (s.el.swiper = null),
                (l = s),
                Object.keys(l).forEach((e) => {
                  try {
                    l[e] = null;
                  } catch {}
                  try {
                    delete l[e];
                  } catch {}
                })),
              (s.destroyed = !0)),
            null
          );
          var l;
        }
        static extendDefaults(e) {
          A(fe, e);
        }
        static installModule(e) {
          ge.prototype.__modules__ || (ge.prototype.__modules__ = []);
          const t = ge.prototype.__modules__;
          "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
        }
        static use(e) {
          return Array.isArray(e)
            ? (e.forEach((e) => ge.installModule(e)), ge)
            : (ge.installModule(e), ge);
        }
      }
      (Object.defineProperty(ge, "extendedDefaults", { get: () => fe }),
        Object.defineProperty(ge, "defaults", { get: () => X }));
      const ve = me,
        be = ge.prototype;
      (Object.keys(ve).forEach((e) => {
        const t = ve[e];
        Object.keys(t).forEach((e) => {
          be[e] = t[e];
        });
      }),
        ge.use([
          ({ swiper: e, on: t, emit: s }) => {
            let i = null,
              n = null;
            const a = () => {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  (s("beforeResize"), s("resize"));
              },
              r = () => {
                e && !e.destroyed && e.initialized && s("orientationchange");
              };
            (t("init", () => {
              e.params.resizeObserver && void 0 !== window.ResizeObserver
                ? e &&
                  !e.destroyed &&
                  e.initialized &&
                  ((i = new ResizeObserver((t) => {
                    n = window.requestAnimationFrame(() => {
                      const { width: s, height: i } = e;
                      let n = s,
                        r = i;
                      (t.forEach(
                        ({ contentBoxSize: t, contentRect: s, target: i }) => {
                          if (i && i !== e.el) return;
                          const a = Array.isArray(t) ? t[0] : t;
                          ((n = s ? s.width : a.inlineSize),
                            (r = s ? s.height : a.blockSize));
                        },
                      ),
                        (n === s && r === i) || a());
                    });
                  })),
                  i.observe(e.el))
                : (window.addEventListener("resize", a),
                  window.addEventListener("orientationchange", r));
            }),
              t("destroy", () => {
                (n && window.cancelAnimationFrame(n),
                  i && i.unobserve && e.el && (i.unobserve(e.el), (i = null)),
                  window.removeEventListener("resize", a),
                  window.removeEventListener("orientationchange", r));
              }));
          },
          ({ swiper: e, extendParams: t, on: s }) => {
            const i = [],
              n = (t, s = {}) => {
                const n =
                  window.MutationObserver || window.WebkitMutationObserver;
                if (!n) return;
                const a = new n((t) => {
                  if (e.__preventObserver__) return;
                  if (1 === t.length)
                    return void e.emit("observerUpdate", t[0]);
                  const s = function () {
                    e.emit("observerUpdate", t[0]);
                  };
                  window.requestAnimationFrame
                    ? window.requestAnimationFrame(s)
                    : window.setTimeout(s, 0);
                });
                (a.observe(t, {
                  attributes: void 0 === s.attributes || s.attributes,
                  childList:
                    e.isElement || void 0 === s.childList || s.childList,
                  characterData: void 0 === s.characterData || s.characterData,
                }),
                  i.push(a));
              };
            (t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
              s("init", () => {
                if (e.params.observer) {
                  if (e.params.observeParents) {
                    const t = z(e.hostEl);
                    for (let e = 0; e < t.length; e += 1) n(t[e]);
                  }
                  (n(e.hostEl, { childList: e.params.observeSlideChildren }),
                    n(e.wrapperEl, { attributes: !1 }));
                }
              }),
              s("destroy", () => {
                (i.forEach((e) => {
                  e.disconnect();
                }),
                  i.splice(0, i.length));
              }));
          },
        ]));
      const ye = ({
        swiper: e,
        extendParams: t,
        on: s,
        emit: i,
        params: n,
      }) => {
        function a() {
          return e.params.autoplay;
        }
        ((e.autoplay = { running: !1, paused: !1, timeLeft: 0 }),
          t({
            autoplay: {
              enabled: !1,
              delay: 3e3,
              waitForTransition: !0,
              disableOnInteraction: !1,
              stopOnLastSlide: !1,
              reverseDirection: !1,
              pauseOnMouseEnter: !1,
            },
          }));
        const r =
          "object" == typeof n.autoplay &&
          n.autoplay &&
          "number" == typeof n.autoplay.delay
            ? n.autoplay.delay
            : 3e3;
        let l,
          o,
          c,
          d = r,
          u = r,
          p = 0,
          h = new Date().getTime(),
          m = !1,
          f = !1,
          g = !1,
          v = !1,
          b = !1;
        function y(t) {
          if (!e || e.destroyed || !e.wrapperEl) return;
          if (t.target !== e.wrapperEl) return;
          e.wrapperEl.removeEventListener("transitionend", y);
          const s = t.detail;
          b || (s && s.bySwiperTouchMove) || A();
        }
        const w = () => {
            if (e.destroyed || !e.autoplay.running) return;
            e.autoplay.paused ? (m = !0) : m && ((u = p), (m = !1));
            const t = e.autoplay.paused ? p : h + u - new Date().getTime();
            ((e.autoplay.timeLeft = t),
              i("autoplayTimeLeft", t, t / d),
              (o = requestAnimationFrame(() => {
                w();
              })));
          },
          S = () => {
            let t = a().delay;
            const s = (() => {
              let t;
              const s = !!e.params.virtual?.enabled;
              if (
                ((t =
                  e.virtual && s
                    ? e.slides.find((e) =>
                        e.classList.contains("swiper-slide-active"),
                      )
                    : e.slides[e.activeIndex]),
                !t)
              )
                return;
              const i = t.getAttribute("data-swiper-autoplay");
              return null != i ? parseInt(i, 10) : void 0;
            })();
            return (
              "number" == typeof s && !Number.isNaN(s) && s > 0 && (t = s),
              t
            );
          },
          E = (t) => {
            if (e.destroyed || !e.autoplay.running) return 0;
            (void 0 !== o && cancelAnimationFrame(o), w());
            let s = t;
            (void 0 === s && ((s = S()), (d = s), (u = s)), (p = s));
            const n = e.params.speed,
              r = () => {
                if (!e || e.destroyed) return;
                const t = a();
                (t.reverseDirection
                  ? !e.isBeginning || e.params.loop || e.params.rewind
                    ? (e.slidePrev(n, !0, !0), i("autoplay"))
                    : t.stopOnLastSlide ||
                      (e.slideTo(e.slides.length - 1, n, !0, !0), i("autoplay"))
                  : !e.isEnd || e.params.loop || e.params.rewind
                    ? (e.slideNext(n, !0, !0), i("autoplay"))
                    : t.stopOnLastSlide ||
                      (e.slideTo(0, n, !0, !0), i("autoplay")),
                  e.params.cssMode &&
                    ((h = new Date().getTime()),
                    requestAnimationFrame(() => {
                      E();
                    })));
              };
            return (
              s > 0
                ? (void 0 !== l && clearTimeout(l),
                  (l = setTimeout(() => {
                    r();
                  }, s)))
                : requestAnimationFrame(() => {
                    r();
                  }),
              s
            );
          },
          x = () => (
            (h = new Date().getTime()),
            (e.autoplay.running = !0),
            E(),
            i("autoplayStart"),
            !0
          ),
          T = () => (
            (e.autoplay.running = !1),
            void 0 !== l && clearTimeout(l),
            void 0 !== o && cancelAnimationFrame(o),
            i("autoplayStop"),
            !0
          ),
          C = (t, s) => {
            if (e.destroyed || !e.autoplay.running) return;
            (void 0 !== l && clearTimeout(l), t || (v = !0));
            const n = () => {
              (i("autoplayPause"),
                a().waitForTransition
                  ? e.wrapperEl.addEventListener("transitionend", y)
                  : A());
            };
            if (((e.autoplay.paused = !0), s)) return void n();
            const r = p || a().delay;
            ((p = r - (new Date().getTime() - h)),
              (e.isEnd && p < 0 && !e.params.loop) || (p < 0 && (p = 0), n()));
          },
          A = () => {
            (e.isEnd && p < 0 && !e.params.loop) ||
              e.destroyed ||
              !e.autoplay.running ||
              ((h = new Date().getTime()),
              v ? ((v = !1), E(p)) : E(),
              (e.autoplay.paused = !1),
              i("autoplayResume"));
          },
          L = () => {
            !e.destroyed &&
              e.autoplay.running &&
              ("hidden" === document.visibilityState && ((v = !0), C(!0)),
              "visible" === document.visibilityState && A());
          },
          O = (t) => {
            "mouse" === t.pointerType &&
              ((v = !0), (b = !0), e.animating || e.autoplay.paused || C(!0));
          },
          _ = (t) => {
            "mouse" === t.pointerType && ((b = !1), e.autoplay.paused && A());
          };
        (s("init", () => {
          a().enabled &&
            (a().pauseOnMouseEnter &&
              (e.el.addEventListener("pointerenter", O),
              e.el.addEventListener("pointerleave", _)),
            document.addEventListener("visibilitychange", L),
            x());
        }),
          s("destroy", () => {
            (e.el &&
              "string" != typeof e.el &&
              (e.el.removeEventListener("pointerenter", O),
              e.el.removeEventListener("pointerleave", _)),
              document.removeEventListener("visibilitychange", L),
              e.autoplay.running && T());
          }),
          s("_freeModeStaticRelease", () => {
            (g || v) && A();
          }),
          s("_freeModeNoMomentumRelease", () => {
            a().disableOnInteraction ? T() : C(!0, !0);
          }),
          s("beforeTransitionStart", (t, s, i) => {
            !e.destroyed &&
              e.autoplay.running &&
              (i || !a().disableOnInteraction ? C(!0, !0) : T());
          }),
          s("sliderFirstMove", () => {
            !e.destroyed &&
              e.autoplay.running &&
              (a().disableOnInteraction
                ? T()
                : ((f = !0),
                  (g = !1),
                  (v = !1),
                  (c = setTimeout(() => {
                    ((v = !0), (g = !0), C(!0));
                  }, 200))));
          }),
          s("touchEnd", () => {
            if (!e.destroyed && e.autoplay.running && f) {
              if (
                (void 0 !== c && clearTimeout(c),
                void 0 !== l && clearTimeout(l),
                a().disableOnInteraction)
              )
                return ((g = !1), void (f = !1));
              (g && e.params.cssMode && A(), (g = !1), (f = !1));
            }
          }),
          s("slideChange", () => {
            !e.destroyed &&
              e.autoplay.running &&
              e.autoplay.paused &&
              ((p = S()), (d = S()));
          }),
          Object.assign(e.autoplay, {
            start: x,
            stop: T,
            pause: C,
            resume: A,
          }));
      };
      function we(e = "") {
        return `.${e
          .trim()
          .replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1")
          .replace(/ /g, ".")}`;
      }
      function Se(e, t, s, i) {
        const n = s ?? {},
          a = t ?? {};
        return (
          e.params.createElements &&
            Object.keys(i).forEach((t) => {
              if (!n[t] && !0 === n.auto) {
                let s = _(e.el, `.${i[t]}`)[0];
                (s ||
                  ((s = k("div", i[t])), (s.className = i[t]), e.el.append(s)),
                  (n[t] = s),
                  (a[t] = s));
              }
            }),
          n
        );
      }
      const Ee = (e) => {
          if (((e) => !!e.virtual && !!e.params.virtual?.enabled)(e))
            return e.virtual.slides.length;
          const t = e.params.grid?.rows;
          return e.grid && t && t > 1
            ? e.slides.length / Math.ceil(t)
            : e.slides.length;
        },
        xe = ({ swiper: e, extendParams: t, on: s, emit: i }) => {
          const n = "swiper-pagination";
          let a;
          (t({
            pagination: {
              el: null,
              bulletElement: "span",
              clickable: !1,
              hideOnClick: !1,
              renderBullet: null,
              renderProgressbar: null,
              renderFraction: null,
              renderCustom: null,
              progressbarOpposite: !1,
              type: "bullets",
              dynamicBullets: !1,
              dynamicMainBullets: 1,
              formatFractionCurrent: (e) => e,
              formatFractionTotal: (e) => e,
              bulletClass: `${n}-bullet`,
              bulletActiveClass: `${n}-bullet-active`,
              modifierClass: `${n}-`,
              currentClass: `${n}-current`,
              totalClass: `${n}-total`,
              hiddenClass: `${n}-hidden`,
              progressbarFillClass: `${n}-progressbar-fill`,
              progressbarOppositeClass: `${n}-progressbar-opposite`,
              clickableClass: `${n}-clickable`,
              lockClass: `${n}-lock`,
              horizontalClass: `${n}-horizontal`,
              verticalClass: `${n}-vertical`,
              paginationDisabledClass: `${n}-disabled`,
            },
          }),
            (e.pagination = { el: null, bullets: [] }));
          let r = 0;
          function l() {
            return e.params.pagination;
          }
          function o() {
            return (
              !l().el ||
              !e.pagination.el ||
              (Array.isArray(e.pagination.el) && 0 === e.pagination.el.length)
            );
          }
          function c(e, t) {
            const { bulletActiveClass: s } = l();
            if (!e) return;
            let i = e[("prev" === t ? "previous" : "next") + "ElementSibling"];
            i &&
              (i.classList.add(`${s}-${t}`),
              (i = i[("prev" === t ? "previous" : "next") + "ElementSibling"]),
              i && i.classList.add(`${s}-${t}-${t}`));
          }
          function d(t) {
            const s = t.target.closest(we(l().bulletClass));
            if (!s) return;
            t.preventDefault();
            const i = (I(s) ?? 0) * (e.params.slidesPerGroup ?? 1);
            if (e.params.loop) {
              if (e.realIndex === i) return;
              const t =
                ((n = e.realIndex),
                (a = i),
                (r = e.slides.length),
                (a %= r) === 1 + (n %= r)
                  ? "next"
                  : a === n - 1
                    ? "previous"
                    : void 0);
              "next" === t
                ? e.slideNext()
                : "previous" === t
                  ? e.slidePrev()
                  : e.slideToLoop(i);
            } else e.slideTo(i);
            var n, a, r;
          }
          function u() {
            const t = e.rtl,
              s = l();
            if (o()) return;
            const n = $(e.pagination.el);
            let d, u;
            const p = Ee(e),
              h = e.params.loop
                ? Math.ceil(p / (e.params.slidesPerGroup ?? 1))
                : e.snapGrid.length;
            if (
              (e.params.loop
                ? ((u = e.previousRealIndex || 0),
                  (d =
                    (e.params.slidesPerGroup ?? 1) > 1
                      ? Math.floor(e.realIndex / (e.params.slidesPerGroup ?? 1))
                      : e.realIndex))
                : void 0 !== e.snapIndex
                  ? ((d = e.snapIndex), (u = e.previousSnapIndex))
                  : ((u = e.previousIndex || 0), (d = e.activeIndex || 0)),
              "bullets" === s.type &&
                e.pagination.bullets &&
                e.pagination.bullets.length > 0)
            ) {
              const i = e.pagination.bullets;
              let l = 0,
                o = 0,
                p = 0;
              if (s.dynamicBullets) {
                a = D(i[0], e.isHorizontal() ? "width" : "height");
                const t = e.isHorizontal() ? "width" : "height";
                (n.forEach((e) => {
                  e.style[t] = (a ?? 0) * (s.dynamicMainBullets + 4) + "px";
                }),
                  s.dynamicMainBullets > 1 &&
                    void 0 !== u &&
                    ((r += d - (u || 0)),
                    r > s.dynamicMainBullets - 1
                      ? (r = s.dynamicMainBullets - 1)
                      : r < 0 && (r = 0)),
                  (l = Math.max(d - r, 0)),
                  (o = l + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                  (p = (o + l) / 2));
              }
              if (
                (i.forEach((e) => {
                  const t = [
                    "",
                    "-next",
                    "-next-next",
                    "-prev",
                    "-prev-prev",
                    "-main",
                  ]
                    .map((e) => `${s.bulletActiveClass}${e}`)
                    .flatMap((e) =>
                      "string" == typeof e && e.includes(" ")
                        ? e.split(" ")
                        : [e],
                    );
                  e.classList.remove(...t);
                }),
                n.length > 1)
              )
                i.forEach((t) => {
                  const i = I(t);
                  (i === d
                    ? t.classList.add(...s.bulletActiveClass.split(" "))
                    : e.isElement && t.setAttribute("part", "bullet"),
                    s.dynamicBullets &&
                      void 0 !== i &&
                      (i >= l &&
                        i <= o &&
                        t.classList.add(
                          ...`${s.bulletActiveClass}-main`.split(" "),
                        ),
                      i === l && c(t, "prev"),
                      i === o && c(t, "next")));
                });
              else {
                const t = i[d];
                if (
                  (t && t.classList.add(...s.bulletActiveClass.split(" ")),
                  e.isElement &&
                    i.forEach((e, t) => {
                      e.setAttribute(
                        "part",
                        t === d ? "bullet-active" : "bullet",
                      );
                    }),
                  s.dynamicBullets)
                ) {
                  const e = i[l],
                    t = i[o];
                  for (let e = l; e <= o; e += 1)
                    i[e] &&
                      i[e].classList.add(
                        ...`${s.bulletActiveClass}-main`.split(" "),
                      );
                  (c(e, "prev"), c(t, "next"));
                }
              }
              if (s.dynamicBullets) {
                const n = Math.min(i.length, s.dynamicMainBullets + 4),
                  r = ((a ?? 0) * n - (a ?? 0)) / 2 - p * (a ?? 0),
                  l = t ? "right" : "left",
                  o = e.isHorizontal() ? l : "top";
                i.forEach((e) => {
                  e.style[o] = `${r}px`;
                });
              }
            }
            n.forEach((t, n) => {
              if (
                ("fraction" === s.type &&
                  (t.querySelectorAll(we(s.currentClass)).forEach((e) => {
                    e.textContent = String(s.formatFractionCurrent(d + 1));
                  }),
                  t.querySelectorAll(we(s.totalClass)).forEach((e) => {
                    e.textContent = String(s.formatFractionTotal(h));
                  })),
                "progressbar" === s.type)
              ) {
                let i;
                i = s.progressbarOpposite
                  ? e.isHorizontal()
                    ? "vertical"
                    : "horizontal"
                  : e.isHorizontal()
                    ? "horizontal"
                    : "vertical";
                const n = (d + 1) / h;
                let a = 1,
                  r = 1;
                ("horizontal" === i ? (a = n) : (r = n),
                  t
                    .querySelectorAll(we(s.progressbarFillClass))
                    .forEach((t) => {
                      ((t.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${r})`),
                        (t.style.transitionDuration = `${e.params.speed}ms`));
                    }));
              }
              ("custom" === s.type && s.renderCustom
                ? (N(t, s.renderCustom(e, d + 1, h)),
                  0 === n && i("paginationRender", t))
                : (0 === n && i("paginationRender", t),
                  i("paginationUpdate", t)),
                e.params.watchOverflow &&
                  e.enabled &&
                  t.classList[e.isLocked ? "add" : "remove"](s.lockClass));
            });
          }
          function p() {
            const t = l();
            if (o()) return;
            const s = Ee(e),
              n = $(e.pagination.el);
            let a = "";
            if ("bullets" === t.type) {
              let i = e.params.loop
                ? Math.ceil(s / (e.params.slidesPerGroup ?? 1))
                : e.snapGrid.length;
              e.params.freeMode &&
                ((e) => !!e.params.freeMode?.enabled)(e) &&
                i > s &&
                (i = s);
              for (let s = 0; s < i; s += 1)
                t.renderBullet
                  ? (a += t.renderBullet.call(e, s, t.bulletClass))
                  : (a += `<${t.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${t.bulletClass}"></${t.bulletElement}>`);
            }
            ("fraction" === t.type &&
              (a = t.renderFraction
                ? t.renderFraction.call(e, t.currentClass, t.totalClass)
                : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
              "progressbar" === t.type &&
                (a = t.renderProgressbar
                  ? t.renderProgressbar.call(e, t.progressbarFillClass)
                  : `<span class="${t.progressbarFillClass}"></span>`),
              (e.pagination.bullets = []),
              n.forEach((s) => {
                ("custom" !== t.type && N(s, a || ""),
                  "bullets" === t.type &&
                    e.pagination.bullets.push(
                      ...Array.from(s.querySelectorAll(we(t.bulletClass))),
                    ));
              }),
              "custom" !== t.type && i("paginationRender", n[0]));
          }
          function h() {
            e.params.pagination = Se(
              e,
              e.originalParams.pagination,
              e.params.pagination,
              { el: "swiper-pagination" },
            );
            const t = l();
            if (!t.el) return;
            let s;
            if (
              ("string" == typeof t.el &&
                e.isElement &&
                (s = e.el.querySelector(t.el)),
              s ||
                "string" != typeof t.el ||
                (s = [...document.querySelectorAll(t.el)]),
              s || (s = t.el),
              !s || (Array.isArray(s) && 0 === s.length))
            )
              return;
            if (
              e.params.uniqueNavElements &&
              "string" == typeof t.el &&
              Array.isArray(s) &&
              s.length > 1 &&
              ((s = [...e.el.querySelectorAll(t.el)]), s.length > 1)
            ) {
              const t = s.find((t) => z(t, ".swiper")[0] === e.el);
              t && (s = t);
            }
            (Array.isArray(s) && 1 === s.length && (s = s[0]),
              Object.assign(e.pagination, { el: s }));
            $(s).forEach((s) => {
              ("bullets" === t.type &&
                t.clickable &&
                s.classList.add(...(t.clickableClass || "").split(" ")),
                s.classList.add(t.modifierClass + t.type),
                s.classList.add(
                  e.isHorizontal() ? t.horizontalClass : t.verticalClass,
                ),
                "bullets" === t.type &&
                  t.dynamicBullets &&
                  (s.classList.add(`${t.modifierClass}${t.type}-dynamic`),
                  (r = 0),
                  t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                "progressbar" === t.type &&
                  t.progressbarOpposite &&
                  s.classList.add(t.progressbarOppositeClass),
                t.clickable && s.addEventListener("click", d),
                e.enabled || s.classList.add(t.lockClass));
            });
          }
          function m() {
            const t = l();
            if (o()) return;
            const s = e.pagination.el;
            if (s) {
              $(s).forEach((s) => {
                (s.classList.remove(t.hiddenClass),
                  s.classList.remove(t.modifierClass + t.type),
                  s.classList.remove(
                    e.isHorizontal() ? t.horizontalClass : t.verticalClass,
                  ),
                  t.clickable &&
                    (s.classList.remove(...(t.clickableClass || "").split(" ")),
                    s.removeEventListener("click", d)));
              });
            }
            e.pagination.bullets &&
              e.pagination.bullets.forEach((e) =>
                e.classList.remove(...t.bulletActiveClass.split(" ")),
              );
          }
          (s("changeDirection", () => {
            if (!e.pagination || !e.pagination.el) return;
            const t = l();
            $(e.pagination.el).forEach((s) => {
              (s.classList.remove(t.horizontalClass, t.verticalClass),
                s.classList.add(
                  e.isHorizontal() ? t.horizontalClass : t.verticalClass,
                ));
            });
          }),
            s("init", () => {
              !1 === l().enabled ? f() : (h(), p(), u());
            }),
            s("activeIndexChange", () => {
              void 0 === e.snapIndex && u();
            }),
            s("snapIndexChange", () => {
              u();
            }),
            s("snapGridLengthChange", () => {
              (p(), u());
            }),
            s("destroy", () => {
              m();
            }),
            s("enable disable", () => {
              const { el: t } = e.pagination;
              if (t) {
                const s = l();
                $(t).forEach((t) =>
                  t.classList[e.enabled ? "remove" : "add"](s.lockClass),
                );
              }
            }),
            s("lock unlock", () => {
              u();
            }),
            s("click", (t, s) => {
              const n = s.target,
                a = $(e.pagination.el),
                r = l();
              if (
                r.el &&
                r.hideOnClick &&
                a &&
                a.length > 0 &&
                !n.classList.contains(r.bulletClass)
              ) {
                if (
                  e.navigation &&
                  ((e.navigation.nextEl && n === e.navigation.nextEl) ||
                    (e.navigation.prevEl && n === e.navigation.prevEl))
                )
                  return;
                const t = a[0].classList.contains(r.hiddenClass);
                (i(!0 === t ? "paginationShow" : "paginationHide"),
                  a.forEach((e) => e.classList.toggle(r.hiddenClass)));
              }
            }));
          const f = () => {
            const t = l();
            e.el.classList.add(t.paginationDisabledClass);
            const { el: s } = e.pagination;
            if (s) {
              $(s).forEach((e) => e.classList.add(t.paginationDisabledClass));
            }
            m();
          };
          Object.assign(e.pagination, {
            enable: () => {
              const t = l();
              e.el.classList.remove(t.paginationDisabledClass);
              const { el: s } = e.pagination;
              if (s) {
                $(s).forEach((e) =>
                  e.classList.remove(t.paginationDisabledClass),
                );
              }
              (h(), p(), u());
            },
            disable: f,
            render: p,
            update: u,
            init: h,
            destroy: m,
          });
        },
        Te =
          '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>',
        Ce = ({ swiper: e, extendParams: t, on: s, emit: i }) => {
          function n() {
            return e.params.navigation;
          }
          function a(t) {
            let s;
            return t &&
              "string" == typeof t &&
              e.isElement &&
              ((s = e.el.querySelector(t) || e.hostEl.querySelector(t)), s)
              ? s
              : (t &&
                  ("string" == typeof t &&
                    (s = [...document.querySelectorAll(t)]),
                  e.params.uniqueNavElements &&
                  "string" == typeof t &&
                  s &&
                  s.length > 1 &&
                  1 === e.el.querySelectorAll(t).length
                    ? (s = e.el.querySelector(t))
                    : s && 1 === s.length && (s = s[0])),
                t && !s ? t : s);
          }
          function r(t, s) {
            const i = n();
            $(t).forEach((t) => {
              t &&
                (t.classList[s ? "add" : "remove"](
                  ...i.disabledClass.split(" "),
                ),
                "BUTTON" === t.tagName && (t.disabled = s),
                e.params.watchOverflow &&
                  e.enabled &&
                  t.classList[e.isLocked ? "add" : "remove"](i.lockClass));
            });
          }
          function l() {
            const { nextEl: t, prevEl: s } = e.navigation;
            if (e.params.loop) return (r(s, !1), void r(t, !1));
            (r(s, e.isBeginning && !e.params.rewind),
              r(t, e.isEnd && !e.params.rewind));
          }
          function o(t) {
            (t.preventDefault(),
              (!e.isBeginning || e.params.loop || e.params.rewind) &&
                (e.slidePrev(), i("navigationPrev")));
          }
          function c(t) {
            (t.preventDefault(),
              (!e.isEnd || e.params.loop || e.params.rewind) &&
                (e.slideNext(), i("navigationNext")));
          }
          function d() {
            e.params.navigation = Se(
              e,
              e.originalParams.navigation,
              e.params.navigation,
              { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
            );
            const t = n();
            if (!t.nextEl && !t.prevEl) return;
            const s = a(t.nextEl),
              i = a(t.prevEl);
            Object.assign(e.navigation, { nextEl: s, prevEl: i });
            const r = $(s),
              l = $(i),
              d = (s, i) => {
                if (s) {
                  if (
                    t.addIcons &&
                    s.matches(".swiper-button-next,.swiper-button-prev") &&
                    !s.querySelector("svg")
                  ) {
                    const e = document.createElement("div");
                    N(e, Te);
                    const t = e.querySelector("svg");
                    (t && s.appendChild(t), e.remove());
                  }
                  s.addEventListener("click", "next" === i ? c : o);
                }
                !e.enabled && s && s.classList.add(...t.lockClass.split(" "));
              };
            (r.forEach((e) => d(e, "next")), l.forEach((e) => d(e, "prev")));
          }
          function u() {
            const t = n(),
              { nextEl: s, prevEl: i } = e.navigation,
              a = $(s),
              r = $(i),
              l = (e, s) => {
                (e.removeEventListener("click", "next" === s ? c : o),
                  e.classList.remove(...t.disabledClass.split(" ")));
              };
            (a.forEach((e) => l(e, "next")), r.forEach((e) => l(e, "prev")));
          }
          (t({
            navigation: {
              nextEl: null,
              prevEl: null,
              addIcons: !0,
              hideOnClick: !1,
              disabledClass: "swiper-button-disabled",
              hiddenClass: "swiper-button-hidden",
              lockClass: "swiper-button-lock",
              navigationDisabledClass: "swiper-navigation-disabled",
            },
          }),
            (e.navigation = { nextEl: null, prevEl: null, arrowSvg: Te }),
            s("init", () => {
              !1 === n().enabled ? p() : (d(), l());
            }),
            s("toEdge fromEdge lock unlock", () => {
              l();
            }),
            s("destroy", () => {
              u();
            }),
            s("enable disable", () => {
              const t = n(),
                { nextEl: s, prevEl: i } = e.navigation,
                a = $(s),
                r = $(i);
              e.enabled
                ? l()
                : [...a, ...r]
                    .filter((e) => !!e)
                    .forEach((e) => e.classList.add(t.lockClass));
            }),
            s("click", (t, s) => {
              const a = n(),
                { nextEl: r, prevEl: l } = e.navigation,
                o = $(r),
                c = $(l),
                d = s.target;
              let u = c.includes(d) || o.includes(d);
              if (e.isElement && !u) {
                const e = s.composedPath ? s.composedPath() : [];
                e.length && (u = e.find((e) => o.includes(e) || c.includes(e)));
              }
              if (a.hideOnClick && !u) {
                if (
                  e.pagination &&
                  e.params.pagination &&
                  e.params.pagination.clickable &&
                  (e.pagination.el === d || e.pagination.el.contains(d))
                )
                  return;
                let t;
                (o.length
                  ? (t = o[0].classList.contains(a.hiddenClass))
                  : c.length && (t = c[0].classList.contains(a.hiddenClass)),
                  i(!0 === t ? "navigationShow" : "navigationHide"),
                  [...o, ...c]
                    .filter((e) => !!e)
                    .forEach((e) => e.classList.toggle(a.hiddenClass)));
              }
            }));
          const p = () => {
            const t = n();
            (e.el.classList.add(...t.navigationDisabledClass.split(" ")), u());
          };
          Object.assign(e.navigation, {
            enable: () => {
              const t = n();
              (e.el.classList.remove(...t.navigationDisabledClass.split(" ")),
                d(),
                l());
            },
            disable: p,
            update: l,
            init: d,
            destroy: u,
          });
        };
      function Ae(e, t) {
        const s = O(t);
        return (
          s !== t &&
            ((s.style.backfaceVisibility = "hidden"),
            s.style.setProperty("-webkit-backface-visibility", "hidden")),
          s
        );
      }
      function Le({
        swiper: e,
        duration: t,
        transformElements: s,
        allSlides: i,
      }) {
        const { activeIndex: n } = e;
        if (e.params.virtualTranslate && 0 !== t) {
          let t,
            a = !1;
          ((t = i
            ? s
            : s.filter((t) => {
                const s = t.classList.contains("swiper-slide-transform")
                  ? ((t) =>
                      t.parentElement
                        ? t.parentElement instanceof HTMLElement
                          ? t.parentElement
                          : void 0
                        : e.slides.find(
                            (e) =>
                              e.shadowRoot && e.shadowRoot === t.parentNode,
                          ))(t)
                  : t;
                return !!s && e.getSlideIndex(s) === n;
              })),
            t.forEach((t) => {
              !(function (e, t) {
                t &&
                  e.addEventListener(
                    "transitionend",
                    function (s) {
                      s.target === e && t.call(e, s);
                    },
                    { once: !0 },
                  );
              })(t, () => {
                if (a) return;
                if (!e || e.destroyed) return;
                ((a = !0), (e.animating = !1));
                const t = new CustomEvent("transitionend", {
                  bubbles: !0,
                  cancelable: !0,
                });
                e.wrapperEl.dispatchEvent(t);
              });
            }));
        }
      }
      const Oe = ({ swiper: e, extendParams: t, on: s }) => {
          t({ fadeEffect: { crossFade: !1, mode: "default" } });
          let i = 0;
          function n() {
            return e.params.fadeEffect;
          }
          function a() {
            const e = n();
            return "default" === e.mode && e.crossFade ? "cross-fade" : e.mode;
          }
          !(function (e) {
            const {
              effect: t,
              swiper: s,
              on: i,
              setTranslate: n,
              setTransition: a,
              overwriteParams: r,
              perspective: l,
              recreateShadows: o,
              getEffectParams: c,
            } = e;
            (i("beforeInit", () => {
              if (s.params.effect !== t) return;
              (s.classNames.push(`${s.params.containerModifierClass}${t}`),
                l &&
                  l() &&
                  s.classNames.push(`${s.params.containerModifierClass}3d`));
              const e = r ? r() : {};
              (Object.assign(s.params, e), Object.assign(s.originalParams, e));
            }),
              i("setTranslate _virtualUpdated", () => {
                s.params.effect === t && n();
              }),
              i("setTransition", (e, i) => {
                s.params.effect === t && a(i);
              }),
              i("transitionEnd", () => {
                if (s.params.effect === t && o) {
                  const e = c ? c() : void 0;
                  if (!e || !e.slideShadows) return;
                  (s.slides.forEach((e) => {
                    e.querySelectorAll(
                      ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
                    ).forEach((e) => e.remove());
                  }),
                    o());
                }
              }));
            let d = !1;
            i("virtualUpdate", () => {
              s.params.effect === t &&
                (s.slides.length || (d = !0),
                requestAnimationFrame(() => {
                  d && s.slides && s.slides.length && (n(), (d = !1));
                }));
            });
          })({
            effect: "fade",
            swiper: e,
            on: s,
            setTranslate: () => {
              const { slides: t } = e,
                s = (n(), a()),
                r = "out-in" === s && i > 0,
                l = i;
              i = 0;
              const o = [],
                c = [];
              let d = !1;
              for (let i = 0; i < t.length; i += 1) {
                const n = t[i];
                let a = -(n.swiperSlideOffset ?? 0);
                e.params.virtualTranslate || (a -= e.translate);
                let l = 0;
                e.isHorizontal() || ((l = a), (a = 0));
                const u = n.progress ?? 0;
                let p;
                p =
                  "cross-fade" === s
                    ? Math.max(1 - Math.abs(u), 0)
                    : "out-in" === s
                      ? Math.max(1 - 2 * Math.abs(u), 0)
                      : 1 + Math.min(Math.max(u, -1), 0);
                const h = Ae(0, n);
                if (r) {
                  const e = parseFloat(h.style.opacity);
                  (0 === p && e > 0 && (d = !0), p > 0 && c.push(h), o.push(h));
                }
                ((h.style.opacity = String(p)),
                  (h.style.transform = `translate3d(${a}px, ${l}px, 0px)`));
              }
              r &&
                (o.forEach((e) => {
                  const t = d && c.includes(e);
                  ((e.style.transitionDuration = l / 2 + "ms"),
                    (e.style.transitionDelay = t ? l / 2 + "ms" : "0ms"));
                }),
                Le({
                  swiper: e,
                  duration: l,
                  transformElements: c,
                  allSlides: !0,
                }));
            },
            setTransition: (t) => {
              const s = a(),
                n = e.slides.map((e) => O(e));
              (n.forEach((e) => {
                ((e.style.transitionDuration = `${t}ms`),
                  "out-in" === s && 0 === t && (e.style.transitionDelay = ""));
              }),
                "out-in" === s && t > 0 && !e.params.cssMode
                  ? (i = t)
                  : Le({
                      swiper: e,
                      duration: t,
                      transformElements: n,
                      allSlides: !0,
                    }));
            },
            overwriteParams: () => ({
              slidesPerView: 1,
              slidesPerGroup: 1,
              watchSlidesProgress: !0,
              spaceBetween: 0,
              virtualTranslate: !e.params.cssMode,
            }),
          });
        },
        _e = ({ swiper: e, extendParams: t, on: s }) => {
          t({
            thumbs: {
              swiper: null,
              multipleActiveThumbs: !0,
              autoScrollOffset: 0,
              slideThumbActiveClass: "swiper-slide-thumb-active",
              thumbsContainerClass: "swiper-thumbs",
            },
          });
          let i = !1,
            n = !1;
          function a() {
            return e.params.thumbs;
          }
          function r() {
            const t = e.thumbs.swiper;
            if (!t || t.destroyed) return !1;
            const s = t.params.virtual;
            return !!s && !!s.enabled;
          }
          function l() {
            const t = e.thumbs.swiper;
            if (!t || t.destroyed) return;
            const s = t.clickedIndex,
              i = t.clickedSlide,
              n = a();
            if (i && i.classList.contains(n.slideThumbActiveClass)) return;
            if (null == s) return;
            let r;
            if (t.params.loop) {
              const e = t.clickedSlide?.getAttribute("data-swiper-slide-index");
              r = null == e ? s : parseInt(e, 10);
            } else r = s;
            e.params.loop ? e.slideToLoop(r) : e.slideTo(r);
          }
          function o() {
            const t = a();
            if (i) return !1;
            i = !0;
            const s = e.constructor;
            if (t.swiper instanceof s) {
              if (t.swiper.destroyed) return ((i = !1), !1);
              const s = t.swiper;
              ((e.thumbs.swiper = s),
                Object.assign(s.originalParams, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                }),
                Object.assign(s.params, {
                  watchSlidesProgress: !0,
                  slideToClickedSlide: !1,
                }),
                s.update());
            } else if (T(t.swiper)) {
              const i = Object.assign({}, t.swiper);
              (Object.assign(i, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }),
                (e.thumbs.swiper = new s(i)),
                (n = !0));
            }
            const o = e.thumbs.swiper;
            return (
              !!o &&
              (o.el.classList.add(t.thumbsContainerClass),
              o.on("tap", l),
              r() &&
                o.on("virtualUpdate", () => {
                  c(!1, { autoScroll: !1 });
                }),
              !0)
            );
          }
          function c(t, s) {
            const i = e.thumbs.swiper;
            if (!i || i.destroyed) return;
            let n = 1;
            const l = a(),
              o = l.slideThumbActiveClass,
              c = e.params.slidesPerView;
            if (
              ("number" == typeof c &&
                c > 1 &&
                !e.params.centeredSlides &&
                (n = c),
              l.multipleActiveThumbs || (n = 1),
              (n = Math.floor(n)),
              i.slides.forEach((e) => e.classList.remove(o)),
              i.params.loop || r())
            )
              for (let t = 0; t < n; t += 1)
                _(
                  i.slidesEl,
                  `[data-swiper-slide-index="${e.realIndex + t}"]`,
                ).forEach((e) => {
                  e.classList.add(o);
                });
            else
              for (let t = 0; t < n; t += 1) {
                const s = i.slides[e.realIndex + t];
                s && s.classList.add(o);
              }
            (s?.autoScroll ?? !0) &&
              (function (t) {
                const s = e.thumbs.swiper;
                if (!s || s.destroyed) return;
                const i = s.params.slidesPerView,
                  n = "auto" === i ? s.slidesPerViewDynamic() : (i ?? 1),
                  r = a().autoScrollOffset,
                  l = r && !s.params.loop;
                if (e.realIndex !== s.realIndex || l) {
                  const i = s.activeIndex;
                  let a, o;
                  if (s.params.loop) {
                    const t = s.slides.find(
                      (t) =>
                        t.getAttribute("data-swiper-slide-index") ===
                        `${e.realIndex}`,
                    );
                    ((a = t ? s.slides.indexOf(t) : -1),
                      (o = e.activeIndex > e.previousIndex ? "next" : "prev"));
                  } else
                    ((a = e.realIndex),
                      (o = a > e.previousIndex ? "next" : "prev"));
                  (l && (a += "next" === o ? r : -1 * r),
                    s.visibleSlidesIndexes &&
                      s.visibleSlidesIndexes.indexOf(a) < 0 &&
                      (s.params.centeredSlides
                        ? (a =
                            a > i
                              ? a - Math.floor(n / 2) + 1
                              : a + Math.floor(n / 2) - 1)
                        : a > i && s.params.slidesPerGroup,
                      s.slideTo(a, t)));
                }
              })(t ? 0 : void 0);
          }
          ((e.thumbs = { swiper: null }),
            s("beforeInit", () => {
              const t = e.params.thumbs;
              if (t && t.swiper)
                if (
                  "string" == typeof t.swiper ||
                  t.swiper instanceof HTMLElement
                ) {
                  const s = () => {
                      const s =
                        "string" == typeof t.swiper
                          ? document.querySelector(t.swiper)
                          : t.swiper;
                      if (s && s.swiper) ((t.swiper = s.swiper), o(), c(!0));
                      else if (s) {
                        const i = `${e.params.eventsPrefix}init`,
                          n = (a) => {
                            const r = a.detail;
                            ((t.swiper = r[0]),
                              s.removeEventListener(i, n),
                              o(),
                              c(!0),
                              t.swiper.update(),
                              e.update());
                          };
                        s.addEventListener(i, n);
                      }
                      return s;
                    },
                    i = () => {
                      if (e.destroyed) return;
                      s() || requestAnimationFrame(i);
                    };
                  requestAnimationFrame(i);
                } else (o(), c(!0));
            }),
            s("slideChange update resize observerUpdate", () => {
              c();
            }),
            s("setTransition", (t, s) => {
              const i = e.thumbs.swiper;
              i && !i.destroyed && i.setTransition(s);
            }),
            s("beforeDestroy", () => {
              const t = e.thumbs.swiper;
              t && !t.destroyed && n && t.destroy();
            }),
            Object.assign(e.thumbs, { init: o, update: c }));
        };
      function Me() {
        let e = document.querySelectorAll(
          '[class*="__swiper"]:not(.swiper-wrapper)',
        );
        e &&
          e.forEach((e) => {
            (e.parentElement.classList.add("swiper"),
              e.classList.add("swiper-wrapper"));
            for (const t of e.children) t.classList.add("swiper-slide");
          });
      }
      window.addEventListener("load", function (e) {
        (Me(),
          document.querySelector(".swiper") &&
            (new ge(".new-product__slider", {
              modules: [ye, xe, Ce],
              autoplay: {
                delay: 3e3,
                disableOnInteraction: !1,
                pauseOnMouseEnter: !0,
              },
              observer: !0,
              observeParents: !0,
              spaceBetween: 20,
              autoHeight: !0,
              speed: 800,
              loop: !0,
              pagination: { el: ".control-swiper__pagination", clickable: !0 },
              navigation: {
                nextEl: ".control-swiper__btn-next",
                prevEl: ".control-swiper__btn-prev",
              },
              breakpoints: {
                320: { slidesPerView: 1.2, spaceBetween: 10, autoHeight: !0 },
                479.98: { slidesPerView: 1.5, spaceBetween: 10 },
                575: { slidesPerView: 1.8, spaceBetween: 10 },
                768: { slidesPerView: 2.3, spaceBetween: 10 },
                830: { slidesPerView: 2.8, spaceBetween: 15 },
                992: { slidesPerView: 3.2, spaceBetween: 20 },
              },
              on: {},
            }),
            new ge(".big-photo-product", {
              modules: [Oe, _e, Ce],
              effect: "fade",
              slidesPerView: 1,
              navigation: {
                nextEl: ".big-photo-product__sw-btn-next",
                prevEl: ".big-photo-product__sw-btn-prev",
              },
              thumbs: { swiper: ".thumb-photo" },
              autoHeight: !0,
              grabCursor: !0,
            }),
            new ge(".thumb-photo", {
              autoHeight: !0,
              breakpoints: {
                320: { slidesPerView: 3, spaceBetween: 10 },
                479.98: { slidesPerView: 4, spaceBetween: 10 },
                574.98: { slidesPerView: 3, spaceBetween: 10 },
                767.98: { slidesPerView: 3.5, spaceBetween: 10 },
                991.98: { slidesPerView: 5, spaceBetween: 10 },
              },
            }),
            new ge(".galerie__slider", {
              modules: [xe, Ce],
              autoHeight: !0,
              pagination: { el: ".galerie__swiper-pagination", clickable: !0 },
              navigation: {
                nextEl: ".galerie__btn-next",
                prevEl: ".galerie__btn-prev",
              },
              breakpoints: {
                320: { slidesPerView: 1.4, spaceBetween: 5 },
                479.98: { slidesPerView: 2, spaceBetween: 5 },
                574.98: { slidesPerView: 3, spaceBetween: 5 },
                767.98: { slidesPerView: 4, spaceBetween: 5 },
                991.98: { slidesPerView: 5, spaceBetween: 5 },
              },
            })));
      });
      const ke = function (e) {
        var t = typeof e;
        return null != e && ("object" == t || "function" == t);
      };
      const Pe = "object" == typeof s.g && s.g && s.g.Object === Object && s.g;
      var Ie =
        "object" == typeof self && self && self.Object === Object && self;
      const ze = Pe || Ie || Function("return this")();
      const De = function () {
        return ze.Date.now();
      };
      var $e = /\s/;
      const Ne = function (e) {
        for (var t = e.length; t-- && $e.test(e.charAt(t)););
        return t;
      };
      var qe = /^\s+/;
      const Be = function (e) {
        return e ? e.slice(0, Ne(e) + 1).replace(qe, "") : e;
      };
      const Ve = ze.Symbol;
      var He = Object.prototype,
        Ge = He.hasOwnProperty,
        We = He.toString,
        Re = Ve ? Ve.toStringTag : void 0;
      const Fe = function (e) {
        var t = Ge.call(e, Re),
          s = e[Re];
        try {
          e[Re] = void 0;
          var i = !0;
        } catch (e) {}
        var n = We.call(e);
        return (i && (t ? (e[Re] = s) : delete e[Re]), n);
      };
      var je = Object.prototype.toString;
      const Ye = function (e) {
        return je.call(e);
      };
      var Xe = Ve ? Ve.toStringTag : void 0;
      const Ue = function (e) {
        return null == e
          ? void 0 === e
            ? "[object Undefined]"
            : "[object Null]"
          : Xe && Xe in Object(e)
            ? Fe(e)
            : Ye(e);
      };
      const Qe = function (e) {
        return null != e && "object" == typeof e;
      };
      const Je = function (e) {
        return "symbol" == typeof e || (Qe(e) && "[object Symbol]" == Ue(e));
      };
      var Ze = /^[-+]0x[0-9a-f]+$/i,
        Ke = /^0b[01]+$/i,
        et = /^0o[0-7]+$/i,
        tt = parseInt;
      const st = function (e) {
        if ("number" == typeof e) return e;
        if (Je(e)) return NaN;
        if (ke(e)) {
          var t = "function" == typeof e.valueOf ? e.valueOf() : e;
          e = ke(t) ? t + "" : t;
        }
        if ("string" != typeof e) return 0 === e ? e : +e;
        e = Be(e);
        var s = Ke.test(e);
        return s || et.test(e)
          ? tt(e.slice(2), s ? 2 : 8)
          : Ze.test(e)
            ? NaN
            : +e;
      };
      var it = Math.max,
        nt = Math.min;
      const at = function (e, t, s) {
        var i,
          n,
          a,
          r,
          l,
          o,
          c = 0,
          d = !1,
          u = !1,
          p = !0;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        function h(t) {
          var s = i,
            a = n;
          return ((i = n = void 0), (c = t), (r = e.apply(a, s)));
        }
        function m(e) {
          var s = e - o;
          return void 0 === o || s >= t || s < 0 || (u && e - c >= a);
        }
        function f() {
          var e = De();
          if (m(e)) return g(e);
          l = setTimeout(
            f,
            (function (e) {
              var s = t - (e - o);
              return u ? nt(s, a - (e - c)) : s;
            })(e),
          );
        }
        function g(e) {
          return ((l = void 0), p && i ? h(e) : ((i = n = void 0), r));
        }
        function v() {
          var e = De(),
            s = m(e);
          if (((i = arguments), (n = this), (o = e), s)) {
            if (void 0 === l)
              return (function (e) {
                return ((c = e), (l = setTimeout(f, t)), d ? h(e) : r);
              })(o);
            if (u) return (clearTimeout(l), (l = setTimeout(f, t)), h(o));
          }
          return (void 0 === l && (l = setTimeout(f, t)), r);
        }
        return (
          (t = st(t) || 0),
          ke(s) &&
            ((d = !!s.leading),
            (a = (u = "maxWait" in s) ? it(st(s.maxWait) || 0, t) : a),
            (p = "trailing" in s ? !!s.trailing : p)),
          (v.cancel = function () {
            (void 0 !== l && clearTimeout(l),
              (c = 0),
              (i = o = n = l = void 0));
          }),
          (v.flush = function () {
            return void 0 === l ? r : g(De());
          }),
          v
        );
      };
      const rt = function (e, t, s) {
        var i = !0,
          n = !0;
        if ("function" != typeof e) throw new TypeError("Expected a function");
        return (
          ke(s) &&
            ((i = "leading" in s ? !!s.leading : i),
            (n = "trailing" in s ? !!s.trailing : n)),
          at(e, t, { leading: i, maxWait: t, trailing: n })
        );
      };
      var lt = function () {
        return (
          (lt =
            Object.assign ||
            function (e) {
              for (var t, s = 1, i = arguments.length; s < i; s++)
                for (var n in (t = arguments[s]))
                  Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              return e;
            }),
          lt.apply(this, arguments)
        );
      };
      function ot(e) {
        return e && e.ownerDocument && e.ownerDocument.defaultView
          ? e.ownerDocument.defaultView
          : window;
      }
      function ct(e) {
        return e && e.ownerDocument ? e.ownerDocument : document;
      }
      var dt = function (e) {
        return Array.prototype.reduce.call(
          e,
          function (e, t) {
            var s = t.name.match(/data-simplebar-(.+)/);
            if (s) {
              var i = s[1].replace(/\W+(.)/g, function (e, t) {
                return t.toUpperCase();
              });
              switch (t.value) {
                case "true":
                  e[i] = !0;
                  break;
                case "false":
                  e[i] = !1;
                  break;
                case void 0:
                  e[i] = !0;
                  break;
                default:
                  e[i] = t.value;
              }
            }
            return e;
          },
          {},
        );
      };
      function ut(e, t) {
        var s;
        e && (s = e.classList).add.apply(s, t.split(" "));
      }
      function pt(e, t) {
        e &&
          t.split(" ").forEach(function (t) {
            e.classList.remove(t);
          });
      }
      function ht(e) {
        return ".".concat(e.split(" ").join("."));
      }
      var mt = !(
          "undefined" == typeof window ||
          !window.document ||
          !window.document.createElement
        ),
        ft = Object.freeze({
          __proto__: null,
          addClasses: ut,
          canUseDOM: mt,
          classNamesToQuery: ht,
          getElementDocument: ct,
          getElementWindow: ot,
          getOptions: dt,
          removeClasses: pt,
        }),
        gt = null,
        vt = null;
      function bt() {
        if (null === gt) {
          if ("undefined" == typeof document) return (gt = 0);
          var e = document.body,
            t = document.createElement("div");
          (t.classList.add("simplebar-hide-scrollbar"), e.appendChild(t));
          var s = t.getBoundingClientRect().right;
          (e.removeChild(t), (gt = s));
        }
        return gt;
      }
      mt &&
        window.addEventListener("resize", function () {
          vt !== window.devicePixelRatio &&
            ((vt = window.devicePixelRatio), (gt = null));
        });
      var yt = ot,
        wt = ct,
        St = dt,
        Et = ut,
        xt = pt,
        Tt = ht,
        Ct = (function () {
          function e(t, s) {
            void 0 === s && (s = {});
            var i = this;
            if (
              ((this.removePreventClickId = null),
              (this.minScrollbarWidth = 20),
              (this.stopScrollDelay = 175),
              (this.isScrolling = !1),
              (this.isMouseEntering = !1),
              (this.isDragging = !1),
              (this.scrollXTicking = !1),
              (this.scrollYTicking = !1),
              (this.wrapperEl = null),
              (this.contentWrapperEl = null),
              (this.contentEl = null),
              (this.offsetEl = null),
              (this.maskEl = null),
              (this.placeholderEl = null),
              (this.heightAutoObserverWrapperEl = null),
              (this.heightAutoObserverEl = null),
              (this.rtlHelpers = null),
              (this.scrollbarWidth = 0),
              (this.resizeObserver = null),
              (this.mutationObserver = null),
              (this.elStyles = null),
              (this.isRtl = null),
              (this.mouseX = 0),
              (this.mouseY = 0),
              (this.onMouseMove = function () {}),
              (this.onWindowResize = function () {}),
              (this.onStopScrolling = function () {}),
              (this.onMouseEntered = function () {}),
              (this.onScroll = function () {
                var e = yt(i.el);
                (i.scrollXTicking ||
                  (e.requestAnimationFrame(i.scrollX), (i.scrollXTicking = !0)),
                  i.scrollYTicking ||
                    (e.requestAnimationFrame(i.scrollY),
                    (i.scrollYTicking = !0)),
                  i.isScrolling ||
                    ((i.isScrolling = !0), Et(i.el, i.classNames.scrolling)),
                  i.showScrollbar("x"),
                  i.showScrollbar("y"),
                  i.onStopScrolling());
              }),
              (this.scrollX = function () {
                (i.axis.x.isOverflowing && i.positionScrollbar("x"),
                  (i.scrollXTicking = !1));
              }),
              (this.scrollY = function () {
                (i.axis.y.isOverflowing && i.positionScrollbar("y"),
                  (i.scrollYTicking = !1));
              }),
              (this._onStopScrolling = function () {
                (xt(i.el, i.classNames.scrolling),
                  i.options.autoHide &&
                    (i.hideScrollbar("x"), i.hideScrollbar("y")),
                  (i.isScrolling = !1));
              }),
              (this.onMouseEnter = function () {
                (i.isMouseEntering ||
                  (Et(i.el, i.classNames.mouseEntered),
                  i.showScrollbar("x"),
                  i.showScrollbar("y"),
                  (i.isMouseEntering = !0)),
                  i.onMouseEntered());
              }),
              (this._onMouseEntered = function () {
                (xt(i.el, i.classNames.mouseEntered),
                  i.options.autoHide &&
                    (i.hideScrollbar("x"), i.hideScrollbar("y")),
                  (i.isMouseEntering = !1));
              }),
              (this._onMouseMove = function (e) {
                ((i.mouseX = e.clientX),
                  (i.mouseY = e.clientY),
                  (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
                    i.onMouseMoveForAxis("x"),
                  (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
                    i.onMouseMoveForAxis("y"));
              }),
              (this.onMouseLeave = function () {
                (i.onMouseMove.cancel(),
                  (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
                    i.onMouseLeaveForAxis("x"),
                  (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
                    i.onMouseLeaveForAxis("y"),
                  (i.mouseX = -1),
                  (i.mouseY = -1));
              }),
              (this._onWindowResize = function () {
                ((i.scrollbarWidth = i.getScrollbarWidth()),
                  i.hideNativeScrollbar());
              }),
              (this.onPointerEvent = function (e) {
                var t, s;
                i.axis.x.track.el &&
                  i.axis.y.track.el &&
                  i.axis.x.scrollbar.el &&
                  i.axis.y.scrollbar.el &&
                  ((i.axis.x.track.rect =
                    i.axis.x.track.el.getBoundingClientRect()),
                  (i.axis.y.track.rect =
                    i.axis.y.track.el.getBoundingClientRect()),
                  (i.axis.x.isOverflowing || i.axis.x.forceVisible) &&
                    (t = i.isWithinBounds(i.axis.x.track.rect)),
                  (i.axis.y.isOverflowing || i.axis.y.forceVisible) &&
                    (s = i.isWithinBounds(i.axis.y.track.rect)),
                  (t || s) &&
                    (e.stopPropagation(),
                    "pointerdown" === e.type &&
                      "touch" !== e.pointerType &&
                      (t &&
                        ((i.axis.x.scrollbar.rect =
                          i.axis.x.scrollbar.el.getBoundingClientRect()),
                        i.isWithinBounds(i.axis.x.scrollbar.rect)
                          ? i.onDragStart(e, "x")
                          : i.onTrackClick(e, "x")),
                      s &&
                        ((i.axis.y.scrollbar.rect =
                          i.axis.y.scrollbar.el.getBoundingClientRect()),
                        i.isWithinBounds(i.axis.y.scrollbar.rect)
                          ? i.onDragStart(e, "y")
                          : i.onTrackClick(e, "y")))));
              }),
              (this.drag = function (t) {
                var s, n, a, r, l, o, c, d, u, p, h;
                if (i.draggedAxis && i.contentWrapperEl) {
                  var m = i.axis[i.draggedAxis].track,
                    f =
                      null !==
                        (n =
                          null === (s = m.rect) || void 0 === s
                            ? void 0
                            : s[i.axis[i.draggedAxis].sizeAttr]) && void 0 !== n
                        ? n
                        : 0,
                    g = i.axis[i.draggedAxis].scrollbar,
                    v =
                      null !==
                        (r =
                          null === (a = i.contentWrapperEl) || void 0 === a
                            ? void 0
                            : a[i.axis[i.draggedAxis].scrollSizeAttr]) &&
                      void 0 !== r
                        ? r
                        : 0,
                    b = parseInt(
                      null !==
                        (o =
                          null === (l = i.elStyles) || void 0 === l
                            ? void 0
                            : l[i.axis[i.draggedAxis].sizeAttr]) && void 0 !== o
                        ? o
                        : "0px",
                      10,
                    );
                  (t.preventDefault(), t.stopPropagation());
                  var y =
                      ("y" === i.draggedAxis ? t.pageY : t.pageX) -
                      (null !==
                        (d =
                          null === (c = m.rect) || void 0 === c
                            ? void 0
                            : c[i.axis[i.draggedAxis].offsetAttr]) &&
                      void 0 !== d
                        ? d
                        : 0) -
                      i.axis[i.draggedAxis].dragOffset,
                    w =
                      ((y =
                        "x" === i.draggedAxis && i.isRtl
                          ? (null !==
                              (p =
                                null === (u = m.rect) || void 0 === u
                                  ? void 0
                                  : u[i.axis[i.draggedAxis].sizeAttr]) &&
                            void 0 !== p
                              ? p
                              : 0) -
                            g.size -
                            y
                          : y) /
                        (f - g.size)) *
                      (v - b);
                  ("x" === i.draggedAxis &&
                    i.isRtl &&
                    (w = (
                      null === (h = e.getRtlHelpers()) || void 0 === h
                        ? void 0
                        : h.isScrollingToNegative
                    )
                      ? -w
                      : w),
                    (i.contentWrapperEl[
                      i.axis[i.draggedAxis].scrollOffsetAttr
                    ] = w));
                }
              }),
              (this.onEndDrag = function (e) {
                i.isDragging = !1;
                var t = wt(i.el),
                  s = yt(i.el);
                (e.preventDefault(),
                  e.stopPropagation(),
                  xt(i.el, i.classNames.dragging),
                  i.onStopScrolling(),
                  t.removeEventListener("mousemove", i.drag, !0),
                  t.removeEventListener("mouseup", i.onEndDrag, !0),
                  (i.removePreventClickId = s.setTimeout(function () {
                    (t.removeEventListener("click", i.preventClick, !0),
                      t.removeEventListener("dblclick", i.preventClick, !0),
                      (i.removePreventClickId = null));
                  })));
              }),
              (this.preventClick = function (e) {
                (e.preventDefault(), e.stopPropagation());
              }),
              (this.el = t),
              (this.options = lt(lt({}, e.defaultOptions), s)),
              (this.classNames = lt(
                lt({}, e.defaultOptions.classNames),
                s.classNames,
              )),
              (this.axis = {
                x: {
                  scrollOffsetAttr: "scrollLeft",
                  sizeAttr: "width",
                  scrollSizeAttr: "scrollWidth",
                  offsetSizeAttr: "offsetWidth",
                  offsetAttr: "left",
                  overflowAttr: "overflowX",
                  dragOffset: 0,
                  isOverflowing: !0,
                  forceVisible: !1,
                  track: { size: null, el: null, rect: null, isVisible: !1 },
                  scrollbar: {
                    size: null,
                    el: null,
                    rect: null,
                    isVisible: !1,
                  },
                },
                y: {
                  scrollOffsetAttr: "scrollTop",
                  sizeAttr: "height",
                  scrollSizeAttr: "scrollHeight",
                  offsetSizeAttr: "offsetHeight",
                  offsetAttr: "top",
                  overflowAttr: "overflowY",
                  dragOffset: 0,
                  isOverflowing: !0,
                  forceVisible: !1,
                  track: { size: null, el: null, rect: null, isVisible: !1 },
                  scrollbar: {
                    size: null,
                    el: null,
                    rect: null,
                    isVisible: !1,
                  },
                },
              }),
              "object" != typeof this.el || !this.el.nodeName)
            )
              throw new Error(
                "Argument passed to SimpleBar must be an HTML element instead of ".concat(
                  this.el,
                ),
              );
            ((this.onMouseMove = rt(this._onMouseMove, 64)),
              (this.onWindowResize = at(this._onWindowResize, 64, {
                leading: !0,
              })),
              (this.onStopScrolling = at(
                this._onStopScrolling,
                this.stopScrollDelay,
              )),
              (this.onMouseEntered = at(
                this._onMouseEntered,
                this.stopScrollDelay,
              )),
              this.init());
          }
          return (
            (e.getRtlHelpers = function () {
              if (e.rtlHelpers) return e.rtlHelpers;
              var t = document.createElement("div");
              t.innerHTML =
                '<div class="simplebar-dummy-scrollbar-size"><div></div></div>';
              var s = t.firstElementChild,
                i = null == s ? void 0 : s.firstElementChild;
              if (!i) return null;
              (document.body.appendChild(s), (s.scrollLeft = 0));
              var n = e.getOffset(s),
                a = e.getOffset(i);
              s.scrollLeft = -999;
              var r = e.getOffset(i);
              return (
                document.body.removeChild(s),
                (e.rtlHelpers = {
                  isScrollOriginAtZero: n.left !== a.left,
                  isScrollingToNegative: a.left !== r.left,
                }),
                e.rtlHelpers
              );
            }),
            (e.prototype.getScrollbarWidth = function () {
              try {
                return (this.contentWrapperEl &&
                  "none" ===
                    getComputedStyle(
                      this.contentWrapperEl,
                      "::-webkit-scrollbar",
                    ).display) ||
                  "scrollbarWidth" in document.documentElement.style ||
                  "-ms-overflow-style" in document.documentElement.style
                  ? 0
                  : bt();
              } catch (e) {
                return bt();
              }
            }),
            (e.getOffset = function (e) {
              var t = e.getBoundingClientRect(),
                s = wt(e),
                i = yt(e);
              return {
                top: t.top + (i.pageYOffset || s.documentElement.scrollTop),
                left: t.left + (i.pageXOffset || s.documentElement.scrollLeft),
              };
            }),
            (e.prototype.init = function () {
              mt &&
                (this.initDOM(),
                (this.rtlHelpers = e.getRtlHelpers()),
                (this.scrollbarWidth = this.getScrollbarWidth()),
                this.recalculate(),
                this.initListeners());
            }),
            (e.prototype.initDOM = function () {
              var e, t;
              ((this.wrapperEl = this.el.querySelector(
                Tt(this.classNames.wrapper),
              )),
                (this.contentWrapperEl =
                  this.options.scrollableNode ||
                  this.el.querySelector(Tt(this.classNames.contentWrapper))),
                (this.contentEl =
                  this.options.contentNode ||
                  this.el.querySelector(Tt(this.classNames.contentEl))),
                (this.offsetEl = this.el.querySelector(
                  Tt(this.classNames.offset),
                )),
                (this.maskEl = this.el.querySelector(Tt(this.classNames.mask))),
                (this.placeholderEl = this.findChild(
                  this.wrapperEl,
                  Tt(this.classNames.placeholder),
                )),
                (this.heightAutoObserverWrapperEl = this.el.querySelector(
                  Tt(this.classNames.heightAutoObserverWrapperEl),
                )),
                (this.heightAutoObserverEl = this.el.querySelector(
                  Tt(this.classNames.heightAutoObserverEl),
                )),
                (this.axis.x.track.el = this.findChild(
                  this.el,
                  ""
                    .concat(Tt(this.classNames.track))
                    .concat(Tt(this.classNames.horizontal)),
                )),
                (this.axis.y.track.el = this.findChild(
                  this.el,
                  ""
                    .concat(Tt(this.classNames.track))
                    .concat(Tt(this.classNames.vertical)),
                )),
                (this.axis.x.scrollbar.el =
                  (null === (e = this.axis.x.track.el) || void 0 === e
                    ? void 0
                    : e.querySelector(Tt(this.classNames.scrollbar))) || null),
                (this.axis.y.scrollbar.el =
                  (null === (t = this.axis.y.track.el) || void 0 === t
                    ? void 0
                    : t.querySelector(Tt(this.classNames.scrollbar))) || null),
                this.options.autoHide ||
                  (Et(this.axis.x.scrollbar.el, this.classNames.visible),
                  Et(this.axis.y.scrollbar.el, this.classNames.visible)));
            }),
            (e.prototype.initListeners = function () {
              var e,
                t = this,
                s = yt(this.el);
              if (
                (this.el.addEventListener("mouseenter", this.onMouseEnter),
                this.el.addEventListener(
                  "pointerdown",
                  this.onPointerEvent,
                  !0,
                ),
                this.el.addEventListener("mousemove", this.onMouseMove),
                this.el.addEventListener("mouseleave", this.onMouseLeave),
                null === (e = this.contentWrapperEl) ||
                  void 0 === e ||
                  e.addEventListener("scroll", this.onScroll),
                s.addEventListener("resize", this.onWindowResize),
                this.contentEl)
              ) {
                if (window.ResizeObserver) {
                  var i = !1,
                    n = s.ResizeObserver || ResizeObserver;
                  ((this.resizeObserver = new n(function () {
                    i &&
                      s.requestAnimationFrame(function () {
                        t.recalculate();
                      });
                  })),
                    this.resizeObserver.observe(this.el),
                    this.resizeObserver.observe(this.contentEl),
                    s.requestAnimationFrame(function () {
                      i = !0;
                    }));
                }
                ((this.mutationObserver = new s.MutationObserver(function () {
                  s.requestAnimationFrame(function () {
                    t.recalculate();
                  });
                })),
                  this.mutationObserver.observe(this.contentEl, {
                    childList: !0,
                    subtree: !0,
                    characterData: !0,
                  }));
              }
            }),
            (e.prototype.recalculate = function () {
              if (
                this.heightAutoObserverEl &&
                this.contentEl &&
                this.contentWrapperEl &&
                this.wrapperEl &&
                this.placeholderEl
              ) {
                var e = yt(this.el);
                ((this.elStyles = e.getComputedStyle(this.el)),
                  (this.isRtl = "rtl" === this.elStyles.direction));
                var t = this.contentEl.offsetWidth,
                  s = this.heightAutoObserverEl.offsetHeight <= 1,
                  i = this.heightAutoObserverEl.offsetWidth <= 1 || t > 0,
                  n = this.contentWrapperEl.offsetWidth,
                  a = this.elStyles.overflowX,
                  r = this.elStyles.overflowY;
                ((this.contentEl.style.padding = ""
                  .concat(this.elStyles.paddingTop, " ")
                  .concat(this.elStyles.paddingRight, " ")
                  .concat(this.elStyles.paddingBottom, " ")
                  .concat(this.elStyles.paddingLeft)),
                  (this.wrapperEl.style.margin = "-"
                    .concat(this.elStyles.paddingTop, " -")
                    .concat(this.elStyles.paddingRight, " -")
                    .concat(this.elStyles.paddingBottom, " -")
                    .concat(this.elStyles.paddingLeft)));
                var l = this.contentEl.scrollHeight,
                  o = this.contentEl.scrollWidth;
                ((this.contentWrapperEl.style.height = s ? "auto" : "100%"),
                  (this.placeholderEl.style.width = i
                    ? "".concat(t || o, "px")
                    : "auto"),
                  (this.placeholderEl.style.height = "".concat(l, "px")));
                var c = this.contentWrapperEl.offsetHeight;
                ((this.axis.x.isOverflowing = 0 !== t && o > t),
                  (this.axis.y.isOverflowing = l > c),
                  (this.axis.x.isOverflowing =
                    "hidden" !== a && this.axis.x.isOverflowing),
                  (this.axis.y.isOverflowing =
                    "hidden" !== r && this.axis.y.isOverflowing),
                  (this.axis.x.forceVisible =
                    "x" === this.options.forceVisible ||
                    !0 === this.options.forceVisible),
                  (this.axis.y.forceVisible =
                    "y" === this.options.forceVisible ||
                    !0 === this.options.forceVisible),
                  this.hideNativeScrollbar());
                var d = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
                  u = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
                ((this.axis.x.isOverflowing =
                  this.axis.x.isOverflowing && o > n - u),
                  (this.axis.y.isOverflowing =
                    this.axis.y.isOverflowing && l > c - d),
                  (this.axis.x.scrollbar.size = this.getScrollbarSize("x")),
                  (this.axis.y.scrollbar.size = this.getScrollbarSize("y")),
                  this.axis.x.scrollbar.el &&
                    (this.axis.x.scrollbar.el.style.width = "".concat(
                      this.axis.x.scrollbar.size,
                      "px",
                    )),
                  this.axis.y.scrollbar.el &&
                    (this.axis.y.scrollbar.el.style.height = "".concat(
                      this.axis.y.scrollbar.size,
                      "px",
                    )),
                  this.positionScrollbar("x"),
                  this.positionScrollbar("y"),
                  this.toggleTrackVisibility("x"),
                  this.toggleTrackVisibility("y"));
              }
            }),
            (e.prototype.getScrollbarSize = function (e) {
              var t, s;
              if (
                (void 0 === e && (e = "y"),
                !this.axis[e].isOverflowing || !this.contentEl)
              )
                return 0;
              var i,
                n = this.contentEl[this.axis[e].scrollSizeAttr],
                a =
                  null !==
                    (s =
                      null === (t = this.axis[e].track.el) || void 0 === t
                        ? void 0
                        : t[this.axis[e].offsetSizeAttr]) && void 0 !== s
                    ? s
                    : 0,
                r = a / n;
              return (
                (i = Math.max(~~(r * a), this.options.scrollbarMinSize)),
                this.options.scrollbarMaxSize &&
                  (i = Math.min(i, this.options.scrollbarMaxSize)),
                i
              );
            }),
            (e.prototype.positionScrollbar = function (t) {
              var s, i, n;
              void 0 === t && (t = "y");
              var a = this.axis[t].scrollbar;
              if (
                this.axis[t].isOverflowing &&
                this.contentWrapperEl &&
                a.el &&
                this.elStyles
              ) {
                var r = this.contentWrapperEl[this.axis[t].scrollSizeAttr],
                  l =
                    (null === (s = this.axis[t].track.el) || void 0 === s
                      ? void 0
                      : s[this.axis[t].offsetSizeAttr]) || 0,
                  o = parseInt(this.elStyles[this.axis[t].sizeAttr], 10),
                  c = this.contentWrapperEl[this.axis[t].scrollOffsetAttr];
                ((c =
                  "x" === t &&
                  this.isRtl &&
                  (null === (i = e.getRtlHelpers()) || void 0 === i
                    ? void 0
                    : i.isScrollOriginAtZero)
                    ? -c
                    : c),
                  "x" === t &&
                    this.isRtl &&
                    (c = (
                      null === (n = e.getRtlHelpers()) || void 0 === n
                        ? void 0
                        : n.isScrollingToNegative
                    )
                      ? c
                      : -c));
                var d = c / (r - o),
                  u = ~~((l - a.size) * d);
                ((u = "x" === t && this.isRtl ? -u + (l - a.size) : u),
                  (a.el.style.transform =
                    "x" === t
                      ? "translate3d(".concat(u, "px, 0, 0)")
                      : "translate3d(0, ".concat(u, "px, 0)")));
              }
            }),
            (e.prototype.toggleTrackVisibility = function (e) {
              void 0 === e && (e = "y");
              var t = this.axis[e].track.el,
                s = this.axis[e].scrollbar.el;
              t &&
                s &&
                this.contentWrapperEl &&
                (this.axis[e].isOverflowing || this.axis[e].forceVisible
                  ? ((t.style.visibility = "visible"),
                    (this.contentWrapperEl.style[this.axis[e].overflowAttr] =
                      "scroll"),
                    this.el.classList.add(
                      "".concat(this.classNames.scrollable, "-").concat(e),
                    ))
                  : ((t.style.visibility = "hidden"),
                    (this.contentWrapperEl.style[this.axis[e].overflowAttr] =
                      "hidden"),
                    this.el.classList.remove(
                      "".concat(this.classNames.scrollable, "-").concat(e),
                    )),
                this.axis[e].isOverflowing
                  ? (s.style.display = "block")
                  : (s.style.display = "none"));
            }),
            (e.prototype.showScrollbar = function (e) {
              (void 0 === e && (e = "y"),
                this.axis[e].isOverflowing &&
                  !this.axis[e].scrollbar.isVisible &&
                  (Et(this.axis[e].scrollbar.el, this.classNames.visible),
                  (this.axis[e].scrollbar.isVisible = !0)));
            }),
            (e.prototype.hideScrollbar = function (e) {
              (void 0 === e && (e = "y"),
                this.isDragging ||
                  (this.axis[e].isOverflowing &&
                    this.axis[e].scrollbar.isVisible &&
                    (xt(this.axis[e].scrollbar.el, this.classNames.visible),
                    (this.axis[e].scrollbar.isVisible = !1))));
            }),
            (e.prototype.hideNativeScrollbar = function () {
              this.offsetEl &&
                ((this.offsetEl.style[this.isRtl ? "left" : "right"] =
                  this.axis.y.isOverflowing || this.axis.y.forceVisible
                    ? "-".concat(this.scrollbarWidth, "px")
                    : "0px"),
                (this.offsetEl.style.bottom =
                  this.axis.x.isOverflowing || this.axis.x.forceVisible
                    ? "-".concat(this.scrollbarWidth, "px")
                    : "0px"));
            }),
            (e.prototype.onMouseMoveForAxis = function (e) {
              void 0 === e && (e = "y");
              var t = this.axis[e];
              t.track.el &&
                t.scrollbar.el &&
                ((t.track.rect = t.track.el.getBoundingClientRect()),
                (t.scrollbar.rect = t.scrollbar.el.getBoundingClientRect()),
                this.isWithinBounds(t.track.rect)
                  ? (this.showScrollbar(e),
                    Et(t.track.el, this.classNames.hover),
                    this.isWithinBounds(t.scrollbar.rect)
                      ? Et(t.scrollbar.el, this.classNames.hover)
                      : xt(t.scrollbar.el, this.classNames.hover))
                  : (xt(t.track.el, this.classNames.hover),
                    this.options.autoHide && this.hideScrollbar(e)));
            }),
            (e.prototype.onMouseLeaveForAxis = function (e) {
              (void 0 === e && (e = "y"),
                xt(this.axis[e].track.el, this.classNames.hover),
                xt(this.axis[e].scrollbar.el, this.classNames.hover),
                this.options.autoHide && this.hideScrollbar(e));
            }),
            (e.prototype.onDragStart = function (e, t) {
              var s;
              (void 0 === t && (t = "y"), (this.isDragging = !0));
              var i = wt(this.el),
                n = yt(this.el),
                a = this.axis[t].scrollbar,
                r = "y" === t ? e.pageY : e.pageX;
              ((this.axis[t].dragOffset =
                r -
                ((null === (s = a.rect) || void 0 === s
                  ? void 0
                  : s[this.axis[t].offsetAttr]) || 0)),
                (this.draggedAxis = t),
                Et(this.el, this.classNames.dragging),
                i.addEventListener("mousemove", this.drag, !0),
                i.addEventListener("mouseup", this.onEndDrag, !0),
                null === this.removePreventClickId
                  ? (i.addEventListener("click", this.preventClick, !0),
                    i.addEventListener("dblclick", this.preventClick, !0))
                  : (n.clearTimeout(this.removePreventClickId),
                    (this.removePreventClickId = null)));
            }),
            (e.prototype.onTrackClick = function (e, t) {
              var s,
                i,
                n,
                a,
                r = this;
              void 0 === t && (t = "y");
              var l = this.axis[t];
              if (
                this.options.clickOnTrack &&
                l.scrollbar.el &&
                this.contentWrapperEl
              ) {
                e.preventDefault();
                var o = yt(this.el);
                this.axis[t].scrollbar.rect =
                  l.scrollbar.el.getBoundingClientRect();
                var c =
                    null !==
                      (i =
                        null === (s = this.axis[t].scrollbar.rect) ||
                        void 0 === s
                          ? void 0
                          : s[this.axis[t].offsetAttr]) && void 0 !== i
                      ? i
                      : 0,
                  d = parseInt(
                    null !==
                      (a =
                        null === (n = this.elStyles) || void 0 === n
                          ? void 0
                          : n[this.axis[t].sizeAttr]) && void 0 !== a
                      ? a
                      : "0px",
                    10,
                  ),
                  u = this.contentWrapperEl[this.axis[t].scrollOffsetAttr],
                  p =
                    ("y" === t ? this.mouseY - c : this.mouseX - c) < 0
                      ? -1
                      : 1,
                  h = -1 === p ? u - d : u + d,
                  m = function () {
                    r.contentWrapperEl &&
                      (-1 === p
                        ? u > h &&
                          ((u -= 40),
                          (r.contentWrapperEl[r.axis[t].scrollOffsetAttr] = u),
                          o.requestAnimationFrame(m))
                        : u < h &&
                          ((u += 40),
                          (r.contentWrapperEl[r.axis[t].scrollOffsetAttr] = u),
                          o.requestAnimationFrame(m)));
                  };
                m();
              }
            }),
            (e.prototype.getContentElement = function () {
              return this.contentEl;
            }),
            (e.prototype.getScrollElement = function () {
              return this.contentWrapperEl;
            }),
            (e.prototype.removeListeners = function () {
              var e = yt(this.el);
              (this.el.removeEventListener("mouseenter", this.onMouseEnter),
                this.el.removeEventListener(
                  "pointerdown",
                  this.onPointerEvent,
                  !0,
                ),
                this.el.removeEventListener("mousemove", this.onMouseMove),
                this.el.removeEventListener("mouseleave", this.onMouseLeave),
                this.contentWrapperEl &&
                  this.contentWrapperEl.removeEventListener(
                    "scroll",
                    this.onScroll,
                  ),
                e.removeEventListener("resize", this.onWindowResize),
                this.mutationObserver && this.mutationObserver.disconnect(),
                this.resizeObserver && this.resizeObserver.disconnect(),
                this.onMouseMove.cancel(),
                this.onWindowResize.cancel(),
                this.onStopScrolling.cancel(),
                this.onMouseEntered.cancel());
            }),
            (e.prototype.unMount = function () {
              this.removeListeners();
            }),
            (e.prototype.isWithinBounds = function (e) {
              return (
                this.mouseX >= e.left &&
                this.mouseX <= e.left + e.width &&
                this.mouseY >= e.top &&
                this.mouseY <= e.top + e.height
              );
            }),
            (e.prototype.findChild = function (e, t) {
              var s =
                e.matches ||
                e.webkitMatchesSelector ||
                e.mozMatchesSelector ||
                e.msMatchesSelector;
              return Array.prototype.filter.call(e.children, function (e) {
                return s.call(e, t);
              })[0];
            }),
            (e.rtlHelpers = null),
            (e.defaultOptions = {
              forceVisible: !1,
              clickOnTrack: !0,
              scrollbarMinSize: 25,
              scrollbarMaxSize: 0,
              ariaLabel: "scrollable content",
              tabIndex: 0,
              classNames: {
                contentEl: "simplebar-content",
                contentWrapper: "simplebar-content-wrapper",
                offset: "simplebar-offset",
                mask: "simplebar-mask",
                wrapper: "simplebar-wrapper",
                placeholder: "simplebar-placeholder",
                scrollbar: "simplebar-scrollbar",
                track: "simplebar-track",
                heightAutoObserverWrapperEl:
                  "simplebar-height-auto-observer-wrapper",
                heightAutoObserverEl: "simplebar-height-auto-observer",
                visible: "simplebar-visible",
                horizontal: "simplebar-horizontal",
                vertical: "simplebar-vertical",
                hover: "simplebar-hover",
                dragging: "simplebar-dragging",
                scrolling: "simplebar-scrolling",
                scrollable: "simplebar-scrollable",
                mouseEntered: "simplebar-mouse-entered",
              },
              scrollableNode: null,
              contentNode: null,
              autoHide: !0,
            }),
            (e.getOptions = St),
            (e.helpers = ft),
            e
          );
        })(),
        At = function (e, t) {
          return (
            (At =
              Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array &&
                function (e, t) {
                  e.__proto__ = t;
                }) ||
              function (e, t) {
                for (var s in t)
                  Object.prototype.hasOwnProperty.call(t, s) && (e[s] = t[s]);
              }),
            At(e, t)
          );
        };
      var Lt = Ct.helpers,
        Ot = Lt.getOptions,
        _t = Lt.addClasses,
        Mt = Lt.canUseDOM,
        kt = (function (e) {
          function t() {
            for (var s = [], i = 0; i < arguments.length; i++)
              s[i] = arguments[i];
            var n = e.apply(this, s) || this;
            return (t.instances.set(s[0], n), n);
          }
          return (
            (function (e, t) {
              if ("function" != typeof t && null !== t)
                throw new TypeError(
                  "Class extends value " +
                    String(t) +
                    " is not a constructor or null",
                );
              function s() {
                this.constructor = e;
              }
              (At(e, t),
                (e.prototype =
                  null === t
                    ? Object.create(t)
                    : ((s.prototype = t.prototype), new s())));
            })(t, e),
            (t.initDOMLoadedElements = function () {
              (document.removeEventListener(
                "DOMContentLoaded",
                this.initDOMLoadedElements,
              ),
                window.removeEventListener("load", this.initDOMLoadedElements),
                Array.prototype.forEach.call(
                  document.querySelectorAll("[data-simplebar]"),
                  function (e) {
                    "init" === e.getAttribute("data-simplebar") ||
                      t.instances.has(e) ||
                      new t(e, Ot(e.attributes));
                  },
                ));
            }),
            (t.removeObserver = function () {
              var e;
              null === (e = t.globalObserver) || void 0 === e || e.disconnect();
            }),
            (t.prototype.initDOM = function () {
              var e,
                t,
                s,
                i = this;
              if (
                !Array.prototype.filter.call(this.el.children, function (e) {
                  return e.classList.contains(i.classNames.wrapper);
                }).length
              ) {
                for (
                  this.wrapperEl = document.createElement("div"),
                    this.contentWrapperEl = document.createElement("div"),
                    this.offsetEl = document.createElement("div"),
                    this.maskEl = document.createElement("div"),
                    this.contentEl = document.createElement("div"),
                    this.placeholderEl = document.createElement("div"),
                    this.heightAutoObserverWrapperEl =
                      document.createElement("div"),
                    this.heightAutoObserverEl = document.createElement("div"),
                    _t(this.wrapperEl, this.classNames.wrapper),
                    _t(this.contentWrapperEl, this.classNames.contentWrapper),
                    _t(this.offsetEl, this.classNames.offset),
                    _t(this.maskEl, this.classNames.mask),
                    _t(this.contentEl, this.classNames.contentEl),
                    _t(this.placeholderEl, this.classNames.placeholder),
                    _t(
                      this.heightAutoObserverWrapperEl,
                      this.classNames.heightAutoObserverWrapperEl,
                    ),
                    _t(
                      this.heightAutoObserverEl,
                      this.classNames.heightAutoObserverEl,
                    );
                  this.el.firstChild;
                )
                  this.contentEl.appendChild(this.el.firstChild);
                (this.contentWrapperEl.appendChild(this.contentEl),
                  this.offsetEl.appendChild(this.contentWrapperEl),
                  this.maskEl.appendChild(this.offsetEl),
                  this.heightAutoObserverWrapperEl.appendChild(
                    this.heightAutoObserverEl,
                  ),
                  this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl),
                  this.wrapperEl.appendChild(this.maskEl),
                  this.wrapperEl.appendChild(this.placeholderEl),
                  this.el.appendChild(this.wrapperEl),
                  null === (e = this.contentWrapperEl) ||
                    void 0 === e ||
                    e.setAttribute(
                      "tabindex",
                      this.options.tabIndex.toString(),
                    ),
                  null === (t = this.contentWrapperEl) ||
                    void 0 === t ||
                    t.setAttribute("role", "region"),
                  null === (s = this.contentWrapperEl) ||
                    void 0 === s ||
                    s.setAttribute("aria-label", this.options.ariaLabel));
              }
              if (!this.axis.x.track.el || !this.axis.y.track.el) {
                var n = document.createElement("div"),
                  a = document.createElement("div");
                (_t(n, this.classNames.track),
                  _t(a, this.classNames.scrollbar),
                  n.appendChild(a),
                  (this.axis.x.track.el = n.cloneNode(!0)),
                  _t(this.axis.x.track.el, this.classNames.horizontal),
                  (this.axis.y.track.el = n.cloneNode(!0)),
                  _t(this.axis.y.track.el, this.classNames.vertical),
                  this.el.appendChild(this.axis.x.track.el),
                  this.el.appendChild(this.axis.y.track.el));
              }
              (Ct.prototype.initDOM.call(this),
                this.el.setAttribute("data-simplebar", "init"));
            }),
            (t.prototype.unMount = function () {
              (Ct.prototype.unMount.call(this), t.instances.delete(this.el));
            }),
            (t.initHtmlApi = function () {
              ((this.initDOMLoadedElements =
                this.initDOMLoadedElements.bind(this)),
                "undefined" != typeof MutationObserver &&
                  ((this.globalObserver = new MutationObserver(
                    t.handleMutations,
                  )),
                  this.globalObserver.observe(document, {
                    childList: !0,
                    subtree: !0,
                  })),
                "complete" === document.readyState ||
                ("loading" !== document.readyState &&
                  !document.documentElement.doScroll)
                  ? window.setTimeout(this.initDOMLoadedElements)
                  : (document.addEventListener(
                      "DOMContentLoaded",
                      this.initDOMLoadedElements,
                    ),
                    window.addEventListener(
                      "load",
                      this.initDOMLoadedElements,
                    )));
            }),
            (t.handleMutations = function (e) {
              e.forEach(function (e) {
                (e.addedNodes.forEach(function (e) {
                  1 === e.nodeType &&
                    (e.hasAttribute("data-simplebar")
                      ? !t.instances.has(e) &&
                        document.documentElement.contains(e) &&
                        new t(e, Ot(e.attributes))
                      : e
                          .querySelectorAll("[data-simplebar]")
                          .forEach(function (e) {
                            "init" !== e.getAttribute("data-simplebar") &&
                              !t.instances.has(e) &&
                              document.documentElement.contains(e) &&
                              new t(e, Ot(e.attributes));
                          }));
                }),
                  e.removedNodes.forEach(function (e) {
                    var s;
                    1 === e.nodeType &&
                      ("init" === e.getAttribute("data-simplebar")
                        ? !document.documentElement.contains(e) &&
                          (null === (s = t.instances.get(e)) ||
                            void 0 === s ||
                            s.unMount())
                        : Array.prototype.forEach.call(
                            e.querySelectorAll('[data-simplebar="init"]'),
                            function (e) {
                              var s;
                              !document.documentElement.contains(e) &&
                                (null === (s = t.instances.get(e)) ||
                                  void 0 === s ||
                                  s.unMount());
                            },
                          ));
                  }));
              });
            }),
            (t.instances = new WeakMap()),
            t
          );
        })(Ct);
      Mt && kt.initHtmlApi();
      new (s(144))({
        elements_selector: "[data-src]",
        class_loaded: "_lazy-loaded",
      });
      let Pt = !1;
      setTimeout(() => {
        if (Pt) {
          let e = new Event("windowScroll");
          window.addEventListener("scroll", function (t) {
            document.dispatchEvent(e);
          });
        }
      }, 0);
      document.querySelector(".quantity-btn__plus");
      const It = document.querySelector(".quantity-btn__minus");
      let zt,
        Dt,
        $t = document.querySelector(".quantity-btn__input");
      (document.addEventListener("click", function (e) {
        ((Dt = e.target),
          (function () {
            if (i.any())
              if (Dt.closest(".menu__item"))
                Dt.closest(".menu__item").classList.toggle("sub-menu-active");
              else {
                let e = document.querySelector(".sub-menu-active");
                e && e.classList.remove("sub-menu-active");
              }
          })(),
          Dt.closest(".quantity-btn__plus") &&
            (zt++,
            1 == zt
              ? It && It.classList.add("_btn-disable")
              : It.classList.remove("_btn-disable"),
            ($t.value = zt)),
          Dt.closest(".quantity-btn__minus") &&
            (zt--,
            1 == zt
              ? It && It.classList.add("_btn-disable")
              : It.classList.remove("_btn-disable"),
            ($t.value = zt),
            zt <= 0
              ? (console.log($t.value),
                (zt = 1),
                ($t.value = zt),
                It.classList.add("_btn-disable"))
              : It.classList.remove("_btn-disable")));
      }),
        $t &&
          ((zt = $t.value),
          $t.addEventListener("keyup", (e) => {
            let t = e.currentTarget;
            ("0" == t.value && (t.value = 1),
              (zt = $t.value),
              1 == zt
                ? It && It.classList.add("_btn-disable")
                : It.classList.remove("_btn-disable"));
          }),
          $t.addEventListener("keypress", (e) => {
            !(function (e) {
              var t = e.which ? e.which : e.keyCode;
              t > 31 && (t < 48 || t > 57) && e.preventDefault();
            })(e);
          }),
          $t.addEventListener("change", (e) => {
            let t = e.currentTarget;
            (t.value || (t.value = 1),
              (zt = $t.value),
              1 == zt
                ? It && It.classList.add("_btn-disable")
                : It.classList.remove("_btn-disable"));
          })));
      let Nt,
        qt = !0;
      (document.addEventListener("click", function (e) {
        ((Nt = e.target),
          qt && Nt.closest(".menu-text")
            ? (document.documentElement.classList.add("menu-open"),
              document.documentElement.classList.add("no-scrolling"),
              (qt = !1))
            : Nt.closest(".menu") ||
              (document.documentElement.classList.remove("menu-open"),
              document.documentElement.classList.remove("no-scrolling"),
              (qt = !0)));
      }),
        (window.FLS = !0),
        (function (e) {
          let t = new Image();
          ((t.onload = t.onerror =
            function () {
              e(2 == t.height);
            }),
            (t.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA"));
        })(function (e) {
          let t = !0 === e ? "webp" : "no-webp";
          document.documentElement.classList.add(t);
        }),
        window.addEventListener("load", function () {
          setTimeout(function () {
            (document.documentElement.classList.add("loaded"),
              document.documentElement.classList.remove("no-scrolling"));
          }, 0);
        }),
        (function () {
          const e = document.querySelectorAll("[data-spollers]");
          if (e.length > 0) {
            const t = Array.from(e).filter(function (e, t, s) {
              return !e.dataset.spollers.split(",")[0];
            });
            t.length && i(t);
            let s = p(e, "spollers");
            function i(e, t = !1) {
              e.forEach((e) => {
                ((e = t ? e.item : e),
                  t.matches || !t
                    ? (e.classList.add("_spoller-init"),
                      a(e),
                      e.addEventListener("click", l))
                    : (e.classList.remove("_spoller-init"),
                      a(e, !1),
                      e.removeEventListener("click", l)));
              });
            }
            function a(e, t = !0) {
              const s = e.querySelectorAll("[data-spoller]");
              s.length > 0 &&
                s.forEach((e) => {
                  t
                    ? (e.removeAttribute("tabindex"),
                      e.classList.contains("_spoller-active") ||
                        (e.nextElementSibling.hidden = !0))
                    : (e.setAttribute("tabindex", "-1"),
                      (e.nextElementSibling.hidden = !1));
                });
            }
            function l(e) {
              const t = e.target;
              if (t.closest("[data-spoller]")) {
                const s = t.closest("[data-spoller]"),
                  i = s.closest("[data-spollers]"),
                  n = !!i.hasAttribute("data-one-spoller");
                (i.querySelectorAll("._slide").length ||
                  (n && !s.classList.contains("_spoller-active") && o(i),
                  s.classList.toggle("_spoller-active"),
                  r(s.nextElementSibling, 500)),
                  e.preventDefault());
              }
            }
            function o(e) {
              const t = e.querySelector("[data-spoller]._spoller-active");
              t &&
                (t.classList.remove("_spoller-active"),
                n(t.nextElementSibling, 500));
            }
            s &&
              s.length &&
              s.forEach((e) => {
                (e.matchMedia.addEventListener("change", function () {
                  i(e.itemsArray, e.matchMedia);
                }),
                  i(e.itemsArray, e.matchMedia));
              });
          }
        })(),
        (function () {
          const e = document.querySelectorAll("[data-tabs]");
          let t = [];
          if (e.length > 0) {
            const n = location.hash.replace("#", "");
            (n.startsWith("tab-") && (t = n.replace("tab-", "").split("-")),
              e.forEach((e, s) => {
                (e.classList.add("_tab-init"),
                  e.setAttribute("data-tabs-index", s),
                  e.addEventListener("click", i),
                  (function (e) {
                    const s = e.querySelectorAll("[data-tabs-titles]>*"),
                      i = e.querySelectorAll("[data-tabs-body]>*"),
                      n = e.dataset.tabsIndex,
                      a = t[0] == n;
                    if (a) {
                      e.querySelector(
                        "[data-tabs-titles]>._tab-active",
                      ).classList.remove("_tab-active");
                    }
                    i.length > 0 &&
                      i.forEach((e, i) => {
                        (s[i].setAttribute("data-tabs-title", ""),
                          e.setAttribute("data-tabs-item", ""),
                          a && i == t[1] && s[i].classList.add("_tab-active"),
                          (e.hidden = !s[i].classList.contains("_tab-active")));
                      });
                  })(e));
              }));
            let a = p(e, "tabs");
            a &&
              a.length &&
              a.forEach((e) => {
                (e.matchMedia.addEventListener("change", function () {
                  s(e.itemsArray, e.matchMedia);
                }),
                  s(e.itemsArray, e.matchMedia));
              });
          }
          function s(e, t) {
            e.forEach((e) => {
              const s = (e = e.item).querySelector("[data-tabs-titles]"),
                i = e.querySelectorAll("[data-tabs-title]"),
                n = e.querySelector("[data-tabs-body]");
              e.querySelectorAll("[data-tabs-item]").forEach((a, r) => {
                t.matches
                  ? (n.append(i[r]),
                    n.append(a),
                    e.classList.add("_tab-spoller"))
                  : (s.append(i[r]), e.classList.remove("_tab-spoller"));
              });
            });
          }
          function i(e) {
            const t = e.target;
            if (t.closest("[data-tabs-title]")) {
              const s = t.closest("[data-tabs-title]"),
                i = s.closest("[data-tabs]");
              if (
                !s.classList.contains("_tab-active") &&
                !i.querySelectorAll("._slide").length
              ) {
                const e = i.querySelector("[data-tabs-title]._tab-active");
                (e && e.classList.remove("_tab-active"),
                  s.classList.add("_tab-active"),
                  (function (e) {
                    const t = e.querySelectorAll("[data-tabs-title]"),
                      s = e.querySelectorAll("[data-tabs-item]"),
                      i = e.dataset.tabsIndex,
                      r = (function (e) {
                        if (e.hasAttribute("data-tabs-animate"))
                          return e.dataset.tabsAnimate > 0
                            ? e.dataset.tabsAnimate
                            : 500;
                      })(e);
                    s.length > 0 &&
                      s.forEach((e, s) => {
                        t[s].classList.contains("_tab-active")
                          ? (r ? a(e, r) : (e.hidden = !1),
                            e.closest(".popup") ||
                              (location.hash = `tab-${i}-${s}`))
                          : r
                            ? n(e, r)
                            : (e.hidden = !0);
                      });
                  })(i));
              }
              e.preventDefault();
            }
          }
        })(),
        new t({}),
        (function () {
          const e = document.querySelectorAll(
            "input[placeholder],textarea[placeholder]",
          );
          (e.length &&
            e.forEach((e) => {
              e.dataset.placeholder = e.placeholder;
            }),
            document.body.addEventListener("focusin", function (e) {
              const t = e.target;
              ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
                (t.dataset.placeholder && (t.placeholder = ""),
                t.classList.add("_form-focus"),
                t.parentElement.classList.add("_form-focus"),
                w.removeError(t));
            }),
            document.body.addEventListener("focusout", function (e) {
              const t = e.target;
              ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
                (t.dataset.placeholder &&
                  (t.placeholder = t.dataset.placeholder),
                t.classList.remove("_form-focus"),
                t.parentElement.classList.remove("_form-focus"),
                t.hasAttribute("data-validate") && w.validateInput(t));
            }));
        })(),
        (function (e) {
          const t = document.forms;
          if (t.length)
            for (const e of t)
              (e.addEventListener("submit", function (e) {
                s(e.target, e);
              }),
                e.addEventListener("reset", function (e) {
                  const t = e.target;
                  w.formClean(t);
                }));
          async function s(t, s) {
            if (0 === (e ? w.getErrors(t) : 0)) {
              if (t.hasAttribute("data-ajax")) {
                s.preventDefault();
                const e = t.getAttribute("action")
                    ? t.getAttribute("action").trim()
                    : "#",
                  n = t.getAttribute("method")
                    ? t.getAttribute("method").trim()
                    : "GET",
                  a = new FormData(t);
                t.classList.add("_sending");
                const r = await fetch(e, { method: n, body: a });
                if (r.ok) {
                  await r.json();
                  (t.classList.remove("_sending"), i(t));
                } else (alert("Ошибка"), t.classList.remove("_sending"));
              } else t.hasAttribute("data-dev") && (s.preventDefault(), i(t));
            } else {
              s.preventDefault();
              const e = t.querySelector("._form-error");
              e && t.hasAttribute("data-goto-error") && m(e, !0, 1e3);
            }
          }
          function i(e) {
            (document.dispatchEvent(
              new CustomEvent("formSent", { detail: { form: e } }),
            ),
              w.formClean(e),
              u(`[Формы]: ${"Форма отправлена!"}`));
          }
        })(!0),
        (function () {
          const e = document.querySelectorAll(".rating");
          e.length > 0 &&
            (function () {
              let t, s;
              for (let t = 0; t < e.length; t++) {
                i(e[t]);
              }
              function i(e) {
                (n(e), a(), e.classList.contains("rating_set") && r(e));
              }
              function n(e) {
                ((t = e.querySelector(".rating__active")),
                  (s = e.querySelector(".rating__value")));
              }
              function a(e = s.innerHTML) {
                const i = e / 0.05;
                t.style.width = `${i}%`;
              }
              function r(e) {
                const t = e.querySelectorAll(".rating__item");
                for (let i = 0; i < t.length; i++) {
                  const r = t[i];
                  (r.addEventListener("mouseenter", function (t) {
                    (n(e), a(r.value));
                  }),
                    r.addEventListener("mouseleave", function (e) {
                      a();
                    }),
                    r.addEventListener("click", function (t) {
                      (n(e),
                        e.dataset.ajax
                          ? l(r.value, e)
                          : ((s.innerHTML = i + 1), a()));
                    }));
                }
              }
              async function l(e, t) {
                if (!t.classList.contains("rating_sending")) {
                  t.classList.add("rating_sending");
                  let e = await fetch("rating.json", { method: "GET" });
                  if (e.ok) {
                    const i = (await e.json()).newRating;
                    ((s.innerHTML = i),
                      a(),
                      t.classList.remove("rating_sending"));
                  } else
                    (alert("Ошибка"), t.classList.remove("rating_sending"));
                }
              }
            })();
        })(),
        (g.selectModule = new f({})),
        (function () {
          function e(e) {
            if ("click" === e.type) {
              const t = e.target;
              if (t.closest("[data-goto]")) {
                const s = t.closest("[data-goto]"),
                  i = s.dataset.goto ? s.dataset.goto : "",
                  n = !!s.hasAttribute("data-goto-header"),
                  a = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
                (m(i, n, a), e.preventDefault());
              }
            } else if ("watcherCallback" === e.type && e.detail) {
              const t = e.detail.entry,
                s = t.target;
              if ("navigator" === s.dataset.watch) {
                const e = s.id,
                  i =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="#${e}"]`));
                t.isIntersecting
                  ? i && i.classList.add("_navigator-active")
                  : i && i.classList.remove("_navigator-active");
              }
            }
          }
          (document.addEventListener("click", e),
            document.addEventListener("watcherCallback", e));
        })());
    })());
})();
