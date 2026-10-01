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
          a = (e) => Object.assign({}, i, e),
          n = function (e, t) {
            let s;
            const i = "LazyLoad::Initialized",
              a = new e(t);
            try {
              s = new CustomEvent(i, { detail: { instance: a } });
            } catch (e) {
              ((s = document.createEvent("CustomEvent")),
                s.initCustomEvent(i, !1, !1, { instance: a }));
            }
            window.dispatchEvent(s);
          },
          l = "src",
          r = "srcset",
          o = "sizes",
          d = "poster",
          c = "llOriginalAttrs",
          u = "data",
          p = "loading",
          m = "loaded",
          h = "applied",
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
          C = [p, m, h, f],
          L = (e, t, s, i) => {
            e &&
              "function" == typeof e &&
              (void 0 === i ? (void 0 === s ? e(t) : e(t, s)) : e(t, s, i));
          },
          _ = (t, s) => {
            e && "" !== s && t.classList.add(s);
          },
          M = (t, s) => {
            e && "" !== s && t.classList.remove(s);
          },
          A = (e) => e.llTempImage,
          P = (e, t) => {
            if (!t) return;
            const s = t._observer;
            s && s.unobserve(e);
          },
          k = (e, t) => {
            e && (e.loadingCount += t);
          },
          I = (e, t) => {
            e && (e.toLoadCount = t);
          },
          O = (e) => {
            let t = [];
            for (let s, i = 0; (s = e.children[i]); i += 1)
              "SOURCE" === s.tagName && t.push(s);
            return t;
          },
          $ = (e, t) => {
            const s = e.parentNode;
            s && "PICTURE" === s.tagName && O(s).forEach(t);
          },
          z = (e, t) => {
            O(e).forEach(t);
          },
          D = [l],
          B = [l, d],
          G = [l, r, o],
          V = [u],
          q = (e) => !!e[c],
          N = (e) => e[c],
          H = (e) => delete e[c],
          F = (e, t) => {
            if (q(e)) return;
            const s = {};
            (t.forEach((t) => {
              s[t] = e.getAttribute(t);
            }),
              (e[c] = s));
          },
          j = (e, t) => {
            if (!q(e)) return;
            const s = N(e);
            t.forEach((t) => {
              ((e, t, s) => {
                s ? e.setAttribute(t, s) : e.removeAttribute(t);
              })(e, t, s[t]);
            });
          },
          R = (e, t, s) => {
            (_(e, t.class_applied),
              S(e, h),
              s &&
                (t.unobserve_completed && P(e, t),
                L(t.callback_applied, e, s)));
          },
          W = (e, t, s) => {
            (_(e, t.class_loading),
              S(e, p),
              s && (k(s, 1), L(t.callback_loading, e, s)));
          },
          X = (e, t, s) => {
            s && e.setAttribute(t, s);
          },
          Y = (e, t) => {
            (X(e, o, w(e, t.data_sizes)),
              X(e, r, w(e, t.data_srcset)),
              X(e, l, w(e, t.data_src)));
          },
          U = {
            IMG: (e, t) => {
              ($(e, (e) => {
                (F(e, G), Y(e, t));
              }),
                F(e, G),
                Y(e, t));
            },
            IFRAME: (e, t) => {
              (F(e, D), X(e, l, w(e, t.data_src)));
            },
            VIDEO: (e, t) => {
              (z(e, (e) => {
                (F(e, D), X(e, l, w(e, t.data_src)));
              }),
                F(e, B),
                X(e, d, w(e, t.data_poster)),
                X(e, l, w(e, t.data_src)),
                e.load());
            },
            OBJECT: (e, t) => {
              (F(e, V), X(e, u, w(e, t.data_src)));
            },
          },
          Q = ["IMG", "IFRAME", "VIDEO", "OBJECT"],
          Z = (e, t) => {
            !t ||
              ((e) => e.loadingCount > 0)(t) ||
              ((e) => e.toLoadCount > 0)(t) ||
              L(e.callback_finish, t);
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
              k(s, -1),
              ((e) => {
                e && (e.toLoadCount -= 1);
              })(s),
              M(e, t.class_loading),
              t.unobserve_completed && P(e, s));
          },
          ie = (e, t, s) => {
            const i = A(e) || e;
            ee(i) ||
              ((e, t, s) => {
                ee(e) || (e.llEvLisnrs = {});
                const i = "VIDEO" === e.tagName ? "loadeddata" : "load";
                (J(e, i, t), J(e, "error", s));
              })(
                i,
                (a) => {
                  (((e, t, s, i) => {
                    const a = x(t);
                    (se(t, s, i),
                      _(t, s.class_loaded),
                      S(t, m),
                      L(s.callback_loaded, t, i),
                      a || Z(s, i));
                  })(0, e, t, s),
                    te(i));
                },
                (a) => {
                  (((e, t, s, i) => {
                    const a = x(t);
                    (se(t, s, i),
                      _(t, s.class_error),
                      S(t, f),
                      L(s.callback_error, t, i),
                      s.restore_on_error && j(t, G),
                      a || Z(s, i));
                  })(0, e, t, s),
                    te(i));
                },
              );
          },
          ae = (e, t, i) => {
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
                      q(e) ||
                        (e[c] = { backgroundImage: e.style.backgroundImage });
                    })(e),
                    ((e, t, i) => {
                      const a = w(e, t.data_bg),
                        n = w(e, t.data_bg_hidpi),
                        r = s && n ? n : a;
                      r &&
                        ((e.style.backgroundImage = `url("${r}")`),
                        A(e).setAttribute(l, r),
                        W(e, t, i));
                    })(e, t, i),
                    ((e, t, i) => {
                      const a = w(e, t.data_bg_multi),
                        n = w(e, t.data_bg_multi_hidpi),
                        l = s && n ? n : a;
                      l && ((e.style.backgroundImage = l), R(e, t, i));
                    })(e, t, i),
                    ((e, t, s) => {
                      const i = w(e, t.data_bg_set);
                      if (!i) return;
                      let a = i.split("|").map((e) => `image-set(${e})`);
                      ((e.style.backgroundImage = a.join()), R(e, t, s));
                    })(e, t, i));
                })(e, t, i);
          },
          ne = (e) => {
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
              j(e, D);
            },
            VIDEO: (e) => {
              (z(e, (e) => {
                j(e, D);
              }),
                j(e, B),
                e.load());
            },
            OBJECT: (e) => {
              j(e, V);
            },
          },
          oe = (e, t) => {
            (((e) => {
              const t = re[e.tagName];
              t
                ? t(e)
                : ((e) => {
                    if (!q(e)) return;
                    const t = N(e);
                    e.style.backgroundImage = t.backgroundImage;
                  })(e);
            })(e),
              ((e, t) => {
                T(e) ||
                  x(e) ||
                  (M(e, t.class_entered),
                  M(e, t.class_exited),
                  M(e, t.class_applied),
                  M(e, t.class_loading),
                  M(e, t.class_loaded),
                  M(e, t.class_error));
              })(e, t),
              E(e),
              H(e));
          },
          de = ["IMG", "IFRAME", "VIDEO"],
          ce = (e) => e.use_native && "loading" in HTMLImageElement.prototype,
          ue = (e, t, s) => {
            e.forEach((e) =>
              ((e) => e.isIntersecting || e.intersectionRatio > 0)(e)
                ? ((e, t, s, i) => {
                    const a = ((e) => C.indexOf(y(e)) >= 0)(e);
                    (S(e, "entered"),
                      _(e, s.class_entered),
                      M(e, s.class_exited),
                      ((e, t, s) => {
                        t.unobserve_entered && P(e, s);
                      })(e, s, i),
                      L(s.callback_enter, e, t, i),
                      a || ae(e, s, i));
                  })(e.target, e, t, s)
                : ((e, t, s, i) => {
                    T(e) ||
                      (_(e, s.class_exited),
                      ((e, t, s, i) => {
                        s.cancel_on_exit &&
                          ((e) => y(e) === p)(e) &&
                          "IMG" === e.tagName &&
                          (te(e),
                          ((e) => {
                            ($(e, (e) => {
                              ne(e);
                            }),
                              ne(e));
                          })(e),
                          le(e),
                          M(e, s.class_loading),
                          k(i, -1),
                          E(e),
                          L(s.callback_cancel, e, t, i));
                      })(e, t, s, i),
                      L(s.callback_exit, e, t, i));
                  })(e.target, e, t, s),
            );
          },
          pe = (e) => Array.prototype.slice.call(e),
          me = (e) => e.container.querySelectorAll(e.elements_selector),
          he = (e) => ((e) => y(e) === f)(e),
          fe = (e, t) => ((e) => pe(e).filter(T))(e || me(t)),
          ge = function (t, s) {
            const i = a(t);
            ((this._settings = i),
              (this.loadingCount = 0),
              ((e, t) => {
                ce(e) ||
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
                      (((s = me(e)), pe(s).filter(he)).forEach((t) => {
                        (M(t, e.class_error), E(t));
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
              var a, n;
              (I(this, i.length),
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
                          I(s, 0));
                      })(i, s, this)
                    : ((n = i),
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
                me(this._settings).forEach((e) => {
                  H(e);
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
                (P(e, this), ae(e, t, this));
              });
            },
            restoreAll: function () {
              const e = this._settings;
              me(e).forEach((t) => {
                oe(t, e);
              });
            },
          }),
          (ge.load = (e, t) => {
            const s = a(t);
            ae(e, s);
          }),
          (ge.resetStatus = (e) => {
            E(e);
          }),
          e &&
            ((e, t) => {
              if (t)
                if (t.length) for (let s, i = 0; (s = t[i]); i += 1) n(e, s);
                else n(e, t);
            })(ge, window.lazyLoadOptions),
          ge
        );
      })();
    },
  };
  const t = {};
  function s(i) {
    const a = t[i];
    if (void 0 !== a) return a.exports;
    const n = (t[i] = { exports: {} });
    return (e[i].call(n.exports, n, n.exports, s), n.exports);
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
          a = window.matchMedia(i[0]),
          n = i[1],
          l = Array.prototype.filter.call(this.оbjects, function (e) {
            return e.breakpoint === n;
          });
        (a.addListener(function () {
          e.mediaHandler(a, l);
        }),
          this.mediaHandler(a, l));
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
    let i = (e, t = 500, s = 0) => {
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
      n = (e, t = 500) => (e.hidden ? a(e, t) : i(e, t)),
      l = !0,
      r = (e = 500) => {
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
      };
    function o(e) {
      setTimeout(() => {
        window.FLS && console.log(e);
      }, 0);
    }
    function d(e, t) {
      const s = Array.from(e).filter(function (e, s, i) {
        if (e.dataset[t]) return e.dataset[t].split(",")[0];
      });
      if (s.length) {
        const e = [];
        s.forEach((s) => {
          const i = {},
            a = s.dataset[t].split(",");
          ((i.value = a[0]),
            (i.type = a[1] ? a[1].trim() : "max"),
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
        const a = [];
        if (i.length)
          return (
            i.forEach((t) => {
              const s = t.split(","),
                i = s[1],
                n = s[2],
                l = window.matchMedia(s[0]),
                r = e.filter(function (e) {
                  if (e.value === i && e.type === n) return !0;
                });
              a.push({ itemsArray: r, matchMedia: l });
            }),
            a
          );
      }
    }
    let c = (e, t = !1, s = 500, i = 0) => {
      const a = document.querySelector(e);
      if (a) {
        let n = "",
          l = 0;
        t &&
          ((n = "header.header"), (l = document.querySelector(n).offsetHeight));
        let d = {
          speedAsDuration: !0,
          speed: s,
          header: n,
          offset: i,
          easing: "easeOutQuad",
        };
        if (
          (document.documentElement.classList.contains("menu-open") &&
            (r(), document.documentElement.classList.remove("menu-open")),
          "undefined" != typeof SmoothScroll)
        )
          new SmoothScroll().animateScroll(a, "", d);
        else {
          let e = a.getBoundingClientRect().top + scrollY;
          window.scrollTo({ top: l ? e - l : e, behavior: "smooth" });
        }
        o(`[gotoBlock]: Юхуу...едем к ${e}`);
      } else o(`[gotoBlock]: Ой ой..Такого блока нет на странице: ${e}`);
    };
    class u {
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
            a = this.getSelectElement(i).originalSelect;
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
                this.optionAction(i, a, s);
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
                this.optionAction(i, a, e);
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
          n(s, t.dataset.speed));
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
          let a = "";
          return (
            ((this.getSelectPlaceholder(e) &&
              !this.getSelectPlaceholder(e).show) ||
              e.multiple) &&
              (i = i.filter((e) => e.value)),
            (a += t
              ? `<div ${t} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
              : ""),
            i.forEach((t) => {
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
          i =
            e.selected && !t.hasAttribute("data-show-selected") ? "hidden" : "",
          a = e.dataset.class ? ` ${e.dataset.class}` : "",
          n = !!e.dataset.href && e.dataset.href,
          l = e.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
        let r = "";
        return (
          (r += n
            ? `<a ${l} ${i} href="${n}" data-value="${e.value}" class="${this.selectClasses.classSelectOption}${a}${s}">`
            : `<button ${i} class="${this.selectClasses.classSelectOption}${a}${s}" data-value="${e.value}" type="button">`),
          (r += this.getSelectElementContent(e)),
          (r += n ? "</a>" : "</button>"),
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
          (e.hasAttribute("data-validate") && g.validateInput(e),
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
          a = this;
        t.addEventListener("input", function () {
          (i.forEach((e) => {
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
        this.config.logging && o(`[select]: ${e}`);
      }
    }
    const p = { inputMaskModule: null, selectModule: null };
    let m,
      h,
      f,
      g = {
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
                  g.removeError(s),
                  (s.value = s.dataset.placeholder));
              }
              let s = e.querySelectorAll(".checkbox__input");
              if (s.length > 0)
                for (let e = 0; e < s.length; e++) {
                  s[e].checked = !1;
                }
              if (p.selectModule) {
                let t = e.querySelectorAll(".select");
                if (t.length)
                  for (let e = 0; e < t.length; e++) {
                    const s = t[e].querySelector("select");
                    p.selectModule.selectBuild(s);
                  }
              }
            }, 0));
        },
        emailTest: (e) =>
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(e.value),
      };
    function v(e, t = 0) {
      return setTimeout(e, t);
    }
    function b() {
      return Date.now();
    }
    function w(e, t = "x") {
      const s = (function (e) {
          return window.getComputedStyle(e, null);
        })(e),
        i = s.transform || s.webkitTransform;
      if (!i || "none" === i) return 0;
      const a = new DOMMatrixReadOnly(i);
      return "x" === t ? a.m41 : a.m42;
    }
    function y(e) {
      return (
        "object" == typeof e &&
        null !== e &&
        !!e.constructor &&
        "Object" === Object.prototype.toString.call(e).slice(8, -1)
      );
    }
    function S(e) {
      return (
        ("undefined" != typeof HTMLElement && e instanceof HTMLElement) ||
        (!!e && "object" == typeof e && (1 === e.nodeType || 11 === e.nodeType))
      );
    }
    function E(e, ...t) {
      const s = Object(e);
      for (let e = 0; e < t.length; e += 1) {
        const i = t[e];
        if (null == i || S(i)) continue;
        const a = i,
          n = Object.keys(Object(a));
        for (let e = 0, t = n.length; e < t; e += 1) {
          const t = n[e];
          if ("__proto__" === t || "constructor" === t || "prototype" === t)
            continue;
          const i = Object.getOwnPropertyDescriptor(a, t);
          if (!i || !i.enumerable) continue;
          const l = a[t];
          y(s[t]) && y(l)
            ? l.__swiper__
              ? (s[t] = l)
              : E(s[t], l)
            : !y(s[t]) && y(l)
              ? ((s[t] = {}), l.__swiper__ ? (s[t] = l) : E(s[t], l))
              : (s[t] = l);
        }
      }
      return s;
    }
    function T(e, t, s) {
      e.style.setProperty(t, s);
    }
    function x(e) {
      const t = e.querySelector(".swiper-slide-transform");
      if (t) return t;
      if (e.shadowRoot) {
        const t = e.shadowRoot.querySelector(".swiper-slide-transform");
        if (t) return t;
      }
      return e;
    }
    function C(e, t = "") {
      const s = [...e.children];
      return (
        e instanceof HTMLSlotElement && s.push(...e.assignedElements()),
        t ? s.filter((e) => e.matches(t)) : s
      );
    }
    function L(e) {
      try {
        console.warn(e);
      } catch {}
    }
    function _(e, t = []) {
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
    function M(e, t) {
      return window.getComputedStyle(e, null).getPropertyValue(t);
    }
    function A(e) {
      if (e && e.parentNode) return [...e.parentNode.children].indexOf(e);
    }
    function P(e, t) {
      const s = [];
      let i = e.parentElement;
      for (; i;) ((t && !i.matches(t)) || s.push(i), (i = i.parentElement));
      return s;
    }
    function k(e, t, s) {
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
    function I(e) {
      return (Array.isArray(e) ? e : [e]).filter((e) => !!e);
    }
    function O(e, t = "") {
      const s = globalThis.trustedTypes;
      e.innerHTML =
        void 0 !== s
          ? s.createPolicy("html", { createHTML: (e) => e }).createHTML(t)
          : t;
    }
    function $() {
      return (
        m ||
          (m =
            "undefined" == typeof window
              ? { touch: !1 }
              : {
                  touch:
                    "ontouchstart" in window || navigator.maxTouchPoints > 0,
                }),
        m
      );
    }
    function z(e = {}) {
      return (
        h ||
          (h = (function ({ userAgent: e } = {}) {
            if ("undefined" == typeof window) return { ios: !1, android: !1 };
            const t = $(),
              s = navigator.platform,
              i = e || navigator.userAgent,
              a = { ios: !1, android: !1 },
              n = /(Android);?[\s/]+([\d.]+)?/.test(i),
              l = /(iPhone\sOS|iOS|iPod)/.test(i),
              r = /iPad/.test(i),
              o = "MacIntel" === s && t.touch && navigator.maxTouchPoints > 1,
              d = r || o;
            return (
              n && !("Win32" === s) && ((a.os = "android"), (a.android = !0)),
              (d || l) && ((a.os = "ios"), (a.ios = !0)),
              a
            );
          })(e)),
        h
      );
    }
    function D() {
      return (
        f ||
          (f = (function () {
            if ("undefined" == typeof window)
              return { isSafari: !1, isWebView: !1, need3dFix: !1 };
            const e = z(),
              t = navigator.userAgent,
              s = t.toLowerCase(),
              i =
                s.includes("safari") &&
                !s.includes("chrome") &&
                !s.includes("android"),
              a = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t);
            return { isSafari: i, isWebView: a, need3dFix: i || (a && e.ios) };
          })()),
        f
      );
    }
    const B = (e, t) => {
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
      V = (e) => {
        if (!e || e.destroyed || !e.params || !e.params.lazyPreload) return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0) return;
        t = Math.min(t, s);
        const i =
            "auto" === e.params.slidesPerView
              ? e.slidesPerViewDynamic()
              : Math.ceil(e.params.slidesPerView),
          a = e.activeIndex;
        if (e.params.grid && (e.params.grid.rows ?? 1) > 1) {
          const s = a,
            n = [s - t];
          return (
            n.push(...Array.from({ length: t }).map((e, t) => s + i + t)),
            void e.slides.forEach((t, s) => {
              void 0 !== t.column && n.includes(t.column) && G(e, s);
            })
          );
        }
        const n = a + i - 1;
        if (e.params.rewind || e.params.loop)
          for (let i = a - t; i <= n + t; i += 1) {
            const t = ((i % s) + s) % s;
            (t < a || t > n) && G(e, t);
          }
        else
          for (let i = Math.max(a - t, 0); i <= Math.min(n + t, s - 1); i += 1)
            i !== a && (i > n || i < a) && G(e, i);
      };
    const q = (e, t) => !!(e.grid && t.grid && t.grid.rows > 1);
    var N = {
      setBreakpoint: function () {
        const e = this,
          { realIndex: t, initialized: s, params: i, el: a } = e,
          n = i.breakpoints;
        if (!n || (n && 0 === Object.keys(n).length)) return;
        const l =
            "window" !== i.breakpointsBase && i.breakpointsBase
              ? "container"
              : i.breakpointsBase,
          r =
            ["window", "container"].includes(i.breakpointsBase) ||
            !i.breakpointsBase
              ? e.el
              : document.querySelector(i.breakpointsBase),
          o = e.getBreakpoint(n, l, r);
        if (!o || e.currentBreakpoint === o) return;
        const d = (o in n ? n[o] : void 0) || e.originalParams,
          c = q(e, i),
          u = q(e, d),
          p = e.params.grabCursor,
          m = d.grabCursor,
          h = i.enabled;
        (c && !u
          ? (a.classList.remove(
              `${i.containerModifierClass}grid`,
              `${i.containerModifierClass}grid-column`,
            ),
            e.emitContainerClasses())
          : !c &&
            u &&
            (a.classList.add(`${i.containerModifierClass}grid`),
            ((d.grid.fill && "column" === d.grid.fill) ||
              (!d.grid.fill && "column" === i.grid.fill)) &&
              a.classList.add(`${i.containerModifierClass}grid-column`),
            e.emitContainerClasses()),
          p && !m ? e.unsetGrabCursor() : !p && m && e.setGrabCursor());
        const f = (e, t) => e[t];
        ["navigation", "pagination", "scrollbar"].forEach((t) => {
          const s = f(d, t);
          if (void 0 === s) return;
          const a = f(i, t),
            n = "object" == typeof a && null !== a && a.enabled,
            l = "object" == typeof s && null !== s && s.enabled,
            r = e[t];
          (n && !l && r?.disable?.(), !n && l && r?.enable?.());
        });
        const g = d.direction && d.direction !== i.direction,
          v = i.loop && (d.slidesPerView !== i.slidesPerView || g),
          b = i.loop;
        (g && s && e.changeDirection(), E(e.params, d));
        const w = e.params.enabled,
          y = e.params.loop;
        (Object.assign(e, {
          allowTouchMove: e.params.allowTouchMove,
          allowSlideNext: e.params.allowSlideNext,
          allowSlidePrev: e.params.allowSlidePrev,
        }),
          h && !w ? e.disable() : !h && w && e.enable(),
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
        const a = "window" === t ? window.innerHeight : s.clientHeight,
          n = Object.keys(e).map((e) => {
            if ("string" == typeof e && 0 === e.indexOf("@")) {
              const t = parseFloat(e.substr(1));
              return { value: a * t, point: e };
            }
            return { value: e, point: e };
          });
        n.sort(
          (e, t) =>
            parseInt(String(e.value), 10) - parseInt(String(t.value), 10),
        );
        for (let e = 0; e < n.length; e += 1) {
          const { point: a, value: l } = n[e];
          "window" === t
            ? window.matchMedia(`(min-width: ${l}px)`).matches && (i = a)
            : l <= s.clientWidth && (i = a);
        }
        return i || "max";
      },
    };
    var H = {
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
    var F = {
      addClasses: function () {
        const e = this,
          { classNames: t, params: s, rtl: i, el: a, device: n } = e,
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
              { android: n.android },
              { ios: n.ios },
              { "css-mode": s.cssMode },
              { centered: s.cssMode && s.centeredSlides },
              { "watch-progress": s.watchSlidesProgress },
            ],
            s.containerModifierClass,
          );
        (t.push(...l), a.classList.add(...t), e.emitContainerClasses());
      },
      removeClasses: function () {
        const { el: e, classNames: t } = this;
        e &&
          "string" != typeof e &&
          (e.classList.remove(...t), this.emitContainerClasses());
      },
    };
    const j = {
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
    var R = {
      on(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        const a = s ? "unshift" : "push";
        return (
          e.split(" ").forEach((e) => {
            (i.eventsListeners[e] || (i.eventsListeners[e] = []),
              i.eventsListeners[e][a](t));
          }),
          i
        );
      },
      once(e, t, s) {
        const i = this;
        if (!i.eventsListeners || i.destroyed) return i;
        if ("function" != typeof t) return i;
        const a = function (...s) {
          (i.off(e, a),
            a.__emitterProxy && delete a.__emitterProxy,
            t.apply(i, s));
        };
        return ((a.__emitterProxy = t), i.on(e, a, s));
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
                    s.eventsListeners[e].forEach((i, a) => {
                      (i === t ||
                        (i.__emitterProxy && i.__emitterProxy === t)) &&
                        s.eventsListeners[e].splice(a, 1);
                    });
              }),
              s)
            : s;
      },
      emit(...e) {
        const t = this;
        if (!t.eventsListeners || t.destroyed) return t;
        if (!t.eventsListeners) return t;
        let s, i, a;
        if ("string" == typeof e[0] || Array.isArray(e[0]))
          ((s = e[0]), (i = e.slice(1, e.length)), (a = t));
        else {
          const n = e[0];
          ((s = n.events), (i = n.data ?? []), (a = n.context || t));
        }
        i.unshift(a);
        return (
          (Array.isArray(s) ? s : s.split(" ")).forEach((e) => {
            (t.eventsAnyListeners &&
              t.eventsAnyListeners.length &&
              t.eventsAnyListeners.forEach((t) => {
                t.apply(a, [e, ...i]);
              }),
              t.eventsListeners &&
                t.eventsListeners[e] &&
                t.eventsListeners[e].forEach((e) => {
                  e.apply(a, i);
                }));
          }),
          t
        );
      },
    };
    function W(e) {
      const t = this;
      t.destroyed ||
        (t.enabled &&
          (t.allowClick ||
            (t.params.preventClicks && e.preventDefault(),
            t.params.preventClicksPropagation &&
              t.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation()))));
    }
    function X() {
      const e = this;
      e.destroyed ||
        e.documentTouchHandlerProceeded ||
        ((e.documentTouchHandlerProceeded = !0),
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"));
    }
    function Y(e) {
      const t = this;
      t.destroyed ||
        (B(t, e.target),
        t.params.cssMode ||
          ("auto" !== t.params.slidesPerView && !t.params.autoHeight) ||
          t.update());
    }
    function U() {
      const e = this,
        { params: t, el: s } = e;
      if (s && 0 === s.offsetWidth) return;
      t.breakpoints && e.setBreakpoint();
      const { allowSlideNext: i, allowSlidePrev: a, snapGrid: n } = e,
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
      ((e.allowSlidePrev = a),
        (e.allowSlideNext = i),
        e.params.watchOverflow && n !== e.snapGrid && e.checkOverflow());
    }
    function Q() {
      const e = this;
      if (e.destroyed) return;
      const { wrapperEl: t, rtlTranslate: s, enabled: i } = e;
      if (!i) return;
      let a;
      ((e.previousTranslate = e.translate),
        e.isHorizontal()
          ? (e.translate = -t.scrollLeft)
          : (e.translate = -t.scrollTop),
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses());
      const n = e.maxTranslate() - e.minTranslate();
      ((a = 0 === n ? 0 : (e.translate - e.minTranslate()) / n),
        a !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1));
    }
    function Z(e) {
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
        params: a,
        touches: n,
        rtlTranslate: l,
        slidesGrid: r,
        enabled: o,
      } = t;
      if (!o) return;
      if (!a.simulateTouch && "mouse" === i.pointerType) return;
      if (
        (s.allowTouchCallbacks && t.emit("touchEnd", i),
        (s.allowTouchCallbacks = !1),
        !s.isTouched)
      )
        return (
          s.isMoved && a.grabCursor && t.setGrabCursor(!1),
          (s.isMoved = !1),
          void (s.startMoving = !1)
        );
      a.grabCursor &&
        s.isMoved &&
        s.isTouched &&
        (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
        t.setGrabCursor(!1);
      const d = b(),
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
        ((s.lastClickTime = b()),
        v(() => {
          t.destroyed || (t.allowClick = !0);
        }),
        !s.isTouched ||
          !s.isMoved ||
          !t.swipeDirection ||
          (0 === n.diff && !s.loopSwapReset) ||
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
        (u = a.followFinger
          ? l
            ? t.translate
            : -t.translate
          : -(s.currentTranslate ?? 0)),
        a.cssMode)
      )
        return;
      if (a.freeMode && a.freeMode.enabled)
        return void t.freeMode.onTouchEnd({ currentPos: u });
      const p = u >= -t.maxTranslate() && !t.params.loop;
      let m = 0,
        h = t.slidesSizesGrid[0];
      for (
        let e = 0;
        e < r.length;
        e += e < a.slidesPerGroupSkip ? 1 : a.slidesPerGroup
      ) {
        const t = e < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
        void 0 !== r[e + t]
          ? (p || (u >= r[e] && u < r[e + t])) &&
            ((m = e), (h = r[e + t] - r[e]))
          : (p || u >= r[e]) &&
            ((m = e), (h = r[r.length - 1] - r[r.length - 2]));
      }
      let f = null,
        g = null;
      a.rewind &&
        (t.isBeginning
          ? (g =
              a.virtual?.enabled && t.virtual
                ? t.virtual.slides.length - 1
                : t.slides.length - 1)
          : t.isEnd && (f = 0));
      const w = (u - r[m]) / h,
        y = m < a.slidesPerGroupSkip - 1 ? 1 : a.slidesPerGroup;
      if (c > a.longSwipesMs) {
        if (!a.longSwipes) return void t.slideTo(t.activeIndex);
        ("next" === t.swipeDirection &&
          (w >= a.longSwipesRatio
            ? t.slideTo(a.rewind && t.isEnd ? f : m + y)
            : t.slideTo(m)),
          "prev" === t.swipeDirection &&
            (w > 1 - a.longSwipesRatio
              ? t.slideTo(m + y)
              : null !== g && w < 0 && Math.abs(w) > a.longSwipesRatio
                ? t.slideTo(g)
                : t.slideTo(m)));
      } else {
        if (!a.shortSwipes) return void t.slideTo(t.activeIndex);
        t.navigation &&
        (i.target === t.navigation.nextEl || i.target === t.navigation.prevEl)
          ? i.target === t.navigation.nextEl
            ? t.slideTo(m + y)
            : t.slideTo(m)
          : ("next" === t.swipeDirection && t.slideTo(null !== f ? f : m + y),
            "prev" === t.swipeDirection && t.slideTo(null !== g ? g : m));
      }
    }
    function J(e) {
      const t = this;
      if (t.destroyed) return;
      const s = t.touchEventsData,
        { params: i, touches: a, rtlTranslate: n, enabled: l } = t;
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
        u = d.pageY;
      if (o.preventedByNestedSwiper)
        return ((a.startX = c), void (a.startY = u));
      if (!t.allowTouchMove)
        return (
          o.target.matches(s.focusableElements) || (t.allowClick = !1),
          void (
            s.isTouched &&
            (Object.assign(a, {
              startX: c,
              startY: u,
              currentX: c,
              currentY: u,
            }),
            (s.touchStartTime = b()))
          )
        );
      if (i.touchReleaseOnEdges && !i.loop)
        if (t.isVertical()) {
          if (
            (u < a.startY && t.translate <= t.maxTranslate()) ||
            (u > a.startY && t.translate >= t.minTranslate())
          )
            return ((s.isTouched = !1), void (s.isMoved = !1));
        } else {
          if (
            n &&
            ((c > a.startX && -t.translate <= t.maxTranslate()) ||
              (c < a.startX && -t.translate >= t.minTranslate()))
          )
            return;
          if (
            !n &&
            ((c < a.startX && t.translate <= t.maxTranslate()) ||
              (c > a.startX && t.translate >= t.minTranslate()))
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
        (a.previousX = a.currentX),
        (a.previousY = a.currentY),
        (a.currentX = c),
        (a.currentY = u));
      const p = a.currentX - a.startX,
        m = a.currentY - a.startY;
      if (t.params.threshold && Math.sqrt(p ** 2 + m ** 2) < t.params.threshold)
        return;
      if (void 0 === s.isScrolling) {
        let e;
        (t.isHorizontal() && a.currentY === a.startY) ||
        (t.isVertical() && a.currentX === a.startX)
          ? (s.isScrolling = !1)
          : p * p + m * m >= 25 &&
            ((e = (180 * Math.atan2(Math.abs(m), Math.abs(p))) / Math.PI),
            (s.isScrolling = t.isHorizontal()
              ? e > i.touchAngle
              : 90 - e > i.touchAngle));
      }
      if (
        (s.isScrolling && t.emit("touchMoveOpposite", o),
        void 0 === s.startMoving &&
          ((a.currentX === a.startX && a.currentY === a.startY) ||
            (s.startMoving = !0)),
        s.isScrolling ||
          ("touchmove" === o.type && s.preventTouchMoveFromPointerMove))
      )
        return void (s.isTouched = !1);
      if (!s.startMoving) return;
      ((t.allowClick = !1),
        !i.cssMode && o.cancelable && o.preventDefault(),
        i.touchMoveStopPropagation && !i.nested && o.stopPropagation());
      let h = t.isHorizontal() ? p : m,
        f = t.isHorizontal()
          ? a.currentX - a.previousX
          : a.currentY - a.previousY;
      (i.oneWayMovement &&
        ((h = Math.abs(h) * (n ? 1 : -1)), (f = Math.abs(f) * (n ? 1 : -1))),
        (a.diff = h),
        (h *= i.touchRatio),
        n && ((h = -h), (f = -f)));
      const g = t.touchesDirection;
      ((t.swipeDirection = h > 0 ? "prev" : "next"),
        (t.touchesDirection = f > 0 ? "prev" : "next"));
      const v = t.params.loop && !i.cssMode,
        w =
          ("next" === t.touchesDirection && t.allowSlideNext) ||
          ("prev" === t.touchesDirection && t.allowSlidePrev);
      if (!s.isMoved) {
        if (
          (v && w && t.loopFix({ direction: t.swipeDirection }),
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
          w &&
          Math.abs(h) >= 1)
      )
        return (
          Object.assign(a, {
            startX: c,
            startY: u,
            currentX: c,
            currentY: u,
            startTranslate: s.currentTranslate,
          }),
          (s.loopSwapReset = !0),
          void (s.startTranslate = s.currentTranslate)
        );
      (t.emit("sliderMove", o), (s.isMoved = !0));
      const y = s.startTranslate ?? 0;
      s.currentTranslate = h + y;
      let S = !0,
        E = i.resistanceRatio;
      if (
        (i.touchReleaseOnEdges && (E = 0),
        h > 0
          ? (v &&
              w &&
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
              ((S = !1),
              i.resistance &&
                (s.currentTranslate =
                  t.minTranslate() - 1 + (-t.minTranslate() + y + h) ** E)))
          : h < 0 &&
            (v &&
              w &&
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
              ((S = !1),
              i.resistance &&
                (s.currentTranslate =
                  t.maxTranslate() + 1 - (t.maxTranslate() - y - h) ** E))),
        S && (o.preventedByNestedSwiper = !0),
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
        if (!(Math.abs(h) > i.threshold || s.allowThresholdMove))
          return void (s.currentTranslate = s.startTranslate);
        if (!s.allowThresholdMove)
          return (
            (s.allowThresholdMove = !0),
            (a.startX = a.currentX),
            (a.startY = a.currentY),
            (s.currentTranslate = s.startTranslate),
            void (a.diff = t.isHorizontal()
              ? a.currentX - a.startX
              : a.currentY - a.startY)
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
    function K(e, t, s) {
      const { params: i } = e,
        a = i.edgeSwipeDetection,
        n = i.edgeSwipeThreshold;
      return (
        !a ||
        !(s <= n || s >= window.innerWidth - n) ||
        ("prevent" === a && (t.preventDefault(), !0))
      );
    }
    function ee(e) {
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
        return void K(t, s, s.targetTouches[0].pageX);
      const { params: a, touches: n, enabled: l } = t;
      if (!l) return;
      if (!a.simulateTouch && "mouse" === s.pointerType) return;
      if (t.animating && a.preventInteractionOnTransition) return;
      !t.animating && a.cssMode && a.loop && t.loopFix();
      let r = s.target;
      if (
        "wrapper" === a.touchEventsTarget &&
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
      const d = !!a.noSwipingClass && "" !== a.noSwipingClass,
        c = s.composedPath ? s.composedPath() : s.path;
      d && s.target && s.target.shadowRoot && c && (r = c[0]);
      const u = a.noSwipingSelector
          ? a.noSwipingSelector
          : `.${a.noSwipingClass}`,
        p = !(!s.target || !s.target.shadowRoot);
      if (
        a.noSwiping &&
        (p
          ? ((m = u),
            (function e(t) {
              if (!t || t === document || t === window) return null;
              let s = t;
              s.assignedSlot && (s = s.assignedSlot);
              const i = s.closest(m);
              if (!i && !s.getRootNode) return null;
              const a = s.getRootNode();
              return i || e(a.host);
            })(r))
          : r.closest(u))
      )
        return void (t.allowClick = !0);
      var m;
      if (
        a.swipeHandler &&
        "string" == typeof a.swipeHandler &&
        !r.closest(a.swipeHandler)
      )
        return;
      const h = s;
      ((n.currentX = h.pageX), (n.currentY = h.pageY));
      const f = n.currentX,
        g = n.currentY;
      if (!K(t, s, f)) return;
      (Object.assign(i, {
        isTouched: !0,
        isMoved: !1,
        allowTouchCallbacks: !0,
        isScrolling: void 0,
        startMoving: void 0,
      }),
        (n.startX = f),
        (n.startY = g),
        (i.touchStartTime = b()),
        (t.allowClick = !0),
        t.updateSize(),
        (t.swipeDirection = void 0),
        a.threshold > 0 && (i.allowThresholdMove = !1));
      let v = !0;
      (r.matches(i.focusableElements) &&
        ((v = !1), "SELECT" === r.nodeName && (i.isTouched = !1)),
        document.activeElement &&
          document.activeElement.matches(i.focusableElements) &&
          document.activeElement !== r &&
          ("mouse" === h.pointerType ||
            ("mouse" !== h.pointerType && !r.matches(i.focusableElements))) &&
          document.activeElement.blur());
      const w = v && t.allowTouchMove && a.touchStartPreventDefault;
      ((!a.touchStartForcePreventDefault && !w) ||
        r.isContentEditable ||
        s.preventDefault(),
        a.freeMode &&
          a.freeMode.enabled &&
          t.freeMode &&
          t.animating &&
          !a.cssMode &&
          t.freeMode.onTouchStart(),
        t.emit("touchStart", s));
    }
    const te = (e, t) => {
      const { params: s, el: i, wrapperEl: a, device: n } = e,
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
        s.cssMode && a[r]("scroll", e.onScroll));
      const d = (t) => {
        e[o](t, U, !0);
      };
      (s.updateOnWindowResize
        ? d(
            n.ios || n.android
              ? "resize orientationchange observerUpdate"
              : "resize observerUpdate",
          )
        : d("observerUpdate"),
        s.lazyPreload && i[r]("load", e.onLoad, { capture: !0 }));
    };
    var se = {
      loopCreate: function (e, t) {
        const s = this,
          { params: i, slidesEl: a } = s;
        if (!i.loop || (s.virtual && s.params.virtual?.enabled)) return;
        const n = () => {
            C(a, `.${i.slideClass}, swiper-slide`).forEach((e, t) => {
              e.setAttribute("data-swiper-slide-index", String(t));
            });
          },
          l = s.grid && i.grid && i.grid.rows > 1;
        i.loopAddBlankSlides &&
          (i.slidesPerGroup > 1 || l) &&
          (() => {
            const e = C(a, `.${i.slideBlankClass}`);
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
                ? _("swiper-slide", [i.slideBlankClass])
                : _("div", [i.slideClass, i.slideBlankClass]);
              s.slidesEl.append(e);
            }
          };
        if (o) {
          if (i.loopAddBlankSlides) {
            (c(r - (s.slides.length % r)), s.recalcSlides(), s.updateSlides());
          } else
            L(
              "Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          n();
        } else if (d) {
          if (i.loopAddBlankSlides) {
            (c(i.grid.rows - (s.slides.length % i.grid.rows)),
              s.recalcSlides(),
              s.updateSlides());
          } else
            L(
              "Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)",
            );
          n();
        } else n();
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
          setTranslate: a,
          activeSlideIndex: n,
          initial: l,
          byController: r,
          byMousewheel: o,
        } = e;
        let d = n;
        const c = this;
        if (!c.params.loop) return;
        (c.emit("beforeLoopFix"), (c.__loopFixInProgress__ = !0));
        const {
            slides: u,
            allowSlidePrev: p,
            allowSlideNext: m,
            slidesEl: h,
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
            (c.allowSlidePrev = p),
            (c.allowSlideNext = m),
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
        let M = y
          ? Math.max(E, (g ? Math.ceil(S / 2) : 0) + Math.ceil(Math.max(C, _)))
          : E;
        (M % E !== 0 && (M += E - (M % E)),
          (M += f.loopAdditionalSlides),
          (c.loopedSlides = M));
        const A = c.grid && f.grid && f.grid.rows > 1;
        u.length < S + M ||
        ("cards" === c.params.effect && u.length < S + 2 * M)
          ? L(
              "Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters",
            )
          : A &&
            "row" === f.grid.fill &&
            L(
              "Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`",
            );
        const P = [],
          k = [],
          I = A ? Math.ceil(u.length / f.grid.rows) : u.length,
          O = l && I - w < S && !y;
        let $ = O ? w : c.activeIndex;
        void 0 === d
          ? (d = c.getSlideIndex(
              u.find((e) => e.classList.contains(f.slideActiveClass)),
            ))
          : ($ = d);
        const z = "next" === i || !i,
          D = "prev" === i || !i;
        let B = 0,
          G = 0;
        const V =
          (A ? (u[d].column ?? 0) : d) +
          (y && void 0 === a ? (g ? -S / 2 + 0.5 : 0) - C : 0);
        if (V < M) {
          B = Math.max(M - V, E);
          for (let e = 0; e < M - V; e += 1) {
            const t = e - Math.floor(e / I) * I;
            if (A) {
              const e = I - t - 1;
              for (let t = u.length - 1; t >= 0; t -= 1)
                u[t].column === e && P.push(t);
            } else P.push(I - t - 1);
          }
        } else if (V + S > I - M) {
          ((G = Math.max(V - (I - 2 * M), E)),
            O && (G = Math.max(G, S - I + w + 1)));
          for (let e = 0; e < G; e += 1) {
            const t = e - Math.floor(e / I) * I;
            A
              ? u.forEach((e, s) => {
                  e.column === t && k.push(s);
                })
              : k.push(t);
          }
        }
        if (
          ((c.__preventObserver__ = !0),
          requestAnimationFrame(() => {
            c.__preventObserver__ = !1;
          }),
          "cards" === c.params.effect &&
            u.length < S + 2 * M &&
            (k.includes(d) && k.splice(k.indexOf(d), 1),
            P.includes(d) && P.splice(P.indexOf(d), 1)),
          D &&
            P.forEach((e) => {
              const t = u[e];
              ((t.swiperLoopMoveDOM = !0),
                h.prepend(t),
                (t.swiperLoopMoveDOM = !1));
            }),
          z &&
            k.forEach((e) => {
              const t = u[e];
              ((t.swiperLoopMoveDOM = !0),
                h.append(t),
                (t.swiperLoopMoveDOM = !1));
            }),
          c.recalcSlides(),
          "auto" === f.slidesPerView
            ? c.updateSlides()
            : A &&
              ((P.length > 0 && D) || (k.length > 0 && z)) &&
              c.slides.forEach((e, t) => {
                c.grid.updateSlide(t, e, c.slides);
              }),
          f.watchSlidesProgress && c.updateSlidesOffset(),
          s)
        )
          if (P.length > 0 && D) {
            if (void 0 === t) {
              const e = c.slidesGrid[$],
                t = c.slidesGrid[$ + B] - e;
              o
                ? c.setTranslate(c.translate - t)
                : (c.slideTo($ + Math.ceil(B), 0, !1, !0),
                  a &&
                    ((c.touchEventsData.startTranslate =
                      c.touchEventsData.startTranslate - t),
                    (c.touchEventsData.currentTranslate =
                      c.touchEventsData.currentTranslate - t)));
            } else if (a) {
              const e = A ? P.length / f.grid.rows : P.length;
              (c.slideTo(c.activeIndex + e, 0, !1, !0),
                (c.touchEventsData.currentTranslate = c.translate));
            }
          } else if (k.length > 0 && z)
            if (void 0 === t) {
              const e = c.slidesGrid[$],
                t = c.slidesGrid[$ - G] - e;
              o
                ? c.setTranslate(c.translate - t)
                : (c.slideTo($ - G, 0, !1, !0),
                  a &&
                    ((c.touchEventsData.startTranslate =
                      c.touchEventsData.startTranslate - t),
                    (c.touchEventsData.currentTranslate =
                      c.touchEventsData.currentTranslate - t)));
            } else {
              const e = A ? k.length / f.grid.rows : k.length;
              c.slideTo(c.activeIndex - e, 0, !1, !0);
            }
        ((c.allowSlidePrev = p), (c.allowSlideNext = m));
        const q = c.controller?.control;
        if (q && !r) {
          const e = {
            slideRealIndex: t,
            direction: i,
            setTranslate: a,
            activeSlideIndex: d,
            byController: !0,
          };
          Array.isArray(q)
            ? q.forEach((t) => {
                !t.destroyed &&
                  t.params.loop &&
                  t.loopFix({
                    ...e,
                    slideTo: t.params.slidesPerView === f.slidesPerView && s,
                  });
              })
            : q instanceof c.constructor &&
              q.params.loop &&
              q.loopFix({
                ...e,
                slideTo: q.params.slidesPerView === f.slidesPerView && s,
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
    function ie(e, t) {
      return function (s = {}) {
        const i = Object.keys(s)[0],
          a = s[i];
        "object" == typeof a && null !== a
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
            i in e && "enabled" in a
              ? ("object" != typeof e[i] ||
                  "enabled" in e[i] ||
                  (e[i].enabled = !0),
                e[i] || (e[i] = { enabled: !1 }),
                E(t, s))
              : E(t, s))
          : E(t, s);
      };
    }
    var ae = {
      slideTo: function (e = 0, t, s = !0, i, a) {
        "string" == typeof e && (e = parseInt(e, 10));
        const n = this;
        let l = e;
        l < 0 && (l = 0);
        const {
          params: r,
          snapGrid: o,
          slidesGrid: d,
          previousIndex: c,
          activeIndex: u,
          rtlTranslate: p,
          wrapperEl: m,
          enabled: h,
        } = n;
        if (
          (!h && !i && !a) ||
          n.destroyed ||
          (n.animating && r.preventInteractionOnTransition)
        )
          return !1;
        void 0 === t && (t = n.params.speed);
        const f = Math.min(n.params.slidesPerGroupSkip, l);
        let g = f + Math.floor((l - f) / n.params.slidesPerGroup);
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
        if (n.initialized && l !== u) {
          if (
            !n.allowSlideNext &&
            (p
              ? v > n.translate && v > n.minTranslate()
              : v < n.translate && v < n.minTranslate())
          )
            return !1;
          if (
            !n.allowSlidePrev &&
            v > n.translate &&
            v > n.maxTranslate() &&
            (u || 0) !== l
          )
            return !1;
        }
        let b;
        (l !== (c || 0) && s && n.emit("beforeSlideChangeStart"),
          n.updateProgress(v),
          (b = l > u ? "next" : l < u ? "prev" : "reset"));
        const w = n.virtual && n.params.virtual?.enabled;
        if (
          !(w && a) &&
          ((p && -v === n.translate) || (!p && v === n.translate))
        )
          return (
            n.updateActiveIndex(l),
            r.autoHeight && n.updateAutoHeight(),
            n.updateSlidesClasses(),
            "slide" !== r.effect && n.setTranslate(v),
            "reset" !== b && (n.transitionStart(s, b), n.transitionEnd(s, b)),
            !1
          );
        if (r.cssMode) {
          const e = n.isHorizontal(),
            s = p ? v : -v;
          return (
            0 === t
              ? (w &&
                  ((n.wrapperEl.style.scrollSnapType = "none"),
                  (n._immediateVirtual = !0)),
                w &&
                !n._cssModeVirtualInitialSet &&
                (n.params.initialSlide ?? 0) > 0
                  ? ((n._cssModeVirtualInitialSet = !0),
                    requestAnimationFrame(() => {
                      m[e ? "scrollLeft" : "scrollTop"] = s;
                    }))
                  : (m[e ? "scrollLeft" : "scrollTop"] = s),
                w &&
                  requestAnimationFrame(() => {
                    ((n.wrapperEl.style.scrollSnapType = ""),
                      (n._immediateVirtual = !1));
                  }))
              : m.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" }),
            !0
          );
        }
        const y = D().isSafari;
        return (
          w && !a && y && n.isElement && n.virtual.update(!1, !1, l),
          n.setTransition(t),
          n.setTranslate(v),
          n.updateActiveIndex(l),
          n.updateSlidesClasses(),
          n.emit("beforeTransitionStart", t, i),
          n.transitionStart(s, b),
          0 === t
            ? n.transitionEnd(s, b)
            : n.animating ||
              ((n.animating = !0),
              n.onSlideToWrapperTransitionEnd ||
                (n.onSlideToWrapperTransitionEnd = function (e) {
                  n &&
                    !n.destroyed &&
                    e.target === this &&
                    (n.wrapperEl.removeEventListener(
                      "transitionend",
                      n.onSlideToWrapperTransitionEnd,
                    ),
                    (n.onSlideToWrapperTransitionEnd = null),
                    delete n.onSlideToWrapperTransitionEnd,
                    n.transitionEnd(s, b));
                }),
              n.wrapperEl.addEventListener(
                "transitionend",
                n.onSlideToWrapperTransitionEnd,
              )),
          !0
        );
      },
      slideToLoop: function (e = 0, t, s = !0, i) {
        if ("string" == typeof e) {
          e = parseInt(e, 10);
        }
        const a = this;
        if (a.destroyed) return;
        void 0 === t && (t = a.params.speed);
        const n = a.grid && a.params.grid && a.params.grid.rows > 1;
        let l = e;
        if (a.params.loop)
          if (a.virtual && a.params.virtual?.enabled)
            l += a.virtual.slidesBefore ?? 0;
          else {
            let e;
            if (n) {
              const t = l * a.params.grid.rows,
                s = a.slides.find(
                  (e) =>
                    Number(e.getAttribute("data-swiper-slide-index")) === t,
                );
              e = s?.column ?? 0;
            } else e = a.getSlideIndexByData(l);
            const t = n
                ? Math.ceil(a.slides.length / a.params.grid.rows)
                : a.slides.length,
              {
                centeredSlides: s,
                slidesOffsetBefore: r,
                slidesOffsetAfter: o,
              } = a.params,
              d = s || !!r || !!o;
            let c;
            "auto" === a.params.slidesPerView
              ? (c = a.slidesPerViewDynamic())
              : ((c = Math.ceil(parseFloat(String(a.params.slidesPerView)))),
                d && c % 2 == 0 && (c += 1));
            let u = t - e < c;
            if (
              (d && (u = u || e < Math.ceil(c / 2)),
              i && d && "auto" !== a.params.slidesPerView && !n && (u = !1),
              u)
            ) {
              const s = d
                ? e < a.activeIndex
                  ? "prev"
                  : "next"
                : e - a.activeIndex - 1 < a.params.slidesPerView
                  ? "next"
                  : "prev";
              a.loopFix({
                direction: s,
                slideTo: !0,
                activeSlideIndex: "next" === s ? e + 1 : e - t + 1,
                slideRealIndex: "next" === s ? a.realIndex : void 0,
              });
            }
            if (n) {
              const e = l * a.params.grid.rows,
                t = a.slides.find(
                  (t) =>
                    Number(t.getAttribute("data-swiper-slide-index")) === e,
                );
              l = t?.column ?? 0;
            } else l = a.getSlideIndexByData(l);
          }
        return (
          requestAnimationFrame(() => {
            a.slideTo(l, t, s, i);
          }),
          a
        );
      },
      slideNext: function (e, t = !0, s) {
        const i = this,
          { enabled: a, params: n, animating: l } = i;
        if (!a || i.destroyed) return i;
        void 0 === e && (e = i.params.speed);
        let r = n.slidesPerGroup;
        "auto" === n.slidesPerView &&
          1 === n.slidesPerGroup &&
          n.slidesPerGroupAuto &&
          (r = Math.max(i.slidesPerViewDynamic("current", !0), 1));
        const o = i.activeIndex < n.slidesPerGroupSkip ? 1 : r,
          d = i.virtual && n.virtual?.enabled;
        if (n.loop) {
          if (l && !d && n.loopPreventsSliding) return !1;
          if (
            (i.loopFix({ direction: "next" }),
            (i._clientLeft = i.wrapperEl.clientLeft),
            i.activeIndex === i.slides.length - 1 && n.cssMode)
          )
            return (
              requestAnimationFrame(() => {
                i.slideTo(i.activeIndex + o, e, t, s);
              }),
              !0
            );
        }
        return n.rewind && i.isEnd
          ? i.slideTo(0, e, t, s)
          : i.slideTo(i.activeIndex + o, e, t, s);
      },
      slidePrev: function (e, t = !0, s) {
        const i = this,
          {
            params: a,
            snapGrid: n,
            slidesGrid: l,
            rtlTranslate: r,
            enabled: o,
            animating: d,
          } = i;
        if (!o || i.destroyed) return i;
        void 0 === e && (e = i.params.speed);
        const c = i.virtual && a.virtual?.enabled;
        if (a.loop) {
          if (d && !c && a.loopPreventsSliding) return !1;
          (i.loopFix({ direction: "prev" }),
            (i._clientLeft = i.wrapperEl.clientLeft));
        }
        function u(e) {
          return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
        }
        const p = u(r ? i.translate : -i.translate),
          m = n.map((e) => u(e)),
          h = a.freeMode && a.freeMode.enabled;
        let f = n[m.indexOf(p) - 1];
        if (void 0 === f && (a.cssMode || h)) {
          let e;
          (n.forEach((t, s) => {
            p >= t && (e = s);
          }),
            void 0 !== e && (f = h ? n[e] : n[e > 0 ? e - 1 : e]));
        }
        let g = 0;
        if (
          (void 0 !== f &&
            ((g = l.indexOf(f)),
            g < 0 && (g = i.activeIndex - 1),
            "auto" === a.slidesPerView &&
              1 === a.slidesPerGroup &&
              a.slidesPerGroupAuto &&
              ((g = g - i.slidesPerViewDynamic("previous", !0) + 1),
              (g = Math.max(g, 0)))),
          a.rewind && i.isBeginning)
        ) {
          const a =
            i.params.virtual?.enabled && i.virtual
              ? i.virtual.slides.length - 1
              : i.slides.length - 1;
          return i.slideTo(a, e, t, s);
        }
        return a.loop && 0 === i.activeIndex && a.cssMode
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
        const a = this;
        if (a.destroyed) return;
        void 0 === e && (e = a.params.speed);
        let n = a.activeIndex;
        const l = Math.min(a.params.slidesPerGroupSkip, n),
          r = l + Math.floor((n - l) / a.params.slidesPerGroup),
          o = a.rtlTranslate ? a.translate : -a.translate;
        if (o >= a.snapGrid[r]) {
          const e = a.snapGrid[r];
          o - e > (a.snapGrid[r + 1] - e) * i && (n += a.params.slidesPerGroup);
        } else {
          const e = a.snapGrid[r - 1];
          o - e <= (a.snapGrid[r] - e) * i && (n -= a.params.slidesPerGroup);
        }
        return (
          (n = Math.max(n, 0)),
          (n = Math.min(n, a.slidesGrid.length - 1)),
          a.slideTo(n, e, t, s)
        );
      },
      slideToClickedSlide: function () {
        const e = this;
        if (e.destroyed) return;
        const { params: t, slidesEl: s, clickedSlide: i, clickedIndex: a } = e;
        if (void 0 === i || void 0 === a) return;
        const n =
          "auto" === t.slidesPerView
            ? e.slidesPerViewDynamic()
            : t.slidesPerView;
        let l,
          r = e.getSlideIndexWhenGrid(a);
        const o = e.isElement ? "swiper-slide" : `.${t.slideClass}`,
          d = e.grid && e.params.grid && e.params.grid.rows > 1;
        if (t.loop) {
          if (e.animating) return;
          ((l = parseInt(i.getAttribute("data-swiper-slide-index"), 10)),
            t.centeredSlides
              ? e.slideToLoop(l)
              : r >
                  (d
                    ? (e.slides.length - n) / 2 - (e.params.grid.rows - 1)
                    : e.slides.length - n)
                ? (e.loopFix(),
                  (r = e.getSlideIndex(
                    C(s, `${o}[data-swiper-slide-index="${l}"]`)[0],
                  )),
                  v(() => {
                    e.slideTo(r);
                  }))
                : e.slideTo(r));
        } else e.slideTo(r);
      },
    };
    function ne({ swiper: e, runCallbacks: t, direction: s, step: i }) {
      const { activeIndex: a, previousIndex: n } = e;
      let l = s;
      (l || (l = a > n ? "next" : a < n ? "prev" : "reset"),
        e.emit(`transition${i}`),
        t && "reset" === l
          ? e.emit(`slideResetTransition${i}`)
          : t &&
            a !== n &&
            (e.emit(`slideChangeTransition${i}`),
            "next" === l
              ? e.emit(`slideNextTransition${i}`)
              : e.emit(`slidePrevTransition${i}`)));
    }
    var le = {
      getTranslate: function (e = this.isHorizontal() ? "x" : "y") {
        const { params: t, rtlTranslate: s, translate: i, wrapperEl: a } = this;
        if (t.virtualTranslate) return s ? -i : i;
        if (t.cssMode) return i;
        let n = w(a, e);
        return ((n += this.cssOverflowAdjustment()), s && (n = -n), n || 0);
      },
      setTranslate: function (e, t) {
        const s = this,
          { rtlTranslate: i, params: a, wrapperEl: n, progress: l } = s;
        let r,
          o = 0,
          d = 0;
        (s.isHorizontal() ? (o = i ? -e : e) : (d = e),
          a.roundLengths && ((o = Math.floor(o)), (d = Math.floor(d))),
          (s.previousTranslate = s.translate),
          (s.translate = s.isHorizontal() ? o : d),
          a.cssMode
            ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                s.isHorizontal() ? -o : -d)
            : a.virtualTranslate ||
              (s.isHorizontal()
                ? (o -= s.cssOverflowAdjustment())
                : (d -= s.cssOverflowAdjustment()),
              (n.style.transform = `translate3d(${o}px, ${d}px, 0px)`)));
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
      translateTo: function (e = 0, t = this.params.speed, s = !0, i = !0, a) {
        const n = this,
          { params: l, wrapperEl: r } = n;
        if (n.animating && l.preventInteractionOnTransition) return !1;
        const o = n.minTranslate(),
          d = n.maxTranslate();
        let c;
        if (
          ((c = i && e > o ? o : i && e < d ? d : e),
          n.updateProgress(c),
          l.cssMode)
        ) {
          const e = n.isHorizontal();
          return (
            0 === t
              ? (r[e ? "scrollLeft" : "scrollTop"] = -c)
              : r.scrollTo({ [e ? "left" : "top"]: -c, behavior: "smooth" }),
            !0
          );
        }
        return (
          0 === t
            ? (n.setTransition(0),
              n.setTranslate(c),
              s &&
                (n.emit("beforeTransitionStart", t, a),
                n.emit("transitionEnd")))
            : (n.setTransition(t),
              n.setTranslate(c),
              s &&
                (n.emit("beforeTransitionStart", t, a),
                n.emit("transitionStart")),
              n.animating ||
                ((n.animating = !0),
                n.onTranslateToWrapperTransitionEnd ||
                  (n.onTranslateToWrapperTransitionEnd = function (e) {
                    n &&
                      !n.destroyed &&
                      e.target === this &&
                      (n.wrapperEl.removeEventListener(
                        "transitionend",
                        n.onTranslateToWrapperTransitionEnd,
                      ),
                      (n.onTranslateToWrapperTransitionEnd = null),
                      delete n.onTranslateToWrapperTransitionEnd,
                      (n.animating = !1),
                      s && n.emit("transitionEnd"));
                  }),
                n.wrapperEl.addEventListener(
                  "transitionend",
                  n.onTranslateToWrapperTransitionEnd,
                ))),
          !0
        );
      },
    };
    const re = (e, t, s) => {
      t && !e.classList.contains(s)
        ? e.classList.add(s)
        : !t && e.classList.contains(s) && e.classList.remove(s);
    };
    const oe = (e, t, s) => {
      t && !e.classList.contains(s)
        ? e.classList.add(s)
        : !t && e.classList.contains(s) && e.classList.remove(s);
    };
    var de = {
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
              parseInt(M(i, "padding-left") || "0", 10) -
              parseInt(M(i, "padding-right") || "0", 10)),
            (s =
              s -
              parseInt(M(i, "padding-top") || "0", 10) -
              parseInt(M(i, "padding-bottom") || "0", 10)),
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
          { wrapperEl: i, slidesEl: a, rtlTranslate: n, wrongRTL: l } = e,
          r = !(!e.virtual || !s.virtual?.enabled),
          o = r ? e.virtual.slides.length : e.slides.length,
          d = C(a, `.${e.params.slideClass}, swiper-slide`),
          c = r ? e.virtual.slides.length : d.length;
        let u = [];
        const p = [],
          m = [],
          h = (t) => ("function" == typeof t ? t.call(e) : t),
          f = h(s.slidesOffsetBefore),
          g = h(s.slidesOffsetAfter),
          v = e.snapGrid.length,
          b = e.slidesGrid.length,
          w = e.size - f - g;
        let y = s.spaceBetween,
          S = -f,
          E = 0,
          x = 0;
        if (void 0 === w) return;
        ("string" == typeof y && y.indexOf("%") >= 0
          ? (y = (parseFloat(y.replace("%", "")) / 100) * w)
          : "string" == typeof y && (y = parseFloat(y)),
          (e.virtualSize = -y - f - g),
          d.forEach((e) => {
            (n ? (e.style.marginLeft = "") : (e.style.marginRight = ""),
              (e.style.marginBottom = ""),
              (e.style.marginTop = ""));
          }),
          s.centeredSlides &&
            s.cssMode &&
            (T(i, "--swiper-centered-offset-before", ""),
            T(i, "--swiper-centered-offset-after", "")),
          s.cssMode &&
            (T(i, "--swiper-slides-offset-before", `${f}px`),
            T(i, "--swiper-slides-offset-after", `${g}px`)));
        const L = s.grid && s.grid.rows > 1 && e.grid;
        L ? e.grid.initSlides(d) : e.grid && e.grid.unsetSlides();
        let _ = 0;
        const A =
          "auto" === s.slidesPerView &&
          s.breakpoints &&
          Object.keys(s.breakpoints).filter((e) => {
            const t = s.breakpoints[e];
            return void 0 !== t?.slidesPerView;
          }).length > 0;
        for (let i = 0; i < c; i += 1) {
          _ = 0;
          const a = d[i];
          if (
            !a ||
            (L && e.grid.updateSlide(i, a, d), "none" !== M(a, "display"))
          ) {
            if (r && "auto" === s.slidesPerView)
              (s.virtual?.slidesPerViewAutoSlideSize &&
                (_ = s.virtual.slidesPerViewAutoSlideSize),
                _ &&
                  a &&
                  (s.roundLengths && (_ = Math.floor(_)),
                  (a.style[e.getDirectionLabel("width")] = `${_}px`)));
            else if ("auto" === s.slidesPerView) {
              A && (a.style[e.getDirectionLabel("width")] = "");
              const i = getComputedStyle(a),
                n = a.style.transform,
                l = a.style.webkitTransform;
              if (
                (n && (a.style.transform = "none"),
                l && (a.style.webkitTransform = "none"),
                s.roundLengths)
              )
                _ = e.isHorizontal() ? k(a, "width") : k(a, "height");
              else {
                const e = t(i, "width"),
                  s = t(i, "padding-left"),
                  n = t(i, "padding-right"),
                  l = t(i, "margin-left"),
                  r = t(i, "margin-right"),
                  o = i.getPropertyValue("box-sizing");
                if (o && "border-box" === o) _ = e + l + r;
                else {
                  const { clientWidth: t, offsetWidth: i } = a;
                  _ = e + s + n + l + r + (i - t);
                }
              }
              (n && (a.style.transform = n),
                l && (a.style.webkitTransform = l),
                s.roundLengths && (_ = Math.floor(_)));
            } else
              ((_ = (w - (s.slidesPerView - 1) * y) / s.slidesPerView),
                s.roundLengths && (_ = Math.floor(_)),
                a && (a.style[e.getDirectionLabel("width")] = `${_}px`));
            (a && (a.swiperSlideSize = _),
              m.push(_),
              s.centeredSlides
                ? ((S = S + _ / 2 + E / 2 + y),
                  0 === E && 0 !== i && (S = S - w / 2 - y),
                  0 === i && (S = S - w / 2 - y),
                  Math.abs(S) < 0.001 && (S = 0),
                  s.roundLengths && (S = Math.floor(S)),
                  x % s.slidesPerGroup === 0 && u.push(S),
                  p.push(S))
                : (s.roundLengths && (S = Math.floor(S)),
                  (x - Math.min(e.params.slidesPerGroupSkip, x)) %
                    e.params.slidesPerGroup ===
                    0 && u.push(S),
                  p.push(S),
                  (S = S + _ + y)),
              (e.virtualSize += _ + y),
              (E = _),
              (x += 1));
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, w) + g),
          n &&
            l &&
            ("slide" === s.effect || "coverflow" === s.effect) &&
            (i.style.width = `${e.virtualSize + y}px`),
          s.setWrapperSize &&
            (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + y}px`),
          L && e.grid.updateWrapperSize(_, u),
          !s.centeredSlides)
        ) {
          const t = "auto" !== s.slidesPerView && s.slidesPerView % 1 != 0,
            i =
              s.snapToSlideEdge && !s.loop && ("auto" === s.slidesPerView || t);
          let a = u.length;
          if (i) {
            let e;
            if ("auto" === s.slidesPerView) {
              e = 1;
              let t = 0;
              for (
                let s = m.length - 1;
                s >= 0 && ((t += m[s] + (s < m.length - 1 ? y : 0)), t <= w);
                s -= 1
              )
                e = m.length - s;
            } else e = Math.floor(s.slidesPerView);
            a = Math.max(c - e, 0);
          }
          const n = [];
          for (let t = 0; t < u.length; t += 1) {
            let l = u[t];
            (s.roundLengths && (l = Math.floor(l)),
              i ? t <= a && n.push(l) : u[t] <= e.virtualSize - w && n.push(l));
          }
          ((u = n),
            Math.floor(e.virtualSize - w) - Math.floor(u[u.length - 1]) > 1 &&
              (i || u.push(e.virtualSize - w)));
        }
        if (r && s.loop) {
          const t = m[0] + y,
            i = (e.virtual.slidesBefore ?? 0) + (e.virtual.slidesAfter ?? 0);
          if (s.slidesPerGroup > 1) {
            const e = Math.ceil(i / s.slidesPerGroup),
              a = t * s.slidesPerGroup;
            for (let t = 0; t < e; t += 1) u.push(u[u.length - 1] + a);
          }
          for (let a = 0; a < i; a += 1)
            (1 === s.slidesPerGroup && u.push(u[u.length - 1] + t),
              p.push(p[p.length - 1] + t),
              (e.virtualSize += t));
        }
        if ((0 === u.length && (u = [0]), 0 !== y)) {
          const t =
            e.isHorizontal() && n
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
          (m.forEach((t) => {
            e += t + (y || 0);
          }),
            (e -= y));
          const t = e > w ? e - w : 0;
          u = u.map((e) => (e <= 0 ? -f : e > t ? t + g : e));
        }
        if (s.centerInsufficientSlides) {
          let e = 0;
          if (
            (m.forEach((t) => {
              e += t + (y || 0);
            }),
            (e -= y),
            e < w)
          ) {
            const t = (w - e) / 2;
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
            slides: d,
            snapGrid: u,
            slidesGrid: p,
            slidesSizesGrid: m,
          }),
          s.centeredSlides && s.cssMode && !s.centeredSlidesBounds)
        ) {
          (T(i, "--swiper-centered-offset-before", -u[0] + "px"),
            T(
              i,
              "--swiper-centered-offset-after",
              e.size / 2 - m[m.length - 1] / 2 + "px",
            ));
          const t = -e.snapGrid[0],
            s = -e.slidesGrid[0];
          ((e.snapGrid = e.snapGrid.map((e) => e + t)),
            (e.slidesGrid = e.slidesGrid.map((e) => e + s)));
        }
        if (
          (c !== o && e.emit("slidesLengthChange"),
          u.length !== v &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
          p.length !== b && e.emit("slidesGridLengthChange"),
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
        let a,
          n = 0;
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
            for (a = 0; a < Math.ceil(t.params.slidesPerView); a += 1) {
              const e = t.activeIndex + a;
              if (e > t.slides.length && !i) break;
              const n = l(e);
              n && s.push(n);
            }
        else {
          const e = l(t.activeIndex);
          e && s.push(e);
        }
        for (a = 0; a < s.length; a += 1)
          if (void 0 !== s[a]) {
            const e = s[a].offsetHeight;
            n = e > n ? e : n;
          }
        (n || 0 === n) && (t.wrapperEl.style.height = `${n}px`);
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
          { slides: i, rtlTranslate: a, snapGrid: n } = t;
        if (0 === i.length) return;
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let l = -e;
        (a && (l = e), (t.visibleSlidesIndexes = []), (t.visibleSlides = []));
        let r = s.spaceBetween;
        "string" == typeof r && r.indexOf("%") >= 0
          ? (r = (parseFloat(r.replace("%", "")) / 100) * t.size)
          : "string" == typeof r && (r = parseFloat(r));
        for (let e = 0; e < i.length; e += 1) {
          const o = i[e];
          let d = o.swiperSlideOffset ?? 0;
          s.cssMode && s.centeredSlides && (d -= i[0].swiperSlideOffset ?? 0);
          const c = o.swiperSlideSize ?? 0,
            u = (l + (s.centeredSlides ? t.minTranslate() : 0) - d) / (c + r),
            p =
              (l - n[0] + (s.centeredSlides ? t.minTranslate() : 0) - d) /
              (c + r),
            m = -(l - d),
            h = m + t.slidesSizesGrid[e],
            f = m >= 0 && m <= t.size - t.slidesSizesGrid[e],
            g =
              (m >= 0 && m < t.size - 1) ||
              (h > 1 && h <= t.size) ||
              (m <= 0 && h >= t.size);
          (g && (t.visibleSlides.push(o), t.visibleSlidesIndexes.push(e)),
            oe(o, g, s.slideVisibleClass),
            oe(o, f, s.slideFullyVisibleClass),
            (o.progress = a ? -u : u),
            (o.originalProgress = a ? -p : p));
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
        let { progress: a, isBeginning: n, isEnd: l } = t,
          r = t.progressLoop;
        const o = n,
          d = l;
        if (0 === i) ((a = 0), (n = !0), (l = !0));
        else {
          a = (e - t.minTranslate()) / i;
          const s = Math.abs(e - t.minTranslate()) < 1,
            r = Math.abs(e - t.maxTranslate()) < 1;
          ((n = s || a <= 0), (l = r || a >= 1), s && (a = 0), r && (a = 1));
        }
        if (s.loop) {
          const s = t.getSlideIndexByData(0),
            i = t.getSlideIndexByData(t.slides.length - 1),
            a = t.slidesGrid[s],
            n = t.slidesGrid[i],
            l = t.slidesGrid[t.slidesGrid.length - 1],
            o = Math.abs(e);
          ((r = o >= a ? (o - a) / l : (o + l - n) / l), r > 1 && (r -= 1));
        }
        (Object.assign(t, {
          progress: a,
          progressLoop: r,
          isBeginning: n,
          isEnd: l,
        }),
          (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
            t.updateSlidesProgress(e),
          n && !o && t.emit("reachBeginning toEdge"),
          l && !d && t.emit("reachEnd toEdge"),
          ((o && !n) || (d && !l)) && t.emit("fromEdge"),
          t.emit("progress", a));
      },
      updateSlidesClasses: function () {
        const e = this,
          { slides: t, params: s, slidesEl: i, activeIndex: a } = e,
          n = !(!e.virtual || !s.virtual?.enabled),
          l = e.grid && s.grid && s.grid.rows > 1,
          r = (e) => C(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
        let o, d, c;
        if (n)
          if (s.loop) {
            const t = e.virtual.slides;
            let s = a - (e.virtual.slidesBefore ?? 0);
            (s < 0 && (s = t.length + s),
              s >= t.length && (s -= t.length),
              (o = r(`[data-swiper-slide-index="${s}"]`)));
          } else o = r(`[data-swiper-slide-index="${a}"]`);
        else
          l
            ? ((o = t.find((e) => e.column === a)),
              (c = t.find((e) => e.column === a + 1)),
              (d = t.find((e) => e.column === a - 1)))
            : (o = t[a]);
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
            (re(e, e === o, s.slideActiveClass),
              re(e, e === c, s.slideNextClass),
              re(e, e === d, s.slidePrevClass));
          }),
          e.emitSlidesClasses());
      },
      updateActiveIndex: function (e) {
        const t = this,
          s = t.rtlTranslate ? t.translate : -t.translate,
          {
            snapGrid: i,
            params: a,
            activeIndex: n,
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
              let a;
              for (let e = 0; e < t.length; e += 1)
                void 0 !== t[e + 1]
                  ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2
                    ? (a = e)
                    : i >= t[e] && i < t[e + 1] && (a = e + 1)
                  : i >= t[e] && (a = e);
              return (
                s.normalizeSlideIndex && (a < 0 || void 0 === a) && (a = 0),
                a
              );
            })(t)),
          i.indexOf(s) >= 0)
        )
          o = i.indexOf(s);
        else {
          const e = Math.min(a.slidesPerGroupSkip, d);
          o = e + Math.floor((d - e) / a.slidesPerGroup);
        }
        if ((o >= i.length && (o = i.length - 1), d === n && !t.params.loop))
          return void (
            o !== r && ((t.snapIndex = o), t.emit("snapIndexChange"))
          );
        if (d === n && t.params.loop && t.virtual && t.params.virtual?.enabled)
          return void (t.realIndex = c(d));
        const u = t.grid && a.grid && a.grid.rows > 1;
        let p;
        if (t.virtual && a.virtual?.enabled) p = a.loop ? c(d) : d;
        else if (u) {
          const e = t.slides.find((e) => e.column === d);
          let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
          (Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
            (p = Math.floor(s / a.grid.rows)));
        } else if (t.slides[d]) {
          const e = t.slides[d].getAttribute("data-swiper-slide-index");
          p = e ? parseInt(e, 10) : d;
        } else p = d;
        (Object.assign(t, {
          previousSnapIndex: r,
          snapIndex: o,
          previousRealIndex: l,
          realIndex: p,
          previousIndex: n,
          activeIndex: d,
        }),
          t.initialized && V(t),
          t.__loopFixInProgress__ ||
            (t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) &&
              ((t.__lastEmittedRealIndex__ ?? l) !== p &&
                t.emit("realIndexChange"),
              t.emit("slideChange")),
            (t.__lastEmittedRealIndex__ = p)));
      },
      updateClickedSlide: function (e, t) {
        const s = this,
          i = s.params;
        let a = e.closest(`.${i.slideClass}, swiper-slide`);
        !a &&
          s.isElement &&
          t &&
          t.length > 1 &&
          t.includes(e) &&
          [...t.slice(t.indexOf(e) + 1, t.length)].forEach((e) => {
            !a &&
              e.matches &&
              e.matches(`.${i.slideClass}, swiper-slide`) &&
              (a = e);
          });
        let n,
          l = !1;
        if (a)
          for (let e = 0; e < s.slides.length; e += 1)
            if (s.slides[e] === a) {
              ((l = !0), (n = e));
              break;
            }
        if (!a || !l)
          return ((s.clickedSlide = void 0), void (s.clickedIndex = void 0));
        ((s.clickedSlide = a),
          s.virtual && s.params.virtual?.enabled
            ? (s.clickedIndex = parseInt(
                a.getAttribute("data-swiper-slide-index"),
                10,
              ))
            : (s.clickedIndex = n),
          i.slideToClickedSlide &&
            void 0 !== s.clickedIndex &&
            s.clickedIndex !== s.activeIndex &&
            s.slideToClickedSlide());
      },
    };
    const ce = {
        eventsEmitter: R,
        update: de,
        translate: le,
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
              ne({ swiper: s, runCallbacks: e, direction: t, step: "Start" }));
          },
          transitionEnd: function (e = !0, t) {
            const s = this,
              { params: i } = s;
            ((s.animating = !1),
              i.cssMode ||
                (s.setTransition(0),
                ne({ swiper: s, runCallbacks: e, direction: t, step: "End" })));
          },
        },
        slide: ae,
        loop: se,
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
            ((e.onTouchStart = ee.bind(e)),
              (e.onTouchMove = J.bind(e)),
              (e.onTouchEnd = Z.bind(e)),
              (e.onDocumentTouchStart = X.bind(e)),
              t.cssMode && (e.onScroll = Q.bind(e)),
              (e.onClick = W.bind(e)),
              (e.onLoad = Y.bind(e)),
              te(e, "on"));
          },
          detachEvents: function () {
            te(this, "off");
          },
        },
        breakpoints: N,
        checkOverflow: H,
        classes: F,
      },
      ue = {};
    class pe {
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
          (s = E({}, s)),
          t && !s.el && (s.el = t),
          s.el &&
            "string" == typeof s.el &&
            "undefined" != typeof document &&
            document.querySelectorAll(s.el).length > 1)
        ) {
          const e = [];
          return (
            document.querySelectorAll(s.el).forEach((t) => {
              const i = E({}, s, { el: t });
              e.push(new pe(i));
            }),
            e
          );
        }
        const i = this;
        ((i.__swiper__ = !0),
          (i.support = $()),
          (i.device = z({ userAgent: s.userAgent ?? void 0 })),
          (i.browser = D()),
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
        const a = {};
        i.modules.forEach((e) => {
          e({
            params: s,
            swiper: i,
            extendParams: ie(s, a),
            on: i.on.bind(i),
            once: i.once.bind(i),
            off: i.off.bind(i),
            emit: i.emit.bind(i),
          });
        });
        const n = E({}, j, a);
        if (
          ((i.params = E({}, n, ue, s)),
          (i.originalParams = E({}, i.params)),
          (i.passedParams = E({}, s)),
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
          i = A(C(t, `.${s.slideClass}, swiper-slide`)[0]);
        return A(e) - (i ?? 0);
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
        this.slides = C(e, `.${t.slideClass}, swiper-slide`);
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
          slidesGrid: a,
          slidesSizesGrid: n,
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
            (t ? a[e] + n[e] - a[r] < l : a[e] - a[r] < l) && (o += 1);
          }
        else
          for (let e = r - 1; e >= 0; e -= 1) {
            a[r] - a[e] < l && (o += 1);
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
        let a;
        if (
          (s.breakpoints && e.setBreakpoint(),
          s.lazyPreload &&
            [...e.el.querySelectorAll('[loading="lazy"]')].forEach((t) => {
              t.complete && B(e, t);
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
            a = e.slideTo(t - 1, 0, !1, !0);
          } else a = e.slideTo(e.activeIndex, 0, !1, !0);
          a || i();
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
        const a = i.parentNode;
        a &&
          a.host &&
          a.host.nodeName === t.params.swiperElementNodeName.toUpperCase() &&
          (t.isElement = !0);
        const n = () =>
          `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
        let l = (() => {
          if (i && i.shadowRoot) {
            return i.shadowRoot.querySelector(n());
          }
          return C(i, n())[0];
        })();
        !l &&
          t.params.createElements &&
          ((l = _("div", t.params.wrapperClass)),
          i.append(l),
          C(i, `.${t.params.slideClass}`).forEach((e) => {
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
            rtl: "rtl" === i.dir.toLowerCase() || "rtl" === M(i, "direction"),
            rtlTranslate:
              "horizontal" === t.params.direction &&
              ("rtl" === i.dir.toLowerCase() || "rtl" === M(i, "direction")),
            wrongRTL: "-webkit-box" === M(l, "display"),
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
                ? B(t, e)
                : e.addEventListener("load", (e) => {
                    B(t, e.target);
                  });
            }));
        }
        return (
          (t.initialized = !0),
          V(t),
          t.emit("init"),
          t.emit("afterInit"),
          t
        );
      }
      destroy(e = !0, t = !0) {
        const s = this,
          { params: i, el: a, wrapperEl: n, slides: l } = s;
        return (
          void 0 === s.params ||
            s.destroyed ||
            (s.emit("beforeDestroy"),
            (s.initialized = !1),
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t &&
              (s.removeClasses(),
              a && "string" != typeof a && a.removeAttribute("style"),
              n && n.removeAttribute("style"),
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
        E(ue, e);
      }
      static installModule(e) {
        pe.prototype.__modules__ || (pe.prototype.__modules__ = []);
        const t = pe.prototype.__modules__;
        "function" == typeof e && t.indexOf(e) < 0 && t.push(e);
      }
      static use(e) {
        return Array.isArray(e)
          ? (e.forEach((e) => pe.installModule(e)), pe)
          : (pe.installModule(e), pe);
      }
    }
    (Object.defineProperty(pe, "extendedDefaults", { get: () => ue }),
      Object.defineProperty(pe, "defaults", { get: () => j }));
    const me = ce,
      he = pe.prototype;
    (Object.keys(me).forEach((e) => {
      const t = me[e];
      Object.keys(t).forEach((e) => {
        he[e] = t[e];
      });
    }),
      pe.use([
        ({ swiper: e, on: t, emit: s }) => {
          let i = null,
            a = null;
          const n = () => {
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
                  a = window.requestAnimationFrame(() => {
                    const { width: s, height: i } = e;
                    let a = s,
                      l = i;
                    (t.forEach(
                      ({ contentBoxSize: t, contentRect: s, target: i }) => {
                        if (i && i !== e.el) return;
                        const n = Array.isArray(t) ? t[0] : t;
                        ((a = s ? s.width : n.inlineSize),
                          (l = s ? s.height : n.blockSize));
                      },
                    ),
                      (a === s && l === i) || n());
                  });
                })),
                i.observe(e.el))
              : (window.addEventListener("resize", n),
                window.addEventListener("orientationchange", l));
          }),
            t("destroy", () => {
              (a && window.cancelAnimationFrame(a),
                i && i.unobserve && e.el && (i.unobserve(e.el), (i = null)),
                window.removeEventListener("resize", n),
                window.removeEventListener("orientationchange", l));
            }));
        },
        ({ swiper: e, extendParams: t, on: s }) => {
          const i = [],
            a = (t, s = {}) => {
              const a =
                window.MutationObserver || window.WebkitMutationObserver;
              if (!a) return;
              const n = new a((t) => {
                if (e.__preventObserver__) return;
                if (1 === t.length) return void e.emit("observerUpdate", t[0]);
                const s = function () {
                  e.emit("observerUpdate", t[0]);
                };
                window.requestAnimationFrame
                  ? window.requestAnimationFrame(s)
                  : window.setTimeout(s, 0);
              });
              (n.observe(t, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: e.isElement || void 0 === s.childList || s.childList,
                characterData: void 0 === s.characterData || s.characterData,
              }),
                i.push(n));
            };
          (t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
            s("init", () => {
              if (e.params.observer) {
                if (e.params.observeParents) {
                  const t = P(e.hostEl);
                  for (let e = 0; e < t.length; e += 1) a(t[e]);
                }
                (a(e.hostEl, { childList: e.params.observeSlideChildren }),
                  a(e.wrapperEl, { attributes: !1 }));
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
    const fe = ({ swiper: e, extendParams: t, on: s, emit: i, params: a }) => {
      function n() {
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
        "object" == typeof a.autoplay &&
        a.autoplay &&
        "number" == typeof a.autoplay.delay
          ? a.autoplay.delay
          : 3e3;
      let r,
        o,
        d,
        c = l,
        u = l,
        p = 0,
        m = new Date().getTime(),
        h = !1,
        f = !1,
        g = !1,
        v = !1,
        b = !1;
      function w(t) {
        if (!e || e.destroyed || !e.wrapperEl) return;
        if (t.target !== e.wrapperEl) return;
        e.wrapperEl.removeEventListener("transitionend", w);
        const s = t.detail;
        b || (s && s.bySwiperTouchMove) || L();
      }
      const y = () => {
          if (e.destroyed || !e.autoplay.running) return;
          e.autoplay.paused ? (h = !0) : h && ((u = p), (h = !1));
          const t = e.autoplay.paused ? p : m + u - new Date().getTime();
          ((e.autoplay.timeLeft = t),
            i("autoplayTimeLeft", t, t / c),
            (o = requestAnimationFrame(() => {
              y();
            })));
        },
        S = () => {
          let t = n().delay;
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
          (void 0 === s && ((s = S()), (c = s), (u = s)), (p = s));
          const a = e.params.speed,
            l = () => {
              if (!e || e.destroyed) return;
              const t = n();
              (t.reverseDirection
                ? !e.isBeginning || e.params.loop || e.params.rewind
                  ? (e.slidePrev(a, !0, !0), i("autoplay"))
                  : t.stopOnLastSlide ||
                    (e.slideTo(e.slides.length - 1, a, !0, !0), i("autoplay"))
                : !e.isEnd || e.params.loop || e.params.rewind
                  ? (e.slideNext(a, !0, !0), i("autoplay"))
                  : t.stopOnLastSlide ||
                    (e.slideTo(0, a, !0, !0), i("autoplay")),
                e.params.cssMode &&
                  ((m = new Date().getTime()),
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
          (m = new Date().getTime()),
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
          const a = () => {
            (i("autoplayPause"),
              n().waitForTransition
                ? e.wrapperEl.addEventListener("transitionend", w)
                : L());
          };
          if (((e.autoplay.paused = !0), s)) return void a();
          const l = p || n().delay;
          ((p = l - (new Date().getTime() - m)),
            (e.isEnd && p < 0 && !e.params.loop) || (p < 0 && (p = 0), a()));
        },
        L = () => {
          (e.isEnd && p < 0 && !e.params.loop) ||
            e.destroyed ||
            !e.autoplay.running ||
            ((m = new Date().getTime()),
            v ? ((v = !1), E(p)) : E(),
            (e.autoplay.paused = !1),
            i("autoplayResume"));
        },
        _ = () => {
          !e.destroyed &&
            e.autoplay.running &&
            ("hidden" === document.visibilityState && ((v = !0), C(!0)),
            "visible" === document.visibilityState && L());
        },
        M = (t) => {
          "mouse" === t.pointerType &&
            ((v = !0), (b = !0), e.animating || e.autoplay.paused || C(!0));
        },
        A = (t) => {
          "mouse" === t.pointerType && ((b = !1), e.autoplay.paused && L());
        };
      (s("init", () => {
        n().enabled &&
          (n().pauseOnMouseEnter &&
            (e.el.addEventListener("pointerenter", M),
            e.el.addEventListener("pointerleave", A)),
          document.addEventListener("visibilitychange", _),
          T());
      }),
        s("destroy", () => {
          (e.el &&
            "string" != typeof e.el &&
            (e.el.removeEventListener("pointerenter", M),
            e.el.removeEventListener("pointerleave", A)),
            document.removeEventListener("visibilitychange", _),
            e.autoplay.running && x());
        }),
        s("_freeModeStaticRelease", () => {
          (g || v) && L();
        }),
        s("_freeModeNoMomentumRelease", () => {
          n().disableOnInteraction ? x() : C(!0, !0);
        }),
        s("beforeTransitionStart", (t, s, i) => {
          !e.destroyed &&
            e.autoplay.running &&
            (i || !n().disableOnInteraction ? C(!0, !0) : x());
        }),
        s("sliderFirstMove", () => {
          !e.destroyed &&
            e.autoplay.running &&
            (n().disableOnInteraction
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
              n().disableOnInteraction)
            )
              return ((g = !1), void (f = !1));
            (g && e.params.cssMode && L(), (g = !1), (f = !1));
          }
        }),
        s("slideChange", () => {
          !e.destroyed &&
            e.autoplay.running &&
            e.autoplay.paused &&
            ((p = S()), (c = S()));
        }),
        Object.assign(e.autoplay, { start: T, stop: x, pause: C, resume: L }));
    };
    function ge(e = "") {
      return `.${e
        .trim()
        .replace(/([.:!+/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1")
        .replace(/ /g, ".")}`;
    }
    function ve(e, t, s, i) {
      const a = s ?? {},
        n = t ?? {};
      return (
        e.params.createElements &&
          Object.keys(i).forEach((t) => {
            if (!a[t] && !0 === a.auto) {
              let s = C(e.el, `.${i[t]}`)[0];
              (s ||
                ((s = _("div", i[t])), (s.className = i[t]), e.el.append(s)),
                (a[t] = s),
                (n[t] = s));
            }
          }),
        a
      );
    }
    const be = (e) => {
        if (((e) => !!e.virtual && !!e.params.virtual?.enabled)(e))
          return e.virtual.slides.length;
        const t = e.params.grid?.rows;
        return e.grid && t && t > 1
          ? e.slides.length / Math.ceil(t)
          : e.slides.length;
      },
      we = ({ swiper: e, extendParams: t, on: s, emit: i }) => {
        const a = "swiper-pagination";
        let n;
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
            bulletClass: `${a}-bullet`,
            bulletActiveClass: `${a}-bullet-active`,
            modifierClass: `${a}-`,
            currentClass: `${a}-current`,
            totalClass: `${a}-total`,
            hiddenClass: `${a}-hidden`,
            progressbarFillClass: `${a}-progressbar-fill`,
            progressbarOppositeClass: `${a}-progressbar-opposite`,
            clickableClass: `${a}-clickable`,
            lockClass: `${a}-lock`,
            horizontalClass: `${a}-horizontal`,
            verticalClass: `${a}-vertical`,
            paginationDisabledClass: `${a}-disabled`,
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
          const s = t.target.closest(ge(r().bulletClass));
          if (!s) return;
          t.preventDefault();
          const i = (A(s) ?? 0) * (e.params.slidesPerGroup ?? 1);
          if (e.params.loop) {
            if (e.realIndex === i) return;
            const t =
              ((a = e.realIndex),
              (n = i),
              (l = e.slides.length),
              (n %= l) === 1 + (a %= l)
                ? "next"
                : n === a - 1
                  ? "previous"
                  : void 0);
            "next" === t
              ? e.slideNext()
              : "previous" === t
                ? e.slidePrev()
                : e.slideToLoop(i);
          } else e.slideTo(i);
          var a, n, l;
        }
        function u() {
          const t = e.rtl,
            s = r();
          if (o()) return;
          const a = I(e.pagination.el);
          let c, u;
          const p = be(e),
            m = e.params.loop
              ? Math.ceil(p / (e.params.slidesPerGroup ?? 1))
              : e.snapGrid.length;
          if (
            (e.params.loop
              ? ((u = e.previousRealIndex || 0),
                (c =
                  (e.params.slidesPerGroup ?? 1) > 1
                    ? Math.floor(e.realIndex / (e.params.slidesPerGroup ?? 1))
                    : e.realIndex))
              : void 0 !== e.snapIndex
                ? ((c = e.snapIndex), (u = e.previousSnapIndex))
                : ((u = e.previousIndex || 0), (c = e.activeIndex || 0)),
            "bullets" === s.type &&
              e.pagination.bullets &&
              e.pagination.bullets.length > 0)
          ) {
            const i = e.pagination.bullets;
            let r = 0,
              o = 0,
              p = 0;
            if (s.dynamicBullets) {
              n = k(i[0], e.isHorizontal() ? "width" : "height");
              const t = e.isHorizontal() ? "width" : "height";
              (a.forEach((e) => {
                e.style[t] = (n ?? 0) * (s.dynamicMainBullets + 4) + "px";
              }),
                s.dynamicMainBullets > 1 &&
                  void 0 !== u &&
                  ((l += c - (u || 0)),
                  l > s.dynamicMainBullets - 1
                    ? (l = s.dynamicMainBullets - 1)
                    : l < 0 && (l = 0)),
                (r = Math.max(c - l, 0)),
                (o = r + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                (p = (o + r) / 2));
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
              a.length > 1)
            )
              i.forEach((t) => {
                const i = A(t);
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
              const a = Math.min(i.length, s.dynamicMainBullets + 4),
                l = ((n ?? 0) * a - (n ?? 0)) / 2 - p * (n ?? 0),
                r = t ? "right" : "left",
                o = e.isHorizontal() ? r : "top";
              i.forEach((e) => {
                e.style[o] = `${l}px`;
              });
            }
          }
          a.forEach((t, a) => {
            if (
              ("fraction" === s.type &&
                (t.querySelectorAll(ge(s.currentClass)).forEach((e) => {
                  e.textContent = String(s.formatFractionCurrent(c + 1));
                }),
                t.querySelectorAll(ge(s.totalClass)).forEach((e) => {
                  e.textContent = String(s.formatFractionTotal(m));
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
              const a = (c + 1) / m;
              let n = 1,
                l = 1;
              ("horizontal" === i ? (n = a) : (l = a),
                t.querySelectorAll(ge(s.progressbarFillClass)).forEach((t) => {
                  ((t.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${l})`),
                    (t.style.transitionDuration = `${e.params.speed}ms`));
                }));
            }
            ("custom" === s.type && s.renderCustom
              ? (O(t, s.renderCustom(e, c + 1, m)),
                0 === a && i("paginationRender", t))
              : (0 === a && i("paginationRender", t), i("paginationUpdate", t)),
              e.params.watchOverflow &&
                e.enabled &&
                t.classList[e.isLocked ? "add" : "remove"](s.lockClass));
          });
        }
        function p() {
          const t = r();
          if (o()) return;
          const s = be(e),
            a = I(e.pagination.el);
          let n = "";
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
                ? (n += t.renderBullet.call(e, s, t.bulletClass))
                : (n += `<${t.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${t.bulletClass}"></${t.bulletElement}>`);
          }
          ("fraction" === t.type &&
            (n = t.renderFraction
              ? t.renderFraction.call(e, t.currentClass, t.totalClass)
              : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
            "progressbar" === t.type &&
              (n = t.renderProgressbar
                ? t.renderProgressbar.call(e, t.progressbarFillClass)
                : `<span class="${t.progressbarFillClass}"></span>`),
            (e.pagination.bullets = []),
            a.forEach((s) => {
              ("custom" !== t.type && O(s, n || ""),
                "bullets" === t.type &&
                  e.pagination.bullets.push(
                    ...Array.from(s.querySelectorAll(ge(t.bulletClass))),
                  ));
            }),
            "custom" !== t.type && i("paginationRender", a[0]));
        }
        function m() {
          e.params.pagination = ve(
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
            const t = s.find((t) => P(t, ".swiper")[0] === e.el);
            t && (s = t);
          }
          (Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(e.pagination, { el: s }));
          I(s).forEach((s) => {
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
        function h() {
          const t = r();
          if (o()) return;
          const s = e.pagination.el;
          if (s) {
            I(s).forEach((s) => {
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
          I(e.pagination.el).forEach((s) => {
            (s.classList.remove(t.horizontalClass, t.verticalClass),
              s.classList.add(
                e.isHorizontal() ? t.horizontalClass : t.verticalClass,
              ));
          });
        }),
          s("init", () => {
            !1 === r().enabled ? f() : (m(), p(), u());
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
            h();
          }),
          s("enable disable", () => {
            const { el: t } = e.pagination;
            if (t) {
              const s = r();
              I(t).forEach((t) =>
                t.classList[e.enabled ? "remove" : "add"](s.lockClass),
              );
            }
          }),
          s("lock unlock", () => {
            u();
          }),
          s("click", (t, s) => {
            const a = s.target,
              n = I(e.pagination.el),
              l = r();
            if (
              l.el &&
              l.hideOnClick &&
              n &&
              n.length > 0 &&
              !a.classList.contains(l.bulletClass)
            ) {
              if (
                e.navigation &&
                ((e.navigation.nextEl && a === e.navigation.nextEl) ||
                  (e.navigation.prevEl && a === e.navigation.prevEl))
              )
                return;
              const t = n[0].classList.contains(l.hiddenClass);
              (i(!0 === t ? "paginationShow" : "paginationHide"),
                n.forEach((e) => e.classList.toggle(l.hiddenClass)));
            }
          }));
        const f = () => {
          const t = r();
          e.el.classList.add(t.paginationDisabledClass);
          const { el: s } = e.pagination;
          if (s) {
            I(s).forEach((e) => e.classList.add(t.paginationDisabledClass));
          }
          h();
        };
        Object.assign(e.pagination, {
          enable: () => {
            const t = r();
            e.el.classList.remove(t.paginationDisabledClass);
            const { el: s } = e.pagination;
            if (s) {
              I(s).forEach((e) =>
                e.classList.remove(t.paginationDisabledClass),
              );
            }
            (m(), p(), u());
          },
          disable: f,
          render: p,
          update: u,
          init: m,
          destroy: h,
        });
      },
      ye =
        '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>',
      Se = ({ swiper: e, extendParams: t, on: s, emit: i }) => {
        function a() {
          return e.params.navigation;
        }
        function n(t) {
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
          const i = a();
          I(t).forEach((t) => {
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
          e.params.navigation = ve(
            e,
            e.originalParams.navigation,
            e.params.navigation,
            { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" },
          );
          const t = a();
          if (!t.nextEl && !t.prevEl) return;
          const s = n(t.nextEl),
            i = n(t.prevEl);
          Object.assign(e.navigation, { nextEl: s, prevEl: i });
          const l = I(s),
            r = I(i),
            c = (s, i) => {
              if (s) {
                if (
                  t.addIcons &&
                  s.matches(".swiper-button-next,.swiper-button-prev") &&
                  !s.querySelector("svg")
                ) {
                  const e = document.createElement("div");
                  O(e, ye);
                  const t = e.querySelector("svg");
                  (t && s.appendChild(t), e.remove());
                }
                s.addEventListener("click", "next" === i ? d : o);
              }
              !e.enabled && s && s.classList.add(...t.lockClass.split(" "));
            };
          (l.forEach((e) => c(e, "next")), r.forEach((e) => c(e, "prev")));
        }
        function u() {
          const t = a(),
            { nextEl: s, prevEl: i } = e.navigation,
            n = I(s),
            l = I(i),
            r = (e, s) => {
              (e.removeEventListener("click", "next" === s ? d : o),
                e.classList.remove(...t.disabledClass.split(" ")));
            };
          (n.forEach((e) => r(e, "next")), l.forEach((e) => r(e, "prev")));
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
          (e.navigation = { nextEl: null, prevEl: null, arrowSvg: ye }),
          s("init", () => {
            !1 === a().enabled ? p() : (c(), r());
          }),
          s("toEdge fromEdge lock unlock", () => {
            r();
          }),
          s("destroy", () => {
            u();
          }),
          s("enable disable", () => {
            const t = a(),
              { nextEl: s, prevEl: i } = e.navigation,
              n = I(s),
              l = I(i);
            e.enabled
              ? r()
              : [...n, ...l]
                  .filter((e) => !!e)
                  .forEach((e) => e.classList.add(t.lockClass));
          }),
          s("click", (t, s) => {
            const n = a(),
              { nextEl: l, prevEl: r } = e.navigation,
              o = I(l),
              d = I(r),
              c = s.target;
            let u = d.includes(c) || o.includes(c);
            if (e.isElement && !u) {
              const e = s.composedPath ? s.composedPath() : [];
              e.length && (u = e.find((e) => o.includes(e) || d.includes(e)));
            }
            if (n.hideOnClick && !u) {
              if (
                e.pagination &&
                e.params.pagination &&
                e.params.pagination.clickable &&
                (e.pagination.el === c || e.pagination.el.contains(c))
              )
                return;
              let t;
              (o.length
                ? (t = o[0].classList.contains(n.hiddenClass))
                : d.length && (t = d[0].classList.contains(n.hiddenClass)),
                i(!0 === t ? "navigationShow" : "navigationHide"),
                [...o, ...d]
                  .filter((e) => !!e)
                  .forEach((e) => e.classList.toggle(n.hiddenClass)));
            }
          }));
        const p = () => {
          const t = a();
          (e.el.classList.add(...t.navigationDisabledClass.split(" ")), u());
        };
        Object.assign(e.navigation, {
          enable: () => {
            const t = a();
            (e.el.classList.remove(...t.navigationDisabledClass.split(" ")),
              c(),
              r());
          },
          disable: p,
          update: r,
          init: c,
          destroy: u,
        });
      };
    function Ee(e, t) {
      const s = x(t);
      return (
        s !== t &&
          ((s.style.backfaceVisibility = "hidden"),
          s.style.setProperty("-webkit-backface-visibility", "hidden")),
        s
      );
    }
    function Te({
      swiper: e,
      duration: t,
      transformElements: s,
      allSlides: i,
    }) {
      const { activeIndex: a } = e;
      if (e.params.virtualTranslate && 0 !== t) {
        let t,
          n = !1;
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
              return !!s && e.getSlideIndex(s) === a;
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
              if (n) return;
              if (!e || e.destroyed) return;
              ((n = !0), (e.animating = !1));
              const t = new CustomEvent("transitionend", {
                bubbles: !0,
                cancelable: !0,
              });
              e.wrapperEl.dispatchEvent(t);
            });
          }));
      }
    }
    const xe = ({ swiper: e, extendParams: t, on: s }) => {
        t({ fadeEffect: { crossFade: !1, mode: "default" } });
        let i = 0;
        function a() {
          return e.params.fadeEffect;
        }
        function n() {
          const e = a();
          return "default" === e.mode && e.crossFade ? "cross-fade" : e.mode;
        }
        !(function (e) {
          const {
            effect: t,
            swiper: s,
            on: i,
            setTranslate: a,
            setTransition: n,
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
              s.params.effect === t && a();
            }),
            i("setTransition", (e, i) => {
              s.params.effect === t && n(i);
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
                c && s.slides && s.slides.length && (a(), (c = !1));
              }));
          });
        })({
          effect: "fade",
          swiper: e,
          on: s,
          setTranslate: () => {
            const { slides: t } = e,
              s = (a(), n()),
              l = "out-in" === s && i > 0,
              r = i;
            i = 0;
            const o = [],
              d = [];
            let c = !1;
            for (let i = 0; i < t.length; i += 1) {
              const a = t[i];
              let n = -(a.swiperSlideOffset ?? 0);
              e.params.virtualTranslate || (n -= e.translate);
              let r = 0;
              e.isHorizontal() || ((r = n), (n = 0));
              const u = a.progress ?? 0;
              let p;
              p =
                "cross-fade" === s
                  ? Math.max(1 - Math.abs(u), 0)
                  : "out-in" === s
                    ? Math.max(1 - 2 * Math.abs(u), 0)
                    : 1 + Math.min(Math.max(u, -1), 0);
              const m = Ee(0, a);
              if (l) {
                const e = parseFloat(m.style.opacity);
                (0 === p && e > 0 && (c = !0), p > 0 && d.push(m), o.push(m));
              }
              ((m.style.opacity = String(p)),
                (m.style.transform = `translate3d(${n}px, ${r}px, 0px)`));
            }
            l &&
              (o.forEach((e) => {
                const t = c && d.includes(e);
                ((e.style.transitionDuration = r / 2 + "ms"),
                  (e.style.transitionDelay = t ? r / 2 + "ms" : "0ms"));
              }),
              Te({
                swiper: e,
                duration: r,
                transformElements: d,
                allSlides: !0,
              }));
          },
          setTransition: (t) => {
            const s = n(),
              a = e.slides.map((e) => x(e));
            (a.forEach((e) => {
              ((e.style.transitionDuration = `${t}ms`),
                "out-in" === s && 0 === t && (e.style.transitionDelay = ""));
            }),
              "out-in" === s && t > 0 && !e.params.cssMode
                ? (i = t)
                : Te({
                    swiper: e,
                    duration: t,
                    transformElements: a,
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
      Ce = ({ swiper: e, extendParams: t, on: s }) => {
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
          a = !1;
        function n() {
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
            a = n();
          if (i && i.classList.contains(a.slideThumbActiveClass)) return;
          if (null == s) return;
          let l;
          if (t.params.loop) {
            const e = t.clickedSlide?.getAttribute("data-swiper-slide-index");
            l = null == e ? s : parseInt(e, 10);
          } else l = s;
          e.params.loop ? e.slideToLoop(l) : e.slideTo(l);
        }
        function o() {
          const t = n();
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
          } else if (y(t.swiper)) {
            const i = Object.assign({}, t.swiper);
            (Object.assign(i, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
              (e.thumbs.swiper = new s(i)),
              (a = !0));
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
          let a = 1;
          const r = n(),
            o = r.slideThumbActiveClass,
            d = e.params.slidesPerView;
          if (
            ("number" == typeof d &&
              d > 1 &&
              !e.params.centeredSlides &&
              (a = d),
            r.multipleActiveThumbs || (a = 1),
            (a = Math.floor(a)),
            i.slides.forEach((e) => e.classList.remove(o)),
            i.params.loop || l())
          )
            for (let t = 0; t < a; t += 1)
              C(
                i.slidesEl,
                `[data-swiper-slide-index="${e.realIndex + t}"]`,
              ).forEach((e) => {
                e.classList.add(o);
              });
          else
            for (let t = 0; t < a; t += 1) {
              const s = i.slides[e.realIndex + t];
              s && s.classList.add(o);
            }
          (s?.autoScroll ?? !0) &&
            (function (t) {
              const s = e.thumbs.swiper;
              if (!s || s.destroyed) return;
              const i = s.params.slidesPerView,
                a = "auto" === i ? s.slidesPerViewDynamic() : (i ?? 1),
                l = n().autoScrollOffset,
                r = l && !s.params.loop;
              if (e.realIndex !== s.realIndex || r) {
                const i = s.activeIndex;
                let n, o;
                if (s.params.loop) {
                  const t = s.slides.find(
                    (t) =>
                      t.getAttribute("data-swiper-slide-index") ===
                      `${e.realIndex}`,
                  );
                  ((n = t ? s.slides.indexOf(t) : -1),
                    (o = e.activeIndex > e.previousIndex ? "next" : "prev"));
                } else
                  ((n = e.realIndex),
                    (o = n > e.previousIndex ? "next" : "prev"));
                (r && (n += "next" === o ? l : -1 * l),
                  s.visibleSlidesIndexes &&
                    s.visibleSlidesIndexes.indexOf(n) < 0 &&
                    (s.params.centeredSlides
                      ? (n =
                          n > i
                            ? n - Math.floor(a / 2) + 1
                            : n + Math.floor(a / 2) - 1)
                      : n > i && s.params.slidesPerGroup,
                    s.slideTo(n, t)));
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
                        a = (n) => {
                          const l = n.detail;
                          ((t.swiper = l[0]),
                            s.removeEventListener(i, a),
                            o(),
                            d(!0),
                            t.swiper.update(),
                            e.update());
                        };
                      s.addEventListener(i, a);
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
            t && !t.destroyed && a && t.destroy();
          }),
          Object.assign(e.thumbs, { init: o, update: d }));
      };
    function Le() {
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
      (Le(),
        document.querySelector(".swiper") &&
          (new pe(".new-product__slider", {
            modules: [fe, we, Se],
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
          new pe(".big-photo-product", {
            modules: [xe, Ce, Se],
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
          new pe(".thumb-photo", {
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
    let _e = !1;
    setTimeout(() => {
      if (_e) {
        let e = new Event("windowScroll");
        window.addEventListener("scroll", function (t) {
          document.dispatchEvent(e);
        });
      }
    }, 0);
    document.querySelector(".quantity-btn__plus");
    const Me = document.querySelector(".quantity-btn__minus");
    let Ae,
      Pe,
      ke = document.querySelector(".quantity-btn__input");
    (document.addEventListener("click", function (e) {
      ((Pe = e.target),
        (function () {
          if (t.any())
            if (Pe.closest(".menu__item"))
              Pe.closest(".menu__item").classList.toggle("sub-menu-active");
            else {
              let e = document.querySelector(".sub-menu-active");
              e && e.classList.remove("sub-menu-active");
            }
        })(),
        Pe.closest(".quantity-btn__plus") &&
          (Ae++,
          1 == Ae
            ? Me && Me.classList.add("_btn-disable")
            : Me.classList.remove("_btn-disable"),
          (ke.value = Ae)),
        Pe.closest(".quantity-btn__minus") &&
          (Ae--,
          1 == Ae
            ? Me && Me.classList.add("_btn-disable")
            : Me.classList.remove("_btn-disable"),
          (ke.value = Ae),
          Ae <= 0
            ? (console.log(ke.value),
              (Ae = 1),
              (ke.value = Ae),
              Me.classList.add("_btn-disable"))
            : Me.classList.remove("_btn-disable")));
    }),
      ke &&
        ((Ae = ke.value),
        ke.addEventListener("keyup", (e) => {
          let t = e.currentTarget;
          ("0" == t.value && (t.value = 1),
            (Ae = ke.value),
            1 == Ae
              ? Me && Me.classList.add("_btn-disable")
              : Me.classList.remove("_btn-disable"));
        }),
        ke.addEventListener("keypress", (e) => {
          !(function (e) {
            var t = e.which ? e.which : e.keyCode;
            t > 31 && (t < 48 || t > 57) && e.preventDefault();
          })(e);
        }),
        ke.addEventListener("change", (e) => {
          let t = e.currentTarget;
          (t.value || (t.value = 1),
            (Ae = ke.value),
            1 == Ae
              ? Me && Me.classList.add("_btn-disable")
              : Me.classList.remove("_btn-disable"));
        })));
    let Ie,
      Oe = !0;
    (document.addEventListener("click", function (e) {
      ((Ie = e.target),
        Oe && Ie.closest(".menu-text")
          ? (document.documentElement.classList.add("menu-open"),
            document.documentElement.classList.add("no-scrolling"),
            (Oe = !1))
          : Ie.closest(".menu") ||
            (document.documentElement.classList.remove("menu-open"),
            document.documentElement.classList.remove("no-scrolling"),
            (Oe = !0)));
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
          t.length && a(t);
          let s = d(e, "spollers");
          function a(e, t = !1) {
            e.forEach((e) => {
              ((e = t ? e.item : e),
                t.matches || !t
                  ? (e.classList.add("_spoller-init"),
                    l(e),
                    e.addEventListener("click", r))
                  : (e.classList.remove("_spoller-init"),
                    l(e, !1),
                    e.removeEventListener("click", r)));
            });
          }
          function l(e, t = !0) {
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
                a = !!i.hasAttribute("data-one-spoller");
              (i.querySelectorAll("._slide").length ||
                (a && !s.classList.contains("_spoller-active") && o(i),
                s.classList.toggle("_spoller-active"),
                n(s.nextElementSibling, 500)),
                e.preventDefault());
            }
          }
          function o(e) {
            const t = e.querySelector("[data-spoller]._spoller-active");
            t &&
              (t.classList.remove("_spoller-active"),
              i(t.nextElementSibling, 500));
          }
          s &&
            s.length &&
            s.forEach((e) => {
              (e.matchMedia.addEventListener("change", function () {
                a(e.itemsArray, e.matchMedia);
              }),
                a(e.itemsArray, e.matchMedia));
            });
        }
      })(),
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
              g.removeError(t));
          }),
          document.body.addEventListener("focusout", function (e) {
            const t = e.target;
            ("INPUT" !== t.tagName && "TEXTAREA" !== t.tagName) ||
              (t.dataset.placeholder && (t.placeholder = t.dataset.placeholder),
              t.classList.remove("_form-focus"),
              t.parentElement.classList.remove("_form-focus"),
              t.hasAttribute("data-validate") && g.validateInput(t));
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
                g.formClean(t);
              }));
        async function s(t, s) {
          if (0 === (e ? g.getErrors(t) : 0)) {
            if (t.hasAttribute("data-ajax")) {
              s.preventDefault();
              const e = t.getAttribute("action")
                  ? t.getAttribute("action").trim()
                  : "#",
                a = t.getAttribute("method")
                  ? t.getAttribute("method").trim()
                  : "GET",
                n = new FormData(t);
              t.classList.add("_sending");
              const l = await fetch(e, { method: a, body: n });
              if (l.ok) {
                await l.json();
                (t.classList.remove("_sending"), i(t));
              } else (alert("Ошибка"), t.classList.remove("_sending"));
            } else t.hasAttribute("data-dev") && (s.preventDefault(), i(t));
          } else {
            s.preventDefault();
            const e = t.querySelector("._form-error");
            e && t.hasAttribute("data-goto-error") && c(e, !0, 1e3);
          }
        }
        function i(e) {
          (document.dispatchEvent(
            new CustomEvent("formSent", { detail: { form: e } }),
          ),
            g.formClean(e),
            o(`[Формы]: ${"Форма отправлена!"}`));
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
              (a(e), n(), e.classList.contains("rating_set") && l(e));
            }
            function a(e) {
              ((t = e.querySelector(".rating__active")),
                (s = e.querySelector(".rating__value")));
            }
            function n(e = s.innerHTML) {
              const i = e / 0.05;
              t.style.width = `${i}%`;
            }
            function l(e) {
              const t = e.querySelectorAll(".rating__item");
              for (let i = 0; i < t.length; i++) {
                const l = t[i];
                (l.addEventListener("mouseenter", function (t) {
                  (a(e), n(l.value));
                }),
                  l.addEventListener("mouseleave", function (e) {
                    n();
                  }),
                  l.addEventListener("click", function (t) {
                    (a(e),
                      e.dataset.ajax
                        ? r(l.value, e)
                        : ((s.innerHTML = i + 1), n()));
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
                    n(),
                    t.classList.remove("rating_sending"));
                } else (alert("Ошибка"), t.classList.remove("rating_sending"));
              }
            }
          })();
      })(),
      (p.selectModule = new u({})));
  })();
})();
