!(function (e) {
    var t = {};
    function o(n) {
        if (t[n]) return t[n].exports;
        var r = (t[n] = { i: n, l: !1, exports: {} });
        return e[n].call(r.exports, r, r.exports, o), (r.l = !0), r.exports;
    }
    (o.m = e),
        (o.c = t),
        (o.d = function (e, t, n) {
            o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: n });
        }),
        (o.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (o.t = function (e, t) {
            if ((1 & t && (e = o(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var n = Object.create(null);
            if ((o.r(n), Object.defineProperty(n, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                for (var r in e)
                    o.d(
                        n,
                        r,
                        function (t) {
                            return e[t];
                        }.bind(null, r)
                    );
            return n;
        }),
        (o.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return o.d(t, "a", t), t;
        }),
        (o.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (o.p = "/public/build"),
        o((o.s = 2));
})([
    function (e, t) {
        const o = { C: "c", CPP: "cpp", PYTHON: "python", JAVA: "java", JAVASCRIPT: "javascript", CSHARP: "csharp", RUST: "rust" },
            n = o.PYTHON,
            r = { [o.C]: "c_cpp", [o.CPP]: "c_cpp", [o.PYTHON]: "python", [o.JAVA]: "java", [o.JAVASCRIPT]: "javascript", [o.CSHARP]: "csharp", [o.RUST]: "rust" };
        e.exports = { DEFAULT_SHELL: "dash", SUPPORTED_LANGUAGES: o, DEFAULT_LANGUAGE: n, ACE_EDITOR_MODES: r };
    },
    function (e, t) {
        e.exports = (e) => {
            for (var t = "", o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789", n = o.length, r = 0; r < e; r++) t += o.charAt(Math.floor(Math.random() * n));
            return t;
        };
    },
    function (e, t, o) {
        "use strict";
        o.r(t);
        const n = "mobile--tabbed-compiler",
            r = "mobile--tabbed--terminal";
        var a = o(0),
            i = o(1),
            s = o.n(i);
        ace.define("ace/mode/programiz_terminal_highlight_rules", function (e, t, o) {
            var n = e("ace/lib/oop"),
                r = e("ace/mode/text_highlight_rules").TextHighlightRules,
                a = function () {
                    this.$rules = {
                        start: [
                            { token: ["comment.line.colons.dosbatch"], regex: "(?:^|\\b)gcc($|\\s.*$)", caseInsensitive: !0 },
                            { token: ["comment.line.colons.dosbatch"], regex: "^(/tmp).*$", caseInsensitive: !0 },
                            { token: ["comment.line.colons.dosbatch"], regex: /^g\+\+.*$/, caseInsensitive: !0 },
                            { token: ["comment.line.colons.dosbatch"], regex: /^cat.*$/, caseInsensitive: !0 },
                            { token: ["comment.line.colons.dosbatch"], regex: /^>/ },
                            { token: ["comment.line.colons.dosbatch"], regex: "^(javac).*$", caseInsensitive: !0 },
                            { token: ["comment.line.colons.dosbatch"], regex: "^(java).*$", caseInsensitive: !0 },
                            { token: ["comment.line.colons.dosbatch"], regex: "^(csc|mono).*$", caseInsensitive: !0 },
                            { token: ["comment.line.colons.dosbatch"], regex: "^(node).*$", caseInsensitive: !0 },
                            { token: ["comment.line.colons.dosbatch"], regex: "^(rustc).*$", caseInsensitive: !0 },
                        ],
                    };
                };
            n.inherits(a, r), (t.ProgramizTerminalHighlightRules = a);
        }),
            ace.define("ace/mode/programiz_terminal", function (e, t, o) {
                var n = e("ace/lib/oop"),
                    r = e("ace/mode/text").Mode,
                    a = e("ace/mode/programiz_terminal_highlight_rules").ProgramizTerminalHighlightRules,
                    i = function () {
                        this.HighlightRules = a;
                    };
                n.inherits(i, r), function () {}.call(i.prototype), (t.Mode = i);
            });
        const l = ace.edit("editor"),
            c = ace.edit("terminal");
        let d = $("#root").data("lang") || a.DEFAULT_LANGUAGE,
            m = a.ACE_EDITOR_MODES[d];
        l.setTheme("ace/theme/textmate"), l.getSession().setMode("ace/mode/" + m), c.setTheme("ace/theme/textmate"), c.getSession().setMode("ace/mode/programiz_terminal");
        const u = () => {
            const e = ($(".wrapper").height() - 48 - 48) / 22 - 3;
            l.setOptions({
                fontFamily: "droid_sans_monoregular",
                fontSize: "14px",
                showGutter: !0,
                highlightActiveLine: !0,
                wrap: !0,
                useWorker: !1,
                overwrite: !1,
                tooltipFollowsMouse: !1,
                maxLines: e,
                dragEnabled: !1,
                showPrintMargin: !1,
            }),
                (l.container.style.lineHeight = "22px"),
                c.setOptions({
                    fontFamily: "droid_sans_monoregular",
                    fontSize: "14px",
                    showGutter: !1,
                    highlightActiveLine: !1,
                    behavioursEnabled: !1,
                    wrapBehavioursEnabled: !1,
                    wrap: !0,
                    useWorker: !0,
                    overwrite: !1,
                    maxLines: e,
                    dragEnabled: !1,
                    cursorStyle: "slim",
                    showPrintMargin: !1,
                }),
                (c.container.style.lineHeight = "22px");
        };
        u(), $(window).resize(u);
        let g = !1;
        const p = new URLSearchParams(window.location.search).get("ref");
        let h = "";
        try {
            const e = localStorage.getItem("playground"),
                t = JSON.parse(e);
            t && p && t[p] && t[p].code && ((h = t[p].code), l.setValue(h, 1));
        } catch (e) {
            localStorage.removeItem("playground");
        }
        l.commands.addCommand({
            name: "executeCode",
            bindKey: { win: "Ctrl-Enter", mac: "Cmd-Enter|Ctrl-Enter" },
            exec: function () {
                return x(), !1;
            },
        }),
            c.commands.addCommand({
                name: "backspace",
                bindKey: { win: "Backspace", mac: "Backspace|Delete" },
                exec: function () {
                    return !(c.getValue().length > b.length);
                },
            }),
            c.commands.addCommand({
                name: "executeCode",
                bindKey: { win: "Ctrl-Enter", mac: "Cmd-Enter|Ctrl-Enter" },
                exec: function () {
                    return x(), !1;
                },
            }),
            window.innerWidth < 1e3 && ((l.renderer.$cursorLayer.isBlinking = !1), (c.renderer.$cursorLayer.isBlinking = !1));
        let v = null,
            b = d == a.SUPPORTED_LANGUAGES.PYTHON ? "> " : "$ ",
            f = "";
        var k, w;
        c.commands.addCommand({
            name: "newLine",
            bindKey: { win: "Enter", mac: "Enter" },
            exec: function () {
                return (f = c.getValue().slice(b.length)), v.emit("evaluate", { code: f }), !1;
            },
        }),
            (k = "https://repl-web.programiz.com"),
            (w = s()(10)),
            (v = io(`${k}/?sessionId=${w}&lang=${d}`, { transports: ["websocket"] })),
            v.on("output", ({ output: e }) => {
                (e = e.split(">>>").join(">")),
                    f.length > 0 &&
                        (e.startsWith(f) ? ((e = e.slice(f.length)), (f = "")) : f.startsWith(e) ? ((f = f.slice(e.length)), (e = "")) : e.startsWith("> ") && e.replace("> ", "").startsWith(f) && (e = e.slice(f.length + 2).trimLeft())),
                    0 === f.trim().length && (e = e.trimLeft());
                const t = c.getValue() + e;
                c.setValue(t, 1), (b = c.getValue()), c.focus();
            }),
            v.on("disconnect", function () {}),
            v.on("connect", function () {
                c.setValue(b, 1), Object.values(a.SUPPORTED_LANGUAGES).includes(d) || alert(`This language is not supported, initializing ${a.DEFAULT_LANGUAGE} instead`);
            }),
            $(".spinner").hide(),
            $(".wrapper").css({ display: "block" }),
            $(".mobile-nav-drawer").addClass("show");
        const x = () => {
            (b = ""), (f = ""), c.setValue("");
            const e = l.getValue();
            v.emit("run", { code: e });
        };
        Mousetrap.bind(["command+enter", "ctrl+enter"], function (e) {
            return x(), !1;
        }),
            $("#toggle-expanded-mode-desktop").click((e) => {
                e.preventDefault(),
                    $(".spinner").show(),
                    $(".wrapper").css({ display: "none" }),
                    $(".mobile-nav-drawer").removeClass("show"),
                    (function (e = !0) {
                        e
                            ? ($(".container").addClass("maximized"), $(".toggle-expanded-mode-desktop").prop("title", "Enter Fullscreen"), (g = !0))
                            : ($(".container").removeClass("maximized"), $(".toggle-expanded-mode-desktop").prop("title", "Exit Fullscreen"), (g = !1));
                    })(!g),
                    setTimeout(() => {
                        $(".spinner").hide(), $(".wrapper").css({ display: "block" }), $(".mobile-nav-drawer").addClass("show");
                    }, 0);
            }),
            $(".mobile-run-button").click((e) => {
                x(), S(r);
            }),
            $(".desktop-run-button").click((e) => {
                x();
            }),
            $(".desktop-clear-button").click((e) => {
                (() => {
                    const e = d === a.SUPPORTED_LANGUAGES.PYTHON ? "> " : "";
                    c.setValue(e, 1), (b = e), (f = ""), c.focus();
                })();
            }),
            $(".burger-menu-btn").click((e) => {
                e.preventDefault(), A(!0);
            }),
            $(".close-nav-btn").click((e) => {
                e.preventDefault(), A(!1);
            });
        const S = (e) => {
            e === n && ($(".shell-pill").removeClass("active"), $(".compiler-pill").addClass("active"), $(".terminal-wrapper").hide(), $(".editor-wrapper").show(), l.focus(), l.navigateLineEnd()),
                e === r && ($(".shell-pill").addClass("active"), $(".compiler-pill").removeClass("active"), $(".terminal-wrapper").show(), $(".editor-wrapper").hide(), c.focus());
        };
        function y(e = !0) {
            if (e)
                return (
                    l.setTheme("ace/theme/twilight"),
                    c.setTheme("ace/theme/twilight"),
                    $("#logo").attr("src", "assets/logos/logo-inverted.svg"),
                    $("#nav-logo").attr("src", "assets/logos/logo-inverted.svg"),
                    $(".container").addClass("dark-mode"),
                    void $("#toggle-dark-mode-desktop").prop("title", "Toggle light mode")
                );
            l.setTheme("ace/theme/textmate"),
                c.setTheme("ace/theme/textmate"),
                $(".container").removeClass("dark-mode"),
                $("#logo").attr("src", "assets/logos/logo.svg"),
                $("#nav-logo").attr("src", "assets/logos/logo.svg"),
                $("#toggle-dark-mode-desktop").prop("title", "Toggle dark mode");
        }
        function E() {
            const e = JSON.parse(localStorage.getItem("playground")) || {};
            return !!(e && e.darkMode && e.darkMode.status);
        }
        function A(e = !0) {
            if (e) return $(".mobile-nav-drawer").addClass("visible"), void (mobileNavigationStatus = !0);
            $(".mobile-nav-drawer").removeClass("visible"), (mobileNavigationStatus = !1);
        }
        $(".shell-pill").click(() => {
            S(r);
        }),
            $(".compiler-pill").click(() => {
                S(n);
            }),
            $("#back-button").click(() => {
                window.history.back();
            }),
            $("#toggle-dark-mode-mobile, #toggle-dark-mode-desktop").click(() => {
                const e = JSON.parse(localStorage.getItem("playground")) || {},
                    t = E() ? 0 : 1;
                let o = { status: t, updatedAt: Date.now() };
                const n = Object.assign(e, { darkMode: o });
                y(t), localStorage.setItem("playground", JSON.stringify(n));
            }),
            E() && y(!0),
            $("img.svg").each(function () {
                var e = $(this),
                    t = e.attr("id"),
                    o = e.attr("class"),
                    n = e.attr("src");
                $.get(
                    n,
                    function (n) {
                        var r = $(n).find("svg");
                        void 0 !== t && (r = r.attr("id", t)), void 0 !== o && (r = r.attr("class", o + " replaced-svg")), (r = r.removeAttr("xmlns:a")), e.replaceWith(r);
                    },
                    "xml"
                );
            });
    },
]);
