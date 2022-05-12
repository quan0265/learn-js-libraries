var stickyScroll = 1; // Sticky Scroll ON by default
var autoRun = 1; // Auto-run ON by default
var delay;

// HTML5
var htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-source'), {
    mode: "pophtmlmixed",
    profile: 'xhtml',
    lineWrapping: true,
    lineNumbers: true,
    gutters: ["CodeMirror-lint-markers"],
    dragDrop: false,
    theme: "tomorrow-night-eighties",
    extraKeys: {
        "Tab": "betterTab",
        "Ctrl-D": function() {
            downloadZip();
        },
        "Cmd-D": function() {
            downloadZip();
        },
        "Ctrl-R": function() {
            renderPreview();
        },
        "Cmd-R": function() {
            renderPreview();
        }
    }
});

var htmlCompletion = new CodeCompletion(htmlEditor, new HtmlCompletion());
htmlEditor.setOption("onKeyEvent", function(cm, e) {
    return htmlCompletion.handleKeyEvent(cm, e);
});

htmlEditor.on("change", function() {
    if (autoRun == 1) {
        clearTimeout(delay);
        delay = setTimeout(renderPreview, 300);
    }
});
htmlEditor.on("focus", function() {
    $(".html-logo").fadeOut("slow");
});
htmlEditor.on("blur", function() {
    $(".html-logo").fadeIn("slow");
});
htmlEditor.on("drop", function() {
    htmlEditor.setValue("");
});


// CSS3
var cssEditor = CodeMirror.fromTextArea(document.getElementById('css-source'), {
    mode: "css",
    lineWrapping: true,
    dragDrop: false,
    lineNumbers: true,
    gutters: ["CodeMirror-lint-markers"],
    lint: true,
    theme: "tomorrow-night-eighties",
    extraKeys: {
        "Tab": "betterTab",
        "Ctrl-D": function() {
            downloadZip();
        },
        "Cmd-D": function() {
            downloadZip();
        },
        "Ctrl-R": function() {
            renderPreview();
        },
        "Cmd-R": function() {
            renderPreview();
        }
    }
});

var cssCompletion = new CodeCompletion(cssEditor, new CssCompletion());
cssEditor.setOption("onKeyEvent", function(cm, e) {
    return cssCompletion.handleKeyEvent(cm, e);
});

cssEditor.on("change", function() {
    if (autoRun == 1) {
        clearTimeout(delay);
        delay = setTimeout(renderPreview, 300);
    }
});
cssEditor.on("focus", function() {
    $(".css-logo").fadeOut("slow");
});
cssEditor.on("blur", function() {
    $(".css-logo").fadeIn("slow");
});
cssEditor.on("drop", function() {
    cssEditor.setValue("");
});

function passAndHint(cm) {
    setTimeout(function() {
        cm.execCommand("autocomplete");
    }, 100);
    return CodeMirror.Pass;
}

function myHint(cm) {
    return CodeMirror.showHint(cm, CodeMirror.ternHint, { async: true });
}

CodeMirror.commands.autocomplete = function(cm) {
    CodeMirror.showHint(cm, myHint);
}

// JavaScript
var jsEditor = CodeMirror.fromTextArea(document.getElementById("js-source"), {
    mode: 'application/javascript',
    theme: "tomorrow-night-eighties",
    styleActiveLine: true,
    lineNumbers: true,
    autoCloseBrackets: true,
    dragDrop: false,
    matchBrackets: true,
    lineWrapping: true,
    extraKeys: {
        "'.'": passAndHint,
        "Ctrl-Space": passAndHint,
        "Tab": "betterTab",
        "Ctrl-D": function() {
            downloadZip();
        },
        "Cmd-D": function() {
            downloadZip();
        },
        "Ctrl-R": function() {
            renderPreview();
        },
        "Cmd-R": function() {
            renderPreview();
        }
    },
    gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers"],
    lintWith: CodeMirror.javascriptValidator,
    textHover: { delay: 300 },
    onKeyEvent: function(e, s) {
        if (s.type == "keyup" && ((s.keyCode >= 65 && s.keyCode <= 90) || s.keyCode == 190)) {
            CodeMirror.showHint(e, myHint);
        }
    }

});

jsEditor.on("change", function() {
    if (autoRun == 1) {
        clearTimeout(delay);
        delay = setTimeout(renderPreview, 300);
    }
});
jsEditor.on("focus", function() {
    $(".js-logo").fadeOut("slow");
});
jsEditor.on("blur", function() {
    $(".js-logo").fadeIn("slow");
});
jsEditor.on("drop", function() {
    jsEditor.setValue("");
});

setTimeout(renderPreview, 300); // Important!

// Advanced tab
function betterTab(cm) {
    if (cm.somethingSelected()) {
        cm.indentSelection("add");
    } else {
        cm.replaceSelection(cm.getOption("indentWithTabs") ? "\t" :
            Array(cm.getOption("indentUnit") + 1).join(" "), "end", "+input");
    }
}

// Auto-scroll to the bottom of iframe
function scrollToBottom() {
    if (stickyScroll == 1) {
        $('#preview').contents().scrollTop($('#preview').contents().height());
    } else if (stickyScroll == 0) {
        $('#preview').contents().scrollTo(0, 0);
    }
}

// Auto-run
function autoRun() {
    if (autoRun == 0) {
        $('#run').hide();
    } else if (autoRun == 1) {
        $('#run').show();
    }
}

// Get selected text
function getSelectedRange() {
    return { from: htmlEditor.getCursor(true), to: htmlEditor.getCursor(false) };
}

// Auto-format selected text
function autoFormatSelection() {
    var range = getSelectedRange();
    htmlEditor.autoFormatRange(range.from, range.to);
}

// Tidy HTML
$("#tidy").click(function() {
    autoFormatSelection();
});

// Get the <title> from HTML
function getTitle() {
    var htmlContent = htmlEditor.getValue();
    var xmlDoc = $.parseXML(htmlContent),
        $xml = $(xmlDoc),
        $title = $xml.find("title");
    var titleCheck = $title.text();

    // Default, if <title> is there
    if (titleCheck == '' || titleCheck == null) {
        alertify.alert("WARNING:<br/> Your weave has been saved, but your HTML is invalid and is missing the &lt;title&gt; tag!");
        $('#dummy-title').val("A HTML, CSS and JavaScript demo");
    }
    // If <title> is missing
    else {
        $('#dummy-title').val(titleCheck);
    }
}

// Download function
function downloadZip() {
    var zip = new JSZip();

    var htmlContent = htmlEditor.getValue();
    var cssContent = cssEditor.getValue();
    var jsContent = jsEditor.getValue();

    var cssLink = "<" + "link type=\"text/css\" rel=\"stylesheet\" href=\"css/style.css\"" + "/>" + "\n";
    var jsLink = "<" + "script type=\"text/javascript\" src=\"js/script.js\">" + "</" + "script" + ">" + "\n";

    cssLink = cssLink + "</head>";
    jsLink = jsLink + "</body>";

    htmlContent = htmlContent.replace("</head>", cssLink);
    htmlContent = htmlContent.replace("</body>", jsLink);

    zip.file("css/style.css", cssContent);
    zip.file("js/script.js", jsContent);
    zip.file("index.html", htmlContent);
    var content = zip.generate();
    location.href = "data:application/zip;base64," + content;
}

// Prevent default
function prevent(e) {
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        // internet explorer
        e.returnValue = false;
    }
}

// Combining HTML5, CSS3 and JavaScript
function renderPreview() {
    var previewFrame = document.getElementById('preview');
    var preview = previewFrame.contentDocument || previewFrame.contentWindow.document;
    preview.open();
    preview.write('<meta http-equiv="cache-control" content="no-cache" /><meta http-equiv="Pragma" content="no-cache" /><meta http-equiv="Expires" content="-1" />');
    preview.write('<style type="text/css">' + cssEditor.getValue() + '</style>');
    preview.write(htmlEditor.getValue());
    preview.write('<scr' + 'ipt>' + jsEditor.getValue() + '</scr' + 'ipt>');
    preview.close();
    $('#preview').contents().find('a').click(function(event) {
        event.preventDefault();
    });
}

// Ruler
var ruler = document.getElementById('ruler');
var rulez = new Rulez({
    element: ruler,
    units: 'px',
    showUnits: false,
    divisions: [{
            pixelGap: 20,
            lineLength: 10,
            className: 'ruler-tick'
        },
        {
            pixelGap: 100,
            lineLength: 20,
            className: 'ruler-tick-long'
        }
    ],
    texts: [{
            // pixelGap: 50,
            // className: 'ruler-text-sub'
        },
        {
            pixelGap: 100,
            className: 'ruler-text'
        }
    ]

});
rulez.render();