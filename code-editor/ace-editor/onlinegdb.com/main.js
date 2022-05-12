var term, protocol, socketURL, socket, terminalContainer = document.getElementById("terminal-container");

function assert(e, t) {
    if (!e)
        throw t || "Assertion failed"
}

function opt_hidesidebar() {
    return "no" == getParameterByName("sidebar")
}

function opt_largeconsole() {
    return "true" == getParameterByName("largeconsole")
}

function opt_autorun() {
    return "true" == getParameterByName("autorun")
}

function opt_autoreplay() {
    return "true" == getParameterByName("autoreplay")
}
var debug_perf_param = null;

function opt_debugperf() {
    if (null == debug_perf_param) {
        var e = getParameterByName("debug_perf");
        debug_perf_param = "true" == e
    }
    return debug_perf_param
}

function getParameterByName(e, t) {
    t || (t = window.location.href),
        e = e.replace(/[\[\]]/g, "\\$&");
    var n = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(t);
    return n ? n[2] ? decodeURIComponent(n[2].replace(/\+/g, " ")) : "" : null
}
var delete_cookie = function(e) {
        document.cookie = e + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;"
    },
    CLIENT_VERSION = "1.2";

function get_socket() {
    delete_cookie("SERVERID"),
        delete_cookie("SPSERVERID");
    var e = io.connect("//" + document.location.host, {
        query: "client_version=" + CLIENT_VERSION + "&uni=" + getParameterByName("uni") + "&debug_perf=" + getParameterByName("debug_perf")
    });
    return e.io.reconnectionAttempts(10),
        e
}

function disconnect_socket() {
    socket.disconnected || socket.disconnect()
}
var connection_callback_waiting = !1;

function try_socket_connection(e, t) {
    ide.server_connected || (disable_btn("control-btn-", ["run", "run_x", "debug"]),
        e && (connection_callback_waiting = !0,
            socket.once("connect", function() {
                connection_callback_waiting = !1,
                    e(t)
            })),
        socket.io.reconnecting || socket.connect())
}

function socket_on_reconnect_failed() {
    connect_attempt_count = 0,
        $("#connectingMessage").hide(),
        enable_btn("control-btn-", ["run", "run_x", "debug"]),
        connection_callback_waiting && $("#serverDisconnectedModal").modal("show")
}

function socket_on_connect_error() {
    ++connect_attempt_count >= 3 && connection_callback_waiting && $("#connectingMessage").show()
}
socket = get_socket();
var gccterm, connect_attempt_count = 0;

function bind_socket_handlers() {
    socket.on("connect", socket_on_connect),
        socket.on("perf_data", e => console.log(e)),
        socket.on("connect_failed", function() {
            console.log("Connection failed")
        }),
        socket.on("reconnect", function() {
            console.log("ReConnectioning")
        }),
        socket.on("connect_error", socket_on_connect_error),
        socket.on("connect_timeout", function() {
            console.log("Connect timeout")
        }),
        socket.on("reconnect_failed", socket_on_reconnect_failed),
        socket.on("compile_error", socket_on_compile_error),
        socket.on("compile_success", socket_on_compile_success),
        socket.on("display_ready", socket_on_display_ready),
        socket.on("update_version", socket_on_update_version),
        socket.on("console_exit", socket_on_console_exit),
        socket.on("gdbexit", socket_on_gdbexit),
        socket.on("output", socket_on_output),
        socket.on("filewatch", socket_on_filewatch),
        socket.on("runoutput", socket_on_runoutput),
        socket.on("debugoutput", socket_on_debugoutput),
        socket.on("gdb_state", socket_on_gdb_state),
        socket.on("gui_info", socket_on_gui_info),
        socket.on("disconnect", socket_on_disconnect),
        socket.on("gdbsessionlimit", socket_on_gdbsessionlimit),
        socket.on("emptysource", socket_on_emptysource),
        socket.on("filelimitexceed", socket_on_filelimitexceed),
        socket.on("maxdebugsession", socket_on_maxdebugsession),
        socket.on("gui_cmd_reply", socket_on_gui_cmd_reply)
}
var ide = new Object;
ide.test = new Object,
    ide.test.testing = !1,
    ide.running,
    ide.debugging,
    ide.output = new Object,
    ide.initialize = function() {
        this.btnRunObj = $("#control-btn-run"),
            this.btnDebugObj = $("#control-btn-debug"),
            this.btnStopObj = $("#control-btn-stop"),
            enable_btn("control-btn-", ["run", "run_x", "debug"])
    },
    ide.debug = function(e) {
        ide.run_gui_cmd({
            cmd: e
        }, !0)
    },
    ide.output.hide = function() {
        $("#stdout-container .msg").html(""),
            $("#stderr-container .msg").html("")
    },
    ide.output.show = function(e, t) {
        $("#stdout-wrapper").show(),
            e && $("#stderr-wrapper").show(),
            $("#tab-stdin").hide(),
            "out" == t ? ($("#console-title-bar .tab-stdout").show(),
                $("#console-title-bar .tab-stderr").show(),
                $('.nav-tabs a[href="#tab-stdout"]').tab("show")) : "err" == t ? ($("#console-title-bar .tab-stderr").show(),
                $('.nav-tabs a[href="#tab-stderr"]').tab("show")) : "stdin" == t && ($("#tab-stdin").show(),
                $("#console-title-bar .tab-stdin").show(),
                $('.nav-tabs a[href="#tab-stdin"]').tab("show"))
    };
var compile_error_tags = [],
    uniq_hint_errors = [],
    hint_errors = [];

function display_debug_tip() {
    var e = get_src_filename($("#lang-select").val());
    for (key in compile_error_tags)
        switch (key) {
            case "conio_h":
                display_dialog('Hint to resolve compiler error: "conio.h: No such file or directory"', "<b>Possible Solution</b>: <br>Don't include 'conio.h' and comment out functions (e.g. clrscr(), getch())             used from 'conio.h' <br><br>            <b> Explaination: </b> <br> Seems like your program is written for Turbo C or Borland C compiler             which support non-standard header file 'conio.h'<br>            OnlineGDB runs C/C++ programs with gcc/g++, which doesn't support conio.h<br>            So to resovle error don't use conio.h and functions from 'conio.h' (e.g. clrscr(), getch())");
                break;
            case "iostream_h":
                display_dialog('Hint to resolve compiler error: "iostream.h: No such file or directory"', "<b>Possible Solution</b>: <br>Use <b>#include &#x3C;iostream&#x3E;</b> instead of             <b>#include &#x3C;iostream.h&#x3E; </b><br><br>            <b> Explaination: </b> <br> Seems like your program is written for Turbo C or Borland C compiler             which has '.h' extension for C++ header files. <br>            OnlineGDB runs C++ programs with g++, which doesn't need '.h' extension.<br>            So instead of &#x3C;iostream&#x3E; , &#x3C;iostream.h&#x3E; should be used to resolve this error. ");
                break;
            case "iostream_in_c":
                display_dialog('Hint to resolve compiler error: "iostream: No such file or directory"', "<b>Possible Solution</b>: <br> Choose 'C++' in Language settings available in top-right corner.<br><br>            <b> Explaination: </b> <br> Seems like you are trying to run C++ program, but in Language settings              you have selected 'C'. Since 'C' doesn't have any such header file named 'iostream',             compiler throws this error.  <br>            So choosing 'C++' in language setting should resolve this error.");
                break;
            case "multiple_main":
                display_dialog('Hint to resolve error: "multiple definition of `main\' "', "<b>Possible Solution</b>: <br> Write your 'main' function in " + e + " file.<br><br>            <b> Explaination: </b> <br> Seems like you have created multiple files and have written 'main' function             in more than 1 files. Compiler would give error if it finds 'main' function in multiple files.<br>            To resolve error, write your 'main' function only in " + e + " file.")
        }
}
hint_errors.conio_h = "To resolve this error you should comment out include of 'conio.h' and functions used from it (e.g. getch(), clrscr())<br><br>Because 'conio.h' isn't supported by gcc compiler, which is used by OnlineGDB server.",
    hint_errors.iostream_h = "To resolve this error you should use <b>#include &lt;&zwj;iostream&gt;&zwj;</b> instead of <b>#include &lt;&zwj;iostream.h&gt;&zwj;</b><br><br>Because OnlineGDB uses gcc compiler, which doesn't need '.h' extension for C++ header files.",
    hint_errors.iostream_in_c = "To resolve this error choose C++ in language settings available on top-right corner.<br><br>The reason you are getting this error is you are trying to run C++ program with C compiler.",
    hint_errors.multiple_main = "To resolve this error you should write your 'main' function only in main.c or main.cpp file.<br><br>The reason you are getting this error is because you have created multiple files which is having main function. You shouldn't write main function in more than 1 files.",
    hint_errors.stray_342 = "The reason of this error is because your source code contains non-ascii characters. Perhaps source code is copied from somewhere else, where double quotes are written in unicode character format. <br>For example, instead of <b>&quot;Hello&quot;</b> it has <b>“Hello”</b><br> Note that second hello is written inside double quotes which is in unicode format, which compiler can't understand.<br> To resolve error, replace unicode quotes with ascii quotes.";
var $popover_hint = null;

function close_popover() {
    $popover_hint && $popover_hint.attr("aria-describedby") && $popover_hint.trigger("click")
}

function test_case_html(e) {
    return '<div class="panel panel-primary"><div class="panel-body"><span class="label label-primary">' + e.test.name + "</span>" + ("Pass" == e.status ? '<span class="label label-success">' + e.status + "</span>" : '<span class="label label-danger">' + e.status + "</span>") + '</div><div class="panel-footer"><span class="label label-default">Input</span><br><pre>' + e.test.input + '</pre><br><span class="label label-default">Your Output</span><br><pre>' + e.user_output + "</pre></div></div>"
}

function generate_test_case_list(e) {
    if (!e || 0 == e.length)
        return "";
    for (var t = "", n = 0; n < e.length; n++)
        t += test_case_html(e[n]);
    return t
}
ide.output.display = function(e) {
    var t = !1;
    this.hide(),
        this.setCompile(e.compile);
    var n, o = "",
        i = {};
    if (n = "out",
        e.test_error)
        display_dialog("Testing couldn't be done because of following reason", a = e.test_message),
        n = "stdin";
    else if (e.test_result) {
        var a = e.test_result.status + "<br>",
            r = e.test_result.test_total;
        a += e.test_result.test_passed + " test(s) passed out of " + r + " test(s)",
            display_dialog("Test Result", a += "<br><br>" + generate_test_case_list(e.test_result.results)),
            n = "stdin"
    } else if (e.compile)
        o += "Compiled Successfully. ",
        ide.compile_stderr && (e.stderr = e.stderr ? e.stderr : "",
            e.stderr = ide.compile_stderr + "\n" + e.stderr),
        e.run_error ? (o += e.run_error,
            i.status = "RUNTIME ERROR",
            i.memory = e.memory,
            i.time = e.time) : e.runtime_exceed ? (i.status = "RUNTIME EXCEED",
            o += "<b style='color:red'> Runtime Exceed. </b> <a onclick=\"$('#runtimeModal').modal('show');\"  style='color:#1d238a;cursor:pointer'>Click here to know possible reasons for runtime exceed.</a>",
            e.stderr && (t = !0,
                n = "err",
                $("#stderr-container .msg").text($("<div/>").text(e.stderr).text())),
            e.stdout && (n = "out",
                $("#stdout-container .msg").text($("<div/>").text(e.stdout).text())),
            n = "out") : (i.status = "RAN SUCCESSFULLY",
            i.memory = e.memory,
            i.time = e.time,
            i.stderr = e.stderr,
            i.stdout = e.stdout,
            i.exit_status = e.exit_status.trim(),
            o += " memory: " + e.memory,
            o += " time: " + e.time,
            "0" != e.exit_status.trim() ? o += " exit code: " + e.exit_status.trim() : (o += " exit code: " + e.exit_status.trim(),
                $("#ide-output-exit-code-wrapper").addClass("text-success"),
                $("#ide-output-exit-code-wrapper").removeClass("text-danger")),
            e.stderr && (t = !0,
                n = "err",
                $("#stderr-container .msg").text($("<div/>").text(e.stderr).text())),
            e.stdout && (n = "out",
                $("#stdout-container .msg").text($("<div/>").text(e.stdout).text())),
            n = "out");
    else if (compile_error_tags = [],
        uniq_hint_errors = [],
        e.compiletime_exceed)
        o += "Compile Time Exceed",
        n = "out",
        i.status = "COMPILE TIME EXCEED";
    else if (e.writefile_error)
        o += "<b style='color:red'>Compilation failed due to internal server error.</b> Please try again or contact us if problem persists.",
        n = "out",
        i.status = "COMPILE TIME SERVER ERROR";
    else {
        i.status = "COMPILE ERROR",
            i.stderr = e.stderr,
            i.stdout = e.stdout,
            o = "<span style='color:red'>Compilation failed due to following error(s).</span> ",
            $("#ide-compile-result").html(o),
            n = "err",
            t = !0;
        for (var s = $("<div/>").text(e.stderr).text().match(/[^\r\n]+/g), d = "", l = 0; l < s.length; l++) {
            var c = s[l],
                u = c.match(/^.*\:[0-9]+/) || null;
            if (c && (c.indexOf(": error:") > -1 || c.indexOf(": fatal error:") > -1 || c.indexOf(": undefined reference to") > -1 || c.indexOf(": multiple definition of") > -1 || c.indexOf(": first defined here") > -1) && socket.emit("compiler_error", c),
                u) {
                var _ = u[0].split(":")[1],
                    m = u[0].split(":")[0];
                ide.editor.if_file_exists(m) && (c = c.replace(/^.*\:[0-9]+/, '<span class="error_line" onclick="ide.gotoLine(\'' + m + "'," + _ + ')">' + u + "</span>"))
            }
            if (c && (c.indexOf(": error:") > -1 || c.indexOf(": fatal error:") > -1 || c.indexOf(": undefined reference to") > -1 || c.indexOf(": multiple definition of") > -1 || c.indexOf(": first defined here") > -1)) {
                var g = null;
                c.indexOf("conio.h: No such") > -1 ? g = "conio_h" : c.indexOf("iostream.h: No such") > -1 ? g = "iostream_h" : c.indexOf(": iostream: No such") > -1 ? g = "iostream_in_c" : c.indexOf("multiple definition of `main'") > -1 ? g = "multiple_main" : (c.indexOf("stray ‘\\342’") > -1 || c.indexOf("stray '\\342'") > -1) && (uniq_hint_errors.stray_342 || (g = "stray_342",
                    uniq_hint_errors.stray_342 = !0));
                var p = '<a href="#" class="hint_btn"><span class="glyphicon glyphicon-question-sign" aria-hidden="true" title="Hint to resolve error"                     data-toggle="popover" data-content="' + hint_errors[g] + '"></span></a>';
                g && (c = (c = (c = c.replace(": fatal error:", ": fatal error: " + p)).replace(": error:", ": fatal error: " + p)).replace(": multiple definition of", " " + p + " : multiple definition of")),
                    d += '<span style="color:#ff5b4a">' + c + "</span>\r\n"
            } else
                c.indexOf(": warning:") > -1 ? d += '<span style="color:orange">' + c + "</span>\r\n" : c.indexOf(": note:") > -1 ? d += '<span style="color:#42abff">' + c + "</span>\r\n" : d += encodeHtmlEntity(c) + "\r\n"
        }
        $("#stderr-container .msg").html(d),
            ($popover_hint = $('#stderr-container .msg [data-toggle="popover"]')).popover({
                placement: "auto",
                trigger: "click",
                container: "body",
                html: !0,
                placement: "top",
                template: '<div class="popover popover-hint" role="tooltip">                <div class="arrow"></div>                <button type="button" class="close" style="margin: 1px 4px;" onclick="close_popover();">&times;</button>                <h3 class="popover-title" style="text-align:center">                </h3>                <div class="popover-content"></div>                </div>'
            }),
            setTimeout(function() {
                $popover_hint.trigger("click")
            }, 500),
            ide.on_compiler_error && ide.on_compiler_error(),
            display_debug_tip()
    }
    $("#ide-run-result").html(o),
        this.show(t, n),
        i.files = ide.editor.get_files(),
        ide.result_callback && ide.result_callback(i)
};
var editor = null;
ide.gotoLine = function(e, t) {
        ide.editor.gotoFileLine(new FileLine(e, t))
    },
    ide.output.setCompile = function(e) {
        e ? $("#ide-compile-status").html('<span class="text-success">Successfully Compiled.</span>') : $("#ide-compile-status").html('<span class="text-danger">Compilation Error(s).</span>')
    },
    ide.set_gui_state = function(e) {
        "PROGRAM_PAUSED" == e && (ide.set_active_line(),
                term.focus()),
            ide.last_gui_state = e,
            "DEBUG_INIT" == e ? ($("#debug_window_call_stack table tbody").html(""),
                $("#debug_window_local_variables table tbody").html(""),
                $("#debug_window_breakpoints table tbody").html(""),
                delete ide.active_frame) : "PROGRAM_NOT_EXIST" == e ? (enable_btn("debug_btn_", ["run"]),
                disable_btn("debug_btn_", ["pause", "cont", "step", "next", "finish"]),
                ide.remove_active_line(),
                delete ide.active_frame) : "PROGRAM_RUNNING" == e ? (disable_btn("debug_btn_", ["run", "cont", "step", "next", "finish"]),
                enable_btn("debug_btn_", ["pause"]),
                ide.remove_active_frame(),
                ide.remove_active_line(),
                term.focus()) : (e = "PROGRAM_PAUSED") && (disable_btn("debug_btn_", ["pause"]),
                enable_btn("debug_btn_", ["cont", "step", "next", "finish"]),
                term.focus())
    },
    ide.set_active_line = function() {
        var e = null;
        void 0 === ide.active_frame && ($("#debug_window_call_stack tbody tr").each(function() {
                var t = $(this).attr("data-file"),
                    n = $(this).attr("data-line");
                if (is_user_src_file(t)) {
                    if ((ide.debugger == DEBUGGER_CC || ide.debugger == DEBUGGER_JAVA) && e)
                        return;
                    e = n = new FileLine(t, n)
                }
            }),
            e && (ide.editor.gotoFileLine(e),
                ide.editor.removeMarkerById(ide.editor.last_marker_id),
                ide.editor.last_marker_id = ide.editor.addMarker(e, "myMarker", "fullLine")))
    },
    ide.remove_active_frame = function() {
        if (null != ide.active_frame) {
            var e = "#debug_window_call_stack tbody tr[data-frame-num='" + ide.active_frame + "']";
            $(e).removeClass("active"),
                ide.active_frame = void 0,
                ide.hightlight_active_frame_line(new FileLine("", -1))
        }
    },
    ide.remove_active_line = function() {
        ide.editor.removeMarkerById(ide.editor.last_marker_id),
            delete ide.editor.last_marker_id
    },
    ide.fadeConsole = function(e) {
        e && ide.fadeMessage(e),
            $("#console-fadder").show()
    },
    ide.unfadeConsole = function() {
        $("#console-fadder").hide()
    },
    ide.fadeMessage = function(e) {
        $("#console-fadder .msg").text(e)
    },
    ide.showinfo = function() {
        $("#infoModal").modal("show")
    },
    ide.showsettings = function() {
        $("#popup-settings").show()
    },
    ide.test.verify = function(e) {
        this.testing && this.verify_output(e)
    },
    ide.closegdb = function() {
        term && term.attachAddon.dispose(),
            msg = "\n[1;32m...Disconnected from gdb...[0m",
            term && term.write(msg),
            ide.remove_active_frame(),
            ide.remove_active_line(),
            live_ide && ide.editor.setReadOnly(!1)
    };
var socket_on_connect = function(e) {
        ide.server_connected = !0,
            ide.initialize(),
            connect_attempt_count = 0,
            $("#connectingMessage").hide(),
            opt_autorun() && $("#control-btn-run").click()
    },
    socket_on_compile_error = function() {
        ide.running ? was_interactive_run && ide.unfadeConsole() : ide.unfadeConsole()
    },
    socket_on_compile_success = function(e) {
        if (debug_perf("compile_request", "end"),
            e) {
            ide.compile_stdout = e.stdout,
                ide.compile_stderr = e.stderr;
            var t = "";
            if (e.stdout && (t += e.stdout),
                e.stderr) {
                for (var n = "", o = e.stderr.match(/[^\r\n]+/g), i = 0; i < o.length; i++) {
                    var a = o[i];
                    a.indexOf(": warning: ") > -1 ? n += "[1;33m" + a + "[0m\r\n" : a.indexOf(": note: ") > -1 && (n += "[1;34m" + a + "[0m\r\n")
                }
                t += n
            }
            t = t.replace(/\r?\n/g, "\r\n"),
                term && term.write(t)
        }
        ide.running ? was_interactive_run ? ide.unfadeConsole() : ide.fadeMessage("Compiled sucessfully. Now running Program...") : ide.unfadeConsole()
    };

function handle_vnc_window_connect() {
    if (!handle_vnc_window_connect._initialized) {
        handle_vnc_window_connect._initialized = !0;
        var e = window.addEventListener ? "addEventListener" : "attachEvent";
        (0,
            window[e])("attachEvent" === e ? "onmessage" : "message", function(e) {
            "display_connected" !== e.data && "display_connected" !== e.message || socket.emit("display_connected")
        })
    }
}
var socket_on_display_ready = function() {
    console.log("display_ready");
    var e = ide.graphics_window;
    e && (e.location.href = "/vnc/vnc_lite.html?scale=true&token=" + get_socket_id(),
        handle_vnc_window_connect())
};

function display_compiler_flags_box() {
    $("#compilerFlagsModal").modal("show")
}

function display_update_version_popup() {
    $("#newVersionModal").modal("show")
}
var socket_on_update_version = function() {
        display_update_version_popup()
    },
    socket_on_console_exit = function() {
        if (term) {
            if (ide.running_state = "FINISHED",
                term.attachAddon.dispose(),
                term.write("\r\n[1;32mPress ENTER to exit console.[0m"),
                live_ide && ide.editor.setReadOnly(!1),
                disable_btn("control-btn-", ["stop"]),
                enable_btn("control-btn-", ["run", "run_x", "debug", "beautify", "newfile"]),
                debug_perf("run_request", "end"),
                opt_debugperf() && (console.log(perf_bins),
                    perf_bins = null),
                opt_autoreplay())
                return void close_run_console();
            term.onData(function(e) {
                (e.indexOf("\r") > -1 || e.indexOf("\n") > -1) && close_run_console()
            })
        }
    },
    socket_on_gdbexit = function() {
        ide.closegdb(),
            close_debug_console()
    },
    socket_on_output = function(e) {
        null == gccterm && ((gccterm = new Terminal).open(terminalContainer),
                gccterm.fitAddon.fit()),
            gccterm.write(e)
    },
    socket_on_filewatch = function(e) {
        switch (e.event) {
            case "add":
            case "change":
                var t = {};
                t.name = e.path,
                    t.content = e.content,
                    ide.editor.compare_file(t) || ide.editor.set_files([t]);
                break;
            case "unlink":
                ide.editor.delete_file(e.path)
        }
    },
    socket_on_runoutput = function(e) {
        if (e.lang && "html" == e.lang) {
            ide.unfadeConsole();
            var t = '<iframe src="' + e.url + '" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"         frameborder="0" style="height: 100%; width: 100%;"></iframe>';
            return $("#interactive-terminal-container").html(t),
                void enable_btn("control-btn-", ["run", "run_x", "debug", "beautify", "newfile"])
        }
        ide.running_state = "FINISHED",
            ide.test.verify(e),
            ide.output.display(e),
            ide.unfadeConsole(),
            close_run_console(),
            enable_btn("control-btn-", ["run", "run_x", "debug", "beautify", "newfile"])
    },
    socket_on_debugoutput = function(e) {
        ide.output.display(e),
            close_debug_console()
    },
    socket_on_gdb_state = function(e) {
        $("#ogdb_status").text(e)
    };
const DEBUGGER_PYTHON = "debugger_python",
    DEBUGGER_CC = "debugger_cc",
    DEBUGGER_JAVA = "debugger_java",
    DEBUGGER_RUBY = "debugger_ruby";

function check_server_connection(e, t) {
    return close_popover(),
        !!ide.server_connected || (try_socket_connection(e, t),
            !1)
}

function is_user_src_file(e) {
    return ide.editor.if_file_exists(e)
}

function quoteattr(e, t) {
    return t = t ? "&#13;" : "\n",
        ("" + e).replace(/&/g, "&amp;").replace(/'/g, "&apos;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\r\n/g, t).replace(/[\r\n]/g, t)
}

function escape(e) {
    return "" + e
}
ide.hightlight_active_frame_line = function(e) {
    -1 != e.line ? (ide.editor.gotoFileLine(e),
        ide.editor.removeMarkerById(ide.editor.last_frame_marker_id),
        ide.editor.last_frame_marker_id = ide.editor.addMarker(e, "active_frame_line_marker", "fullLine")) : ide.editor.removeMarkerById(ide.editor.last_frame_marker_id)
};
var encodeHtmlEntity = function(e) {
    for (var t = [], n = e.length - 1; n >= 0; n--)
        t.unshift(["&#", e[n].charCodeAt(), ";"].join(""));
    return t.join("")
};

function fold_left_bar() {
    $("#btn_close_header").hide(),
        $("#left-component").width("50px"),
        $("#right-component").css({
            left: "50px"
        }),
        ide.debugging || ($("#right-left-component").css({
                width: "100%"
            }),
            $("#my-divider2").css({
                left: "100%"
            }),
            $("#right-right-component").css({
                left: "100%"
            })),
        $("#left-component .to_be_hidden").hide(),
        $("#header_logo a").attr("href", "javaScript:void(0);"),
        $("#header_logo a").click(function(e) {
            $("#btn_close_header").show(),
                $("#left-component").width("20%"),
                $("#right-component").css({
                    left: "20%"
                }),
                $("#left-component .to_be_hidden").show()
        })
}

function gui_call_stack_clear() {
    $("#debug_window_call_stack tbody").html("")
}

function gui_call_stack_add_frame(e) {
    e && $("#debug_window_call_stack tbody").append('<tr data-file="' + encodeHtmlEntity(e.file_name) + '" data-line="' + e.line + '" data-frame-num="' + e.frame_no + '" onclick="ide.set_frame(' + e.frame_no + ')"><td>' + e.frame_no + "</td><td>" + encodeHtmlEntity(e.fun_name) + "</td><td>" + encodeHtmlEntity(e.file_name) + ":" + e.line + "</td></tr>")
}

function gui_call_stack_post_processing(e) {
    if (void 0 !== ide.active_frame) {
        var t = "#debug_window_call_stack tbody tr[data-frame-num='" + ide.active_frame + "']";
        $(t).addClass("active");
        var n = $(t).attr("data-file"),
            o = $(t).attr("data-line");
        if (is_user_src_file(n)) {
            var i = new FileLine(n, o);
            ide.hightlight_active_frame_line(i)
        }
    }
}

function gui_breakpoints_clear() {
    var e = '<div id="debug_window_breakpoints" class="collapse in">        <div class="table-responsive"><table class="table table-bordered">       <thead>';
    ide.debugger != DEBUGGER_JAVA ? e += "<tr><th></th><th>#</th><th>Description</th><th></th></tr>" : e += "<tr><th>Description</th><th></th></tr>",
        e += "</thead>       <tbody></tbody>       </table></div></div>",
        $("#debug_window_breakpoints").html(e),
        $("#debug_window_breakpoints table").colResizable({
            liveDrag: !0
        })
}

function gui_local_variables_reset() {
    ide.debugger != DEBUGGER_PYTHON ? ($("#debug_window_local_variables").html('       <div class="table-responsive"><table class="table table-bordered">       <thead> <tr><th>Variable</th><th>Value</th></tr></thead>       <tbody></tbody>       </table></div>'),
        $("#debug_window_local_variables table").colResizable({
            liveDrag: !0
        })) : $("#debug_window_local_variables").html("")
}

function gui_display_expr_window_reset() {
    ide.debugger == DEBUGGER_CC ? ($("#debug-pan .panel-display-expression").show(),
        $("#debug_window_display_expression").show()) : ($("#debug-pan .panel-display-expression").hide(),
        $("#debug_window_display_expression").hide())
}

function gui_registers_window_reset() {
    var e = $("#lang-select").find(":selected").val();
    ide.debugger == DEBUGGER_CC && "asm_gcc" == e ? ($("#debug-pan .panel-registers").show(),
        $("#debug_window_registers").show()) : ($("#debug-pan .panel-registers").hide(),
        $("#debug_window_registers").hide())
}
var gui_breakpoints_list = [];

function gui_breakpoints_list_clear() {
    gui_breakpoints_list = []
}

function gui_breakpoints_add(e) {
    var t = "y" == e.enabled ? 'checked="checked"' : "",
        n = "";
    if (e.bp_desc)
        n = e.bp_desc;
    else if ("breakpoint" == e.type)
        "<PENDING>" == e.address ? n = "Pending in " + e.what : e.file ? (e.what && (n += "in " + e.what),
            n += " at " + e.file + ":" + e.line) : n = e.what ? e.what : "at " + e.address;
    else {
        if (!(e.type = "hw watchpoint"))
            throw "unexpected breakpoint type";
        n = "watchpoint on " + e.what
    }
    if (ide.editor.if_file_exists(e.file)) {
        var o = new Breakpoint(e.file, e.line);
        o.filename in gui_breakpoints_list || (gui_breakpoints_list[o.filename] = []),
            ide.editor.setBreakpoint(o),
            gui_breakpoints_list[o.filename].push(parseInt(o.line))
    }
    var i = '<tr data-file="' + e.file + '" data-line="' + e.line + '" data-bp-num="' + e.num + '" class="bp_' + e.enabled + '">';
    ide.debugger != DEBUGGER_JAVA && (i += "<td><input onchange=\"bp_change($(this).is(':checked')," + e.num + ')" type="checkbox" ' + t + "/></td><td>" + e.num + "</td>"),
        i += "<td>" + n + '</td><td><span style="cursor:pointer" onclick="remove_breakpoint(' + e.num + ")\" class='glyphicon glyphicon-remove'></span></td></tr>",
        $("#debug_window_breakpoints tbody").append(i)
}

function gui_breakpoints_post_processing() {
    var e = ide.editor.getBreakpoints();
    for (filename_key in e)
        for (i in e[filename_key].breakpoints)
            filename_key in gui_breakpoints_list && -1 != gui_breakpoints_list[filename_key].indexOf(parseInt(i) + 1) || ide.editor.clearBreakpoint(new Breakpoint(filename_key, parseInt(i) + 1))
}

function handle_gui_frames(e) {
    gui_call_stack_clear();
    for (var t = 0; t < e.length; t++)
        gui_call_stack_add_frame(e[t]);
    gui_call_stack_post_processing(e.length)
}

function handle_gui_variables(e) {
    if (e.json)
        $("#debug_window_local_variables").html("<div id='local_info'></div>"),
        $("#local_info").jsonView(e.variables);
    else {
        $("#debug_window_local_variables tbody").html("");
        for (var t = 0; t < e.length; t++) {
            var n = e[t];
            $("#debug_window_local_variables tbody").append("<tr><td>" + n.name + "</td><td>" + encodeHtmlEntity(n.val) + "</td></tr>")
        }
    }
}

function handle_gui_registers(e) {
    $("#debug_window_registers tbody").html("");
    for (var t = 0; t < e.length; t++) {
        var n = e[t];
        $("#debug_window_registers tbody").append("<tr><td>" + n.name + "</td><td>" + encodeHtmlEntity(n.val) + "</td></tr>")
    }
}

function handle_gui_breakpoints(e) {
    gui_breakpoints_clear(),
        gui_breakpoints_list_clear();
    for (var t = 0; t < e.length; t++)
        gui_breakpoints_add(e[t]);
    gui_breakpoints_post_processing()
}

function handle_gui_watch_expr(e) {
    ide.set_watch_expr(e.expr, e.value)
}

function handle_gui_info(e) {
    e.frames && handle_gui_frames(e.frames),
        e.variables && handle_gui_variables(e.variables),
        e.breakpoints && handle_gui_breakpoints(e.breakpoints),
        e.watch_expr && handle_gui_watch_expr(e.watch_expr),
        e.program_state && ide.set_gui_state(e.program_state),
        e.registers && handle_gui_registers(e.registers)
}
var socket_on_gui_info = function(e) {
    handle_gui_info(e),
        $(window).trigger("resize"),
        term && term.focus()
};

function remove_breakpoint(e) {
    var t = e;
    ide.debugger == DEBUGGER_JAVA && (t = get_java_bp_desc(e)),
        ide.remove_breakpoint(e) && ide.run_gui_cmd({
            cmd: "remove_bp",
            args: t
        })
}

function get_java_bp_desc(e) {
    var t = "#debug_window_breakpoints tbody tr[data-bp-num='" + e + "']";
    return $(t).length ? $(t + " td ").text() : null
}

function bp_change(e, t) {
    e ? ide.run_gui_cmd({
        cmd: "enable ",
        args: t
    }) : ide.run_gui_cmd({
        cmd: "disable ",
        args: t
    })
}
ide.remove_breakpoint = function(e) {
        var t = "#debug_window_breakpoints tbody tr[data-bp-num='" + e + "']";
        return !!$(t).length && ($(t).remove(),
            !0)
    },
    ide.set_frame = function(e) {
        ide.run_gui_cmd({
                cmd: "frame ",
                args: e
            }),
            $("#debug_window_call_stack tbody tr[data-frame-num='" + e + "']").addClass("active"),
            ide.active_frame = e
    },
    ide.set_watch_expr = function(e, t) {
        if ("" == (e = e.trim()))
            return !1;
        var n = quoteattr(e),
            o = escape(e),
            i = "#debug_window_display_expression tr[data-expr='" + o + "']";
        return $(i).length ? ($(i).html("<td>" + n + "</td><td>" + quoteattr(t) + '</td><td><span style="cursor:pointer" onclick="remove_watch(\'' + o + "')\" class='glyphicon glyphicon-remove'></span></td>"),
            !1) : ($("#debug_window_display_expression tbody").append('<tr data-expr="' + n + '"><td>' + e + "</td><td>" + quoteattr(t) + '</td><td><span style="cursor:pointer" onclick="remove_watch(\'' + o + "')\" class='glyphicon glyphicon-remove'></span></td></tr>"),
            !0)
    },
    ide.remove_watch_expr = function(e) {
        var t = "#debug_window_display_expression tr[data-expr='" + e + "']";
        return !!$(t).length && ($(t).remove(),
            !0)
    };
var socket_on_disconnect = function() {
        ide.server_connected = !1,
            (ide.running && "FINISHED" != ide.running_state || ide.debugging) && $("#serverDisconnectedModal").modal("show"),
            ide.running && close_run_console(),
            ide.debugging && (ide.closegdb(),
                close_debug_console())
    },
    socket_on_gdbsessionlimit = function() {
        ide.unfadeConsole(),
            alert("Maximum session limit reached. Please try after a while.")
    },
    socket_on_emptysource = function() {
        ide.unfadeConsole(),
            alert("Source code is empty")
    },
    socket_on_filelimitexceed = function(e) {
        ide.unfadeConsole(),
            "src" == e.file && alert("Source file can't be larger than " + e.limit),
            "stdin" == e.file && alert("Stdin file can't be larger than " + e.limit)
    },
    socket_on_maxdebugsession = function(e) {
        ide.closegdb(),
            close_debug_console(),
            alert(e)
    },
    gui_cmd_id = 0;
ide.run_gui_cmd = function(e, t, n) {
    var o = !1;
    t && (o = !0),
        socket.emit("run_gui_cmd", {
            cmd: e.cmd,
            args: e.args,
            console_cmd: o,
            id: gui_cmd_id++
        }),
        term && term.focus()
};
var socket_on_gui_cmd_reply = function(e) {};

function add_watch_expr(e) {
    if (13 == event.keyCode) {
        var t = e.value.trim();
        ide.set_watch_expr(t, "") && socket.emit("add_watch_expr", t),
            $(e).val("")
    }
}

function remove_watch(e) {
    ide.remove_watch_expr(e) && socket.emit("remove_watch_expr", e)
}

function term_is_enabled(e) {
    return "RUNNING_GUI_CMD" != $("#ogdb_status").text()
}

function parse_console_output(e, t) {
    if (!t)
        return t;
    if (t.indexOf("") >= 0)
        for (var n = t.split("").length - 1; n;) {
            new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/DmAMATrGx7nng5p5iimPNZsfQLYB2sDLIkzRKZOHGAaUyDcpFBSLG9MCQALgAIgQs2YunOszLSAyQYPVC2YdGGeHD2dTdJk1pAHGAWDjnkcLKFymS3RQZTInzySoBwMG0QueC3gMsCEYxUqlrcxK6k1LQQcsmyYeQPdC2YfuGPASCBkcVMQQqpVJshui1tkXQJQV0OXGAZMXSOEEBRirXbVRQW7ugq7IM7rPWSZyDlM3IuNEkxzCOJ0ny2ThNkyRai1b6ev//3dzNGzNb//4uAvHT5sURcZCFcuKLhOFs8mLAAEAt4UWAAIABAAAAAB4qbHo0tIjVkUU//uQZAwABfSFz3ZqQAAAAAngwAAAE1HjMp2qAAAAACZDgAAAD5UkTE1UgZEUExqYynN1qZvqIOREEFmBcJQkwdxiFtw0qEOkGYfRDifBui9MQg4QAHAqWtAWHoCxu1Yf4VfWLPIM2mHDFsbQEVGwyqQoQcwnfHeIkNt9YnkiaS1oizycqJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=").play(),
                n--
        }
    return t.indexOf("...Program finished with exit code") < 0 && (e.content += t),
        t.indexOf("Error: Could not find or load main class Main") > -1 && display_dialog("Main.java file must have public class with name 'Main'", "You must declared Main class which contains 'main' method, which is entry point       of program execution."),
        (t.indexOf("Java HotSpot(TM) 64-Bit Server VM warning:") > -1 || t.indexOf("Can't detect initial thread stack location - find_vma failed") > -1) && (t = ""),
        t
}

function checklinenumber(e) {
    return null
}

function socketAddon(e) {
    var t = e,
        n = this,
        o = function(t) {
            n.terminal.tty_chunk_to_process++,
                n.terminal.tty_bytes_to_process += t.length,
                t = parse_console_output(n.terminal, t),
                n.terminal.tty_chunk_to_process > 50 || n.terminal.tty_bytes_to_process > 10240 ? (n.terminal.write(t, function() {
                        e.emit("tty_sync_ack")
                    }),
                    n.terminal.tty_chunk_to_process = 0,
                    n.terminal.tty_bytes_to_process = 0) : n.terminal.write(t)
        };
    return this.activate = function(e) {
            this.terminal = e,
                e.content = "",
                e.tty_chunk_to_process = 0,
                e.tty_bytes_to_process = 0,
                e.tty_ack_sent_cnt = 0,
                e.get_content = function() {
                    return term.content
                },
                console.log("activated socket addon"),
                t.on("message", o),
                t.on("error", function() {
                    this.dispose()
                }),
                t.on("close", function() {
                    this.dispose()
                }),
                e.onData(function(e) {
                    t.send(e)
                })
        },
        this.dispose = function() {
            t.removeEventListener("message", o),
                console.log("disposed socketAddon")
        },
        this
}

function createTerminal(e) {
    for (; e.children.length;)
        e.removeChild(e.children[0]);
    (term = new Terminal({
        cursorBlink: !0
    })).editor = editor;
    var t = new socketAddon(socket);
    term.attachAddon = t,
        socket.on("message", function(e) {});
    var n = new FitAddon.FitAddon;
    term.loadAddon(n),
        term.attachCustomKeyEventHandler(term_is_enabled),
        term.open(e),
        term.fitAddon = n,
        n.fit(),
        runRealTerminal()
}

function runRealTerminal() {
    term.focus(),
        term.attachAddon.activate(term),
        term._initialized = !0
}

function runFakeTerminal() {
    if (!term._initialized) {
        term._initialized = !0;
        term.prompt = function() {
                term.write("\r\n$ ")
            },
            term.writeln("Welcome to xterm.js"),
            term.writeln("This is a local terminal emulation, without a real terminal in the back-end."),
            term.writeln("Type some keys and commands to play around."),
            term.writeln(""),
            term.prompt(),
            term.on("key", function(e, t) {
                var n = !(t.altKey || t.altGraphKey || t.ctrlKey || t.metaKey);
                13 == t.keyCode ? term.prompt() : 8 == t.keyCode ? term.x > 2 && term.write("\b \b") : n && term.write(e)
            }),
            term.on("paste", function(e, t) {
                term.write(e)
            })
    }
}

function savefile(e, t) {
    if (e instanceof Array) {
        for (var n = 0; n < e.length; n++)
            if (e[n].content.length > 102400)
                return alert("'" + e[n].name + "' file can't be larger than 100 KB"),
                    !1
    } else if (e.trim(),
        e.length > 204800)
        return alert("Source file can't be larger than 200 KB"),
            !1;
    return !(t && t.length > 102400) || (alert("stdin file can't be larger than 100 KB"),
        !1)
}
ide.setBreakpoint = function(e, t) {
        if (term) {
            var n;
            if (ide.debugger == DEBUGGER_JAVA)
                n = e.filename.substring(0, e.filename.lastIndexOf(".")) + ":" + e.line;
            else
                n = e.filename + ":" + e.line;
            ide.run_gui_cmd({
                cmd: "set_bp",
                args: n
            })
        }
    },
    ide.clearBreakpoint = function(e, t) {
        if (term) {
            var n = [];
            if ($("#debug_window_breakpoints tbody tr").each(function() {
                    var t = $(this).attr("data-file"),
                        o = $(this).attr("data-line"),
                        i = $(this).attr("data-bp-num");
                    is_user_src_file(t) && "" + o == "" + e.line && n.push(i)
                }),
                n.length)
                if (ide.debugger == DEBUGGER_JAVA)
                    for (i in n) {
                        var o = get_java_bp_desc(n[i]);
                        ide.run_gui_cmd({
                            cmd: "remove_bp",
                            args: o
                        })
                    }
            else {
                o = n.join(" ");
                ide.run_gui_cmd({
                    cmd: "remove_bp",
                    args: o
                })
            }
        }
    };
var on_file_uploaded = function() {
    var e = this.files;
    0 != e.length && new Promise(function(t) {
        var n = new FileReader;
        n.readAsText(e[0]),
            n.onload = function() {
                t({
                    name: e[0].name,
                    content: n.result
                })
            }
    }).then(function(e) {
        var t = ide.editor.get_files();
        1 == t.length && "source code" == t[0].name ? ide.editor.setValue(e.content) : (ide.editor.set_files([e]),
                ide.gotoLine(e.name, 1)),
            ide.editor.focus()
    })
};

function downloadCode() {
    var e = ide.editor.getFile();
    $.download("/download", [{
        key: "file",
        data: JSON.stringify(e)
    }])
}

function beautifyCode() {
    var e = {
            src: ide.editor.getValue()
        },
        t = ide.editor.getCursorPosition();
    disable_btn("control-btn-", ["beautify"]),
        ide.editor.setReadOnly(!0),
        $.ajax({
            type: "POST",
            data: JSON.stringify(e),
            contentType: "application/json",
            url: "/beautify",
            success: function(e) {
                "OK" == e.result ? ide.editor.setValue(e.src) : alert("Opps! Couldn't beautify code. Please try again."),
                    ide.editor.gotoLine(t.row + 1, t.column, !1),
                    ide.editor.focus(),
                    ide.editor.setReadOnly(!1),
                    enable_btn("control-btn-", ["beautify"])
            },
            error: function() {
                ide.editor.setReadOnly(!1),
                    enable_btn("control-btn-", ["beautify"])
            }
        })
}

function collaborate() {
    socket.emit("gui_event", "collaborate")
}

function testAssignment() {}

function render_grading_box(e) {
    var t = $("#grade_sub_id").val(),
        n = $("#ass_id").val();
    render_GradeInputBox(t, function() {
        window.location.href = "/t/as/" + n + "/sub/evaluate"
    })
}

function markAssignmentSubmissionGrade(e) {
    display_dialog("Mark Grade", "<input type='hidden' id='grade_sub_id' value='" + e + "'/>                <div id='grade_input_box_wrapper'></div>", {
        on_load: render_grading_box,
        ok_btn: !1
    })
}

function markDoneAssignment(e) {
    var t = $("#ass_id").val();
    $.ajax({
        type: "POST",
        data: JSON.stringify({
            status: "C"
        }),
        contentType: "application/json",
        url: "/sub/status/" + e,
        error: function(e) {
            display_dialog("Error while marking submission. Please try again.")
        },
        success: function(e) {
            console.log(e),
                "OK" != e.result ? (display_dialog("Error while submission. Please try again."),
                    ide.unfadeConsole()) : window.location.href = "/t/as/" + t + "/sub/evaluate"
        }
    })
}

function getUrlVars() {
    for (var e, t = [], n = window.location.href.slice(window.location.href.indexOf("?") + 1).split("&"), o = 0; o < n.length; o++)
        e = n[o].split("="),
        t.push(e[0]),
        t[e[0]] = e[1];
    return t
}

function submitAssignment() {
    var e = getSnippet();
    e.sub_id = null;
    var t = $("#ass_id").val();
    getUrlVars().preview;
    window.location !== window.parent.location ? (isStudentSubmission && track_event("submission", "run"),
        ide.fadeConsole("Submitting Assignment..."),
        $.ajax({
            type: "POST",
            data: JSON.stringify(e),
            contentType: "application/json",
            url: "/s/as/submit/" + t,
            error: function(e) {
                ide.unfadeConsole(),
                    display_dialog("Error while submission. Please try again.")
            },
            success: function(e) {
                console.log(e),
                    "ERROR" == e.result ? (display_dialog("Submssion failed because of following reason", e.error_message),
                        ide.unfadeConsole()) : "OK" != e.result ? (display_dialog("Error while submission. Please try again."),
                        ide.unfadeConsole()) : window.location !== window.parent.location ? window.parent.postMessage(JSON.stringify({
                        action: "refreshwindow"
                    }), "*") : window.location.href = "/s/as/solve/" + t
            }
        })) : display_dialog("Submission is not allowed in preview mode.")
}

function saveCode(e) {
    var t = !!e && e.new_folder,
        n = e ? e.callback : null,
        o = e ? e.parent_id : null,
        i = "Please login to save snippet to your personal account";
    if (t && (i = "Seems like you have been logged out. Please login again to create folder."),
        !popUpLogin(i, saveCode)) {
        var a = "Save Project",
            r = "Name of Project:",
            s = function() {
                shareCode(!0)
            };
        t && (a = "New Folder",
            r = "Name of new folder:",
            s = function() {
                shareCode(!1, {
                    new_folder: !0,
                    parent_id: o,
                    callback: n
                })
            }
        );
        var d = $("#ass_id").val();
        project_uid || d ? t ? shareCode(!1, {
            new_folder: !0,
            parent_id: o,
            callback: n
        }) : shareCode(!0) : ($("#saveCodeModal").find(".modal-title").text(a),
            $("#saveCodeModal").find(".name_label").text(r),
            $("#saveCodeModal").find(".btn_save").off("click").on("click", s),
            $("#saveCodeModal").modal("show"),
            $("#saveCodeModal").off("shown.bs.modal").on("shown.bs.modal", function() {
                $("#project_name").focus()
            }))
    }
}

function update_navbar_with_projet_title(e) {
    var t = '<li id="navbar_project_title">' + e + '</li><li ><a href="/">Create New Project</a></li>';
    $("#navbar-ide").replaceWith(t),
        $("#navbar_project_title").length && $("#navbar_project_title").text(e)
}

function getSnippet() {
    var e = ide.editor.get_files(),
        t = "",
        n = "S";
    1 == e.length && 0 == e[0].readonly_ranges.length ? t = e[0].content : (t = JSON.stringify(e),
        n = "M");
    var o = $("#stdinput").val(),
        i = $("#lang-select").find(":selected").val(),
        a = $("#cmd_line_args").val(),
        r = $("input[name='input_method']:checked").val();
    return {
        src: t,
        stdin: o,
        lang: i,
        cmd_line_args: a,
        input_method: r = "text" == r ? "T" : "I",
        type: n
    }
}

function share_code_snippet_modal(e, t, n) {
    var o = "https://" + location.hostname + (location.port ? ":" + location.port : ""),
        i = "//" + location.hostname + (location.port ? ":" + location.port : "");
    i += "/embed/js/" + e + "?theme=" + $("#settings-editor-theme").val(),
        o = (o += "/" + e).replace("//www.", "//"),
        i = '<script src="' + (i = i.replace("//www.", "//")) + '"><\/script>';
    var a = '<table style="width:100%"><tr><td style="float:right;padding-right:5px">Share Code:</td><td > <input onClick="this.select();" value="' + o + '" style="width:80%;text-align:center;font-family: monospace; padding:0px 10px" readonly></td></tr>';
    "S" == t && (a += '<tr><td style="float:right;padding-right:5px">Embed Code: </td><td><input onClick="this.select();" value="' + encodeHtmlEntity(i) + '" style="width:80%;text-align:center;font-family: monospace; padding:0px 10px" readonly></td></tr>'),
        a += "</table>",
        n && $("#shareCodeModal .msg").html(n),
        $("#shareCodeModal .modal-body").html(a),
        $("#shareCodeModal").modal("show")
}

function disaplay_upgrade_message(e) {
    display_dialog(e, "<a target='_blank' href='/upgrade'>Click here</a> to upgrade your account to OnlineGDB Plus")
}

function shareCode(e, t) {
    var n, o = !!t && t.new_folder,
        i = !!t && t.move_snippet,
        a = t ? t.callback : null;
    if (o)
        n = {};
    else if (i)
        n = {
            uid: t.uid,
            parent: t.parent_id,
            move_snippet: !0
        };
    else if ((n = getSnippet()).ass_id = $("#ass_id").val(),
        !savefile(n.src, n.stdin))
        return;
    if (e && isStudentSubmission && track_event("submission", "run"),
        e || o) {
        var r = $("#project_name").val();
        n.name = r,
            n.save = !0,
            n.uid = project_uid,
            $("#saveCodeModal").modal("hide"),
            $("#project_title").text(r),
            $("#control-btn-save .btn_text").text("Saving"),
            disable_btn("control-btn-", ["save"])
    }
    o && (n.name = $("#project_name").val(),
            n.new_folder = !0,
            n.parent = t.parent_id),
        $.ajax({
            type: "POST",
            data: JSON.stringify(n),
            contentType: "application/json",
            url: "/share",
            error: function(t) {
                e && (enable_btn("control-btn-", ["save"]),
                    $("#control-btn-save .btn_text").text("Save"),
                    alert("Project couldn't be saved. Make sure you are connected to internet and try again."))
            },
            success: function(t) {
                if (e && (enable_btn("control-btn-", ["save"]),
                        $("#control-btn-save .btn_text").text("Save")),
                    "OK" == t.result) {
                    if (a && a(t),
                        !t.new_folder && !t.move_snippet)
                        return t.save ? (project_uid = t.uid,
                            ide.editor.focus(),
                            update_navbar_with_projet_title($("#project_title").text()),
                            project_saved = !0,
                            disable_btn("control-btn-", ["save"]),
                            $("#control-btn-save .btn_text").text("Saved"),
                            void(window.location !== window.parent.location && window.parent.postMessage(JSON.stringify({
                                action: "saved"
                            }), "*"))) : void share_code_snippet_modal(t.uid, n.type)
                } else {
                    t.message && t.message;
                    "LOGIN_ERROR" == t.result ? (resetLogin(),
                        saveCode()) : "UPGRADE" == t.result ? disaplay_upgrade_message(t.message) : alert(t.message)
                }
            }
        })
}
ide.upload_file = function() {
        $("#upload_file_container").html('<input type="file" name="uploadfile" id="uploadfile">'),
            $("#upload_file_container input").on("change", on_file_uploaded),
            $("#upload_file_container input").click()
    },
    jQuery.download = function(e, t) {
        for (var n = $("<form></form>").attr("action", e).attr("method", "post"), o = 0; o < t.length; o++) {
            var i = $("<input></input>").attr("type", "hidden").attr("name", t[o].key).attr("value", t[o].data);
            n.append(i)
        }
        n.appendTo("body").submit().remove()
    };
var login_callback = null;

function resetLogin() {
    login_callback = null,
        isLoggedIn = !1
}

function popUpLogin(e, t) {
    return !isLoggedIn && (e && $("#loginModal .modal-title").text(e),
        $("#loginModal").modal("show"),
        login_callback = t,
        !0)
}

function getQueryStringValue(e) {
    return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(e).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"))
}

function login(e, t) {
    var n = "/auth/" + e,
        o = window.open(n, "Social Login", "width=800, height=600"),
        i = window.setInterval(function() {
            try {
                if (-1 != o.document.URL.indexOf("callback")) {
                    window.clearInterval(i);
                    o.document.URL;
                    o.close(),
                        $("#loginModal").modal("hide"),
                        isLoggedIn = !0;
                    $("#login_logout_span").html('<a href="/logout">Logout</a>');
                    var e = getQueryStringValue("next").trim();
                    if ("" != e)
                        return void(window.location.href = e);
                    t ? t() : login_callback && login_callback()
                } else
                    -1 != o.document.URL.indexOf("loginfail") && (window.clearInterval(i),
                        o.close())
            } catch (e) {
                console.log("Error"),
                    console.log(e)
            }
        }, 100)
}

function enable_btn(e, t) {
    for (var n = 0; n < t.length; n++)
        $("#" + e + t[n]).removeAttr("disabled")
}

function disable_btn(e, t) {
    for (var n = 0; n < t.length; n++)
        $("#" + e + t[n]).attr("disabled", !0)
}

function focusCommentBox() {
    getUrlVars().preview ? display_dialog("Commenting isn't allowed in preview mode") : (comment_box.refreshMessages(),
        $(".right-sidebar").toggleClass("right-sidebar-active"),
        isStudentSubmission && track_event("submission", "comment"))
}
var perf_bins, regex_for_lang = [];

function get_ext_regex_for_lang(e) {
    return regex_for_lang[e]
}

function get_source_file_names(e, t) {
    for (var n = [], o = 0; o < e.length; o++) {
        var i = e[o],
            a = i.name.substr(i.name.lastIndexOf(".") + 1);
        a != i.name && get_ext_regex_for_lang(t).test(a) && n.push(i.name)
    }
    return n
}

function get_src_filename(e) {
    switch (e.toLowerCase()) {
        case "c_tc":
        case "c":
        case "c99":
            return "main.c";
        case "c++_tc":
        case "c++14":
        case "c++11":
        case "c++17":
        case "c++20":
        case "c++":
            return "main.cpp";
        case "python":
            return "main.py";
        case "java":
            return "Main.java";
        case "c#":
            return "main.cs";
        case "vb":
            return "main.vb";
        case "php":
            return "main.php";
        case "ruby":
            return "main.rb";
        case "perl":
            return "main.pl";
        case "bash":
            return "main.bash";
        case "r":
            return "main.r";
        case "go":
            return "main.go";
        case "rust":
            return "main.rs";
        case "swift":
            return "main.swift";
        case "prolog":
            return "main.pl";
        case "js_rhino":
            return "main.js";
        case "sqlite3":
            return "main.sql";
        case "pascal":
            return "main.pas";
        case "fortran":
            return "main.f95";
        case "haskell":
            return "main.hs";
        case "objc":
            return "main.m";
        case "asm_gcc":
            return "main.S";
        case "html":
            return "index.html"
    }
    return "untitled"
}

function check_files(e, t) {
    return 1 == e.length && "source code" == e[0].name && (e[0].name = get_src_filename(t)),
        e
}

function hide_console_tabs() {
    $("#console-title-bar .tab-stderr").hide(),
        $("#console-title-bar .tab-stdout").hide(),
        $("#console-title-bar .tab-debug").hide()
}

function is_compiled_language(e) {
    switch (e) {
        case "java":
        case "c#":
        case "vb":
        case "c_tc":
        case "c++_tc":
        case "c":
        case "c99":
        case "c++":
        case "c++11":
        case "c++14":
        case "c++17":
        case "c++20":
        case "pascal":
        case "fortran":
        case "haskell":
        case "objc":
        case "go":
        case "rust":
        case "asm_gcc":
            return !0
    }
    return !1
}

function dosbox_conf_content(e) {
    var t = e.cmd_line_args ? e.cmd_line_args : "";
    return "                 [autoexec] \n                cls \n                @echo off \n                mount c . \n                c: \n                PATH=.;C:\\TC\\BIN;%PATH%; \n                cd PRJ \n                cls \n            " + ("TCC " + e.source_files.join(" ") + " C:\\TC\\LIB\\GRAPHICS.LIB \n") + ("main " + t + "\n") + "echo. \n    pause \n    echo #MSGSTART# EXIT #MSGEND# \n    exit"
}

function run_tcc_project(e) {
    var t = e.cmd_line_args ? e.cmd_line_args : "",
        n = e.srcdata,
        o = e.lang,
        i = get_source_file_names(n, o);
    $(".dosbox-container").show(),
        $("#consoleOutputModal").modal("show"),
        Dos(document.getElementById("jsdos"), {
            log: function(e) {
                0
            },
            onprogress: function(e, t, n) {},
            wdosboxUrl: "/public/js/jsdos/6.22.59/wdosbox.js",
            cycles: "max",
            autolock: !0
        }).ready(function(e, o) {
            for (var a = 0; a < n.length; a++)
                e.createFile("C:/PRJ/" + n[a].name, n[a].content);
            e.createFile("dosbox.conf", dosbox_conf_content({
                source_files: i,
                cmd_line_args: t
            }));
            const r = 1,
                s = 2,
                d = 3,
                l = 4;
            var c, u, _ = r;
            e.extract("/public/archive/TC.zip").then(function() {
                o(["-conf", "dosbox.conf"]).then(function(e) {
                    window.ci = e,
                        e.listenStdout(function(t) {
                            switch (_) {
                                case r:
                                    "#" == t && (_ = s,
                                        c = 1);
                                    break;
                                case s:
                                    t == "#MSGSTART#" [c++] ? c == "#MSGSTART#".length && (_ = d,
                                        u = "") : _ = r;
                                    break;
                                case d:
                                    "#" == t ? (_ = l,
                                        footer_match_index = 1) : u += t;
                                    break;
                                case l:
                                    if (t == "#MSGEND#" [footer_match_index++]) {
                                        if (footer_match_index == "#MSGEND#".length && (_ = r,
                                                "EXIT" == u.trim())) {
                                            $("#consoleOutputModal").modal("hide"),
                                                ide.editor.focus(),
                                                $(".dosbox-container").hide(),
                                                document.removeEventListener("keydown", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("blur", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("keyup", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("keypress", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("unload", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("visibilitychange", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("webkitpointerlockchange", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("touchstart", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("pointerlockchange", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("mspointerlockchange", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("mousedown", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("message", e.dos.SDL.receiveEvent),
                                                document.removeEventListener("focus", e.dos.SDL.receiveEvent);
                                            var n = document.getElementById("jsdos");
                                            n.getContext("2d").clearRect(0, 0, n.width, n.height)
                                        }
                                    } else
                                        _ = r
                            }
                        })
                })
            })
        })
}

function debug_perf(e, t) {
    if (opt_debugperf() && (perf_bins || (perf_bins = {}),
            perf_bins[e] || (perf_bins[e] = {}),
            t || (t = "default"),
            perf_bins[e][t] = new Date,
            "end" == t)) {
        var n = perf_bins[e].begin.getTime(),
            o = perf_bins[e].end.getTime() - n;
        perf_bins[e].duration = o
    }
}
regex_for_lang.c_tc = /c/i,
    regex_for_lang["c++_tc"] = /(c)|(cpp)/i;
var was_interactive_run = !1;

function prun(e) {
    var t = e.srcdata,
        n = e.stdinput,
        o = e.lang,
        i = e.cmd_line_args,
        a = e.test_ass_id,
        r = e.graphics,
        s = e.compiler_flags;
    if (check_server_connection(prun, e) && savefile(t, n))
        if (term && close_run_console(),
            t = check_files(t, o),
            "c_tc" != o && "c++_tc" != o) {
            if (debug_perf("run_request", "begin"),
                debug_perf("compile_request", "begin"),
                ide.compile_stdout = "",
                ide.compile_stderr = "",
                hide_console_tabs(),
                disable_btn("control-btn-", ["run", "run_x", "debug", "stop", "beautify", "newfile"]),
                "html" == o)
                ide.output.hide(),
                $("#stdin-wrapper").hide(),
                $("#tab-stdin").show(),
                $('.nav-tabs a[href="#tab-stdin"]').tab("show"),
                ide.fadeMessage("Loading html project..."),
                ide.fadeConsole();
            else {
                var d = $("input[name='input_method']:checked").val();
                a && (d = "text"),
                    is_compiled_language(o) && ide.fadeConsole(),
                    ide.output.hide(),
                    ide.running = !0,
                    ide.input_method = d,
                    ide.running_state = "STARTED",
                    ide.graphics = r,
                    $("#stdin-wrapper").show(),
                    unhide_bottom_pane_if_hidden(),
                    was_interactive_run = !1,
                    ide.fadeMessage("Compiling Program..."),
                    "interactive" == d && (was_interactive_run = !0,
                        $("#bottom-component .btn_copy").show(),
                        enable_btn("control-btn-", ["stop"]),
                        $("#tab-stdin").show(),
                        $("#stdin-wrapper").hide(),
                        ide.editor.setReadOnly(!0),
                        $('.nav-tabs a[href="#tab-stdin"]').tab("show"),
                        createTerminal(document.getElementById("interactive-terminal-container")))
            }
            socket.emit("run", {
                src: t,
                stdin: n,
                lang: o,
                cmd_line_args: i,
                input_method: d,
                test_ass_id: a,
                test: !!a,
                graphics: r,
                compiler_flags: s
            })
        } else
            run_tcc_project({
                srcdata: t,
                lang: o,
                cmd_line_args: i
            })
}

function open_run_console() {
    ide.running = !0,
        ide.editor.setReadOnly(!0),
        enable_btn("control-btn-", ["stop"]),
        $("#debug-console .inactive-content").hide(),
        $("#debug-console .active-content").show(),
        "true" == $('.nav-tabs a[href="#tab-debug-console"]').attr("aria-expanded") ? ide.checkAndOpenTerminal() : $('.nav-tabs a[href="#tab-debug-console"]').tab("show")
}

function gui_reset_debug_windows() {
    gui_breakpoints_clear(),
        gui_call_stack_clear(),
        gui_local_variables_reset(),
        gui_display_expr_window_reset(),
        gui_registers_window_reset()
}

function setClipboard(e) {
    var t = document.createElement("textarea");
    t.style = "position: absolute; left: -1000px; top: -1000px",
        t.value = e,
        document.body.appendChild(t),
        t.select(),
        document.execCommand("copy"),
        document.body.removeChild(t)
}

function copy_output() {
    var e = term.get_content();
    setClipboard(e = (e = e.replace(/\r\r\n/g, "\r\n")).replace(/\r\n\r\n$/, "")),
        display_dialog("Output copied to clipboard")
}
var bottom_pane_size = "min";

function toggle_bottom_pane_size() {
    "min" == bottom_pane_size ? ($("#top-component").height("20%"),
            $("#bottom-component").css({
                top: "20%"
            }),
            $("#my-divider1").css({
                top: "20%"
            }),
            $("#bottom-component .btn_minmax").removeClass("glyphicon-resize-full"),
            $("#bottom-component .btn_minmax").addClass("glyphicon-resize-small"),
            $("#bottom-component .btn_minmax").attr("title", "Minimize"),
            bottom_pane_size = "max") : ($("#top-component").height("75%"),
            $("#bottom-component").css({
                top: "75%"
            }),
            $("#my-divider1").css({
                top: "75%"
            }),
            $("#bottom-component .btn_minmax").removeClass("glyphicon-resize-small"),
            $("#bottom-component .btn_minmax").addClass("glyphicon-resize-full"),
            $("#bottom-component .btn_minmax").attr("title", "Maximize"),
            bottom_pane_size = "min"),
        $("#bottom-component .btn_hide").removeClass("glyphicon-chevron-up"),
        $("#bottom-component .btn_hide").addClass("glyphicon-chevron-down"),
        $("#bottom-component .btn_hide").attr("title", "Hide"),
        bottom_pan_hide = "unhide",
        $(window).trigger("resize")
}
var bottom_pan_hide = "unhide";

function toggle_bottom_pane_size_hide() {
    "unhide" == bottom_pan_hide ? ($("#top-component").height("95%"),
            $("#bottom-component").css({
                top: "95%"
            }),
            $("#my-divider1").css({
                top: "95%"
            }),
            $("#bottom-component .btn_hide").removeClass("glyphicon-chevron-down"),
            $("#bottom-component .btn_hide").addClass("glyphicon-chevron-up"),
            $("#bottom-component .btn_hide").attr("title", "Unhide"),
            bottom_pan_hide = "hide") : (bottom_pane_size = "min" == bottom_pane_size ? "max" : "min",
            toggle_bottom_pane_size(),
            $("#bottom-component .btn_hide").removeClass("glyphicon-chevron-up"),
            $("#bottom-component .btn_hide").addClass("glyphicon-chevron-down"),
            $("#bottom-component .btn_hide").attr("title", "Hide"),
            bottom_pan_hide = "unhide"),
        $(window).trigger("resize")
}

function unhide_bottom_pane_if_hidden() {
    "hide" == bottom_pan_hide && toggle_bottom_pane_size_hide()
}

function is_right_right_component_opened() {
    return parseInt($("#right-right-component").css("left")) / parseFloat($("#right-right-component").parent().css("width")) * 100 < 96
}

function show_right_right_component() {
    is_right_right_component_opened() || ($("#right-left-component").width("65%"),
        $("#right-right-component").css({
            left: "65%"
        }),
        $("#my-divider2").css({
            left: "65%"
        }))
}

function open_debug_console() {
    ide.debugging = !0,
        ide.set_gui_state("DEBUG_INIT"),
        $("#tab-stdin").hide(),
        $("#console-title-bar .tab-debug").show(),
        show_right_right_component(),
        $("#debug-bar").show(),
        gui_reset_debug_windows(),
        ide.editor.setReadOnly(!0),
        enable_btn("control-btn-", ["stop"]),
        $("#debug-console .inactive-content").hide(),
        $("#debug-console .active-content").show(),
        "true" == $('.nav-tabs a[href="#tab-debug-console"]').attr("aria-expanded") ? ide.checkAndOpenTerminal() : $('.nav-tabs a[href="#tab-debug-console"]').tab("show")
}
var autoreplay_trial_begin_at, autoreplay_trial_cnt = 0;

function close_run_console() {
    if (term && (term.attachAddon.dispose(),
            term.dispose(),
            term = null),
        live_ide && ide.editor.setReadOnly(!1),
        disable_btn("control-btn-", ["stop"]),
        enable_btn("control-btn-", ["run", "run_x", "debug", "beautify", "newfile"]),
        $("#bottom-component .btn_copy").hide(),
        ide.running = !1,
        ide.running_state = null,
        ide.graphics_window && (ide.graphics_window.close(),
            ide.graphics_window = null,
            ide.graphics = !1),
        $("#interactive-terminal-container").html(""),
        $("#stdin-wrapper").show(),
        opt_autoreplay()) {
        if (0 == autoreplay_trial_cnt && (autoreplay_trial_begin_at = (new Date).getTime()),
            20 == ++autoreplay_trial_cnt)
            return void console.log("total time in ms ", (new Date).getTime() - autoreplay_trial_begin_at);
        $("#control-btn-run").click()
    }
}

function close_debug_console() {
    ide.debugger != DEBUGGER_JAVA && ide.debugger != DEBUGGER_RUBY && term && (term.attachAddon.dispose(),
            term.dispose(),
            term = null),
        $("#debug-bar").hide(),
        $("#right-left-component").width("100%"),
        $("#right-right-component").css({
            left: "100%"
        }),
        $("#my-divider2").css({
            left: "100%"
        }),
        live_ide && ide.editor.setReadOnly(!1),
        disable_btn("control-btn-", ["stop"]),
        enable_btn("control-btn-", ["run", "run_x", "debug", "beautify", "newfile"]),
        ide.debugging = !1,
        ide.debugginginitialized = !1,
        ide.debugger != DEBUGGER_JAVA && ide.debugger != DEBUGGER_RUBY && ($("#debug-console .active-content").hide(),
            $("#debug-console .inactive-content").show())
}

function get_debugger_of_lang(e) {
    switch (e) {
        case "c":
        case "c99":
        case "c++":
        case "c++11":
        case "asm_gcc":
        case "c++14":
        case "c++17":
        case "c++20":
            return DEBUGGER_CC;
        case "python":
            return DEBUGGER_PYTHON;
        case "java":
            return DEBUGGER_JAVA;
        case "ruby":
            return DEBUGGER_RUBY
    }
}

function pdebug(e) {
    var t = e.srcdata,
        n = e.stdinput,
        o = e.lang,
        i = e.cmd_line_args,
        a = e.compiler_flags;
    if ("html" != o) {
        if (check_server_connection(pdebug, e) && savefile(t, n)) {
            ide.running && close_run_console(),
                using_debugger_first_time(),
                hide_console_tabs(),
                ide.compile_stdout = "",
                ide.compile_stderr = "",
                disable_btn("control-btn-", ["run", "debug", "beautify", "newfile"]);
            var r = ide.editor.getBreakpointsList();
            is_compiled_language(o) && (ide.fadeMessage("Compiling Program..."),
                    ide.fadeConsole()),
                unhide_bottom_pane_if_hidden(),
                ide.debugger = get_debugger_of_lang(o),
                socket.emit("debug", {
                    src: t,
                    stdin: n,
                    lang: o,
                    breakpoints: r,
                    cmd_line_args: i,
                    compiler_flags: a
                }),
                open_debug_console()
        }
    } else
        alert("Debug mode isn't supported for HTML,CSS,JS")
}

function pstop() {
    ide.running ? ("FINISHED" != ide.running_state && socket.emit("stoprun", ""),
            close_run_console()) : socket.emit("stopdebug", ""),
        isStudentSubmission && track_event("submission", "stop")
}

function trace_event(e) {
    socket.emit("gui_event", e)
}

function get_socket_id() {
    return console.log("socket_id:", socket.io.engine.id),
        socket.io.engine.id
}

function update_input_method_based_on_lang(e) {
    "c_tc" == e || "c++_tc" == e ? $("#input_method_text").attr("disabled", !0) : $("#input_method_text").removeAttr("disabled", !1)
}

function scrollToAnchor(e) {
    var t = $("a[name='" + e + "']");
    $("html,body").animate({
        scrollTop: t.offset().top
    }, "slow")
}
$(function() {
        $("#feedback-tab").click(function() {
                $("#feedback-form").toggle("slide")
            }),
            $("#feedback-form form").on("submit", function(e) {
                var t = $(this);
                $.ajax({
                        type: t.attr("method"),
                        url: t.attr("action"),
                        data: t.serialize(),
                        success: function() {
                            $("#feedback-form").toggle("slide").find("textarea").val("")
                        }
                    }),
                    e.preventDefault()
            })
    }),
    ide.save = function(e) {
        if (!project_uid)
            try {
                window.sessionStorage.setItem("src_code", e)
            } catch (e) {}
    },
    ide.saveParam = function(e, t, n) {
        try {
            n ? window.sessionStorage.setItem(e, t) : window.localStorage.setItem(e, t)
        } catch (e) {}
    },
    ide.getParam = function(e) {
        return window.localStorage.getItem(e)
    },
    ide.autosave = function() {
        ide.save(JSON.stringify(ide.editor.get_files()))
    },
    ide.getCurrentLang = function() {
        return $("#lang-select").find(":selected").val()
    },
    ide.closesettings = function() {
        $("#popup-settings").hide(),
            ide.editor.focus()
    },
    ide.get_compiler_flags = function() {
        return $("#compiler_flags").val()
    },
    ide.runcode = function(e) {
        var t = e ? e.callback : null,
            n = e ? e.result_callback : null,
            o = e ? e.test_ass_id : null,
            i = e ? !!e.graphics : null,
            a = e ? e.graphics : null;
        if (ide.graphics_window = a,
            !$("#control-btn-run").attr("disabled") && ($('[data-toggle="tooltip"]').tooltip("hide"),
                socket.emit("gui_event", "runcode"),
                isStudentSubmission && (o ? track_event("submission", "test") : track_event("submission", "run")),
                ide.on_compiler_error = t,
                ide.result_callback = n,
                guide_language_selection(ide.runcode, e))) {
            var r = {};
            r.srcdata = ide.editor.get_files(),
                r.stdinput = $("#stdinput").val(),
                r.lang = $("#lang-select").find(":selected").val(),
                r.cmd_line_args = $("#cmd_line_args").val(),
                r.test_ass_id = o,
                r.graphics = i,
                r.compiler_flags = ide.get_compiler_flags(),
                prun(r)
        }
    },
    ide.debugcode = function() {
        if (!$("#control-btn-debug").attr("disabled") && ($('[data-toggle="tooltip"]').tooltip("hide"),
                socket.emit("gui_event", "debugcode"),
                isStudentSubmission && track_event("submission", "debug"),
                guide_language_selection(ide.debugcode))) {
            if ($("#noDebugPythonModal .lang").text($("#lang-select").val()),
                "php" == $("#lang-select").val() || "ruby" == $("#lang-select").val() || "perl" == $("#lang-select").val() || "pascal" == $("#lang-select").val() || "fortran" == $("#lang-select").val() || "haskell" == $("#lang-select").val() || "objc" == $("#lang-select").val() || "sqlite3" == $("#lang-select").val() || "js_rhino" == $("#lang-select").val() || "prolog" == $("#lang-select").val() || "swift" == $("#lang-select").val() || "go" == $("#lang-select").val() || "rust" == $("#lang-select").val() || "bash" == $("#lang-select").val() || "r" == $("#lang-select").val() || "c#" == $("#lang-select").val() || "vb" == $("#lang-select").val() || "c_tc" == $("#lang-select").val() || "c++_tc" == $("#lang-select").val())
                return void $("#noDebugPythonModal").modal("show");
            var e = {};
            e.srcdata = ide.editor.get_files(),
                e.stdinput = $("#stdinput").val(),
                e.lang = $("#lang-select").find(":selected").val(),
                e.cmd_line_args = $("#cmd_line_args").val(),
                e.compiler_flags = ide.get_compiler_flags(),
                pdebug(e)
        }
    },
    ide.setEditorTheme = function(e) {
        "dark" == e ? (ide.editor.setTheme("ace/theme/idle_fingers"),
            ide.saveParam("editor-theme", "dark")) : "light" == e && (ide.editor.setTheme("ace/theme/chrome"),
            ide.saveParam("editor-theme", "light"))
    },
    ide.setEditorMode = function(e) {
        ide.editor.setKeyboardHandler("ace/keyboard/" + e),
            ide.saveParam("editor-mode", e)
    },
    ide.setEditorFontSize = function(e) {
        ide.editor.setFontSize(e),
            ide.saveParam("editor-font-size", e)
    },
    ide.setEditorTabSpace = function(e) {
        ide.editor.setTabSize(e),
            ide.saveParam("editor-tab-space", e)
    },
    ide.setEditorAutocomplete = function(e) {
        var t = !!e;
        ide.editor.setAutocomplete(t),
            ide.saveParam("editor-autocomplete", t)
    },
    ide.setLanguageUI = function(e) {
        $("#lang-select").val(e),
            update_input_method_based_on_lang(e)
    },
    ide.setLanguage = function(e, t) {
        t = t || !0,
            ide.saveParam("code-lang", e, !0),
            ide.editor.set_default_editor_filename(get_src_filename(e)),
            ide.editor.setModeForLang(e),
            editor_updated || fork_snippet || (ide.editor.set_default_editor_content(get_default_src_content(e)),
                editor_updated = !1),
            t && ide.autosave()
    },
    ide.setInputMethod = function(e) {
        ide.saveParam("input-method", e, !0)
    },
    ide.setCompilerFlags = function(e) {
        ide.saveParam("compiler-flags", e, !0)
    },
    ide.checkAndOpenTerminal = function() {
        ide.debugging && !ide.debugginginitialized && (ide.debugginginitialized = !0,
            createTerminal(document.getElementById("terminal-container")))
    };
var tour, editor_updated = !1,
    lang_selection_callback = null,
    lang_selection_callback_arg = null;

function guide_language_selection(e, t) {
    return "" != $("#lang-select").find(":selected").val() || (lang_selection_callback = e,
        lang_selection_callback_arg = t,
        (tour = new Tour({
            steps: [{
                element: "#lang-select",
                title: "Choose Language",
                content: ""
            }],
            backdrop: !0,
            backdropContainer: "#editor-container",
            template: "<div class='popover tour'>        <div class='arrow'></div>        <h4 class='popover-title'></h4>        <center><button class='btn btn-primary' data-role='end' style=\"padding:1px 6px\">OK</button></center>      </div>"
        })).init(),
        tour.start(!0),
        !1)
}

function get_rel_url(e) {
    var t = "https://" + location.hostname + (location.port ? ":" + location.port : "");
    return t = (t += e).replace("//www.", "//")
}

function createCookie(e, t, n) {
    var o;
    n || (n = 1e8);
    var i = new Date;
    i.setTime(i.getTime() + 24 * n * 60 * 60 * 1e3),
        o = "; expires=" + i.toGMTString(),
        document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + o + "; path=/"
}

function readCookie(e) {
    for (var t = encodeURIComponent(e) + "=", n = document.cookie.split(";"), o = 0; o < n.length; o++) {
        for (var i = n[o];
            " " === i.charAt(0);)
            i = i.substring(1, i.length);
        if (0 === i.indexOf(t))
            return decodeURIComponent(i.substring(t.length, i.length))
    }
    return null
}

function eraseCookie(e) {
    createCookie(e, "", -1)
}

function using_debugger_first_time() {
    isTinyide || readCookie("c_shown_dbg_msg") || (display_dialog("Using debugger for the first time?", 'If you are new to debugging a program, then it will be helpful to get to know the usage of debugger. You can     go through <a target="_blank" href="http://www.onlinegdb.com/blog/brief-guide-on-how-to-use-onlinegdb-debugger/">    this guide</a> on     <a target="_blank" href="http://www.onlinegdb.com/blog/brief-guide-on-how-to-use-onlinegdb-debugger/">    how to use debugger </a>.'),
        createCookie("c_shown_dbg_msg", "true"),
        isLoggedIn && save_user_data("c_shown_dbg_msg", "true"))
}

function save_user_data(e, t) {}

function display_dialog(e, t, n) {
    t || (t = ""),
        $("#genericModal .modal-title").text(e),
        $("#genericModal .modal-body").html(t);
    var o = $("#genericModal .modal-body"),
        i = n ? n.on_ok : null,
        a = n ? n.on_load : null,
        r = !n || !n.static || "static",
        s = !n || void 0 === n.close_btn || n.close_btn,
        d = !n || void 0 === n.ok_btn || n.ok_btn;
    s ? $("#genericModal .modal-btn-close").show() : $("#genericModal .modal-btn-close").hide(),
        d ? $("#genericModal .ok-btn").show() : $("#genericModal .ok-btn").hide(),
        a && a(o),
        i && $("#genericModal .ok-btn").off("click").on("click", function() {
            i(o)
        }),
        $("#genericModal").modal({
            show: !0,
            backdrop: r,
            keyboard: !r
        })
}

function display_guide_to_stop_program() {
    display_dialog("stop program to edit source code", "You can't edit source code when programming is running.<br>        You can stop program by pressing 'Stop' button in top bar.")
}

function load_editor_settings(e) {
    var t = null,
        n = null,
        o = null,
        i = null,
        a = null,
        r = null,
        s = null,
        d = null;
    try {
        t = window.localStorage.getItem("editor-font-size"),
            n = window.localStorage.getItem("editor-tab-space"),
            o = window.localStorage.getItem("editor-mode"),
            i = window.localStorage.getItem("editor-theme"),
            a = window.sessionStorage.getItem("code-lang"),
            r = window.sessionStorage.getItem("input-method"),
            s = window.sessionStorage.getItem("compiler-flags"),
            d = window.localStorage.getItem("editor-autocomplete")
    } catch (e) {}
    if (null !== d) {
        var l = "true" == d;
        ide.setEditorAutocomplete(l);
        var c = l,
            u = !l;
        $("#settings-editor-autocomplete-on").prop("checked", c),
            $("#settings-editor-autocomplete-off").prop("checked", u)
    }
    if (t && (ide.setEditorFontSize(t),
            $("#settings-editor-font-size").val(t)),
        n && (ide.setEditorTabSpace(n),
            $("#settings-editor-tab-space").val(n)),
        o && (ide.setEditorMode(o),
            $("#settings-editor-mode").val(o)),
        i && (ide.setEditorTheme(i),
            $("#settings-editor-theme").val(i)),
        s && $("#compiler_flags").val(s),
        e)
        ide.setLanguageUI($("#fork-snippet").attr("lang"));
    else {
        a && (ide.setLanguage(a, !1),
                ide.setLanguageUI(a)),
            r && (input_method_handler(r),
                "interactive" == r ? ($("#input_method_interactive").prop("checked", !0),
                    $("#input_method_text").prop("checked", !1)) : "text" == r && ($("#input_method_interactive").prop("checked", !1),
                    $("#input_method_text").prop("checked", !0)));
        var _ = null;
        try {
            _ = window.sessionStorage.getItem("src_code")
        } catch (e) {}
        if (_)
            try {
                ide.editor.set_files(JSON.parse(_))
            } catch (e) {
                report_error(e)
            }
    }

    function m() {
        return ide.debugging || ide.running && "text" != ide.input_method && "FINISHED" != ide.running_state
    }

    function g() {
        var e;
        editor_updated || (e = $("#lang-select").find(":selected").val(),
                editor_updated = !(ide.editor.getFile().content == get_default_src_content(e))),
            project_saved = !1,
            enable_btn("control-btn-", ["save"]),
            $("#control-btn-save .btn_text").text("Save")
    }

    function p(e) {
        e.container.addEventListener("keydown", function(e) {
                m() && function(e) {
                    switch (e.keyCode) {
                        case 9:
                        case 8:
                        case 46:
                            return !0
                    }
                    return !1
                }(e) && display_guide_to_stop_program()
            }, !0),
            e.container.addEventListener("keypress", function(e) {
                var t;
                m() && (void 0 === (t = e).which || "number" == typeof t.which && t.which > 0 && !t.ctrlKey && !t.metaKey && !t.altKey && 8 != t.which) && display_guide_to_stop_program()
            }, !0),
            e.commands.addCommand({
                name: "newfile",
                bindKey: {
                    win: "Ctrl-M",
                    mac: "Command-Option-M"
                },
                exec: function(e) {
                    trace_event("Key-Ctrl+M"),
                        $("#control-btn-newfile").click()
                }
            }),
            e.commands.addCommand({
                name: "save",
                bindKey: {
                    win: "Ctrl-S",
                    mac: "Command-Option-S"
                },
                exec: function(e) {
                    trace_event("Key-Ctrl+S"),
                        $("#control-btn-save").click()
                }
            }),
            e.commands.addCommand({
                name: "beautify",
                bindKey: {
                    win: "Ctrl-B",
                    mac: "Command-Option-B"
                },
                exec: function(e) {
                    trace_event("Key-Ctrl+B"),
                        $("#control-btn-beautify").click()
                }
            }),
            e.commands.addCommand({
                name: "info",
                bindKey: {
                    win: "Ctrl-i",
                    mac: "Command-Option-i"
                },
                exec: function(e) {
                    ide.showinfo()
                }
            }),
            e.commands.addCommand({
                name: "settings",
                bindKey: {
                    win: "Ctrl-Shift-s",
                    mac: "Command-Option-Shift-S"
                },
                exec: function(e) {
                    ide.showsettings()
                }
            }),
            e.commands.addCommand({
                name: "runcode",
                bindKey: {
                    win: "f9",
                    mac: "f9"
                },
                exec: function(e) {
                    trace_event("Key-F9"),
                        $("#control-btn-run").click()
                }
            }),
            e.commands.addCommand({
                name: "debugcode",
                bindKey: {
                    win: "f8",
                    mac: "f8"
                },
                exec: function(e) {
                    trace_event("Key-F8"),
                        $("#control-btn-debug").click()
                }
            })
    }
    $("#project_name").keypress(function(e) {
            if (13 == e.which)
                return e.preventDefault(),
                    shareCode(!0),
                    !1
        }),
        ide.editor.addEventListener("change", function(e) {
            g(),
                e && e.detail && "new_file" == e.detail.change && p(e.detail.editor)
        }),
        ide.editor.forEachEditor(function(e) {
            e.on("change", function(e) {
                    g()
                }),
                p(e)
        });
    var f = 0;
    setInterval(function() {
        (f += 1) > 14 && (ide.debugging && (socket.emit("stopdebug"),
                $("#myModal").modal("show")),
            ide.running && "STARTED" == ide.running_state && (socket.emit("stoprun"),
                $("#myModalRun").modal("show")),
            disconnect_socket(),
            f = 0)
    }, 6e4);
    $(this).mousemove(function(e) {
            f = 0
        }),
        $(this).keypress(function(e) {
            f = 0
        })
}

function get_default_src_content(e) {
    var t = "",
        n = "\nWelcome to GDB Online.\nGDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,\nC#, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.\nCode, Compile, Run and Debug online from anywhere in world.\n\n",
        o = "";
    switch (e) {
        case "html":
            o = "\x3c!-- \n" + n + "--\x3e\n\n",
                t = "<html>\n<body>\n<h1>Hello World</h1>\n</body>\n</html>";
            break;
        case "python":
            t = "print ('Hello World')",
                o = "'''\n" + n + "'''\n";
            break;
        case "php":
            t = "<?php\n" + (o = "/******************************************************************************\n" + n + "*******************************************************************************/\n") + '\necho "Hello World";\n',
                o = "";
            break;
        case "ruby":
            o = "=begin\n" + n + "=end\n",
                t = 'puts "Hello World"';
            break;
        case "perl":
            o = "=begin\n" + n + "=end\n=cut\n",
                t = 'print "Hello World";';
            break;
        case "bash":
            o = n.replace(/^/gm, "# ") + "\n",
                t = 'echo "Hello World";';
            break;
        case "r":
            o = n.replace(/^/gm, "# ") + "\n",
                t = 'print("Hello World")';
            break;
        case "go":
            o = "/******************************************************************************" + n + "*******************************************************************************/\n",
                t = 'package main\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello World")\n}';
            break;
        case "rust":
            o = "/******************************************************************************" + n + "*******************************************************************************/\n",
                t = 'fn main() {\n    println!("Hello World");\n}';
            break;
        case "swift":
            o = "/**\n" + n + "*/\n",
                t = 'print("Hello World")';
            break;
        case "sqlite3":
            o = "/******************************************************************************" + n + "*******************************************************************************/\n",
                t = "/* Enter your sql queries here */";
            break;
        case "js_rhino":
            o = "/******************************************************************************" + n + "*******************************************************************************/\n",
                t = "print('Hello World');";
            break;
        case "prolog":
            o = "/******************************************************************************" + n + "*******************************************************************************/\n",
                t = "main:-\n        process,\n        halt.\n\nprocess:-\n        write('Hello World').\n:- main.";
            break;
        case "pascal":
            o = "{\n" + n + "}\n",
                t = "program Hello;\nbegin\n  writeln ('Hello World')\nend.\n";
            break;
        case "fortran":
            o = n.replace(/^/gm, "! ") + "\n",
                t = 'Program Hello\nPrint *, "Hello World"\nEnd Program Hello';
            break;
        case "haskell":
            o = "{-|\n" + n + "-}\n",
                t = 'main = putStrLn "Hello World"';
            break;
        case "objc":
            o = "/******************************************************************************" + n + "*******************************************************************************/\n",
                t = '#import <Foundation/Foundation.h>\n\nint main (int argc, const char * argv[])\n{\n        NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];\n        NSLog (@"Hello World");\n        [pool drain];\n        return 0;\n}';
            break;
        case "asm_gcc":
            o = n.replace(/^/gm, "# ") + "\n",
                t = ".data\n.text\n.global main\nmain:\n\t# your code goes here\n\txor\t%eax, %eax\n\tret";
            break;
        case "java":
            t = 'public class Main\n{\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n',
                o = "/******************************************************************************\n" + n + "*******************************************************************************/\n";
            break;
        case "c#":
            t = 'using System;\nclass HelloWorld {\n  static void Main() {\n    Console.WriteLine("Hello World");\n  }\n}',
                o = "/******************************************************************************\n" + n + "*******************************************************************************/\n";
            break;
        case "vb":
            t = 'Module VBModule\n    Sub Main()\n        Console.WriteLine("Hello World")\n    End Sub\nEnd Module',
                o = n.replace(/^/gm, "' ") + "\n";
            break;
        case "c++":
        case "c++11":
        case "c++14":
        case "c++17":
        case "c++20":
            o = "/******************************************************************************\n" + n + "*******************************************************************************/\n",
                t = '#include <iostream>\n\nusing namespace std;\n\nint main()\n{\n    cout<<"Hello World";\n\n    return 0;\n}';
            break;
        default:
            o = "/******************************************************************************\n" + n + "*******************************************************************************/\n",
                t = '#include <stdio.h>\n\nint main()\n{\n    printf("Hello World");\n\n    return 0;\n}\n'
    }
    return o + t
}

function forkCode() {
    location.href = "/fork" + location.pathname
}

function input_method_handler(e) {
    ide.setInputMethod(e),
        "interactive" == e ? ($("#stdinput").hide(),
            $("#ad_unit_bottom_wrapper").show()) : "text" == e && ($("#stdinput").show(),
            $("#ad_unit_bottom_wrapper").hide())
}

function tmpeng(e, t) {
    return e.replace(/\{([\w\.]*)\}/g, function(e, n) {
        for (var o = n.split("."), i = t[o.shift()], a = 0, r = o.length; a < r; a++)
            i = i[o[a]];
        return null != i ? i : ""
    })
}

function comment_error_message(e) {
    $("#comment_box .input_error_message").text(e)
}

function append_comment_content(e, t, n) {
    console.log(e);
    var o = tmpeng($("#comment_message_template").html(), {
        content: e,
        user: t,
        timestamp: n
    });
    $("#comment_box .media-list").append(o)
}

function update_comments(e) {
    for (i in $("#comment_box .media-list").html(""),
        e) {
        console.log(e[i]);
        var t = e[i],
            n = new Date(t.ts_submitted).toLocaleString([], {
                hour12: !0
            });
        append_comment_content(t.content, t.user.name, n)
    }
}

function refresh_comments() {
    var e = $("#snippet_id").val(),
        t = $("#ass_id").val();
    if ("" != e) {
        var n = {
            snippet_id: e,
            ass_id: t
        };
        $.ajax({
            type: "POST",
            data: JSON.stringify(n),
            contentType: "application/json",
            url: "/comment/view",
            success: function(e) {
                console.log(e),
                    "OK" == e.result && update_comments(e.data)
            },
            error: function() {}
        })
    }
}

function on_right_sidebar_close() {
    $(".right-sidebar").toggleClass("right-sidebar-active")
}

function on_add_comment() {
    comment_error_message("");
    var e = $("#comment_box .input_content").val().trim();
    if ("" != e) {
        var t = {
            content: e,
            snippet_id: $("#snippet_id").val(),
            ass_id: $("#ass_id").val()
        };
        $.ajax({
            type: "POST",
            data: JSON.stringify(t),
            contentType: "application/json",
            url: "/comment/add",
            success: function(e) {
                "OK" == e.result ? ($("#comment_box .input_content").val(""),
                    refresh_comments()) : comment_error_message(e.error_message)
            },
            error: function() {
                comment_error_message("Unable to add comment due to unkown error. Please try again and contact webmaster if problem persists.")
            }
        })
    } else
        comment_error_message("Please enter message to comment.")
}
bind_socket_handlers();
var live_ide = !0,
    fork_snippet = !1,
    project_saved = !0;
$(document).ready(function() {
        $("#right-sidebar-close").click(on_right_sidebar_close),
            opt_hidesidebar() && fold_left_bar(),
            opt_largeconsole() && toggle_bottom_pane_size()
    }),
    "undefined" != typeof main_ide && ($(document).ready(function() {
            window.addEventListener("beforeunload", function(e) {
                    if (!(project_uid && project_saved || !editor_updated)) {
                        return (e || window.event).returnValue = "o/",
                            "o/"
                    }
                }),
                $('[data-toggle="tooltip"]').tooltip(),
                terminalContainer = document.getElementById("terminal-container"),
                $("#settings-editor-theme").change(function() {
                    ide.setEditorTheme($("#settings-editor-theme").val())
                }),
                $("#settings-editor-mode").change(function() {
                    ide.setEditorMode($("#settings-editor-mode").val())
                }),
                $("#settings-editor-font-size").change(function() {
                    ide.setEditorFontSize($("#settings-editor-font-size").val())
                }),
                $("#settings-editor-tab-space").change(function() {
                    ide.setEditorTabSpace($("#settings-editor-tab-space").val())
                }),
                $("#settings-editor-autocomplete-on").change(function() {
                    ide.setEditorAutocomplete(!0)
                }),
                $("#settings-editor-autocomplete-off").change(function() {
                    ide.setEditorAutocomplete(!1)
                }),
                $("#compiler_flags").change(function() {
                    ide.setCompilerFlags($("#compiler_flags").val())
                }),
                $("#lang-select").change(function() {
                    tour && tour.end();
                    var e = $("#lang-select").val();
                    ide.setLanguage(e),
                        update_input_method_based_on_lang(e),
                        lang_selection_callback && (lang_selection_callback(lang_selection_callback_arg),
                            lang_selection_callback = lang_selection_callback_arg = null)
                }),
                $("#input_method_interactive").change(function() {
                    input_method_handler(this.value)
                }),
                $("#input_method_text").change(function() {
                    input_method_handler(this.value)
                }),
                $('#console-title-bar a[data-toggle="tab"]').on("shown.bs.tab", function(e) {
                    var t = $(e.target).attr("href");
                    ide.checkAndOpenTerminal(),
                        "#tab-stdin" == t ? $("#tab-stdin").show() : $("#tab-stdin").hide()
                }),
                $("#input_watch_expr").on("keydown", function(e) {
                    if (13 == e.keyCode) {
                        var t = $("#input_watch_expr").val().trim();
                        ide.set_watch_expr(t, "") && socket.emit("add_watch_expr", t),
                            $("#input_watch_expr").val("")
                    }
                }),
                live_ide = !($("#code-snippet").length > 0),
                fork_snippet = $("#fork-snippet").length > 0,
                live_ide || (ide.editor.setReadOnly(!0),
                    ide.editor.hideCursor(),
                    ide.editor.setOptions({
                        readOnly: !0,
                        highlightActiveLine: !1,
                        highlightGutterLine: !1
                    }),
                    ide.setLanguageUI($("#code-snippet").attr("lang"))),
                live_ide && load_editor_settings(fork_snippet),
                $("#debug_window_display_expression table").colResizable({
                    liveDrag: !0
                }),
                $("#debug_window_call_stack table").colResizable({
                    liveDrag: !0
                }),
                $("#debug_window_local_variables table").colResizable({
                    liveDrag: !0
                }),
                $("#debug_window_breakpoints table").colResizable({
                    liveDrag: !0
                }),
                $("#top-component").on("splitpaneresize", function() {})
        }),
        $(window).resize(function(e) {
            term && term.fitAddon.fit(),
                ide.editor && ide.editor.resize()
        }));
var confirm_popup = function(e, t) {
    $("#confirmModal .modal-title").html(e),
        $("#confirmModal .modal-body .btn-ok").off("click").on("click", function(e) {
            t(e),
                $("#confirmModal").modal("hide")
        }),
        $("#confirmModal").modal("show")
};

function g_renamefilemodal_get_edit_filename() {
    return $("#edit_file_name").val()
}

function g_renamefilemodal_error_message(e) {
    $("#renameFileModal .error_message").text(invalid_filename)
}

function g_renamefilemodal_hide() {
    $("#renameFileModal").modal("hide")
}

function g_renamefilemodal_popup(e, t, n) {
    var o = e.default_name,
        i = e.title;
    $("#edit_file_name").val(o),
        $("#renameFileModal .modal-title").text(i),
        $("#edit_file_name").off("keypress").keypress(function(e) {
            if (13 == e.which)
                return e.preventDefault(),
                    t && t(e, n),
                    !1
        }),
        $("#renameFileModal .modal-body .btn-ok").off("click").on("click", function(e) {
            t && t(e, n)
        }),
        $("#renameFileModal .error_message").text(""),
        $("#renameFileModal").modal("show"),
        $("#renameFileModal").off("shown.bs.modal").on("shown.bs.modal", function() {
            $("#edit_file_name").focus()
        })
}

function report_error(e) {
    Raven.captureException(e)
}
String.prototype.endsWith || (String.prototype.endsWith = function(e, t) {
    var n = this.toString();
    ("number" != typeof t || !isFinite(t) || Math.floor(t) !== t || t > n.length) && (t = n.length),
    t -= e.length;
    var o = n.lastIndexOf(e, t);
    return -1 !== o && o === t
});