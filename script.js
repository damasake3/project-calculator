const screen = document.querySelector("#screen");
const buttons = document.querySelector("#buttons");

buttons.addEventListener("click", (e) => {
    let target = e.target;
    console.log(target.id);
});

let num1;
let operator;
let num2;

num1 = 3;
num2 = 5;
operator = "+"

function add(num1, num2) {
    return num1 + num2;
}
function subtract(num1, num2) {
    return num1 - num2;
}
function multiply(num1, num2) {
    return num1 * num2;
}
function divide(num1, num2) {
    return num1 / num2;
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

console.log(operate(num1, num2, operator));