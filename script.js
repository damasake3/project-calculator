const screen = document.querySelector("#screen");
const buttons = document.querySelector("#buttons");
screen.innerText = 0;

let num1;
let operator;
let num2;
let opPressed = false;

console.log(num1, num2, operator, opPressed, "\n");

buttons.addEventListener("click", (e) => {
    let target = e.target;
    console.log(target.id);
    console.log(target.value);

    let classList = target.classList;

    switch (classListScan(classList)) {
        case "num":
            numOps(target, opPressed);
            break;
        case "operator":
            operatorOps(target);
            break;
        case "equal":
            equalOps(target);
            break;
        case "special":
            console.log("special");
            specialOps(target.id);
            break;
    }

});

function specialOps(id) {
    console.log(`Pressed ${id}`);
    switch (id) {
        case "clear":
            clearAll();
            break;
        case "clearEntry":
            clearEntry();
            break;
        case "decimal":
            decimalPoint();
    }
}

function clearEntry(){
    console.log("clearEntry");
    screen.innerText = screen.innerText.slice(0,-1);
    console.log(`On Display: ${screen.innerText}`);
    console.log(`${num1} ${operator} ${num2}`);
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

function checkDecimal(num){
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

function numOps(target, opPressed) {
    console.log("Number Pressed");
    if (opPressed === false) {
        console.log("Not opPressed.")
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
        console.log("Not opPressed.")
        if (screen.innerText == 0 && !checkDecimal(screen.innerText)) {
            screen.innerText = target.value;
            num2 = Number(screen.innerText);
        }
        else {
            screen.innerText += target.value;
            num2 = Number(screen.innerText);
        }
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
    console.log(operate(num1,num2,operator));

    let answer = operate(num1, num2, operator).toFixed(2);
    let decimalNum = answer.split(".");

    if (decimalNum[1] == 0){
        console.log(`gudam ${decimalNum[1]}`);
        answer = Number(answer).toFixed(0);
    }

    screen.innerText = answer;
    num1 = screen.innerText;


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
