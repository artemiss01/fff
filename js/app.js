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
          l = {
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
          a = (e) => Object.assign({}, l, e),
          n = function (e, t) {
            let s;
            const l = "LazyLoad::Initialized",
              a = new e(t);
            try {
              s = new CustomEvent(l, { detail: { instance: a } });
            } catch (e) {
              ((s = document.createEvent("CustomEvent")),
                s.initCustomEvent(l, !1, !1, { instance: a }));
            }
            window.dispatchEvent(s);
          },
          i = "src",
          c = "srcset",
          o = "sizes",
          r = "poster",
          d = "llOriginalAttrs",
          h = "data",
          u = "loading",
          p = "loaded",
          m = "applied",
          g = "error",
          f = "native",
          S = "data-",
          _ = "ll-status",
          v = (e, t) => e.getAttribute(S + t),
          b = (e) => v(e, _),
          y = (e, t) =>
            ((e, t, s) => {
              const l = S + t;
              null !== s ? e.setAttribute(l, s) : e.removeAttribute(l);
            })(e, _, t),
          E = (e) => y(e, null),
          C = (e) => null === b(e),
          A = (e) => b(e) === f,
          L = [u, p, m, g],
          w = (e, t, s, l) => {
            e &&
              "function" == typeof e &&
              (void 0 === l ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, l));
          },
          k = (t, s) => {
            e && "" !== s && t.classList.add(s);
          },
          $ = (t, s) => {
            e && "" !== s && t.classList.remove(s);
          },
          x = (e) => e.llTempImage,
          O = (e, t) => {
            if (!t) return;
            const s = t._observer;
            s && s.unobserve(e);
          },
          I = (e, t) => {
            e && (e.loadingCount += t);
          },
          T = (e, t) => {
            e && (e.toLoadCount = t);
          },
          P = (e) => {
            let t = [];
            for (let s, l = 0; (s = e.children[l]); l += 1)
              "SOURCE" === s.tagName && t.push(s);
            return t;
          },
          M = (e, t) => {
            const s = e.parentNode;
            s && "PICTURE" === s.tagName && P(s).forEach(t);
          },
          q = (e, t) => {
            P(e).forEach(t);
          },
          B = [i],
          j = [i, r],
          D = [i, c, o],
          H = [h],
          z = (e) => !!e[d],
          V = (e) => e[d],
          N = (e) => delete e[d],
          R = (e, t) => {
            if (z(e)) return;
            const s = {};
            (t.forEach((t) => {
              s[t] = e.getAttribute(t);
            }),
              (e[d] = s));
          },
          F = (e, t) => {
            if (!z(e)) return;
            const s = V(e);
            t.forEach((t) => {
              ((e, t, s) => {
                s ? e.setAttribute(t, s) : e.removeAttribute(t);
              })(e, t, s[t]);
            });
          },
          G = (e, t, s) => {
            (k(e, t.class_applied),
              y(e, m),
              s &&
                (t.unobserve_completed && O(e, t),
                w(t.callback_applied, e, s)));
          },
          Q = (e, t, s) => {
            (k(e, t.class_loading),
              y(e, u),
              s && (I(s, 1), w(t.callback_loading, e, s)));
          },
          U = (e, t, s) => {
            s && e.setAttribute(t, s);
          },
          Z = (e, t) => {
            (U(e, o, v(e, t.data_sizes)),
              U(e, c, v(e, t.data_srcset)),
              U(e, i, v(e, t.data_src)));
          },
          J = {
            IMG: (e, t) => {
              (M(e, (e) => {
                (R(e, D), Z(e, t));
              }),
                R(e, D),
                Z(e, t));
            },
            IFRAME: (e, t) => {
              (R(e, B), U(e, i, v(e, t.data_src)));
            },
            VIDEO: (e, t) => {
              (q(e, (e) => {
                (R(e, B), U(e, i, v(e, t.data_src)));
              }),
                R(e, j),
                U(e, r, v(e, t.data_poster)),
                U(e, i, v(e, t.data_src)),
                e.load());
            },
            OBJECT: (e, t) => {
              (R(e, H), U(e, h, v(e, t.data_src)));
            },
          },
          W = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
          X = (e, t) => {
            !t ||
              ((e) => e.loadingCount > 0)(t) ||
              ((e) => e.toLoadCount > 0)(t) ||
              w(e.callback_finish, t);
          },
          Y = (e, t, s) => {
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
              const l = t[s];
              K(e, s, l);
            }
            delete e.llEvLisnrs;
          },
          se = (e, t, s) => {
            (((e) => {
              delete e.llTempImage;
            })(e),
              I(s, -1),
              ((e) => {
                e && (e.toLoadCount -= 1);
              })(s),
              $(e, t.class_loading),
              t.unobserve_completed && O(e, s));
          },
          le = (e, t, s) => {
            const l = x(e) || e;
            ee(l) ||
              ((e, t, s) => {
                ee(e) || (e.llEvLisnrs = {});
                const l = "VIDEO" === e.tagName ? "loadeddata" : "load";
                (Y(e, l, t), Y(e, "error", s));
              })(
                l,
                (a) => {
                  (((e, t, s, l) => {
                    const a = A(t);
                    (se(t, s, l),
                      k(t, s.class_loaded),
                      y(t, p),
                      w(s.callback_loaded, t, l),
                      a || X(s, l));
                  })(0, e, t, s),
                    te(l));
                },
                (a) => {
                  (((e, t, s, l) => {
                    const a = A(t);
                    (se(t, s, l),
                      k(t, s.class_error),
                      y(t, g),
                      w(s.callback_error, t, l),
                      s.restore_on_error && F(t, D),
                      a || X(s, l));
                  })(0, e, t, s),
                    te(l));
                },
              );
          },
          ae = (e, t, l) => {
            ((e) => W.indexOf(e.tagName) > -1)(e)
              ? ((e, t, s) => {
                  (le(e, t, s),
                    ((e, t, s) => {
                      const l = J[e.tagName];
                      l && (l(e, t), Q(e, t, s));
                    })(e, t, s));
                })(e, t, l)
              : ((e, t, l) => {
                  (((e) => {
                    e.llTempImage = document.createElement("IMG");
                  })(e),
                    le(e, t, l),
                    ((e) => {
                      z(e) ||
                        (e[d] = { backgroundImage: e.style.backgroundImage });
                    })(e),
                    ((e, t, l) => {
                      const a = v(e, t.data_bg),
                        n = v(e, t.data_bg_hidpi),
                        c = s && n ? n : a;
                      c &&
                        ((e.style.backgroundImage = `url("${c}")`),
                        x(e).setAttribute(i, c),
                        Q(e, t, l));
                    })(e, t, l),
                    ((e, t, l) => {
                      const a = v(e, t.data_bg_multi),
                        n = v(e, t.data_bg_multi_hidpi),
                        i = s && n ? n : a;
                      i && ((e.style.backgroundImage = i), G(e, t, l));
                    })(e, t, l),
                    ((e, t, s) => {
                      const l = v(e, t.data_bg_set);
                      if (!l) return;
                      let a = l.split("|").map((e) => `image-set(${e})`);
                      ((e.style.backgroundImage = a.join()), G(e, t, s));
                    })(e, t, l));
                })(e, t, l);
          },
          ne = (e) => {
            (e.removeAttribute(i), e.removeAttribute(c), e.removeAttribute(o));
          },
          ie = (e) => {
            (M(e, (e) => {
              F(e, D);
            }),
              F(e, D));
          },
          ce = {
            IMG: ie,
            IFRAME: (e) => {
              F(e, B);
            },
            VIDEO: (e) => {
              (q(e, (e) => {
                F(e, B);
              }),
                F(e, j),
                e.load());
            },
            OBJECT: (e) => {
              F(e, H);
            },
          },
          oe = (e, t) => {
            (((e) => {
              const t = ce[e.tagName];
              t
                ? t(e)
                : ((e) => {
                    if (!z(e)) return;
                    const t = V(e);
                    e.style.backgroundImage = t.backgroundImage;
                  })(e);
            })(e),
              ((e, t) => {
                C(e) ||
                  A(e) ||
                  ($(e, t.class_entered),
                  $(e, t.class_exited),
                  $(e, t.class_applied),
                  $(e, t.class_loading),
                  $(e, t.class_loaded),
                  $(e, t.class_error));
              })(e, t),
              E(e),
              N(e));
          },
          re = ["IMG", "IFRAME", "VIDEO"],
          de = (e) => e.use_native && "loading" in HTMLImageElement.prototype,
          he = (e, t, s) => {
            e.forEach((e) =>
              ((e) => e.isIntersecting || e.intersectionRatio > 0)(e)
                ? ((e, t, s, l) => {
                    const a = ((e) => L.indexOf(b(e)) >= 0)(e);
                    (y(e, "entered"),
                      k(e, s.class_entered),
                      $(e, s.class_exited),
                      ((e, t, s) => {
                        t.unobserve_entered && O(e, s);
                      })(e, s, l),
                      w(s.callback_enter, e, t, l),
                      a || ae(e, s, l));
                  })(e.target, e, t, s)
                : ((e, t, s, l) => {
                    C(e) ||
                      (k(e, s.class_exited),
                      ((e, t, s, l) => {
                        s.cancel_on_exit &&
                          ((e) => b(e) === u)(e) &&
                          "IMG" === e.tagName &&
                          (te(e),
                          ((e) => {
                            (M(e, (e) => {
                              ne(e);
                            }),
                              ne(e));
                          })(e),
                          ie(e),
                          $(e, s.class_loading),
                          I(l, -1),
                          E(e),
                          w(s.callback_cancel, e, t, l));
                      })(e, t, s, l),
                      w(s.callback_exit, e, t, l));
                  })(e.target, e, t, s),
            );
          },
          ue = (e) => Array.prototype.slice.call(e),
          pe = (e) => e.container.querySelectorAll(e.elements_selector),
          me = (e) => ((e) => b(e) === g)(e),
          ge = (e, t) => ((e) => ue(e).filter(C))(e || pe(t)),
          fe = function (t, s) {
            const l = a(t);
            ((this._settings = l),
              (this.loadingCount = 0),
              ((e, t) => {
                de(e) ||
                  (t._observer = new IntersectionObserver(
                    (s) => {
                      he(s, e, t);
                    },
                    ((e) => ({
                      root: e.container === document ? null : e.container,
                      rootMargin: e.thresholds || e.threshold + "px",
                    }))(e),
                  ));
              })(l, this),
              ((t, s) => {
                e &&
                  ((s._onlineHandler = () => {
                    ((e, t) => {
                      var s;
                      (((s = pe(e)), ue(s).filter(me)).forEach((t) => {
                        ($(t, e.class_error), E(t));
                      }),
                        t.update());
                    })(t, s);
                  }),
                  window.addEventListener("online", s._onlineHandler));
              })(l, this),
              this.update(s));
          };
        return (
          (fe.prototype = {
            update: function (e) {
              const s = this._settings,
                l = ge(e, s);
              var a, n;
              (T(this, l.length),
                t
                  ? this.loadAll(l)
                  : de(s)
                    ? ((e, t, s) => {
                        (e.forEach((e) => {
                          -1 !== re.indexOf(e.tagName) &&
                            ((e, t, s) => {
                              (e.setAttribute("loading", "lazy"),
                                le(e, t, s),
                                ((e, t) => {
                                  const s = J[e.tagName];
                                  s && s(e, t);
                                })(e, t),
                                y(e, f));
                            })(e, t, s);
                        }),
                          T(s, 0));
                      })(l, s, this)
                    : ((n = l),
                      ((e) => {
                        e.disconnect();
                      })((a = this._observer)),
                      ((e, t) => {
                        t.forEach((t) => {
                          e.observe(t);
                        });
                      })(a, n)));
            },
            destroy: function () {
              (this._observer && this._observer.disconnect(),
                e && window.removeEventListener("online", this._onlineHandler),
                pe(this._settings).forEach((e) => {
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
              ge(e, t).forEach((e) => {
                (O(e, this), ae(e, t, this));
              });
            },
            restoreAll: function () {
              const e = this._settings;
              pe(e).forEach((t) => {
                oe(t, e);
              });
            },
          }),
          (fe.load = (e, t) => {
            const s = a(t);
            ae(e, s);
          }),
          (fe.resetStatus = (e) => {
            E(e);
          }),
          e &&
            ((e, t) => {
              if (t)
                if (t.length) for (let s, l = 0; (s = t[l]); l += 1) n(e, s);
                else n(e, t);
            })(fe, window.lazyLoadOptions),
          fe
        );
      })();
    },
  };
  const t = {};
  function s(l) {
    const a = t[l];
    if (void 0 !== a) return a.exports;
    const n = (t[l] = { exports: {} });
    return (e[l].call(n.exports, n, n.exports, s), n.exports);
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
          l = {};
        ((l.element = t),
          (l.parent = t.parentNode),
          (l.destination = document.querySelector(s[0].trim())),
          (l.breakpoint = s[1] ? s[1].trim() : "767"),
          (l.place = s[2] ? s[2].trim() : "last"),
          (l.index = this.indexInParent(l.parent, l.element)),
          this.оbjects.push(l));
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
          l = String.prototype.split.call(s, ","),
          a = window.matchMedia(l[0]),
          n = l[1],
          i = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === n;
          });
        (a.addListener(function () {
          e.mediaHandler(a, i);
        }),
          this.mediaHandler(a, i));
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
    let t = {
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
          t.Android() || t.BlackBerry() || t.iOS() || t.Opera() || t.Windows()
        );
      },
    };
    let l = (e, t = 500, s = 0) => {
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
          let l = e.offsetHeight;
          ((e.style.overflow = "hidden"),
            (e.style.height = s ? `${s}px` : "0px"),
            (e.style.paddingTop = 0),
            (e.style.paddingBottom = 0),
            (e.style.marginTop = 0),
            (e.style.marginBottom = 0),
            e.offsetHeight,
            (e.style.transitionProperty = "height, margin, padding"),
            (e.style.transitionDuration = t + "ms"),
            (e.style.height = l + "px"),
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
      n = (e, t = 500) => (e.hidden ? a(e, t) : l(e, t));
    class i {
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
        let l = document.createElement("div");
        if (
          (l.classList.add(this.selectClasses.classSelect),
          e.parentNode.insertBefore(l, e),
          l.appendChild(e),
          (e.hidden = !0),
          t && (e.dataset.id = t),
          l.insertAdjacentHTML(
            "beforeend",
            `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`,
          ),
          this.selectBuild(e),
          this.getSelectPlaceholder(e) &&
            ((e.dataset.placeholder = this.getSelectPlaceholder(e).value),
            this.getSelectPlaceholder(e).label.show))
        ) {
          this.getSelectElement(
            l,
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
          const l = t.closest(".select")
              ? t.closest(".select")
              : document.querySelector(
                  `.${this.selectClasses.classSelect}[data-id="${t.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.selectId}"]`,
                ),
            a = this.getSelectElement(l).originalSelect;
          if ("click" === s) {
            if (!a.disabled)
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
                this.optionAction(l, a, s);
              } else if (
                t.closest(
                  this.getSelectClass(this.selectClasses.classSelectTitle),
                )
              )
                this.selectAction(l);
              else if (
                t.closest(
                  this.getSelectClass(this.selectClasses.classSelectOption),
                )
              ) {
                const e = t.closest(
                  this.getSelectClass(this.selectClasses.classSelectOption),
                );
                this.optionAction(l, a, e);
              }
          } else
            "focusin" === s || "focusout" === s
              ? t.closest(
                  this.getSelectClass(this.selectClasses.classSelect),
                ) &&
                ("focusin" === s
                  ? l.classList.add(this.selectClasses.classSelectFocus)
                  : l.classList.remove(this.selectClasses.classSelectFocus))
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
          n(s, t.dataset.speed));
      }
      setSelectTitleValue(e, t) {
        const s = this.getSelectElement(
            e,
            this.selectClasses.classSelectBody,
          ).selectElement,
          l = this.getSelectElement(
            e,
            this.selectClasses.classSelectTitle,
          ).selectElement;
        (l && l.remove(),
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
        let l = "";
        return (
          (l += t ? `<span class="${this.selectClasses.classSelectRow}">` : ""),
          (l += t
            ? `<span class="${this.selectClasses.classSelectData}">`
            : ""),
          (l += t ? s : ""),
          (l += t ? "</span>" : ""),
          (l += t
            ? `<span class="${this.selectClasses.classSelectText}">`
            : ""),
          (l += e.textContent),
          (l += t ? "</span>" : ""),
          (l += t ? "</span>" : ""),
          l
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
          l = Array.from(e.options);
        if (l.length > 0) {
          let a = "";
          return (
            ((this.getSelectPlaceholder(e) &&
              !this.getSelectPlaceholder(e).show) ||
              e.multiple) &&
              (l = l.filter((e) => e.value)),
            (a += t
              ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
              : ""),
            l.forEach((t) => {
              a += this.getOption(t, e);
            }),
            (a += t ? "</div>" : ""),
            a
          );
        }
      }
      getOption(e, t) {
        const s =
            e.selected && t.multiple
              ? ` ${this.selectClasses.classSelectOptionSelected}`
              : "",
          l =
            e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
          a = e.dataset.class ? ` ${e.dataset.class}` : "",
          n = !!e.dataset.href && e.dataset.href,
          i = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
        let c = "";
        return (
          (c += n
            ? `<a ${i} ${l} href="${n}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${a}${s}">`
            : `<button ${l} class="${this.selectClasses.classSelectOption}${a}${s}" data-value="${e.value}" type="button">`),
          (c += this.getSelectElementContent(e)),
          (c += n ? "</a>" : "</button>"),
          c
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
          (e.hasAttribute("data-validate") && o.validateInput(e),
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
          l = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
          a = this;
        t.addEventListener("input", function () {
          (l.forEach((e) => {
            e.textContent.toUpperCase().indexOf(t.value.toUpperCase()) >= 0
              ? (e.hidden = !1)
              : (e.hidden = !0);
          }),
            !0 === s.hidden && a.selectAction(e));
        });
      }
      selectCallback(e, t) {
        document.dispatchEvent(
          new CustomEvent("selectCallback", { detail: { select: t } }),
        );
      }
      setLogging(e) {
        this.config.logging &&
          (function (e) {
            setTimeout(() => {
              window.FLS && console.log(e);
            }, 0);
          })(`[select]: ${e}`);
      }
    }
    const c = { inputMaskModule: null, selectModule: null };
    let o = {
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
              this.emailTest(e) ? (this.addError(e), t++) : this.removeError(e))
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
                o.removeError(s),
                (s.value = s.dataset.placeholder));
            }
            let s = e.querySelectorAll(".checkbox__input");
            if (s.length > 0)
              for (let e = 0; e < s.length; e++) {
                s[e].checked = !1;
              }
            if (c.selectModule) {
              let t = e.querySelectorAll(".select");
              if (t.length)
                for (let e = 0; e < t.length; e++) {
                  const s = t[e].querySelector("select");
                  c.selectModule.selectBuild(s);
                }
            }
          }, 0));
      },
      emailTest: (e) =>
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
    };
    new (s(144))({
      elements_selector: "[data-src]",
      class_loaded: "_lazy-loaded",
    });
    let r,
      d = !1;
    (setTimeout(() => {
      if (d) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0),
      document.addEventListener("click", function (e) {
        ((r = e.target),
          (function () {
            if (t.any())
              if (r.closest(".menu__item"))
                r.closest(".menu__item").classList.toggle("sub-menu-active");
              else {
                let e = document.querySelector(".sub-menu-active");
                e && e.classList.remove("sub-menu-active");
              }
          })());
      }));
    let h,
      u = !0;
    (document.addEventListener("click", function (e) {
      ((h = e.target),
        u && h.closest(".menu-text")
          ? (document.documentElement.classList.add("menu-open"),
            document.documentElement.classList.add("no-scrolling"),
            (u = !1))
          : h.closest(".menu") ||
            (document.documentElement.classList.remove("menu-open"),
            document.documentElement.classList.remove("no-scrolling"),
            (u = !0)));
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
          document.documentElement.classList.add("loaded");
        }, 0);
      }),
      (function () {
        const e = document.querySelectorAll(".rating");
        e.length > 0 &&
          (function () {
            let t, s;
            for (let t = 0; t < e.length; t++) {
              l(e[t]);
            }
            function l(e) {
              (a(e), n(), e.classList.contains("rating_set") && i(e));
            }
            function a(e) {
              ((t = e.querySelector(".rating__active")),
                (s = e.querySelector(".rating__value")));
            }
            function n(e = s.innerHTML) {
              const l = e / 0.05;
              t.style.width = `${l}%`;
            }
            function i(e) {
              const t = e.querySelectorAll(".rating__item");
              for (let l = 0; l < t.length; l++) {
                const i = t[l];
                (i.addEventListener("mouseenter", function (t) {
                  (a(e), n(i.value));
                }),
                  i.addEventListener("mouseleave", function (e) {
                    n();
                  }),
                  i.addEventListener("click", function (t) {
                    (a(e),
                      e.dataset.ajax
                        ? c(i.value, e)
                        : ((s.innerHTML = l + 1), n()));
                  }));
              }
            }
            async function c(e, t) {
              if (!t.classList.contains("rating_sending")) {
                t.classList.add("rating_sending");
                let e = await fetch("rating.json", { method: "GET" });
                if (e.ok) {
                  const l = (await e.json()).newRating;
                  ((s.innerHTML = l),
                    n(),
                    t.classList.remove("rating_sending"));
                } else (alert("Ошибка"), t.classList.remove("rating_sending"));
              }
            }
          })();
      })(),
      (c.selectModule = new i({})));
  })();
})();
