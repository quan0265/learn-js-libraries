function compile() {
    var html = document.getElementById("html");
    var css = document.getElementById("css");
    var js = document.getElementById("js");
    var code = document.getElementById("code").contentWindow.document;
    var console_value = [];

    function executeEditor() {
        code.open();
        code.writeln(
            `${html.value}<style>${css.value}</style><script>${js.value}</script>`
        );
        code.close();
    }

    function executeEditor1() {
        var content = `
        <head><style>${css.value}</style></head>
        <body>
            ${html.value}
            <script>${js.value}</script>
        </body>`;
        code.open();
        code.write(content);
        code.close();
    }

    function executeEditor2() {
        var code = document.getElementById('code')
        var content = `
        <head><style>${css.value}</style></head>
        <body>
            ${html.value}
            <script>${js.value}</script>
        </body>`;
        code.src = "data:text/html;charset=utf-8," + encodeURI(content);
    }

    function executeEditor3() {
        var code = document.getElementById('code')
        code.contentDocument.body.innerHTML = html.value + '<style>' + css.value + '</style>'
        code.contentWindow.eval(js.value)

        console.defaultLog = console.log.bind(console);
        console.logs = [];
        console.log = function(){
            // default &  console.log()
            console.defaultLog.apply(console, arguments);
            // new & array data
            console.logs.push(Array.from(arguments));
        }
        // console.log(222);

    }

    // document.body.onkeyup = executeEditor;
    // document.body.onkeyup = executeEditor1;
    // document.body.onkeyup = executeEditor2;
    document.body.onkeyup = executeEditor3;


}

compile();