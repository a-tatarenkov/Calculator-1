const secDisplay = document.querySelector(".display-sec");
const mainDisplay = document.querySelector(".display-main");
const tempResult = document.querySelector(".temp-result");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const equal = document.querySelector(".equal");
const clearAll = document.querySelector(".clear-all");
const clearLast = document.querySelector(".last-entity-clear");

let mainNumber = "";
let secNumber = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbers.forEach(number => {
   number.addEventListener("click", (e) => {
       if (e.target.textContent === "." && !haveDot) {
           haveDot = true;
       }
       else if (e.target.textContent === "." && haveDot) {
           return;
       }

       mainNumber += e.target.textContent;
       mainDisplay.textContent = mainNumber;
   });
});

operations.forEach(operation => {
    operation.addEventListener("click", (e) => {
        if (!mainNumber) return;
        haveDot = false;
        const operationName = e.target.textContent;

        if (mainNumber && secNumber && lastOperation) {
            mathOperation();
        }
        else {
            result = Number(mainNumber);
        }
        clearMainDisplay(operationName);
        lastOperation = operationName;
    });
});

function clearMainDisplay(name = "") {
    secNumber += mainNumber + " " + name + " ";
    secDisplay.textContent = secNumber;
    mainDisplay.textContent = "";
    mainNumber = "";
    tempResult.textContent = result;
}

function mathOperation() {
    switch (lastOperation) {
        case "x":
            result = Number(result) * Number(mainNumber);
            mainDisplay.textContent = result;
            break;
        case "+":
            result = Number(result) + Number(mainNumber);
            mainDisplay.textContent = result;
            break;
        case "-":
            result = Number(result) - Number(mainNumber);
            mainDisplay.textContent = result;
            break;
        case "/":
            result = Number(result) / Number(mainNumber);
            mainDisplay.textContent = result;
            break;
        case "%":
            result = Number(result) % Number(mainNumber);
            mainDisplay.textContent = result;
            break;
    }
}

equal.addEventListener("click", () => {
    if (!mainNumber || !secNumber) return;
    haveDot = false;

    mathOperation();
    clearMainDisplay();

    mainDisplay.textContent = result;
    tempResult.textContent = "";
    mainNumber = result;
    secNumber = "";
});

clearAll.addEventListener("click", () => {
    mainDisplay.textContent = "0";
    secDisplay.textContent = "0";
    tempResult.textContent = "0";

    mainNumber = "";
    secNumber = "";
    result = "";
    haveDot = false;
});

clearLast.addEventListener("click", () => {
    mainDisplay.textContent = "";
    mainNumber = "";
});

window.addEventListener("keydown", (e) => {
    if (
        e.key === "0" ||
        e.key === "1" ||
        e.key === "2" ||
        e.key === "3" ||
        e.key === "4" ||
        e.key === "5" ||
        e.key === "6" ||
        e.key === "7" ||
        e.key === "8" ||
        e.key === "9" ||
        e.key === "."
    ) {
        clickNumber(e.key);
    }
    else if (
        e.key === "+" ||
        e.key === "-" ||
        e.key === "/" ||
        e.key === "%"
    ) {
        clickOperation(e.key);
    }
    else if (e.key === "*") {
        clickOperation("x");
    }
    else if (e.key === "=" || e.key === "Enter") {
        equal.click();
    }
});

function clickNumber(key) {
    numbers.forEach(number => {
       if (number.innerHTML === key) {
           number.click();
       }
    });
}

function clickOperation(key) {
    operations.forEach(operation => {
       if (operation.textContent === key) {
           operation.click();
       }
    });
}