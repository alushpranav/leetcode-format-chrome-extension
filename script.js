import parserBabel from "./parser-babel.mjs";
import parserTypeScript from "./parser-typescript.mjs";
import prettierFormat_formatCode from "./parser-java.js";

window.addEventListener("load", startLoading, false);
window.addEventListener("locationchange", function (event) {
    // Log the state data to the console
    console.log(event);
    if (document.getElementById("button-format") !== null) {
        console.debug("Button present");
    } else {
        console.debug("Button not present");
    }
});

function startLoading() {
    let codeMirrorSelector = document.querySelector(".CodeMirror");
    if (codeMirrorSelector === undefined) {
        // codemirror not found on page
        return;
    }
    let codeMirror = codeMirrorSelector.CodeMirror;
    if (codeMirror === undefined) {
        // codeMirror not found
        return;
    }
    
    let programmingLanguage = document.querySelector(
        ".ant-select-selection-selected-value"
    );

    if (!programmingLanguage || !programmingLanguage.title) {
        // Dom not loaded yet
        return;
    }

    if (document.getElementById('format-button') !== null) {        
        return;
    }
    else {
        console.debug('installing button');
    }
    
    let button = getFormatButton();
    button.addEventListener("click", function () {
        formatCodeFinal(codeMirror, programmingLanguage);
    });

    programmingLanguage.parentElement.parentElement.parentElement.parentElement.parentElement.appendChild(
        button
    );

    //clearInterval(timer);
}

const getFormatButton = function () {
    var button = document.createElement("button");
    button.innerHTML = "▤";
    button.className = "tool-button";
    button.id = "format-button";
    button.setAttribute("icon", "information");
    button.setAttribute("data-no-border", "true");
    button.setAttribute("type", "ghost");
    button.style.marginRight = "10px";
    button.style.border = "none";
    button.style.backgroundColor = "transparent";
    button.style.borderImage = "none";
    button.style.outline = "none";
    button.style.cursor = "pointer";
    button.title = "Format";
    return button;
};

const formatCodeFinal = function (codeMirror, programmingLanguage) {
    let language = programmingLanguage.title;
    let codeText = codeMirror.getValue();
    if (language === undefined) {
        return;
    }
    if (codeText === undefined) {
        return;
    }
    let formattedCode = null;
    if (language === "JavaScript") {
        formattedCode = prettier.format(codeText, {
            parser: "babel",
            plugins: [parserBabel],
        });
        codeMirror.setValue(formattedCode);
    } else if (language === "TypeScript") {
        formattedCode = prettier.format(codeText, {
            parser: "typescript",
            plugins: [parserTypeScript],
        });
    } else if (language === "Java") {
        formattedCode = prettierFormat_formatCode.formatCode(
            codeText,
            {}
        );
    }
    else {
        console.debug(`Formatter not available for ${programmingLanguage.title}`);    
        return;
    }

    if (formattedCode) {
        codeMirror.setValue(formattedCode);
    }
    console.debug(`Code formatted for ${programmingLanguage.title}`);
};

let timer = setInterval(startLoading, 5000);
