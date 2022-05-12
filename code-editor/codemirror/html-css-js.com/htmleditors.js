/*!
 * HTML-CSS-JS - HTML, CSS, JavaScript Editor
 * do not copy or reverse engineer this script
 */
function getUrlVars() {
    var c = {};
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (e, b, t) {
        c[b] = t
    });
    return c
}

function getUrlParam(c, e) {
    var b = e;
    return window.location.href.indexOf(c) > -1 && (b = getUrlVars()[c]),
        void 0 == b && (b = e),
        b
}

function initiateContentFromUrl() {
    var c = getUrlParam("html", "defaultValue"),
        e = getUrlParam("css", ""),
        b = getUrlParam("js", "");
    c != "defaultValue" && (c = (c = c.replaceAll("i\$\*\$d", "id")).replaceAll("\$\*\*\$", "&"),
        e = (e = e.replaceAll("i\$\*\$d", "id")).replaceAll("\$\*\*\$", "&"),
        b = (b = b.replaceAll("i\$\*\$d", "id")).replaceAll("\$\*\*\$", "&"),
        codeeditorhtml.setValue(decodeURIComponent(c)),
        codeeditorcss.setValue(decodeURIComponent(e)),
        codeeditorjs.setValue(decodeURIComponent(b)))
}

function contentToURL() {
    var c = encodeURI(codeeditorhtml.getValue());
    c = (c = c.replaceAll("id", "i\$\*\$d")).replaceAll("&", "\$\*\*\$");
    var e = encodeURI(codeeditorcss.getValue());
    e = (e = e.replaceAll("id", "i\$\*\$d")).replaceAll("&", "\$\*\*\$");
    var b = encodeURI(codeeditorjs.getValue());
    if (b = b.replaceAll("id", "i\$\*\$d"),
        b = b.replaceAll("&", "\$\*\*\$"),
        c.length > 0 || b.length > 0) {
        var t = "https://html-css-js.com/\?html=" + c + "&css=" + e + "&js=" + b;
        $("#shareLinkInput").val(t).select(),
            $("#openSaveLink").attr("href", t)
    }
}

function selectTheme() {
    var c = input.options[input.selectedIndex].innerHTML;
    codeeditorhtml.setOption("theme", c),
        codeeditorcss.setOption("theme", c),
        codeeditorjs.setOption("theme", c)
}

function resize() {
    $("#widget").width($win.width()).height($win.height() - 50),
        codeeditorhtml.setSize("100%", "100%"),
        codeeditorcss.setSize("100%", "100%"),
        codeeditorjs.setSize("100%", "100%")
}

function updatePreview() {
    if (elkur = 1,
        -1 != String(document.domain).indexOf("ml-cs")) {
        var c = document.getElementById("preview"),
            e = c.contentDocument || c.contentWindow.document;
        if (e.open(),
            $("#layerpreview").is(":checked"))
            var b = "\
                    \* \{ outline: 2px dotted red \}\
                    \* \* \{ outline: 2px dotted green \}\
                    \* \* \* \{ outline: 2px dotted orange \}\
                    \* \* \* \* \{ outline: 2px dotted blue \}\
                    \* \* \* \* \* \{ outline: 1px solid red \}\
                    \* \* \* \* \* \* \{ outline: 1px solid green \}\
                    \* \* \* \* \* \* \* \{ outline: 1px solid orange \}\
                    \* \* \* \* \* \* \* \* \{ outline: 1px solid blue \}\
                    ",
                t = '<style type="text/css">\
                ' + codeeditorcss.getValue() + b + "\
                </style>";
        else
            t = '<style type="text/css">\
            ' + codeeditorcss.getValue() + "\
                </style>";
        if ($("#autopreviewcheckbox").is(":checked") || 1 == runcode) {
            $(".run-button").fadeOut(200);
            var x = '\
                <!-- js code -->\
                <script type="text/javascript">\
                //<!\[CDATA\[\
                ' + codeeditorjs.getValue() + "\
                //\]\]>\
                </script>";
            e.write(t + codeeditorhtml.getValue() + x)
        } else
            $(".run-button").fadeIn(200),
            e.write(t + codeeditorhtml.getValue());
        e.close()
    }
}

function fullpreview() {
    windowsizewidth = $(window).outerWidth(!0) - 5,
        windowsizeheight = $(window).outerHeight(!0) - 55,
        $("#foo").animate({
            width: 0
        }, "fast"),
        $(".vsplitter").animate({
            left: 0
        }, "fast"),
        $("#bar").animate({
            width: windowsizewidth
        }, "fast", function () {
            $("#hor1").animate({
                    top: 0
                }, "fast"),
                $("#codejs").animate({
                    height: 0
                }, "fast"),
                $("#codepreview").animate({
                    height: windowsizeheight
                }, "fast"),
                $("#widget").split().position(0),
                $("#bar").split().position(0),
                $("#previewsizewidth").val(windowsizewidth),
                $("#previewsizeheight").val(windowsizeheight),
                updatepreviewinput()
        }),
        codeeditorhtml.setSize("100%", "100%"),
        codeeditorcss.setSize("100%", "100%"),
        codeeditorjs.setSize("100%", "100%")
}

function previewdefault() {
    windowsizewidth = $(window).outerWidth(!0) - 5,
        windowsizeheight = $(window).outerHeight(!0) - 55;
    $("#foo").animate({
            width: windowsizewidth - 767
        }, "fast"),
        $(".vsplitter").animate({
            left: windowsizewidth - 767
        }, "fast"),
        $("#bar").animate({
            width: 767
        }, "fast", function () {
            $("#hor1").animate({
                    top: windowsizeheight - 420
                }, "fast"),
                $("#codejs").animate({
                    height: windowsizeheight - 420
                }, "fast"),
                $("#codepreview").animate({
                    height: 420
                }, "fast"),
                $("#widget").split().position(windowsizewidth - 767 + 2),
                $("#bar").split().position(windowsizeheight - 420),
                $("#previewsizewidth").val(767),
                $("#previewsizeheight").val(420),
                updatepreviewinput(),
                codeeditorhtml.setSize("100%", "100%"),
                codeeditorcss.setSize("100%", "100%"),
                codeeditorjs.setSize("100%", "100%")
        }),
        codeeditorhtml.setSize("100%", "100%"),
        codeeditorcss.setSize("100%", "100%"),
        codeeditorjs.setSize("100%", "100%")
}

function previewtablet() {
    windowsizewidth = $(window).outerWidth(!0) - 5,
        windowsizeheight = $(window).outerHeight(!0) - 55;
    $("#foo").animate({
            width: windowsizewidth - 991
        }, "fast"),
        $(".vsplitter").animate({
            left: windowsizewidth - 991
        }, "fast"),
        $("#bar").animate({
            width: 991
        }, "fast", function () {
            $("#hor1").animate({
                    top: 0
                }, "fast"),
                $("#codejs").animate({
                    height: 0
                }, "fast"),
                $("#codepreview").animate({
                    height: windowsizeheight
                }, "fast"),
                $("#widget").split().position(windowsizewidth - 991 + 2),
                $("#bar").split().position(0),
                $("#previewsizewidth").val(991),
                $("#previewsizeheight").val(windowsizeheight),
                updatepreviewinput()
        }),
        codeeditorhtml.setSize("100%", "100%"),
        codeeditorcss.setSize("100%", "100%"),
        codeeditorjs.setSize("100%", "100%")
}

function nojsview() {
    windowsizewidth = $(window).outerWidth(!0) - 5,
        windowsizeheight = $(window).outerHeight(!0) - 55;
    $("#foo").animate({
            width: windowsizewidth - 768
        }, "fast"),
        $(".vsplitter").animate({
            left: windowsizewidth - 768
        }, "fast"),
        $("#bar").animate({
            width: 768
        }, "fast", function () {
            $("#hor1").animate({
                    top: 0
                }, "fast"),
                $("#codejs").animate({
                    height: 0
                }, "fast"),
                $("#codepreview").animate({
                    height: windowsizeheight
                }, "fast"),
                $("#widget").split().position(windowsizewidth - 768 + 2),
                $("#bar").split().position(0),
                $("#previewsizewidth").val(768),
                $("#previewsizeheight").val(windowsizeheight),
                updatepreviewinput()
        }),
        codeeditorhtml.setSize("100%", "100%"),
        codeeditorcss.setSize("100%", "100%"),
        codeeditorjs.setSize("100%", "100%")
}

function previewphone_h() {
    windowsizewidth = $(window).outerWidth(!0) - 5;
    var c = windowsizeheight = $(window).outerHeight(!0) - 55;
    windowsizeheight >= 767 && (c = 767),
        $("#foo").animate({
            width: windowsizewidth - 320
        }, "fast"),
        $(".vsplitter").animate({
            left: windowsizewidth - 320
        }, "fast"),
        $("#bar").animate({
            width: 320
        }, "fast", function () {
            $("#hor1").animate({
                    top: windowsizeheight - c
                }, "fast"),
                $("#codejs").animate({
                    height: windowsizeheight - c
                }, "fast"),
                $("#codepreview").animate({
                    height: c
                }, "fast"),
                $("#widget").split().position(windowsizewidth - 320 + 2),
                $("#bar").split().position(windowsizeheight - c),
                $("#previewsizewidth").val(320),
                $("#previewsizeheight").val(c),
                updatepreviewinput(),
                codeeditorhtml.setSize("100%", "100%"),
                codeeditorcss.setSize("100%", "100%"),
                codeeditorjs.setSize("100%", "100%")
        }),
        codeeditorhtml.setSize("100%", "100%"),
        codeeditorcss.setSize("100%", "100%"),
        codeeditorjs.setSize("100%", "100%")
}

function previewphone_w() {
    windowsizewidth = $(window).outerWidth(!0) - 5,
        windowsizeheight = $(window).outerHeight(!0) - 55;
    $("#foo").animate({
            width: windowsizewidth - 767
        }, "fast"),
        $(".vsplitter").animate({
            left: windowsizewidth - 767
        }, "fast"),
        $("#bar").animate({
            width: 767
        }, "fast", function () {
            $("#hor1").animate({
                    top: windowsizeheight - 320
                }, "fast"),
                $("#codejs").animate({
                    height: windowsizeheight - 320
                }, "fast"),
                $("#codepreview").animate({
                    height: 320
                }, "fast"),
                $("#widget").split().position(windowsizewidth - 767 + 2),
                $("#bar").split().position(windowsizeheight - 320),
                $("#previewsizewidth").val(767),
                $("#previewsizeheight").val(320),
                updatepreviewinput(),
                codeeditorhtml.setSize("100%", "100%"),
                codeeditorcss.setSize("100%", "100%"),
                codeeditorjs.setSize("100%", "100%")
        }),
        codeeditorhtml.setSize("100%", "100%"),
        codeeditorcss.setSize("100%", "100%"),
        codeeditorjs.setSize("100%", "100%")
}

function updatepreviewinput() {
    $("#previewoutputsize").fadeIn("fast"),
        previewsizewidth = $("#preview").width() - 1,
        previewsizeheight = $("#preview").height() - 3,
        $("#outputsizenumber").html(previewsizewidth + "x" + previewsizeheight + " px")
}

function menubuttoninactive(c) {
    $(c).css("background-image", ""),
        $(c).css("background-position", ""),
        $(c).css("background-repeat", "")
}

function menubuttonactive(c) {
    $(c).css("background-position", " center 40px"),
        $(c).css("background-repeat", "no-repeat")
}
$(document).ready(function () {
    $("#wrapEditors").css("min-height", window.innerHeight),
        $("#saveShareButton").click(function () {
            $("#settingsmenu, #viewmenu, #librarymenu, #sharemenu").hide(),
                $("#shareWindow").fadeToggle(100),
                contentToURL()
        }),
        $("#wrapEditors").click(function () {
            $("#shareWindow").fadeOut(100)
        }),
        $("#copySaveLink").click(function () {
            $("#shareLinkInput").select(),
                document.execCommand("copy"),
                $("#shareWindow").fadeOut(100)
        }),
        initiateContentFromUrl()
});
var $win = $(window);
$(window).load(function () {
        $("#loader").fadeOut(),
            console.log("WAIT"),
            setTimeout(function () {
                getUrlParam("js", "nothing") != "nothing" && (runcode = 1,
                    updatePreview(),
                    runcode = 0,
                    $("#coderevisionreport").prop("disabled", !1),
                    console.log("RUN"))
            }, 1e3)
    }),
    $(window).unload(function () {
        $("#loader").fadeIn()
    }),
    jQuery(function (c) {
        $win.resize(resize),
            c("#widget").width($win.width()).height($win.height() - 50).split({
                orientation: "vertical",
                limit: 1
            }),
            c("#foo").split({
                orientation: "horizontal",
                limit: 1
            }),
            c("#bar").split({
                orientation: "horizontal",
                limit: 1
            }),
            codeeditorhtml.setSize("100%", "100%"),
            codeeditorcss.setSize("100%", "100%"),
            codeeditorjs.setSize("100%", "100%"),
            c("#bar .hsplitter").attr("id", "hor1"),
            c("#foo .hsplitter").attr("id", "hor2"),
            updatePreview(),
            c("#coderevisionreport").prop("disabled", !0)
    }),
    $(window).resize(function () {
        var c = $(window);
        c.resize(resize),
            $("#widget").width(c.width()).height(c.height() - 50).split({
                orientation: "vertical",
                limit: 1
            }),
            $("#foo").split({
                orientation: "horizontal",
                limit: 1
            }),
            $("#bar").split({
                orientation: "horizontal",
                limit: 1
            })
    }),
    $("#coderevisionreport").click(function () {
        $("#coderevisionreport").prop("disabled", !1)
    });
var codeeditorhtml = CodeMirror.fromTextArea(document.getElementById("codeeditorhtml"), {
        mode: "text/html",
        tabMode: "indent",
        lineNumbers: !0,
        matchBrackets: !0,
        autoCloseTags: !0,
        extraKeys: {
            "Ctrl-Q": "toggleComment"
        },
        styleActiveLine: !0,
        profile: "xhtml",
        autoCloseBrackets: !0
    }),
    codeeditorcss = CodeMirror.fromTextArea(document.getElementById("codeeditorcss"), {
        mode: "text/css",
        tabMode: "indent",
        lineNumbers: !0,
        matchBrackets: !0,
        continueComments: "Enter",
        extraKeys: {
            "Ctrl-Q": "toggleComment"
        },
        styleActiveLine: !0,
        autoCloseBrackets: !0
    }),
    codeeditorjs = CodeMirror.fromTextArea(document.getElementById("codeeditorjs"), {
        mode: "application/typescript",
        tabMode: "indent",
        lineNumbers: !0,
        matchBrackets: !0,
        continueComments: "Enter",
        extraKeys: {
            "Ctrl-Q": "toggleComment"
        },
        styleActiveLine: !0,
        autoCloseBrackets: !0,
        gutters: ["CodeMirror-lint-markers"],
        lint: !0
    }),
    runcode = 0;
$("#layerpreview").click(function () {
        updatePreview()
    }),
    $("#autopreviewcheckbox").click(function () {
        updatePreview()
    }),
    $("#runcodebutton").click(function () {
        runcode = 1,
            updatePreview(),
            runcode = 0,
            $("#coderevisionreport").prop("disabled", !1)
    }),
    $("#linewrappingcheckbox").click(function () {
        $("#linewrappingcheckbox").is(":checked") ? (codeeditorhtml.setOption("lineWrapping", !0),
            codeeditorcss.setOption("lineWrapping", !0),
            codeeditorjs.setOption("lineWrapping", !0),
            codeeditorhtml.setOption("autoCloseTags", !0)) : (codeeditorhtml.setOption("lineWrapping", !1),
            codeeditorcss.setOption("lineWrapping", !1),
            codeeditorjs.setOption("lineWrapping", !1),
            codeeditorhtml.setOption("autoCloseTags", !1))
    }),
    $("#autoclosetagscheckbox").click(function () {
        $("#autoclosetagscheckbox").is(":checked") ? codeeditorhtml.setOption("autoCloseTags", !0) : codeeditorhtml.setOption("autoCloseTags", !1)
    }),
    codeeditorhtml.on("change", function () {
        updatePreview(),
            $("#codeeditorhtml").val(codeeditorhtml.getValue())
    }),
    codeeditorcss.on("change", function () {
        updatePreview(),
            $("#codeeditorcss").val(codeeditorcss.getValue())
    }),
    codeeditorjs.on("change", function () {
        updatePreview(),
            $("#codeeditorjs").val(codeeditorjs.getValue())
    });
var windowsizewidth = $(window).outerWidth(!0) - 5,
    windowsizeheight = $(window).outerWidth(!0) - 55,
    previewsizewidth = $(window).outerWidth(!0) - 5,
    previewsizeheight = $(window).outerWidth(!0) - 55;
$("#previewsizewidth").keyup(function (c) {
        windowsizewidth = $(window).outerWidth(!0) - 5,
            windowsizeheight = $(window).outerHeight(!0) - 55;
        var e = $(this).val();
        this.value = this.value.replace(/[^0-9\,]/g, ""),
            windowsizewidth < e && (e = windowsizewidth,
                $(this).val(windowsizewidth),
                alert("max window width " + windowsizewidth + "px!")),
            windowsizewidth >= e && ($("#bar").animate({
                    width: e
                }, "fast"),
                $(".vsplitter").animate({
                    left: windowsizewidth - e
                }, "fast", function () {
                    $("#widget").split().position(windowsizewidth - e + 2),
                        updatepreviewinput()
                }),
                $("#foo").animate({
                    width: windowsizewidth - e
                }, "fast"),
                codeeditorhtml.setSize("100%", "100%"),
                codeeditorcss.setSize("100%", "100%"),
                codeeditorjs.setSize("100%", "100%"))
    }),
    $("#previewsizeheight").keyup(function (c) {
        windowsizewidth = $(window).outerWidth(!0) - 5,
            windowsizeheight = $(window).outerHeight(!0) - 55;
        var e = $(this).val();
        this.value = this.value.replace(/[^0-9\,]/g, ""),
            windowsizeheight < e && (e = windowsizeheight,
                $(this).val(windowsizeheight),
                alert("max window height " + windowsizeheight + "px!")),
            windowsizeheight >= e && ($("#codejs").animate({
                    height: windowsizeheight - e
                }, "fast"),
                $("#codepreview").animate({
                    height: e
                }, "fast"),
                $("#hor1").animate({
                    top: windowsizeheight - e
                }, "fast", function () {
                    $("#bar").split().position(windowsizeheight - e + 2),
                        $("#previewoutputsize").fadeIn("fast"),
                        previewsizewidth = $("#preview").width() - 1,
                        previewsizeheight = $("#preview").height() - 1,
                        $("#outputsizenumber").html(previewsizewidth + "x" + previewsizeheight + " px")
                }),
                codeeditorhtml.setSize("100%", "100%"),
                codeeditorcss.setSize("100%", "100%"),
                codeeditorjs.setSize("100%", "100%"))
    }),
    $("#previewsize").click(function () {
        inputwindowresize
    }),
    $("#previewdefault").click(function () {
        previewdefault()
    }),
    $("#previewtablet").click(function () {
        previewtablet()
    }),
    $("#nojsview").click(function () {
        nojsview()
    }),
    $("#previewphone-h").click(function () {
        previewphone_h()
    }),
    $("#previewphone-w").click(function () {
        previewphone_w()
    }),
    $("#fullpreview").click(function () {
        fullpreview()
    }),
    $("#previewsizewidth").bind("input propertychange", function () {
        $("#previewsizewidth").keyup(),
            this.value = this.value.replace(/[^0-9\,]/g, "")
    }),
    $("#previewsizeheight").bind("input propertychange", function () {
        $("#previewsizeheight").keyup(),
            this.value = this.value.replace(/[^0-9\,]/g, "")
    });
var thisbutton, codeinfostate;
$("#codeinfo").click(function () {
    thisbutton = $("#codeinfo"),
        $("#settingsmenu, #viewmenu, #librarymenu, #sharemenu, #shareWindow").hide(),
        1 == codeinfostate ? (menubuttoninactive(thisbutton),
            codeinfostate = 0) : (menubuttoninactive(".topmenubutton"),
            menubuttonactive(thisbutton),
            codeinfostate = 1,
            viewmenubuttonstate = 0,
            settingsbuttonstate = 0,
            librarybuttonstate = 0),
        $("#codeinfomenu").toggle()
});
var viewmenubuttonstate;
$("#viewmenubutton").click(function () {
    thisbutton = $("#viewmenubutton"),
        $("#codeinfomenu, #settingsmenu, #librarymenu, #sharemenu, #shareWindow").hide(),
        1 == viewmenubuttonstate ? (menubuttoninactive(thisbutton),
            viewmenubuttonstate = 0) : (menubuttoninactive(".topmenubutton"),
            menubuttonactive(thisbutton),
            viewmenubuttonstate = 1,
            codeinfostate = 0,
            settingsbuttonstate = 0,
            librarybuttonstate = 0),
        $("#viewmenu").toggle()
});
var settingsbuttonstate;
$("#settingsmenubutton").click(function () {
    thisbutton = $("#settingsmenubutton"),
        $("#codeinfomenu, #viewmenu, #librarymenu, #sharemenu, #shareWindow").hide(),
        1 == settingsbuttonstate ? (menubuttoninactive(thisbutton),
            settingsbuttonstate = 0) : (menubuttoninactive(".topmenubutton"),
            menubuttonactive(thisbutton),
            settingsbuttonstate = 1,
            codeinfostate = 0,
            viewmenubuttonstate = 0,
            librarybuttonstate = 0),
        $("#settingsmenu").toggle()
});
var librarybuttonstate;
$("#librarymenubutton").click(function () {
    thisbutton = $("#librarymenubutton"),
        $("#codeinfomenu, #viewmenu, #settingsmenu, #sharemenu, #shareWindow").hide(),
        1 == librarybuttonstate ? (menubuttoninactive(thisbutton),
            librarybuttonstate = 0) : (menubuttoninactive(".topmenubutton"),
            menubuttonactive(thisbutton),
            librarybuttonstate = 1,
            codeinfostate = 0,
            viewmenubuttonstate = 0,
            settingsbuttonstate = 0),
        $("#librarymenu").toggle()
});