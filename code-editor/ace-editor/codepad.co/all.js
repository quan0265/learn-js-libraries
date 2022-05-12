function userSettings(e, t, n) {
    (this.autorun = e), (this.autosave = t), (this.editorTheme = n);
}
function runPlaygroundCode() {
    (previewIframeLoading = !0),
        $(".loadingIframe").show(),
        $("iframe[name=playgroundPreviewIframe]").hide(),
        $("input[name=HTML]", $("#playgroundPreviewForm")).val($("input[name='component[HTML]']").val()),
        $("input[name=CSS]", $("#playgroundPreviewForm")).val($("input[name='component[CSS]']").val()),
        $("input[name=JavaScript]", $("#playgroundPreviewForm")).val($("input[name='component[JavaScript]']").val()),
        $("input[name='type[HTML]']", $("#playgroundPreviewForm")).val($("input[name='component_lang[HTML]']").val()),
        $("input[name='type[CSS]']", $("#playgroundPreviewForm")).val($("input[name='component_lang[CSS]']").val()),
        $("input[name='type[JavaScript]']", $("#playgroundPreviewForm")).val($("input[name='component_lang[JavaScript]']").val()),
        $("#playgroundPreviewForm [name^='resource']").remove(),
        $(".pg form [name^=resource]").each(function () {
            $("<input type='hidden' value='' />").attr("name", $(this).attr("name")).attr("value", $(this).val()).appendTo("#playgroundPreviewForm");
        }),
        $("#playgroundPreviewForm").submit();
}
function autoSavePlayground() {
    clearTimeout(autosaveTimeoutVar),
        currentUser.autosave &&
            (autosaveTimeoutVar = setTimeout(function () {
                "" == $("#playgroundForm input[name=snippet_title]").val() && $("#playgroundForm input[name=snippet_title]").val("New playground");
                var e = $("#playgroundForm").serialize(),
                    t = $("#playgroundForm").data("autoupdate");
                $.post(t, e)
                    .done(function (e) {
                        void 0 != e.redirect && (window.location = e.redirect);
                    })
                    .fail(function (e) {
                        console.log("error"), console.log(e);
                    }),
                    autoSavePlayground();
            }, 6e4));
}
!(function (e, t) {
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = e.document
              ? t(e, !0)
              : function (e) {
                    if (!e.document) throw new Error("jQuery requires a window with a document");
                    return t(e);
                })
        : t(e);
})("undefined" != typeof window ? window : this, function (e, t) {
    function n(e) {
        var t = "length" in e && e.length,
            n = Z.type(e);
        return "function" !== n && !Z.isWindow(e) && (!(1 !== e.nodeType || !t) || "array" === n || 0 === t || ("number" == typeof t && t > 0 && t - 1 in e));
    }
    function i(e, t, n) {
        if (Z.isFunction(t))
            return Z.grep(e, function (e, i) {
                return !!t.call(e, i, e) !== n;
            });
        if (t.nodeType)
            return Z.grep(e, function (e) {
                return (e === t) !== n;
            });
        if ("string" == typeof t) {
            if (se.test(t)) return Z.filter(t, e, n);
            t = Z.filter(t, e);
        }
        return Z.grep(e, function (e) {
            return X.call(t, e) >= 0 !== n;
        });
    }
    function o(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType; );
        return e;
    }
    function r(e) {
        var t = (he[e] = {});
        return (
            Z.each(e.match(fe) || [], function (e, n) {
                t[n] = !0;
            }),
            t
        );
    }
    function a() {
        Q.removeEventListener("DOMContentLoaded", a, !1), e.removeEventListener("load", a, !1), Z.ready();
    }
    function s() {
        Object.defineProperty((this.cache = {}), 0, {
            get: function () {
                return {};
            },
        }),
            (this.expando = Z.expando + s.uid++);
    }
    function l(e, t, n) {
        var i;
        if (void 0 === n && 1 === e.nodeType)
            if (((i = "data-" + t.replace(xe, "-$1").toLowerCase()), (n = e.getAttribute(i)), "string" == typeof n)) {
                try {
                    n = "true" === n || ("false" !== n && ("null" === n ? null : +n + "" === n ? +n : be.test(n) ? Z.parseJSON(n) : n));
                } catch (o) {}
                ye.set(e, t, n);
            } else n = void 0;
        return n;
    }
    function c() {
        return !0;
    }
    function u() {
        return !1;
    }
    function p() {
        try {
            return Q.activeElement;
        } catch (e) {}
    }
    function d(e, t) {
        return Z.nodeName(e, "table") && Z.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e;
    }
    function f(e) {
        return (e.type = (null !== e.getAttribute("type")) + "/" + e.type), e;
    }
    function h(e) {
        var t = qe.exec(e.type);
        return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
    }
    function g(e, t) {
        for (var n = 0, i = e.length; i > n; n++) ve.set(e[n], "globalEval", !t || ve.get(t[n], "globalEval"));
    }
    function m(e, t) {
        var n, i, o, r, a, s, l, c;
        if (1 === t.nodeType) {
            if (ve.hasData(e) && ((r = ve.access(e)), (a = ve.set(t, r)), (c = r.events))) {
                delete a.handle, (a.events = {});
                for (o in c) for (n = 0, i = c[o].length; i > n; n++) Z.event.add(t, o, c[o][n]);
            }
            ye.hasData(e) && ((s = ye.access(e)), (l = Z.extend({}, s)), ye.set(t, l));
        }
    }
    function v(e, t) {
        var n = e.getElementsByTagName ? e.getElementsByTagName(t || "*") : e.querySelectorAll ? e.querySelectorAll(t || "*") : [];
        return void 0 === t || (t && Z.nodeName(e, t)) ? Z.merge([e], n) : n;
    }
    function y(e, t) {
        var n = t.nodeName.toLowerCase();
        "input" === n && Te.test(e.type) ? (t.checked = e.checked) : ("input" === n || "textarea" === n) && (t.defaultValue = e.defaultValue);
    }
    function b(t, n) {
        var i,
            o = Z(n.createElement(t)).appendTo(n.body),
            r = e.getDefaultComputedStyle && (i = e.getDefaultComputedStyle(o[0])) ? i.display : Z.css(o[0], "display");
        return o.detach(), r;
    }
    function x(e) {
        var t = Q,
            n = Oe[e];
        return (
            n ||
                ((n = b(e, t)),
                ("none" !== n && n) || ((Pe = (Pe || Z("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement)), (t = Pe[0].contentDocument), t.write(), t.close(), (n = b(e, t)), Pe.detach()),
                (Oe[e] = n)),
            n
        );
    }
    function $(e, t, n) {
        var i,
            o,
            r,
            a,
            s = e.style;
        return (
            (n = n || We(e)),
            n && (a = n.getPropertyValue(t) || n[t]),
            n &&
                ("" !== a || Z.contains(e.ownerDocument, e) || (a = Z.style(e, t)),
                Ie.test(a) && Re.test(t) && ((i = s.width), (o = s.minWidth), (r = s.maxWidth), (s.minWidth = s.maxWidth = s.width = a), (a = n.width), (s.width = i), (s.minWidth = o), (s.maxWidth = r))),
            void 0 !== a ? a + "" : a
        );
    }
    function w(e, t) {
        return {
            get: function () {
                return e() ? void delete this.get : (this.get = t).apply(this, arguments);
            },
        };
    }
    function k(e, t) {
        if (t in e) return t;
        for (var n = t[0].toUpperCase() + t.slice(1), i = t, o = Je.length; o--; ) if (((t = Je[o] + n), t in e)) return t;
        return i;
    }
    function T(e, t, n) {
        var i = Ue.exec(t);
        return i ? Math.max(0, i[1] - (n || 0)) + (i[2] || "px") : t;
    }
    function C(e, t, n, i, o) {
        for (var r = n === (i ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; 4 > r; r += 2)
            "margin" === n && (a += Z.css(e, n + we[r], !0, o)),
                i
                    ? ("content" === n && (a -= Z.css(e, "padding" + we[r], !0, o)), "margin" !== n && (a -= Z.css(e, "border" + we[r] + "Width", !0, o)))
                    : ((a += Z.css(e, "padding" + we[r], !0, o)), "padding" !== n && (a += Z.css(e, "border" + we[r] + "Width", !0, o)));
        return a;
    }
    function S(e, t, n) {
        var i = !0,
            o = "width" === t ? e.offsetWidth : e.offsetHeight,
            r = We(e),
            a = "border-box" === Z.css(e, "boxSizing", !1, r);
        if (0 >= o || null == o) {
            if (((o = $(e, t, r)), (0 > o || null == o) && (o = e.style[t]), Ie.test(o))) return o;
            (i = a && (Y.boxSizingReliable() || o === e.style[t])), (o = parseFloat(o) || 0);
        }
        return o + C(e, t, n || (a ? "border" : "content"), i, r) + "px";
    }
    function E(e, t) {
        for (var n, i, o, r = [], a = 0, s = e.length; s > a; a++)
            (i = e[a]),
                i.style &&
                    ((r[a] = ve.get(i, "olddisplay")),
                    (n = i.style.display),
                    t
                        ? (r[a] || "none" !== n || (i.style.display = ""), "" === i.style.display && ke(i) && (r[a] = ve.access(i, "olddisplay", x(i.nodeName))))
                        : ((o = ke(i)), ("none" === n && o) || ve.set(i, "olddisplay", o ? n : Z.css(i, "display"))));
        for (a = 0; s > a; a++) (i = e[a]), i.style && ((t && "none" !== i.style.display && "" !== i.style.display) || (i.style.display = t ? r[a] || "" : "none"));
        return e;
    }
    function _(e, t, n, i, o) {
        return new _.prototype.init(e, t, n, i, o);
    }
    function N() {
        return (
            setTimeout(function () {
                Ye = void 0;
            }),
            (Ye = Z.now())
        );
    }
    function D(e, t) {
        var n,
            i = 0,
            o = { height: e };
        for (t = t ? 1 : 0; 4 > i; i += 2 - t) (n = we[i]), (o["margin" + n] = o["padding" + n] = e);
        return t && (o.opacity = o.width = e), o;
    }
    function j(e, t, n) {
        for (var i, o = (nt[t] || []).concat(nt["*"]), r = 0, a = o.length; a > r; r++) if ((i = o[r].call(n, t, e))) return i;
    }
    function A(e, t, n) {
        var i,
            o,
            r,
            a,
            s,
            l,
            c,
            u,
            p = this,
            d = {},
            f = e.style,
            h = e.nodeType && ke(e),
            g = ve.get(e, "fxshow");
        n.queue ||
            ((s = Z._queueHooks(e, "fx")),
            null == s.unqueued &&
                ((s.unqueued = 0),
                (l = s.empty.fire),
                (s.empty.fire = function () {
                    s.unqueued || l();
                })),
            s.unqueued++,
            p.always(function () {
                p.always(function () {
                    s.unqueued--, Z.queue(e, "fx").length || s.empty.fire();
                });
            })),
            1 === e.nodeType &&
                ("height" in t || "width" in t) &&
                ((n.overflow = [f.overflow, f.overflowX, f.overflowY]),
                (c = Z.css(e, "display")),
                (u = "none" === c ? ve.get(e, "olddisplay") || x(e.nodeName) : c),
                "inline" === u && "none" === Z.css(e, "float") && (f.display = "inline-block")),
            n.overflow &&
                ((f.overflow = "hidden"),
                p.always(function () {
                    (f.overflow = n.overflow[0]), (f.overflowX = n.overflow[1]), (f.overflowY = n.overflow[2]);
                }));
        for (i in t)
            if (((o = t[i]), Ke.exec(o))) {
                if ((delete t[i], (r = r || "toggle" === o), o === (h ? "hide" : "show"))) {
                    if ("show" !== o || !g || void 0 === g[i]) continue;
                    h = !0;
                }
                d[i] = (g && g[i]) || Z.style(e, i);
            } else c = void 0;
        if (Z.isEmptyObject(d)) "inline" === ("none" === c ? x(e.nodeName) : c) && (f.display = c);
        else {
            g ? "hidden" in g && (h = g.hidden) : (g = ve.access(e, "fxshow", {})),
                r && (g.hidden = !h),
                h
                    ? Z(e).show()
                    : p.done(function () {
                          Z(e).hide();
                      }),
                p.done(function () {
                    var t;
                    ve.remove(e, "fxshow");
                    for (t in d) Z.style(e, t, d[t]);
                });
            for (i in d) (a = j(h ? g[i] : 0, i, p)), i in g || ((g[i] = a.start), h && ((a.end = a.start), (a.start = "width" === i || "height" === i ? 1 : 0)));
        }
    }
    function L(e, t) {
        var n, i, o, r, a;
        for (n in e)
            if (((i = Z.camelCase(n)), (o = t[i]), (r = e[n]), Z.isArray(r) && ((o = r[1]), (r = e[n] = r[0])), n !== i && ((e[i] = r), delete e[n]), (a = Z.cssHooks[i]), a && "expand" in a)) {
                (r = a.expand(r)), delete e[i];
                for (n in r) n in e || ((e[n] = r[n]), (t[n] = o));
            } else t[i] = o;
    }
    function z(e, t, n) {
        var i,
            o,
            r = 0,
            a = tt.length,
            s = Z.Deferred().always(function () {
                delete l.elem;
            }),
            l = function () {
                if (o) return !1;
                for (var t = Ye || N(), n = Math.max(0, c.startTime + c.duration - t), i = n / c.duration || 0, r = 1 - i, a = 0, l = c.tweens.length; l > a; a++) c.tweens[a].run(r);
                return s.notifyWith(e, [c, r, n]), 1 > r && l ? n : (s.resolveWith(e, [c]), !1);
            },
            c = s.promise({
                elem: e,
                props: Z.extend({}, t),
                opts: Z.extend(!0, { specialEasing: {} }, n),
                originalProperties: t,
                originalOptions: n,
                startTime: Ye || N(),
                duration: n.duration,
                tweens: [],
                createTween: function (t, n) {
                    var i = Z.Tween(e, c.opts, t, n, c.opts.specialEasing[t] || c.opts.easing);
                    return c.tweens.push(i), i;
                },
                stop: function (t) {
                    var n = 0,
                        i = t ? c.tweens.length : 0;
                    if (o) return this;
                    for (o = !0; i > n; n++) c.tweens[n].run(1);
                    return t ? s.resolveWith(e, [c, t]) : s.rejectWith(e, [c, t]), this;
                },
            }),
            u = c.props;
        for (L(u, c.opts.specialEasing); a > r; r++) if ((i = tt[r].call(c, e, u, c.opts))) return i;
        return (
            Z.map(u, j, c),
            Z.isFunction(c.opts.start) && c.opts.start.call(e, c),
            Z.fx.timer(Z.extend(l, { elem: e, anim: c, queue: c.opts.queue })),
            c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        );
    }
    function H(e) {
        return function (t, n) {
            "string" != typeof t && ((n = t), (t = "*"));
            var i,
                o = 0,
                r = t.toLowerCase().match(fe) || [];
            if (Z.isFunction(n)) for (; (i = r[o++]); ) "+" === i[0] ? ((i = i.slice(1) || "*"), (e[i] = e[i] || []).unshift(n)) : (e[i] = e[i] || []).push(n);
        };
    }
    function q(e, t, n, i) {
        function o(s) {
            var l;
            return (
                (r[s] = !0),
                Z.each(e[s] || [], function (e, s) {
                    var c = s(t, n, i);
                    return "string" != typeof c || a || r[c] ? (a ? !(l = c) : void 0) : (t.dataTypes.unshift(c), o(c), !1);
                }),
                l
            );
        }
        var r = {},
            a = e === bt;
        return o(t.dataTypes[0]) || (!r["*"] && o("*"));
    }
    function M(e, t) {
        var n,
            i,
            o = Z.ajaxSettings.flatOptions || {};
        for (n in t) void 0 !== t[n] && ((o[n] ? e : i || (i = {}))[n] = t[n]);
        return i && Z.extend(!0, e, i), e;
    }
    function F(e, t, n) {
        for (var i, o, r, a, s = e.contents, l = e.dataTypes; "*" === l[0]; ) l.shift(), void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (o in s)
                if (s[o] && s[o].test(i)) {
                    l.unshift(o);
                    break;
                }
        if (l[0] in n) r = l[0];
        else {
            for (o in n) {
                if (!l[0] || e.converters[o + " " + l[0]]) {
                    r = o;
                    break;
                }
                a || (a = o);
            }
            r = r || a;
        }
        return r ? (r !== l[0] && l.unshift(r), n[r]) : void 0;
    }
    function P(e, t, n, i) {
        var o,
            r,
            a,
            s,
            l,
            c = {},
            u = e.dataTypes.slice();
        if (u[1]) for (a in e.converters) c[a.toLowerCase()] = e.converters[a];
        for (r = u.shift(); r; )
            if ((e.responseFields[r] && (n[e.responseFields[r]] = t), !l && i && e.dataFilter && (t = e.dataFilter(t, e.dataType)), (l = r), (r = u.shift())))
                if ("*" === r) r = l;
                else if ("*" !== l && l !== r) {
                    if (((a = c[l + " " + r] || c["* " + r]), !a))
                        for (o in c)
                            if (((s = o.split(" ")), s[1] === r && (a = c[l + " " + s[0]] || c["* " + s[0]]))) {
                                a === !0 ? (a = c[o]) : c[o] !== !0 && ((r = s[0]), u.unshift(s[1]));
                                break;
                            }
                    if (a !== !0)
                        if (a && e["throws"]) t = a(t);
                        else
                            try {
                                t = a(t);
                            } catch (p) {
                                return { state: "parsererror", error: a ? p : "No conversion from " + l + " to " + r };
                            }
                }
        return { state: "success", data: t };
    }
    function O(e, t, n, i) {
        var o;
        if (Z.isArray(t))
            Z.each(t, function (t, o) {
                n || Tt.test(e) ? i(e, o) : O(e + "[" + ("object" == typeof o ? t : "") + "]", o, n, i);
            });
        else if (n || "object" !== Z.type(t)) i(e, t);
        else for (o in t) O(e + "[" + o + "]", t[o], n, i);
    }
    function R(e) {
        return Z.isWindow(e) ? e : 9 === e.nodeType && e.defaultView;
    }
    var I = [],
        W = I.slice,
        B = I.concat,
        U = I.push,
        X = I.indexOf,
        G = {},
        V = G.toString,
        J = G.hasOwnProperty,
        Y = {},
        Q = e.document,
        K = "2.1.4",
        Z = function (e, t) {
            return new Z.fn.init(e, t);
        },
        ee = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        te = /^-ms-/,
        ne = /-([\da-z])/gi,
        ie = function (e, t) {
            return t.toUpperCase();
        };
    (Z.fn = Z.prototype = {
        jquery: K,
        constructor: Z,
        selector: "",
        length: 0,
        toArray: function () {
            return W.call(this);
        },
        get: function (e) {
            return null != e ? (0 > e ? this[e + this.length] : this[e]) : W.call(this);
        },
        pushStack: function (e) {
            var t = Z.merge(this.constructor(), e);
            return (t.prevObject = this), (t.context = this.context), t;
        },
        each: function (e, t) {
            return Z.each(this, e, t);
        },
        map: function (e) {
            return this.pushStack(
                Z.map(this, function (t, n) {
                    return e.call(t, n, t);
                })
            );
        },
        slice: function () {
            return this.pushStack(W.apply(this, arguments));
        },
        first: function () {
            return this.eq(0);
        },
        last: function () {
            return this.eq(-1);
        },
        eq: function (e) {
            var t = this.length,
                n = +e + (0 > e ? t : 0);
            return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
        },
        end: function () {
            return this.prevObject || this.constructor(null);
        },
        push: U,
        sort: I.sort,
        splice: I.splice,
    }),
        (Z.extend = Z.fn.extend = function () {
            var e,
                t,
                n,
                i,
                o,
                r,
                a = arguments[0] || {},
                s = 1,
                l = arguments.length,
                c = !1;
            for ("boolean" == typeof a && ((c = a), (a = arguments[s] || {}), s++), "object" == typeof a || Z.isFunction(a) || (a = {}), s === l && ((a = this), s--); l > s; s++)
                if (null != (e = arguments[s]))
                    for (t in e)
                        (n = a[t]),
                            (i = e[t]),
                            a !== i &&
                                (c && i && (Z.isPlainObject(i) || (o = Z.isArray(i))) ? (o ? ((o = !1), (r = n && Z.isArray(n) ? n : [])) : (r = n && Z.isPlainObject(n) ? n : {}), (a[t] = Z.extend(c, r, i))) : void 0 !== i && (a[t] = i));
            return a;
        }),
        Z.extend({
            expando: "jQuery" + (K + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (e) {
                throw new Error(e);
            },
            noop: function () {},
            isFunction: function (e) {
                return "function" === Z.type(e);
            },
            isArray: Array.isArray,
            isWindow: function (e) {
                return null != e && e === e.window;
            },
            isNumeric: function (e) {
                return !Z.isArray(e) && e - parseFloat(e) + 1 >= 0;
            },
            isPlainObject: function (e) {
                return "object" === Z.type(e) && !e.nodeType && !Z.isWindow(e) && !(e.constructor && !J.call(e.constructor.prototype, "isPrototypeOf"));
            },
            isEmptyObject: function (e) {
                var t;
                for (t in e) return !1;
                return !0;
            },
            type: function (e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? G[V.call(e)] || "object" : typeof e;
            },
            globalEval: function (e) {
                var t,
                    n = eval;
                (e = Z.trim(e)), e && (1 === e.indexOf("use strict") ? ((t = Q.createElement("script")), (t.text = e), Q.head.appendChild(t).parentNode.removeChild(t)) : n(e));
            },
            camelCase: function (e) {
                return e.replace(te, "ms-").replace(ne, ie);
            },
            nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
            },
            each: function (e, t, i) {
                var o,
                    r = 0,
                    a = e.length,
                    s = n(e);
                if (i) {
                    if (s) for (; a > r && ((o = t.apply(e[r], i)), o !== !1); r++);
                    else for (r in e) if (((o = t.apply(e[r], i)), o === !1)) break;
                } else if (s) for (; a > r && ((o = t.call(e[r], r, e[r])), o !== !1); r++);
                else for (r in e) if (((o = t.call(e[r], r, e[r])), o === !1)) break;
                return e;
            },
            trim: function (e) {
                return null == e ? "" : (e + "").replace(ee, "");
            },
            makeArray: function (e, t) {
                var i = t || [];
                return null != e && (n(Object(e)) ? Z.merge(i, "string" == typeof e ? [e] : e) : U.call(i, e)), i;
            },
            inArray: function (e, t, n) {
                return null == t ? -1 : X.call(t, e, n);
            },
            merge: function (e, t) {
                for (var n = +t.length, i = 0, o = e.length; n > i; i++) e[o++] = t[i];
                return (e.length = o), e;
            },
            grep: function (e, t, n) {
                for (var i, o = [], r = 0, a = e.length, s = !n; a > r; r++) (i = !t(e[r], r)), i !== s && o.push(e[r]);
                return o;
            },
            map: function (e, t, i) {
                var o,
                    r = 0,
                    a = e.length,
                    s = n(e),
                    l = [];
                if (s) for (; a > r; r++) (o = t(e[r], r, i)), null != o && l.push(o);
                else for (r in e) (o = t(e[r], r, i)), null != o && l.push(o);
                return B.apply([], l);
            },
            guid: 1,
            proxy: function (e, t) {
                var n, i, o;
                return (
                    "string" == typeof t && ((n = e[t]), (t = e), (e = n)),
                    Z.isFunction(e)
                        ? ((i = W.call(arguments, 2)),
                          (o = function () {
                              return e.apply(t || this, i.concat(W.call(arguments)));
                          }),
                          (o.guid = e.guid = e.guid || Z.guid++),
                          o)
                        : void 0
                );
            },
            now: Date.now,
            support: Y,
        }),
        Z.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function (e, t) {
            G["[object " + t + "]"] = t.toLowerCase();
        });
    var oe = (function (e) {
        function t(e, t, n, i) {
            var o, r, a, s, l, c, p, f, h, g;
            if (((t ? t.ownerDocument || t : O) !== A && j(t), (t = t || A), (n = n || []), (s = t.nodeType), "string" != typeof e || !e || (1 !== s && 9 !== s && 11 !== s))) return n;
            if (!i && z) {
                if (11 !== s && (o = ye.exec(e)))
                    if ((a = o[1])) {
                        if (9 === s) {
                            if (((r = t.getElementById(a)), !r || !r.parentNode)) return n;
                            if (r.id === a) return n.push(r), n;
                        } else if (t.ownerDocument && (r = t.ownerDocument.getElementById(a)) && F(t, r) && r.id === a) return n.push(r), n;
                    } else {
                        if (o[2]) return K.apply(n, t.getElementsByTagName(e)), n;
                        if ((a = o[3]) && $.getElementsByClassName) return K.apply(n, t.getElementsByClassName(a)), n;
                    }
                if ($.qsa && (!H || !H.test(e))) {
                    if (((f = p = P), (h = t), (g = 1 !== s && e), 1 === s && "object" !== t.nodeName.toLowerCase())) {
                        for (c = C(e), (p = t.getAttribute("id")) ? (f = p.replace(xe, "\\$&")) : t.setAttribute("id", f), f = "[id='" + f + "'] ", l = c.length; l--; ) c[l] = f + d(c[l]);
                        (h = (be.test(e) && u(t.parentNode)) || t), (g = c.join(","));
                    }
                    if (g)
                        try {
                            return K.apply(n, h.querySelectorAll(g)), n;
                        } catch (m) {
                        } finally {
                            p || t.removeAttribute("id");
                        }
                }
            }
            return E(e.replace(le, "$1"), t, n, i);
        }
        function n() {
            function e(n, i) {
                return t.push(n + " ") > w.cacheLength && delete e[t.shift()], (e[n + " "] = i);
            }
            var t = [];
            return e;
        }
        function i(e) {
            return (e[P] = !0), e;
        }
        function o(e) {
            var t = A.createElement("div");
            try {
                return !!e(t);
            } catch (n) {
                return !1;
            } finally {
                t.parentNode && t.parentNode.removeChild(t), (t = null);
            }
        }
        function r(e, t) {
            for (var n = e.split("|"), i = e.length; i--; ) w.attrHandle[n[i]] = t;
        }
        function a(e, t) {
            var n = t && e,
                i = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || G) - (~e.sourceIndex || G);
            if (i) return i;
            if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
            return e ? 1 : -1;
        }
        function s(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return "input" === n && t.type === e;
            };
        }
        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e;
            };
        }
        function c(e) {
            return i(function (t) {
                return (
                    (t = +t),
                    i(function (n, i) {
                        for (var o, r = e([], n.length, t), a = r.length; a--; ) n[(o = r[a])] && (n[o] = !(i[o] = n[o]));
                    })
                );
            });
        }
        function u(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e;
        }
        function p() {}
        function d(e) {
            for (var t = 0, n = e.length, i = ""; n > t; t++) i += e[t].value;
            return i;
        }
        function f(e, t, n) {
            var i = t.dir,
                o = n && "parentNode" === i,
                r = I++;
            return t.first
                ? function (t, n, r) {
                      for (; (t = t[i]); ) if (1 === t.nodeType || o) return e(t, n, r);
                  }
                : function (t, n, a) {
                      var s,
                          l,
                          c = [R, r];
                      if (a) {
                          for (; (t = t[i]); ) if ((1 === t.nodeType || o) && e(t, n, a)) return !0;
                      } else
                          for (; (t = t[i]); )
                              if (1 === t.nodeType || o) {
                                  if (((l = t[P] || (t[P] = {})), (s = l[i]) && s[0] === R && s[1] === r)) return (c[2] = s[2]);
                                  if (((l[i] = c), (c[2] = e(t, n, a)))) return !0;
                              }
                  };
        }
        function h(e) {
            return e.length > 1
                ? function (t, n, i) {
                      for (var o = e.length; o--; ) if (!e[o](t, n, i)) return !1;
                      return !0;
                  }
                : e[0];
        }
        function g(e, n, i) {
            for (var o = 0, r = n.length; r > o; o++) t(e, n[o], i);
            return i;
        }
        function m(e, t, n, i, o) {
            for (var r, a = [], s = 0, l = e.length, c = null != t; l > s; s++) (r = e[s]) && (!n || n(r, i, o)) && (a.push(r), c && t.push(s));
            return a;
        }
        function v(e, t, n, o, r, a) {
            return (
                o && !o[P] && (o = v(o)),
                r && !r[P] && (r = v(r, a)),
                i(function (i, a, s, l) {
                    var c,
                        u,
                        p,
                        d = [],
                        f = [],
                        h = a.length,
                        v = i || g(t || "*", s.nodeType ? [s] : s, []),
                        y = !e || (!i && t) ? v : m(v, d, e, s, l),
                        b = n ? (r || (i ? e : h || o) ? [] : a) : y;
                    if ((n && n(y, b, s, l), o)) for (c = m(b, f), o(c, [], s, l), u = c.length; u--; ) (p = c[u]) && (b[f[u]] = !(y[f[u]] = p));
                    if (i) {
                        if (r || e) {
                            if (r) {
                                for (c = [], u = b.length; u--; ) (p = b[u]) && c.push((y[u] = p));
                                r(null, (b = []), c, l);
                            }
                            for (u = b.length; u--; ) (p = b[u]) && (c = r ? ee(i, p) : d[u]) > -1 && (i[c] = !(a[c] = p));
                        }
                    } else (b = m(b === a ? b.splice(h, b.length) : b)), r ? r(null, a, b, l) : K.apply(a, b);
                })
            );
        }
        function y(e) {
            for (
                var t,
                    n,
                    i,
                    o = e.length,
                    r = w.relative[e[0].type],
                    a = r || w.relative[" "],
                    s = r ? 1 : 0,
                    l = f(
                        function (e) {
                            return e === t;
                        },
                        a,
                        !0
                    ),
                    c = f(
                        function (e) {
                            return ee(t, e) > -1;
                        },
                        a,
                        !0
                    ),
                    u = [
                        function (e, n, i) {
                            var o = (!r && (i || n !== _)) || ((t = n).nodeType ? l(e, n, i) : c(e, n, i));
                            return (t = null), o;
                        },
                    ];
                o > s;
                s++
            )
                if ((n = w.relative[e[s].type])) u = [f(h(u), n)];
                else {
                    if (((n = w.filter[e[s].type].apply(null, e[s].matches)), n[P])) {
                        for (i = ++s; o > i && !w.relative[e[i].type]; i++);
                        return v(s > 1 && h(u), s > 1 && d(e.slice(0, s - 1).concat({ value: " " === e[s - 2].type ? "*" : "" })).replace(le, "$1"), n, i > s && y(e.slice(s, i)), o > i && y((e = e.slice(i))), o > i && d(e));
                    }
                    u.push(n);
                }
            return h(u);
        }
        function b(e, n) {
            var o = n.length > 0,
                r = e.length > 0,
                a = function (i, a, s, l, c) {
                    var u,
                        p,
                        d,
                        f = 0,
                        h = "0",
                        g = i && [],
                        v = [],
                        y = _,
                        b = i || (r && w.find.TAG("*", c)),
                        x = (R += null == y ? 1 : Math.random() || 0.1),
                        $ = b.length;
                    for (c && (_ = a !== A && a); h !== $ && null != (u = b[h]); h++) {
                        if (r && u) {
                            for (p = 0; (d = e[p++]); )
                                if (d(u, a, s)) {
                                    l.push(u);
                                    break;
                                }
                            c && (R = x);
                        }
                        o && ((u = !d && u) && f--, i && g.push(u));
                    }
                    if (((f += h), o && h !== f)) {
                        for (p = 0; (d = n[p++]); ) d(g, v, a, s);
                        if (i) {
                            if (f > 0) for (; h--; ) g[h] || v[h] || (v[h] = Y.call(l));
                            v = m(v);
                        }
                        K.apply(l, v), c && !i && v.length > 0 && f + n.length > 1 && t.uniqueSort(l);
                    }
                    return c && ((R = x), (_ = y)), g;
                };
            return o ? i(a) : a;
        }
        var x,
            $,
            w,
            k,
            T,
            C,
            S,
            E,
            _,
            N,
            D,
            j,
            A,
            L,
            z,
            H,
            q,
            M,
            F,
            P = "sizzle" + 1 * new Date(),
            O = e.document,
            R = 0,
            I = 0,
            W = n(),
            B = n(),
            U = n(),
            X = function (e, t) {
                return e === t && (D = !0), 0;
            },
            G = 1 << 31,
            V = {}.hasOwnProperty,
            J = [],
            Y = J.pop,
            Q = J.push,
            K = J.push,
            Z = J.slice,
            ee = function (e, t) {
                for (var n = 0, i = e.length; i > n; n++) if (e[n] === t) return n;
                return -1;
            },
            te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            ne = "[\\x20\\t\\r\\n\\f]",
            ie = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            oe = ie.replace("w", "w#"),
            re = "\\[" + ne + "*(" + ie + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + oe + "))|)" + ne + "*\\]",
            ae = ":(" + ie + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + re + ")*)|.*)\\)|)",
            se = new RegExp(ne + "+", "g"),
            le = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"),
            ce = new RegExp("^" + ne + "*," + ne + "*"),
            ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"),
            pe = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"),
            de = new RegExp(ae),
            fe = new RegExp("^" + oe + "$"),
            he = {
                ID: new RegExp("^#(" + ie + ")"),
                CLASS: new RegExp("^\\.(" + ie + ")"),
                TAG: new RegExp("^(" + ie.replace("w", "w*") + ")"),
                ATTR: new RegExp("^" + re),
                PSEUDO: new RegExp("^" + ae),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + te + ")$", "i"),
                needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i"),
            },
            ge = /^(?:input|select|textarea|button)$/i,
            me = /^h\d$/i,
            ve = /^[^{]+\{\s*\[native \w/,
            ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            be = /[+~]/,
            xe = /'|\\/g,
            $e = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"),
            we = function (e, t, n) {
                var i = "0x" + t - 65536;
                return i !== i || n ? t : 0 > i ? String.fromCharCode(i + 65536) : String.fromCharCode((i >> 10) | 55296, (1023 & i) | 56320);
            },
            ke = function () {
                j();
            };
        try {
            K.apply((J = Z.call(O.childNodes)), O.childNodes), J[O.childNodes.length].nodeType;
        } catch (Te) {
            K = {
                apply: J.length
                    ? function (e, t) {
                          Q.apply(e, Z.call(t));
                      }
                    : function (e, t) {
                          for (var n = e.length, i = 0; (e[n++] = t[i++]); );
                          e.length = n - 1;
                      },
            };
        }
        ($ = t.support = {}),
            (T = t.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName;
            }),
            (j = t.setDocument = function (e) {
                var t,
                    n,
                    i = e ? e.ownerDocument || e : O;
                return i !== A && 9 === i.nodeType && i.documentElement
                    ? ((A = i),
                      (L = i.documentElement),
                      (n = i.defaultView),
                      n && n !== n.top && (n.addEventListener ? n.addEventListener("unload", ke, !1) : n.attachEvent && n.attachEvent("onunload", ke)),
                      (z = !T(i)),
                      ($.attributes = o(function (e) {
                          return (e.className = "i"), !e.getAttribute("className");
                      })),
                      ($.getElementsByTagName = o(function (e) {
                          return e.appendChild(i.createComment("")), !e.getElementsByTagName("*").length;
                      })),
                      ($.getElementsByClassName = ve.test(i.getElementsByClassName)),
                      ($.getById = o(function (e) {
                          return (L.appendChild(e).id = P), !i.getElementsByName || !i.getElementsByName(P).length;
                      })),
                      $.getById
                          ? ((w.find.ID = function (e, t) {
                                if ("undefined" != typeof t.getElementById && z) {
                                    var n = t.getElementById(e);
                                    return n && n.parentNode ? [n] : [];
                                }
                            }),
                            (w.filter.ID = function (e) {
                                var t = e.replace($e, we);
                                return function (e) {
                                    return e.getAttribute("id") === t;
                                };
                            }))
                          : (delete w.find.ID,
                            (w.filter.ID = function (e) {
                                var t = e.replace($e, we);
                                return function (e) {
                                    var n = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                                    return n && n.value === t;
                                };
                            })),
                      (w.find.TAG = $.getElementsByTagName
                          ? function (e, t) {
                                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : $.qsa ? t.querySelectorAll(e) : void 0;
                            }
                          : function (e, t) {
                                var n,
                                    i = [],
                                    o = 0,
                                    r = t.getElementsByTagName(e);
                                if ("*" === e) {
                                    for (; (n = r[o++]); ) 1 === n.nodeType && i.push(n);
                                    return i;
                                }
                                return r;
                            }),
                      (w.find.CLASS =
                          $.getElementsByClassName &&
                          function (e, t) {
                              return z ? t.getElementsByClassName(e) : void 0;
                          }),
                      (q = []),
                      (H = []),
                      ($.qsa = ve.test(i.querySelectorAll)) &&
                          (o(function (e) {
                              (L.appendChild(e).innerHTML = "<a id='" + P + "'></a><select id='" + P + "-\f]' msallowcapture=''><option selected=''></option></select>"),
                                  e.querySelectorAll("[msallowcapture^='']").length && H.push("[*^$]=" + ne + "*(?:''|\"\")"),
                                  e.querySelectorAll("[selected]").length || H.push("\\[" + ne + "*(?:value|" + te + ")"),
                                  e.querySelectorAll("[id~=" + P + "-]").length || H.push("~="),
                                  e.querySelectorAll(":checked").length || H.push(":checked"),
                                  e.querySelectorAll("a#" + P + "+*").length || H.push(".#.+[+~]");
                          }),
                          o(function (e) {
                              var t = i.createElement("input");
                              t.setAttribute("type", "hidden"),
                                  e.appendChild(t).setAttribute("name", "D"),
                                  e.querySelectorAll("[name=d]").length && H.push("name" + ne + "*[*^$|!~]?="),
                                  e.querySelectorAll(":enabled").length || H.push(":enabled", ":disabled"),
                                  e.querySelectorAll("*,:x"),
                                  H.push(",.*:");
                          })),
                      ($.matchesSelector = ve.test((M = L.matches || L.webkitMatchesSelector || L.mozMatchesSelector || L.oMatchesSelector || L.msMatchesSelector))) &&
                          o(function (e) {
                              ($.disconnectedMatch = M.call(e, "div")), M.call(e, "[s!='']:x"), q.push("!=", ae);
                          }),
                      (H = H.length && new RegExp(H.join("|"))),
                      (q = q.length && new RegExp(q.join("|"))),
                      (t = ve.test(L.compareDocumentPosition)),
                      (F =
                          t || ve.test(L.contains)
                              ? function (e, t) {
                                    var n = 9 === e.nodeType ? e.documentElement : e,
                                        i = t && t.parentNode;
                                    return e === i || !(!i || 1 !== i.nodeType || !(n.contains ? n.contains(i) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(i)));
                                }
                              : function (e, t) {
                                    if (t) for (; (t = t.parentNode); ) if (t === e) return !0;
                                    return !1;
                                }),
                      (X = t
                          ? function (e, t) {
                                if (e === t) return (D = !0), 0;
                                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                                return n
                                    ? n
                                    : ((n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1),
                                      1 & n || (!$.sortDetached && t.compareDocumentPosition(e) === n)
                                          ? e === i || (e.ownerDocument === O && F(O, e))
                                              ? -1
                                              : t === i || (t.ownerDocument === O && F(O, t))
                                              ? 1
                                              : N
                                              ? ee(N, e) - ee(N, t)
                                              : 0
                                          : 4 & n
                                          ? -1
                                          : 1);
                            }
                          : function (e, t) {
                                if (e === t) return (D = !0), 0;
                                var n,
                                    o = 0,
                                    r = e.parentNode,
                                    s = t.parentNode,
                                    l = [e],
                                    c = [t];
                                if (!r || !s) return e === i ? -1 : t === i ? 1 : r ? -1 : s ? 1 : N ? ee(N, e) - ee(N, t) : 0;
                                if (r === s) return a(e, t);
                                for (n = e; (n = n.parentNode); ) l.unshift(n);
                                for (n = t; (n = n.parentNode); ) c.unshift(n);
                                for (; l[o] === c[o]; ) o++;
                                return o ? a(l[o], c[o]) : l[o] === O ? -1 : c[o] === O ? 1 : 0;
                            }),
                      i)
                    : A;
            }),
            (t.matches = function (e, n) {
                return t(e, null, null, n);
            }),
            (t.matchesSelector = function (e, n) {
                if (((e.ownerDocument || e) !== A && j(e), (n = n.replace(pe, "='$1']")), !(!$.matchesSelector || !z || (q && q.test(n)) || (H && H.test(n)))))
                    try {
                        var i = M.call(e, n);
                        if (i || $.disconnectedMatch || (e.document && 11 !== e.document.nodeType)) return i;
                    } catch (o) {}
                return t(n, A, null, [e]).length > 0;
            }),
            (t.contains = function (e, t) {
                return (e.ownerDocument || e) !== A && j(e), F(e, t);
            }),
            (t.attr = function (e, t) {
                (e.ownerDocument || e) !== A && j(e);
                var n = w.attrHandle[t.toLowerCase()],
                    i = n && V.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !z) : void 0;
                return void 0 !== i ? i : $.attributes || !z ? e.getAttribute(t) : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
            }),
            (t.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e);
            }),
            (t.uniqueSort = function (e) {
                var t,
                    n = [],
                    i = 0,
                    o = 0;
                if (((D = !$.detectDuplicates), (N = !$.sortStable && e.slice(0)), e.sort(X), D)) {
                    for (; (t = e[o++]); ) t === e[o] && (i = n.push(o));
                    for (; i--; ) e.splice(n[i], 1);
                }
                return (N = null), e;
            }),
            (k = t.getText = function (e) {
                var t,
                    n = "",
                    i = 0,
                    o = e.nodeType;
                if (o) {
                    if (1 === o || 9 === o || 11 === o) {
                        if ("string" == typeof e.textContent) return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling) n += k(e);
                    } else if (3 === o || 4 === o) return e.nodeValue;
                } else for (; (t = e[i++]); ) n += k(t);
                return n;
            }),
            (w = t.selectors = {
                cacheLength: 50,
                createPseudo: i,
                match: he,
                attrHandle: {},
                find: {},
                relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } },
                preFilter: {
                    ATTR: function (e) {
                        return (e[1] = e[1].replace($e, we)), (e[3] = (e[3] || e[4] || e[5] || "").replace($e, we)), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4);
                    },
                    CHILD: function (e) {
                        return (
                            (e[1] = e[1].toLowerCase()),
                            "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]), (e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3]))), (e[5] = +(e[7] + e[8] || "odd" === e[3]))) : e[3] && t.error(e[0]),
                            e
                        );
                    },
                    PSEUDO: function (e) {
                        var t,
                            n = !e[6] && e[2];
                        return he.CHILD.test(e[0])
                            ? null
                            : (e[3] ? (e[2] = e[4] || e[5] || "") : n && de.test(n) && (t = C(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))), e.slice(0, 3));
                    },
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace($e, we).toLowerCase();
                        return "*" === e
                            ? function () {
                                  return !0;
                              }
                            : function (e) {
                                  return e.nodeName && e.nodeName.toLowerCase() === t;
                              };
                    },
                    CLASS: function (e) {
                        var t = W[e + " "];
                        return (
                            t ||
                            ((t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) &&
                                W(e, function (e) {
                                    return t.test(("string" == typeof e.className && e.className) || ("undefined" != typeof e.getAttribute && e.getAttribute("class")) || "");
                                }))
                        );
                    },
                    ATTR: function (e, n, i) {
                        return function (o) {
                            var r = t.attr(o, e);
                            return null == r
                                ? "!=" === n
                                : !n ||
                                      ((r += ""),
                                      "=" === n
                                          ? r === i
                                          : "!=" === n
                                          ? r !== i
                                          : "^=" === n
                                          ? i && 0 === r.indexOf(i)
                                          : "*=" === n
                                          ? i && r.indexOf(i) > -1
                                          : "$=" === n
                                          ? i && r.slice(-i.length) === i
                                          : "~=" === n
                                          ? (" " + r.replace(se, " ") + " ").indexOf(i) > -1
                                          : "|=" === n && (r === i || r.slice(0, i.length + 1) === i + "-"));
                        };
                    },
                    CHILD: function (e, t, n, i, o) {
                        var r = "nth" !== e.slice(0, 3),
                            a = "last" !== e.slice(-4),
                            s = "of-type" === t;
                        return 1 === i && 0 === o
                            ? function (e) {
                                  return !!e.parentNode;
                              }
                            : function (t, n, l) {
                                  var c,
                                      u,
                                      p,
                                      d,
                                      f,
                                      h,
                                      g = r !== a ? "nextSibling" : "previousSibling",
                                      m = t.parentNode,
                                      v = s && t.nodeName.toLowerCase(),
                                      y = !l && !s;
                                  if (m) {
                                      if (r) {
                                          for (; g; ) {
                                              for (p = t; (p = p[g]); ) if (s ? p.nodeName.toLowerCase() === v : 1 === p.nodeType) return !1;
                                              h = g = "only" === e && !h && "nextSibling";
                                          }
                                          return !0;
                                      }
                                      if (((h = [a ? m.firstChild : m.lastChild]), a && y)) {
                                          for (u = m[P] || (m[P] = {}), c = u[e] || [], f = c[0] === R && c[1], d = c[0] === R && c[2], p = f && m.childNodes[f]; (p = (++f && p && p[g]) || (d = f = 0) || h.pop()); )
                                              if (1 === p.nodeType && ++d && p === t) {
                                                  u[e] = [R, f, d];
                                                  break;
                                              }
                                      } else if (y && (c = (t[P] || (t[P] = {}))[e]) && c[0] === R) d = c[1];
                                      else for (; (p = (++f && p && p[g]) || (d = f = 0) || h.pop()) && ((s ? p.nodeName.toLowerCase() !== v : 1 !== p.nodeType) || !++d || (y && ((p[P] || (p[P] = {}))[e] = [R, d]), p !== t)); );
                                      return (d -= o), d === i || (d % i === 0 && d / i >= 0);
                                  }
                              };
                    },
                    PSEUDO: function (e, n) {
                        var o,
                            r = w.pseudos[e] || w.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return r[P]
                            ? r(n)
                            : r.length > 1
                            ? ((o = [e, e, "", n]),
                              w.setFilters.hasOwnProperty(e.toLowerCase())
                                  ? i(function (e, t) {
                                        for (var i, o = r(e, n), a = o.length; a--; ) (i = ee(e, o[a])), (e[i] = !(t[i] = o[a]));
                                    })
                                  : function (e) {
                                        return r(e, 0, o);
                                    })
                            : r;
                    },
                },
                pseudos: {
                    not: i(function (e) {
                        var t = [],
                            n = [],
                            o = S(e.replace(le, "$1"));
                        return o[P]
                            ? i(function (e, t, n, i) {
                                  for (var r, a = o(e, null, i, []), s = e.length; s--; ) (r = a[s]) && (e[s] = !(t[s] = r));
                              })
                            : function (e, i, r) {
                                  return (t[0] = e), o(t, null, r, n), (t[0] = null), !n.pop();
                              };
                    }),
                    has: i(function (e) {
                        return function (n) {
                            return t(e, n).length > 0;
                        };
                    }),
                    contains: i(function (e) {
                        return (
                            (e = e.replace($e, we)),
                            function (t) {
                                return (t.textContent || t.innerText || k(t)).indexOf(e) > -1;
                            }
                        );
                    }),
                    lang: i(function (e) {
                        return (
                            fe.test(e || "") || t.error("unsupported lang: " + e),
                            (e = e.replace($e, we).toLowerCase()),
                            function (t) {
                                var n;
                                do if ((n = z ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))) return (n = n.toLowerCase()), n === e || 0 === n.indexOf(e + "-");
                                while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1;
                            }
                        );
                    }),
                    target: function (t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id;
                    },
                    root: function (e) {
                        return e === L;
                    },
                    focus: function (e) {
                        return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
                    },
                    enabled: function (e) {
                        return e.disabled === !1;
                    },
                    disabled: function (e) {
                        return e.disabled === !0;
                    },
                    checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t && !!e.checked) || ("option" === t && !!e.selected);
                    },
                    selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
                    },
                    empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling) if (e.nodeType < 6) return !1;
                        return !0;
                    },
                    parent: function (e) {
                        return !w.pseudos.empty(e);
                    },
                    header: function (e) {
                        return me.test(e.nodeName);
                    },
                    input: function (e) {
                        return ge.test(e.nodeName);
                    },
                    button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return ("input" === t && "button" === e.type) || "button" === t;
                    },
                    text: function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase());
                    },
                    first: c(function () {
                        return [0];
                    }),
                    last: c(function (e, t) {
                        return [t - 1];
                    }),
                    eq: c(function (e, t, n) {
                        return [0 > n ? n + t : n];
                    }),
                    even: c(function (e, t) {
                        for (var n = 0; t > n; n += 2) e.push(n);
                        return e;
                    }),
                    odd: c(function (e, t) {
                        for (var n = 1; t > n; n += 2) e.push(n);
                        return e;
                    }),
                    lt: c(function (e, t, n) {
                        for (var i = 0 > n ? n + t : n; --i >= 0; ) e.push(i);
                        return e;
                    }),
                    gt: c(function (e, t, n) {
                        for (var i = 0 > n ? n + t : n; ++i < t; ) e.push(i);
                        return e;
                    }),
                },
            }),
            (w.pseudos.nth = w.pseudos.eq);
        for (x in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) w.pseudos[x] = s(x);
        for (x in { submit: !0, reset: !0 }) w.pseudos[x] = l(x);
        return (
            (p.prototype = w.filters = w.pseudos),
            (w.setFilters = new p()),
            (C = t.tokenize = function (e, n) {
                var i,
                    o,
                    r,
                    a,
                    s,
                    l,
                    c,
                    u = B[e + " "];
                if (u) return n ? 0 : u.slice(0);
                for (s = e, l = [], c = w.preFilter; s; ) {
                    (!i || (o = ce.exec(s))) && (o && (s = s.slice(o[0].length) || s), l.push((r = []))), (i = !1), (o = ue.exec(s)) && ((i = o.shift()), r.push({ value: i, type: o[0].replace(le, " ") }), (s = s.slice(i.length)));
                    for (a in w.filter) !(o = he[a].exec(s)) || (c[a] && !(o = c[a](o))) || ((i = o.shift()), r.push({ value: i, type: a, matches: o }), (s = s.slice(i.length)));
                    if (!i) break;
                }
                return n ? s.length : s ? t.error(e) : B(e, l).slice(0);
            }),
            (S = t.compile = function (e, t) {
                var n,
                    i = [],
                    o = [],
                    r = U[e + " "];
                if (!r) {
                    for (t || (t = C(e)), n = t.length; n--; ) (r = y(t[n])), r[P] ? i.push(r) : o.push(r);
                    (r = U(e, b(o, i))), (r.selector = e);
                }
                return r;
            }),
            (E = t.select = function (e, t, n, i) {
                var o,
                    r,
                    a,
                    s,
                    l,
                    c = "function" == typeof e && e,
                    p = !i && C((e = c.selector || e));
                if (((n = n || []), 1 === p.length)) {
                    if (((r = p[0] = p[0].slice(0)), r.length > 2 && "ID" === (a = r[0]).type && $.getById && 9 === t.nodeType && z && w.relative[r[1].type])) {
                        if (((t = (w.find.ID(a.matches[0].replace($e, we), t) || [])[0]), !t)) return n;
                        c && (t = t.parentNode), (e = e.slice(r.shift().value.length));
                    }
                    for (o = he.needsContext.test(e) ? 0 : r.length; o-- && ((a = r[o]), !w.relative[(s = a.type)]); )
                        if ((l = w.find[s]) && (i = l(a.matches[0].replace($e, we), (be.test(r[0].type) && u(t.parentNode)) || t))) {
                            if ((r.splice(o, 1), (e = i.length && d(r)), !e)) return K.apply(n, i), n;
                            break;
                        }
                }
                return (c || S(e, p))(i, t, !z, n, (be.test(e) && u(t.parentNode)) || t), n;
            }),
            ($.sortStable = P.split("").sort(X).join("") === P),
            ($.detectDuplicates = !!D),
            j(),
            ($.sortDetached = o(function (e) {
                return 1 & e.compareDocumentPosition(A.createElement("div"));
            })),
            o(function (e) {
                return (e.innerHTML = "<a href='#'></a>"), "#" === e.firstChild.getAttribute("href");
            }) ||
                r("type|href|height|width", function (e, t, n) {
                    return n ? void 0 : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
                }),
            ($.attributes &&
                o(function (e) {
                    return (e.innerHTML = "<input/>"), e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value");
                })) ||
                r("value", function (e, t, n) {
                    return n || "input" !== e.nodeName.toLowerCase() ? void 0 : e.defaultValue;
                }),
            o(function (e) {
                return null == e.getAttribute("disabled");
            }) ||
                r(te, function (e, t, n) {
                    var i;
                    return n ? void 0 : e[t] === !0 ? t.toLowerCase() : (i = e.getAttributeNode(t)) && i.specified ? i.value : null;
                }),
            t
        );
    })(e);
    (Z.find = oe), (Z.expr = oe.selectors), (Z.expr[":"] = Z.expr.pseudos), (Z.unique = oe.uniqueSort), (Z.text = oe.getText), (Z.isXMLDoc = oe.isXML), (Z.contains = oe.contains);
    var re = Z.expr.match.needsContext,
        ae = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        se = /^.[^:#\[\.,]*$/;
    (Z.filter = function (e, t, n) {
        var i = t[0];
        return (
            n && (e = ":not(" + e + ")"),
            1 === t.length && 1 === i.nodeType
                ? Z.find.matchesSelector(i, e)
                    ? [i]
                    : []
                : Z.find.matches(
                      e,
                      Z.grep(t, function (e) {
                          return 1 === e.nodeType;
                      })
                  )
        );
    }),
        Z.fn.extend({
            find: function (e) {
                var t,
                    n = this.length,
                    i = [],
                    o = this;
                if ("string" != typeof e)
                    return this.pushStack(
                        Z(e).filter(function () {
                            for (t = 0; n > t; t++) if (Z.contains(o[t], this)) return !0;
                        })
                    );
                for (t = 0; n > t; t++) Z.find(e, o[t], i);
                return (i = this.pushStack(n > 1 ? Z.unique(i) : i)), (i.selector = this.selector ? this.selector + " " + e : e), i;
            },
            filter: function (e) {
                return this.pushStack(i(this, e || [], !1));
            },
            not: function (e) {
                return this.pushStack(i(this, e || [], !0));
            },
            is: function (e) {
                return !!i(this, "string" == typeof e && re.test(e) ? Z(e) : e || [], !1).length;
            },
        });
    var le,
        ce = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        ue = (Z.fn.init = function (e, t) {
            var n, i;
            if (!e) return this;
            if ("string" == typeof e) {
                if (((n = "<" === e[0] && ">" === e[e.length - 1] && e.length >= 3 ? [null, e, null] : ce.exec(e)), !n || (!n[1] && t))) return !t || t.jquery ? (t || le).find(e) : this.constructor(t).find(e);
                if (n[1]) {
                    if (((t = t instanceof Z ? t[0] : t), Z.merge(this, Z.parseHTML(n[1], t && t.nodeType ? t.ownerDocument || t : Q, !0)), ae.test(n[1]) && Z.isPlainObject(t)))
                        for (n in t) Z.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
                    return this;
                }
                return (i = Q.getElementById(n[2])), i && i.parentNode && ((this.length = 1), (this[0] = i)), (this.context = Q), (this.selector = e), this;
            }
            return e.nodeType
                ? ((this.context = this[0] = e), (this.length = 1), this)
                : Z.isFunction(e)
                ? "undefined" != typeof le.ready
                    ? le.ready(e)
                    : e(Z)
                : (void 0 !== e.selector && ((this.selector = e.selector), (this.context = e.context)), Z.makeArray(e, this));
        });
    (ue.prototype = Z.fn), (le = Z(Q));
    var pe = /^(?:parents|prev(?:Until|All))/,
        de = { children: !0, contents: !0, next: !0, prev: !0 };
    Z.extend({
        dir: function (e, t, n) {
            for (var i = [], o = void 0 !== n; (e = e[t]) && 9 !== e.nodeType; )
                if (1 === e.nodeType) {
                    if (o && Z(e).is(n)) break;
                    i.push(e);
                }
            return i;
        },
        sibling: function (e, t) {
            for (var n = []; e; e = e.nextSibling) 1 === e.nodeType && e !== t && n.push(e);
            return n;
        },
    }),
        Z.fn.extend({
            has: function (e) {
                var t = Z(e, this),
                    n = t.length;
                return this.filter(function () {
                    for (var e = 0; n > e; e++) if (Z.contains(this, t[e])) return !0;
                });
            },
            closest: function (e, t) {
                for (var n, i = 0, o = this.length, r = [], a = re.test(e) || "string" != typeof e ? Z(e, t || this.context) : 0; o > i; i++)
                    for (n = this[i]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && Z.find.matchesSelector(n, e))) {
                            r.push(n);
                            break;
                        }
                return this.pushStack(r.length > 1 ? Z.unique(r) : r);
            },
            index: function (e) {
                return e ? ("string" == typeof e ? X.call(Z(e), this[0]) : X.call(this, e.jquery ? e[0] : e)) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
            },
            add: function (e, t) {
                return this.pushStack(Z.unique(Z.merge(this.get(), Z(e, t))));
            },
            addBack: function (e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e));
            },
        }),
        Z.each(
            {
                parent: function (e) {
                    var t = e.parentNode;
                    return t && 11 !== t.nodeType ? t : null;
                },
                parents: function (e) {
                    return Z.dir(e, "parentNode");
                },
                parentsUntil: function (e, t, n) {
                    return Z.dir(e, "parentNode", n);
                },
                next: function (e) {
                    return o(e, "nextSibling");
                },
                prev: function (e) {
                    return o(e, "previousSibling");
                },
                nextAll: function (e) {
                    return Z.dir(e, "nextSibling");
                },
                prevAll: function (e) {
                    return Z.dir(e, "previousSibling");
                },
                nextUntil: function (e, t, n) {
                    return Z.dir(e, "nextSibling", n);
                },
                prevUntil: function (e, t, n) {
                    return Z.dir(e, "previousSibling", n);
                },
                siblings: function (e) {
                    return Z.sibling((e.parentNode || {}).firstChild, e);
                },
                children: function (e) {
                    return Z.sibling(e.firstChild);
                },
                contents: function (e) {
                    return e.contentDocument || Z.merge([], e.childNodes);
                },
            },
            function (e, t) {
                Z.fn[e] = function (n, i) {
                    var o = Z.map(this, t, n);
                    return "Until" !== e.slice(-5) && (i = n), i && "string" == typeof i && (o = Z.filter(i, o)), this.length > 1 && (de[e] || Z.unique(o), pe.test(e) && o.reverse()), this.pushStack(o);
                };
            }
        );
    var fe = /\S+/g,
        he = {};
    (Z.Callbacks = function (e) {
        e = "string" == typeof e ? he[e] || r(e) : Z.extend({}, e);
        var t,
            n,
            i,
            o,
            a,
            s,
            l = [],
            c = !e.once && [],
            u = function (r) {
                for (t = e.memory && r, n = !0, s = o || 0, o = 0, a = l.length, i = !0; l && a > s; s++)
                    if (l[s].apply(r[0], r[1]) === !1 && e.stopOnFalse) {
                        t = !1;
                        break;
                    }
                (i = !1), l && (c ? c.length && u(c.shift()) : t ? (l = []) : p.disable());
            },
            p = {
                add: function () {
                    if (l) {
                        var n = l.length;
                        !(function r(t) {
                            Z.each(t, function (t, n) {
                                var i = Z.type(n);
                                "function" === i ? (e.unique && p.has(n)) || l.push(n) : n && n.length && "string" !== i && r(n);
                            });
                        })(arguments),
                            i ? (a = l.length) : t && ((o = n), u(t));
                    }
                    return this;
                },
                remove: function () {
                    return (
                        l &&
                            Z.each(arguments, function (e, t) {
                                for (var n; (n = Z.inArray(t, l, n)) > -1; ) l.splice(n, 1), i && (a >= n && a--, s >= n && s--);
                            }),
                        this
                    );
                },
                has: function (e) {
                    return e ? Z.inArray(e, l) > -1 : !(!l || !l.length);
                },
                empty: function () {
                    return (l = []), (a = 0), this;
                },
                disable: function () {
                    return (l = c = t = void 0), this;
                },
                disabled: function () {
                    return !l;
                },
                lock: function () {
                    return (c = void 0), t || p.disable(), this;
                },
                locked: function () {
                    return !c;
                },
                fireWith: function (e, t) {
                    return !l || (n && !c) || ((t = t || []), (t = [e, t.slice ? t.slice() : t]), i ? c.push(t) : u(t)), this;
                },
                fire: function () {
                    return p.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!n;
                },
            };
        return p;
    }),
        Z.extend({
            Deferred: function (e) {
                var t = [
                        ["resolve", "done", Z.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", Z.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", Z.Callbacks("memory")],
                    ],
                    n = "pending",
                    i = {
                        state: function () {
                            return n;
                        },
                        always: function () {
                            return o.done(arguments).fail(arguments), this;
                        },
                        then: function () {
                            var e = arguments;
                            return Z.Deferred(function (n) {
                                Z.each(t, function (t, r) {
                                    var a = Z.isFunction(e[t]) && e[t];
                                    o[r[1]](function () {
                                        var e = a && a.apply(this, arguments);
                                        e && Z.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[r[0] + "With"](this === i ? n.promise() : this, a ? [e] : arguments);
                                    });
                                }),
                                    (e = null);
                            }).promise();
                        },
                        promise: function (e) {
                            return null != e ? Z.extend(e, i) : i;
                        },
                    },
                    o = {};
                return (
                    (i.pipe = i.then),
                    Z.each(t, function (e, r) {
                        var a = r[2],
                            s = r[3];
                        (i[r[1]] = a.add),
                            s &&
                                a.add(
                                    function () {
                                        n = s;
                                    },
                                    t[1 ^ e][2].disable,
                                    t[2][2].lock
                                ),
                            (o[r[0]] = function () {
                                return o[r[0] + "With"](this === o ? i : this, arguments), this;
                            }),
                            (o[r[0] + "With"] = a.fireWith);
                    }),
                    i.promise(o),
                    e && e.call(o, o),
                    o
                );
            },
            when: function (e) {
                var t,
                    n,
                    i,
                    o = 0,
                    r = W.call(arguments),
                    a = r.length,
                    s = 1 !== a || (e && Z.isFunction(e.promise)) ? a : 0,
                    l = 1 === s ? e : Z.Deferred(),
                    c = function (e, n, i) {
                        return function (o) {
                            (n[e] = this), (i[e] = arguments.length > 1 ? W.call(arguments) : o), i === t ? l.notifyWith(n, i) : --s || l.resolveWith(n, i);
                        };
                    };
                if (a > 1) for (t = new Array(a), n = new Array(a), i = new Array(a); a > o; o++) r[o] && Z.isFunction(r[o].promise) ? r[o].promise().done(c(o, i, r)).fail(l.reject).progress(c(o, n, t)) : --s;
                return s || l.resolveWith(i, r), l.promise();
            },
        });
    var ge;
    (Z.fn.ready = function (e) {
        return Z.ready.promise().done(e), this;
    }),
        Z.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (e) {
                e ? Z.readyWait++ : Z.ready(!0);
            },
            ready: function (e) {
                (e === !0 ? --Z.readyWait : Z.isReady) || ((Z.isReady = !0), (e !== !0 && --Z.readyWait > 0) || (ge.resolveWith(Q, [Z]), Z.fn.triggerHandler && (Z(Q).triggerHandler("ready"), Z(Q).off("ready"))));
            },
        }),
        (Z.ready.promise = function (t) {
            return ge || ((ge = Z.Deferred()), "complete" === Q.readyState ? setTimeout(Z.ready) : (Q.addEventListener("DOMContentLoaded", a, !1), e.addEventListener("load", a, !1))), ge.promise(t);
        }),
        Z.ready.promise();
    var me = (Z.access = function (e, t, n, i, o, r, a) {
        var s = 0,
            l = e.length,
            c = null == n;
        if ("object" === Z.type(n)) {
            o = !0;
            for (s in n) Z.access(e, t, s, n[s], !0, r, a);
        } else if (
            void 0 !== i &&
            ((o = !0),
            Z.isFunction(i) || (a = !0),
            c &&
                (a
                    ? (t.call(e, i), (t = null))
                    : ((c = t),
                      (t = function (e, t, n) {
                          return c.call(Z(e), n);
                      }))),
            t)
        )
            for (; l > s; s++) t(e[s], n, a ? i : i.call(e[s], s, t(e[s], n)));
        return o ? e : c ? t.call(e) : l ? t(e[0], n) : r;
    });
    (Z.acceptData = function (e) {
        return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType;
    }),
        (s.uid = 1),
        (s.accepts = Z.acceptData),
        (s.prototype = {
            key: function (e) {
                if (!s.accepts(e)) return 0;
                var t = {},
                    n = e[this.expando];
                if (!n) {
                    n = s.uid++;
                    try {
                        (t[this.expando] = { value: n }), Object.defineProperties(e, t);
                    } catch (i) {
                        (t[this.expando] = n), Z.extend(e, t);
                    }
                }
                return this.cache[n] || (this.cache[n] = {}), n;
            },
            set: function (e, t, n) {
                var i,
                    o = this.key(e),
                    r = this.cache[o];
                if ("string" == typeof t) r[t] = n;
                else if (Z.isEmptyObject(r)) Z.extend(this.cache[o], t);
                else for (i in t) r[i] = t[i];
                return r;
            },
            get: function (e, t) {
                var n = this.cache[this.key(e)];
                return void 0 === t ? n : n[t];
            },
            access: function (e, t, n) {
                var i;
                return void 0 === t || (t && "string" == typeof t && void 0 === n) ? ((i = this.get(e, t)), void 0 !== i ? i : this.get(e, Z.camelCase(t))) : (this.set(e, t, n), void 0 !== n ? n : t);
            },
            remove: function (e, t) {
                var n,
                    i,
                    o,
                    r = this.key(e),
                    a = this.cache[r];
                if (void 0 === t) this.cache[r] = {};
                else {
                    Z.isArray(t) ? (i = t.concat(t.map(Z.camelCase))) : ((o = Z.camelCase(t)), t in a ? (i = [t, o]) : ((i = o), (i = i in a ? [i] : i.match(fe) || []))), (n = i.length);
                    for (; n--; ) delete a[i[n]];
                }
            },
            hasData: function (e) {
                return !Z.isEmptyObject(this.cache[e[this.expando]] || {});
            },
            discard: function (e) {
                e[this.expando] && delete this.cache[e[this.expando]];
            },
        });
    var ve = new s(),
        ye = new s(),
        be = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        xe = /([A-Z])/g;
    Z.extend({
        hasData: function (e) {
            return ye.hasData(e) || ve.hasData(e);
        },
        data: function (e, t, n) {
            return ye.access(e, t, n);
        },
        removeData: function (e, t) {
            ye.remove(e, t);
        },
        _data: function (e, t, n) {
            return ve.access(e, t, n);
        },
        _removeData: function (e, t) {
            ve.remove(e, t);
        },
    }),
        Z.fn.extend({
            data: function (e, t) {
                var n,
                    i,
                    o,
                    r = this[0],
                    a = r && r.attributes;
                if (void 0 === e) {
                    if (this.length && ((o = ye.get(r)), 1 === r.nodeType && !ve.get(r, "hasDataAttrs"))) {
                        for (n = a.length; n--; ) a[n] && ((i = a[n].name), 0 === i.indexOf("data-") && ((i = Z.camelCase(i.slice(5))), l(r, i, o[i])));
                        ve.set(r, "hasDataAttrs", !0);
                    }
                    return o;
                }
                return "object" == typeof e
                    ? this.each(function () {
                          ye.set(this, e);
                      })
                    : me(
                          this,
                          function (t) {
                              var n,
                                  i = Z.camelCase(e);
                              if (r && void 0 === t) {
                                  if (((n = ye.get(r, e)), void 0 !== n)) return n;
                                  if (((n = ye.get(r, i)), void 0 !== n)) return n;
                                  if (((n = l(r, i, void 0)), void 0 !== n)) return n;
                              } else
                                  this.each(function () {
                                      var n = ye.get(this, i);
                                      ye.set(this, i, t), -1 !== e.indexOf("-") && void 0 !== n && ye.set(this, e, t);
                                  });
                          },
                          null,
                          t,
                          arguments.length > 1,
                          null,
                          !0
                      );
            },
            removeData: function (e) {
                return this.each(function () {
                    ye.remove(this, e);
                });
            },
        }),
        Z.extend({
            queue: function (e, t, n) {
                var i;
                return e ? ((t = (t || "fx") + "queue"), (i = ve.get(e, t)), n && (!i || Z.isArray(n) ? (i = ve.access(e, t, Z.makeArray(n))) : i.push(n)), i || []) : void 0;
            },
            dequeue: function (e, t) {
                t = t || "fx";
                var n = Z.queue(e, t),
                    i = n.length,
                    o = n.shift(),
                    r = Z._queueHooks(e, t),
                    a = function () {
                        Z.dequeue(e, t);
                    };
                "inprogress" === o && ((o = n.shift()), i--), o && ("fx" === t && n.unshift("inprogress"), delete r.stop, o.call(e, a, r)), !i && r && r.empty.fire();
            },
            _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return (
                    ve.get(e, n) ||
                    ve.access(e, n, {
                        empty: Z.Callbacks("once memory").add(function () {
                            ve.remove(e, [t + "queue", n]);
                        }),
                    })
                );
            },
        }),
        Z.fn.extend({
            queue: function (e, t) {
                var n = 2;
                return (
                    "string" != typeof e && ((t = e), (e = "fx"), n--),
                    arguments.length < n
                        ? Z.queue(this[0], e)
                        : void 0 === t
                        ? this
                        : this.each(function () {
                              var n = Z.queue(this, e, t);
                              Z._queueHooks(this, e), "fx" === e && "inprogress" !== n[0] && Z.dequeue(this, e);
                          })
                );
            },
            dequeue: function (e) {
                return this.each(function () {
                    Z.dequeue(this, e);
                });
            },
            clearQueue: function (e) {
                return this.queue(e || "fx", []);
            },
            promise: function (e, t) {
                var n,
                    i = 1,
                    o = Z.Deferred(),
                    r = this,
                    a = this.length,
                    s = function () {
                        --i || o.resolveWith(r, [r]);
                    };
                for ("string" != typeof e && ((t = e), (e = void 0)), e = e || "fx"; a--; ) (n = ve.get(r[a], e + "queueHooks")), n && n.empty && (i++, n.empty.add(s));
                return s(), o.promise(t);
            },
        });
    var $e = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        we = ["Top", "Right", "Bottom", "Left"],
        ke = function (e, t) {
            return (e = t || e), "none" === Z.css(e, "display") || !Z.contains(e.ownerDocument, e);
        },
        Te = /^(?:checkbox|radio)$/i;
    !(function () {
        var e = Q.createDocumentFragment(),
            t = e.appendChild(Q.createElement("div")),
            n = Q.createElement("input");
        n.setAttribute("type", "radio"),
            n.setAttribute("checked", "checked"),
            n.setAttribute("name", "t"),
            t.appendChild(n),
            (Y.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (t.innerHTML = "<textarea>x</textarea>"),
            (Y.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue);
    })();
    var Ce = "undefined";
    Y.focusinBubbles = "onfocusin" in e;
    var Se = /^key/,
        Ee = /^(?:mouse|pointer|contextmenu)|click/,
        _e = /^(?:focusinfocus|focusoutblur)$/,
        Ne = /^([^.]*)(?:\.(.+)|)$/;
    (Z.event = {
        global: {},
        add: function (e, t, n, i, o) {
            var r,
                a,
                s,
                l,
                c,
                u,
                p,
                d,
                f,
                h,
                g,
                m = ve.get(e);
            if (m)
                for (
                    n.handler && ((r = n), (n = r.handler), (o = r.selector)),
                        n.guid || (n.guid = Z.guid++),
                        (l = m.events) || (l = m.events = {}),
                        (a = m.handle) ||
                            (a = m.handle = function (t) {
                                return typeof Z !== Ce && Z.event.triggered !== t.type ? Z.event.dispatch.apply(e, arguments) : void 0;
                            }),
                        t = (t || "").match(fe) || [""],
                        c = t.length;
                    c--;

                )
                    (s = Ne.exec(t[c]) || []),
                        (f = g = s[1]),
                        (h = (s[2] || "").split(".").sort()),
                        f &&
                            ((p = Z.event.special[f] || {}),
                            (f = (o ? p.delegateType : p.bindType) || f),
                            (p = Z.event.special[f] || {}),
                            (u = Z.extend({ type: f, origType: g, data: i, handler: n, guid: n.guid, selector: o, needsContext: o && Z.expr.match.needsContext.test(o), namespace: h.join(".") }, r)),
                            (d = l[f]) || ((d = l[f] = []), (d.delegateCount = 0), (p.setup && p.setup.call(e, i, h, a) !== !1) || (e.addEventListener && e.addEventListener(f, a, !1))),
                            p.add && (p.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)),
                            o ? d.splice(d.delegateCount++, 0, u) : d.push(u),
                            (Z.event.global[f] = !0));
        },
        remove: function (e, t, n, i, o) {
            var r,
                a,
                s,
                l,
                c,
                u,
                p,
                d,
                f,
                h,
                g,
                m = ve.hasData(e) && ve.get(e);
            if (m && (l = m.events)) {
                for (t = (t || "").match(fe) || [""], c = t.length; c--; )
                    if (((s = Ne.exec(t[c]) || []), (f = g = s[1]), (h = (s[2] || "").split(".").sort()), f)) {
                        for (p = Z.event.special[f] || {}, f = (i ? p.delegateType : p.bindType) || f, d = l[f] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = r = d.length; r--; )
                            (u = d[r]),
                                (!o && g !== u.origType) ||
                                    (n && n.guid !== u.guid) ||
                                    (s && !s.test(u.namespace)) ||
                                    (i && i !== u.selector && ("**" !== i || !u.selector)) ||
                                    (d.splice(r, 1), u.selector && d.delegateCount--, p.remove && p.remove.call(e, u));
                        a && !d.length && ((p.teardown && p.teardown.call(e, h, m.handle) !== !1) || Z.removeEvent(e, f, m.handle), delete l[f]);
                    } else for (f in l) Z.event.remove(e, f + t[c], n, i, !0);
                Z.isEmptyObject(l) && (delete m.handle, ve.remove(e, "events"));
            }
        },
        trigger: function (t, n, i, o) {
            var r,
                a,
                s,
                l,
                c,
                u,
                p,
                d = [i || Q],
                f = J.call(t, "type") ? t.type : t,
                h = J.call(t, "namespace") ? t.namespace.split(".") : [];
            if (
                ((a = s = i = i || Q),
                3 !== i.nodeType &&
                    8 !== i.nodeType &&
                    !_e.test(f + Z.event.triggered) &&
                    (f.indexOf(".") >= 0 && ((h = f.split(".")), (f = h.shift()), h.sort()),
                    (c = f.indexOf(":") < 0 && "on" + f),
                    (t = t[Z.expando] ? t : new Z.Event(f, "object" == typeof t && t)),
                    (t.isTrigger = o ? 2 : 3),
                    (t.namespace = h.join(".")),
                    (t.namespace_re = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null),
                    (t.result = void 0),
                    t.target || (t.target = i),
                    (n = null == n ? [t] : Z.makeArray(n, [t])),
                    (p = Z.event.special[f] || {}),
                    o || !p.trigger || p.trigger.apply(i, n) !== !1))
            ) {
                if (!o && !p.noBubble && !Z.isWindow(i)) {
                    for (l = p.delegateType || f, _e.test(l + f) || (a = a.parentNode); a; a = a.parentNode) d.push(a), (s = a);
                    s === (i.ownerDocument || Q) && d.push(s.defaultView || s.parentWindow || e);
                }
                for (r = 0; (a = d[r++]) && !t.isPropagationStopped(); )
                    (t.type = r > 1 ? l : p.bindType || f),
                        (u = (ve.get(a, "events") || {})[t.type] && ve.get(a, "handle")),
                        u && u.apply(a, n),
                        (u = c && a[c]),
                        u && u.apply && Z.acceptData(a) && ((t.result = u.apply(a, n)), t.result === !1 && t.preventDefault());
                return (
                    (t.type = f),
                    o ||
                        t.isDefaultPrevented() ||
                        (p._default && p._default.apply(d.pop(), n) !== !1) ||
                        !Z.acceptData(i) ||
                        (c && Z.isFunction(i[f]) && !Z.isWindow(i) && ((s = i[c]), s && (i[c] = null), (Z.event.triggered = f), i[f](), (Z.event.triggered = void 0), s && (i[c] = s))),
                    t.result
                );
            }
        },
        dispatch: function (e) {
            e = Z.event.fix(e);
            var t,
                n,
                i,
                o,
                r,
                a = [],
                s = W.call(arguments),
                l = (ve.get(this, "events") || {})[e.type] || [],
                c = Z.event.special[e.type] || {};
            if (((s[0] = e), (e.delegateTarget = this), !c.preDispatch || c.preDispatch.call(this, e) !== !1)) {
                for (a = Z.event.handlers.call(this, e, l), t = 0; (o = a[t++]) && !e.isPropagationStopped(); )
                    for (e.currentTarget = o.elem, n = 0; (r = o.handlers[n++]) && !e.isImmediatePropagationStopped(); )
                        (!e.namespace_re || e.namespace_re.test(r.namespace)) &&
                            ((e.handleObj = r), (e.data = r.data), (i = ((Z.event.special[r.origType] || {}).handle || r.handler).apply(o.elem, s)), void 0 !== i && (e.result = i) === !1 && (e.preventDefault(), e.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, e), e.result;
            }
        },
        handlers: function (e, t) {
            var n,
                i,
                o,
                r,
                a = [],
                s = t.delegateCount,
                l = e.target;
            if (s && l.nodeType && (!e.button || "click" !== e.type))
                for (; l !== this; l = l.parentNode || this)
                    if (l.disabled !== !0 || "click" !== e.type) {
                        for (i = [], n = 0; s > n; n++) (r = t[n]), (o = r.selector + " "), void 0 === i[o] && (i[o] = r.needsContext ? Z(o, this).index(l) >= 0 : Z.find(o, this, null, [l]).length), i[o] && i.push(r);
                        i.length && a.push({ elem: l, handlers: i });
                    }
            return s < t.length && a.push({ elem: this, handlers: t.slice(s) }), a;
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode), e;
            },
        },
        mouseHooks: {
            props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n,
                    i,
                    o,
                    r = t.button;
                return (
                    null == e.pageX &&
                        null != t.clientX &&
                        ((n = e.target.ownerDocument || Q),
                        (i = n.documentElement),
                        (o = n.body),
                        (e.pageX = t.clientX + ((i && i.scrollLeft) || (o && o.scrollLeft) || 0) - ((i && i.clientLeft) || (o && o.clientLeft) || 0)),
                        (e.pageY = t.clientY + ((i && i.scrollTop) || (o && o.scrollTop) || 0) - ((i && i.clientTop) || (o && o.clientTop) || 0))),
                    e.which || void 0 === r || (e.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0),
                    e
                );
            },
        },
        fix: function (e) {
            if (e[Z.expando]) return e;
            var t,
                n,
                i,
                o = e.type,
                r = e,
                a = this.fixHooks[o];
            for (a || (this.fixHooks[o] = a = Ee.test(o) ? this.mouseHooks : Se.test(o) ? this.keyHooks : {}), i = a.props ? this.props.concat(a.props) : this.props, e = new Z.Event(r), t = i.length; t--; ) (n = i[t]), (e[n] = r[n]);
            return e.target || (e.target = Q), 3 === e.target.nodeType && (e.target = e.target.parentNode), a.filter ? a.filter(e, r) : e;
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function () {
                    return this !== p() && this.focus ? (this.focus(), !1) : void 0;
                },
                delegateType: "focusin",
            },
            blur: {
                trigger: function () {
                    return this === p() && this.blur ? (this.blur(), !1) : void 0;
                },
                delegateType: "focusout",
            },
            click: {
                trigger: function () {
                    return "checkbox" === this.type && this.click && Z.nodeName(this, "input") ? (this.click(), !1) : void 0;
                },
                _default: function (e) {
                    return Z.nodeName(e.target, "a");
                },
            },
            beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result);
                },
            },
        },
        simulate: function (e, t, n, i) {
            var o = Z.extend(new Z.Event(), n, { type: e, isSimulated: !0, originalEvent: {} });
            i ? Z.event.trigger(o, null, t) : Z.event.dispatch.call(t, o), o.isDefaultPrevented() && n.preventDefault();
        },
    }),
        (Z.removeEvent = function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n, !1);
        }),
        (Z.Event = function (e, t) {
            return this instanceof Z.Event
                ? (e && e.type ? ((this.originalEvent = e), (this.type = e.type), (this.isDefaultPrevented = e.defaultPrevented || (void 0 === e.defaultPrevented && e.returnValue === !1) ? c : u)) : (this.type = e),
                  t && Z.extend(this, t),
                  (this.timeStamp = (e && e.timeStamp) || Z.now()),
                  void (this[Z.expando] = !0))
                : new Z.Event(e, t);
        }),
        (Z.Event.prototype = {
            isDefaultPrevented: u,
            isPropagationStopped: u,
            isImmediatePropagationStopped: u,
            preventDefault: function () {
                var e = this.originalEvent;
                (this.isDefaultPrevented = c), e && e.preventDefault && e.preventDefault();
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                (this.isPropagationStopped = c), e && e.stopPropagation && e.stopPropagation();
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                (this.isImmediatePropagationStopped = c), e && e.stopImmediatePropagation && e.stopImmediatePropagation(), this.stopPropagation();
            },
        }),
        Z.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (e, t) {
            Z.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function (e) {
                    var n,
                        i = this,
                        o = e.relatedTarget,
                        r = e.handleObj;
                    return (!o || (o !== i && !Z.contains(i, o))) && ((e.type = r.origType), (n = r.handler.apply(this, arguments)), (e.type = t)), n;
                },
            };
        }),
        Y.focusinBubbles ||
            Z.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
                var n = function (e) {
                    Z.event.simulate(t, e.target, Z.event.fix(e), !0);
                };
                Z.event.special[t] = {
                    setup: function () {
                        var i = this.ownerDocument || this,
                            o = ve.access(i, t);
                        o || i.addEventListener(e, n, !0), ve.access(i, t, (o || 0) + 1);
                    },
                    teardown: function () {
                        var i = this.ownerDocument || this,
                            o = ve.access(i, t) - 1;
                        o ? ve.access(i, t, o) : (i.removeEventListener(e, n, !0), ve.remove(i, t));
                    },
                };
            }),
        Z.fn.extend({
            on: function (e, t, n, i, o) {
                var r, a;
                if ("object" == typeof e) {
                    "string" != typeof t && ((n = n || t), (t = void 0));
                    for (a in e) this.on(a, t, n, e[a], o);
                    return this;
                }
                if ((null == n && null == i ? ((i = t), (n = t = void 0)) : null == i && ("string" == typeof t ? ((i = n), (n = void 0)) : ((i = n), (n = t), (t = void 0))), i === !1)) i = u;
                else if (!i) return this;
                return (
                    1 === o &&
                        ((r = i),
                        (i = function (e) {
                            return Z().off(e), r.apply(this, arguments);
                        }),
                        (i.guid = r.guid || (r.guid = Z.guid++))),
                    this.each(function () {
                        Z.event.add(this, e, i, n, t);
                    })
                );
            },
            one: function (e, t, n, i) {
                return this.on(e, t, n, i, 1);
            },
            off: function (e, t, n) {
                var i, o;
                if (e && e.preventDefault && e.handleObj) return (i = e.handleObj), Z(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;
                if ("object" == typeof e) {
                    for (o in e) this.off(o, t, e[o]);
                    return this;
                }
                return (
                    (t === !1 || "function" == typeof t) && ((n = t), (t = void 0)),
                    n === !1 && (n = u),
                    this.each(function () {
                        Z.event.remove(this, e, n, t);
                    })
                );
            },
            trigger: function (e, t) {
                return this.each(function () {
                    Z.event.trigger(e, t, this);
                });
            },
            triggerHandler: function (e, t) {
                var n = this[0];
                return n ? Z.event.trigger(e, t, n, !0) : void 0;
            },
        });
    var De = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        je = /<([\w:]+)/,
        Ae = /<|&#?\w+;/,
        Le = /<(?:script|style|link)/i,
        ze = /checked\s*(?:[^=]|=\s*.checked.)/i,
        He = /^$|\/(?:java|ecma)script/i,
        qe = /^true\/(.*)/,
        Me = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Fe = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""],
        };
    (Fe.optgroup = Fe.option),
        (Fe.tbody = Fe.tfoot = Fe.colgroup = Fe.caption = Fe.thead),
        (Fe.th = Fe.td),
        Z.extend({
            clone: function (e, t, n) {
                var i,
                    o,
                    r,
                    a,
                    s = e.cloneNode(!0),
                    l = Z.contains(e.ownerDocument, e);
                if (!(Y.noCloneChecked || (1 !== e.nodeType && 11 !== e.nodeType) || Z.isXMLDoc(e))) for (a = v(s), r = v(e), i = 0, o = r.length; o > i; i++) y(r[i], a[i]);
                if (t)
                    if (n) for (r = r || v(e), a = a || v(s), i = 0, o = r.length; o > i; i++) m(r[i], a[i]);
                    else m(e, s);
                return (a = v(s, "script")), a.length > 0 && g(a, !l && v(e, "script")), s;
            },
            buildFragment: function (e, t, n, i) {
                for (var o, r, a, s, l, c, u = t.createDocumentFragment(), p = [], d = 0, f = e.length; f > d; d++)
                    if (((o = e[d]), o || 0 === o))
                        if ("object" === Z.type(o)) Z.merge(p, o.nodeType ? [o] : o);
                        else if (Ae.test(o)) {
                            for (r = r || u.appendChild(t.createElement("div")), a = (je.exec(o) || ["", ""])[1].toLowerCase(), s = Fe[a] || Fe._default, r.innerHTML = s[1] + o.replace(De, "<$1></$2>") + s[2], c = s[0]; c--; )
                                r = r.lastChild;
                            Z.merge(p, r.childNodes), (r = u.firstChild), (r.textContent = "");
                        } else p.push(t.createTextNode(o));
                for (u.textContent = "", d = 0; (o = p[d++]); )
                    if ((!i || -1 === Z.inArray(o, i)) && ((l = Z.contains(o.ownerDocument, o)), (r = v(u.appendChild(o), "script")), l && g(r), n)) for (c = 0; (o = r[c++]); ) He.test(o.type || "") && n.push(o);
                return u;
            },
            cleanData: function (e) {
                for (var t, n, i, o, r = Z.event.special, a = 0; void 0 !== (n = e[a]); a++) {
                    if (Z.acceptData(n) && ((o = n[ve.expando]), o && (t = ve.cache[o]))) {
                        if (t.events) for (i in t.events) r[i] ? Z.event.remove(n, i) : Z.removeEvent(n, i, t.handle);
                        ve.cache[o] && delete ve.cache[o];
                    }
                    delete ye.cache[n[ye.expando]];
                }
            },
        }),
        Z.fn.extend({
            text: function (e) {
                return me(
                    this,
                    function (e) {
                        return void 0 === e
                            ? Z.text(this)
                            : this.empty().each(function () {
                                  (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && (this.textContent = e);
                              });
                    },
                    null,
                    e,
                    arguments.length
                );
            },
            append: function () {
                return this.domManip(arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = d(this, e);
                        t.appendChild(e);
                    }
                });
            },
            prepend: function () {
                return this.domManip(arguments, function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = d(this, e);
                        t.insertBefore(e, t.firstChild);
                    }
                });
            },
            before: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this);
                });
            },
            after: function () {
                return this.domManip(arguments, function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
                });
            },
            remove: function (e, t) {
                for (var n, i = e ? Z.filter(e, this) : this, o = 0; null != (n = i[o]); o++)
                    t || 1 !== n.nodeType || Z.cleanData(v(n)), n.parentNode && (t && Z.contains(n.ownerDocument, n) && g(v(n, "script")), n.parentNode.removeChild(n));
                return this;
            },
            empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) 1 === e.nodeType && (Z.cleanData(v(e, !1)), (e.textContent = ""));
                return this;
            },
            clone: function (e, t) {
                return (
                    (e = null != e && e),
                    (t = null == t ? e : t),
                    this.map(function () {
                        return Z.clone(this, e, t);
                    })
                );
            },
            html: function (e) {
                return me(
                    this,
                    function (e) {
                        var t = this[0] || {},
                            n = 0,
                            i = this.length;
                        if (void 0 === e && 1 === t.nodeType) return t.innerHTML;
                        if ("string" == typeof e && !Le.test(e) && !Fe[(je.exec(e) || ["", ""])[1].toLowerCase()]) {
                            e = e.replace(De, "<$1></$2>");
                            try {
                                for (; i > n; n++) (t = this[n] || {}), 1 === t.nodeType && (Z.cleanData(v(t, !1)), (t.innerHTML = e));
                                t = 0;
                            } catch (o) {}
                        }
                        t && this.empty().append(e);
                    },
                    null,
                    e,
                    arguments.length
                );
            },
            replaceWith: function () {
                var e = arguments[0];
                return (
                    this.domManip(arguments, function (t) {
                        (e = this.parentNode), Z.cleanData(v(this)), e && e.replaceChild(t, this);
                    }),
                    e && (e.length || e.nodeType) ? this : this.remove()
                );
            },
            detach: function (e) {
                return this.remove(e, !0);
            },
            domManip: function (e, t) {
                e = B.apply([], e);
                var n,
                    i,
                    o,
                    r,
                    a,
                    s,
                    l = 0,
                    c = this.length,
                    u = this,
                    p = c - 1,
                    d = e[0],
                    g = Z.isFunction(d);
                if (g || (c > 1 && "string" == typeof d && !Y.checkClone && ze.test(d)))
                    return this.each(function (n) {
                        var i = u.eq(n);
                        g && (e[0] = d.call(this, n, i.html())), i.domManip(e, t);
                    });
                if (c && ((n = Z.buildFragment(e, this[0].ownerDocument, !1, this)), (i = n.firstChild), 1 === n.childNodes.length && (n = i), i)) {
                    for (o = Z.map(v(n, "script"), f), r = o.length; c > l; l++) (a = n), l !== p && ((a = Z.clone(a, !0, !0)), r && Z.merge(o, v(a, "script"))), t.call(this[l], a, l);
                    if (r)
                        for (s = o[o.length - 1].ownerDocument, Z.map(o, h), l = 0; r > l; l++)
                            (a = o[l]), He.test(a.type || "") && !ve.access(a, "globalEval") && Z.contains(s, a) && (a.src ? Z._evalUrl && Z._evalUrl(a.src) : Z.globalEval(a.textContent.replace(Me, "")));
                }
                return this;
            },
        }),
        Z.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
            Z.fn[e] = function (e) {
                for (var n, i = [], o = Z(e), r = o.length - 1, a = 0; r >= a; a++) (n = a === r ? this : this.clone(!0)), Z(o[a])[t](n), U.apply(i, n.get());
                return this.pushStack(i);
            };
        });
    var Pe,
        Oe = {},
        Re = /^margin/,
        Ie = new RegExp("^(" + $e + ")(?!px)[a-z%]+$", "i"),
        We = function (t) {
            return t.ownerDocument.defaultView.opener ? t.ownerDocument.defaultView.getComputedStyle(t, null) : e.getComputedStyle(t, null);
        };
    !(function () {
        function t() {
            (a.style.cssText = "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"), (a.innerHTML = ""), o.appendChild(r);
            var t = e.getComputedStyle(a, null);
            (n = "1%" !== t.top), (i = "4px" === t.width), o.removeChild(r);
        }
        var n,
            i,
            o = Q.documentElement,
            r = Q.createElement("div"),
            a = Q.createElement("div");
        a.style &&
            ((a.style.backgroundClip = "content-box"),
            (a.cloneNode(!0).style.backgroundClip = ""),
            (Y.clearCloneStyle = "content-box" === a.style.backgroundClip),
            (r.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute"),
            r.appendChild(a),
            e.getComputedStyle &&
                Z.extend(Y, {
                    pixelPosition: function () {
                        return t(), n;
                    },
                    boxSizingReliable: function () {
                        return null == i && t(), i;
                    },
                    reliableMarginRight: function () {
                        var t,
                            n = a.appendChild(Q.createElement("div"));
                        return (
                            (n.style.cssText = a.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                            (n.style.marginRight = n.style.width = "0"),
                            (a.style.width = "1px"),
                            o.appendChild(r),
                            (t = !parseFloat(e.getComputedStyle(n, null).marginRight)),
                            o.removeChild(r),
                            a.removeChild(n),
                            t
                        );
                    },
                }));
    })(),
        (Z.swap = function (e, t, n, i) {
            var o,
                r,
                a = {};
            for (r in t) (a[r] = e.style[r]), (e.style[r] = t[r]);
            o = n.apply(e, i || []);
            for (r in t) e.style[r] = a[r];
            return o;
        });
    var Be = /^(none|table(?!-c[ea]).+)/,
        Ue = new RegExp("^(" + $e + ")(.*)$", "i"),
        Xe = new RegExp("^([+-])=(" + $e + ")", "i"),
        Ge = { position: "absolute", visibility: "hidden", display: "block" },
        Ve = { letterSpacing: "0", fontWeight: "400" },
        Je = ["Webkit", "O", "Moz", "ms"];
    Z.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = $(e, "opacity");
                        return "" === n ? "1" : n;
                    }
                },
            },
        },
        cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 },
        cssProps: { float: "cssFloat" },
        style: function (e, t, n, i) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var o,
                    r,
                    a,
                    s = Z.camelCase(t),
                    l = e.style;
                return (
                    (t = Z.cssProps[s] || (Z.cssProps[s] = k(l, s))),
                    (a = Z.cssHooks[t] || Z.cssHooks[s]),
                    void 0 === n
                        ? a && "get" in a && void 0 !== (o = a.get(e, !1, i))
                            ? o
                            : l[t]
                        : ((r = typeof n),
                          "string" === r && (o = Xe.exec(n)) && ((n = (o[1] + 1) * o[2] + parseFloat(Z.css(e, t))), (r = "number")),
                          void (
                              null != n &&
                              n === n &&
                              ("number" !== r || Z.cssNumber[s] || (n += "px"), Y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), (a && "set" in a && void 0 === (n = a.set(e, n, i))) || (l[t] = n))
                          ))
                );
            }
        },
        css: function (e, t, n, i) {
            var o,
                r,
                a,
                s = Z.camelCase(t);
            return (
                (t = Z.cssProps[s] || (Z.cssProps[s] = k(e.style, s))),
                (a = Z.cssHooks[t] || Z.cssHooks[s]),
                a && "get" in a && (o = a.get(e, !0, n)),
                void 0 === o && (o = $(e, t, i)),
                "normal" === o && t in Ve && (o = Ve[t]),
                "" === n || n ? ((r = parseFloat(o)), n === !0 || Z.isNumeric(r) ? r || 0 : o) : o
            );
        },
    }),
        Z.each(["height", "width"], function (e, t) {
            Z.cssHooks[t] = {
                get: function (e, n, i) {
                    return n
                        ? Be.test(Z.css(e, "display")) && 0 === e.offsetWidth
                            ? Z.swap(e, Ge, function () {
                                  return S(e, t, i);
                              })
                            : S(e, t, i)
                        : void 0;
                },
                set: function (e, n, i) {
                    var o = i && We(e);
                    return T(e, n, i ? C(e, t, i, "border-box" === Z.css(e, "boxSizing", !1, o), o) : 0);
                },
            };
        }),
        (Z.cssHooks.marginRight = w(Y.reliableMarginRight, function (e, t) {
            return t ? Z.swap(e, { display: "inline-block" }, $, [e, "marginRight"]) : void 0;
        })),
        Z.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
            (Z.cssHooks[e + t] = {
                expand: function (n) {
                    for (var i = 0, o = {}, r = "string" == typeof n ? n.split(" ") : [n]; 4 > i; i++) o[e + we[i] + t] = r[i] || r[i - 2] || r[0];
                    return o;
                },
            }),
                Re.test(e) || (Z.cssHooks[e + t].set = T);
        }),
        Z.fn.extend({
            css: function (e, t) {
                return me(
                    this,
                    function (e, t, n) {
                        var i,
                            o,
                            r = {},
                            a = 0;
                        if (Z.isArray(t)) {
                            for (i = We(e), o = t.length; o > a; a++) r[t[a]] = Z.css(e, t[a], !1, i);
                            return r;
                        }
                        return void 0 !== n ? Z.style(e, t, n) : Z.css(e, t);
                    },
                    e,
                    t,
                    arguments.length > 1
                );
            },
            show: function () {
                return E(this, !0);
            },
            hide: function () {
                return E(this);
            },
            toggle: function (e) {
                return "boolean" == typeof e
                    ? e
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          ke(this) ? Z(this).show() : Z(this).hide();
                      });
            },
        }),
        (Z.Tween = _),
        (_.prototype = {
            constructor: _,
            init: function (e, t, n, i, o, r) {
                (this.elem = e), (this.prop = n), (this.easing = o || "swing"), (this.options = t), (this.start = this.now = this.cur()), (this.end = i), (this.unit = r || (Z.cssNumber[n] ? "" : "px"));
            },
            cur: function () {
                var e = _.propHooks[this.prop];
                return e && e.get ? e.get(this) : _.propHooks._default.get(this);
            },
            run: function (e) {
                var t,
                    n = _.propHooks[this.prop];
                return (
                    this.options.duration ? (this.pos = t = Z.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration)) : (this.pos = t = e),
                    (this.now = (this.end - this.start) * t + this.start),
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : _.propHooks._default.set(this),
                    this
                );
            },
        }),
        (_.prototype.init.prototype = _.prototype),
        (_.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return null == e.elem[e.prop] || (e.elem.style && null != e.elem.style[e.prop]) ? ((t = Z.css(e.elem, e.prop, "")), t && "auto" !== t ? t : 0) : e.elem[e.prop];
                },
                set: function (e) {
                    Z.fx.step[e.prop] ? Z.fx.step[e.prop](e) : e.elem.style && (null != e.elem.style[Z.cssProps[e.prop]] || Z.cssHooks[e.prop]) ? Z.style(e.elem, e.prop, e.now + e.unit) : (e.elem[e.prop] = e.now);
                },
            },
        }),
        (_.propHooks.scrollTop = _.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
            },
        }),
        (Z.easing = {
            linear: function (e) {
                return e;
            },
            swing: function (e) {
                return 0.5 - Math.cos(e * Math.PI) / 2;
            },
        }),
        (Z.fx = _.prototype.init),
        (Z.fx.step = {});
    var Ye,
        Qe,
        Ke = /^(?:toggle|show|hide)$/,
        Ze = new RegExp("^(?:([+-])=|)(" + $e + ")([a-z%]*)$", "i"),
        et = /queueHooks$/,
        tt = [A],
        nt = {
            "*": [
                function (e, t) {
                    var n = this.createTween(e, t),
                        i = n.cur(),
                        o = Ze.exec(t),
                        r = (o && o[3]) || (Z.cssNumber[e] ? "" : "px"),
                        a = (Z.cssNumber[e] || ("px" !== r && +i)) && Ze.exec(Z.css(n.elem, e)),
                        s = 1,
                        l = 20;
                    if (a && a[3] !== r) {
                        (r = r || a[3]), (o = o || []), (a = +i || 1);
                        do (s = s || ".5"), (a /= s), Z.style(n.elem, e, a + r);
                        while (s !== (s = n.cur() / i) && 1 !== s && --l);
                    }
                    return o && ((a = n.start = +a || +i || 0), (n.unit = r), (n.end = o[1] ? a + (o[1] + 1) * o[2] : +o[2])), n;
                },
            ],
        };
    (Z.Animation = Z.extend(z, {
        tweener: function (e, t) {
            Z.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.split(" "));
            for (var n, i = 0, o = e.length; o > i; i++) (n = e[i]), (nt[n] = nt[n] || []), nt[n].unshift(t);
        },
        prefilter: function (e, t) {
            t ? tt.unshift(e) : tt.push(e);
        },
    })),
        (Z.speed = function (e, t, n) {
            var i = e && "object" == typeof e ? Z.extend({}, e) : { complete: n || (!n && t) || (Z.isFunction(e) && e), duration: e, easing: (n && t) || (t && !Z.isFunction(t) && t) };
            return (
                (i.duration = Z.fx.off ? 0 : "number" == typeof i.duration ? i.duration : i.duration in Z.fx.speeds ? Z.fx.speeds[i.duration] : Z.fx.speeds._default),
                (null == i.queue || i.queue === !0) && (i.queue = "fx"),
                (i.old = i.complete),
                (i.complete = function () {
                    Z.isFunction(i.old) && i.old.call(this), i.queue && Z.dequeue(this, i.queue);
                }),
                i
            );
        }),
        Z.fn.extend({
            fadeTo: function (e, t, n, i) {
                return this.filter(ke).css("opacity", 0).show().end().animate({ opacity: t }, e, n, i);
            },
            animate: function (e, t, n, i) {
                var o = Z.isEmptyObject(e),
                    r = Z.speed(t, n, i),
                    a = function () {
                        var t = z(this, Z.extend({}, e), r);
                        (o || ve.get(this, "finish")) && t.stop(!0);
                    };
                return (a.finish = a), o || r.queue === !1 ? this.each(a) : this.queue(r.queue, a);
            },
            stop: function (e, t, n) {
                var i = function (e) {
                    var t = e.stop;
                    delete e.stop, t(n);
                };
                return (
                    "string" != typeof e && ((n = t), (t = e), (e = void 0)),
                    t && e !== !1 && this.queue(e || "fx", []),
                    this.each(function () {
                        var t = !0,
                            o = null != e && e + "queueHooks",
                            r = Z.timers,
                            a = ve.get(this);
                        if (o) a[o] && a[o].stop && i(a[o]);
                        else for (o in a) a[o] && a[o].stop && et.test(o) && i(a[o]);
                        for (o = r.length; o--; ) r[o].elem !== this || (null != e && r[o].queue !== e) || (r[o].anim.stop(n), (t = !1), r.splice(o, 1));
                        (t || !n) && Z.dequeue(this, e);
                    })
                );
            },
            finish: function (e) {
                return (
                    e !== !1 && (e = e || "fx"),
                    this.each(function () {
                        var t,
                            n = ve.get(this),
                            i = n[e + "queue"],
                            o = n[e + "queueHooks"],
                            r = Z.timers,
                            a = i ? i.length : 0;
                        for (n.finish = !0, Z.queue(this, e, []), o && o.stop && o.stop.call(this, !0), t = r.length; t--; ) r[t].elem === this && r[t].queue === e && (r[t].anim.stop(!0), r.splice(t, 1));
                        for (t = 0; a > t; t++) i[t] && i[t].finish && i[t].finish.call(this);
                        delete n.finish;
                    })
                );
            },
        }),
        Z.each(["toggle", "show", "hide"], function (e, t) {
            var n = Z.fn[t];
            Z.fn[t] = function (e, i, o) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(D(t, !0), e, i, o);
            };
        }),
        Z.each({ slideDown: D("show"), slideUp: D("hide"), slideToggle: D("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
            Z.fn[e] = function (e, n, i) {
                return this.animate(t, e, n, i);
            };
        }),
        (Z.timers = []),
        (Z.fx.tick = function () {
            var e,
                t = 0,
                n = Z.timers;
            for (Ye = Z.now(); t < n.length; t++) (e = n[t]), e() || n[t] !== e || n.splice(t--, 1);
            n.length || Z.fx.stop(), (Ye = void 0);
        }),
        (Z.fx.timer = function (e) {
            Z.timers.push(e), e() ? Z.fx.start() : Z.timers.pop();
        }),
        (Z.fx.interval = 13),
        (Z.fx.start = function () {
            Qe || (Qe = setInterval(Z.fx.tick, Z.fx.interval));
        }),
        (Z.fx.stop = function () {
            clearInterval(Qe), (Qe = null);
        }),
        (Z.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (Z.fn.delay = function (e, t) {
            return (
                (e = Z.fx ? Z.fx.speeds[e] || e : e),
                (t = t || "fx"),
                this.queue(t, function (t, n) {
                    var i = setTimeout(t, e);
                    n.stop = function () {
                        clearTimeout(i);
                    };
                })
            );
        }),
        (function () {
            var e = Q.createElement("input"),
                t = Q.createElement("select"),
                n = t.appendChild(Q.createElement("option"));
            (e.type = "checkbox"),
                (Y.checkOn = "" !== e.value),
                (Y.optSelected = n.selected),
                (t.disabled = !0),
                (Y.optDisabled = !n.disabled),
                (e = Q.createElement("input")),
                (e.value = "t"),
                (e.type = "radio"),
                (Y.radioValue = "t" === e.value);
        })();
    var it,
        ot,
        rt = Z.expr.attrHandle;
    Z.fn.extend({
        attr: function (e, t) {
            return me(this, Z.attr, e, t, arguments.length > 1);
        },
        removeAttr: function (e) {
            return this.each(function () {
                Z.removeAttr(this, e);
            });
        },
    }),
        Z.extend({
            attr: function (e, t, n) {
                var i,
                    o,
                    r = e.nodeType;
                if (e && 3 !== r && 8 !== r && 2 !== r)
                    return typeof e.getAttribute === Ce
                        ? Z.prop(e, t, n)
                        : ((1 === r && Z.isXMLDoc(e)) || ((t = t.toLowerCase()), (i = Z.attrHooks[t] || (Z.expr.match.bool.test(t) ? ot : it))),
                          void 0 === n
                              ? i && "get" in i && null !== (o = i.get(e, t))
                                  ? o
                                  : ((o = Z.find.attr(e, t)), null == o ? void 0 : o)
                              : null !== n
                              ? i && "set" in i && void 0 !== (o = i.set(e, n, t))
                                  ? o
                                  : (e.setAttribute(t, n + ""), n)
                              : void Z.removeAttr(e, t));
            },
            removeAttr: function (e, t) {
                var n,
                    i,
                    o = 0,
                    r = t && t.match(fe);
                if (r && 1 === e.nodeType) for (; (n = r[o++]); ) (i = Z.propFix[n] || n), Z.expr.match.bool.test(n) && (e[i] = !1), e.removeAttribute(n);
            },
            attrHooks: {
                type: {
                    set: function (e, t) {
                        if (!Y.radioValue && "radio" === t && Z.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t), n && (e.value = n), t;
                        }
                    },
                },
            },
        }),
        (ot = {
            set: function (e, t, n) {
                return t === !1 ? Z.removeAttr(e, n) : e.setAttribute(n, n), n;
            },
        }),
        Z.each(Z.expr.match.bool.source.match(/\w+/g), function (e, t) {
            var n = rt[t] || Z.find.attr;
            rt[t] = function (e, t, i) {
                var o, r;
                return i || ((r = rt[t]), (rt[t] = o), (o = null != n(e, t, i) ? t.toLowerCase() : null), (rt[t] = r)), o;
            };
        });
    var at = /^(?:input|select|textarea|button)$/i;
    Z.fn.extend({
        prop: function (e, t) {
            return me(this, Z.prop, e, t, arguments.length > 1);
        },
        removeProp: function (e) {
            return this.each(function () {
                delete this[Z.propFix[e] || e];
            });
        },
    }),
        Z.extend({
            propFix: { for: "htmlFor", class: "className" },
            prop: function (e, t, n) {
                var i,
                    o,
                    r,
                    a = e.nodeType;
                if (e && 3 !== a && 8 !== a && 2 !== a)
                    return (
                        (r = 1 !== a || !Z.isXMLDoc(e)),
                        r && ((t = Z.propFix[t] || t), (o = Z.propHooks[t])),
                        void 0 !== n ? (o && "set" in o && void 0 !== (i = o.set(e, n, t)) ? i : (e[t] = n)) : o && "get" in o && null !== (i = o.get(e, t)) ? i : e[t]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (e) {
                        return e.hasAttribute("tabindex") || at.test(e.nodeName) || e.href ? e.tabIndex : -1;
                    },
                },
            },
        }),
        Y.optSelected ||
            (Z.propHooks.selected = {
                get: function (e) {
                    var t = e.parentNode;
                    return t && t.parentNode && t.parentNode.selectedIndex, null;
                },
            }),
        Z.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
            Z.propFix[this.toLowerCase()] = this;
        });
    var st = /[\t\r\n\f]/g;
    Z.fn.extend({
        addClass: function (e) {
            var t,
                n,
                i,
                o,
                r,
                a,
                s = "string" == typeof e && e,
                l = 0,
                c = this.length;
            if (Z.isFunction(e))
                return this.each(function (t) {
                    Z(this).addClass(e.call(this, t, this.className));
                });
            if (s)
                for (t = (e || "").match(fe) || []; c > l; l++)
                    if (((n = this[l]), (i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : " ")))) {
                        for (r = 0; (o = t[r++]); ) i.indexOf(" " + o + " ") < 0 && (i += o + " ");
                        (a = Z.trim(i)), n.className !== a && (n.className = a);
                    }
            return this;
        },
        removeClass: function (e) {
            var t,
                n,
                i,
                o,
                r,
                a,
                s = 0 === arguments.length || ("string" == typeof e && e),
                l = 0,
                c = this.length;
            if (Z.isFunction(e))
                return this.each(function (t) {
                    Z(this).removeClass(e.call(this, t, this.className));
                });
            if (s)
                for (t = (e || "").match(fe) || []; c > l; l++)
                    if (((n = this[l]), (i = 1 === n.nodeType && (n.className ? (" " + n.className + " ").replace(st, " ") : "")))) {
                        for (r = 0; (o = t[r++]); ) for (; i.indexOf(" " + o + " ") >= 0; ) i = i.replace(" " + o + " ", " ");
                        (a = e ? Z.trim(i) : ""), n.className !== a && (n.className = a);
                    }
            return this;
        },
        toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n
                ? t
                    ? this.addClass(e)
                    : this.removeClass(e)
                : this.each(
                      Z.isFunction(e)
                          ? function (n) {
                                Z(this).toggleClass(e.call(this, n, this.className, t), t);
                            }
                          : function () {
                                if ("string" === n) for (var t, i = 0, o = Z(this), r = e.match(fe) || []; (t = r[i++]); ) o.hasClass(t) ? o.removeClass(t) : o.addClass(t);
                                else (n === Ce || "boolean" === n) && (this.className && ve.set(this, "__className__", this.className), (this.className = this.className || e === !1 ? "" : ve.get(this, "__className__") || ""));
                            }
                  );
        },
        hasClass: function (e) {
            for (var t = " " + e + " ", n = 0, i = this.length; i > n; n++) if (1 === this[n].nodeType && (" " + this[n].className + " ").replace(st, " ").indexOf(t) >= 0) return !0;
            return !1;
        },
    });
    var lt = /\r/g;
    Z.fn.extend({
        val: function (e) {
            var t,
                n,
                i,
                o = this[0];
            return arguments.length
                ? ((i = Z.isFunction(e)),
                  this.each(function (n) {
                      var o;
                      1 === this.nodeType &&
                          ((o = i ? e.call(this, n, Z(this).val()) : e),
                          null == o
                              ? (o = "")
                              : "number" == typeof o
                              ? (o += "")
                              : Z.isArray(o) &&
                                (o = Z.map(o, function (e) {
                                    return null == e ? "" : e + "";
                                })),
                          (t = Z.valHooks[this.type] || Z.valHooks[this.nodeName.toLowerCase()]),
                          (t && "set" in t && void 0 !== t.set(this, o, "value")) || (this.value = o));
                  }))
                : o
                ? ((t = Z.valHooks[o.type] || Z.valHooks[o.nodeName.toLowerCase()]), t && "get" in t && void 0 !== (n = t.get(o, "value")) ? n : ((n = o.value), "string" == typeof n ? n.replace(lt, "") : null == n ? "" : n))
                : void 0;
        },
    }),
        Z.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = Z.find.attr(e, "value");
                        return null != t ? t : Z.trim(Z.text(e));
                    },
                },
                select: {
                    get: function (e) {
                        for (var t, n, i = e.options, o = e.selectedIndex, r = "select-one" === e.type || 0 > o, a = r ? null : [], s = r ? o + 1 : i.length, l = 0 > o ? s : r ? o : 0; s > l; l++)
                            if (((n = i[l]), !((!n.selected && l !== o) || (Y.optDisabled ? n.disabled : null !== n.getAttribute("disabled")) || (n.parentNode.disabled && Z.nodeName(n.parentNode, "optgroup"))))) {
                                if (((t = Z(n).val()), r)) return t;
                                a.push(t);
                            }
                        return a;
                    },
                    set: function (e, t) {
                        for (var n, i, o = e.options, r = Z.makeArray(t), a = o.length; a--; ) (i = o[a]), (i.selected = Z.inArray(i.value, r) >= 0) && (n = !0);
                        return n || (e.selectedIndex = -1), r;
                    },
                },
            },
        }),
        Z.each(["radio", "checkbox"], function () {
            (Z.valHooks[this] = {
                set: function (e, t) {
                    return Z.isArray(t) ? (e.checked = Z.inArray(Z(e).val(), t) >= 0) : void 0;
                },
            }),
                Y.checkOn ||
                    (Z.valHooks[this].get = function (e) {
                        return null === e.getAttribute("value") ? "on" : e.value;
                    });
        }),
        Z.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (
            e,
            t
        ) {
            Z.fn[t] = function (e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
            };
        }),
        Z.fn.extend({
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e);
            },
            bind: function (e, t, n) {
                return this.on(e, null, t, n);
            },
            unbind: function (e, t) {
                return this.off(e, null, t);
            },
            delegate: function (e, t, n, i) {
                return this.on(t, e, n, i);
            },
            undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n);
            },
        });
    var ct = Z.now(),
        ut = /\?/;
    (Z.parseJSON = function (e) {
        return JSON.parse(e + "");
    }),
        (Z.parseXML = function (e) {
            var t, n;
            if (!e || "string" != typeof e) return null;
            try {
                (n = new DOMParser()), (t = n.parseFromString(e, "text/xml"));
            } catch (i) {
                t = void 0;
            }
            return (!t || t.getElementsByTagName("parsererror").length) && Z.error("Invalid XML: " + e), t;
        });
    var pt = /#.*$/,
        dt = /([?&])_=[^&]*/,
        ft = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        ht = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        gt = /^(?:GET|HEAD)$/,
        mt = /^\/\//,
        vt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        yt = {},
        bt = {},
        xt = "*/".concat("*"),
        $t = e.location.href,
        wt = vt.exec($t.toLowerCase()) || [];
    Z.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: $t,
            type: "GET",
            isLocal: ht.test(wt[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: { "*": xt, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" },
            contents: { xml: /xml/, html: /html/, json: /json/ },
            responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" },
            converters: { "* text": String, "text html": !0, "text json": Z.parseJSON, "text xml": Z.parseXML },
            flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (e, t) {
            return t ? M(M(e, Z.ajaxSettings), t) : M(Z.ajaxSettings, e);
        },
        ajaxPrefilter: H(yt),
        ajaxTransport: H(bt),
        ajax: function (e, t) {
            function n(e, t, n, a) {
                var l,
                    u,
                    v,
                    y,
                    x,
                    w = t;
                2 !== b &&
                    ((b = 2),
                    s && clearTimeout(s),
                    (i = void 0),
                    (r = a || ""),
                    ($.readyState = e > 0 ? 4 : 0),
                    (l = (e >= 200 && 300 > e) || 304 === e),
                    n && (y = F(p, $, n)),
                    (y = P(p, y, $, l)),
                    l
                        ? (p.ifModified && ((x = $.getResponseHeader("Last-Modified")), x && (Z.lastModified[o] = x), (x = $.getResponseHeader("etag")), x && (Z.etag[o] = x)),
                          204 === e || "HEAD" === p.type ? (w = "nocontent") : 304 === e ? (w = "notmodified") : ((w = y.state), (u = y.data), (v = y.error), (l = !v)))
                        : ((v = w), (e || !w) && ((w = "error"), 0 > e && (e = 0))),
                    ($.status = e),
                    ($.statusText = (t || w) + ""),
                    l ? h.resolveWith(d, [u, w, $]) : h.rejectWith(d, [$, w, v]),
                    $.statusCode(m),
                    (m = void 0),
                    c && f.trigger(l ? "ajaxSuccess" : "ajaxError", [$, p, l ? u : v]),
                    g.fireWith(d, [$, w]),
                    c && (f.trigger("ajaxComplete", [$, p]), --Z.active || Z.event.trigger("ajaxStop")));
            }
            "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
            var i,
                o,
                r,
                a,
                s,
                l,
                c,
                u,
                p = Z.ajaxSetup({}, t),
                d = p.context || p,
                f = p.context && (d.nodeType || d.jquery) ? Z(d) : Z.event,
                h = Z.Deferred(),
                g = Z.Callbacks("once memory"),
                m = p.statusCode || {},
                v = {},
                y = {},
                b = 0,
                x = "canceled",
                $ = {
                    readyState: 0,
                    getResponseHeader: function (e) {
                        var t;
                        if (2 === b) {
                            if (!a) for (a = {}; (t = ft.exec(r)); ) a[t[1].toLowerCase()] = t[2];
                            t = a[e.toLowerCase()];
                        }
                        return null == t ? null : t;
                    },
                    getAllResponseHeaders: function () {
                        return 2 === b ? r : null;
                    },
                    setRequestHeader: function (e, t) {
                        var n = e.toLowerCase();
                        return b || ((e = y[n] = y[n] || e), (v[e] = t)), this;
                    },
                    overrideMimeType: function (e) {
                        return b || (p.mimeType = e), this;
                    },
                    statusCode: function (e) {
                        var t;
                        if (e)
                            if (2 > b) for (t in e) m[t] = [m[t], e[t]];
                            else $.always(e[$.status]);
                        return this;
                    },
                    abort: function (e) {
                        var t = e || x;
                        return i && i.abort(t), n(0, t), this;
                    },
                };
            if (
                ((h.promise($).complete = g.add),
                ($.success = $.done),
                ($.error = $.fail),
                (p.url = ((e || p.url || $t) + "").replace(pt, "").replace(mt, wt[1] + "//")),
                (p.type = t.method || t.type || p.method || p.type),
                (p.dataTypes = Z.trim(p.dataType || "*")
                    .toLowerCase()
                    .match(fe) || [""]),
                null == p.crossDomain && ((l = vt.exec(p.url.toLowerCase())), (p.crossDomain = !(!l || (l[1] === wt[1] && l[2] === wt[2] && (l[3] || ("http:" === l[1] ? "80" : "443")) === (wt[3] || ("http:" === wt[1] ? "80" : "443")))))),
                p.data && p.processData && "string" != typeof p.data && (p.data = Z.param(p.data, p.traditional)),
                q(yt, p, t, $),
                2 === b)
            )
                return $;
            (c = Z.event && p.global),
                c && 0 === Z.active++ && Z.event.trigger("ajaxStart"),
                (p.type = p.type.toUpperCase()),
                (p.hasContent = !gt.test(p.type)),
                (o = p.url),
                p.hasContent || (p.data && ((o = p.url += (ut.test(o) ? "&" : "?") + p.data), delete p.data), p.cache === !1 && (p.url = dt.test(o) ? o.replace(dt, "$1_=" + ct++) : o + (ut.test(o) ? "&" : "?") + "_=" + ct++)),
                p.ifModified && (Z.lastModified[o] && $.setRequestHeader("If-Modified-Since", Z.lastModified[o]), Z.etag[o] && $.setRequestHeader("If-None-Match", Z.etag[o])),
                ((p.data && p.hasContent && p.contentType !== !1) || t.contentType) && $.setRequestHeader("Content-Type", p.contentType),
                $.setRequestHeader("Accept", p.dataTypes[0] && p.accepts[p.dataTypes[0]] ? p.accepts[p.dataTypes[0]] + ("*" !== p.dataTypes[0] ? ", " + xt + "; q=0.01" : "") : p.accepts["*"]);
            for (u in p.headers) $.setRequestHeader(u, p.headers[u]);
            if (p.beforeSend && (p.beforeSend.call(d, $, p) === !1 || 2 === b)) return $.abort();
            x = "abort";
            for (u in { success: 1, error: 1, complete: 1 }) $[u](p[u]);
            if ((i = q(bt, p, t, $))) {
                ($.readyState = 1),
                    c && f.trigger("ajaxSend", [$, p]),
                    p.async &&
                        p.timeout > 0 &&
                        (s = setTimeout(function () {
                            $.abort("timeout");
                        }, p.timeout));
                try {
                    (b = 1), i.send(v, n);
                } catch (w) {
                    if (!(2 > b)) throw w;
                    n(-1, w);
                }
            } else n(-1, "No Transport");
            return $;
        },
        getJSON: function (e, t, n) {
            return Z.get(e, t, n, "json");
        },
        getScript: function (e, t) {
            return Z.get(e, void 0, t, "script");
        },
    }),
        Z.each(["get", "post"], function (e, t) {
            Z[t] = function (e, n, i, o) {
                return Z.isFunction(n) && ((o = o || i), (i = n), (n = void 0)), Z.ajax({ url: e, type: t, dataType: o, data: n, success: i });
            };
        }),
        (Z._evalUrl = function (e) {
            return Z.ajax({ url: e, type: "GET", dataType: "script", async: !1, global: !1, throws: !0 });
        }),
        Z.fn.extend({
            wrapAll: function (e) {
                var t;
                return Z.isFunction(e)
                    ? this.each(function (t) {
                          Z(this).wrapAll(e.call(this, t));
                      })
                    : (this[0] &&
                          ((t = Z(e, this[0].ownerDocument).eq(0).clone(!0)),
                          this[0].parentNode && t.insertBefore(this[0]),
                          t
                              .map(function () {
                                  for (var e = this; e.firstElementChild; ) e = e.firstElementChild;
                                  return e;
                              })
                              .append(this)),
                      this);
            },
            wrapInner: function (e) {
                return this.each(
                    Z.isFunction(e)
                        ? function (t) {
                              Z(this).wrapInner(e.call(this, t));
                          }
                        : function () {
                              var t = Z(this),
                                  n = t.contents();
                              n.length ? n.wrapAll(e) : t.append(e);
                          }
                );
            },
            wrap: function (e) {
                var t = Z.isFunction(e);
                return this.each(function (n) {
                    Z(this).wrapAll(t ? e.call(this, n) : e);
                });
            },
            unwrap: function () {
                return this.parent()
                    .each(function () {
                        Z.nodeName(this, "body") || Z(this).replaceWith(this.childNodes);
                    })
                    .end();
            },
        }),
        (Z.expr.filters.hidden = function (e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0;
        }),
        (Z.expr.filters.visible = function (e) {
            return !Z.expr.filters.hidden(e);
        });
    var kt = /%20/g,
        Tt = /\[\]$/,
        Ct = /\r?\n/g,
        St = /^(?:submit|button|image|reset|file)$/i,
        Et = /^(?:input|select|textarea|keygen)/i;
    (Z.param = function (e, t) {
        var n,
            i = [],
            o = function (e, t) {
                (t = Z.isFunction(t) ? t() : null == t ? "" : t), (i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
            };
        if ((void 0 === t && (t = Z.ajaxSettings && Z.ajaxSettings.traditional), Z.isArray(e) || (e.jquery && !Z.isPlainObject(e))))
            Z.each(e, function () {
                o(this.name, this.value);
            });
        else for (n in e) O(n, e[n], t, o);
        return i.join("&").replace(kt, "+");
    }),
        Z.fn.extend({
            serialize: function () {
                return Z.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var e = Z.prop(this, "elements");
                    return e ? Z.makeArray(e) : this;
                })
                    .filter(function () {
                        var e = this.type;
                        return this.name && !Z(this).is(":disabled") && Et.test(this.nodeName) && !St.test(e) && (this.checked || !Te.test(e));
                    })
                    .map(function (e, t) {
                        var n = Z(this).val();
                        return null == n
                            ? null
                            : Z.isArray(n)
                            ? Z.map(n, function (e) {
                                  return { name: t.name, value: e.replace(Ct, "\r\n") };
                              })
                            : { name: t.name, value: n.replace(Ct, "\r\n") };
                    })
                    .get();
            },
        }),
        (Z.ajaxSettings.xhr = function () {
            try {
                return new XMLHttpRequest();
            } catch (e) {}
        });
    var _t = 0,
        Nt = {},
        Dt = { 0: 200, 1223: 204 },
        jt = Z.ajaxSettings.xhr();
    e.attachEvent &&
        e.attachEvent("onunload", function () {
            for (var e in Nt) Nt[e]();
        }),
        (Y.cors = !!jt && "withCredentials" in jt),
        (Y.ajax = jt = !!jt),
        Z.ajaxTransport(function (e) {
            var t;
            return Y.cors || (jt && !e.crossDomain)
                ? {
                      send: function (n, i) {
                          var o,
                              r = e.xhr(),
                              a = ++_t;
                          if ((r.open(e.type, e.url, e.async, e.username, e.password), e.xhrFields)) for (o in e.xhrFields) r[o] = e.xhrFields[o];
                          e.mimeType && r.overrideMimeType && r.overrideMimeType(e.mimeType), e.crossDomain || n["X-Requested-With"] || (n["X-Requested-With"] = "XMLHttpRequest");
                          for (o in n) r.setRequestHeader(o, n[o]);
                          (t = function (e) {
                              return function () {
                                  t &&
                                      (delete Nt[a],
                                      (t = r.onload = r.onerror = null),
                                      "abort" === e
                                          ? r.abort()
                                          : "error" === e
                                          ? i(r.status, r.statusText)
                                          : i(Dt[r.status] || r.status, r.statusText, "string" == typeof r.responseText ? { text: r.responseText } : void 0, r.getAllResponseHeaders()));
                              };
                          }),
                              (r.onload = t()),
                              (r.onerror = t("error")),
                              (t = Nt[a] = t("abort"));
                          try {
                              r.send((e.hasContent && e.data) || null);
                          } catch (s) {
                              if (t) throw s;
                          }
                      },
                      abort: function () {
                          t && t();
                      },
                  }
                : void 0;
        }),
        Z.ajaxSetup({
            accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" },
            contents: { script: /(?:java|ecma)script/ },
            converters: {
                "text script": function (e) {
                    return Z.globalEval(e), e;
                },
            },
        }),
        Z.ajaxPrefilter("script", function (e) {
            void 0 === e.cache && (e.cache = !1), e.crossDomain && (e.type = "GET");
        }),
        Z.ajaxTransport("script", function (e) {
            if (e.crossDomain) {
                var t, n;
                return {
                    send: function (i, o) {
                        (t = Z("<script>")
                            .prop({ async: !0, charset: e.scriptCharset, src: e.url })
                            .on(
                                "load error",
                                (n = function (e) {
                                    t.remove(), (n = null), e && o("error" === e.type ? 404 : 200, e.type);
                                })
                            )),
                            Q.head.appendChild(t[0]);
                    },
                    abort: function () {
                        n && n();
                    },
                };
            }
        });
    var At = [],
        Lt = /(=)\?(?=&|$)|\?\?/;
    Z.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = At.pop() || Z.expando + "_" + ct++;
            return (this[e] = !0), e;
        },
    }),
        Z.ajaxPrefilter("json jsonp", function (t, n, i) {
            var o,
                r,
                a,
                s = t.jsonp !== !1 && (Lt.test(t.url) ? "url" : "string" == typeof t.data && !(t.contentType || "").indexOf("application/x-www-form-urlencoded") && Lt.test(t.data) && "data");
            return s || "jsonp" === t.dataTypes[0]
                ? ((o = t.jsonpCallback = Z.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback),
                  s ? (t[s] = t[s].replace(Lt, "$1" + o)) : t.jsonp !== !1 && (t.url += (ut.test(t.url) ? "&" : "?") + t.jsonp + "=" + o),
                  (t.converters["script json"] = function () {
                      return a || Z.error(o + " was not called"), a[0];
                  }),
                  (t.dataTypes[0] = "json"),
                  (r = e[o]),
                  (e[o] = function () {
                      a = arguments;
                  }),
                  i.always(function () {
                      (e[o] = r), t[o] && ((t.jsonpCallback = n.jsonpCallback), At.push(o)), a && Z.isFunction(r) && r(a[0]), (a = r = void 0);
                  }),
                  "script")
                : void 0;
        }),
        (Z.parseHTML = function (e, t, n) {
            if (!e || "string" != typeof e) return null;
            "boolean" == typeof t && ((n = t), (t = !1)), (t = t || Q);
            var i = ae.exec(e),
                o = !n && [];
            return i ? [t.createElement(i[1])] : ((i = Z.buildFragment([e], t, o)), o && o.length && Z(o).remove(), Z.merge([], i.childNodes));
        });
    var zt = Z.fn.load;
    (Z.fn.load = function (e, t, n) {
        if ("string" != typeof e && zt) return zt.apply(this, arguments);
        var i,
            o,
            r,
            a = this,
            s = e.indexOf(" ");
        return (
            s >= 0 && ((i = Z.trim(e.slice(s))), (e = e.slice(0, s))),
            Z.isFunction(t) ? ((n = t), (t = void 0)) : t && "object" == typeof t && (o = "POST"),
            a.length > 0 &&
                Z.ajax({ url: e, type: o, dataType: "html", data: t })
                    .done(function (e) {
                        (r = arguments), a.html(i ? Z("<div>").append(Z.parseHTML(e)).find(i) : e);
                    })
                    .complete(
                        n &&
                            function (e, t) {
                                a.each(n, r || [e.responseText, t, e]);
                            }
                    ),
            this
        );
    }),
        Z.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (e, t) {
            Z.fn[t] = function (e) {
                return this.on(t, e);
            };
        }),
        (Z.expr.filters.animated = function (e) {
            return Z.grep(Z.timers, function (t) {
                return e === t.elem;
            }).length;
        });
    var Ht = e.document.documentElement;
    (Z.offset = {
        setOffset: function (e, t, n) {
            var i,
                o,
                r,
                a,
                s,
                l,
                c,
                u = Z.css(e, "position"),
                p = Z(e),
                d = {};
            "static" === u && (e.style.position = "relative"),
                (s = p.offset()),
                (r = Z.css(e, "top")),
                (l = Z.css(e, "left")),
                (c = ("absolute" === u || "fixed" === u) && (r + l).indexOf("auto") > -1),
                c ? ((i = p.position()), (a = i.top), (o = i.left)) : ((a = parseFloat(r) || 0), (o = parseFloat(l) || 0)),
                Z.isFunction(t) && (t = t.call(e, n, s)),
                null != t.top && (d.top = t.top - s.top + a),
                null != t.left && (d.left = t.left - s.left + o),
                "using" in t ? t.using.call(e, d) : p.css(d);
        },
    }),
        Z.fn.extend({
            offset: function (e) {
                if (arguments.length)
                    return void 0 === e
                        ? this
                        : this.each(function (t) {
                              Z.offset.setOffset(this, e, t);
                          });
                var t,
                    n,
                    i = this[0],
                    o = { top: 0, left: 0 },
                    r = i && i.ownerDocument;
                return r
                    ? ((t = r.documentElement),
                      Z.contains(t, i) ? (typeof i.getBoundingClientRect !== Ce && (o = i.getBoundingClientRect()), (n = R(r)), { top: o.top + n.pageYOffset - t.clientTop, left: o.left + n.pageXOffset - t.clientLeft }) : o)
                    : void 0;
            },
            position: function () {
                if (this[0]) {
                    var e,
                        t,
                        n = this[0],
                        i = { top: 0, left: 0 };
                    return (
                        "fixed" === Z.css(n, "position")
                            ? (t = n.getBoundingClientRect())
                            : ((e = this.offsetParent()), (t = this.offset()), Z.nodeName(e[0], "html") || (i = e.offset()), (i.top += Z.css(e[0], "borderTopWidth", !0)), (i.left += Z.css(e[0], "borderLeftWidth", !0))),
                        { top: t.top - i.top - Z.css(n, "marginTop", !0), left: t.left - i.left - Z.css(n, "marginLeft", !0) }
                    );
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    for (var e = this.offsetParent || Ht; e && !Z.nodeName(e, "html") && "static" === Z.css(e, "position"); ) e = e.offsetParent;
                    return e || Ht;
                });
            },
        }),
        Z.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (t, n) {
            var i = "pageYOffset" === n;
            Z.fn[t] = function (o) {
                return me(
                    this,
                    function (t, o, r) {
                        var a = R(t);
                        return void 0 === r ? (a ? a[n] : t[o]) : void (a ? a.scrollTo(i ? e.pageXOffset : r, i ? r : e.pageYOffset) : (t[o] = r));
                    },
                    t,
                    o,
                    arguments.length,
                    null
                );
            };
        }),
        Z.each(["top", "left"], function (e, t) {
            Z.cssHooks[t] = w(Y.pixelPosition, function (e, n) {
                return n ? ((n = $(e, t)), Ie.test(n) ? Z(e).position()[t] + "px" : n) : void 0;
            });
        }),
        Z.each({ Height: "height", Width: "width" }, function (e, t) {
            Z.each({ padding: "inner" + e, content: t, "": "outer" + e }, function (n, i) {
                Z.fn[i] = function (i, o) {
                    var r = arguments.length && (n || "boolean" != typeof i),
                        a = n || (i === !0 || o === !0 ? "margin" : "border");
                    return me(
                        this,
                        function (t, n, i) {
                            var o;
                            return Z.isWindow(t)
                                ? t.document.documentElement["client" + e]
                                : 9 === t.nodeType
                                ? ((o = t.documentElement), Math.max(t.body["scroll" + e], o["scroll" + e], t.body["offset" + e], o["offset" + e], o["client" + e]))
                                : void 0 === i
                                ? Z.css(t, n, a)
                                : Z.style(t, n, i, a);
                        },
                        t,
                        r ? i : void 0,
                        r,
                        null
                    );
                };
            });
        }),
        (Z.fn.size = function () {
            return this.length;
        }),
        (Z.fn.andSelf = Z.fn.addBack),
        "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
                return Z;
            });
    var qt = e.jQuery,
        Mt = e.$;
    return (
        (Z.noConflict = function (t) {
            return e.$ === Z && (e.$ = Mt), t && e.jQuery === Z && (e.jQuery = qt), Z;
        }),
        typeof t === Ce && (e.jQuery = e.$ = Z),
        Z
    );
}),
    !(function (e) {
        var t = e(window);
        e.fn.visible = function (e, n, i) {
            if (!(this.length < 1)) {
                var o = this.length > 1 ? this.eq(0) : this,
                    r = o.get(0),
                    a = t.width(),
                    s = t.height(),
                    i = i ? i : "both",
                    l = n !== !0 || r.offsetWidth * r.offsetHeight;
                if ("function" == typeof r.getBoundingClientRect) {
                    var c = r.getBoundingClientRect(),
                        u = c.top >= 0 && c.top < s,
                        p = c.bottom > 0 && c.bottom <= s,
                        d = c.left >= 0 && c.left < a,
                        f = c.right > 0 && c.right <= a,
                        h = e ? u || p : u && p,
                        g = e ? d || f : d && f;
                    if ("both" === i) return l && h && g;
                    if ("vertical" === i) return l && h;
                    if ("horizontal" === i) return l && g;
                } else {
                    var m = t.scrollTop(),
                        v = m + s,
                        y = t.scrollLeft(),
                        b = y + a,
                        x = o.offset(),
                        $ = x.top,
                        w = $ + o.height(),
                        k = x.left,
                        T = k + o.width(),
                        C = e === !0 ? w : $,
                        S = e === !0 ? $ : w,
                        E = e === !0 ? T : k,
                        _ = e === !0 ? k : T;
                    if ("both" === i) return !!l && v >= S && C >= m && b >= _ && E >= y;
                    if ("vertical" === i) return !!l && v >= S && C >= m;
                    if ("horizontal" === i) return !!l && b >= _ && E >= y;
                }
            }
        };
    })(jQuery),
    function () {
        var e = this,
            t = "addEventListener",
            n = "removeEventListener",
            i = "getBoundingClientRect",
            o = e.attachEvent && !e[t],
            r = e.document,
            a = (function () {
                for (var e, t = ["", "-webkit-", "-moz-", "-o-"], n = 0; n < t.length; n++) if (((e = r.createElement("div")), (e.style.cssText = "width:" + t[n] + "calc(9px)"), e.style.length)) return t[n] + "calc";
            })(),
            s = function (e) {
                return "string" == typeof e || e instanceof String ? r.querySelector(e) : e;
            },
            l = function (l, c) {
                var u,
                    p,
                    d,
                    f,
                    h,
                    g,
                    m,
                    v,
                    y = [];
                (c = "undefined" != typeof c ? c : {}),
                    "undefined" == typeof c.gutterSize && (c.gutterSize = 10),
                    "undefined" == typeof c.minSize && (c.minSize = 100),
                    "undefined" == typeof c.snapOffset && (c.snapOffset = 30),
                    "undefined" == typeof c.direction && (c.direction = "horizontal"),
                    "horizontal" == c.direction
                        ? ((u = "width"), (d = "clientWidth"), (f = "clientX"), (h = "left"), (g = "gutter gutter-horizontal"), (m = "paddingLeft"), (v = "paddingRight"), c.cursor || (c.cursor = "ew-resize"))
                        : "vertical" == c.direction && ((u = "height"), (d = "clientHeight"), (f = "clientY"), (h = "top"), (g = "gutter gutter-vertical"), (m = "paddingTop"), (v = "paddingBottom"), c.cursor || (c.cursor = "ns-resize"));
                var b = function (n) {
                        var i = this,
                            o = i.a,
                            r = i.b;
                        !i.dragging && c.onDragStart && c.onDragStart(),
                            n.preventDefault(),
                            (i.dragging = !0),
                            (i.move = $.bind(i)),
                            (i.stop = x.bind(i)),
                            e[t]("mouseup", i.stop),
                            e[t]("touchend", i.stop),
                            e[t]("touchcancel", i.stop),
                            i.parent[t]("mousemove", i.move),
                            i.parent[t]("touchmove", i.move),
                            o[t]("selectstart", E),
                            o[t]("dragstart", E),
                            r[t]("selectstart", E),
                            r[t]("dragstart", E),
                            (o.style.userSelect = "none"),
                            (o.style.webkitUserSelect = "none"),
                            (o.style.MozUserSelect = "none"),
                            (o.style.pointerEvents = "none"),
                            (r.style.userSelect = "none"),
                            (r.style.webkitUserSelect = "none"),
                            (r.style.MozUserSelect = "none"),
                            (r.style.pointerEvents = "none"),
                            (i.gutter.style.cursor = c.cursor),
                            (i.parent.style.cursor = c.cursor),
                            w.call(i);
                    },
                    x = function () {
                        var t = this,
                            i = t.a,
                            o = t.b;
                        t.dragging && c.onDragEnd && c.onDragEnd(),
                            (t.dragging = !1),
                            e[n]("mouseup", t.stop),
                            e[n]("touchend", t.stop),
                            e[n]("touchcancel", t.stop),
                            t.parent[n]("mousemove", t.move),
                            t.parent[n]("touchmove", t.move),
                            delete t.stop,
                            delete t.move,
                            i[n]("selectstart", E),
                            i[n]("dragstart", E),
                            o[n]("selectstart", E),
                            o[n]("dragstart", E),
                            (i.style.userSelect = ""),
                            (i.style.webkitUserSelect = ""),
                            (i.style.MozUserSelect = ""),
                            (i.style.pointerEvents = ""),
                            (o.style.userSelect = ""),
                            (o.style.webkitUserSelect = ""),
                            (o.style.MozUserSelect = ""),
                            (o.style.pointerEvents = ""),
                            (t.gutter.style.cursor = ""),
                            (t.parent.style.cursor = "");
                    },
                    $ = function (e) {
                        var t;
                        this.dragging &&
                            ((t = "touches" in e ? e.touches[0][f] - this.start : e[f] - this.start),
                            t <= this.aMin + c.snapOffset ? (t = this.aMin) : t >= this.size - this.bMin - c.snapOffset && (t = this.size - this.bMin),
                            k.call(this, t),
                            c.onDrag && c.onDrag());
                    },
                    w = function () {
                        var t = e.getComputedStyle(this.parent),
                            n = this.parent[d] - parseFloat(t[m]) - parseFloat(t[v]);
                        (this.size = this.a[i]()[u] + this.b[i]()[u] + this.aGutterSize + this.bGutterSize), (this.percentage = Math.min((this.size / n) * 100, 100)), (this.start = this.a[i]()[h]);
                    },
                    k = function (e) {
                        (this.a.style[u] = a + "(" + (e / this.size) * this.percentage + "% - " + this.aGutterSize + "px)"),
                            (this.b.style[u] = a + "(" + (this.percentage - (e / this.size) * this.percentage) + "% - " + this.bGutterSize + "px)");
                    },
                    T = function () {
                        var e = this,
                            t = e.a,
                            n = e.b;
                        t[i]()[u] < e.aMin
                            ? ((t.style[u] = e.aMin - e.aGutterSize + "px"), (n.style[u] = e.size - e.aMin - e.aGutterSize + "px"))
                            : n[i]()[u] < e.bMin && ((t.style[u] = e.size - e.bMin - e.bGutterSize + "px"), (n.style[u] = e.bMin - e.bGutterSize + "px"));
                    },
                    C = function () {
                        var e = this,
                            t = e.a,
                            n = e.b;
                        n[i]()[u] < e.bMin
                            ? ((t.style[u] = e.size - e.bMin - e.bGutterSize + "px"), (n.style[u] = e.bMin - e.bGutterSize + "px"))
                            : t[i]()[u] < e.aMin && ((t.style[u] = e.aMin - e.aGutterSize + "px"), (n.style[u] = e.size - e.aMin - e.aGutterSize + "px"));
                    },
                    S = function (e) {
                        for (var t = 0; t < e.length; t++) w.call(e[t]), T.call(e[t]);
                        for (t = e.length - 1; t >= 0; t--) w.call(e[t]), C.call(e[t]);
                    },
                    E = function () {
                        return !1;
                    },
                    _ = s(l[0]).parentNode;
                if (!c.sizes) {
                    var N = 100 / l.length;
                    for (c.sizes = [], p = 0; p < l.length; p++) c.sizes.push(N);
                }
                if (!Array.isArray(c.minSize)) {
                    var D = [];
                    for (p = 0; p < l.length; p++) D.push(c.minSize);
                    c.minSize = D;
                }
                for (p = 0; p < l.length; p++) {
                    var j,
                        A,
                        L = s(l[p]),
                        z = 1 == p,
                        H = p == l.length - 1,
                        q = c.gutterSize;
                    if (
                        (p > 0 &&
                            ((A = { a: s(l[p - 1]), b: L, aMin: c.minSize[p - 1], bMin: c.minSize[p], dragging: !1, parent: _, isFirst: z, isLast: H, direction: c.direction }),
                            (A.aGutterSize = c.gutterSize),
                            (A.bGutterSize = c.gutterSize),
                            z && (A.aGutterSize = c.gutterSize / 2),
                            H && (A.bGutterSize = c.gutterSize / 2)),
                        o)
                    )
                        j = "string" == typeof c.sizes[p] || c.sizes[p] instanceof String ? c.sizes[p] : c.sizes[p] + "%";
                    else {
                        if (p > 0) {
                            var M = r.createElement("div");
                            (M.className = g), (M.style[u] = c.gutterSize + "px"), M[t]("mousedown", b.bind(A)), M[t]("touchstart", b.bind(A)), _.insertBefore(M, L), (A.gutter = M);
                        }
                        (0 !== p && p != l.length - 1) || (q = c.gutterSize / 2), (j = "string" == typeof c.sizes[p] || c.sizes[p] instanceof String ? c.sizes[p] : a + "(" + c.sizes[p] + "% - " + q + "px)");
                    }
                    (L.style[u] = j), p > 0 && y.push(A);
                }
                S(y);
            };
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = l), (exports.Split = l)) : (e.Split = l);
    }.call(window);
var delay = (function () {
        var e = 0;
        return function (t, n) {
            clearTimeout(e), (e = setTimeout(t, n));
        };
    })(),
    currentUser = new userSettings(!1, !1, "codepad"),
    autosaveTimeoutVar;
(previewIframeLoading = !0),
    $(function () {
        function e() {
            setTimeout(function () {
                $(".notification-bar").fadeOut();
            }, 3e3);
        }
        function t(e, t, n) {
            var i;
            if (n) {
                var o = new Date();
                o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3), (i = "; expires=" + o.toGMTString());
            } else i = "";
            document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + i + "; path=/";
        }
        function n() {
            return $(window).width() <= 640 ? "tablet" : "desktop";
        }
        function i(e) {
            "tablet" === e &&
                w.on("click", function () {
                    $(this).parent().toggleClass("active");
                });
        }
        function o(e) {
            return (newwindow = window.open(e, "name", "height=300,width=600")), window.focus && newwindow.focus(), !1;
        }
        function r() {
            var e = $(".search-wrap").width() - $(".search-wrap .select").width() - 10;
            $(".search-form input").width(e);
        }
        function a() {
            var e = $(".select.collection>span"),
                t = [];
            if (
                ($(".select_list input:checkbox:checked").each(function () {
                    t.push($("label", $(this).parent()).html());
                }),
                t.length > 0)
            ) {
                var n = t.join(", ");
                n.length > 18 && (n = n.substr(0, 18) + "..."), e.html("<span>" + n + '<i class="icn-arrow-down"></i></span>');
            } else e.html('<span>Add to collection<i class="icn-arrow-down"></i></span>');
        }
        function s() {
            var e = $("#select_language>span"),
                t = [];
            if (
                ($("#select_language input:checked").each(function () {
                    t.push($("label", $(this).parent()).html());
                }),
                t.length > 0)
            ) {
                var n = t.join(", ");
                n.length > 15 && (n = n.substr(0, 15) + "..."), e.html('<span><input type="text" value="' + n + '" id="filter" autocomplete="off" /><i class="icn-arrow-down"></i></span>');
            } else e.html('<span><input type="text" id="filter" placeholder="Select language" autocomplete="off" /><i class="icn-arrow-down"></i></span>');
        }
        function l(e) {
            if ($(e).length) {
                var t = $(e).val().toLowerCase(),
                    n = 0,
                    i = $("ul", $(e).closest("#select_language")),
                    o = $("li", $(e).closest("#select_language"));
                "" == t
                    ? (o.show(), (n = 1), $(".no-results-found").remove())
                    : o.each(function () {
                          var e = $(this).text().toLowerCase(),
                              i = e.indexOf(t);
                          i >= 0 ? ($(this).show(), (n = 1), $(".no-results-found").remove()) : $(this).hide();
                      }),
                    0 == n && i.append('<li class="no-results-found">No results found.</li>');
            }
        }
        function c() {
            var e = $("#select_country>span"),
                t = [];
            if (
                ($("#select_country input:checked").each(function () {
                    t.push($("label", $(this).parent()).html());
                }),
                t.length > 0)
            ) {
                var n = t.join(", ");
                n.length > 15 && (n = n.substr(0, 15) + "..."), e.html("<span>" + n + '<i class="icn-arrow-down"></i></span>');
            } else e.html('<span>Select country <i class="icn-arrow-down"></i></span>');
        }
        function u() {
            var e = $(".search-wrap .select>span"),
                t = [];
            if (
                ($(".search-wrap .select input:radio:checked").each(function () {
                    t.push($("label", $(this).parent()).html());
                }),
                t.length > 0)
            ) {
                var n = t.join(", ");
                e.html("<small>" + n + '</small> <i class="icn-arrow-down small"></i>');
            } else e.html('<small>All</small> <i class="icn-arrow-down small"></i>');
            r();
        }
        function p(t) {
            var n = '<i class="icn"></i> ' + t + '<span class="close"></span>';
            $(".notification-bar").length > 0
                ? ($(".notification-bar").removeClass("success").addClass("warning"), $(".notification-bar").html(n))
                : $("body").append('<div class="notification-bar warning" style="display: none;">' + n + "</div>"),
                $(".notification-bar").fadeIn(),
                e();
        }
        function d() {
            $(".code_content_container").each(function () {
                var e = $(this).data("type");
                $playgroundEditors[e].resize(!0);
            });
        }
        function f() {
            $(".editor-themes input[type='radio']:checked").length > 0 &&
                ($(".editor-themes input[type='radio']:checked").hasClass("light")
                    ? ($(".pg-item").removeClass("dark-border"), $(".pg-title").removeClass("dark-title"), $(".gutter").removeClass("dark-gutter"))
                    : ($(".pg-item").addClass("dark-border"), $(".pg-title").addClass("dark-title"), $(".gutter").addClass("dark-gutter")));
        }
        function h() {
            var e = $(".editor-themes input[type='radio']:checked"),
                t = "codepad";
            f(),
                e.length > 0 && (t = e.val()),
                $(".code_content_container").each(function () {
                    var e = $(this).data("type");
                    $playgroundEditors[e].setTheme("ace/theme/" + t);
                });
        }
        function g() {
            var e = $(window).height() - $(".pg-control").outerHeight() - $("header").height(),
                t = X.outerHeight();
            I.height(e), B.height(e), m(e, t);
        }
        function m(e, t) {
            if ((U.removeAttr("style"), $(".pg-html").length && $(".pg-css").length && $(".pg-js").length)) {
                var n = (e - t) / 3;
                U.height(n);
            } else {
                var n = e - t;
                U.height(n);
            }
        }
        function v() {
            $(".pg-code").length && $(".pg-preview").length && Split([".pg-code", ".pg-preview"], { direction: "horizontal", sizes: [25, 75], minSize: 400, gutterSize: 5, onDrag: d }),
                $(".pg-html").length && $(".pg-css").length && $(".pg-js").length && Split([".pg-html", ".pg-css", ".pg-js"], { direction: "vertical", minSize: 32, gutterSize: 5, onDrag: d });
        }
        function y(e, t) {
            if ("CSS" == e) var n = "https://yourwebsite.com/style.css";
            else var n = "https://yourwebsite.com/script.js";
            var i = '<div style="margin: 5px 0; clear: both;" class="resource_container"><a href="" style="float: right;" class="delete_resource"><small class="remove__icon">x</small></a>';
            (i += "undefined" != typeof t ? '<input type="text" name="resource[' + e + '][]" placeholder="Ex: ' + n + '" value="' + t + '"/>' : '<input type="text" name="resource[' + e + '][]" placeholder="Ex: ' + n + '"/>'),
                (i += "</div>"),
                $(
                    $('*[data-type="' + e + '"] .add_resource')
                        .parent()
                        .parent()
                ).append(i);
        }
        function b(e) {
            for (var t in $preprocessorTypes) $(".tab-control [data-type='" + $preprocessorTypes[t] + "']").removeClass("active"), $(".tab[data-type='" + $preprocessorTypes[t] + "']").hide();
            $(".tab-control [data-type='" + e + "']").addClass("active"),
                $(".pg-modal input[type='radio']:checked").each(function () {
                    $("> span", $(this).closest("div.select")).html("<span>" + $(this).siblings("label").html() + '<i class="icn-arrow-down"></i></span>');
                }),
                $(".tab[data-type='" + e + "']").show();
        }
        var x = $(".options .trigger"),
            w = $(".menu_mobile > span"),
            k = $(".select"),
            T = $(".report"),
            C = $("body");
        $(".close-banner").on("click", function () {
            $(".custom-banner").animate({ height: "toggle" }), t("hideHeaderBanner", !0, 365);
        }),
            x.on("click", function () {
                $(this).parentsUntil(".options .module").toggleClass("active");
            });
        var S = n();
        i(S),
            $(window).on("resize", function () {
                (S = n()), i(S);
            });
        var E = !1;
        T.on("click", function (e) {
            e.stopPropagation();
            var t = $(this).find(".tooltip");
            E || t.show(), E && t.hide(), (E = !E);
        }),
            T.find("textarea, button").on("click", function (e) {
                e.stopPropagation();
            });
        var _ = !1;
        k.on("click", function (e) {
            e.stopPropagation(),
                (E = !1),
                $(".select_list").hide(),
                $(".tooltip").hide(),
                _ || ($(this).find(".select_list").show(), $(this).addClass("select-is-open")),
                _ && ($(this).find(".select_list").hide(), $(this).removeClass("select-is-open")),
                (_ = !_);
        }),
            k.find(".select_list").on("click", function (e) {
                e.stopPropagation();
            }),
            C.on("click", function () {
                (_ = !1), (E = !1), $(".select_list").hide(), $(".tooltip").hide(), k.removeClass("select-is-open");
            }),
            k.each(function () {
                function e(e) {
                    o.scrollTop(o.scrollTop() + e);
                }
                var t = $(this),
                    n = t.find(".scroll_down"),
                    i = t.find(".scroll_up"),
                    o = t.find("ul"),
                    r = 30;
                o.prop("scrollHeight");
                i.on("mousedown", function () {
                    e(-r);
                }),
                    n.on("mousedown", function () {
                        e(r);
                    });
            });
        var N = !1;
        $(".n_snp i").on("click", function (e) {
            e.preventDefault(),
                e.stopPropagation(),
                N || ($(this).css("border-radius", "0 3px 0 0"), $(this).parent().find("span").css("border-radius", "3px 0 0 0px"), $(".n_pgr").show()),
                N && ($(this).css("border-radius", "0 3px 3px 0"), $(this).parent().find("span").css("border-radius", "3px 0 0 3px"), $(".n_pgr").hide()),
                (N = !N);
        }),
            $("body").on("click", function () {
                $(".n_snp i").css("border-radius", "0 3px 3px 0"), $(".n_snp span").css("border-radius", "3px 0 0 3px"), $(".n_pgr").hide(), (N = !1);
            }),
            $(".n_snp, .n_pgr").on("click", function (e) {
                e.stopPropagation();
            });
        var D = $(".share a");
        D.on("click", function (e) {
            e.preventDefault();
            var t = $(this).data("url");
            o(t);
        }),
            $(".tab .select_list li").on("click", function () {
                $(this).parent().parent().hide();
            }),
            $(".search-wrap .select_list li").on("click", function () {
                r();
            });
        var j = !1;
        $(".pg-expand").on("click", function () {
            j || ($(this).text("Hide options").addClass("pg-expand-open"), $("footer").show(), $("html, body").animate({ scrollTop: $(document).height() }, "slow")),
                j &&
                    ($(this).text("Expand for more options").removeClass("pg-expand-open"),
                    $("footer").hide(400, function () {
                        $("html, body").animate({ scrollTop: 0 }, "slow");
                    })),
                $(".pg-more").toggle(),
                (j = !j),
                console.log(j);
        });
        var A = $("header").height(),
            L = $(".pg-control").height() + 4,
            z = $(".pg-title").outerHeight(!0),
            H = $(window).height(),
            q = H - A - L,
            M = (q - z - 4) / 3;
        $(".pg-preview").height(q + 4),
            $(".pg-item").not(".pg-title").height(M),
            $(window).resize(function () {
                (H = $(window).height()), (q = H - A - L), (M = (q - z - 4) / 3), $(".pg-preview").height(q + 4), $(".pg-item").not(".pg-title").height(M);
            }),
            $("#screenname").on("keyup", function () {
                $("#screenname_view").text($("#screenname").val());
            }),
            $(document).on("click", ".collection_item .actions .edit", function (e) {
                var t = $(this).data("content");
                return (
                    $.get($(this).attr("href"), function (e) {
                        $(".item-" + t).replaceWith(e),
                            $(".collection_item input[name=title]").on("keyup keypress", function (e) {
                                var t = e.keyCode || e.which;
                                if (13 == t) return e.preventDefault(), !1;
                            });
                    }),
                    !1
                );
            }),
            $(document).on("click", ".collection_item .actions .remove", function (e) {
                var t = $(this).data("content");
                return (
                    confirm("Are you sure you want to delete this?") &&
                        $.get($(this).attr("href"), function (e) {
                            $(".item-" + t).remove();
                        }),
                    !1
                );
            }),
            $(document).on("click", ".collection_item .actions .cancel", function (e) {
                var t = $(this).data("content");
                return (
                    $.get($(this).attr("href"), function (e) {
                        $(".item-" + t).replaceWith(e);
                    }),
                    !1
                );
            }),
            $(document).on("click", ".collection_item .actions .save", function (e) {
                var t = $(this).data("content");
                return (
                    $.post($(this).attr("href"), $("#form-" + t).serialize(), function (e) {
                        $(".item-" + t).replaceWith(e);
                    }),
                    !1
                );
            }),
            $(".collections").on("click", ".manage a", function () {
                return (
                    $.get($(this).data("href"), function (e) {
                        $("#collaborators_modal").html(e), $("#collaborators_modal").show();
                    }),
                    !1
                );
            }),
            $("#collaborators_modal").on("click", ".manage-people .btn-cancel", function () {
                return $("#collaborators_modal").hide(), !1;
            }),
            $("#collaborators_modal").on("click", ".manage-people-list li a.delete", function () {
                return (
                    $.get($(this).attr("href"), function (e) {
                        $("#collaborators_modal").html(e);
                    }),
                    !1
                );
            }),
            $("#collaborators_modal").on("submit", "#collaboratorAddForm", function () {
                return (
                    $.post($(this).attr("action"), $(this).serialize())
                        .done(function (e) {
                            $("#collaborators_modal").html(e);
                        })
                        .fail(function (e) {
                            $("#collaborators_modal .form-errors").html("<li>" + e.responseJSON.email.join("</li><li>") + "</li>");
                        }),
                    !1
                );
            });
        var F = null;
        $(".user_contact_handler").on("click", function () {
            return (
                (F = $(this).data("id")),
                $("#user_contact_modal_" + F).show(),
                $(".notification-bar").fadeIn(),
                e(),
                $(document).on("mouseup.hideDocClick", function (e) {
                    var t = $("#user_contact_modal_" + F + " .contact");
                    return t.is(":visible") && (t.is(e.target) || 0 !== t.has(e.target).length || ($(document).off(".hideDocClick"), $("#user_contact_modal_" + F).hide(), (F = null))), !1;
                }),
                !1
            );
        }),
            $(document).on("click", "#user_contact_modal_" + F + " .btn", function (e) {
                return (
                    $.post($("#contact_user_" + F).attr("action"), $("#contact_user_" + F).serialize())
                        .done(function (e) {
                            $("#user_contact_modal_" + F).hide(), alert(e.message);
                        })
                        .fail(function (e) {
                            alert(e.responseJSON.message.join("\n"));
                        }),
                    !1
                );
            }),
            $(".select_list input:checkbox").on("change", function (e) {
                var t = $("input[name='snippet_add_to_collection_url']").val();
                if (void 0 != t) {
                    var n = [];
                    n.push({ name: "collection_id", value: $(this).val() }),
                        n.push({ name: "_token", value: $("input[name=_token]").val() }),
                        0 == $(this).is(":checked") && n.push({ name: "action", value: "uncheck" }),
                        a(),
                        $.post(t, n, function () {}).fail(function () {});
                }
            }),
            a(),
            $("#select_collection input:checkbox").on("click", function () {
                a();
            }),
            s(),
            $("#select_language input:radio, #select_language input:checkbox").on("click", function () {
                s();
            }),
            $(".snippet").on("keyup", "#filter", function () {
                l(this);
            }),
            $(".developers_filer").on("keyup", "#filter", function () {
                l(this);
            }),
            $(".developers_filer").on("focus", "#filter", function () {
                $("#filter").val(""), l($("#filter"));
            }),
            $(".developers_filer").on("blur", "#filter", function () {
                s();
            }),
            c(),
            $("#select_country input:checkbox").on("click", function () {
                c();
            }),
            u(),
            $(".search-wrap .select input:radio").on("click", function () {
                u();
            }),
            $(".comment_reply_btn").on("click", function () {
                $("input[name='parent_id']").val($(this).data("id")), $(".comment_respond h3").html("Reply to " + $(this).data("name"));
            }),
            $("#sortByMostRecent").on("change", function () {
                $(this).is(":checked")
                    ? ($("#filterTimeContainer input:radio").each(function () {
                          $(this).attr("checked", !1);
                      }),
                      $("#filterTimeContainer").hide(),
                      $(this).closest("form").submit())
                    : $("#filterTimeContainer").show();
            }),
            $("#sortByPopular").on("change", function () {
                $("#filterTimeContainer").show(), $(this).closest("form").submit();
            }),
            $("#sortByMostLiked").on("change", function () {
                $("#filterTimeContainer").show(), $(this).closest("form").submit();
            }),
            $("#filterForm [name=sortBy]:checked").length && "most-recent" == $("#filterForm [name=sortBy]:checked").val() && $("#filterTimeContainer").hide(),
            $("#filterTimeContainer input").on("change", function () {
                $(this).closest("form").submit();
            }),
            $(".like_handler a").on("click", function () {
                var e = $(this);
                return (
                    $.get(e.attr("href"))
                        .done(function (t) {
                            "liked" == t.message ? $("i", e.parent()).addClass("active") : "unliked" == t.message ? $("i", e.parent()).removeClass("active") : (window.location.href = "/login"), $("span", e.parent()).html(t.likes);
                        })
                        .fail(function (e) {
                            alert(e.responseJSON.message);
                        }),
                    !1
                );
            }),
            $(".new_snippet .collection .select_list button").on("click", function () {
                var e = $(".collection .select_list input[name='new_snippet_collection']"),
                    t = { title: e.val(), _token: $("input[name='_token']").val() };
                $(".collection .select_list button").attr("data-id") && (t.snippet_id = $(".collection .select_list button").data("id"));
                var n = $(".collection .select_list button").data("action");
                return (
                    $.post(n, t, function (t) {
                        e.val("");
                        var n =
                            '<li class="checkbox"><input id="collections-' +
                            t.collection.id +
                            '" name="collections[]" type="checkbox" value="' +
                            t.collection.id +
                            '" checked="checked"><label for="collections-' +
                            t.collection.id +
                            '">' +
                            t.collection.title +
                            "</label></li>";
                        $(".collection .select_list ul").append(n), $(".collection .select_list ul").animate({ scrollTop: $(".collection .select_list ul")[0].scrollHeight }, 300);
                    }),
                    !1
                );
            }),
            $(".snippet-page .collection .select_list button").on("click", function () {
                var e = $(".snippet-page .collection .select_list .form form");
                return (
                    $.post(e.attr("action"), e.serialize(), function (t) {
                        $("input[name=title]", e).val(""),
                            $(".snippet-page .collection .select_list ul").append(t.html_content),
                            $(".snippet-page .collection .select_list ul").animate({ scrollTop: $(".snippet-page .collection .select_list ul")[0].scrollHeight }, 300);
                    }),
                    !1
                );
            }),
            $(".info a.follow").on("click", function () {
                var e = $(this);
                return (
                    $.get(e.attr("href"))
                        .done(function (t) {
                            "followed" == t.message ? e.html("Unfollow") : "unfollowed" == t.message ? e.html("Follow") : (window.location.href = "/login");
                        })
                        .fail(function (e) {
                            p(e.responseJSON.message);
                        }),
                    !1
                );
            });
        var P = 200,
            O = $("#bio_container textarea[name='bio']");
        if (O.length) {
            var R = O.val().length;
            $("#bio_container i").html(P - R),
                O.keyup(function () {
                    var e = O.val().length;
                    $("#bio_container i").html(P - e);
                });
        }
        "undefined" == typeof $hideNotificationsModal && ($(".notification-bar").fadeIn(), e()),
            $(".notification-bar .close").on("click", function () {
                $(".notification-bar").fadeOut();
            }),
            $(".code_content_container").each(function () {
                var e = $(this).data("type"),
                    t = $(this).data("lang-type");
                ($playgroundEditors[e] = ace.edit(this)),
                    ($playgroundEditors[e].$blockScrolling = 1 / 0),
                    $playgroundEditors[e].setTheme("ace/theme/codepad"),
                    "undefined" != typeof currentUser.editorTheme && currentUser.editorTheme ? $playgroundEditors[e].setTheme("ace/theme/" + currentUser.editorTheme) : $playgroundEditors[e].setTheme("ace/theme/codepad"),
                    $playgroundEditors[e].getSession().setMode("ace/mode/" + t.toLowerCase()),
                    $playgroundEditors[e].setOption("wrap", "free"),
                    $playgroundEditors[e].getSession().on("change", function (t) {
                        $("input[name='component[" + e + "]']").val($playgroundEditors[e].getValue());
                    }),
                    $playgroundEditors[e].setValue($("input[name='component[" + e + "]']").val()),
                    $playgroundEditors[e].getSelection().clearSelection(),
                    $playgroundEditors[e].on("change", function () {
                        currentUser.autorun && delay(runPlaygroundCode, 1e3);
                    });
            }),
            $(".comment_code_content_container").each(function () {
                var e = $(this).data("type"),
                    t = $(this).data("id");
                ($commentEditors[t] = ace.edit(this)),
                    ($commentEditors[t].$blockScrolling = 1 / 0),
                    $commentEditors[t].setTheme("ace/theme/codepad"),
                    $commentEditors[t].getSession().setMode("ace/mode/" + e.toLowerCase()),
                    $commentEditors[t].setOption("wrap", "free"),
                    $commentEditors[t].getSelection().clearSelection();
            }),
            $(".pg-run").on("click", function () {
                runPlaygroundCode();
            }),
            $(".pg-settings").on("click", function () {
                if ($(".compiler_code_content_container").length) var e = $(this).siblings(".compiler_code_content_container").data("type");
                else var e = $(this).siblings(".code_content_container").data("type");
                b(e), $(".pg-modal").show();
            });
        var I = $(".pg-wrap"),
            W = $(".pg-preview"),
            B = $(".pg-code"),
            U = $(".pg-item"),
            X = $(".pg-title");
        W.length > 0 && (g(), v(), f(), $(window).on("resize", g)),
            $(".tab-control li").on("click", function () {
                var e = $(this).data("type");
                b(e);
            }),
            $("#compiler_modal").length
                ? ($(".pg-modal .btn-cancel").on("click", function (e) {
                      return $(".pg-modal").hide(), e.stopPropagation(), !1;
                  }),
                  $(".pg-modal input[type='radio']").on("click", function () {
                      $("> span", $(this).closest("div.select")).html("<span>" + $(this).siblings("label").html() + '<i class="icn-arrow-down"></i></span>');
                  }),
                  $(".pg-modal .btn-save").on("click", function (e) {
                      var t = $(".pg-modal .lang_type_container input[type='radio']:checked");
                      return (
                          "c" == t.val() || "cpp" == t.val() ? compilerEditor.getSession().setMode("ace/mode/c_cpp") : compilerEditor.getSession().setMode("ace/mode/" + t.val()),
                          $(".pg-compiler .pg-settings").html($("label", t.parent()).html() + ' <i class="icn-settings"></i>'),
                          $(".pg-modal").hide(),
                          $("#lang_id").val(t.val()),
                          e.stopPropagation(),
                          !1
                      );
                  }))
                : ($(".pg-modal .btn-cancel").on("click", function () {
                      $(".pg-modal").hide();
                  }),
                  $(".pg-modal input[type='radio']").on("click", function () {
                      $("> span", $(this).closest("div.select")).html("<span>" + $(this).siblings("label").html() + '<i class="icn-arrow-down"></i></span>');
                  }),
                  $(".pg-modal .btn-save").on("click", function () {
                      $(".pg-modal .lang_type_container input[type='radio']:checked").each(function () {
                          var e = $(this).closest("div.tab").data("type");
                          $playgroundEditors[e].getSession().setMode("ace/mode/" + $(this).val()),
                              $("input[name='component_lang[" + e + "]']").val($(this).data("lang-id")),
                              $(".pg-" + $(this).attr("name") + " .pg-settings").html($("label", $(this).parent()).html() + ' <i class="icn-settings"></i>');
                      }),
                          $(".pg form [name^='resource']").remove(),
                          $(".resource_container [name^=resource]").each(function () {
                              $("<input type='hidden' value='' />").attr("name", $(this).attr("name")).attr("value", $(this).val()).appendTo("#playgroundForm");
                          }),
                          $.post($(".tab[data-type='Other']").data("action"), {
                              autosave: $("#autosave").is(":checked") ? 1 : 0,
                              autorun: $("#autorun").is(":checked") ? 1 : 0,
                              editor_theme: $(".editor-themes input[type=radio]:checked").val(),
                              _token: $("input[name=_token]").val(),
                          }),
                          (currentUser.autosave = !!$("#autosave").is(":checked")),
                          (currentUser.autorun = !!$("#autorun").is(":checked")),
                          (currentUser.editorTheme = $(".editor-themes input[type=radio]:checked").val()),
                          autoSavePlayground(),
                          h(),
                          $(".pg-modal").hide();
                  }),
                  $(".pg-modal").on("click", ".delete_resource", function () {
                      return $(this).parent().remove(), !1;
                  }),
                  $(".pg-modal").on("click", ".add_resource", function () {
                      var e = $(this).data("type");
                      return y(e), !1;
                  }),
                  $(".external_resource_add label").on("click", function (e) {
                      var t = $(this).data("type");
                      y(t, $(this).data("path"));
                  })),
            autoSavePlayground(),
            $("iframe[name=playgroundPreviewIframe]").on("load", function () {
                $(".loadingIframe").hide(), $(this).show(), (previewIframeLoading = !1);
            }),
            0 == previewIframeLoading && ($(".loadingIframe").hide(), $("iframe[name=playgroundPreviewIframe]").show()),
            $("iframe[name=compilerResultIframe]").on("load", function () {
                $(".loadingIframe").hide(), $(this).show(), (previewIframeLoading = !1);
            }),
            0 == previewIframeLoading && ($(".loadingIframe").hide(), $("iframe[name=compilerResultIframe]").show()),
            $("#compilerResult").on("submit", function () {
                (previewIframeLoading = !0), $("iframe[name=compilerResultIframe]").hide(), $(".loadingIframe").show();
            });
    });
