const screen = document.querySelector("#screen");
const buttons = document.querySelector("#buttons");
screen.innerText = 0;

let num1;
let operator;
let num2;
let opPressed = false;

console.log(num1, num2, operator, opPressed, "\n");

document.addEventListener("keyup", (e) => {
    let keyPress = e.key;
    let tempObj = { value: keyPress, id: "" };
    if (isFinite(keyPress)) {
        console.log(`${keyPress} is number`);
        console.log(`tempObj.value: ${tempObj.value}`);
        numOps(tempObj, opPressed, "num");
    }
    else if (keyPress === "+" || keyPress === "-"
        || keyPress === "*" || keyPress === "/"
    ) {
        console.log(`${keyPress} is operator`);
        operatorOps(tempObj);
    }
    else if (keyPress === "=" || keyPress === "Enter") {
        console.log(`${keyPress} is equal`);
        tempObj.value = "=";
        equalOps(tempObj);
    }
    else if (keyPress === "Backspace") {
        console.log(`${keyPress} is special`);
        tempObj.value, tempObj.id = "clearEntry";
        numOps(tempObj, opPressed, "clearEntry");
    }
    else if (keyPress === ".") {
        console.log(`${keyPress} is special`);
        decimalPoint();
    }
    else {
        console.log(`${keyPress} invalid`);
    }

});


buttons.addEventListener("click", (e) => {
    let target = e.target;
    console.log(target.id);
    console.log(target.value);

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

function specialOps(target) {
    console.log(`Pressed ${target.id}`);
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
    console.log("clearEntry");
    console.log(`On Display: ${screen.innerText}`);
    console.log(`${num1} ${operator} ${num2}`);
    console.log(`THE MODE: ${mode}`);


    numOps(target, opPressed, mode);
}

function clearAll() {
    console.clear();
    console.log("Clear All");
    num1, num2, operator = undefined;
    opPressed = false;
    screen.innerText = 0;
}

function decimalPoint() {
    if (checkDecimal(screen.innerText)) {
        console.log("It already has a decimal");
    }
    else {
        screen.innerText += ".";
        console.log("Add decimal point");
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
            console.log("Number Pressed");
            if (opPressed === false) {
                console.log("Not opPressed.")
                if (screen.innerText == 0 && !checkDecimal(screen.innerText)) {
                    console.log(num1, num2, operator);
                    screen.innerText = target.value;
                    num1 = Number(screen.innerText);
                }
                else {
                    console.log(num1, num2, operator);
                    screen.innerText += target.value;
                    num1 = Number(screen.innerText);
                }
            }
            else {
                console.log("Not opPressed.")
                if (screen.innerText == 0 && !checkDecimal(screen.innerText)) {
                    console.log(num1, num2, operator);
                    screen.innerText = target.value;
                    num2 = Number(screen.innerText);
                }
                else {
                    console.log(num1, num2, operator);
                    screen.innerText += target.value;
                    num2 = Number(screen.innerText);
                }
            }
            break;
        default:
            let temp = 0;
            console.log("Clear Entry");
            if (opPressed === false) {
                console.log("Not opPressed.")
                console.log(`ScreenDisplay Length: ${screen.innerText.length} \n`);
                if (screen.innerText.length === 1 && !checkDecimal(screen.innerText)) {
                    screen.innerText = 0;
                    num1 = Number(screen.innerText);
                    console.log(num1, num2, operator);
                }
                else {
                    screen.innerText = screen.innerText.slice(0, -1);
                    num1 = Number(screen.innerText);
                    console.log(num1, num2, operator);
                }
            }
            else {
                console.log("Is opPressed.");
                console.log(`ScreenDisplay Length: ${screen.innerText.length} \n`);
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
    console.log("Operator pressed");
    console.log(target.value);

    opPressed = true;
    operator = target.value;
    screen.innerText = 0;
}

function equalOps(target) {
    console.log("Equal pressed");
    console.log(target.value);
    console.log(`${num1} ${operator} ${num2}`);
    console.log(operate(num1, num2, operator));

    let answer = operate(num1, num2, operator).toFixed(2);
    let decimalNum = answer.split(".");

    if (decimalNum[1] == 0) {
        console.log(`gudam ${decimalNum[1]}`);
        answer = Number(answer).toFixed(0);
    }

    screen.innerText = answer;
    num1 = screen.innerText;
    opPressed = false;
    num2 = undefined;


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
