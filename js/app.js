(() => {
  var e = {
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
          l = "src",
          r = "srcset",
          o = "sizes",
          d = "poster",
          c = "llOriginalAttrs",
          p = "data",
          u = "loading",
          h = "loaded",
          m = "applied",
          f = "error",
          g = "native",
          v = "data-",
          b = "ll-status",
          w = (e, t) => e.getAttribute(v + t),
          y = (e) => w(e, b),
          S = (e, t) =>
            ((e, t, s) => {
              const i = v + t;
              null !== s ? e.setAttribute(i, s) : e.removeAttribute(i);
            })(e, b, t),
          E = (e) => S(e, null),
          T = (e) => null === y(e),
          x = (e) => y(e) === g,
          C = [u, h, m, f],
          _ = (e, t, s, i) => {
            e &&
              "function" == typeof e &&
              (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i));
          },
          L = (t, s) => {
            e && "" !== s && t.classList.add(s);
          },
          A = (t, s) => {
            e && "" !== s && t.classList.remove(s);
          },
          P = (e) => e.llTempImage,
          M = (e, t) => {
            if (!t) return;
            const s = t._observer;
            s && s.unobserve(e);
          },
          O = (e, t) => {
            e && (e.loadingCount += t);
          },
          k = (e, t) => {
            e && (e.toLoadCount = t);
          },
          I = (e) => {
            let t = [];
            for (let s, i = 0; (s = e.children[i]); i += 1)
              "SOURCE" === s.tagName && t.push(s);
            return t;
          },
          $ = (e, t) => {
            const s = e.parentNode;
            s && "PICTURE" === s.tagName && I(s).forEach(t);
          },
          z = (e, t) => {
            I(e).forEach(t);
          },
          B = [l],
          D = [l, d],
          G = [l, r, o],
          q = [p],
          V = (e) => !!e[c],
          H = (e) => e[c],
          N = (e) => delete e[c],
          F = (e, t) => {
            if (V(e)) return;
            const s = {};
            (t.forEach((t) => {
              s[t] = e.getAttribute(t);
            }),
              (e[c] = s));
          },
          j = (e, t) => {
            if (!V(e)) return;
            const s = H(e);
            t.forEach((t) => {
              ((e, t, s) => {
                s ? e.setAttribute(t, s) : e.removeAttribute(t);
              })(e, t, s[t]);
            });
          },
          R = (e, t, s) => {
            (L(e, t.class_applied),
              S(e, m),
              s &&
                (t.unobserve_completed && M(e, t),
                _(t.callback_applied, e, s)));
          },
          W = (e, t, s) => {
            (L(e, t.class_loading),
              S(e, u),
              s && (O(s, 1), _(t.callback_loading, e, s)));
          },
          Y = (e, t, s) => {
            s && e.setAttribute(t, s);
          },
          X = (e, t) => {
            (Y(e, o, w(e, t.data_sizes)),
              Y(e, r, w(e, t.data_srcset)),
              Y(e, l, w(e, t.data_src)));
          },
          U = {
            IMG: (e, t) => {
              ($(e, (e) => {
                (F(e, G), X(e, t));
              }),
                F(e, G),
                X(e, t));
            },
            IFRAME: (e, t) => {
              (F(e, B), Y(e, l, w(e, t.data_src)));
            },
            VIDEO: (e, t) => {
              (z(e, (e) => {
                (F(e, B), Y(e, l, w(e, t.data_src)));
              }),
                F(e, D),
                Y(e, d, w(e, t.data_poster)),
                Y(e, l, w(e, t.data_src)),
                e.load());
            },
            OBJECT: (e, t) => {
              (F(e, q), Y(e, p, w(e, t.data_src)));
            },
          },
          Q = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
          Z = (e, t) => {
            !t ||
              ((e) => e.loadingCount > 0)(t) ||
              ((e) => e.toLoadCount > 0)(t) ||
              _(e.callback_finish, t);
          },
          J = (e, t, s) => {
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
              O(s, -1),
              ((e) => {
                e && (e.toLoadCount -= 1);
              })(s),
              A(e, t.class_loading),
              t.unobserve_completed && M(e, s));
          },
          ie = (e, t, s) => {
            const i = P(e) || e;
            ee(i) ||
              ((e, t, s) => {
                ee(e) || (e.llEvLisnrs = {});
                const i = "VIDEO" === e.tagName ? "loadeddata" : "load";
                (J(e, i, t), J(e, "error", s));
              })(
                i,
                (n) => {
                  (((e, t, s, i) => {
                    const n = x(t);
                    (se(t, s, i),
                      L(t, s.class_loaded),
                      S(t, h),
                      _(s.callback_loaded, t, i),
                      n || Z(s, i));
                  })(0, e, t, s),
                    te(i));
                },
                (n) => {
                  (((e, t, s, i) => {
                    const n = x(t);
                    (se(t, s, i),
                      L(t, s.class_error),
                      S(t, f),
                      _(s.callback_error, t, i),
                      s.restore_on_error && j(t, G),
                      n || Z(s, i));
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
                      i && (i(e, t), W(e, t, s));
                    })(e, t, s));
                })(e, t, i)
              : ((e, t, i) => {
                  (((e) => {
                    e.llTempImage = document.createElement("IMG");
                  })(e),
                    ie(e, t, i),
                    ((e) => {
                      V(e) ||
                        (e[c] = { backgroundImage: e.style.backgroundImage });
                    })(e),
                    ((e, t, i) => {
                      const n = w(e, t.data_bg),
                        a = w(e, t.data_bg_hidpi),
                        r = s && a ? a : n;
                      r &&
                        ((e.style.backgroundImage = `url("${r}")`),
                        P(e).setAttribute(l, r),
                        W(e, t, i));
                    })(e, t, i),
                    ((e, t, i) => {
                      const n = w(e, t.data_bg_multi),
                        a = w(e, t.data_bg_multi_hidpi),
                        l = s && a ? a : n;
                      l && ((e.style.backgroundImage = l), R(e, t, i));
                    })(e, t, i),
                    ((e, t, s) => {
                      const i = w(e, t.data_bg_set);
                      if (!i) return;
                      let n = i.split("|").map((e) => `image-set(${e})`);
                      ((e.style.backgroundImage = n.join()), R(e, t, s));
                    })(e, t, i));
                })(e, t, i);
          },
          ae = (e) => {
            (e.removeAttribute(l), e.removeAttribute(r), e.removeAttribute(o));
          },
          le = (e) => {
            ($(e, (e) => {
              j(e, G);
            }),
              j(e, G));
          },
          re = {
            IMG: le,
            IFRAME: (e) => {
              j(e, B);
            },
            VIDEO: (e) => {
              (z(e, (e) => {
                j(e, B);
              }),
                j(e, D),
                e.load());
            },
            OBJECT: (e) => {
              j(e, q);
            },
          },
          oe = (e, t) => {
            (((e) => {
              const t = re[e.tagName];
              t
                ? t(e)
                : ((e) => {
                    if (!V(e)) return;
                    const t = H(e);
                    e.style.backgroundImage = t.backgroundImage;
                  })(e);
            })(e),
              ((e, t) => {
                T(e) ||
                  x(e) ||
                  (A(e, t.class_entered),
                  A(e, t.class_exited),
                  A(e, t.class_applied),
                  A(e, t.class_loading),
                  A(e, t.class_loaded),
                  A(e, t.class_error));
              })(e, t),
              E(e),
              N(e));
          },
          de = ["IMG", "IFRAME", "VIDEO"],
          ce = (e) => e.use_native && "loading" in HTMLImageElement.prototype,
          pe = (e, t, s) => {
            e.forEach((e) =>
              ((e) => e.isIntersecting || e.intersectionRatio > 0)(e)
                ? ((e, t, s, i) => {
                    const n = ((e) => C.indexOf(y(e)) >= 0)(e);
                    (S(e, "entered"),
                      L(e, s.class_entered),
                      A(e, s.class_exited),
                      ((e, t, s) => {
                        t.unobserve_entered && M(e, s);
                      })(e, s, i),
                      _(s.callback_enter, e, t, i),
                      n || ne(e, s, i));
                  })(e.target, e, t, s)
                : ((e, t, s, i) => {
                    T(e) ||
                      (L(e, s.class_exited),
                      ((e, t, s, i) => {
                        s.cancel_on_exit &&
                          ((e) => y(e) === u)(e) &&
                          "IMG" === e.tagName &&
                          (te(e),
                          ((e) => {
                            ($(e, (e) => {
                              ae(e);
                            }),
                              ae(e));
                          })(e),
                          le(e),
                          A(e, s.class_loading),
                          O(i, -1),
                          E(e),
                          _(s.callback_cancel, e, t, i));
                      })(e, t, s, i),
                      _(s.callback_exit, e, t, i));
                  })(e.target, e, t, s),
            );
          },
          ue = (e) => Array.prototype.slice.call(e),
          he = (e) => e.container.querySelectorAll(e.elements_selector),
          me = (e) => ((e) => y(e) === f)(e),
          fe = (e, t) => ((e) => ue(e).filter(T))(e || he(t)),
          ge = function (t, s) {
            const i = n(t);
            ((this._settings = i),
              (this.loadingCount = 0),
              ((e, t) => {
                ce(e) ||
                  (t._observer = new IntersectionObserver(
                    (s) => {
                      pe(s, e, t);
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
                      (((s = he(e)), ue(s).filter(me)).forEach((t) => {
                        (A(t, e.class_error), E(t));
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
              (k(this, i.length),
                t
                  ? this.loadAll(i)
                  : ce(s)
                    ? ((e, t, s) => {
                        (e.forEach((e) => {
                          -1 !== de.indexOf(e.tagName) &&
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
                          k(s, 0));
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
                  N(e);
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
          l = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === a;
          });
        (n.addListener(function () {
          e.mediaHandler(n, l);
        }),
          this.mediaHandler(n, l));
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
            const t = e.target.closest(`[${this.options.attributeOpenButton}]`);
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
            return e.target.closest(`[${this.options.attributeCloseButton}]`) ||
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
          this._reopen || (this.previousActiveElement = document.activeElement),
          (this.targetOpen.element = document.querySelector(
            this.targetOpen.selector,
          )),
          this.targetOpen.element)
        ) {
          if (
            this.targetOpen.element.hasAttribute(this.options.youtubeAttribute)
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
            r &&
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
              (document.body.classList.remove(this.options.classes.bodyActive),
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
        (e.shiftKey && 0 === i && (s[s.length - 1].focus(), e.preventDefault()),
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
        this.options.logging && p(`[Попапос]: ${e}`);
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
      l = (e, t = 500) => (e.hidden ? a(e, t) : n(e, t)),
      r = !0,
      o = (e = 500) => {
        document.documentElement.classList.contains("lock") ? d(e) : c(e);
      },
      d = (e = 500) => {
        let t = document.querySelector("body");
        if (r) {
          let s = document.querySelectorAll("[data-lp]");
          (setTimeout(() => {
            for (let e = 0; e < s.length; e++) {
              s[e].style.paddingRight = "0px";
            }
            ((t.style.paddingRight = "0px"),
              document.documentElement.classList.remove("lock"));
          }, e),
            (r = !1),
            setTimeout(function () {
              r = !0;
            }, e));
        }
      },
      c = (e = 500) => {
        let t = document.querySelector("body");
        if (r) {
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
            (r = !1),
            setTimeout(function () {
              r = !0;
            }, e));
        }
      };
    function p(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    function u(e, t) {
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
                l = window.matchMedia(s[0]),
                r = e.filter(function (e) {
                  if (e.value === i && e.type === a) return !0;
                });
              n.push({ itemsArray: r, matchMedia: l });
            }),
            n
          );
      }
    }
    let h = (e, t = !1, s = 500, i = 0) => {
      const n = document.querySelector(e);
      if (n) {
        let a = "",
          l = 0;
        t &&
          ((a = "header.header"), (l = document.querySelector(a).offsetHeight));
        let r = {
          speedAsDuration: !0,
          speed: s,
          header: a,
          offset: i,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (d(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(n, "", r);
        else {
          let e = n.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
        }
        p(`[gotoBlock]: Юхуу...едем к ${e}`);
      } else p(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    class m {
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
            e.getAttribute("class") ? `select_${e.getAttribute("class")}` : "",
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
          l(s, t.dataset.speed));
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
          (i += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
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
            e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
          n = e.dataset.class ? ` ${e.dataset.class}` : "",
          a = !!e.dataset.href && e.dataset.href,
          l = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
        let r = "";
        return (
          (r += a
            ? `<a ${l} ${i} href="${a}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
            : `<button ${i} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${e.value}" type="button">`),
          (r += this.getSelectElementContent(e)),
          (r += a ? "</a>" : "</button>"),
          r
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
            t.querySelector(`option[value="${e.dataset.value}"]`).setAttribute(
              "selected",
              "selected",
            );
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
        this.config.logging && p(`[select]: ${e}`);
      }
    }
    const f = { inputMaskModule: null, selectModule: null };
    let g,
      v,
      b,
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
              if (f.selectModule) {
                let t = e.querySelectorAll(".select");
                if (t.length)
                  for (let e = 0; e < t.length; e++) {
                    const s = t[e].querySelector("select");
                    f.selectModule.selectBuild(s);
                  }
              }
            }, 0));
        },
        emailTest: (e) =>
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
      };
    function y(e, t = 0) {
      return setTimeout(e, t);
    }
    function S() {
      return Date.now();
    }
    function E(e, t = "x") {
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
    function x(e) {
      return (
        ("undefined" != typeof HTMLElement && e instanceof HTMLElement) ||
        (!!e && "object" == typeof e && (1 === e.nodeType || 11 === e.nodeType))
      );
    }
    function C(e, ...t) {
      const s = Object(e);
      for (let e = 0; e < t.length; e += 1) {
        const i = t[e];
        if (null == i || x(i)) continue;
        const n = i,
          a = Object.keys(Object(n));
        for (let e = 0, t = a.length; e < t; e += 1) {
          const t = a[e];
          if ("__proto__" === t || "constructor" === t || "prototype" === t)
            continue;
          const i = Object.getOwnPropertyDescriptor(n, t);
          if (!i || !i.enumerable) continue;
          const l = n[t];
          T(s[t]) && T(l)
            ? l.__swiper__
              ? (s[t] = l)
              : C(s[t], l)
            : !T(s[t]) && T(l)
              ? ((s[t] = {}), l.__swiper__ ? (s[t] = l) : C(s[t], l))
              : (s[t] = l);
        }
      }
      return s;
    }
    function _(e, t, s) {
      e.style.setProperty(t, s);
    }
    function L(e) {
      const t = e.querySelector(".swiper-slide-transform");
      if (t) return t;
      if (e.shadowRoot) {
        const t = e.shadowRoot.querySelector(".swiper-slide-transform");
        if (t) return t;
      }
      return e;
    }
    function A(e, t = "") {
      const s = [...e.children];
      return (
        e instanceof HTMLSlotElement && s.push(...e.assignedElements()),
        t ? s.filter((e) => e.matches(t)) : s
      );
    }
    function P(e) {
      try {
        console.warn(e);
      } catch {}
    }
    function M(e, t = []) {
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
    function O(e, t) {
      return window.getComputedStyle(e, null).getPropertyValue(t);
    }
    function k(e) {
      if (e && e.parentNode) return [...e.parentNode.children].indexOf(e);
    }
    function I(e, t) {
      const s = [];
      let i = e.parentElement;
      for (; i;) ((t && !i.matches(t)) || s.push(i), (i = i.parentElement));
      return s;
    }
    function $(e, t, s) {
      {
        const s = window.getComputedStyle(e, null);
        return (
          e["width" === t ? "offsetWidth" : "offsetHeight"] +
          parseFloat(
            s.getPropertyValue("width" === t ? "margin-right" : "margin-top"),
          ) +
          parseFloat(
            s.getPropertyValue("width" === t ? "margin-left" : "margin-bottom"),
          )
        );
      }
    }
    function z(e) {
      return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    }
    function B(e, t = "") {
      const s = globalThis.trustedTypes;
      e.innerHTML =
        void 0 !== s
          ? s.createPolicy("html", { createHTML: (e) => e }).createHTML(t)
          : t;
    }
    function D() {
      return (
        g ||
          (g =
            "undefined" == typeof window
              ? { touch: !1 }
              : {
                  touch:
                    "ontouchstart" in window || navigator.maxTouchPoints > 0,
                }),
        g
      );
    }
    function G(e = {}) {
      return (
        v ||
          (v = (function ({ userAgent: e } = {}) {
            if ("undefined" == typeof window) return { ios: !1, android: !1 };
            const t = D(),
              s = navigator.platform,
              i = e || navigator.userAgent,
              n = { ios: !1, android: !1 },
              a = /(Android);?[\s/]+([\d.]+)?/.test(i),
              l = /(iPhone\sOS|iOS|iPod)/.test(i),
              r = /iPad/.test(i),
              o = "MacIntel" === s && t.touch && navigator.maxTouchPoints > 1,
              d = r || o;
            return (
              a && !("Win32" === s) && ((n.os = "android"), (n.android = !0)),
              (d || l) && ((n.os = "ios"), (n.ios = !0)),
              n
            );
          })(e)),
        v
      );
    }
    function q() {
      return (
        b ||
          (b = (function () {
            if ("undefined" == typeof window)
              return { isSafari: !1, isWebView: !1, need3dFix: !1 };
            const e = G(),
              t = navigator.userAgent,
              s = t.toLowerCase(),
              i =
                s.includes("safari") &&
                !s.includes("chrome") &&
                !s.includes("android"),
              n = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t);
            return { isSafari: i, isWebView: n, need3dFix: i || (n && e.ios) };
          })()),
        b
      );
    }
    const V = (e, t) => {
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
      H = (e, t) => {
        if (!e.slides[t]) return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading");
      },
      N = (e) => {
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
              void 0 !== t.column && a.includes(t.column) && H(e, s);
            })
          );
        }
        const a = n + i - 1;
        if (e.params.rewind || e.params.loop)
          for (let i = n - t; i <= a + t; i += 1) {
            const t = ((i % s) + s) % s;
            (t < n || t > a) && H(e, t);
          }
        else
          for (let i = Math.max(n - t, 0); i <= Math.min(a + t, s - 1); i += 1)
            i !== n && (i > a || i < n) && H(e, i);
      };
    const F = (e, t) => !!(e.grid && t.grid && t.grid.rows > 1);
    var j = {
      setBreakpoint: function () {
        const e = this,
          { realIndex: t, initialized: s, params: i, el: n } = e,
          a = i.breakpoints;
        if (!a || (a && 0 === Object.keys(a).length)) return;
        const l =
            "window" !== i.breakpointsBase && i.breakpointsBase
              ? "container"
              : i.breakpointsBase,
          r =
            ["window", "container"].includes(i.breakpointsBase) ||
            !i.breakpointsBase
              ? e.el
              : document.querySelector(i.breakpointsBase),
          o = e.getBreakpoint(a, l, r);
        if (!o || e.currentBreakpoint === o) return;
        const d = (o in a ? a[o] : void 0) || e.originalParams,
          c = F(e, i),
          p = F(e, d),
          u = e.params.grabCursor,
          h = d.grabCursor,
          m = i.enabled;
        (c && !p
          ? (n.classList.remove(
              `${i.containerModifierClass}grid`,
              `${i.containerModifierClass}grid-column`,
            ),
            e.emitContainerClasses())
          : !c &&
            p &&
            (n.classList.add(`${i.containerModifierClass}grid`),
            ((d.grid.fill && "column" === d.grid.fill) ||
              (!d.grid.fill && "column" === i.grid.fill)) &&
              n.classList.add(`${i.containerModifierClass}grid-column`),
            e.emitContainerClasses()),
          u && !h ? e.unsetGrabCursor() : !u && h && e.setGrabCursor());
        const f = (e, t) => e[t];
        ["navigation", "pagination", "scrollbar"].forEach((t) => {
          const s = f(d, t);
          if (void 0 === s) return;
          const n = f(i, t),
            a = "object" == typeof n && null !== n && n.enabled,
            l = "object" == typeof s && null !== s && s.enabled,
            r = e[t];
          (a && !l && r?.disable?.(), !a && l && r?.enable?.());
        });
        const g = d.direction && d.direction !== i.direction,
          v = i.loop && (d.slidesPerView !== i.slidesPerView || g),
          b = i.loop;
        (g && s && e.changeDirection(), C(e.params, d));
        const w = e.params.enabled,
          y = e.params.loop;
        (Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          m && !w ? e.disable() : !m && w && e.enable(),
          (e.currentBreakpoint = o),
          e.emit("_beforeBreakpoint", d),
          s &&
            (v
              ? (e.loopDestroy(), e.loopCreate(t), e.updateSlides())
              : !b && y
                ? (e.loopCreate(t), e.updateSlides())
                : b && !y && e.loopDestroy()),
          e.emit("breakpoint", d));
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
          const { point: n, value: l } = a[e];
          "window" === t
            ? window.matchMedia(`(min-width: ${l}px)`).matches && (i = n)
            : l <= s.clientWidth && (i = n);
        }
        return i || "max";
      },
    };
    var R = {
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
    var W = {
      addClasses: function () {
        const e = this,
          { classNames: t, params: s, rtl: i, el: n, device: a } = e,
          l = (function (e, t) {
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
        (t.push(...l), n.classList.add(...t), e.emitContainerClasses());
      },
      removeClasses: function () {
        const { el: e, classNames: t } = this;
        e &&
          "string" != typeof e &&
          (e.classList.remove(...t), this.emitContainerClasses());
      },
    };
    const Y = {
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
    var X = {
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
    function U(e) {
      const t = this;
      t.destroyed ||
        (t.enabled &&
          (t.allowClick ||
            (t.params.preventClicks && e.preventDefault(),
            t.params.preventClicksPropagation &&
              t.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation()))));
    }
    function Q() {
      const e = this;
      e.destroyed ||
        e.documentTouchHandlerProceeded ||
        ((e.documentTouchHandlerProceeded = !0),
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    function Z(e) {
      const t = this;
      t.destroyed ||
        (V(t, e.target),
        t.params.cssMode ||
          ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
          t.update());
    }
    function J() {
      const e = this,
        { params: t, el: s } = e;
      if (s && 0 === s.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: i, allowSlidePrev: n, snapGrid: a } = e,
        l = e.virtual && e.params.virtual?.enabled;
      ((e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses());
      const r = l && t.loop;
      if (
        !("auto" === t.slidesPerView || t.slidesPerView > 1) ||
        !e.isEnd ||
        e.isBeginning ||
        e.params.centeredSlides ||
        r
      )
        e.params.loop && !l
          ? e.slideToLoop(e.realIndex, 0, !1, !0)
          : e.slideTo(e.activeIndex, 0, !1, !0);
      else {
        const t = l ? e.virtual.slides.length : e.slides.length;
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
    function K() {
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
    function ee(e) {
      const t = this;
      if (t.destroyed) return;
      const s = t.touchEventsData;
      let i = e.originalEvent ?? e;
      if ("touchend" === i.type || "touchcancel" === i.type) {
        const e = [...i.changedTouches].find((e) => e.identifier === s.touchId);
        if (!e || e.identifier !== s.touchId) return;
      } else {
        if (null !== s.touchId) return;
        if (i.pointerId !== s.pointerId) return;
      }
      if (
        ["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(
          i.type,
        )
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
        rtlTranslate: l,
        slidesGrid: r,
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
      const d = S(),
        c = d - s.touchStartTime;
      if (t.allowClick) {
        const e = i.path ?? (i.composedPath && i.composedPath());
        (t.updateClickedSlide(e && e[0], e),
          t.emit("tap click", i),
          c < 300 &&
            d - s.lastClickTime < 300 &&
            t.emit("doubleTap doubleClick", i));
      }
      if (
        ((s.lastClickTime = S()),
        y(() => {
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
      let p;
      if (
        ((s.isTouched = !1),
        (s.isMoved = !1),
        (s.startMoving = !1),
        (p = n.followFinger
          ? l
            ? t.translate
            : -t.translate
          : -(s.currentTranslate ?? 0)),
        n.cssMode)
      )
        return;
      if (n.freeMode && n.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: p });
      const u = p >= -t.maxTranslate() && !t.params.loop;
      let h = 0,
        m = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < r.length;
        e += e < n.slidesPerGroupSkip ? 1 : n.slidesPerGroup
      ) {
        const t = e < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
        void 0 !== r[e + t]
          ? (u || (p >= r[e] && p < r[e + t])) &&
            ((h = e), (m = r[e + t] - r[e]))
          : (u || p >= r[e]) &&
            ((h = e), (m = r[r.length - 1] - r[r.length - 2]));
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
      const v = (p - r[h]) / m,
        b = h < n.slidesPerGroupSkip - 1 ? 1 : n.slidesPerGroup;
      if (c > n.longSwipesMs) {
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
    function te(e) {
      const t = this;
      if (t.destroyed) return;
      const s = t.touchEventsData,
        { params: i, touches: n, rtlTranslate: a, enabled: l } = t;
      if (!l) return;
      if (!i.simulateTouch && "mouse" === e.pointerType) return;
      const r = e,
        o = r.originalEvent ?? r;
      if ("pointermove" === o.type) {
        if (null !== s.touchId) return;
        if (o.pointerId !== s.pointerId) return;
      }
      let d;
      if ("touchmove" === o.type) {
        const e = [...o.changedTouches].find((e) => e.identifier === s.touchId);
        if (!e || e.identifier !== s.touchId) return;
        d = e;
      } else d = o;
      if (!s.isTouched)
        return void (
          s.startMoving &&
          s.isScrolling &&
          t.emit("touchMoveOpposite", o)
        );
      const c = d.pageX,
        p = d.pageY;
      if (o.preventedByNestedSwiper)
        return ((n.startX = c), void (n.startY = p));
      if (!t.allowTouchMove)
        return (
          o.target.matches(s.focusableElements) || (t.allowClick = !1),
          void (
            s.isTouched &&
            (Object.assign(n, {
              startX: c,
              startY: p,
              currentX: c,
              currentY: p,
            }),
            (s.touchStartTime = S()))
          )
        );
      if (i.touchReleaseOnEdges && !i.loop)
        if (t.isVertical()) {
          if (
            (p < n.startY && t.translate <= t.maxTranslate()) ||
            (p > n.startY && t.translate >= t.minTranslate())
          )
            return ((s.isTouched = !1), void (s.isMoved = !1));
        } else {
          if (
            a &&
            ((c > n.startX && -t.translate <= t.maxTranslate()) ||
              (c < n.startX && -t.translate >= t.minTranslate()))
          )
            return;
          if (
            !a &&
            ((c < n.startX && t.translate <= t.maxTranslate()) ||
              (c > n.startX && t.translate >= t.minTranslate()))
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
        (n.currentX = c),
        (n.currentY = p));
      const u = n.currentX - n.startX,
        h = n.currentY - n.startY;
      if (t.params.threshold && Math.sqrt(u ** 2 + h ** 2) < t.params.threshold)
        return;
      if (void 0 === s.isScrolling) {
        let e;
        (t.isHorizontal() && n.currentY === n.startY) ||
        (t.isVertical() && n.currentX === n.startX)
          ? (s.isScrolling = !1)
          : u * u + h * h >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(h), Math.abs(u))) / Math.PI),
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
      let m = t.isHorizontal() ? u : h,
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
            startX: c,
            startY: p,
            currentX: c,
            currentY: p,
            startTranslate: s.currentTranslate,
          }),
          (s.loopSwapReset = !0),
          void (s.startTranslate = s.currentTranslate)
        );
      (t.emit("sliderMove", o), (s.isMoved = !0));
      const w = s.startTranslate ?? 0;
      s.currentTranslate = m + w;
      let y = !0,
        E = i.resistanceRatio;
      if (
        (i.touchReleaseOnEdges && (E = 0),
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
              ((y = !1),
              i.resistance &&
                (s.currentTranslate =
                  t.minTranslate() - 1 + (-t.minTranslate() + w + m) ** E)))
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
              ((y = !1),
              i.resistance &&
                (s.currentTranslate =
                  t.maxTranslate() + 1 - (t.maxTranslate() - w - m) ** E))),
        y && (o.preventedByNestedSwiper = !0),
        !t.allowSlideNext &&
          "next" === t.swipeDirection &&
          (s.currentTranslate ?? 0) < w &&
          (s.currentTranslate = w),
        !t.allowSlidePrev &&
          "prev" === t.swipeDirection &&
          (s.currentTranslate ?? 0) > w &&
          (s.currentTranslate = w),
        t.allowSlidePrev || t.allowSlideNext || (s.currentTranslate = w),
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
    function se(e, t, s) {
      const { params: i } = e,
        n = i.edgeSwipeDetection,
        a = i.edgeSwipeThreshold;
      return (
        !n ||
        !(s <= a || s >= window.innerWidth - a) ||
        ("prevent" === n && (t.preventDefault(), !0))
      );
    }
    function ie(e) {
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
        return void se(t, s, s.targetTouches[0].pageX);
      const { params: n, touches: a, enabled: l } = t;
      if (!l) return;
      if (!n.simulateTouch && "mouse" === s.pointerType) return;
      if (t.animating && n.preventInteractionOnTransition) return;
      !t.animating && n.cssMode && n.loop && t.loopFix();
      let r = s.target;
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
        })(r, t.wrapperEl)
      )
        return;
      const o = s;
      if ("number" == typeof o.which && 3 === o.which) return;
      if ("number" == typeof o.button && o.button > 0) return;
      if (i.isTouched && i.isMoved) return;
      const d = !!n.noSwipingClass && "" !== n.noSwipingClass,
        c = s.composedPath ? s.composedPath() : s.path;
      d && s.target && s.target.shadowRoot && c && (r = c[0]);
      const p = n.noSwipingSelector
          ? n.noSwipingSelector
          : `.${n.noSwipingClass}`,
        u = !(!s.target || !s.target.shadowRoot);
      if (
        n.noSwiping &&
        (u
          ? ((h = p),
            (function e(t) {
              if (!t || t === document || t === window) return null;
              let s = t;
              s.assignedSlot && (s = s.assignedSlot);
              const i = s.closest(h);
              if (!i && !s.getRootNode) return null;
              const n = s.getRootNode();
              return i || e(n.host);
            })(r))
          : r.closest(p))
      )
        return void (t.allowClick = !0);
      var h;
      if (
        n.swipeHandler &&
        "string" == typeof n.swipeHandler &&
        !r.closest(n.swipeHandler)
      )
        return;
      const m = s;
      ((a.currentX = m.pageX), (a.currentY = m.pageY));
      const f = a.currentX,
        g = a.currentY;
      if (!se(t, s, f)) return;
      (Object.assign(i, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
        (a.startX = f),
        (a.startY = g),
        (i.touchStartTime = S()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        n.threshold > 0 && (i.allowThresholdMove = !1));
      let v = !0;
      (r.matches(i.focusableElements) &&
        ((v = !1), "SELECT" === r.nodeName && (i.isTouched = !1)),
        document.activeElement &&
          document.activeElement.matches(i.focusableElements) &&
          document.activeElement !== r &&
          ("mouse" === m.pointerType ||
            ("mouse" !== m.pointerType && !r.matches(i.focusableElements))) &&
          document.activeElement.blur());
      const b = v && t.allowTouchMove && n.touchStartPreventDefault;
      ((!n.touchStartForcePreventDefault && !b) ||
        r.isContentEditable ||
        s.preventDefault(),
        n.freeMode &&
          n.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !n.cssMode &&
          t.freeMode.onTouchStart(),
        t.emit("touchStart", s));
    }
    const ne = (e, t) => {
      const { params: s, el: i, wrapperEl: n, device: a } = e,
        l = !!s.nested,
        r = "on" === t ? "addEventListener" : "removeEventListener",
        o = t;
      if (!i || "string" == typeof i) return;
      (document[r]("touchstart", e.onDocumentTouchStart, {
        passive: !1,
        capture: l,
      }),
        i[r]("touchstart", e.onTouchStart, { passive: !1 }),
        i[r]("pointerdown", e.onTouchStart, { passive: !1 }),
        document[r]("touchmove", e.onTouchMove, { passive: !1, capture: l }),
        document[r]("pointermove", e.onTouchMove, { passive: !1, capture: l }),
        document[r]("touchend", e.onTouchEnd, { passive: !0 }),
        document[r]("pointerup", e.onTouchEnd, { passive: !0 }),
        document[r]("pointercancel", e.onTouchEnd, { passive: !0 }),
        document[r]("touchcancel", e.onTouchEnd, { passive: !0 }),
        document[r]("pointerout", e.onTouchEnd, { passive: !0 }),
        document[r]("pointerleave", e.onTouchEnd, { passive: !0 }),
        document[r]("contextmenu", e.onTouchEnd, { passive: !0 }),
        (s.preventClicks || s.preventClicksPropagation) &&
          i[r]("click", e.onClick, !0),
        s.cssMode && n[r]("scroll", e.onScroll));
      const d = (t) => {
        e[o](t, J, !0);
      };
      (s.updateOnWindowResize
        ? d(
            a.ios || a.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
          )
        : d("observerUpdate"),
        s.lazyPreload && i[r]("load", e.onLoad, { capture: !0 }));
    };
    var ae = {
      loopCreate: function (e, t) {
        const s = this,
          { params: i, slidesEl: n } = s;
        if (!i.loop || (s.virtual && s.params.virtual?.enabled)) return;
        const a = () => {
            A(n, `.${i.slideClass}, swiper-slide`).forEach((e, t) => {
              e.setAttribute("data-swiper-slide-index", String(t));
            });
          },
          l = s.grid && i.grid && i.grid.rows > 1;
        i.loopAddBlankSlides &&
          (i.slidesPerGroup > 1 || l) &&
          (() => {
            const e = A(n, `.${i.slideBlankClass}`);
            (e.forEach((e) => {
              e.remove();
            }),
              e.length > 0 && (s.recalcSlides(), s.updateSlides()));
          })();
        const r = i.slidesPerGroup * (l ? i.grid.rows : 1),
          o = s.slides.length % r !== 0,
          d = l && s.slides.length % i.grid.rows !== 0,
          c = (e) => {
            for (let t = 0; t < e; t += 1) {
              const e = s.isElement
                ? M("swiper-slide", [i.slideBlankClass])
                : M("div", [i.slideClass, i.slideBlankClass]);
              s.slidesEl.append(e);
            }
          };
        if (o) {
          if (i.loopAddBlankSlides) {
            (c(r - (s.slides.length % r)), s.recalcSlides(), s.updateSlides());
          } else
            P(
              "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          a();
        } else if (d) {
          if (i.loopAddBlankSlides) {
            (c(i.grid.rows - (s.slides.length % i.grid.rows)),
              s.recalcSlides(),
              s.updateSlides());
          } else
            P(
              "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          a();
        } else a();
        const p =
          i.centeredSlides || !!i.slidesOffsetBefore || !!i.slidesOffsetAfter;
        s.loopFix({
          slideRealIndex: e,
          direction: p ? void 0 : "next",
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
          initial: l,
          byController: r,
          byMousewheel: o,
        } = e;
        let d = a;
        const c = this;
        if (!c.params.loop) return;
        (c.emit("beforeLoopFix"), (c.__loopFixInProgress__ = !0));
        const {
            slides: p,
            allowSlidePrev: u,
            allowSlideNext: h,
            slidesEl: m,
            params: f,
          } = c,
          {
            centeredSlides: g,
            slidesOffsetBefore: v,
            slidesOffsetAfter: b,
            initialSlide: w,
          } = f,
          y = g || !!v || !!b;
        if (
          ((c.allowSlidePrev = !0),
          (c.allowSlideNext = !0),
          c.virtual && f.virtual?.enabled)
        ) {
          if (s) {
            const e = c.virtual.slides.length,
              t = c.virtual.slidesBefore ?? 0;
            y || 0 !== c.snapIndex
              ? y && c.snapIndex < f.slidesPerView
                ? c.slideTo(e + c.snapIndex, 0, !1, !0)
                : c.snapIndex === c.snapGrid.length - 1 &&
                  c.slideTo(t, 0, !1, !0)
              : c.slideTo(e, 0, !1, !0);
          }
          return (
            (c.allowSlidePrev = u),
            (c.allowSlideNext = h),
            (c.__loopFixInProgress__ = !1),
            void c.emit("loopFix")
          );
        }
        let S = f.slidesPerView;
        "auto" === S
          ? (S = c.slidesPerViewDynamic())
          : ((S = Math.ceil(parseFloat(String(f.slidesPerView)))),
            y && S % 2 == 0 && (S += 1));
        const E = f.slidesPerGroupAuto ? S : f.slidesPerGroup,
          T = (e) => ("function" == typeof e ? e.call(c) : e) || 0,
          x =
            c.slidesGrid.length > 1
              ? (c.slidesGrid[c.slidesGrid.length - 1] - c.slidesGrid[0]) /
                (c.slidesGrid.length - 1)
              : c.size,
          C = x > 0 ? T(v) / x : 0,
          _ = x > 0 ? T(b) / x : 0;
        let L = y
          ? Math.max(E, (g ? Math.ceil(S / 2) : 0) + Math.ceil(Math.max(C, _)))
          : E;
        (L % E !== 0 && (L += E - (L % E)),
          (L += f.loopAdditionalSlides),
          (c.loopedSlides = L));
        const A = c.grid && f.grid && f.grid.rows > 1;
        p.length < S + L ||
        ("cards" === c.params.effect && p.length < S + 2 * L)
          ? P(
              "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
            )
          : A &&
            "row" === f.grid.fill &&
            P(
              "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
            );
        const M = [],
          O = [],
          k = A ? Math.ceil(p.length / f.grid.rows) : p.length,
          I = l && k - w < S && !y;
        let $ = I ? w : c.activeIndex;
        void 0 === d
          ? (d = c.getSlideIndex(
              p.find((e) => e.classList.contains(f.slideActiveClass)),
            ))
          : ($ = d);
        const z = "next" === i || !i,
          B = "prev" === i || !i;
        let D = 0,
          G = 0;
        const q =
          (A ? (p[d].column ?? 0) : d) +
          (y && void 0 === n ? (g ? -S / 2 + 0.5 : 0) - C : 0);
        if (q < L) {
          D = Math.max(L - q, E);
          for (let e = 0; e < L - q; e += 1) {
            const t = e - Math.floor(e / k) * k;
            if (A) {
              const e = k - t - 1;
              for (let t = p.length - 1; t >= 0; t -= 1)
                p[t].column === e && M.push(t);
            } else M.push(k - t - 1);
          }
        } else if (q + S > k - L) {
          ((G = Math.max(q - (k - 2 * L), E)),
            I && (G = Math.max(G, S - k + w + 1)));
          for (let e = 0; e < G; e += 1) {
            const t = e - Math.floor(e / k) * k;
            A
              ? p.forEach((e, s) => {
                  e.column === t && O.push(s);
                })
              : O.push(t);
          }
        }
        if (
          ((c.__preventObserver__ = !0),
          requestAnimationFrame(() => {
            c.__preventObserver__ = !1;
          }),
          "cards" === c.params.effect &&
            p.length < S + 2 * L &&
            (O.includes(d) && O.splice(O.indexOf(d), 1),
            M.includes(d) && M.splice(M.indexOf(d), 1)),
          B &&
            M.forEach((e) => {
              const t = p[e];
              ((t.swiperLoopMoveDOM = !0),
                m.prepend(t),
                (t.swiperLoopMoveDOM = !1));
            }),
          z &&
            O.forEach((e) => {
              const t = p[e];
              ((t.swiperLoopMoveDOM = !0),
                m.append(t),
                (t.swiperLoopMoveDOM = !1));
            }),
          c.recalcSlides(),
          "auto" === f.slidesPerView
            ? c.updateSlides()
            : A &&
              ((M.length > 0 && B) || (O.length > 0 && z)) &&
              c.slides.forEach((e, t) => {
                c.grid.updateSlide(t, e, c.slides);
              }),
          f.watchSlidesProgress && c.updateSlidesOffset(),
          s)
        )
          if (M.length > 0 && B) {
            if (void 0 === t) {
              const e = c.slidesGrid[$],
                t = c.slidesGrid[$ + D] - e;
              o
                ? c.setTranslate(c.translate - t)
                : (c.slideTo($ + Math.ceil(D), 0, !1, !0),
                  n &&
                    ((c.touchEventsData.startTranslate =
                      c.touchEventsData.startTranslate - t),
                    (c.touchEventsData.currentTranslate =
                      c.touchEventsData.currentTranslate - t)));
            } else if (n) {
              const e = A ? M.length / f.grid.rows : M.length;
              (c.slideTo(c.activeIndex + e, 0, !1, !0),
                (c.touchEventsData.currentTranslate = c.translate));
            }
          } else if (O.length > 0 && z)
            if (void 0 === t) {
              const e = c.slidesGrid[$],
                t = c.slidesGrid[$ - G] - e;
              o
                ? c.setTranslate(c.translate - t)
                : (c.slideTo($ - G, 0, !1, !0),
                  n &&
                    ((c.touchEventsData.startTranslate =
                      c.touchEventsData.startTranslate - t),
                    (c.touchEventsData.currentTranslate =
                      c.touchEventsData.currentTranslate - t)));
            } else {
              const e = A ? O.length / f.grid.rows : O.length;
              c.slideTo(c.activeIndex - e, 0, !1, !0);
            }
        ((c.allowSlidePrev = u), (c.allowSlideNext = h));
        const V = c.controller?.control;
        if (V && !r) {
          const e = {
            slideRealIndex: t,
            direction: i,
            setTranslate: n,
            activeSlideIndex: d,
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
            : V instanceof c.constructor &&
              V.params.loop &&
              V.loopFix({
                ...e,
                slideTo: V.params.slidesPerView === f.slidesPerView && s,
              });
        }
        ((c.__loopFixInProgress__ = !1), c.emit("loopFix"));
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
                C(t, s))
              : C(t, s))
          : C(t, s);
      };
    }
    var re = {
      slideTo: function (e = 0, t, s = !0, i, n) {
        "string" == typeof e && (e = parseInt(e, 10));
        const a = this;
        let l = e;
        l < 0 && (l = 0);
        const {
          params: r,
          snapGrid: o,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: p,
          rtlTranslate: u,
          wrapperEl: h,
          enabled: m,
        } = a;
        if (
          (!m && !i && !n) ||
          a.destroyed ||
          (a.animating && r.preventInteractionOnTransition)
        )
          return !1;
        void 0 === t && (t = a.params.speed);
        const f = Math.min(a.params.slidesPerGroupSkip, l);
        let g = f + Math.floor((l - f) / a.params.slidesPerGroup);
        g >= o.length && (g = o.length - 1);
        const v = -o[g];
        if (r.normalizeSlideIndex)
          for (let e = 0; e < d.length; e += 1) {
            const t = -Math.floor(100 * v),
              s = Math.floor(100 * d[e]),
              i = Math.floor(100 * d[e + 1]);
            void 0 !== d[e + 1]
              ? t >= s && t < i - (i - s) / 2
                ? (l = e)
                : t >= s && t < i && (l = e + 1)
              : t >= s && (l = e);
          }
        if (a.initialized && l !== p) {
          if (
            !a.allowSlideNext &&
            (u
              ? v > a.translate && v > a.minTranslate()
              : v < a.translate && v < a.minTranslate())
          )
            return !1;
          if (
            !a.allowSlidePrev &&
            v > a.translate &&
            v > a.maxTranslate() &&
            (p || 0) !== l
          )
            return !1;
        }
        let b;
        (l !== (c || 0) && s && a.emit("beforeSlideChangeStart"),
          a.updateProgress(v),
          (b = l > p ? "next" : l < p ? "prev" : "reset"));
        const w = a.virtual && a.params.virtual?.enabled;
        if (
          !(w && n) &&
          ((u && -v === a.translate) || (!u && v === a.translate))
        )
          return (
            a.updateActiveIndex(l),
            r.autoHeight && a.updateAutoHeight(),
            a.updateSlidesClasses(),
            "slide" !== r.effect && a.setTranslate(v),
            "reset" !== b && (a.transitionStart(s, b), a.transitionEnd(s, b)),
            !1
          );
        if (r.cssMode) {
          const e = a.isHorizontal(),
            s = u ? v : -v;
          return (
            0 === t
              ? (w &&
                  ((a.wrapperEl.style.scrollSnapType = "none"),
                  (a._immediateVirtual = !0)),
                w &&
                !a._cssModeVirtualInitialSet &&
                (a.params.initialSlide ?? 0) > 0
                  ? ((a._cssModeVirtualInitialSet = !0),
                    requestAnimationFrame(() => {
                      h[e ? "scrollLeft" : "scrollTop"] = s;
                    }))
                  : (h[e ? "scrollLeft" : "scrollTop"] = s),
                w &&
                  requestAnimationFrame(() => {
                    ((a.wrapperEl.style.scrollSnapType = ""),
                      (a._immediateVirtual = !1));
                  }))
              : h.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" }),
            !0
          );
        }
        const y = q().isSafari;
        return (
          w && !n && y && a.isElement && a.virtual.update(!1, !1, l),
          a.setTransition(t),
          a.setTranslate(v),
          a.updateActiveIndex(l),
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
        let l = e;
        if (n.params.loop)
          if (n.virtual && n.params.virtual?.enabled)
            l += n.virtual.slidesBefore ?? 0;
          else {
            let e;
            if (a) {
              const t = l * n.params.grid.rows,
                s = n.slides.find(
                  (e) =>
                    Number(e.getAttribute("data-swiper-slide-index")) === t,
                );
              e = s?.column ?? 0;
            } else e = n.getSlideIndexByData(l);
            const t = a
                ? Math.ceil(n.slides.length / n.params.grid.rows)
                : n.slides.length,
              {
                centeredSlides: s,
                slidesOffsetBefore: r,
                slidesOffsetAfter: o,
              } = n.params,
              d = s || !!r || !!o;
            let c;
            "auto" === n.params.slidesPerView
              ? (c = n.slidesPerViewDynamic())
              : ((c = Math.ceil(parseFloat(String(n.params.slidesPerView)))),
                d && c % 2 == 0 && (c += 1));
            let p = t - e < c;
            if (
              (d && (p = p || e < Math.ceil(c / 2)),
              i && d && "auto" !== n.params.slidesPerView && !a && (p = !1),
              p)
            ) {
              const s = d
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
              const e = l * n.params.grid.rows,
                t = n.slides.find(
                  (t) =>
                    Number(t.getAttribute("data-swiper-slide-index")) === e,
                );
              l = t?.column ?? 0;
            } else l = n.getSlideIndexByData(l);
          }
        return (
          requestAnimationFrame(() => {
            n.slideTo(l, t, s, i);
          }),
          n
        );
      },
      slideNext: function (e, t = !0, s) {
        const i = this,
          { enabled: n, params: a, animating: l } = i;
        if (!n || i.destroyed) return i;
        void 0 === e && (e = i.params.speed);
        let r = a.slidesPerGroup;
        "auto" === a.slidesPerView &&
          1 === a.slidesPerGroup &&
          a.slidesPerGroupAuto &&
          (r = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const o = i.activeIndex < a.slidesPerGroupSkip ? 1 : r,
          d = i.virtual && a.virtual?.enabled;
        if (a.loop) {
          if (l && !d && a.loopPreventsSliding) return !1;
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
            slidesGrid: l,
            rtlTranslate: r,
            enabled: o,
            animating: d,
          } = i;
        if (!o || i.destroyed) return i;
        void 0 === e && (e = i.params.speed);
        const c = i.virtual && n.virtual?.enabled;
        if (n.loop) {
          if (d && !c && n.loopPreventsSliding) return !1;
          (i.loopFix({ direction: "prev" }),
            (i._clientLeft = i.wrapperEl.clientLeft));
        }
        function p(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const u = p(r ? i.translate : -i.translate),
          h = a.map((e) => p(e)),
          m = n.freeMode && n.freeMode.enabled;
        let f = a[h.indexOf(u) - 1];
        if (void 0 === f && (n.cssMode || m)) {
          let e;
          (a.forEach((t, s) => {
            u >= t && (e = s);
          }),
            void 0 !== e && (f = m ? a[e] : a[e > 0 ? e - 1 : e]));
        }
        let g = 0;
        if (
          (void 0 !== f &&
            ((g = l.indexOf(f)),
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
        const l = Math.min(n.params.slidesPerGroupSkip, a),
          r = l + Math.floor((a - l) / n.params.slidesPerGroup),
          o = n.rtlTranslate ? n.translate : -n.translate;
        if (o >= n.snapGrid[r]) {
          const e = n.snapGrid[r];
          o - e > (n.snapGrid[r + 1] - e) * i && (a += n.params.slidesPerGroup);
        } else {
          const e = n.snapGrid[r - 1];
          o - e <= (n.snapGrid[r] - e) * i && (a -= n.params.slidesPerGroup);
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
        const { params: t, slidesEl: s, clickedSlide: i, clickedIndex: n } = e;
        if (void 0 === i || void 0 === n) return;
        const a =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
        let l,
          r = e.getSlideIndexWhenGrid(n);
        const o = e.isElement ? "swiper-slide" : `.${t.slideClass}`,
          d = e.grid && e.params.grid && e.params.grid.rows > 1;
        if (t.loop) {
          if (e.animating) return;
          ((l = parseInt(i.getAttribute("data-swiper-slide-index"), 10)),
            t.centeredSlides
              ? e.slideToLoop(l)
              : r >
                  (d
                    ? (e.slides.length - a) / 2 - (e.params.grid.rows - 1)
                    : e.slides.length - a)
                ? (e.loopFix(),
                  (r = e.getSlideIndex(
                    A(s, `${o}[data-swiper-slide-index="${l}"]`)[0],
                  )),
                  y(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r));
        } else e.slideTo(r);
      },
    };
    function oe({ swiper: e, runCallbacks: t, direction: s, step: i }) {
      const { activeIndex: n, previousIndex: a } = e;
      let l = s;
      (l || (l = n > a ? "next" : n < a ? "prev" : "reset"),
        e.emit(`transition${i}`),
        t && "reset" === l
          ? e.emit(`slideResetTransition${i}`)
          : t &&
            n !== a &&
            (e.emit(`slideChangeTransition${i}`),
            "next" === l
              ? e.emit(`slideNextTransition${i}`)
              : e.emit(`slidePrevTransition${i}`)));
    }
    var de = {
      getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
        const { params: t, rtlTranslate: s, translate: i, wrapperEl: n } = this;
        if (t.virtualTranslate) return s ? -i : i;
        if (t.cssMode) return i;
        let a = E(n, e);
        return ((a += this.cssOverflowAdjustment()), s && (a = -a), a || 0);
      },
      setTranslate: function (e, t) {
        const s = this,
          { rtlTranslate: i, params: n, wrapperEl: a, progress: l } = s;
        let r,
          o = 0,
          d = 0;
        (s.isHorizontal() ? (o = i ? -e : e) : (d = e),
          n.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? o : d),
          n.cssMode
            ? (a[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                s.isHorizontal() ? -o : -d)
            : n.virtualTranslate ||
              (s.isHorizontal()
                ? (o -= s.cssOverflowAdjustment())
                : (d -= s.cssOverflowAdjustment()),
              (a.style.transform = `translate3d(${o}px, ${d}px, 0px)`)));
        const c = s.maxTranslate() - s.minTranslate();
        ((r = 0 === c ? 0 : (e - s.minTranslate()) / c),
          r !== l && s.updateProgress(e),
          s.emit("setTranslate", s.translate, t));
      },
      minTranslate: function () {
        return -this.snapGrid[0];
      },
      maxTranslate: function () {
        return -this.snapGrid[this.snapGrid.length - 1];
      },
      translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, n) {
        const a = this,
          { params: l, wrapperEl: r } = a;
        if (a.animating && l.preventInteractionOnTransition) return !1;
        const o = a.minTranslate(),
          d = a.maxTranslate();
        let c;
        if (
          ((c = i && e > o ? o : i && e < d ? d : e),
          a.updateProgress(c),
          l.cssMode)
        ) {
          const e = a.isHorizontal();
          return (
            0 === t
              ? (r[e ? "scrollLeft" : "scrollTop"] = -c)
              : r.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" }),
            !0
          );
        }
        return (
          0 === t
            ? (a.setTransition(0),
              a.setTranslate(c),
              s &&
                (a.emit("beforeTransitionStart", t, n),
                a.emit("transitionEnd")))
            : (a.setTransition(t),
              a.setTranslate(c),
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
    const ce = (e, t, s) => {
      t && !e.classList.contains(s)
        ? e.classList.add(s)
        : !t && e.classList.contains(s) && e.classList.remove(s);
    };
    const pe = (e, t, s) => {
      t && !e.classList.contains(s)
        ? e.classList.add(s)
        : !t && e.classList.contains(s) && e.classList.remove(s);
    };
    var ue = {
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
              parseInt(O(i, "padding-left") || "0", 10) -
              parseInt(O(i, "padding-right") || "0", 10)),
            (s =
              s -
              parseInt(O(i, "padding-top") || "0", 10) -
              parseInt(O(i, "padding-bottom") || "0", 10)),
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
          return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || "0");
        }
        const s = e.params,
          { wrapperEl: i, slidesEl: n, rtlTranslate: a, wrongRTL: l } = e,
          r = !(!e.virtual || !s.virtual?.enabled),
          o = r ? e.virtual.slides.length : e.slides.length,
          d = A(n, `.${e.params.slideClass}, swiper-slide`),
          c = r ? e.virtual.slides.length : d.length;
        let p = [];
        const u = [],
          h = [],
          m = (t) => ("function" == typeof t ? t.call(e) : t),
          f = m(s.slidesOffsetBefore),
          g = m(s.slidesOffsetAfter),
          v = e.snapGrid.length,
          b = e.slidesGrid.length,
          w = e.size - f - g;
        let y = s.spaceBetween,
          S = -f,
          E = 0,
          T = 0;
        if (void 0 === w) return;
        ("string" == typeof y && y.indexOf("%") >= 0
          ? (y = (parseFloat(y.replace("%", "")) / 100) * w)
          : "string" == typeof y && (y = parseFloat(y)),
          (e.virtualSize = -y - f - g),
          d.forEach((e) => {
            (a ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
              (e.style.marginBottom = ""),
              (e.style.marginTop = ""));
          }),
          s.centeredSlides &&
            s.cssMode &&
            (_(i, "--swiper-centered-offset-before", ""),
            _(i, "--swiper-centered-offset-after", "")),
          s.cssMode &&
            (_(i, "--swiper-slides-offset-before", `${f}px`),
            _(i, "--swiper-slides-offset-after", `${g}px`)));
        const x = s.grid && s.grid.rows > 1 && e.grid;
        x ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
        let C = 0;
        const L =
          "auto" === s.slidesPerView &&
          s.breakpoints &&
          Object.keys(s.breakpoints).filter((e) => {
            const t = s.breakpoints[e];
            return void 0 !== t?.slidesPerView;
          }).length > 0;
        for (let i = 0; i < c; i += 1) {
          C = 0;
          const n = d[i];
          if (
            !n ||
            (x && e.grid.updateSlide(i, n, d), "none" !== O(n, "display"))
          ) {
            if (r && "auto" === s.slidesPerView)
              (s.virtual?.slidesPerViewAutoSlideSize &&
                (C = s.virtual.slidesPerViewAutoSlideSize),
                C &&
                  n &&
                  (s.roundLengths && (C = Math.floor(C)),
                  (n.style[e.getDirectionLabel("width")] = `${C}px`)));
            else if ("auto" === s.slidesPerView) {
              L && (n.style[e.getDirectionLabel("width")] = "");
              const i = getComputedStyle(n),
                a = n.style.transform,
                l = n.style.webkitTransform;
              if (
                (a && (n.style.transform = "none"),
                l && (n.style.webkitTransform = "none"),
                s.roundLengths)
              )
                C = e.isHorizontal() ? $(n, "width") : $(n, "height");
              else {
                const e = t(i, "width"),
                  s = t(i, "padding-left"),
                  a = t(i, "padding-right"),
                  l = t(i, "margin-left"),
                  r = t(i, "margin-right"),
                  o = i.getPropertyValue("box-sizing");
                if (o && "border-box" === o) C = e + l + r;
                else {
                  const { clientWidth: t, offsetWidth: i } = n;
                  C = e + s + a + l + r + (i - t);
                }
              }
              (a && (n.style.transform = a),
                l && (n.style.webkitTransform = l),
                s.roundLengths && (C = Math.floor(C)));
            } else
              ((C = (w - (s.slidesPerView - 1) * y) / s.slidesPerView),
                s.roundLengths && (C = Math.floor(C)),
                n && (n.style[e.getDirectionLabel("width")] = `${C}px`));
            (n && (n.swiperSlideSize = C),
              h.push(C),
              s.centeredSlides
                ? ((S = S + C / 2 + E / 2 + y),
                  0 === E && 0 !== i && (S = S - w / 2 - y),
                  0 === i && (S = S - w / 2 - y),
                  Math.abs(S) < 0.001 && (S = 0),
                  s.roundLengths && (S = Math.floor(S)),
                  T % s.slidesPerGroup === 0 && p.push(S),
                  u.push(S))
                : (s.roundLengths && (S = Math.floor(S)),
                  (T - Math.min(e.params.slidesPerGroupSkip, T)) %
                    e.params.slidesPerGroup ===
                    0 && p.push(S),
                  u.push(S),
                  (S = S + C + y)),
              (e.virtualSize += C + y),
              (E = C),
              (T += 1));
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, w) + g),
          a &&
            l &&
            ("slide" === s.effect || "coverflow" === s.effect) &&
            (i.style.width = `${e.virtualSize + y}px`),
          s.setWrapperSize &&
            (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + y}px`),
          x && e.grid.updateWrapperSize(C, p),
          !s.centeredSlides)
        ) {
          const t = "auto" !== s.slidesPerView && s.slidesPerView % 1 != 0,
            i =
              s.snapToSlideEdge && !s.loop && ("auto" === s.slidesPerView || t);
          let n = p.length;
          if (i) {
            let e;
            if ("auto" === s.slidesPerView) {
              e = 1;
              let t = 0;
              for (
                let s = h.length - 1;
                s >= 0 && ((t += h[s] + (s < h.length - 1 ? y : 0)), t <= w);
                s -= 1
              )
                e = h.length - s;
            } else e = Math.floor(s.slidesPerView);
            n = Math.max(c - e, 0);
          }
          const a = [];
          for (let t = 0; t < p.length; t += 1) {
            let l = p[t];
            (s.roundLengths && (l = Math.floor(l)),
              i ? t <= n && a.push(l) : p[t] <= e.virtualSize - w && a.push(l));
          }
          ((p = a),
            Math.floor(e.virtualSize - w) - Math.floor(p[p.length - 1]) > 1 &&
              (i || p.push(e.virtualSize - w)));
        }
        if (r && s.loop) {
          const t = h[0] + y,
            i = (e.virtual.slidesBefore ?? 0) + (e.virtual.slidesAfter ?? 0);
          if (s.slidesPerGroup > 1) {
            const e = Math.ceil(i / s.slidesPerGroup),
              n = t * s.slidesPerGroup;
            for (let t = 0; t < e; t += 1) p.push(p[p.length - 1] + n);
          }
          for (let n = 0; n < i; n += 1)
            (1 === s.slidesPerGroup && p.push(p[p.length - 1] + t),
              u.push(u[u.length - 1] + t),
              (e.virtualSize += t));
        }
        if ((0 === p.length && (p = [0]), 0 !== y)) {
          const t =
            e.isHorizontal() && a
              ? "marginLeft"
              : e.getDirectionLabel("marginRight");
          d.filter(
            (e, t) => !(s.cssMode && !s.loop) || t !== d.length - 1,
          ).forEach((e) => {
            e.style[t] = `${y}px`;
          });
        }
        if (s.centeredSlides && s.centeredSlidesBounds) {
          let e = 0;
          (h.forEach((t) => {
            e += t + (y || 0);
          }),
            (e -= y));
          const t = e > w ? e - w : 0;
          p = p.map((e) => (e <= 0 ? -f : e > t ? t + g : e));
        }
        if (s.centerInsufficientSlides) {
          let e = 0;
          if (
            (h.forEach((t) => {
              e += t + (y || 0);
            }),
            (e -= y),
            e < w)
          ) {
            const t = (w - e) / 2;
            (p.forEach((e, s) => {
              p[s] = e - t;
            }),
              u.forEach((e, s) => {
                u[s] = e + t;
              }));
          }
        }
        if (
          (Object.assign(e, {
            slides: d,
            snapGrid: p,
            slidesGrid: u,
            slidesSizesGrid: h,
          }),
          s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
        ) {
          (_(i, "--swiper-centered-offset-before", -p[0] + "px"),
            _(
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
          (c !== o && e.emit("slidesLengthChange"),
          p.length !== v &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          u.length !== b && e.emit("slidesGridLengthChange"),
          s.watchSlidesProgress && e.updateSlidesOffset(),
          e.emit("slidesUpdated"),
          !(r || s.cssMode || ("slide" !== s.effect && "fade" !== s.effect)))
        ) {
          const t = `${s.containerModifierClass}backface-hidden`,
            i = e.el.classList.contains(t);
          c <= s.maxBackfaceHiddenSlides
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
        const l = (e) => (i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e]);
        if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
          if (t.params.centeredSlides)
            (t.visibleSlides || []).forEach((e) => {
              s.push(e);
            });
          else
            for (n = 0; n < Math.ceil(t.params.slidesPerView); n += 1) {
              const e = t.activeIndex + n;
              if (e > t.slides.length && !i) break;
              const a = l(e);
              a && s.push(a);
            }
        else {
          const e = l(t.activeIndex);
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
        let l = -e;
        (n && (l = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []));
        let r = s.spaceBetween;
        "string" == typeof r && r.indexOf("%") >= 0
          ? (r = (parseFloat(r.replace("%", "")) / 100) * t.size)
          : "string" == typeof r && (r = parseFloat(r));
        for (let e = 0; e < i.length; e += 1) {
          const o = i[e];
          let d = o.swiperSlideOffset ?? 0;
          s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset ?? 0);
          const c = o.swiperSlideSize ?? 0,
            p = (l + (s.centeredSlides ? t.minTranslate() : 0) - d) / (c + r),
            u =
              (l - a[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (c + r),
            h = -(l - d),
            m = h + t.slidesSizesGrid[e],
            f = h >= 0 && h <= t.size - t.slidesSizesGrid[e],
            g =
              (h >= 0 && h < t.size - 1) ||
              (m > 1 && m <= t.size) ||
              (h <= 0 && m >= t.size);
          (g && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e)),
            pe(o, g, s.slideVisibleClass),
            pe(o, f, s.slideFullyVisibleClass),
            (o.progress = n ? -p : p),
            (o.originalProgress = n ? -u : u));
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
        let { progress: n, isBeginning: a, isEnd: l } = t,
          r = t.progressLoop;
        const o = a,
          d = l;
        if (0 === i) ((n = 0), (a = !0), (l = !0));
        else {
          n = (e - t.minTranslate()) / i;
          const s = Math.abs(e - t.minTranslate()) < 1,
            r = Math.abs(e - t.maxTranslate()) < 1;
          ((a = s || n <= 0), (l = r || n >= 1), s && (n = 0), r && (n = 1));
        }
        if (s.loop) {
          const s = t.getSlideIndexByData(0),
            i = t.getSlideIndexByData(t.slides.length - 1),
            n = t.slidesGrid[s],
            a = t.slidesGrid[i],
            l = t.slidesGrid[t.slidesGrid.length - 1],
            o = Math.abs(e);
          ((r = o >= n ? (o - n) / l : (o + l - a) / l), r > 1 && (r -= 1));
        }
        (Object.assign(t, {
          progress: n,
          progressLoop: r,
          isBeginning: a,
          isEnd: l,
        }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          a && !o && t.emit("reachBeginning toEdge"),
          l && !d && t.emit("reachEnd toEdge"),
          ((o && !a) || (d && !l)) && t.emit("fromEdge"),
          t.emit("progress", n));
      },
      updateSlidesClasses: function () {
        const e = this,
          { slides: t, params: s, slidesEl: i, activeIndex: n } = e,
          a = !(!e.virtual || !s.virtual?.enabled),
          l = e.grid && s.grid && s.grid.rows > 1,
          r = (e) => A(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
        let o, d, c;
        if (a)
          if (s.loop) {
            const t = e.virtual.slides;
            let s = n - (e.virtual.slidesBefore ?? 0);
            (s < 0 && (s = t.length + s),
              s >= t.length && (s -= t.length),
              (o = r(`[data-swiper-slide-index="${s}"]`)));
          } else o = r(`[data-swiper-slide-index="${n}"]`);
        else
          l
            ? ((o = t.find((e) => e.column === n)),
              (c = t.find((e) => e.column === n + 1)),
              (d = t.find((e) => e.column === n - 1)))
            : (o = t[n]);
        (o &&
          (l ||
            ((c = (function (e, t) {
              const s = [];
              let i = e.nextElementSibling;
              for (; i;)
                ((t && !i.matches(t)) || s.push(i), (i = i.nextElementSibling));
              return s;
            })(o, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && !c && (c = t[0]),
            (d = (function (e, t) {
              const s = [];
              let i = e.previousElementSibling;
              for (; i;)
                ((t && !i.matches(t)) || s.push(i),
                  (i = i.previousElementSibling));
              return s;
            })(o, `.${s.slideClass}, swiper-slide`)[0]),
            s.loop && 0 === !d && (d = t[t.length - 1]))),
          t.forEach((e) => {
            (ce(e, e === o, s.slideActiveClass),
              ce(e, e === c, s.slideNextClass),
              ce(e, e === d, s.slidePrevClass));
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
            realIndex: l,
            snapIndex: r,
          } = t;
        let o,
          d = e;
        const c = (e) => {
          const s = t.virtual.slides;
          let i = e - (t.virtual.slidesBefore ?? 0);
          return (
            i < 0 && (i = s.length + i),
            i >= s.length && (i -= s.length),
            i
          );
        };
        if (
          (void 0 === d &&
            (d = (function (e) {
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
          const e = Math.min(n.slidesPerGroupSkip, d);
          o = e + Math.floor((d - e) / n.slidesPerGroup);
        }
        if ((o >= i.length && (o = i.length - 1), d === a && !t.params.loop))
          return void (
            o !== r && ((t.snapIndex = o), t.emit("snapIndexChange"))
          );
        if (d === a && t.params.loop && t.virtual && t.params.virtual?.enabled)
          return void (t.realIndex = c(d));
        const p = t.grid && n.grid && n.grid.rows > 1;
        let u;
        if (t.virtual && n.virtual?.enabled) u = n.loop ? c(d) : d;
        else if (p) {
          const e = t.slides.find((e) => e.column === d);
          let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
          (Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
            (u = Math.floor(s / n.grid.rows)));
        } else if (t.slides[d]) {
          const e = t.slides[d].getAttribute("data-swiper-slide-index");
          u = e ? parseInt(e, 10) : d;
        } else u = d;
        (Object.assign(t, {
          previousSnapIndex: r,
          snapIndex: o,
          previousRealIndex: l,
          realIndex: u,
          previousIndex: a,
          activeIndex: d,
        }),
          t.initialized && N(t),
          t.__loopFixInProgress__ ||
            (t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) &&
              ((t.__lastEmittedRealIndex__ ?? l) !== u &&
                t.emit("realIndexChange"),
              t.emit("slideChange")),
            (t.__lastEmittedRealIndex__ = u)));
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
          l = !1;
        if (n)
          for (let e = 0; e < s.slides.length; e += 1)
            if (s.slides[e] === n) {
              ((l = !0), (a = e));
              break;
            }
        if (!n || !l)
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
    const he = {
        eventsEmitter: X,
        update: ue,
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
              oe({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e = !0, t) {
            const s = this,
              { params: i } = s;
            ((s.animating = !1),
              i.cssMode ||
                (s.setTransition(0),
                oe({ swiper: s, runCallbacks: e, direction: t, step: "End" })));
          },
        },
        slide: re,
        loop: ae,
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
                "container" === e.params.touchEventsTarget ? "el" : "wrapperEl"
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
            ((e.onTouchStart = ie.bind(e)),
              (e.onTouchMove = te.bind(e)),
              (e.onTouchEnd = ee.bind(e)),
              (e.onDocumentTouchStart = Q.bind(e)),
              t.cssMode && (e.onScroll = K.bind(e)),
              (e.onClick = U.bind(e)),
              (e.onLoad = Z.bind(e)),
              ne(e, "on"));
          },
          detachEvents: function () {
            ne(this, "off");
          },
        },
        breakpoints: j,
        checkOverflow: R,
        classes: W,
      },
      me = {};
    class fe {
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
          (s = C({}, s)),
          t && !s.el && (s.el = t),
          s.el &&
            "string" == typeof s.el &&
            "undefined" != typeof document &&
            document.querySelectorAll(s.el).length > 1)
        ) {
          const e = [];
          return (
            document.querySelectorAll(s.el).forEach((t) => {
              const i = C({}, s, { el: t });
              e.push(new fe(i));
            }),
            e
          );
        }
        const i = this;
        ((i.__swiper__ = !0),
          (i.support = D()),
          (i.device = G({ userAgent: s.userAgent ?? void 0 })),
          (i.browser = q()),
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
        const a = C({}, Y, n);
        if (
          ((i.params = C({}, a, me, s)),
          (i.originalParams = C({}, i.params)),
          (i.passedParams = C({}, s)),
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
          i = k(A(t, `.${s.slideClass}, swiper-slide`)[0]);
        return k(e) - (i ?? 0);
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
        this.slides = A(e, `.${t.slideClass}, swiper-slide`);
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
          size: l,
          activeIndex: r,
        } = this;
        let o = 1;
        if ("number" == typeof s.slidesPerView) return s.slidesPerView;
        if (!l) return o;
        if (s.centeredSlides) {
          let e = i[r] ? Math.ceil(i[r].swiperSlideSize ?? 0) : 0,
            t = !1;
          for (let s = r + 1; s < i.length; s += 1)
            i[s] &&
              !t &&
              ((e += Math.ceil(i[s].swiperSlideSize ?? 0)),
              (o += 1),
              e > l && (t = !0));
          for (let s = r - 1; s >= 0; s -= 1)
            i[s] &&
              !t &&
              ((e += i[s].swiperSlideSize ?? 0), (o += 1), e > l && (t = !0));
        } else if ("current" === e)
          for (let e = r + 1; e < i.length; e += 1) {
            (t ? n[e] + a[e] - n[r] < l : n[e] - n[r] < l) && (o += 1);
          }
        else
          for (let e = r - 1; e >= 0; e -= 1) {
            n[r] - n[e] < l && (o += 1);
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
              t.complete && V(e, t);
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
        let l = (() => {
          if (i && i.shadowRoot) {
            return i.shadowRoot.querySelector(a());
          }
          return A(i, a())[0];
        })();
        !l &&
          t.params.createElements &&
          ((l = M("div", t.params.wrapperClass)),
          i.append(l),
          A(i, `.${t.params.slideClass}`).forEach((e) => {
            l.append(e);
          }));
        const r = t.isElement ? i.parentNode.host : null;
        return (
          Object.assign(t, {
            el: i,
            wrapperEl: l,
            slidesEl: t.isElement && !r.slideSlots ? r : l,
            hostEl: t.isElement ? r : i,
            mounted: !0,
            rtl: "rtl" === i.dir.toLowerCase() || "rtl" === O(i, "direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === i.dir.toLowerCase() || "rtl" === O(i, "direction")),
            wrongRTL: "-webkit-box" === O(l, "display"),
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
                ? V(t, e)
                : e.addEventListener("load", (e) => {
                    V(t, e.target);
                  });
            }));
        }
        return (
          (t.initialized = !0),
          N(t),
          t.emit("init"),
          t.emit("afterInit"),
          t
        );
      }
      destroy(e = !0, t = !0) {
        const s = this,
          { params: i, el: n, wrapperEl: a, slides: l } = s;
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
              l &&
                l.length &&
                l.forEach((e) => {
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
              (r = s),
              Object.keys(r).forEach((e) => {
                try {
                  r[e] = null;
                } catch {}
                try {
                  delete r[e];
                } catch {}
              })),
            (s.destroyed = !0)),
          null
        );
        var r;
      }
      static extendDefaults(e) {
        C(me, e);
      }
      static installModule(e) {
        fe.prototype.__modules__ || (fe.prototype.__modules__ = []);
        const t = fe.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => fe.installModule(e)), fe)
          : (fe.installModule(e), fe);
      }
    }
    (Object.defineProperty(fe, "extendedDefaults", { get: () => me }),
      Object.defineProperty(fe, "defaults", { get: () => Y }));
    const ge = he,
      ve = fe.prototype;
    (Object.keys(ge).forEach((e) => {
      const t = ge[e];
      Object.keys(t).forEach((e) => {
        ve[e] = t[e];
      });
    }),
      fe.use([
        ({ swiper: e, on: t, emit: s }) => {
          let i = null,
            n = null;
          const a = () => {
              e &&
                !e.destroyed &&
                e.initialized &&
                (s("beforeResize"), s("resize"));
            },
            l = () => {
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
                      l = i;
                    (t.forEach(
                      ({ contentBoxSize: t, contentRect: s, target: i }) => {
                        if (i && i !== e.el) return;
                        const a = Array.isArray(t) ? t[0] : t;
                        ((n = s ? s.width : a.inlineSize),
                          (l = s ? s.height : a.blockSize));
                      },
                    ),
                      (n === s && l === i) || a());
                  });
                })),
                i.observe(e.el))
              : (window.addEventListener("resize", a),
                window.addEventListener("orientationchange", l));
          }),
            t("destroy", () => {
              (n && window.cancelAnimationFrame(n),
                i && i.unobserve && e.el && (i.unobserve(e.el), (i = null)),
                window.removeEventListener("resize", a),
                window.removeEventListener("orientationchange", l));
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
                if (1 === t.length) return void e.emit("observerUpdate", t[0]);
                const s = function () {
                  e.emit("observerUpdate", t[0]);
                };
                window.requestAnimationFrame
                  ? window.requestAnimationFrame(s)
                  : window.setTimeout(s, 0);
              });
              (a.observe(t, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: e.isElement || void 0 === s.childList || s.childList,
                characterData: void 0 === s.characterData || s.characterData,
              }),
                i.push(a));
            };
          (t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            s("init", () => {
              if (e.params.observer) {
                if (e.params.observeParents) {
                  const t = I(e.hostEl);
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
    const be = ({ swiper: e, extendParams: t, on: s, emit: i, params: n }) => {
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
      const l =
        "object" == typeof n.autoplay &&
        n.autoplay &&
        "number" == typeof n.autoplay.delay
          ? n.autoplay.delay
          : 3e3;
      let r,
        o,
        d,
        c = l,
        p = l,
        u = 0,
        h = new Date().getTime(),
        m = !1,
        f = !1,
        g = !1,
        v = !1,
        b = !1;
      function w(t) {
        if (!e || e.destroyed || !e.wrapperEl) return;
        if (t.target !== e.wrapperEl) return;
        e.wrapperEl.removeEventListener("transitionend", w);
        const s = t.detail;
        b || (s && s.bySwiperTouchMove) || _();
      }
      const y = () => {
          if (e.destroyed || !e.autoplay.running) return;
          e.autoplay.paused ? (m = !0) : m && ((p = u), (m = !1));
          const t = e.autoplay.paused ? u : h + p - new Date().getTime();
          ((e.autoplay.timeLeft = t),
            i("autoplayTimeLeft", t, t / c),
            (o = requestAnimationFrame(() => {
              y();
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
          (void 0 !== o && cancelAnimationFrame(o), y());
          let s = t;
          (void 0 === s && ((s = S()), (c = s), (p = s)), (u = s));
          const n = e.params.speed,
            l = () => {
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
              ? (void 0 !== r && clearTimeout(r),
                (r = setTimeout(() => {
                  l();
                }, s)))
              : requestAnimationFrame(() => {
                  l();
                }),
            s
          );
        },
        T = () => (
          (h = new Date().getTime()),
          (e.autoplay.running = !0),
          E(),
          i("autoplayStart"),
          !0
        ),
        x = () => (
          (e.autoplay.running = !1),
          void 0 !== r && clearTimeout(r),
          void 0 !== o && cancelAnimationFrame(o),
          i("autoplayStop"),
          !0
        ),
        C = (t, s) => {
          if (e.destroyed || !e.autoplay.running) return;
          (void 0 !== r && clearTimeout(r), t || (v = !0));
          const n = () => {
            (i("autoplayPause"),
              a().waitForTransition
                ? e.wrapperEl.addEventListener("transitionend", w)
                : _());
          };
          if (((e.autoplay.paused = !0), s)) return void n();
          const l = u || a().delay;
          ((u = l - (new Date().getTime() - h)),
            (e.isEnd && u < 0 && !e.params.loop) || (u < 0 && (u = 0), n()));
        },
        _ = () => {
          (e.isEnd && u < 0 && !e.params.loop) ||
            e.destroyed ||
            !e.autoplay.running ||
            ((h = new Date().getTime()),
            v ? ((v = !1), E(u)) : E(),
            (e.autoplay.paused = !1),
            i("autoplayResume"));
        },
        L = () => {
          !e.destroyed &&
            e.autoplay.running &&
            ("hidden" === document.visibilityState && ((v = !0), C(!0)),
            "visible" === document.visibilityState && _());
        },
        A = (t) => {
          "mouse" === t.pointerType &&
            ((v = !0), (b = !0), e.animating || e.autoplay.paused || C(!0));
        },
        P = (t) => {
          "mouse" === t.pointerType && ((b = !1), e.autoplay.paused && _());
        };
      (s("init", () => {
        a().enabled &&
          (a().pauseOnMouseEnter &&
            (e.el.addEventListener("pointerenter", A),
            e.el.addEventListener("pointerleave", P)),
          document.addEventListener("visibilitychange", L),
          T());
      }),
        s("destroy", () => {
          (e.el &&
            "string" != typeof e.el &&
            (e.el.removeEventListener("pointerenter", A),
            e.el.removeEventListener("pointerleave", P)),
            document.removeEventListener("visibilitychange", L),
            e.autoplay.running && x());
        }),
        s("_freeModeStaticRelease", () => {
          (g || v) && _();
        }),
        s("_freeModeNoMomentumRelease", () => {
          a().disableOnInteraction ? x() : C(!0, !0);
        }),
        s("beforeTransitionStart", (t, s, i) => {
          !e.destroyed &&
            e.autoplay.running &&
            (i || !a().disableOnInteraction ? C(!0, !0) : x());
        }),
        s("sliderFirstMove", () => {
          !e.destroyed &&
            e.autoplay.running &&
            (a().disableOnInteraction
              ? x()
              : ((f = !0),
                (g = !1),
                (v = !1),
                (d = setTimeout(() => {
                  ((v = !0), (g = !0), C(!0));
                }, 200))));
        }),
        s("touchEnd", () => {
          if (!e.destroyed && e.autoplay.running && f) {
            if (
              (void 0 !== d && clearTimeout(d),
              void 0 !== r && clearTimeout(r),
              a().disableOnInteraction)
            )
              return ((g = !1), void (f = !1));
            (g && e.params.cssMode && _(), (g = !1), (f = !1));
          }
        }),
        s("slideChange", () => {
          !e.destroyed &&
            e.autoplay.running &&
            e.autoplay.paused &&
            ((u = S()), (c = S()));
        }),
        Object.assign(e.autoplay, { start: T, stop: x, pause: C, resume: _ }));
    };
    function we(e = "") {
      return `.${e
        .trim()
        .replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1")
        .replace(/ /g, ".")}`;
    }
    function ye(e, t, s, i) {
      const n = s ?? {},
        a = t ?? {};
      return (
        e.params.createElements &&
          Object.keys(i).forEach((t) => {
            if (!n[t] && !0 === n.auto) {
              let s = A(e.el, `.${i[t]}`)[0];
              (s ||
                ((s = M("div", i[t])), (s.className = i[t]), e.el.append(s)),
                (n[t] = s),
                (a[t] = s));
            }
          }),
        n
      );
    }
    const Se = (e) => {
        if (((e) => !!e.virtual && !!e.params.virtual?.enabled)(e))
          return e.virtual.slides.length;
        const t = e.params.grid?.rows;
        return e.grid && t && t > 1
          ? e.slides.length / Math.ceil(t)
          : e.slides.length;
      },
      Ee = ({ swiper: e, extendParams: t, on: s, emit: i }) => {
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
        let l = 0;
        function r() {
          return e.params.pagination;
        }
        function o() {
          return (
            !r().el ||
            !e.pagination.el ||
            (Array.isArray(e.pagination.el) && 0 === e.pagination.el.length)
          );
        }
        function d(e, t) {
          const { bulletActiveClass: s } = r();
          if (!e) return;
          let i = e[("prev" === t ? "previous" : "next") + "ElementSibling"];
          i &&
            (i.classList.add(`${s}-${t}`),
            (i = i[("prev" === t ? "previous" : "next") + "ElementSibling"]),
            i && i.classList.add(`${s}-${t}-${t}`));
        }
        function c(t) {
          const s = t.target.closest(we(r().bulletClass));
          if (!s) return;
          t.preventDefault();
          const i = (k(s) ?? 0) * (e.params.slidesPerGroup ?? 1);
          if (e.params.loop) {
            if (e.realIndex === i) return;
            const t =
              ((n = e.realIndex),
              (a = i),
              (l = e.slides.length),
              (a %= l) === 1 + (n %= l)
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
          var n, a, l;
        }
        function p() {
          const t = e.rtl,
            s = r();
          if (o()) return;
          const n = z(e.pagination.el);
          let c, p;
          const u = Se(e),
            h = e.params.loop
              ? Math.ceil(u / (e.params.slidesPerGroup ?? 1))
              : e.snapGrid.length;
          if (
            (e.params.loop
              ? ((p = e.previousRealIndex || 0),
                (c =
                  (e.params.slidesPerGroup ?? 1) > 1
                    ? Math.floor(e.realIndex / (e.params.slidesPerGroup ?? 1))
                    : e.realIndex))
              : void 0 !== e.snapIndex
                ? ((c = e.snapIndex), (p = e.previousSnapIndex))
                : ((p = e.previousIndex || 0), (c = e.activeIndex || 0)),
            "bullets" === s.type &&
              e.pagination.bullets &&
              e.pagination.bullets.length > 0)
          ) {
            const i = e.pagination.bullets;
            let r = 0,
              o = 0,
              u = 0;
            if (s.dynamicBullets) {
              a = $(i[0], e.isHorizontal() ? "width" : "height");
              const t = e.isHorizontal() ? "width" : "height";
              (n.forEach((e) => {
                e.style[t] = (a ?? 0) * (s.dynamicMainBullets + 4) + "px";
              }),
                s.dynamicMainBullets > 1 &&
                  void 0 !== p &&
                  ((l += c - (p || 0)),
                  l > s.dynamicMainBullets - 1
                    ? (l = s.dynamicMainBullets - 1)
                    : l < 0 && (l = 0)),
                (r = Math.max(c - l, 0)),
                (o = r + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                (u = (o + r) / 2));
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
                const i = k(t);
                (i === c
                  ? t.classList.add(...s.bulletActiveClass.split(" "))
                  : e.isElement && t.setAttribute("part", "bullet"),
                  s.dynamicBullets &&
                    void 0 !== i &&
                    (i >= r &&
                      i <= o &&
                      t.classList.add(
                        ...`${s.bulletActiveClass}-main`.split(" "),
                      ),
                    i === r && d(t, "prev"),
                    i === o && d(t, "next")));
              });
            else {
              const t = i[c];
              if (
                (t && t.classList.add(...s.bulletActiveClass.split(" ")),
                e.isElement &&
                  i.forEach((e, t) => {
                    e.setAttribute(
                      "part",
                      t === c ? "bullet-active" : "bullet",
                    );
                  }),
                s.dynamicBullets)
              ) {
                const e = i[r],
                  t = i[o];
                for (let e = r; e <= o; e += 1)
                  i[e] &&
                    i[e].classList.add(
                      ...`${s.bulletActiveClass}-main`.split(" "),
                    );
                (d(e, "prev"), d(t, "next"));
              }
            }
            if (s.dynamicBullets) {
              const n = Math.min(i.length, s.dynamicMainBullets + 4),
                l = ((a ?? 0) * n - (a ?? 0)) / 2 - u * (a ?? 0),
                r = t ? "right" : "left",
                o = e.isHorizontal() ? r : "top";
              i.forEach((e) => {
                e.style[o] = `${l}px`;
              });
            }
          }
          n.forEach((t, n) => {
            if (
              ("fraction" === s.type &&
                (t.querySelectorAll(we(s.currentClass)).forEach((e) => {
                  e.textContent = String(s.formatFractionCurrent(c + 1));
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
              const n = (c + 1) / h;
              let a = 1,
                l = 1;
              ("horizontal" === i ? (a = n) : (l = n),
                t.querySelectorAll(we(s.progressbarFillClass)).forEach((t) => {
                  ((t.style.transform = `translate3d(0,0,0) scaleX(${a}) scaleY(${l})`),
                    (t.style.transitionDuration = `${e.params.speed}ms`));
                }));
            }
            ("custom" === s.type && s.renderCustom
              ? (B(t, s.renderCustom(e, c + 1, h)),
                0 === n && i("paginationRender", t))
              : (0 === n && i("paginationRender", t), i("paginationUpdate", t)),
              e.params.watchOverflow &&
                e.enabled &&
                t.classList[e.isLocked ? "add" : "remove"](s.lockClass));
          });
        }
        function u() {
          const t = r();
          if (o()) return;
          const s = Se(e),
            n = z(e.pagination.el);
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
              ("custom" !== t.type && B(s, a || ""),
                "bullets" === t.type &&
                  e.pagination.bullets.push(
                    ...Array.from(s.querySelectorAll(we(t.bulletClass))),
                  ));
            }),
            "custom" !== t.type && i("paginationRender", n[0]));
        }
        function h() {
          e.params.pagination = ye(
            e,
            e.originalParams.pagination,
            e.params.pagination,
            { el: "swiper-pagination" },
          );
          const t = r();
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
            const t = s.find((t) => I(t, ".swiper")[0] === e.el);
            t && (s = t);
          }
          (Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(e.pagination, { el: s }));
          z(s).forEach((s) => {
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
                (l = 0),
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
              "progressbar" === t.type &&
                t.progressbarOpposite &&
                s.classList.add(t.progressbarOppositeClass),
              t.clickable && s.addEventListener("click", c),
              e.enabled || s.classList.add(t.lockClass));
          });
        }
        function m() {
          const t = r();
          if (o()) return;
          const s = e.pagination.el;
          if (s) {
            z(s).forEach((s) => {
              (s.classList.remove(t.hiddenClass),
                s.classList.remove(t.modifierClass + t.type),
                s.classList.remove(
                  e.isHorizontal() ? t.horizontalClass : t.verticalClass,
                ),
                t.clickable &&
                  (s.classList.remove(...(t.clickableClass || "").split(" ")),
                  s.removeEventListener("click", c)));
            });
          }
          e.pagination.bullets &&
            e.pagination.bullets.forEach((e) =>
              e.classList.remove(...t.bulletActiveClass.split(" ")),
            );
        }
        (s("changeDirection", () => {
          if (!e.pagination || !e.pagination.el) return;
          const t = r();
          z(e.pagination.el).forEach((s) => {
            (s.classList.remove(t.horizontalClass, t.verticalClass),
              s.classList.add(
                e.isHorizontal() ? t.horizontalClass : t.verticalClass,
              ));
          });
        }),
          s("init", () => {
            !1 === r().enabled ? f() : (h(), u(), p());
          }),
          s("activeIndexChange", () => {
            void 0 === e.snapIndex && p();
          }),
          s("snapIndexChange", () => {
            p();
          }),
          s("snapGridLengthChange", () => {
            (u(), p());
          }),
          s("destroy", () => {
            m();
          }),
          s("enable disable", () => {
            const { el: t } = e.pagination;
            if (t) {
              const s = r();
              z(t).forEach((t) =>
                t.classList[e.enabled ? "remove" : "add"](s.lockClass),
              );
            }
          }),
          s("lock unlock", () => {
            p();
          }),
          s("click", (t, s) => {
            const n = s.target,
              a = z(e.pagination.el),
              l = r();
            if (
              l.el &&
              l.hideOnClick &&
              a &&
              a.length > 0 &&
              !n.classList.contains(l.bulletClass)
            ) {
              if (
                e.navigation &&
                ((e.navigation.nextEl && n === e.navigation.nextEl) ||
                  (e.navigation.prevEl && n === e.navigation.prevEl))
              )
                return;
              const t = a[0].classList.contains(l.hiddenClass);
              (i(!0 === t ? "paginationShow" : "paginationHide"),
                a.forEach((e) => e.classList.toggle(l.hiddenClass)));
            }
          }));
        const f = () => {
          const t = r();
          e.el.classList.add(t.paginationDisabledClass);
          const { el: s } = e.pagination;
          if (s) {
            z(s).forEach((e) => e.classList.add(t.paginationDisabledClass));
          }
          m();
        };
        Object.assign(e.pagination, {
          enable: () => {
            const t = r();
            e.el.classList.remove(t.paginationDisabledClass);
            const { el: s } = e.pagination;
            if (s) {
              z(s).forEach((e) =>
                e.classList.remove(t.paginationDisabledClass),
              );
            }
            (h(), u(), p());
          },
          disable: f,
          render: u,
          update: p,
          init: h,
          destroy: m,
        });
      },
      Te =
        '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>',
      xe = ({ swiper: e, extendParams: t, on: s, emit: i }) => {
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
        function l(t, s) {
          const i = n();
          z(t).forEach((t) => {
            t &&
              (t.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
              "BUTTON" === t.tagName && (t.disabled = s),
              e.params.watchOverflow &&
                e.enabled &&
                t.classList[e.isLocked ? "add" : "remove"](i.lockClass));
          });
        }
        function r() {
          const { nextEl: t, prevEl: s } = e.navigation;
          if (e.params.loop) return (l(s, !1), void l(t, !1));
          (l(s, e.isBeginning && !e.params.rewind),
            l(t, e.isEnd && !e.params.rewind));
        }
        function o(t) {
          (t.preventDefault(),
            (!e.isBeginning || e.params.loop || e.params.rewind) &&
              (e.slidePrev(), i("navigationPrev")));
        }
        function d(t) {
          (t.preventDefault(),
            (!e.isEnd || e.params.loop || e.params.rewind) &&
              (e.slideNext(), i("navigationNext")));
        }
        function c() {
          e.params.navigation = ye(
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
          const l = z(s),
            r = z(i),
            c = (s, i) => {
              if (s) {
                if (
                  t.addIcons &&
                  s.matches(".swiper-button-next,.swiper-button-prev") &&
                  !s.querySelector("svg")
                ) {
                  const e = document.createElement("div");
                  B(e, Te);
                  const t = e.querySelector("svg");
                  (t && s.appendChild(t), e.remove());
                }
                s.addEventListener("click", "next" === i ? d : o);
              }
              !e.enabled && s && s.classList.add(...t.lockClass.split(" "));
            };
          (l.forEach((e) => c(e, "next")), r.forEach((e) => c(e, "prev")));
        }
        function p() {
          const t = n(),
            { nextEl: s, prevEl: i } = e.navigation,
            a = z(s),
            l = z(i),
            r = (e, s) => {
              (e.removeEventListener("click", "next" === s ? d : o),
                e.classList.remove(...t.disabledClass.split(" ")));
            };
          (a.forEach((e) => r(e, "next")), l.forEach((e) => r(e, "prev")));
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
            !1 === n().enabled ? u() : (c(), r());
          }),
          s("toEdge fromEdge lock unlock", () => {
            r();
          }),
          s("destroy", () => {
            p();
          }),
          s("enable disable", () => {
            const t = n(),
              { nextEl: s, prevEl: i } = e.navigation,
              a = z(s),
              l = z(i);
            e.enabled
              ? r()
              : [...a, ...l]
                  .filter((e) => !!e)
                  .forEach((e) => e.classList.add(t.lockClass));
          }),
          s("click", (t, s) => {
            const a = n(),
              { nextEl: l, prevEl: r } = e.navigation,
              o = z(l),
              d = z(r),
              c = s.target;
            let p = d.includes(c) || o.includes(c);
            if (e.isElement && !p) {
              const e = s.composedPath ? s.composedPath() : [];
              e.length && (p = e.find((e) => o.includes(e) || d.includes(e)));
            }
            if (a.hideOnClick && !p) {
              if (
                e.pagination &&
                e.params.pagination &&
                e.params.pagination.clickable &&
                (e.pagination.el === c || e.pagination.el.contains(c))
              )
                return;
              let t;
              (o.length
                ? (t = o[0].classList.contains(a.hiddenClass))
                : d.length && (t = d[0].classList.contains(a.hiddenClass)),
                i(!0 === t ? "navigationShow" : "navigationHide"),
                [...o, ...d]
                  .filter((e) => !!e)
                  .forEach((e) => e.classList.toggle(a.hiddenClass)));
            }
          }));
        const u = () => {
          const t = n();
          (e.el.classList.add(...t.navigationDisabledClass.split(" ")), p());
        };
        Object.assign(e.navigation, {
          enable: () => {
            const t = n();
            (e.el.classList.remove(...t.navigationDisabledClass.split(" ")),
              c(),
              r());
          },
          disable: u,
          update: r,
          init: c,
          destroy: p,
        });
      };
    function Ce(e, t) {
      const s = L(t);
      return (
        s !== t &&
          ((s.style.backfaceVisibility = "hidden"),
          s.style.setProperty("-webkit-backface-visibility", "hidden")),
        s
      );
    }
    function _e({
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
                          (e) => e.shadowRoot && e.shadowRoot === t.parentNode,
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
    const Le = ({ swiper: e, extendParams: t, on: s }) => {
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
            overwriteParams: l,
            perspective: r,
            recreateShadows: o,
            getEffectParams: d,
          } = e;
          (i("beforeInit", () => {
            if (s.params.effect !== t) return;
            (s.classNames.push(`${s.params.containerModifierClass}${t}`),
              r &&
                r() &&
                s.classNames.push(`${s.params.containerModifierClass}3d`));
            const e = l ? l() : {};
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
                const e = d ? d() : void 0;
                if (!e || !e.slideShadows) return;
                (s.slides.forEach((e) => {
                  e.querySelectorAll(
                    ".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left",
                  ).forEach((e) => e.remove());
                }),
                  o());
              }
            }));
          let c = !1;
          i("virtualUpdate", () => {
            s.params.effect === t &&
              (s.slides.length || (c = !0),
              requestAnimationFrame(() => {
                c && s.slides && s.slides.length && (n(), (c = !1));
              }));
          });
        })({
          effect: "fade",
          swiper: e,
          on: s,
          setTranslate: () => {
            const { slides: t } = e,
              s = (n(), a()),
              l = "out-in" === s && i > 0,
              r = i;
            i = 0;
            const o = [],
              d = [];
            let c = !1;
            for (let i = 0; i < t.length; i += 1) {
              const n = t[i];
              let a = -(n.swiperSlideOffset ?? 0);
              e.params.virtualTranslate || (a -= e.translate);
              let r = 0;
              e.isHorizontal() || ((r = a), (a = 0));
              const p = n.progress ?? 0;
              let u;
              u =
                "cross-fade" === s
                  ? Math.max(1 - Math.abs(p), 0)
                  : "out-in" === s
                    ? Math.max(1 - 2 * Math.abs(p), 0)
                    : 1 + Math.min(Math.max(p, -1), 0);
              const h = Ce(0, n);
              if (l) {
                const e = parseFloat(h.style.opacity);
                (0 === u && e > 0 && (c = !0), u > 0 && d.push(h), o.push(h));
              }
              ((h.style.opacity = String(u)),
                (h.style.transform = `translate3d(${a}px, ${r}px, 0px)`));
            }
            l &&
              (o.forEach((e) => {
                const t = c && d.includes(e);
                ((e.style.transitionDuration = r / 2 + "ms"),
                  (e.style.transitionDelay = t ? r / 2 + "ms" : "0ms"));
              }),
              _e({
                swiper: e,
                duration: r,
                transformElements: d,
                allSlides: !0,
              }));
          },
          setTransition: (t) => {
            const s = a(),
              n = e.slides.map((e) => L(e));
            (n.forEach((e) => {
              ((e.style.transitionDuration = `${t}ms`),
                "out-in" === s && 0 === t && (e.style.transitionDelay = ""));
            }),
              "out-in" === s && t > 0 && !e.params.cssMode
                ? (i = t)
                : _e({
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
      Ae = ({ swiper: e, extendParams: t, on: s }) => {
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
        function l() {
          const t = e.thumbs.swiper;
          if (!t || t.destroyed) return !1;
          const s = t.params.virtual;
          return !!s && !!s.enabled;
        }
        function r() {
          const t = e.thumbs.swiper;
          if (!t || t.destroyed) return;
          const s = t.clickedIndex,
            i = t.clickedSlide,
            n = a();
          if (i && i.classList.contains(n.slideThumbActiveClass)) return;
          if (null == s) return;
          let l;
          if (t.params.loop) {
            const e = t.clickedSlide?.getAttribute("data-swiper-slide-index");
            l = null == e ? s : parseInt(e, 10);
          } else l = s;
          e.params.loop ? e.slideToLoop(l) : e.slideTo(l);
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
            o.on("tap", r),
            l() &&
              o.on("virtualUpdate", () => {
                d(!1, { autoScroll: !1 });
              }),
            !0)
          );
        }
        function d(t, s) {
          const i = e.thumbs.swiper;
          if (!i || i.destroyed) return;
          let n = 1;
          const r = a(),
            o = r.slideThumbActiveClass,
            d = e.params.slidesPerView;
          if (
            ("number" == typeof d &&
              d > 1 &&
              !e.params.centeredSlides &&
              (n = d),
            r.multipleActiveThumbs || (n = 1),
            (n = Math.floor(n)),
            i.slides.forEach((e) => e.classList.remove(o)),
            i.params.loop || l())
          )
            for (let t = 0; t < n; t += 1)
              A(
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
                l = a().autoScrollOffset,
                r = l && !s.params.loop;
              if (e.realIndex !== s.realIndex || r) {
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
                (r && (a += "next" === o ? l : -1 * l),
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
                    if (s && s.swiper) ((t.swiper = s.swiper), o(), d(!0));
                    else if (s) {
                      const i = `${e.params.eventsPrefix}init`,
                        n = (a) => {
                          const l = a.detail;
                          ((t.swiper = l[0]),
                            s.removeEventListener(i, n),
                            o(),
                            d(!0),
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
              } else (o(), d(!0));
          }),
          s("slideChange update resize observerUpdate", () => {
            d();
          }),
          s("setTransition", (t, s) => {
            const i = e.thumbs.swiper;
            i && !i.destroyed && i.setTransition(s);
          }),
          s("beforeDestroy", () => {
            const t = e.thumbs.swiper;
            t && !t.destroyed && n && t.destroy();
          }),
          Object.assign(e.thumbs, { init: o, update: d }));
      };
    function Pe() {
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
      (Pe(),
        document.querySelector(".swiper") &&
          (new fe(".new-product__slider", {
            modules: [be, Ee, xe],
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
          new fe(".big-photo-product", {
            modules: [Le, Ae, xe],
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
          new fe(".thumb-photo", {
            autoHeight: !0,
            breakpoints: {
              320: { slidesPerView: 3, spaceBetween: 10 },
              479.98: { slidesPerView: 4, spaceBetween: 10 },
              574.98: { slidesPerView: 3, spaceBetween: 10 },
              767.98: { slidesPerView: 3.5, spaceBetween: 10 },
              991.98: { slidesPerView: 5, spaceBetween: 10 },
            },
          })));
    });
    new (s(144))({
      elements_selector: "[data-src]",
      class_loaded: "_lazy-loaded",
    });
    let Me = !1;
    setTimeout(() => {
      if (Me) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0);
    document.querySelector(".quantity-btn__plus");
    const Oe = document.querySelector(".quantity-btn__minus");
    let ke,
      Ie,
      $e = document.querySelector(".quantity-btn__input");
    (document.addEventListener("click", function (e) {
      ((Ie = e.target),
        (function () {
          if (i.any())
            if (Ie.closest(".menu__item"))
              Ie.closest(".menu__item").classList.toggle("sub-menu-active");
            else {
              let e = document.querySelector(".sub-menu-active");
              e && e.classList.remove("sub-menu-active");
            }
        })(),
        Ie.closest(".quantity-btn__plus") &&
          (ke++,
          1 == ke
            ? Oe && Oe.classList.add("_btn-disable")
            : Oe.classList.remove("_btn-disable"),
          ($e.value = ke)),
        Ie.closest(".quantity-btn__minus") &&
          (ke--,
          1 == ke
            ? Oe && Oe.classList.add("_btn-disable")
            : Oe.classList.remove("_btn-disable"),
          ($e.value = ke),
          ke <= 0
            ? (console.log($e.value),
              (ke = 1),
              ($e.value = ke),
              Oe.classList.add("_btn-disable"))
            : Oe.classList.remove("_btn-disable")));
    }),
      $e &&
        ((ke = $e.value),
        $e.addEventListener("keyup", (e) => {
          let t = e.currentTarget;
          ("0" == t.value && (t.value = 1),
            (ke = $e.value),
            1 == ke
              ? Oe && Oe.classList.add("_btn-disable")
              : Oe.classList.remove("_btn-disable"));
        }),
        $e.addEventListener("keypress", (e) => {
          !(function (e) {
            var t = e.which ? e.which : e.keyCode;
            t > 31 && (t < 48 || t > 57) && e.preventDefault();
          })(e);
        }),
        $e.addEventListener("change", (e) => {
          let t = e.currentTarget;
          (t.value || (t.value = 1),
            (ke = $e.value),
            1 == ke
              ? Oe && Oe.classList.add("_btn-disable")
              : Oe.classList.remove("_btn-disable"));
        })));
    let ze,
      Be = !0;
    (document.addEventListener("click", function (e) {
      ((ze = e.target),
        Be && ze.closest(".menu-text")
          ? (document.documentElement.classList.add("menu-open"),
            document.documentElement.classList.add("no-scrolling"),
            (Be = !1))
          : ze.closest(".menu") ||
            (document.documentElement.classList.remove("menu-open"),
            document.documentElement.classList.remove("no-scrolling"),
            (Be = !0)));
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
          let s = u(e, "spollers");
          function i(e, t = !1) {
            e.forEach((e) => {
              ((e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    a(e),
                    e.addEventListener("click", r))
                  : (e.classList.remove("_spoller-init"),
                    a(e, !1),
                    e.removeEventListener("click", r)));
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
          function r(e) {
            const t = e.target;
            if (t.closest("[data-spoller]")) {
              const s = t.closest("[data-spoller]"),
                i = s.closest("[data-spollers]"),
                n = !!i.hasAttribute("data-one-spoller");
              (i.querySelectorAll("._slide").length ||
                (n && !s.classList.contains("_spoller-active") && o(i),
                s.classList.toggle("_spoller-active"),
                l(s.nextElementSibling, 500)),
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
              (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
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
              const l = await fetch(e, { method: n, body: a });
              if (l.ok) {
                await l.json();
                (t.classList.remove("_sending"), i(t));
              } else (alert("Ошибка"), t.classList.remove("_sending"));
            } else t.hasAttribute("data-dev") && (s.preventDefault(), i(t));
          } else {
            s.preventDefault();
            const e = t.querySelector("._form-error");
            e && t.hasAttribute("data-goto-error") && h(e, !0, 1e3);
          }
        }
        function i(e) {
          (document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: e } }),
          ),
            w.formClean(e),
            p(`[Формы]: ${"Форма отправлена!"}`));
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
              (n(e), a(), e.classList.contains("rating_set") && l(e));
            }
            function n(e) {
              ((t = e.querySelector(".rating__active")),
                (s = e.querySelector(".rating__value")));
            }
            function a(e = s.innerHTML) {
              const i = e / 0.05;
              t.style.width = `${i}%`;
            }
            function l(e) {
              const t = e.querySelectorAll(".rating__item");
              for (let i = 0; i < t.length; i++) {
                const l = t[i];
                (l.addEventListener("mouseenter", function (t) {
                  (n(e), a(l.value));
                }),
                  l.addEventListener("mouseleave", function (e) {
                    a();
                  }),
                  l.addEventListener("click", function (t) {
                    (n(e),
                      e.dataset.ajax
                        ? r(l.value, e)
                        : ((s.innerHTML = i + 1), a()));
                  }));
              }
            }
            async function r(e, t) {
              if (!t.classList.contains("rating_sending")) {
                t.classList.add("rating_sending");
                let e = await fetch("rating.json", { method: "GET" });
                if (e.ok) {
                  const i = (await e.json()).newRating;
                  ((s.innerHTML = i),
                    a(),
                    t.classList.remove("rating_sending"));
                } else (alert("Ошибка"), t.classList.remove("rating_sending"));
              }
            }
          })();
      })(),
      (f.selectModule = new m({})),
      (Me = !0),
      (function () {
        const e = document.querySelectorAll("[data-sticky]");
        e.length &&
          e.forEach((e) => {
            let t = {
              top: e.dataset.stickyTop ? parseInt(e.dataset.stickyTop) : 0,
              bottom: e.dataset.stickyBottom
                ? parseInt(e.dataset.stickyBottom)
                : 0,
              header: e.hasAttribute("data-sticky-header")
                ? document.querySelector("header.header").offsetHeight
                : 0,
            };
            !(function (e, t) {
              const s = e.querySelector("[data-sticky-item]"),
                i = t.header,
                n = i + t.top,
                a = s.getBoundingClientRect().top + scrollY - n;
              document.addEventListener("windowScroll", function (i) {
                const l =
                  e.offsetHeight +
                  e.getBoundingClientRect().top +
                  scrollY -
                  (n + s.offsetHeight + t.bottom);
                let r = {
                  position: "relative",
                  bottom: "auto",
                  top: "0px",
                  left: "0px",
                  width: "auto",
                };
                (n + t.bottom + s.offsetHeight < window.innerHeight &&
                  (scrollY >= a && scrollY <= l
                    ? ((r.position = "fixed"),
                      (r.bottom = "auto"),
                      (r.top = `${n}px`),
                      (r.left = `${s.getBoundingClientRect().left}px`),
                      (r.width = `${s.offsetWidth}px`))
                    : scrollY >= l &&
                      ((r.position = "absolute"),
                      (r.bottom = `${t.bottom}px`),
                      (r.top = "auto"),
                      (r.left = "0px"),
                      (r.width = `${s.offsetWidth}px`))),
                  (function (e, t) {
                    e.style.cssText = `position:${t.position};bottom:${t.bottom};top:${t.top};left:${t.left};width:${t.width};`;
                  })(s, r));
              });
            })(e, t);
          });
      })());
  })();
})();
