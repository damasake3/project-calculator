const screen = document.querySelector("#screen");
const buttons = document.querySelector("#buttons");
screen.innerText = 0;

let num1, operator, num2;
let opPressed = false;



document.addEventListener("keyup", (e) => {
    let keyPress = e.key;
    let tempObj = { value: keyPress, id: "" };
    let btn = buttons.querySelector(`[value="${keyPress}"]`);

    if (isFinite(keyPress)) {
        hoverKey("dimgrey", btn);
        numOps(tempObj, opPressed, "num");
    }
    else if (keyPress === "+" || keyPress === "-"
        || keyPress === "*" || keyPress === "/"
    ) {
        hoverKey("blue", btn);
        operatorOps(tempObj);
    }
    else if (keyPress === "=" || keyPress === "Enter") {
        btn = buttons.querySelector(`[value="="]`);
        hoverKey("blue", btn);
        tempObj.value = "=";
        equalOps(tempObj);
    }
    else if (keyPress === "Backspace") {
        btn = buttons.querySelector(`[value="clearEntry"]`);
        hoverKey("orangered", btn);
        tempObj.value, tempObj.id = "clearEntry";
        numOps(tempObj, opPressed, "clearEntry");
    }
    else if (keyPress === ".") {
        hoverKey("blue", btn);
        decimalPoint();
    }
    else {
        console.log(`${keyPress} invalid`);
    }

});


buttons.addEventListener("click", (e) => {
    let target = e.target;
    let classList = target.classList;

    switch (classListScan(classList)) {
        case "num":
            numOps(target, opPressed, "num");
            break;
        case "operator":
            operatorOps(target);
            break;
        case "equal":
            equalOps(target);
            break;
        case "special":
            console.log("special");
            specialOps(target);
            break;
    }

});

function hoverKey(color, btn) {
    btn.style.backgroundColor = color;
    setTimeout(() => {
        btn.removeAttribute("style", "background-color:;");
    }, 120);
}

function decimalPoint() {
    if (!checkDecimal(screen.innerText)) {
        screen.innerText += ".";
    }
}

function checkDecimal(num) {
    if (screen.innerText.includes(".")) {
        return true;
    }
    else {
        return false;
    }
}

function classListScan(classList) {
    if (classList.contains("num")) {
        return "num";
    }
    else if (classList.contains("operator")) {
        return "operator";
    }
    else if (classList.contains("equal")) {
        return "equal";
    }
    else {
        return "special";
    }
}

function numOps(target, opPressed, mode) {

    switch (mode) {
        case "num":
            if (opPressed === false) {
                if (screen.innerText == 0 && !checkDecimal(screen.innerText)) {
                    screen.innerText = target.value;
                    num1 = Number(screen.innerText);
                }
                else {
                    screen.innerText += target.value;
                    num1 = Number(screen.innerText);
                }
            }
            else {
                if (screen.innerText == 0 && !checkDecimal(screen.innerText)) {
                    screen.innerText = target.value;
                    num2 = Number(screen.innerText);
                }
                else {
                    screen.innerText += target.value;
                    num2 = Number(screen.innerText);
                }
            }
            break;
        default:
            if (opPressed === false) {
                if (screen.innerText.length === 1 && !checkDecimal(screen.innerText)) {
                    screen.innerText = 0;
                    num1 = Number(screen.innerText);
                }
                else {
                    screen.innerText = screen.innerText.slice(0, -1);
                    num1 = Number(screen.innerText);
                }
            }
            else {
                if (screen.innerText.length === 1 && !checkDecimal(screen.innerText)) {
                    screen.innerText = 0;
                    num2 = Number(screen.innerText);
                    console.log(num1, num2, operator);
                }
                else {
                    screen.innerText = screen.innerText.slice(0, -1);
                    num2 = Number(screen.innerText);
                }
            }
            break;
    }

}

function operatorOps(target) {
    opPressed = true;
    operator = target.value;
    screen.innerText = 0;
}

function equalOps(target) {
    let answer = operate(num1, num2, operator).toFixed(2);
    let decimalNum = answer.split(".");

    if (decimalNum[1] == 0) {
        answer = Number(answer).toFixed(0);
    }
    screen.innerText = answer;
    num1 = screen.innerText;
    opPressed = false;
    num2 = undefined;
}

function specialOps(target) {
    switch (target.id) {
        case "clear":
            clearAll();
            break;
        case "clearEntry":
            clearEntry(target, "clearEntry");
            break;
        case "decimal":
            decimalPoint();
    }
}

function clearEntry(target, mode) {
    numOps(target, opPressed, mode);
}

function clearAll() {
    num1, num2, operator = undefined;
    opPressed = false;
    screen.innerText = 0;
}


function add(num1, num2) {
    return Number(num1) + Number(num2);
}
function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}
function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}
function divide(num1, num2) {
    return Number(num1) / Number(num2);
}

//When User presses `=` button
function operate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
    }
}
